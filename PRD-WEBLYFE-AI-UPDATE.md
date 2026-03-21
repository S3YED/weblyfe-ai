# PRD: Weblyfe.ai Website Update
**Version:** 1.0  
**Date:** 2026-03-21  
**Owner:** Seyed  
**Status:** 🔨 In Progress

---

## Executive Summary

Update weblyfe.ai with improved animations, consolidated case studies, new OpenClaw case study, and expanded services section.

---

## 1. Fix Scroll Animation Overlap

### Problem
Current scroll animations are being overlapped by other elements, causing visual glitches.

### Tasks
- [ ] **1.1** Audit all scroll animations on the site
- [ ] **1.2** Check z-index values on animated elements
- [ ] **1.3** Identify overlapping elements (likely header, sticky sections, or absolute positioned elements)
- [ ] **1.4** Fix z-index hierarchy:
  - Header/Nav: z-50
  - Scroll animations: z-10
  - Background elements: z-0
- [ ] **1.5** Add `isolation: isolate` to animation containers if needed
- [ ] **1.6** Test on mobile and desktop viewports
- [ ] **1.7** Verify smooth scrolling behavior

### Files to Check
- `src/components/CaseStudies.tsx`
- `src/components/Header.tsx`
- `src/app/globals.css`
- Any Framer Motion/scroll animation components

---

## 2. Consolidate Case Studies: Super Assistant Employee

### Concept
Combine smaller AI assistant case studies into one powerful "Super Assistant Employee" case study that showcases multiple use cases.

### Stories to Include

#### 2.1 Appie System (Weblyfe Internal)
- **What:** Multi-agent AI system running Weblyfe operations
- **Appie-1:** Orchestrator (Mac Mini) - coordinates all operations
- **Appie-2:** CMO Herald (DO) - marketing, content, brand
- **Appie-3:** CTO DevOps (DO) - engineering, infrastructure
- **Results:** 24/7 autonomous operations, daily briefs, proactive alerts

#### 2.2 Eva (Dubai Property)
- **Client:** Dubai Property (dubai-property.nl)
- **What:** Dutch-speaking AI assistant for real estate inquiries
- **Features:** 
  - WhatsApp integration
  - Lead qualification
  - Property recommendations
  - Event registration handling
- **Results:** Handles inquiries 24/7, speaks fluent Dutch

#### 2.3 Ben de Voorman (CZA)
- **Client:** CZA Construction
- **What:** AI site manager for construction projects
- **Features:**
  - Project status tracking
  - Team coordination
  - Safety compliance checks
  - Progress reporting
- **Results:** Real-time project visibility, reduced admin overhead

#### 2.4 Garavito
- **Client:** Garavito (details TBD)
- **What:** AI assistant implementation
- **Features:** TBD
- **Results:** TBD

### Tasks
- [ ] **2.1** Create new case study page: `/case-studies/super-assistant-employee`
- [ ] **2.2** Write unified narrative connecting all four stories
- [ ] **2.3** Design visual layout showing multiple agents/assistants
- [ ] **2.4** Create comparison table of capabilities
- [ ] **2.5** Add testimonials from each client (if available)
- [ ] **2.6** Gather screenshots/visuals from each implementation
- [ ] **2.7** Write results/metrics section
- [ ] **2.8** Remove individual smaller case studies from main grid
- [ ] **2.9** Feature this as a PRIMARY case study

### Content Structure
```markdown
# The Super Assistant Employee

## Introduction
What if you could hire an employee that never sleeps, never gets sick, 
speaks multiple languages, and costs a fraction of a full-time hire?

## Client Stories

### 🏢 Eva - Dubai Property
The Dutch-speaking real estate specialist...

### 🏗️ Ben - CZA Construction  
The AI site manager who never misses a detail...

### 🤖 Appie - Weblyfe
The multi-agent system running our own company...

### 📊 Garavito
[Story TBD]

## Capabilities Matrix
| Feature | Eva | Ben | Appie | Garavito |
|---------|-----|-----|-------|----------|
| 24/7 Availability | ✅ | ✅ | ✅ | ✅ |
| WhatsApp | ✅ | ✅ | ✅ | TBD |
| Telegram | ❌ | ❌ | ✅ | TBD |
| Lead Qualification | ✅ | ❌ | ✅ | TBD |
| Project Management | ❌ | ✅ | ✅ | TBD |
| Multi-language | ✅ | ✅ | ✅ | TBD |

## Results
- 500+ hours saved per month
- 24/7 availability
- 90%+ response accuracy
- Zero sick days

## Ready to build your Super Assistant?
[CTA Button]
```

---

## 3. New Case Study: OpenClaw

### Concept
Create a comprehensive case study showcasing OpenClaw as the infrastructure powering modern AI assistants.

### Features to Highlight

#### 3.1 Bookings & Meetings
- Google Calendar integration
- Automatic scheduling
- Meeting prep and follow-ups
- Conflict detection

#### 3.2 Content Management
- Autonomous blog writing
- Social media scheduling
- Content research
- SEO optimization

#### 3.3 Site Management
- Deployment monitoring
- DNS management
- SSL/security checks
- Performance alerts

#### 3.4 Costing & Analytics
- API usage tracking
- Cost monitoring per agent
- ROI calculations
- Usage dashboards

#### 3.5 Mission Control Dashboard
- Real-time agent status
- Version tracking across fleet
- Cron job monitoring
- Security scan results

### Tasks
- [ ] **3.1** Create new case study page: `/case-studies/openclaw`
- [ ] **3.2** Write introduction explaining OpenClaw concept
- [ ] **3.3** Document each feature category with screenshots
- [ ] **3.4** Create architecture diagram showing components
- [ ] **3.5** Add Mission Control dashboard screenshots
- [ ] **3.6** Write technical capabilities section
- [ ] **3.7** Add pricing/value proposition
- [ ] **3.8** Include testimonial or internal results
- [ ] **3.9** Feature as PRIMARY case study alongside Super Assistant

### Content Structure
```markdown
# OpenClaw: The AI Operations Platform

## What is OpenClaw?
The infrastructure that powers autonomous AI agents for businesses.
Built by Weblyfe, battle-tested in production.

## Core Capabilities

### 📅 Bookings & Meetings
Never miss an appointment again. Your AI handles scheduling, 
reminders, and follow-ups automatically.

### 📝 Content Management  
From research to publication. Autonomous content creation 
that maintains your brand voice.

### 🌐 Site Management
24/7 monitoring of your digital infrastructure. 
DNS, deployments, security - all automated.

### 💰 Cost & Analytics
Know exactly what your AI costs and delivers. 
Real-time ROI tracking.

### 🎛️ Mission Control
Your command center for AI operations.
Fleet status, version control, security scans.

## Architecture
[Diagram showing: Gateways → Agents → Integrations → Outputs]

## Results
- Weblyfe: 3 Appies managing entire company
- Dubai Property: Eva handling 1000+ inquiries/month
- CZA: Ben tracking 15 active construction sites

## Get OpenClaw for Your Business
[CTA: Book Setup Consultation]
```

---

## 4. New Service: OpenClaw Setup

### Concept
Add OpenClaw Setup as a standalone service offering.

### Service Description
```
OpenClaw Setup

Deploy your own AI operations platform. We install, configure, 
and train your custom AI agent system.

What's Included:
✅ Full OpenClaw installation on your infrastructure
✅ Custom agent configuration (1-3 agents)
✅ Integration with your tools (Slack, Telegram, WhatsApp, etc.)
✅ Mission Control dashboard access
✅ 30-day support & training
✅ Documentation & runbooks

Investment: Starting at €X,XXX
Timeline: 2-4 weeks
```

### Tasks
- [ ] **4.1** Add OpenClaw Setup to services section on homepage
- [ ] **4.2** Create dedicated service page: `/services/openclaw-setup`
- [ ] **4.3** Define pricing tiers (Basic, Pro, Enterprise)
- [ ] **4.4** Write service description and benefits
- [ ] **4.5** Create process/timeline graphic
- [ ] **4.6** Add FAQ section
- [ ] **4.7** Include "What's Included" checklist
- [ ] **4.8** Add CTA to book consultation

### Pricing Tiers (Proposed)
| Tier | Agents | Integrations | Support | Price |
|------|--------|--------------|---------|-------|
| Starter | 1 | 3 | 14 days | €2,500 |
| Pro | 3 | 10 | 30 days | €5,000 |
| Enterprise | Unlimited | Unlimited | 90 days | Custom |

---

## 5. New Service: Business Foundation Fix

### Concept
Add service for connecting and fixing the whole foundation of a company.

### Service Description
```
Business Foundation Fix

Your tech stack is a mess. Tools don't talk to each other. 
Data lives in silos. We fix it.

What We Do:
✅ Audit your current tech stack
✅ Map data flows and integrations
✅ Identify bottlenecks and broken connections
✅ Design unified architecture
✅ Implement integrations (Zapier, Make, custom APIs)
✅ Set up proper data management
✅ Train your team

Perfect For:
- Companies with 5-50 employees
- Multiple disconnected tools
- Manual data entry between systems
- "We've outgrown our setup" situations

Investment: Starting at €X,XXX
Timeline: 2-6 weeks (depending on complexity)
```

### Tasks
- [ ] **5.1** Add Business Foundation to services section
- [ ] **5.2** Create dedicated service page: `/services/business-foundation`
- [ ] **5.3** Write service description focusing on pain points
- [ ] **5.4** Create "Before/After" comparison visuals
- [ ] **5.5** List common tools we integrate (Notion, Airtable, HubSpot, etc.)
- [ ] **5.6** Add process/timeline graphic
- [ ] **5.7** Include case study mini-example
- [ ] **5.8** Add CTA to book audit call

---

## 6. Updated Services Section

### Current Services (keep)
- Web Development
- Branding & Design
- AI & Automation

### New Services (add)
- **OpenClaw Setup** - Deploy your AI operations platform
- **Business Foundation Fix** - Connect and fix your tech stack

### Tasks
- [ ] **6.1** Update homepage services grid to include new services
- [ ] **6.2** Create icons/visuals for new services
- [ ] **6.3** Update navigation to include new service pages
- [ ] **6.4** Ensure consistent styling across all service pages

---

## 7. Updated Case Studies Grid

### Primary Case Studies (featured)
1. **Super Assistant Employee** (NEW - consolidated)
2. **OpenClaw** (NEW)
3. **SAFESITE Security** (existing)
4. **PrivaNotify** (existing)

### Secondary/Archive
- Move individual assistant case studies into Super Assistant
- Keep other case studies as secondary

### Tasks
- [ ] **7.1** Redesign case studies grid with primary/secondary hierarchy
- [ ] **7.2** Feature Super Assistant and OpenClaw prominently
- [ ] **7.3** Remove redundant individual case studies
- [ ] **7.4** Update case study routing/navigation

---

## 8. Technical Implementation

### Files to Create
```
src/app/case-studies/super-assistant-employee/page.tsx
src/app/case-studies/openclaw/page.tsx
src/app/services/openclaw-setup/page.tsx
src/app/services/business-foundation/page.tsx
```

### Files to Update
```
src/components/CaseStudies.tsx (update grid, fix animation z-index)
src/components/Services.tsx (add new services)
src/components/Header.tsx (update nav if needed)
src/app/globals.css (z-index fixes)
content/case-studies/ (add new MDX files if using content layer)
```

### Assets Needed
- [ ] Super Assistant hero image/illustration
- [ ] OpenClaw architecture diagram
- [ ] Mission Control dashboard screenshots
- [ ] Icons for new services
- [ ] Client logos (Eva, Ben, Garavito)

---

## 9. Priority Order

### Phase 1: Quick Wins (1-2 hours)
1. Fix scroll animation z-index issue
2. Update services section with new service cards

### Phase 2: Content Creation (2-4 hours)
1. Write Super Assistant Employee case study
2. Write OpenClaw case study
3. Write new service page content

### Phase 3: Implementation (2-4 hours)
1. Create new page components
2. Update routing
3. Integrate new content
4. Test and deploy

### Phase 4: Polish (1-2 hours)
1. Add visuals and screenshots
2. Test all links and navigation
3. Mobile responsiveness check
4. Final review and publish

---

## 10. Success Criteria

- [ ] Scroll animations work without overlap on all pages
- [ ] Super Assistant Employee case study live and featured
- [ ] OpenClaw case study live and featured
- [ ] OpenClaw Setup service page live
- [ ] Business Foundation service page live
- [ ] All new pages mobile responsive
- [ ] Navigation updated
- [ ] No broken links
- [ ] Build passes without errors

---

---

## 11. Visual Enhancement: Make It a Masterpiece

### Vision
Use scraped images from weblyfe.nl and weblyfeuniversity.com to create a visually rich, story-driven experience. The site should feel ALIVE, premium, and consistent with the Weblyfe portfolio aesthetic.

### Available Assets
**Location:** `/Users/appie/clawd/tmp/scraped-images/`

#### From weblyfe.nl (61 files, 15MB)
- Client logos (Lost LeBlanc, Dubai Property, BeyondSchool, Stasher, etc.)
- Tool logos (Webflow, Notion, Airtable, Zapier, Figma, OpenAI)
- Team/lifestyle images
- Case study banners
- Brand assets (Weblyfe monogram, gold theme)

#### From weblyfeuniversity.com (106 files, 3.7MB)
- Seyed Hosseini professional photos
- Team member photos (Zohair, Ricky, Samouil, Mahmoud, Karim, Talon, Hannah)
- Curriculum icons and graphics
- Course mockups
- VSL thumbnails
- Module icons (Webdesign, Webdevelopment, AI & Automations, Marketing, Sales)

### Visual Direction

#### 1. Hero Sections
- [ ] Full-bleed hero images with gradient overlays
- [ ] Seyed's professional photo as trust element
- [ ] Client logo strip (social proof)
- [ ] Animated counters or stats

#### 2. Case Study Cards
- [ ] Rich imagery showing actual results
- [ ] Before/after comparisons where applicable
- [ ] Client logos prominently displayed
- [ ] Screenshot mockups in device frames

#### 3. Team/About Section
- [ ] Use scraped team photos (Seyed, Zohair, Ricky, etc.)
- [ ] Professional headshots with hover effects
- [ ] "Meet the team behind your AI" narrative

#### 4. Services Section
- [ ] Use curriculum icons for visual categorization
- [ ] Tool logo strips showing tech stack
- [ ] Process diagrams with custom graphics

#### 5. Social Proof Strip
- [ ] Rotating client logos (Lost LeBlanc, Dubai Property, BeyondSchool, etc.)
- [ ] "Trusted by" section with recognizable brands
- [ ] Testimonial cards with client photos

### Weblyfe.nl Aesthetic Reference
- **Colors:** Gold accents on dark/cream backgrounds
- **Typography:** Clean, modern, premium feel
- **Layout:** Generous whitespace, asymmetric grids
- **Animation:** Subtle scroll animations, hover effects
- **Imagery:** High-quality, lifestyle-focused, aspirational

### Implementation Tasks

#### Phase 1: Asset Preparation
- [ ] **11.1** Copy best images to `/public/images/` in weblyfe-ai project
- [ ] **11.2** Optimize images for web (convert to WebP/AVIF where not already)
- [ ] **11.3** Create device mockup frames for screenshots
- [ ] **11.4** Prepare logo sprites for client strip

#### Phase 2: Hero Enhancement
- [ ] **11.5** Add Seyed professional photo to hero or about section
- [ ] **11.6** Create animated client logo marquee
- [ ] **11.7** Add gradient overlays matching gold theme

#### Phase 3: Case Studies Visual Upgrade
- [ ] **11.8** Add rich imagery to Super Assistant case study
- [ ] **11.9** Add Mission Control screenshots to OpenClaw case study
- [ ] **11.10** Create visual story flow for each case study

#### Phase 4: Services Visual Upgrade
- [ ] **11.11** Add module icons to service cards
- [ ] **11.12** Create tool stack visual for each service
- [ ] **11.13** Add process/timeline graphics

#### Phase 5: Social Proof
- [ ] **11.14** Implement client logo carousel
- [ ] **11.15** Add team section with photos
- [ ] **11.16** Create testimonial cards with client imagery

### Key Images to Use

| Image | Use Case |
|-------|----------|
| `67a46d44_Seyed Hosseini Techwiz Lifestyle` | Hero/About section |
| `67a46f77_Main Techwiz Seyed Hosseini` | Building trust |
| `Lost LeBlanc.avif` | Client social proof |
| `Dubai Property.avif` | Case study / client strip |
| `BeyondSchool.avif` | Client social proof |
| `67a5f5fe_Webdevelopment.avif` | Services section |
| `67a5f5fe_AI & Automations.avif` | Services section |
| `Logo Gold + Wordmark.png` | Header/footer |
| Team photos (Zohair, Ricky, etc.) | Team section |

---

## Notes

- **Garavito details:** Need to gather more info about this client/project
- **Pricing:** Placeholder prices - Seyed to confirm actual pricing
- **Screenshots:** Need to capture fresh Mission Control and agent screenshots
- **Timeline:** Target completion within 1-2 days
- **Visual goal:** Match weblyfe.nl aesthetic - gold, premium, story-driven

---

*PRD created by Appie-1 | 2026-03-21 22:42 Bangkok*
*Updated with visual enhancement section | 2026-03-21 22:47 Bangkok*
