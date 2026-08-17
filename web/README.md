# OTHO — prototype

Client-review prototype of the OTHO Realty platform, built by Production X.

Static site, no build step, no dependencies. Open `index.html` or deploy the
folder as-is.

## What works

- **Search** — locality, configuration, status, budget slider, amenity multi-select, four sort orders including real rate per usable foot
- **Comparison engine** — any two of 20 projects, metrics derived from source figures, better-of-pair highlighted per row
- **Loading-factor calculator** — live recalculation, pre-filled per project
- **EMI and affordability calculator**
- **OTP registration** — progressive gate, demo code shown on screen
- **Newsletter subscription**
- **Shortlist** — persists to localStorage, renders a comparison table
- **Blog**, guides, market report, podcast, methodology, editorial charter, developer pitch, legal set
- **Leads dashboard** at `#/leads` — internal demo showing captured leads with automatic hot/warm/cold scoring

## The gate

Browsing, reviews, comparisons, guides and blog are open — search engines must
be able to crawl them and the brand promise is that nothing is hidden.

OTP verification is required only for high-intent actions: booking a site
visit, downloading the floor plan set, unlocking the full cost breakdown, and
saving a shortlist. Captured fields: phone, email, profession, buying timeline,
budget, plus the action that triggered it.

## Data

Project names, developers and localities are real and publicly listed. Sizes,
rates, land shares, scores and verdicts are **illustrative modelling for
demonstration** and are not published OTHO reviews or statements of fact about
any project. Verify against TG-RERA filings before any live use.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Shell, design tokens, all styles |
| `data.js` | 20 projects, 6 localities, blog, guides, episodes, scoring model |
| `app.js` | Router, views, OTP flow, search, calculators, comparison |

## Before going live

- Verified RERA carpet areas and pricing per project
- Photography and architect floor plans
- Real OTP provider (MSG91 / Twilio) and CRM webhook
- WhatsApp Business API for confirmations
- Legal pages reviewed by counsel
- Analytics and conversion tracking
