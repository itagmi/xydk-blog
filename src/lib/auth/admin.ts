const ADMIN_EMAIL = (
  process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "itagmi88@gmail.com"
).toLowerCase();

export function isAdminUser(email?: string | null) {
  if (!email) return false;
  return email.toLowerCase() === ADMIN_EMAIL;
}
