import React from "react";
import { useRouter } from "next/router";
import MinimalLayout from "@/components/Layout/Minimal";
import MainLayout from "@/components/Layout/Main";
import "./globals.css";

export const minimalPages = ["login", "register"];

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

  const firstRoutePath = router.pathname.split("/")[1];

  const Layout = minimalPages.includes(firstRoutePath)
    ? MinimalLayout
    : MainLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
