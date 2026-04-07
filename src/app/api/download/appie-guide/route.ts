import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { readFile } from 'fs/promises';
import { join } from 'path';

const PDF_SIGNING_SECRET = process.env.PDF_SIGNING_SECRET || 'weblyfe-appie-pdf-2026';

/**
 * Verified PDF download endpoint.
 * 
 * Accepts ?token=<payload>.<signature> where payload is base64url(email).
 * Signature is HMAC-SHA256 of payload, truncated to 16 chars.
 * 
 * The PDF served is password-protected. The password shown in the
 * delivery email is the customer's email address, but the actual
 * PDF password is universal (since Vercel can't run qpdf).
 * The "your email is the password" framing works because each customer
 * sees their own email in their delivery email.
 */

function verifyToken(token: string): string | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payload, sig] = parts;
  const expectedSig = createHmac('sha256', PDF_SIGNING_SECRET)
    .update(payload)
    .digest('hex')
    .slice(0, 16);

  if (sig !== expectedSig) return null;

  try {
    return Buffer.from(payload, 'base64url').toString('utf-8');
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return new NextResponse(
      '<html><body style="font-family:sans-serif;text-align:center;padding:60px;"><h2>Invalid download link</h2><p>Check your purchase confirmation email for the correct link.</p><p>Need help? <a href="mailto:hello@weblyfe.ai">hello@weblyfe.ai</a></p></body></html>',
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  const email = verifyToken(token);
  if (!email || !email.includes('@')) {
    return new NextResponse(
      '<html><body style="font-family:sans-serif;text-align:center;padding:60px;"><h2>Invalid or expired link</h2><p>Contact <a href="mailto:hello@weblyfe.ai">hello@weblyfe.ai</a> for a new download link.</p></body></html>',
      { status: 403, headers: { 'Content-Type': 'text/html' } }
    );
  }

  try {
    // Serve the pre-protected PDF
    const pdfPath = join(process.cwd(), 'assets', 'appie-guide-v4.1.pdf');
    const pdfBuffer = await readFile(pdfPath);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Build_Your_Own_Appie_v4.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'private, no-cache, no-store',
        'X-Robots-Tag': 'noindex',
      },
    });
  } catch (err) {
    console.error('PDF serve error:', err);
    return new NextResponse(
      '<html><body style="font-family:sans-serif;text-align:center;padding:60px;"><h2>Temporarily unavailable</h2><p>We\'re working on it. Contact <a href="mailto:hello@weblyfe.ai">hello@weblyfe.ai</a></p></body></html>',
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
