import { findOneUser } from "@/generated/query/findOneUser";
import { query } from "@/shared/query";

export class UsersPageModel {
  async init(data: any) {
    const res = await query(
      findOneUser({
        id: true,
      }),
      data
    );

    console.log("res", res);
  }
}

export const usersPageModel = new UsersPageModel();
