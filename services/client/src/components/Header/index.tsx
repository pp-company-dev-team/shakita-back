"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import Logo from "../../../public/logo.svg";
import Profile from "../../../public/Profile.svg";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (path !== "/phone-header") {
      setOpen(false);
    }
  }, [path]);
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerTitle}>
        <Image alt="logo" src={Logo} />
        <h1>
          <Link href={"/"}>Shakita hookah</Link>
        </h1>
      </div>
      <div className={styles.headerNavBar}>
        <Link href={"/news"} onClick={() => setOpen(false)}>
          News
        </Link>
        <Link href={"/about-us"} onClick={() => setOpen(false)}>
          About Us
        </Link>
        <Link href={"/menu"} onClick={() => setOpen(false)}>
          Menu
        </Link>
        <Link href={"/loyalty"} onClick={() => setOpen(false)}>
          Loyalty
        </Link>
        <Link href={"/booking"} onClick={() => setOpen(false)}>
          Booking
        </Link>
      </div>
      <Link
        href={"/profile"}
        className={styles.headerButtonAuth}
        onClick={() => setOpen(false)}
      >
        <Image alt="Profile" src={Profile} />
        <span>LogIn</span>
      </Link>
      <div
        className={styles.headerIcon}
        onClick={() => {
          setOpen(!open);
          if (open) {
            router.back();
          } else {
            router.push("/phone-header");
          }
        }}
      >
        <span className={styles.stroke} />
        <span className={styles.stroke} />
        <span className={open ? styles.stroke : styles.strokeOpen} />
      </div>
    </header>
  );
};

export default Header;

export const HeaderForPhone = () => {
  return (
    <div className={styles.headerForPhone}>
      <div className={styles.headerForPhoneLinks}>
        <Link href={"/news"}>News</Link>
        <Link href={"/about-us"}>About Us</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/loyalty"}>Loyalty</Link>
        <Link href={"/booking"}>Booking</Link>
      </div>
      <Link href={"/profile"} className={styles.headerForPhoneButtonAuth}>
        <Image alt="Profile" src={Profile} />
        <span>LogIn</span>
      </Link>
    </div>
  );
};
