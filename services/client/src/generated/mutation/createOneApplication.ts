const createOneApplicationQueryBody = `
query createOneApplication (
	$place: String!, 
	$date: DateTime!, 
	$name: String!, 
	$payload: PayloadArgs, 
	$email: String!, 
	$notificationOnMail: Boolean!
) {
createOneApplication(
	place: $place, 
	date: $date, 
	name: $name, 
	payload: $payload, 
	email: $email, 
	notificationOnMail: $notificationOnMail
) { 
	$output
}}`;

export const createOneApplication = (args: createOneApplicationOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return createOneApplicationQueryBody.replace("$output", outputStr);
}

export type createOneApplicationOutput = { 
	id?: boolean, 
	place?: boolean, 
	status?: boolean, 
	date?: boolean, 
}