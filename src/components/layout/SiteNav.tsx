'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/config/navigation'

export default function SiteNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex justify-center gap-10 px-12 py-9">
      {NAV_ITEMS.map(({ label, href }) => {
        const isActive = pathname === href

        return (
          <Link
            key={href}
            href={href}
            className={`text-[11px] font-normal uppercase tracking-[0.12em] no-underline transition-colors duration-[250ms] ${
              isActive ? 'text-white/85' : 'text-white/40 hover:text-white/85'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
