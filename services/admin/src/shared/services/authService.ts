import { login } from "@/generated/query/login";
import { query } from "@/shared/query";
export class AuthService {
  async login(data: any) {
    const res = await query(
      login({ accessToken: true, refreshToken: true }),
      data
    );
    localStorage.setItem("tokens", JSON.stringify(res));
  }
}

export const authService = new AuthService();
