import { refresh } from "@/generated/query/refresh";
import { errorService } from "./services/errorService";
import { gql } from "./services/graphqlService";

export const query = async (queryBody: any, data: any) => {
  return await makeQuery(queryBody, data, true).catch(async (error) => {
    if (error === "refresh") {
      await refreshTokens();
      return await makeQuery(queryBody, data);
    }
  });
};

const makeQuery = async (queryBody: any, data: any, isFirst?: boolean) => {
  return await gql.graphQLClient
    .request(queryBody, data)
    .then((res: any) => Object.values(res)[0])
    .catch((error) => {
      if (isFirst) {
        if (error.response?.message === "Unauthorized") {
          throw "refresh";
        }
        return errorService.setError(error);
      } else {
        return errorService.setError(error);
      }
    });
};

const refreshTokens = async () => {
  await gql.graphQLClient
    .request(
      refresh(`
      accessToken
      refreshToken
    `),
      { token: gql.getRefreshToken() }
    )
    .then((res: any) =>
      localStorage.setItem("tokens", JSON.stringify(Object.values(res)[0]))
    )
    .catch((error) => errorService.setError(error));

  gql.refreshClient();
};
