import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const LICENSE_SERVER_URL = process.env.LICENSE_SERVER_URL || 'http://localhost:3100';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const res = await fetch(`${LICENSE_SERVER_URL}/api/portal/licenses/${id}/download`, {
      headers: { 'Authorization': `Bearer ${session}` },
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(error, { status: res.status });
    }

    const licenseJson = await res.text();

    return new NextResponse(licenseJson, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="license.json"',
      },
    });
  } catch (error) {
    console.error('Failed to download license:', error);
    return NextResponse.json(
      { error: 'Failed to download license' },
      { status: 500 }
    );
  }
}
