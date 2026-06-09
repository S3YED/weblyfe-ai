// Minimal monochrome brand glyphs for the integration cards, tinted to the HUD
// command-gold so they sit on-theme rather than importing full-colour vendor
// logos that would clash with the Aetheris palette.

const GOLD = '#fdd38a';

export function NotionGlyph({ size = 20 }: { size?: number }) {
  // Stylised "N" in a rounded square - evokes Notion without using their mark.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      role="img"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        stroke={GOLD}
        strokeWidth="1.6"
      />
      <path
        d="M8 16.5V8l8 8.2V8"
        stroke={GOLD}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AirtableGlyph({ size = 20 }: { size?: number }) {
  // Three stacked records - evokes a base/grid without using their mark.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      role="img"
    >
      <path
        d="M12 3.5 3.5 7l8.5 3.5L20.5 7 12 3.5Z"
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 11.2 12 14.4l8-3.2"
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15.2 12 18.4l8-3.2"
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
