import { errorService } from "./services/errorService";
import { gql } from "./services/graphqlService";

export const query = async (queryBody: any, data: any) => {
  return await gql.graphQLClient
    .request(queryBody, data)
    .then((res: any) => Object.values(res)[0])
    .catch((error) => errorService.setError(error));
};
