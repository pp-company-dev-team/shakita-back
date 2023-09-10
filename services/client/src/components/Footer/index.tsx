"use client";
import Image from "next/image";
import Logo from "../../../public/logo.svg";
import Telegram from "../../../public/telegram.svg";
import Instagram from "../../../public/instagram.svg";
import Facebook from "../../../public/facebook.svg";
import Call from "../../../public/call.svg";
import styles from "./index.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const router = usePathname();
  return (
    <footer className={styles.footerWrapper}>
      {router !== "/phone-header" && (
        <>
          <div className={styles.footerTitle}>
            <Image alt="logo" src={Logo} />
            <h1>Shakita hookah</h1>
          </div>
          <div className={styles.footerLinks}>
            <Link href={"/news"}>News</Link>
            <Link href={"/about-us"}>About Us</Link>
            <Link href={"/menu"}>Menu</Link>
            <Link href={"/loyalty"}>Loyalty</Link>
            <Link href={"/booking"}>Booking</Link>
          </div>
        </>
      )}
      <div className={styles.contacts}>
        <div className={styles.socMedia}>
          <Image alt="Telegram" src={Telegram} />
          <Image alt="Instagram" src={Instagram} />
          <Image alt="Facebook" src={Facebook} />
        </div>
        <div className={styles.phone}>
          <Image alt="phone" src={Call} />
          <span>+380993286769</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
