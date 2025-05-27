import { COOKIE_ACCESS_KEY } from '@/constants/cookie';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  const correctPassword = process.env.APP_ACCESS_PASSWORD;

  if (password === correctPassword) {
    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: COOKIE_ACCESS_KEY,
      value: 'true',
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
