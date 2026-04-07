import { NextRequest, NextResponse } from 'next/server';
import { getProvisionStatus } from '@/lib/appie/fleet';
import { getCheckoutSession, getInstanceByCustomer } from '@/lib/appie/fleet';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  // Look up checkout session -> customer -> instance
  const session = await getCheckoutSession(sessionId);
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  const instance = await getInstanceByCustomer(session.customer_id);
  if (!instance) {
    return NextResponse.json({ error: 'Instance not found' }, { status: 404 });
  }

  const status = await getProvisionStatus(instance.id);
  if (!status) {
    return NextResponse.json({ error: 'Status not available' }, { status: 404 });
  }

  return NextResponse.json(status);
}
