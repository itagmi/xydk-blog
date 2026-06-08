export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import AdminPageShell from "@/components/admin/AdminPageShell";
import { markInquiryRead } from "@/app/actions/inquiries";
import { ButtonLink } from "@/components/ui/Button";

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = inquiries.filter((i) => !i.read).length;

  return (
    <AdminPageShell
      title={`Inquiries${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
      actions={
        <ButtonLink href="/admin" variant="ghost">
          ← Dev Notes
        </ButtonLink>
      }
    >
      {inquiries.length === 0 ? (
        <p className="text-sm text-white/30">아직 문의가 없어요.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-white/[0.06]">
          {inquiries.map((inquiry) => (
            <li key={inquiry.id} className={`py-6 ${inquiry.read ? "opacity-50" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    {!inquiry.read && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                    )}
                    <span className="text-sm font-medium text-white/80">{inquiry.name}</span>
                    <span className="text-xs text-white/35">{inquiry.email}</span>
                    {inquiry.phone && (
                      <span className="text-xs text-white/25">{inquiry.phone}</span>
                    )}
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed whitespace-pre-wrap">
                    {inquiry.message}
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.08em] text-white/20">
                    {new Date(inquiry.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {!inquiry.read && (
                  <form action={markInquiryRead.bind(null, inquiry.id)}>
                    <button
                      type="submit"
                      className="shrink-0 text-[11px] uppercase tracking-[0.08em] text-white/25 transition-colors hover:text-white/60"
                    >
                      읽음
                    </button>
                  </form>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminPageShell>
  );
}
