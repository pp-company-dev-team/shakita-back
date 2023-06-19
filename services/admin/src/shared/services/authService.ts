import { GraphQLClient, request } from "graphql-request";
import { login } from "@/generated/query/login";

const endpoint = "http://localhost:3000/graphql";
const tokensOutput = `
accessToken
refreshToken
`;

export class AuthService {
  async login(data: any) {
    const graphQLClient = new GraphQLClient(endpoint);
    const res = await graphQLClient.request(login(tokensOutput), data);
    console.log("res", res);

    // const response = await request(endpoint, loginQuery, data);
    // console.log("response", response);
  }
}

export const authService = new AuthService();
