import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";

/**
 * Smoke test for 21st.dev component installation.
 *
 * Components installed via:
 *   npx shadcn@latest add "https://21st.dev/r/magicui/marquee"
 *
 * This page verifies that 21st.dev components can be imported and rendered
 * inside the weblyfe-ai Next.js 16 + Tailwind 4 + React 19 stack.
 */

const LOGOS = [
  "Hodm FZE",
  "Voorman BV",
  "Privanotify",
  "AppieKit",
  "InstaDashi",
  "Hermes",
  "Spark Atlas",
  "OpenClaw",
];

export default function Lab21stDevPage() {
  return (
    <main className="min-h-screen bg-[var(--brand-snow)] text-[var(--brand-green-goblin)]">
      <section className="container py-24">
        <h1 className="mb-4 text-4xl font-bold">
          21st.dev smoke test
        </h1>
        <p className="mb-12 text-lg text-[color:var(--muted)]">
          Verifying the magicui Marquee component installs and renders inside
          weblyfe-ai (Next.js 16, Tailwind 4, React 19).
        </p>

        <div className="rounded-2xl border border-[color:var(--brand-emerald)]/15 bg-white/95 p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">
            Trusted-by marquee (proof of concept)
          </h2>
          <Marquee pauseOnHover className="[--duration:30s]">
            {LOGOS.map((logo) => (
              <div
                key={logo}
                className="mx-2 flex h-16 min-w-40 items-center justify-center rounded-xl border border-[color:var(--brand-emerald)]/15 bg-[color:var(--brand-snow)] px-6 font-semibold text-[color:var(--brand-storm-green)]"
              >
                {logo}
              </div>
            ))}
          </Marquee>
        </div>

        <div className="mt-12 flex gap-4">
          <Button>shadcn Button (default)</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </section>
    </main>
  );
}
