import { login } from "@/generated/query/login";
import { query } from "@/shared/query";

const tokensOutput = `
  accessToken
  refreshToken
`;

export class AuthService {
  async login(data: any) {
    const res = await query(login(tokensOutput), data);
    localStorage.setItem("tokens", JSON.stringify(res));
  }
}

export const authService = new AuthService();
