import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  console.log('[Mirage] Client report:', JSON.stringify(body, null, 2));
  return NextResponse.json({ received: true });
}
