import { Suspense } from 'react';
import LoginClient from './LoginClient';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#031D16' }}>
        <div className="text-center">
          <div className="text-3xl mb-3">🧙🏽‍♂️</div>
          <p className="text-[#F6FEFC]/50">Loading...</p>
        </div>
      </div>
    }>
      <LoginClient />
    </Suspense>
  );
}
