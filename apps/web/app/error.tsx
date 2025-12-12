'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#05060a] text-white">
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-400/80">Unexpected error</p>
          <h1 className="text-3xl font-semibold">Something went wrong.</h1>
          <p className="text-white/60 max-w-md">
            Try refreshing the page or return to the home page while we investigate.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => reset()}
              className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium hover:border-white/70"
            >
              Retry
            </button>
            <a
              href="/"
              className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:bg-cyan-400"
            >
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
