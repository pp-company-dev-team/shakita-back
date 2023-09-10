const updateOneUserQueryBody = `
query updateOneUser (
	$email: String!, 
	$password: String!
) {
updateOneUser(
	email: $email, 
	password: $password
) { 
	$output
}}`;

export const updateOneUser = (args: updateOneUserOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return updateOneUserQueryBody.replace("$output", outputStr);
}

export type updateOneUserOutput = { 
	id?: boolean, 
	email?: boolean, 
	password?: boolean, 
	role?: boolean, 
	createdAt?: boolean, 
	updatedAt?: boolean, 
}