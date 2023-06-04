import { ReactNode } from "react";

export type MinimalLayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<MinimalLayoutProps> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
