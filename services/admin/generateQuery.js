const fs = require('fs');
const path = require('path');
const { buildASTSchema, parse } = require('graphql');

function generateQueryFromSchema(schemaFilePath, typeName) {
  // Read the schema file
  const schemaContent = fs.readFileSync(schemaFilePath, 'utf-8');

  // Parse the schema into an AST
  const schemaAST = parse(schemaContent);


  // Build the GraphQL schema object
  const schema = buildASTSchema(schemaAST);

  // Get the fields for the specified type
  const type = schema.getType(typeName);
  if (!type) {
    console.error(`Type "${typeName}" not found in the schema.`);
    return;
  }

  const fields = type.getFields();

  const getTypeName = (path) => {
    return path.type?.name
      ? path.type.name.value
      : getTypeName(path.type)
  }

  Object.values(fields).map(item => {

    let resFunction = `query ${item.name}`;
    const args =  item.astNode.arguments;

    const functionResType = getTypeName(item.astNode);

    if(args.length){
      const params = {}
      args.map(arg => {
        params[arg.name.value] =  {
          type: getTypeName(arg),
          NonNullType: arg.type.kind === 'NonNullType'
        };

      })


      let commonArgs = '';
      let queryArgs = '';
      Object.entries(params).map(([argName, {type, NonNullType}], index) => {
        const isLast = index === Object.values(params).length - 1;

        commonArgs = commonArgs.concat(`$${argName}: ${type}${NonNullType ? '!' : ''}${isLast ? '' : ', '}`);
        queryArgs = queryArgs.concat(`${argName}: $${argName}${isLast ? '' : ', '}`);
      }) 

      resFunction = resFunction.concat(` (${commonArgs}) {
        ${item.name}(${queryArgs}) {
          $output
        }
      }`)

      const fileString = `
const ${item.name}QueryBody = \`${resFunction}\`

export const ${item.name} = (args: any) => ${item.name}QueryBody.replace("$output", args);
      `

      const queryFilePath = `src/generated/${typeName.toLowerCase()}/${item.name}.ts`;

      const directoryPath = path.dirname(queryFilePath);
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      fs.writeFileSync(queryFilePath, fileString);
    }
  })
}

// Usage: node generateQuery.js schema.graphql TypeName
const [schemaFilePath, typeName] = process.argv.slice(2);
generateQueryFromSchema(schemaFilePath, typeName);
