'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DOCS_URL } from '@/lib/constants';

const links = [
  { href: '/', label: 'Overview' },
  { href: '/features', label: 'Features' },
  { href: '/blog', label: 'Blog' },
  { href: DOCS_URL, label: 'Docs', external: true }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-white/5">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
          <Image
            src="/aionixone-img.png"
            alt="AionixOne"
            width={32}
            height={32}
            className="rounded-lg border border-white/10 bg-white/5"
          />
          AionixOne
        </Link>
        <nav className="flex items-center gap-6 text-sm text-white/70">
          {links.map((link) =>
            'external' in link ? (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? 'text-white'
                    : 'transition-colors hover:text-white'
                }
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
