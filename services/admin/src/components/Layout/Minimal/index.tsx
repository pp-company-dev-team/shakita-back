import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
import "./styles.css";

export type MinimalLayoutProps = {
  children: ReactNode;
};

const MinimalLayout: React.FC<MinimalLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MinimalLayout;
