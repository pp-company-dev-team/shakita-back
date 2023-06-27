import { login } from "@/generated/query/login";
import { QueryLoginArgs } from "@/generated/types";
import { query } from "@/shared/query";
export class AuthService {
  async login(data: QueryLoginArgs) {
    const res = await query(
      login({
        accessToken: true,
        refreshToken: true,
      }),
      data
    );
    localStorage.setItem("tokens", JSON.stringify(res));
  }
}

export const authService = new AuthService();
