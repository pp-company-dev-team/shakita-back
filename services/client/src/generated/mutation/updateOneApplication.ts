const updateOneApplicationQueryBody = `
query updateOneApplication (
	$id: String!, 
	$place: String, 
	$date: DateTime, 
	$status: ApplicationStatus
) {
updateOneApplication(
	id: $id, 
	place: $place, 
	date: $date, 
	status: $status
) { 
	$output
}}`;

export const updateOneApplication = (args: updateOneApplicationOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return updateOneApplicationQueryBody.replace("$output", outputStr);
}

export type updateOneApplicationOutput = { 
	success?: boolean, 
}