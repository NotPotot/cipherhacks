import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const score = request.headers.get('X-Mirage-Score');
  if (score && parseInt(score) >= 70) {
    return NextResponse.json(
      { error: 'Request blocked by Mirage' },
      { status: 403 }
    );
  }

  const body = await request.json();
  return NextResponse.json({
    success: true,
    orderId: `ORD-${Date.now()}`,
    message: 'Order placed successfully',
    shieldScore: score || '0',
  });
}
