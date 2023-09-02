import MyComponent from "@/components/ActiveImage";
import Preview from "@/components/MainPreview";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Preview />
      {/* <MyComponent /> */}
    </main>
  );
}
