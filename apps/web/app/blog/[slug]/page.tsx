import Link from 'next/link';
import { Header } from '@/components/header';
import { notFound } from 'next/navigation';
import { docsUrl } from '@/lib/constants';

// Blog posts content - will be moved to MDX files later
const posts: Record<
  string,
  {
    title: string;
    description: string;
    date: string;
    category: string;
    content: string;
  }
> = {
  'introducing-aionixone': {
    title: 'Introducing AionixOne: The Control Plane for Local Execution',
    description:
      'Why we built a governance layer for scripts, functions, and automation — without the cloud.',
    date: '2025-12-12',
    category: 'Announcement',
    content: `
## The Problem

Every organization has them: scripts running on cron, Python utilities that "just work," shell scripts that nobody dares to touch. They're not in the cloud. They're not managed. They're just... there.

And when something breaks, you dig through logs, guess, ask around. When someone leaves, the system becomes a black box. When you need to change something, you pray.

These systems aren't poorly written — they were just never truly governed. And without governance, responsibility always falls back on people.

## The Solution: Governance, Not Just Automation

AionixOne isn't another automation tool. It's a governance layer — a control plane that brings order to the chaos of local execution.

The rule is simple: **Anything that can execute must be governed.**

This is enforced through TRN (Tenant Resource Name), a universal addressing scheme:

\`\`\`
trn:<service>:<tenant>:<type>/<name>
\`\`\`

Every function, credential, schedule, and workflow gets a TRN. No TRN means it doesn't exist in the system.

Every action follows the same pattern: TRN + Operation. Every execution generates a traceable record.

Think of TRN as the identity of anything that is allowed to exist and run.

## What This Means for You

- **Traceable**: Every execution has a source, context, and history
- **Governed**: Objects must be registered to exist
- **Transferable**: System state doesn't depend on human memory

## Try It Now

AionixOne ships as a single binary. No cloud required. No agents. No rewriting your existing code.

Download the Community Edition and bring governance to your local execution world.
    `
  }
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Header />
      <main>
        <article className="mx-auto max-w-3xl px-6 py-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white/80"
          >
            ← Back to Blog
          </Link>

          {/* Header */}
          <header className="mt-8">
            <div className="flex items-center gap-3 text-sm text-white/50">
              <span>{post.category}</span>
              <span>·</span>
              <time>{post.date}</time>
            </div>
            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-lg text-white/60">{post.description}</p>
          </header>

          {/* Content */}
          <div className="prose prose-invert mt-12 max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-white/70 prose-p:leading-relaxed prose-a:text-cyan-400 prose-strong:text-white prose-code:text-cyan-400 prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-li:text-white/70">
            {/* Simple markdown-like rendering - will be replaced with MDX */}
            {post.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={i} className="mt-12 mb-4 text-2xl font-semibold">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('```')) {
                const code = paragraph.replace(/```\w*\n?/g, '').trim();
                return (
                  <pre
                    key={i}
                    className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4"
                  >
                    <code className="font-mono text-sm text-cyan-400">{code}</code>
                  </pre>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter((line) => line.startsWith('- '));
                return (
                  <ul key={i} className="my-4 list-disc space-y-2 pl-6">
                    {items.map((item, j) => (
                      <li key={j} className="text-white/70">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={i} className="my-4 leading-relaxed text-white/70">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent p-8 text-center">
            <h3 className="text-xl font-semibold">Ready to try AionixOne?</h3>
            <p className="mt-2 text-white/60">Single binary. Runs locally. Up in five minutes.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://github.com/aionixone/aionixone/releases"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black transition hover:bg-cyan-400"
              >
                Download Community Edition
              </a>
              <a
                href={docsUrl('/getting-started')}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:border-white/40"
              >
                Read Quick Start Guide
              </a>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
