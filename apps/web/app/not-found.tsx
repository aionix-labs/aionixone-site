export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#05060a] text-white">
      <div className="text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-400/80">404</p>
        <h1 className="text-4xl font-semibold">This page could not be found.</h1>
        <p className="text-white/60">Return to the homepage or use the navigation links.</p>
        <a
          href="/"
          className="inline-flex rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:bg-cyan-400"
        >
          Go home
        </a>
      </div>
    </main>
  );
}
