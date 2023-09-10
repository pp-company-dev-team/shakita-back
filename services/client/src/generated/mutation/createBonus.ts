const createBonusQueryBody = `
query createBonus (
	$count: String!, 
	$asset: String!
) {
createBonus(
	count: $count, 
	asset: $asset
) { 
	$output
}}`;

export const createBonus = (args: createBonusOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return createBonusQueryBody.replace("$output", outputStr);
}

export type createBonusOutput = { 
	id?: boolean, 
	count?: boolean, 
	asset?: boolean, 
	isActive?: boolean, 
	payload?: boolean, 
	createdAt?: boolean, 
	updatedAt?: boolean, 
}