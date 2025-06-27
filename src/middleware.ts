import { NextRequest, NextResponse } from 'next/server';
import { getLocationFromHeaders } from '@/utils/location';

export function middleware(request: NextRequest) {
  const location = getLocationFromHeaders(request.headers);
  const response = NextResponse.next();
  
  response.headers.set('x-user-location', location);
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};