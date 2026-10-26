import { NextResponse } from 'next/server';

// Simple, unauthenticated Docker/Nginx health check. No secrets or user data.
export function GET() {
  return NextResponse.json({ status: 'ok', service: 'easytopup-landing' }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
