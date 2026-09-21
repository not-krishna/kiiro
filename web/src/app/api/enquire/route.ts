import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const payload = body as Record<string, unknown>
  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  const email = typeof payload.email === 'string' ? payload.email.trim() : ''
  const message =
    (typeof payload.message === 'string' && payload.message.trim()) ||
    (typeof payload.mind === 'string' && payload.mind.trim()) ||
    (typeof payload.requirements === 'string' && payload.requirements.trim()) ||
    (typeof payload.experience === 'string' && payload.experience.trim()) ||
    ''

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  }

  // Destination (email / CRM / WhatsApp) is not yet approved. Persist-ready payload only.
  console.info('[kiiro:enquiry]', {
    intent: payload.intent,
    email,
    name,
  })

  return NextResponse.json({ ok: true })
}
