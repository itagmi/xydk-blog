"use client";

import Link from "next/link";
import { useLinkStatus } from "next/link";

function TitleContent({ children }: { children: React.ReactNode }) {
  const { pending } = useLinkStatus();

  return (
    <span className={pending ? "text-white/35" : "text-white/75"}>
      {children}
      {pending ? " …" : ""}
    </span>
  );
}

type AdminPostTitleLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function AdminPostTitleLink({
  href,
  children,
}: AdminPostTitleLinkProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="truncate text-sm transition-colors hover:text-white"
    >
      <TitleContent>{children}</TitleContent>
    </Link>
  );
}
