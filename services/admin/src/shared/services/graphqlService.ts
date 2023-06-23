import { GraphQLClient } from "graphql-request";
import { Tokens } from "../../../path/to/generated/types";

const endpoint = "http://localhost:3000/graphql";

export class GraphQLService {
  public graphQLClient: GraphQLClient;

  private accessToken: string = "";

  constructor() {
    this.getAssetToken();

    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: this.accessToken ? `Bearer ${this.accessToken}` : "",
      },
    });
  }

  getAssetToken() {
    if (typeof localStorage !== "undefined") {
      const tokensString = localStorage.getItem("tokens");
      if (tokensString && tokensString !== "undefined") {
        const tokens: Tokens = JSON.parse(tokensString);
        this.accessToken = tokens.accessToken;
      }
    }
  }
}

export const gql = new GraphQLService();
