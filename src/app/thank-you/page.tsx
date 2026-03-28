'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import Lottie from 'lottie-react';

// Green checkbox Lottie animation data (inline to avoid external fetch)
const checkmarkAnimation = {
  v: '5.5.7',
  fr: 30,
  ip: 0,
  op: 40,
  w: 200,
  h: 200,
  nm: 'Checkmark',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Circle',
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [0], e: [100] }, { t: 12, s: [100] }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [0, 0, 100], e: [110, 110, 100] },
            { t: 10, s: [110, 110, 100], e: [100, 100, 100] },
            { t: 14, s: [100, 100, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: 'el',
          d: 1,
          s: { a: 0, k: [140, 140] },
          p: { a: 0, k: [0, 0] },
          nm: 'Circle',
        },
        {
          ty: 'fl',
          c: { a: 0, k: [0.141, 0.455, 0.349, 1] }, // #247459
          o: { a: 0, k: 100 },
          r: 1,
          nm: 'Fill',
        },
      ],
      ip: 0,
      op: 40,
      st: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'Check',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ind: 0,
              ty: 'sh',
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-25, 0], [-8, 17], [28, -17]],
                  c: false,
                },
              },
              nm: 'Path',
            },
            {
              ty: 'tm',
              s: { a: 0, k: 0 },
              e: {
                a: 1,
                k: [
                  { t: 10, s: [0], e: [100] },
                  { t: 22, s: [100] },
                ],
              },
              o: { a: 0, k: 0 },
              m: 1,
              nm: 'Trim',
            },
            {
              ty: 'st',
              c: { a: 0, k: [1, 1, 1, 1] }, // white
              o: { a: 0, k: 100 },
              w: { a: 0, k: 8 },
              lc: 2,
              lj: 2,
              nm: 'Stroke',
            },
          ],
          nm: 'Checkmark',
        },
      ],
      ip: 0,
      op: 40,
      st: 0,
    },
  ],
};

export default function ThankYouPage() {
  const confettiFired = useRef(false);

  useEffect(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;

    // Fire confetti burst
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#247459', '#DFB771', '#F6FEFC', '#0E3D31'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Initial big burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });

    // Then continuous side streams
    requestAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #031D16 0%, #0E3D31 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '40px' }}>
        <img
          src="/logo-gold.svg"
          alt="Weblyfe"
          width={120}
          height={40}
          style={{ height: 'auto' }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          background: 'rgba(14, 61, 49, 0.6)',
          border: '1px solid rgba(36, 116, 89, 0.5)',
          borderRadius: '24px',
          padding: '48px 36px',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Lottie Checkmark */}
        <div
          style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 24px',
          }}
        >
          <Lottie
            animationData={checkmarkAnimation}
            loop={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Thank you text */}
        <h1
          style={{
            color: '#DFB771',
            fontSize: '32px',
            fontWeight: 800,
            margin: '0 0 12px',
            letterSpacing: '-0.02em',
          }}
        >
          Thank you! 🎉
        </h1>

        <p
          style={{
            color: '#F6FEFC',
            fontSize: '18px',
            margin: '0 0 32px',
            lineHeight: '1.6',
            opacity: 0.9,
          }}
        >
          Your payment was successful.
          <br />
          Your guide is on its way!
        </p>

        {/* Main instruction */}
        <div
          style={{
            background: 'rgba(36, 116, 89, 0.3)',
            border: '1px solid rgba(223, 183, 113, 0.3)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>📩</div>
          <p
            style={{
              color: '#DFB771',
              fontSize: '20px',
              fontWeight: 700,
              margin: '0 0 8px',
            }}
          >
            Check your email
          </p>
          <p
            style={{
              color: 'rgba(246, 254, 252, 0.7)',
              fontSize: '14px',
              margin: 0,
              lineHeight: '1.5',
            }}
          >
            We&apos;ve sent your personal download link to the email you used at
            checkout. Don&apos;t forget to check your spam folder!
          </p>
        </div>

        {/* What's next */}
        <div style={{ textAlign: 'left', marginBottom: '24px' }}>
          <p
            style={{
              color: 'rgba(246, 254, 252, 0.5)',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
              margin: '0 0 12px',
            }}
          >
            What&apos;s next?
          </p>
          {[
            { icon: '📥', text: 'Download the PDF from your email' },
            { icon: '📖', text: 'Read through the 62-page guide' },
            { icon: '🤖', text: 'Build your own Appie, step by step' },
          ].map((step, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 0',
                borderBottom:
                  i < 2
                    ? '1px solid rgba(36, 116, 89, 0.3)'
                    : 'none',
              }}
            >
              <span style={{ fontSize: '20px' }}>{step.icon}</span>
              <span
                style={{
                  color: '#F6FEFC',
                  fontSize: '14px',
                  opacity: 0.85,
                }}
              >
                {step.text}
              </span>
            </div>
          ))}
        </div>

        {/* Back to home */}
        <a
          href="/"
          style={{
            display: 'inline-block',
            color: 'rgba(246, 254, 252, 0.5)',
            fontSize: '13px',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(246, 254, 252, 0.15)',
            transition: 'all 0.2s',
          }}
        >
          ← Back to Weblyfe.ai
        </a>
      </div>

      {/* Footer */}
      <p
        style={{
          color: 'rgba(246, 254, 252, 0.3)',
          fontSize: '12px',
          marginTop: '32px',
        }}
      >
        © 2026 Weblyfe.ai · Techwiz LLC · Rijswijk, NL
      </p>
    </div>
  );
}
