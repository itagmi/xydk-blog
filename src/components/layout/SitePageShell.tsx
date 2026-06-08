const MAX_WIDTH = {
  "680": "max-w-[680px]",
  "780": "max-w-[780px]",
  "900": "max-w-[900px]",
} as const;

type SitePageShellProps = {
  children: React.ReactNode;
  maxWidth?: keyof typeof MAX_WIDTH;
};

export default function SitePageShell({
  children,
  maxWidth = "780",
}: SitePageShellProps) {
  return (
    <div className="min-h-screen bg-[#0c0c0c] px-6 pt-36 pb-24 md:px-12">
      <div className={`mx-auto ${MAX_WIDTH[maxWidth]}`}>{children}</div>
    </div>
  );
}
