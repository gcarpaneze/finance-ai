"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="itens-center flex gap-10">
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
        <Link
          href="/"
          className={pathname === "/" ? "text-primary" : "text-muted"}
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathname === "/transactions" ? "text-primary" : "text-muted"
          }
        >
          Transações
        </Link>
        <Link
          href="/subscriptions"
          className={
            pathname === "/subscriptions" ? "text-primary" : "text-muted"
          }
        >
          Assinatura
        </Link>
      </div>

      <UserButton showName />
    </nav>
  );
}

export default Navbar;
