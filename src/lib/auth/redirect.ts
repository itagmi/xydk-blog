export function getResetPasswordRedirectUrl(origin?: string) {
  const base =
    origin ??
    (typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

  return `${base}/admin/reset-password`;
}

export function parseAuthHashError(hash: string): string | null {
  if (!hash.startsWith("#")) return null;

  const params = new URLSearchParams(hash.slice(1));
  const errorCode = params.get("error_code");
  const description = params.get("error_description");

  if (errorCode === "otp_expired") {
    return "이메일 링크가 만료되었습니다. 비밀번호 재설정을 다시 요청해주세요.";
  }

  if (description) {
    return decodeURIComponent(description.replace(/\+/g, " "));
  }

  if (params.get("error")) {
    return "인증 링크가 유효하지 않습니다. 다시 시도해주세요.";
  }

  return null;
}
