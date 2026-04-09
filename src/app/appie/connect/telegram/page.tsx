import { Suspense } from 'react';
import TelegramConnectClient from './TelegramConnectClient';

export const dynamic = 'force-dynamic';

export default function TelegramConnectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#031D16' }}>
        <div className="text-center">
          <div className="text-3xl mb-3">🧙🏽‍♂️</div>
          <p className="text-[#F6FEFC]/50">Loading...</p>
        </div>
      </div>
    }>
      <TelegramConnectClient />
    </Suspense>
  );
}
