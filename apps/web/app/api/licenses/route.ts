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

    const res = await fetch(`${LICENSE_SERVER_URL}/api/portal/licenses`, {
      headers: { 'Authorization': `Bearer ${session}` },
    });

    if (!res.ok) {
      if (res.status === 401) {
        cookieStore.delete('session');
      }
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: res.status }
      );
    }

    const licenses = await res.json();
    return NextResponse.json(licenses);
  } catch (error) {
    console.error('Failed to get licenses:', error);
    return NextResponse.json(
      { error: 'Failed to get licenses' },
      { status: 500 }
    );
  }
}
