"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const RESET_PASSWORD_PATH = "/admin/reset-password";

/** Supabase Auth hash/query가 메인(/) 등 다른 경로로 올 때 reset-password로 보냄 */
export default function AuthHashRedirect() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === RESET_PASSWORD_PATH || pathname === "/auth/callback") {
      return;
    }

    const { hash, search } = window.location;
    if (!hash && !search) return;

    const hashParams = hash ? new URLSearchParams(hash.slice(1)) : null;
    const searchParams = new URLSearchParams(search);

    const isAuthHash =
      !!hashParams &&
      (hashParams.has("access_token") ||
        hashParams.get("type") === "recovery" ||
        hashParams.has("error") ||
        hashParams.has("error_code"));

    const isAuthQuery =
      searchParams.has("code") ||
      searchParams.has("token_hash") ||
      searchParams.get("type") === "recovery";

    if (isAuthHash || isAuthQuery) {
      window.location.replace(`${RESET_PASSWORD_PATH}${search}${hash}`);
    }
  }, [pathname]);

  return null;
}
