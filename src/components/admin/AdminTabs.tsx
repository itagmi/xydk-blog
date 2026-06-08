import Link from "next/link";

const TABS = [
  { label: "Dev Notes", href: "/admin" },
  { label: "UI/UX", href: "/admin/uiux" },
  { label: "Inquiries", href: "/admin/inquiries" },
];

export default function AdminTabs({ current }: { current: string }) {
  return (
    <div className="mb-8 flex gap-1 border-b border-white/[0.06]">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 pb-3 text-xs uppercase tracking-[0.1em] transition-colors no-underline ${
            current === tab.href
              ? "border-b-2 border-white/60 text-white/80"
              : "text-white/30 hover:text-white/60"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
