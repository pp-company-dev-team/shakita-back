import { login } from "@/generated/query/login";
import { Tokens } from "../../../path/to/generated/types";
import { query } from "@/shared/query";

const tokensOutput = `
  accessToken
  refreshToken
`;

export class AuthService {
  public accessToken: string = "";
  public refreshToken: string = "";

  public isAuth() {
    this.accessToken !== "";
  }

  public setTokens() {
    const tokensString = localStorage.getItem("tokens");
    if (tokensString && tokensString !== "undefined") {
      const tokens: Tokens = JSON.parse(tokensString);

      this.accessToken = tokens.accessToken;
      this.refreshToken = tokens.refreshToken;
    }
  }

  async login(data: any) {
    const res = await query(login(tokensOutput), data);
    localStorage.setItem("tokens", JSON.stringify(res));

    this.setTokens();
  }
}

export const authService = new AuthService();
