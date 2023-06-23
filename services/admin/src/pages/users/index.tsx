import { useEffect } from "react";
import { usersPageModel } from "./model";

const UsersPage = () => {
  useEffect(() => {
    usersPageModel.init({ id: "2bd7f97b-5429-428e-90a7-483ee167b8a1" });
  }, []);

  return <>Users page</>;
};

export default UsersPage;
