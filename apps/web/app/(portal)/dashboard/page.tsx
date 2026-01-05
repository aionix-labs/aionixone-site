'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface License {
  id: string;
  organization: string;
  tier: string;
  trn_limit: number | null;
  expires_at: string;
  is_active: boolean;
}

interface User {
  email: string;
  licenses: License[];
}

// Tier display config
const TIER_CONFIG: Record<string, { label: string; color: string; defaultLimit: number }> = {
  community: { label: 'Community', color: 'text-gray-400', defaultLimit: 10 },
  pro: { label: 'Pro', color: 'text-blue-400', defaultLimit: 100 },
  team: { label: 'Team', color: 'text-purple-400', defaultLimit: 1000 },
  enterprise: { label: 'Enterprise', color: 'text-amber-400', defaultLimit: Infinity },
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user info and licenses in parallel
        const [userRes, licensesRes] = await Promise.all([
          fetch('/api/auth/me'),
          fetch('/api/licenses'),
        ]);

        if (!userRes.ok || !licensesRes.ok) {
          // Not authenticated
          router.replace('/login');
          return;
        }

        const userData = await userRes.json();
        const licensesData = await licensesRes.json();

        setUser(userData);
        setLicenses(licensesData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const handleCopyKey = async (licenseId: string) => {
    try {
      const res = await fetch(`/api/licenses/${licenseId}/key`);
      if (!res.ok) throw new Error('Failed to get key');

      const { key } = await res.json();
      await navigator.clipboard.writeText(key);
      setCopySuccess(licenseId);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy key:', err);
    }
  };

  const handleDownload = async (licenseId: string) => {
    try {
      const res = await fetch(`/api/licenses/${licenseId}/download`);
      if (!res.ok) throw new Error('Failed to download');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'license.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download:', err);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDaysRemaining = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl text-center">
        <div className="text-white/40">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="w-full max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-white/60">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
        >
          Sign out
        </button>
      </div>

      {/* Licenses */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white/80">Your Licenses</h2>

        {licenses.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
            <p className="text-white/60 mb-4">No licenses found</p>
            <a
              href="/pricing"
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              View Pricing
            </a>
          </div>
        ) : (
          licenses.map((license) => {
            const tier = TIER_CONFIG[license.tier] || TIER_CONFIG.community;
            const daysRemaining = getDaysRemaining(license.expires_at);
            const isExpiringSoon = daysRemaining <= 14 && daysRemaining > 0;
            const effectiveLimit = license.trn_limit ?? tier.defaultLimit;

            return (
              <div
                key={license.id}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{license.organization}</h3>
                      <span className={`text-sm font-medium ${tier.color}`}>
                        {tier.label}
                      </span>
                    </div>
                    <p className="text-sm text-white/40 font-mono">{license.id}</p>
                  </div>
                  <div className="text-right">
                    {license.is_active ? (
                      <span className="inline-flex items-center gap-1.5 text-sm text-green-400">
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm text-red-400">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        Expired
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-white/40">TRN Limit</span>
                    <p className="text-white font-medium">
                      {effectiveLimit === Infinity ? 'Unlimited' : effectiveLimit.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-white/40">Expires</span>
                    <p className={`font-medium ${isExpiringSoon ? 'text-amber-400' : 'text-white'}`}>
                      {formatDate(license.expires_at)}
                      {isExpiringSoon && ` (${daysRemaining} days)`}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleCopyKey(license.id)}
                    className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
                  >
                    {copySuccess === license.id ? 'Copied!' : 'Copy License Key'}
                  </button>
                  <button
                    onClick={() => handleDownload(license.id)}
                    className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
                  >
                    Download JSON
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
