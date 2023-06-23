import { findOneUser } from "@/generated/query/findOneUser";
import { query } from "@/shared/query";

const usersOutput = `
  email
`;

export class UsersPageModel {
  async init(data: any) {
    const res = await query(findOneUser(usersOutput), data);

    console.log("res", res);
  }
}

export const usersPageModel = new UsersPageModel();
