# OpenClaw Landing Page - Optimization Plan

**Goal:** Optimize weblyfe.ai/openclaw to push visitors toward the waitlist using the TIPS model.
**Deadline:** Live tonight (2026-03-25)
**Countdown:** 72 hours from deploy time

---

## 📊 Current State

- Page exists at `/openclaw` (527 lines, OpenClawClient.tsx)
- Sections: Nav → Hero → Social Proof → Features → How It Works → Packages → Waitlist → CTA → FAQ → Footer
- Waitlist form works end-to-end (Airtable + Brevo confirmed)
- All CTAs currently point to TidyCal (book a call) — NOT the waitlist
- No countdown timer, no urgency
- No OpenClaw logo in nav
- No pricing on packages
- Previous strong version (commit `4339835`) had: StickyCountdown, 3-tier pricing, waitlist-focused CTAs

---

## 🎯 TIPS Model Application

### T — TEMPT (Hero Section)
**What:** Hook with headline, address pain points, show USPs

- [ ] **Add OpenClaw logo** in nav next to Weblyfe logo (`/public/openclaw-mark.svg`)
- [ ] **Headline:** Keep "Your Business, Running on Autopilot" (strong)
- [ ] **Replace hero CTAs:** "Book a Free Strategy Call" → "Join the Waitlist" (scroll to #offers)
- [ ] **Add countdown badge:** "🔥 Launch pricing expires in XX:XX:XX" below headline
- [ ] **Keep microcopy:** "No coding required · Fully managed setup · Runs 24/7"

### I — INFLUENCE (Social Proof + Authority)
**What:** Build trust via storytelling, authority, social proof

- [ ] **Keep trusted-by logos** (Lost LeBlanc, BeyondSchool, Dubai Property, etc.)
- [ ] **Add "Seyed's story" tagline:** "Built by a doctor-turned-tech-entrepreneur who runs this daily"
- [ ] **Add case study screenshots** (existing in `/public/screenshots/`)
- [ ] **Keep tool carousel** (if screenshots show one from previous version)

### P — PERSUADE (Features → Benefits)
**What:** Show benefits/outcomes, not just features

- [ ] **Keep features grid** (8 features, already benefit-focused)
- [ ] **Keep "How it Works"** 4-step process (Strategy → Build → Test → Go Live)
- [ ] **Add results stats section:** "20+ hours saved/week", "24/7 operations", "2-week setup"

### S — SELL (Packages + Urgency + Waitlist)
**What:** Price, urgency, handle objections, end with CTA

#### Pricing (3 tiers):
| Tier | Name | Price | Tag |
|------|------|-------|-----|
| DIY | Build It Yourself | €65 one-time | Self-Serve |
| Managed | Done With You | €250/month | MOST POPULAR |
| Custom | Done For You | €2,000+ | Enterprise |

- [ ] **Restore 3-tier pricing cards** with actual prices
- [ ] **Each card gets a waitlist form** (name + email) instead of "Get a Custom Quote"
- [ ] **Waitlist form sends package name** to Airtable (already supported in API)

#### Urgency:
- [ ] **StickyCountdown component** (restore from commit `4339835`)
  - Shows after scrolling past hero
  - Fixed to bottom of screen
  - 72-hour countdown (stored in localStorage per visitor)
  - "Join the Waitlist" button in the bar
- [ ] **Countdown in waitlist section** (inline, above the form)
- [ ] **Copy:** "Launch pricing closes in..." / "Lock in your spot"

#### Objection Handling (FAQ):
- [ ] Keep existing 6 FAQs (already good)
- [ ] **Add:** "Why is there a waitlist?" → "Limited spots for managed setup, ensuring quality for each client"
- [ ] **Add:** "What happens after I sign up?" → "You'll receive a confirmation email with next steps and early access details"

---

## 🔧 Technical Changes

### Files to modify:
1. `src/app/openclaw/OpenClawClient.tsx` — Full page rewrite
2. `src/components/WaitlistForm.tsx` — Add `package` prop, update form
3. `src/components/StickyCountdown.tsx` — Restore from git history (commit `4339835`)
4. `src/app/api/waitlist/route.ts` — Already handles `package` param ✅

### Assets available:
- `/public/openclaw-mark.svg` — OpenClaw logo (claw in circle)
- `/public/logo-gold.svg` — Weblyfe logo
- `/public/screenshots/` — 20+ case study screenshots
- `/public/logos/` — 10 tool logos (Notion, Airtable, Slack, etc.)

### Brevo confirmation email:
- Already sending to list 18 ("Weblyfe.ai Appie Waitlist") ✅
- Need to verify/create a welcome email template in Brevo

---

## 📋 Execution Order

### Phase 1: Components (15 min)
1. Restore `StickyCountdown.tsx` from git
2. Update `WaitlistForm.tsx` to accept `package` prop
3. Build + test locally

### Phase 2: Page Rewrite (30 min)  
4. Add OpenClaw logo to nav
5. Update hero CTAs to waitlist-focused
6. Restore 3-tier pricing with actual prices (€65 / €250/mo / €2,000+)
7. Add waitlist forms to each tier card
8. Add countdown timer to waitlist section
9. Update FAQ with 2 new questions
10. Replace all "Book a Call" CTAs with "Join the Waitlist"

### Phase 3: Polish (15 min)
11. Add Seyed's screenshots from previous version (awaiting from Seyed)
12. Verify mobile responsiveness
13. Test full E2E flow (page → form → Airtable → Brevo email)

### Phase 4: Deploy (5 min)
14. Build, commit, push
15. Verify on production
16. Run browser E2E test

---

## ⏳ Awaiting from Seyed

1. **Screenshots** of the stronger sections from previous version
2. **Confirmation on pricing:** €65 / €250/mo / €2,000+ (correct?)
3. **Package names:** "Build It Yourself" / "Done With You" / "Done For You" (correct?)
4. **Any specific copy** for the countdown/urgency messaging

---

## 🚫 Blockers

None! All credentials, APIs, and infrastructure confirmed working.

---

*Plan created: 2026-03-25 21:54 Bangkok*
*Framework: TIPS Model (Tempt → Influence → Persuade → Sell)*
