const registerQueryBody = `
query register (
	$email: String!, 
	$password: String!
) {
register(
	email: $email, 
	password: $password
) { 
	$output
}}`;

export const register = (args: registerOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return registerQueryBody.replace("$output", outputStr);
}

export type registerOutput = { 
	accessToken?: boolean, 
	refreshToken?: boolean, 
}