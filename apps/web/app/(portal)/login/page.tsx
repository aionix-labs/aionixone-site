'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to send code');
        return;
      }

      // Redirect to verify page with email
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Sign in to AionixOne</h1>
        <p className="text-white/60">Access your licenses and account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoFocus
            disabled={isLoading}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                       text-white placeholder:text-white/30
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500
                     disabled:bg-blue-600/50 disabled:cursor-not-allowed
                     rounded-lg font-medium transition-colors"
        >
          {isLoading ? 'Sending...' : 'Send Verification Code'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white/40">
        We&apos;ll email you a 6-digit code
      </p>
    </div>
  );
}
