# OpenClaw Waitlist — Project State & Task Plan

**Last Updated:** 2026-03-25  
**URL:** https://weblyfe.ai/openclaw  
**Repo:** github.com/S3YED/weblyfe-ai (branch: main)  
**Vercel Project:** weblyfe-ai (team: Weblyfe)  
**Local clone for deploys:** /tmp/weblyfe-ai-deploy

---

## ⚠️ DEPLOY RULES (critical — read before touching)

1. **DO NOT commit from appie-brain repo** — commits authored as `appie1@weblyfe.nl` are blocked by Vercel (team access check)
2. **Deploy from:** `/tmp/weblyfe-ai-deploy` (cloned from S3YED/weblyfe-ai, author set to `s3yed@users.noreply.github.com`)
3. **Can't push via SSH or GitHub token** — SSH key only has access to appie-brain; GitHub token in .env.secrets is invalid
4. **Deploy method:** Vercel API directly (file upload + deployment create) — bypasses git author check
5. **Domain:** weblyfe.ai is verified on the weblyfe-ai Vercel project; do NOT remove/re-add domains (breaks TXT verification)

### Deploy command (working):
```python
# Upload files + create deployment via Vercel API
# See: python3 deploy script that uploads to /v2/files then POST /v13/deployments
# Project ID: prj_ehrQKPbbfx6VaZoiDSv82uHxb0ZO
# Team ID: team_uBPmGx3IyVFKpAcOcJHoWKm4
```

---

## Current State (2026-03-25)

### What's working
- `/openclaw` page loads with hero, features, how-it-works, packages, FAQ
- WaitlistForm: name + email + phone fields (phone not yet international format)
- API route `/api/waitlist` saves to correct Airtable base + table
- Airtable: appeYDScu0Gbiqcy9 (WeblyfeUniversity) > tblXjrB8K4Mc6U8Xu (🧲 Leads)
- Fields: First Name, Email, Phone, Marketing Channel = "Waitlist University", Status = "Waitlist"
- Env vars set on Vercel: AIRTABLE_API_KEY, AIRTABLE_WEBLYFE_BASE_ID, BREVO_API_KEY

### What's broken / missing
1. **weblyfe.ai is DOWN** — DNS TXT record mismatch (see fix below)
2. **No confirmation email** — BREVO_API_KEY exists but email sending not implemented
3. **Phone field not international** — should use a flag/country-code selector
4. **Timer section** — need to verify it's working (2-day countdown to pricing reveal)
5. **Mobile responsiveness** — needs review

---

## BLOCKER: weblyfe.ai domain down

**Why:** Domain verification TXT record was accidentally cycled.

**Fix (2 min — Seyed does this in Namecheap):**
- Go to Namecheap > weblyfe.ai > Advanced DNS
- Find TXT record for host `_vercel`
- Update value to: `vc-domain-verify=weblyfe.ai,7529882c8b1256c5ba2d`
- Also update www record to: `vc-domain-verify=www.weblyfe.ai,<check Vercel>`

---

## Task Plan

### P0 — Domain fix (Seyed)
- Update Namecheap TXT record (see above)

### P1 — Confirmation email via Brevo
- When someone signs up → send beautiful confirmation email
- Email content: "You're on the OpenClaw waitlist. We'll notify you when pricing drops."
- Include: what OpenClaw is, what they can expect, link back to page
- Use BREVO_API_KEY (already in Vercel env)
- Brevo API: POST https://api.brevo.com/v3/smtp/email

### P2 — Phone field international format
- Add react-phone-number-input or similar
- Shows country flag + dial code
- Validates format before submit

### P3 — Conversion review
- Review hero copy for clarity and conversion
- Ensure CTA above the fold
- Timer visible + communicates urgency well
- Social proof / trust signals adequate
- Mobile responsiveness audit

### P4 — Test full E2E
- Submit form → Airtable record created ✅
- Submit form → confirmation email received (after P1)
- Test on mobile (iPhone + Android)

---

## Airtable
- Base: appeYDScu0Gbiqcy9 (WeblyfeUniversity)
- Table: tblXjrB8K4Mc6U8Xu (🧲 Leads)
- Fields used: First Name, Email, Phone, Marketing Channel, Status
- Marketing Channel value: "Waitlist University"
- Status value: "Waitlist"

## Brevo
- Key: BREVO_API_KEY (in Vercel env, not in local .env.secrets)
- Sender: hello@weblyfe.ai (verify domain in Brevo dashboard first)
- Template: to be created

---

*This file is the source of truth. Update it when state changes.*
