'use client';

import { useEffect } from 'react';

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL ?? 'http://localhost:3001';

export default function DocsRedirectPage() {
  useEffect(() => {
    window.location.href = DOCS_URL;
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#05060a] text-white">
      <div className="text-center space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-400/80">Redirecting</p>
        <h1 className="text-3xl font-semibold">Opening documentation…</h1>
        <p className="text-white/60 break-all">{DOCS_URL}</p>
      </div>
    </main>
  );
}
