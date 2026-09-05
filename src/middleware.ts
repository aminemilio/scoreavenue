import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url));
  }

  const segments = pathname.split('/');
  const locale = segments[1];
  const validLocales = ['fr', 'en', 'ar', 'es'];

  if (locale && !validLocales.includes(locale) && !locale.startsWith('_') && !locale.startsWith('api')) {
    return NextResponse.redirect(new URL('/fr', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/(fr|en|ar|es)/:path*'],
};