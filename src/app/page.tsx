import Home from '@/components/Home';
import PasswordGate from '@/components/PasswordGate';
import { COOKIE_ACCESS_KEY } from '@/constants/cookie';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const isGranted = cookieStore.get(COOKIE_ACCESS_KEY)?.value === 'true';

  return isGranted ? <Home /> : <PasswordGate />;
}
