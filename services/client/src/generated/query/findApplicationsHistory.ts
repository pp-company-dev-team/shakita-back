const findApplicationsHistoryQueryBody = `
query findApplicationsHistory (
	$email: String!
) {
findApplicationsHistory(
	email: $email
) { 
	$output
}}`;

export const findApplicationsHistory = (args: findApplicationsHistoryOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return findApplicationsHistoryQueryBody.replace("$output", outputStr);
}

export type findApplicationsHistoryOutput = { 
	id?: boolean, 
	place?: boolean, 
	status?: boolean, 
	date?: boolean, 
}