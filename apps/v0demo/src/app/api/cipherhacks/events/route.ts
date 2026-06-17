import { NextResponse } from 'next/server'
import { addEvent, getEvents, getEventsSince, getStats } from '@cipherhacks/shield'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const since = url.searchParams.get('since')
  if (since) return NextResponse.json({ events: getEventsSince(parseInt(since, 10)), stats: getStats() })
  return NextResponse.json({ events: getEvents(200), stats: getStats() })
}

export async function POST(request: Request) {
  try {
    const event = await request.json()
    addEvent(event)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
