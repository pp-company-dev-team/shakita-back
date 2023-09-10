const findOneApplicationQueryBody = `
query findOneApplication (
	$id: String!
) {
findOneApplication(
	id: $id
) { 
	$output
}}`;

export const findOneApplication = (args: findOneApplicationOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return findOneApplicationQueryBody.replace("$output", outputStr);
}

export type findOneApplicationOutput = { 
	id?: boolean, 
	place?: boolean, 
	status?: boolean, 
	date?: boolean, 
}