import Link from 'next/link';
import Image from 'next/image';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-4">
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
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-sm text-white/40">
        <div className="mx-auto max-w-6xl px-6">
          &copy; {new Date().getFullYear()} AionixOne. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
