import Link from "next/link";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

const base =
  "inline-flex cursor-pointer items-center justify-center transition-colors disabled:cursor-not-allowed";

const sm = "px-3 py-1.5";

export const buttonVariants = {
  primary: `${base} border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.12em] text-white/60 hover:border-white/40 hover:text-white/90`,
  primaryBlock: `${base} w-full border border-white/20 py-3 text-xs uppercase tracking-[0.12em] text-white/60 hover:border-white/40 hover:text-white/90`,
  ghost: `${base} ${sm} text-xs uppercase tracking-[0.1em] text-white/25 hover:text-white/50`,
  action: `${base} ${sm} text-[11px] uppercase tracking-[0.08em] text-white/30 hover:text-white/60`,
  danger: `${base} ${sm} text-[11px] uppercase tracking-[0.08em] text-white/20 hover:text-red-400/60`,
  tab: `${base} ${sm} text-xs uppercase tracking-[0.1em] text-white/30 hover:text-white/60`,
  tabActive: `${base} ${sm} text-xs uppercase tracking-[0.1em] text-white/80`,
  pagination: `${base} ${sm} border border-white/20 text-xs uppercase tracking-[0.1em] text-white/65 hover:border-white/40 hover:text-white/90`,
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${buttonVariants[variant]} ${className}`.trim()} {...props} />;
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
};

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink({ variant = "primary", className = "", ...props }, ref) {
    return (
      <Link
        ref={ref}
        className={`${buttonVariants[variant]} no-underline ${className}`.trim()}
        {...props}
      />
    );
  },
);
