import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";

export type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      Main
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
