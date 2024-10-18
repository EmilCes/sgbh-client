import type { NextRequest } from 'next/server'
 
export function authMiddleware(request: NextRequest) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const currentUser = request.cookies.get('currentUser')?.value
 
  if (currentUser && !request.nextUrl.pathname.startsWith(`${basePath}/dashboard`)) {
    return Response.redirect(new URL(`${basePath}/dashboard`, request.url))
  }
 
  if (!currentUser && !request.nextUrl.pathname.startsWith(`${basePath}/login`)) {
    return Response.redirect(new URL(`${basePath}/login`, request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}