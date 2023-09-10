const findApplicationsQueryBody = `
query findApplications (
	$id: String, 
	$place: String, 
	$date_from: DateTime, 
	$date_to: DateTime, 
	$status: ApplicationStatus
) {
findApplications(
	id: $id, 
	place: $place, 
	date_from: $date_from, 
	date_to: $date_to, 
	status: $status
) { 
	$output
}}`;

export const findApplications = (args: findApplicationsOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return findApplicationsQueryBody.replace("$output", outputStr);
}

export type findApplicationsOutput = { 
	id?: boolean, 
	place?: boolean, 
	status?: boolean, 
	date?: boolean, 
}