'use client';

import { useState } from 'react';

export function QuickStart() {
  const [copied, setCopied] = useState(false);

  const command = `curl -fsSL https://raw.githubusercontent.com/aionix-labs/aionixone-releases/main/install.sh | bash`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <div className="relative rounded-xl border border-white/10 bg-black/40">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-white/40">macOS (Apple Silicon)</span>
          <button
            onClick={handleCopy}
            className="rounded px-2 py-1 text-xs text-white/50 transition hover:bg-white/10 hover:text-white/80"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="overflow-x-auto p-4 text-sm">
          <code className="font-mono text-cyan-400">{command}</code>
        </pre>
      </div>
      <p className="mt-3 text-center text-sm text-white/40">
        <a
          href="https://github.com/aionix-labs/aionixone-releases"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 transition hover:text-white/60"
        >
          Other platforms & manual install
        </a>
      </p>
    </section>
  );
}
