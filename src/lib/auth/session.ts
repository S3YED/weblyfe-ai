// Resolve the current session from cookie. Used by /appie/* server components
// + the dashboard route handler.

import { cookies } from 'next/headers';
import { verifySessionJwt } from './tokens';

export async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get('appie_session')?.value;
  if (!jwt) return null;
  const verified = verifySessionJwt(jwt);
  return verified?.userId ?? null;
}
