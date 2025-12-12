import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'AionixOne — Portable Cloud Runtime',
  description: 'Full cloud automation capabilities in a single Rust binary.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#05060a] text-white">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-[#05060a] via-[#090b12] to-[#05060a]">
          {children}
        </div>
      </body>
    </html>
  );
}
