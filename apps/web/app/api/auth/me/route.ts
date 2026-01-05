import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const LICENSE_SERVER_URL = process.env.LICENSE_SERVER_URL || 'http://localhost:3100';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const res = await fetch(`${LICENSE_SERVER_URL}/api/portal/me`, {
      headers: { 'Authorization': `Bearer ${session}` },
    });

    if (!res.ok) {
      // Session expired or invalid
      if (res.status === 401) {
        cookieStore.delete('session');
      }
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await res.json();
    return NextResponse.json(user);
  } catch (error) {
    console.error('Failed to get user:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}
