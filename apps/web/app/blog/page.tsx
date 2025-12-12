import Link from 'next/link';
import { Header } from '@/components/header';

// Blog posts data - will be moved to MDX files later
const posts = [
  {
    slug: 'introducing-aionixone',
    title: 'Introducing AionixOne: The Control Plane for Local Execution',
    description:
      'Why we built a governance layer for scripts, functions, and automation — without the cloud.',
    date: '2025-12-12',
    category: 'Announcement'
  }
];

export default function BlogPage() {
  return (
    <div>
      <Header />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">Blog</p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Updates & Insights</h1>
          <p className="mt-4 text-white/60">
            Product updates, technical deep-dives, and best practices.
          </p>
        </section>

        {/* Posts list */}
        <section className="mx-auto max-w-4xl px-6 pb-24">
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-cyan-500/30 hover:bg-white/10"
              >
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <span>{post.category}</span>
                  <span>·</span>
                  <time>{post.date}</time>
                </div>
                <h2 className="mt-2 text-xl font-medium text-white">{post.title}</h2>
                <p className="mt-2 text-white/60">{post.description}</p>
              </Link>
            ))}
          </div>

          {/* Empty state for when there are more posts */}
          {posts.length === 0 && (
            <div className="py-12 text-center text-white/50">
              <p>No posts yet. Check back soon.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
