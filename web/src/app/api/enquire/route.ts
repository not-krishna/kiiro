import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const payload = body as {
    name?: string
    email?: string
    intent?: string
    message?: string
  }

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  }

  // Destination (email / CRM / WhatsApp) is not yet approved. Persist-ready payload only.
  console.info('[kiiro:enquiry]', {
    intent: payload.intent,
    email: payload.email,
    name: payload.name,
  })

  return NextResponse.json({ ok: true })
}
