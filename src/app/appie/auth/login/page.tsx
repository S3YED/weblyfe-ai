// Magic-link request page. Customer-facing form for "stuur me een nieuwe link".
// POSTs to /appie/auth/request-link and shows a "Check je inbox" success state.

import LoginView from '@/components/appie/LoginView';

export const metadata = {
  title: 'Inloggen | Instant Appie',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginView />;
}
