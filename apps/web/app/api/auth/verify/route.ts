import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const LICENSE_SERVER_URL = process.env.LICENSE_SERVER_URL || 'http://localhost:3100';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and code are required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${LICENSE_SERVER_URL}/api/portal/auth/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(error, { status: res.status });
    }

    const { token, user } = await res.json();

    // Set httpOnly cookie server-side
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    // Return user info (not the token)
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Failed to verify code:', error);
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    );
  }
}
