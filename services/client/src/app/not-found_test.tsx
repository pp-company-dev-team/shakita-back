"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.svg";

export default function NotFoundPage() {
  return (
    <div className="error-page">
      <Image alt="logo" src={Logo} />
      <div className="error-content">
        <label className="error-title">404</label>
        <label>
          Перейдите на <Link href={"/"}>Главною</Link> страницу
        </label>
      </div>
    </div>
  );
}
