# PRD: Weblyfe.ai OpenClaw Landing Page Overhaul
**Version:** 1.0.0
**Date:** 2026-03-24
**Owner:** Seyed / Appie-1
**Status:** In Progress

---

## Executive Summary

Overhaul the Weblyfe.ai homepage and OpenClaw landing page (`/openclaw`) to create a cohesive funnel: Homepage teases and links to OpenClaw, OpenClaw page is a full landing page with hype, urgency, social proof, and email capture. Mobile-first responsive design throughout.

---

## Goals

1. **Homepage** = Authority builder + teaser → funnels to `/openclaw`
2. **OpenClaw page** = Standalone landing page shareable on social media
3. **Mobile-first** = Every element optimized for 390px+ screens
4. **Urgency** = Countdown timer (sticky on scroll), launch pricing tease
5. **Three-tier offer** = DIY / Hosted / Custom (teased, not priced)
6. **Email capture** = Notify Me forms throughout
7. **Social proof** = 5-star rating, case studies, testimonials, tool carousel

---

## Architecture

### Page Flow
```
HOMEPAGE (weblyfe.ai)
├── Navbar with "Appie OpenClaw" link
├── CountdownHero (timer + email capture)
├── Services (tease capabilities)
├── CaseStudies (authority)
├── HowItWorks (process)
├── PricingBlur (blurred cards + "Coming Soon")
├── Testimonials (social proof)
├── FAQ
├── CTA → links to /openclaw
├── Footer
└── StickyCountdown (bottom bar on scroll)

OPENCLAW PAGE (weblyfe.ai/openclaw)
├── Nav (mobile hamburger + desktop)
├── Hero (headline + email capture + countdown inline)
├── 5-Star Social Proof Bar
├── Tool Logo Carousel (OpenClaw, Google, Notion, etc.)
├── Three-Tier Offer Tease (DIY / Hosted / Custom)
│   └── Blurred pricing overlay + email capture
├── Features Grid (8 capabilities)
├── How It Works (4 steps)
├── FAQ
├── Final CTA (email capture)
├── Footer
└── StickyCountdown (bottom bar on scroll)
```

---

## Tickets

### WEB-001: Fix Homepage Mobile Responsiveness (P0)
**Component:** CountdownHero, Services, CaseStudies, PricingBlur, Footer
**Issues:**
- Countdown timer boxes too wide on small screens (w-20/h-20 = 80px each, plus gaps = 420px+ for 4 units, exceeds 390px viewport)
- Case study cards may overflow
- PricingBlur overlay form squished on mobile
**Actions:**
- Reduce countdown units to w-16/h-16 on mobile, w-20/h-20 on sm+
- Add `text-2xl` on mobile for countdown numbers (currently text-3xl)
- Ensure all grid layouts use `grid-cols-1` on mobile
- Test all sections at 390px width
- Fix footer bottom padding for sticky bar

### WEB-002: Fix OpenClaw Page Mobile Responsiveness (P0)
**Component:** OpenClawClient.tsx
**Issues:**
- Feature grid 4-col on lg, needs 1-col on mobile, 2-col on sm
- Package cards need full-width on mobile
- FAQ items need better touch targets
- Hero buttons stack properly on mobile
**Actions:**
- Verify all grid breakpoints
- Ensure touch targets are 44px minimum
- Test hamburger menu functionality
- Verify sticky countdown doesn't overlap content

### WEB-003: Redesign OpenClaw Offers as Three Tiers (P0)
**Component:** OpenClawClient.tsx → offers section
**Current:** 2 packages (Starter, Full Stack) with visible features
**Target:** 3 tiers with blurred pricing + email capture overlay
**New Tiers:**
1. **Build It Yourself** (DIY)
   - PDF guide + video tutorials
   - Step-by-step OpenClaw setup
   - Community Discord access
   - Self-hosted on your own server
2. **Hosted With Us** (Done With You)
   - We host your AI agent
   - Pre-configured OpenClaw instance
   - Telegram/WhatsApp connected
   - Monthly subscription
   - Email + calendar integration
   - Ongoing updates
3. **Custom Build** (Done For You)
   - Full custom AI infrastructure
   - Multi-agent architecture
   - Custom workflows + integrations
   - Command center dashboard
   - Dedicated support
   - Strategy call required
**Actions:**
- Replace 2-col offers with 3-col blurred pricing cards
- Add "Coming Soon" overlay with Lock icon
- Email capture form in overlay
- Tier names visible above blur
- Feature lists visible but pricing blurred

### WEB-004: Add 5-Star Social Proof Bar (P1)
**Component:** OpenClawClient.tsx, homepage
**Placement:** Below hero, above tool carousel
**Content:**
- 5 gold stars (★★★★★)
- "Trusted by founders & agencies"
- Client names: Lost LeBlanc, BeyondSchool, Dubai Property, Stickx Arcade, IOnlyBookVIP
**Actions:**
- Create star rating component
- Add below hero on OpenClaw page
- Keep on homepage

### WEB-005: Optimize Countdown Timer UX (P1)
**Component:** CountdownHero.tsx, StickyCountdown.tsx
**Issues:**
- Timer is bulky on mobile
- Sticky bar should be cleaner/faster
**Actions:**
- Reduce timer unit size on mobile
- Simplify sticky bar: minimal height, fast animation
- Ensure countdown shares same `launchTime` across components
- Remove heavy blur/shadow effects on mobile for performance

### WEB-006: Homepage CTA → OpenClaw Funnel (P1)
**Component:** CTA.tsx
**Current:** "Book a Strategy Call" generic
**Target:** Dual CTA: "Explore OpenClaw →" + "Book a Call"
**Actions:**
- Add secondary link to `/openclaw`
- Update CTA copy to reference OpenClaw

### WEB-007: OpenClaw Email Capture Sections (P1)
**Component:** OpenClawClient.tsx
**Locations:**
1. Hero section (existing "Book a Call" → add email input)
2. Pricing blur overlay (new)
3. Final CTA section (replace "Book a Call" with email + call option)
**Actions:**
- Add email input + "Notify Me" to hero
- Add PricingBlur-style overlay to three-tier section
- Keep "Book a Call" as secondary CTA throughout

### WEB-008: QA & Visual Validation (P2)
**Actions:**
- Screenshot all pages at 390px (iPhone 14), 768px (iPad), 1280px (desktop)
- Verify no horizontal overflow
- Verify all animations perform well on mobile
- Verify sticky countdown doesn't cover footer content
- Verify all links work
- Lighthouse performance audit

---

## Design Tokens (Existing)
```css
--brand-green-goblin: #031D16
--brand-storm-green: #0E3D31
--brand-emerald: #247459
--brand-gold: #DFB771
--brand-turmeric: #FFD99A
--brand-snow: #F6FEFC
```

**Font:** Rethink Sans (Google Fonts)
**Icons:** Lucide React
**Animations:** Framer Motion

---

## Success Criteria

- [ ] All pages render correctly at 390px, 768px, 1280px
- [ ] Countdown timer is compact and smooth on mobile
- [ ] Sticky countdown bar appears on scroll, doesn't overlap content
- [ ] Three-tier offer is clear: DIY / Hosted / Custom
- [ ] Email capture works (console.log for now)
- [ ] 5-star social proof visible below hero
- [ ] Case studies and testimonials render cleanly on mobile
- [ ] OpenClaw page is shareable as standalone landing page
- [ ] No horizontal scroll on any viewport
- [ ] Lighthouse performance score > 85

---

## Timeline

| Phase | Tasks | ETA |
|-------|-------|-----|
| Phase 1 | WEB-001, WEB-002 (mobile fixes) | Now |
| Phase 2 | WEB-003, WEB-004 (offer redesign, social proof) | +30min |
| Phase 3 | WEB-005, WEB-006, WEB-007 (timer, funnel, email) | +30min |
| Phase 4 | WEB-008 (QA, screenshots, validation) | +15min |

**Total estimated:** ~75 minutes
