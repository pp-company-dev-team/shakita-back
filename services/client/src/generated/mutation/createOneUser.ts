const createOneUserQueryBody = `
query createOneUser (
	$email: String!, 
	$password: String!, 
	$role: UserRole!
) {
createOneUser(
	email: $email, 
	password: $password, 
	role: $role
) { 
	$output
}}`;

export const createOneUser = (args: createOneUserOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return createOneUserQueryBody.replace("$output", outputStr);
}

export type createOneUserOutput = { 
	id?: boolean, 
	email?: boolean, 
	password?: boolean, 
	role?: boolean, 
	createdAt?: boolean, 
	updatedAt?: boolean, 
}