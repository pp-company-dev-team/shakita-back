const findOneUserQueryBody = `
query findOneUser (
	$id: String!
) {
findOneUser(
	id: $id
) { 
	$output
}}`;

export const findOneUser = (args: findOneUserOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return findOneUserQueryBody.replace("$output", outputStr);
}

export type findOneUserOutput = { 
	id?: boolean, 
	email?: boolean, 
	password?: boolean, 
	role?: boolean, 
	createdAt?: boolean, 
	updatedAt?: boolean, 
}