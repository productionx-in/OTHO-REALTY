const pptxgen = require("pptxgenjs");

/* ---------------------------------------------------------------
   PALETTE — deep ink + brass. Restrained, borderless, tonal depth.
--------------------------------------------------------------- */
const INK      = "14181D";
const INK_2    = "1D242C";
const PAPER    = "FAFAF8";
const CARD     = "FFFFFF";
const CARD_2   = "F1F1ED";
const BRASS    = "9A7A25";
const BRASS_BR = "D9B061";
const T1       = "14181D";
const T2       = "555C64";
const T3       = "8A9099";
const D1       = "FFFFFF";
const D2       = "B6BEC7";
const D3       = "79818A";
const GREEN    = "2E7150";
const GREEN_BG = "E6F0EA";
const RED      = "A8382C";
const RED_BG   = "F8E9E7";
const BLUE     = "27548F";

const HEAD = "Cambria";
const BODY = "Calibri";

/* ---------------------------------------------------------------
   GRID — every position derives from these. Nothing hand-placed.
--------------------------------------------------------------- */
const SW = 13.333;
const M  = 0.85;
const W  = SW - M * 2;          // 11.633
const GUT = 0.30;
const BOTTOM = 6.90;

const EYEBROW_Y = 0.58;
const TITLE_Y   = 0.84;
const LEAD_Y    = 1.60;
const BODY_Y    = 2.26;
const BODY_Y_NL = 1.74;

function cw(n) { return (W - GUT * (n - 1)) / n; }
function cx(i, n) { return M + i * (cw(n) + GUT); }
function softShadow() {
  return { type: "outer", color: "14181D", blur: 14, offset: 3, angle: 90, opacity: 0.07 };
}

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Production X";
pres.company = "Production X";
pres.title = "Building OTHO";

function slideL() { const s = pres.addSlide(); s.background = { color: PAPER }; return s; }
function slideD() { const s = pres.addSlide(); s.background = { color: INK };   return s; }

function head(s, num, title, lead) {
  s.addText(num, {
    x: M, y: EYEBROW_Y, w: W, h: 0.24,
    fontFace: BODY, fontSize: 11, bold: true, color: BRASS,
    charSpacing: 2.6, margin: 0, valign: "middle"
  });
  s.addText(title, {
    x: M, y: TITLE_Y, w: W, h: 0.66,
    fontFace: HEAD, fontSize: 38, bold: true, color: T1,
    charSpacing: -0.6, margin: 0, valign: "middle"
  });
  if (lead) {
    s.addText(lead, {
      x: M, y: LEAD_Y, w: W - 1.2, h: 0.5,
      fontFace: BODY, fontSize: 15.5, color: T2, lineSpacing: 22, margin: 0, valign: "top"
    });
  }
  return lead ? BODY_Y : BODY_Y_NL;
}

function band(s, x, y, w, h, dark) {
  s.addShape(pres.ShapeType.rect, {
    x, y, w, h,
    fill: { color: dark ? INK_2 : CARD },
    line: { type: "none" }
  });
}

/* ============================================================ 1 */
{
  const s = slideD();
  s.addText("PRODUCTION X", {
    x: M, y: 0.78, w: 6, h: 0.3,
    fontFace: BODY, fontSize: 11.5, bold: true, color: BRASS_BR, charSpacing: 3.4, margin: 0
  });
  s.addText("Building OTHO", {
    x: M, y: 2.02, w: 11.2, h: 1.55,
    fontFace: HEAD, fontSize: 68, bold: true, color: D1, charSpacing: -1.4, margin: 0, valign: "middle"
  });
  s.addText(
    "Where you stand today, what's broken in Indian property platforms, " +
    "the product we build in that gap, and the first 90 days.",
    { x: M, y: 3.72, w: 8.0, h: 1.0, fontFace: BODY, fontSize: 17.5, color: D2, lineSpacing: 27, margin: 0 }
  );
  const facts = [
    ["STARTING", "Neopolis, Kokapet"],
    ["FIRST MILESTONE", "90 days"],
    ["THE MODEL", "CarWale, for property"],
    ["HORIZON", "Hyderabad, India, global"]
  ];
  facts.forEach((f, i) => {
    const x = cx(i, 4), w = cw(4);
    s.addText(f[0], {
      x, y: 5.42, w, h: 0.26,
      fontFace: BODY, fontSize: 9.5, color: D3, charSpacing: 1.8, margin: 0
    });
    s.addText(f[1], {
      x, y: 5.72, w, h: 0.42,
      fontFace: HEAD, fontSize: 13.5, bold: true, color: D1, margin: 0, valign: "middle"
    });
  });
  s.addText("Strategy & launch plan for OTHO Realty   ·   August 2026", {
    x: M, y: 6.62, w: W, h: 0.28, fontFace: BODY, fontSize: 10.5, color: D3, charSpacing: 0.4, margin: 0
  });
  s.addNotes("Open here. This is a strategy deck, not a campaign plan. Say: I looked at where OTHO stands online today, what every competitor gets wrong, and what we build in that gap. We start with Neopolis and the same system carries to every project after.");
}

/* ============================================================ 2 */
{
  const s = slideD();
  s.addText("What's in this", {
    x: M, y: 0.72, w: W, h: 0.8,
    fontFace: HEAD, fontSize: 40, bold: true, color: D1, charSpacing: -0.7, margin: 0, valign: "middle"
  });
  const rows = [
    ["01", "Where OTHO stands today", "The honest audit. Both names, zero footprint."],
    ["02", "The gap in the market", "Why no existing platform can fix its worst problem."],
    ["03", "SWOT", "What we have, what we lack, and what could go wrong."],
    ["04", "The model and the platform", "CarWale for property. What we build, borrowed from whom."],
    ["05", "Budget and what it returns", "Three levels, and how little has to happen to break even."],
    ["06", "The first 90 days", "Week by week, with something finished each month."],
    ["07", "Ten years", "Hyderabad to India to global, as a sequence."]
  ];
  rows.forEach((r, i) => {
    const y = 1.86 + i * 0.72;
    s.addText(r[0], {
      x: M, y, w: 0.72, h: 0.56,
      fontFace: HEAD, fontSize: 17, bold: true, color: BRASS_BR, margin: 0, valign: "middle"
    });
    s.addText(r[1], {
      x: M + 0.82, y, w: 4.5, h: 0.56,
      fontFace: HEAD, fontSize: 16.5, bold: true, color: D1, margin: 0, valign: "middle"
    });
    s.addText(r[2], {
      x: M + 5.55, y, w: W - 5.55, h: 0.56,
      fontFace: BODY, fontSize: 13.5, color: D3, margin: 0, valign: "middle"
    });
  });
  s.addNotes("Walk through the agenda quickly, about 30 seconds. The point is to signal this is structured and finite, not a wandering pitch.");
}

/* ============================================================ 3 */
{
  const s = slideL();
  const y0 = head(s, "01", "What I found",
    "I searched for OTHO Realty the way a buyer would. Then I searched for Propertunity.");

  const rows = [
    ['"OTHO Realty" on Google', "Returns Square Yards, 99acres, NoBroker. Nothing about you.", "NOTHING", RED, RED_BG],
    ['"Propertunity" Hyderabad', "Returns firms in Florida, the UK and Australia. Not you.", "NOTHING", RED, RED_BG],
    ["Domain", "Secured — nothing live on it yet", "CLAIMED", BRASS, "F6EEDA"],
    ["Social accounts", "Created — nothing published yet", "CLAIMED", BRASS, "F6EEDA"],
    ["Published content", "No articles, guides or video indexed anywhere", "NOTHING", RED, RED_BG],
    ["Press and mentions", "No third-party coverage found", "NOTHING", RED, RED_BG],
    ["Founder relationships", "Two decades, tier-one developers. The whole asset.", "STRONG", GREEN, GREEN_BG]
  ];
  const rh = 0.58, gap = 0.06;
  rows.forEach((r, i) => {
    const y = y0 + i * (rh + gap);
    band(s, M, y, W, rh);
    s.addText(r[0], {
      x: M + 0.26, y, w: 3.5, h: rh,
      fontFace: HEAD, fontSize: 13.5, bold: true, color: T1, valign: "middle", margin: 0
    });
    s.addText(r[1], {
      x: M + 3.9, y, w: W - 3.9 - 1.8, h: rh,
      fontFace: BODY, fontSize: 12.5, color: T2, valign: "middle", margin: 0
    });
    s.addShape(pres.ShapeType.rect, {
      x: M + W - 1.62, y: y + 0.15, w: 1.36, h: 0.28,
      fill: { color: r[4] }, line: { type: "none" }
    });
    s.addText(r[2], {
      x: M + W - 1.62, y: y + 0.15, w: 1.36, h: 0.28,
      fontFace: BODY, fontSize: 9, bold: true, color: r[3],
      align: "center", valign: "middle", charSpacing: 1, margin: 0
    });
  });
  s.addNotes("This is your strongest opening. Hand them a phone and let them search. The domain and the social accounts are claimed, which is the right groundwork - but nothing has been published, so to a buyer searching today OTHO still does not exist. Do not apologise for this slide, it sets up the next one.");
}

/* ============================================================ 4 */
{
  const s = slideD();
  s.addText("The plots are claimed.\nNothing is built yet.", {
    x: M, y: 1.75, w: 10.5, h: 2.1,
    fontFace: HEAD, fontSize: 50, bold: true, color: D1, lineSpacing: 60, charSpacing: -1, margin: 0, valign: "middle"
  });
  s.addText(
    "Domain secured, social accounts created — and nothing published on any of them. " +
    "To a buyer searching today, OTHO does not exist.",
    { x: M, y: 4.25, w: 9.6, h: 0.7, fontFace: BODY, fontSize: 17, color: D1, lineSpacing: 26, margin: 0 }
  );
  s.addText(
    "That's an advantage, not a criticism. No dead campaigns, no complaints ranking on page one, nothing to " +
    "unpick. Every competitor here carries years of that. Everything OTHO publishes from now compounds instead " +
    "of competing with its own past.",
    { x: M, y: 5.1, w: 9.6, h: 1.0, fontFace: BODY, fontSize: 15, color: D3, lineSpacing: 24, margin: 0 }
  );
  s.addNotes("Credit the groundwork - the domain and handles are the right first step. Then make the argument: an empty account is still invisible, and starting clean is cheaper than starting from a bad reputation. This is why month one is foundation work.");
}

/* ============================================================ 5 */
{
  const s = slideL();
  const y0 = head(s, "02", "The market you're entering", null);

  const stats = [
    ["₹2.6 lakh cr", "Indian proptech market in 2025", "IMARC / KEN RESEARCH"],
    ["₹6.9 lakh cr", "Where it reaches by 2031", "IMARC / KEN RESEARCH"],
    ["19 months", "Unsold inventory in Hyderabad — worst in India", "ANAROCK"],
    ["40%", "Of ~10,000 Neopolis homes, still unsold", "TRADE PRESS 2026"]
  ];
  stats.forEach((st, i) => {
    const x = cx(i, 4), w = cw(4);
    s.addShape(pres.ShapeType.rect, {
      x, y: y0, w, h: 2.25, fill: { color: CARD }, line: { type: "none" }, shadow: softShadow()
    });
    s.addText(st[0], {
      x: x + 0.28, y: y0 + 0.24, w: w - 0.56, h: 0.72,
      fontFace: HEAD, fontSize: 26, bold: true, color: T1, charSpacing: -0.6, margin: 0, valign: "middle"
    });
    s.addText(st[1], {
      x: x + 0.28, y: y0 + 1.02, w: w - 0.56, h: 0.82,
      fontFace: BODY, fontSize: 12.5, color: T2, lineSpacing: 17, margin: 0, valign: "top"
    });
    s.addText(st[2], {
      x: x + 0.28, y: y0 + 1.86, w: w - 0.56, h: 0.26,
      fontFace: BODY, fontSize: 8.5, color: T3, charSpacing: 1.1, margin: 0
    });
  });
  s.addText(
    "Two things are true at once. The category is large and growing fast. And in Hyderabad, developers are " +
    "sitting on stock they cannot move — agents are quoting Neopolis units near ₹6,300/sq ft against list " +
    "prices of ₹11,000–12,000.",
    { x: M, y: y0 + 2.62, w: W, h: 0.9, fontFace: BODY, fontSize: 15.5, color: T1, lineSpacing: 24, margin: 0 }
  );
  s.addText(
    "That gap is the opening. When a developer's own pricing is undercut by half in the grey market, what they " +
    "need is not another listings portal. It's someone who brings buyers who arrive already convinced.",
    { x: M, y: y0 + 3.58, w: W, h: 0.9, fontFace: BODY, fontSize: 15.5, color: T2, lineSpacing: 24, margin: 0 }
  );
  s.addNotes("Rupee figures throughout. The proptech market converts from roughly 30 billion dollars at 2026 rates. Pause on the 6,300 versus 11,000 gap - that is the commercial argument for everything that follows.");
}

/* ============================================================ 6 */
{
  const s = slideL();
  const y0 = head(s, "03", "The gap",
    "Every major Indian platform runs the same business: collect a lead, sell it to several brokers, let them fight over it.");

  const w2 = cw(2), h = 3.35;
  s.addShape(pres.ShapeType.rect, {
    x: cx(0, 2), y: y0, w: w2, h, fill: { color: CARD }, line: { type: "none" }, shadow: softShadow()
  });
  s.addText("What buyers complain about", {
    x: cx(0, 2) + 0.32, y: y0 + 0.26, w: w2 - 0.64, h: 0.4,
    fontFace: HEAD, fontSize: 17, bold: true, color: T1, margin: 0, valign: "middle"
  });
  s.addText([
    { text: "Spam is complaint number one across reviews of every major portal", options: { bullet: true, breakLine: true } },
    { text: "People keep a second “property phone” — or change their number", options: { bullet: true, breakLine: true } },
    { text: "43% report encountering fraudulent listings", options: { bullet: true, breakLine: true } },
    { text: "Listings cloned across portals; AI-generated fake interiors", options: { bullet: true, breakLine: true } },
    { text: "The same flat listed by eight brokers at six different prices", options: { bullet: true } }
  ], {
    x: cx(0, 2) + 0.32, y: y0 + 0.78, w: w2 - 0.64, h: 2.35,
    fontFace: BODY, fontSize: 13, color: T2, paraSpaceAfter: 10, lineSpacing: 18, margin: 0
  });

  s.addShape(pres.ShapeType.rect, {
    x: cx(1, 2), y: y0, w: w2, h, fill: { color: INK }, line: { type: "none" }
  });
  s.addText("Why nobody fixes it", {
    x: cx(1, 2) + 0.32, y: y0 + 0.26, w: w2 - 0.64, h: 0.4,
    fontFace: HEAD, fontSize: 17, bold: true, color: BRASS_BR, margin: 0, valign: "middle"
  });
  s.addText(
    "They can't. Reselling one lead to eight brokers IS the revenue model.\n\n" +
    "A portal that promised never to share your number would have to dismantle its own P&L to keep the promise.\n\n" +
    "That's the gap. Not a feature they forgot — a door their business model locks from the inside.",
    { x: cx(1, 2) + 0.32, y: y0 + 0.78, w: w2 - 0.64, h: 2.35,
      fontFace: BODY, fontSize: 13.5, color: D2, lineSpacing: 21, margin: 0 }
  );

  s.addText(
    "Meanwhile the question buyers most want answered — which of these should I actually buy? — is served by " +
    "nobody. Portals answer “what is available.” Nobody answers “what is good.”",
    { x: M, y: y0 + h + 0.34, w: W, h: 0.8, fontFace: BODY, fontSize: 15.5, color: T1, lineSpacing: 24, margin: 0 }
  );
  s.addNotes("This is the most important slide in the deck. The gap is structural, not an oversight. Say the line about the door locked from the inside - it is what makes the opportunity defensible rather than just an idea.");
}

/* ============================================================ 7 */
{
  const s = slideD();
  s.addText("A platform with two million\nlistings is worthless if\nenquiring on one gets you\neight phone calls.", {
    x: M, y: 1.6, w: 11.2, h: 4.0,
    fontFace: HEAD, fontSize: 42, bold: true, color: D1, lineSpacing: 58, charSpacing: -0.8, margin: 0, valign: "middle"
  });
  s.addNotes("Deliver this slowly. It reframes the entire category from a scale competition to a trust competition - which is the only competition OTHO can win from a standing start.");
}

/* ============================================================ 8 */
{
  const s = slideL();
  const y0 = head(s, "04", "Who we're up against", null);

  const colw = [1.85, 2.15, 3.75, 3.88];
  const hdr = ["Player", "Scale", "Model", "Where they're weak"];
  s.addShape(pres.ShapeType.rect, { x: M, y: y0, w: W, h: 0.4, fill: { color: INK }, line: { type: "none" } });
  let ax = M;
  hdr.forEach((hd, i) => {
    s.addText(hd.toUpperCase(), {
      x: ax + 0.22, y: y0, w: colw[i] - 0.3, h: 0.4,
      fontFace: BODY, fontSize: 9, bold: true, color: D2, charSpacing: 1.3, valign: "middle", margin: 0
    });
    ax += colw[i];
  });

  const rows = [
    ["NoBroker", "₹803cr FY24, +32%\n34mn installs\n3.2mn monthly users",
     "Zero brokerage. ₹999 subscription. Services — loans, movers, interiors. Bank referrals ~₹120cr.",
     "Built for rentals and resale, not new launches. Thin on premium. No advisory layer."],
    ["99acres", "~13.3mn visits / month", "Classifieds. Developers and brokers pay to list and be seen.",
     "Pure volume. Lead resold repeatedly. No opinion on anything."],
    ["MagicBricks", "~12.1mn visits / month", "Classifieds plus locality data and price trend tools.",
     "Has data but no judgement. Tools sit beside the same lead-resale engine."],
    ["Housing.com", "~9.8mn visits / month", "Classifieds with better design and mapping.",
     "Best interface of the four, same underlying business."],
    ["Square Yards", "₹1,410cr FY25\nEBITDA ₹46cr", "Full-service brokerage at volume.",
     "3.3% margin. Proof that chasing transaction volume is a trap."]
  ];
  const rh = 0.78, gap = 0.06;
  rows.forEach((r, i) => {
    const y = y0 + 0.46 + i * (rh + gap);
    const last = i === rows.length - 1;
    band(s, M, y, W, rh, last);
    let x = M;
    r.forEach((cell, j) => {
      s.addText(cell, {
        x: x + 0.22, y, w: colw[j] - 0.34, h: rh,
        fontFace: j === 0 ? HEAD : BODY,
        fontSize: j === 0 ? 13.5 : 11,
        bold: j === 0,
        color: last ? (j === 0 ? BRASS_BR : D2) : (j === 0 ? T1 : T2),
        lineSpacing: j === 1 ? 14 : 15,
        valign: "middle", margin: 0
      });
      x += colw[j];
    });
  });
  s.addNotes("Read across the last row deliberately - it is highlighted for a reason. Square Yards built 1,410 crore of revenue and kept 46 crore. Use it to say what OTHO will refuse to do: never compete on listing count or transaction volume.");
}

/* ============================================================ 9 */
{
  const s = slideD();
  s.addText("THE LESSON IN THE LAST ROW", {
    x: M, y: 1.45, w: W, h: 0.3,
    fontFace: BODY, fontSize: 10.5, bold: true, color: BRASS_BR, charSpacing: 2.6, margin: 0
  });
  s.addText("₹1,410cr in.\n₹46cr kept.", {
    x: M, y: 2.05, w: 6.0, h: 2.2,
    fontFace: HEAD, fontSize: 54, bold: true, color: D1, lineSpacing: 66, charSpacing: -1.4, margin: 0, valign: "middle"
  });
  s.addText(
    "Volume brokerage in India is a treadmill.\n\n" +
    "OTHO should never compete on listing count or transaction volume. That race is won by whoever burns " +
    "the most money, and the prize is a 3% margin.\n\n" +
    "Compete on judgement instead. Judgement has margin.",
    { x: M + 6.5, y: 2.15, w: W - 6.5, h: 2.7, fontFace: BODY, fontSize: 15.5, color: D2, lineSpacing: 25, margin: 0 }
  );
  s.addNotes("Founders with big ambitions usually want volume. This slide argues for margin instead, backed by a real company's filings. Expect a question here - the answer is that OTHO earns from mandates and data, not from GMV.");
}

/* ==================================================== 10 & 11 SWOT */
function swotSlide(title, left, right, notes) {
  const s = slideL();
  const y0 = head(s, "05", title, null);
  const w2 = cw(2), h = BOTTOM - y0;

  [left, right].forEach((pane, i) => {
    const x = cx(i, 2);
    s.addShape(pres.ShapeType.rect, {
      x, y: y0, w: w2, h, fill: { color: CARD }, line: { type: "none" }, shadow: softShadow()
    });
    s.addShape(pres.ShapeType.ellipse, {
      x: x + 0.34, y: y0 + 0.34, w: 0.15, h: 0.15, fill: { color: pane.color }, line: { type: "none" }
    });
    s.addText(pane.title, {
      x: x + 0.62, y: y0 + 0.24, w: w2 - 0.94, h: 0.36,
      fontFace: HEAD, fontSize: 18, bold: true, color: T1, valign: "middle", margin: 0
    });
    const runs = [];
    pane.items.forEach((it, j) => {
      runs.push({ text: it[0], options: { bold: true, color: T1, breakLine: true } });
      runs.push({ text: it[1], options: { color: T2, breakLine: j !== pane.items.length - 1 } });
    });
    s.addText(runs, {
      x: x + 0.34, y: y0 + 0.76, w: w2 - 0.68, h: h - 1.05,
      fontFace: BODY, fontSize: 11.5, lineSpacing: 16, paraSpaceAfter: 9, margin: 0, valign: "top"
    });
  });
  s.addNotes(notes);
}

swotSlide("SWOT — what we have, what we lack",
  { title: "Strengths", color: GREEN, items: [
    ["Tier-one relationships", "Direct access to DSR, Sattva, My Home, Aparna, Prestige. Around 70% of Indian residential sales run through channel partners. A funded startup can buy engineers; it cannot buy twenty years of trust with a developer's sales head."],
    ["Timing", "A 19-month overhang means developers are actively looking for a better answer right now."],
    ["No legacy tech debt", "The portals are locked into the shared-lead P&L. OTHO can build the clean architecture from zero."],
    ["Regulatory tailwind", "TRAI and DPDP rules make the spam-and-resell model steadily more expensive."]
  ]},
  { title: "Weaknesses", color: RED, items: [
    ["No product or data engineering yet", "The comparison engine is a data acquisition and verification problem across RERA, HMDA and registration records. This is what kills proptech startups."],
    ["Zero digital brand equity", "Twenty years of word-of-mouth does not transfer to search."],
    ["Advisory doesn't scale linearly", "Every mandate consumes senior human time."],
    ["Key-person dependency", "Relationships and podcast authority both sit with the founders."],
    ["Working capital", "Commission pays on registration, so cash lands 3–9 months behind the cost."]
  ]},
  "Do not rush the weaknesses. Presenting them honestly to people with twenty years of experience buys more credibility than any strength on the left. The data engineering point is the real risk - flag that we will need a technical hire or partner by month four.");

swotSlide("SWOT — the opening, and what could go wrong",
  { title: "Opportunities", color: BLUE, items: [
    ["The overhang itself", "Roughly 97,000 unsold units is a large, motivated mandate pipeline. Every stuck project is a sales conversation."],
    ["The transparency vacuum", "No Indian portal publishes loading factor, true density or UDS as standard fields."],
    ["AI citation land-grab", "Brands cited in AI answers earn far more clicks, and AI referral traffic converts around 3x. That window is open now."],
    ["Bharat Future City", "Master plan and zoning due December 2026 — a dateable, high-search event with no incumbent authority."],
    ["NRI buyers", "Under-served, higher ticket sizes, and they need an honest proxy on the ground."]
  ]},
  { title: "Threats", color: BRASS, items: [
    ["Developer backlash on honest negatives", "We earn from developers while publishing unflattering facts. Needs a written editorial charter, agreed up front."],
    ["Incumbent capital response", "Housing or 99acres can copy a comparison engine faster than we can build a brand. Defensibility is exclusive inventory and verified data, not features."],
    ["A deepening downturn", "If the overhang passes 24 months, marketing budgets and commissions get cut together."],
    ["RERA exposure", "₹10,000/day penalties and mandatory RERA numbers in every ad. One sloppy campaign is existential for a firm selling trust."],
    ["Defamation risk", "“This project is bad” is litigable. A cited pollution reading is not. The distinction must be enforced editorially."]
  ]},
  "The threats column is where you show you have thought past the pitch. The defamation point matters - honest negatives must be built on cited facts, never opinion. Offer to bring in media counsel before the first negative is published.");

/* ============================================================ 12 */
{
  const s = slideD();
  s.addText("WHAT THE SWOT FORCES", {
    x: M, y: 1.0, w: W, h: 0.3,
    fontFace: BODY, fontSize: 10.5, bold: true, color: BRASS_BR, charSpacing: 2.6, margin: 0
  });
  s.addText("The moat is not the platform.\nFeatures get copied.", {
    x: M, y: 1.6, w: 11.0, h: 1.6,
    fontFace: HEAD, fontSize: 40, bold: true, color: D1, lineSpacing: 50, charSpacing: -0.9, margin: 0, valign: "middle"
  });
  const cols = [
    ["Exclusive inventory", "Mandates competitors literally cannot list."],
    ["Verified data", "A proprietary dataset built by physically auditing projects."],
    ["A trust brand", "One the portals cannot adopt without cannibalising their own revenue."]
  ];
  cols.forEach((c, i) => {
    const x = cx(i, 3), w = cw(3);
    s.addShape(pres.ShapeType.rect, {
      x, y: 3.62, w, h: 1.95, fill: { color: INK_2 }, line: { type: "none" }
    });
    s.addText(c[0], {
      x: x + 0.32, y: 3.88, w: w - 0.64, h: 0.44,
      fontFace: HEAD, fontSize: 16, bold: true, color: BRASS_BR, margin: 0, valign: "middle"
    });
    s.addText(c[1], {
      x: x + 0.32, y: 4.38, w: w - 0.64, h: 1.0,
      fontFace: BODY, fontSize: 12.5, color: D2, lineSpacing: 19, margin: 0
    });
  });
  s.addText("The platform is the delivery mechanism for those three. Build in that order.", {
    x: M, y: 5.92, w: W, h: 0.5, fontFace: BODY, fontSize: 16, italic: true, color: D1, margin: 0, valign: "middle"
  });
  s.addNotes("This is the strategic conclusion. If they remember one thing from the middle of the deck, it should be that features get copied and the archive of honest reviews does not.");
}

/* ============================================================ 13 */
{
  const s = slideD();
  s.addText("06", {
    x: M, y: 1.55, w: 1.2, h: 0.4,
    fontFace: BODY, fontSize: 11, bold: true, color: BRASS_BR, charSpacing: 2.6, margin: 0
  });
  s.addText("The model:\nCarWale, for property.", {
    x: M, y: 2.05, w: 10.5, h: 2.0,
    fontFace: HEAD, fontSize: 48, bold: true, color: D1, lineSpacing: 60, charSpacing: -1.2, margin: 0, valign: "middle"
  });
  s.addText(
    "CarWale did not beat the classifieds by having more cars. It won by owning the step before the " +
    "transaction — expert reviews, side-by-side comparisons, price guides, owner ratings, EMI calculators.",
    { x: M, y: 4.4, w: 10.2, h: 0.8, fontFace: BODY, fontSize: 16, color: D1, lineSpacing: 25, margin: 0 }
  );
  s.addText(
    "It became where Indians go to decide. It reached 65 million car buyers and built roughly ₹1,260cr of " +
    "revenue on the intent it had already earned.",
    { x: M, y: 5.35, w: 10.2, h: 0.8, fontFace: BODY, fontSize: 16, color: D3, lineSpacing: 25, margin: 0 }
  );
  s.addNotes("Naming a company they already know does more work than any abstract explanation. Everyone in an Indian boardroom knows CarWale. The point: it won the category without ever winning on listings.");
}

/* ============================================================ 14 */
{
  const s = slideL();
  const y0 = head(s, "06", "Two different businesses", null);
  const w2 = cw(2);

  const cards = [
    ["EVERYONE ELSE", "Classifieds business", false, [
      "Answers “what's available”",
      "Monetises by reselling your attention",
      "Wins on volume and ad spend",
      "The buyer is the product"
    ]],
    ["OTHO", "Research business", true, [
      "Answers “what should I buy”",
      "Monetises intent it has already earned",
      "Wins on trust and depth",
      "The buyer is the customer"
    ]]
  ];
  cards.forEach((c, i) => {
    const x = cx(i, 2), on = c[2];
    const opts = {
      x, y: y0, w: w2, h: 2.9,
      fill: { color: on ? INK : CARD }, line: { type: "none" }
    };
    if (!on) opts.shadow = softShadow();
    s.addShape(pres.ShapeType.rect, opts);
    s.addText(c[0], {
      x: x + 0.32, y: y0 + 0.26, w: w2 - 0.64, h: 0.28,
      fontFace: BODY, fontSize: 9, bold: true, color: on ? BRASS_BR : T3, charSpacing: 1.8, margin: 0
    });
    s.addText(c[1], {
      x: x + 0.32, y: y0 + 0.58, w: w2 - 0.64, h: 0.46,
      fontFace: HEAD, fontSize: 20, bold: true, color: on ? D1 : T1, margin: 0, valign: "middle"
    });
    s.addText(c[3].map((t, j) => ({
      text: t, options: { bullet: true, breakLine: j !== c[3].length - 1 }
    })), {
      x: x + 0.32, y: y0 + 1.16, w: w2 - 0.64, h: 1.5,
      fontFace: BODY, fontSize: 13, color: on ? D2 : T2, paraSpaceAfter: 8, margin: 0
    });
  });

  s.addText("In Indian real estate, the research layer is empty.", {
    x: M, y: y0 + 3.24, w: W, h: 0.52,
    fontFace: HEAD, fontSize: 23, bold: true, color: T1, charSpacing: -0.4, margin: 0, valign: "middle"
  });
  s.addText(
    "No price estimate, no expert project reviews, no honest comparison engine, no resident ratings. " +
    "Every player is fighting over the classifieds half of the market.",
    { x: M, y: y0 + 3.84, w: W, h: 0.7, fontFace: BODY, fontSize: 15, color: T2, lineSpacing: 23, margin: 0 }
  );
  s.addNotes("The right-hand card is deliberately dark - it is the side OTHO sits on. Land the closing line: every competitor is fighting over half the market and ignoring the other half entirely.");
}

/* ============================================================ 15 */
{
  const s = slideD();
  s.addText("Every property platform tells you\nwhat's for sale.", {
    x: M, y: 2.05, w: 11.4, h: 1.5,
    fontFace: HEAD, fontSize: 34, color: D3, lineSpacing: 48, margin: 0, valign: "middle"
  });
  s.addText("OTHO tells you what's\nworth buying.", {
    x: M, y: 3.75, w: 11.4, h: 1.7,
    fontFace: HEAD, fontSize: 48, bold: true, color: D1, lineSpacing: 60, charSpacing: -1.2, margin: 0, valign: "middle"
  });
  s.addNotes("This is the positioning line. Say it, then stop talking for a beat. If they repeat it back later in the meeting, the deck has done its job.");
}

/* ============================================================ 16 */
{
  const s = slideL();
  const y0 = head(s, "07", "The signature screen",
    "Two projects. One is 5% cheaper on the board, and 2% dearer in reality.");

  const cLab = 4.55, cVal = (W - cLab) / 2;
  const rows = [
    ["", "Project A", "Project B", "hd"],
    ["Advertised rate", "₹9,483", "₹9,994", "a"],
    ["RERA carpet area", "1,842 sq ft", "1,861 sq ft", "n"],
    ["Loading factor", "44%", "36%", "b"],
    ["Real rate on carpet", "₹13,720", "₹13,440", "b"],
    ["Land share per unit", "Lower", "18% more", "b"],
    ["OTHO verdict", "Looks cheaper", "Actually cheaper", "b"]
  ];
  const rh = 0.52, gap = 0.05;
  rows.forEach((r, i) => {
    const y = y0 + i * (rh + gap);
    const hd = r[3] === "hd";

    s.addShape(pres.ShapeType.rect, {
      x: M, y, w: cLab - gap, h: rh, fill: { color: hd ? INK : CARD }, line: { type: "none" }
    });
    s.addText(r[0], {
      x: M + 0.26, y, w: cLab - 0.5, h: rh,
      fontFace: BODY, fontSize: 12.5, bold: hd, color: hd ? D1 : T1, valign: "middle", margin: 0
    });

    let f1 = CARD, f2 = CARD, t1 = T1, t2 = T1;
    if (hd) { f1 = INK; f2 = INK; t1 = D1; t2 = D1; }
    else if (r[3] === "a") { f1 = GREEN_BG; t1 = GREEN; }
    else if (r[3] === "b") { f1 = RED_BG; t1 = RED; f2 = GREEN_BG; t2 = GREEN; }

    [[r[1], f1, t1, 0], [r[2], f2, t2, 1]].forEach(v => {
      const x = M + cLab + v[3] * cVal;
      const wCell = cVal - (v[3] === 0 ? gap : 0);
      s.addShape(pres.ShapeType.rect, { x, y, w: wCell, h: rh, fill: { color: v[1] }, line: { type: "none" } });
      s.addText(v[0], {
        x, y, w: wCell, h: rh,
        fontFace: hd ? BODY : HEAD, fontSize: hd ? 12 : 13.5, bold: true,
        color: v[2], align: "center", valign: "middle", margin: 0
      });
    });
  });

  s.addText(
    "Every portal in India shows the two advertised numbers and lets you pick the wrong flat. " +
    "Figures illustrative until built from live TG-RERA filings.",
    { x: M, y: y0 + 7 * (rh + gap) + 0.22, w: W, h: 0.6,
      fontFace: BODY, fontSize: 13, italic: true, color: T3, lineSpacing: 20, margin: 0 }
  );
  s.addNotes("This is your demo moment. Walk down the column slowly. Project A looks cheaper on the advertised rate and is actually more expensive per usable foot with less land. No portal in India shows this - it is the whole product in one screen.");
}


/* ==================================================== MOCKUP SCREENS */
function browser(s, y, url, active) {
  s.addShape(pres.ShapeType.rect, { x: M, y, w: W, h: 0.34, fill: { color: CARD_2 }, line: { type: "none" } });
  [0, 1, 2].forEach(i => {
    s.addShape(pres.ShapeType.ellipse, {
      x: M + 0.26 + i * 0.19, y: y + 0.12, w: 0.1, h: 0.1,
      fill: { color: "C9C9C3" }, line: { type: "none" }
    });
  });
  s.addText(url, {
    x: M + 0.95, y, w: 4.5, h: 0.34,
    fontFace: BODY, fontSize: 9.5, color: T3, valign: "middle", margin: 0
  });

  s.addShape(pres.ShapeType.rect, {
    x: M, y: y + 0.34, w: W, h: 4.67, fill: { color: CARD }, line: { type: "none" }, shadow: softShadow()
  });

  const ny = y + 0.34;
  s.addText("OTHO", {
    x: M + 0.3, y: ny, w: 1.2, h: 0.44,
    fontFace: HEAD, fontSize: 13.5, bold: true, color: T1, valign: "middle", margin: 0
  });
  ["Projects", "Compare", "Localities", "Reviews", "Guides"].forEach((l, i) => {
    s.addText(l, {
      x: M + 1.75 + i * 1.12, y: ny, w: 1.08, h: 0.44,
      fontFace: BODY, fontSize: 9.5, bold: l === active,
      color: l === active ? T1 : T3, valign: "middle", margin: 0
    });
  });
  s.addShape(pres.ShapeType.rect, {
    x: M + W - 1.92, y: ny + 0.09, w: 1.62, h: 0.27, fill: { color: INK }, line: { type: "none" }
  });
  s.addText("Book a site visit", {
    x: M + W - 1.92, y: ny + 0.09, w: 1.62, h: 0.27,
    fontFace: BODY, fontSize: 8.5, bold: true, color: D1, align: "center", valign: "middle", margin: 0
  });
  return ny + 0.44;
}

/* ---- MOCKUP 1: project page ---- */
{
  const s = slideL();
  const y0 = head(s, "07", "What the site looks like", null);
  const cy = browser(s, y0, "otho.in / neopolis", "Projects");
  const IX = M + 0.3, IW = W - 0.6;

  s.addText("KOKAPET  ·  NEOPOLIS LAYOUT  ·  TG-RERA P0XXXXXXX", {
    x: IX, y: cy + 0.16, w: IW, h: 0.22,
    fontFace: BODY, fontSize: 8, color: T3, charSpacing: 1.2, margin: 0
  });
  s.addText("3 & 4 BHK homes, priced in the open.", {
    x: IX, y: cy + 0.42, w: 7.4, h: 0.58,
    fontFace: HEAD, fontSize: 25, bold: true, color: T1, charSpacing: -0.6, margin: 0, valign: "middle"
  });
  s.addText("Full pricing, real carpet area, and what the commute actually takes at 9am. No callback required to see any of it.", {
    x: IX, y: cy + 1.04, w: 7.4, h: 0.3,
    fontFace: BODY, fontSize: 10.5, color: T2, margin: 0, valign: "middle"
  });

  const stats = [["1,850–3,400", "CARPET SQ FT"], ["₹2.1–4.6 Cr", "ALL-IN PRICE"], ["Dec 2028", "POSSESSION"], ["4.2 acres", "LAND PARCEL"]];
  const tw = (IW - 3 * 0.07) / 4;
  stats.forEach((st, i) => {
    const x = IX + i * (tw + 0.07);
    s.addShape(pres.ShapeType.rect, { x, y: cy + 1.46, w: tw, h: 0.68, fill: { color: CARD_2 }, line: { type: "none" } });
    s.addText(st[0], {
      x: x + 0.16, y: cy + 1.54, w: tw - 0.32, h: 0.32,
      fontFace: HEAD, fontSize: 14, bold: true, color: T1, margin: 0, valign: "middle"
    });
    s.addText(st[1], {
      x: x + 0.16, y: cy + 1.85, w: tw - 0.32, h: 0.22,
      fontFace: BODY, fontSize: 7.5, color: T3, charSpacing: 1, margin: 0
    });
  });

  const py = cy + 2.28;
  s.addShape(pres.ShapeType.rect, { x: IX, y: py, w: IW, h: 1.86, fill: { color: CARD_2 }, line: { type: "none" } });
  s.addText("What you're actually paying per usable foot", {
    x: IX + 0.22, y: py + 0.14, w: 6.0, h: 0.28,
    fontFace: HEAD, fontSize: 12, bold: true, color: T1, margin: 0, valign: "middle"
  });
  s.addText("Most listings quote super built-up. This shows both.", {
    x: IX + 0.22, y: py + 0.42, w: 6.0, h: 0.24,
    fontFace: BODY, fontSize: 9, color: T3, margin: 0, valign: "middle"
  });
  const calc = [
    ["Super built-up area", "2,650 sq ft", false],
    ["RERA carpet area", "1,850 sq ft", false],
    ["Loading factor", "43%", false],
    ["Advertised rate", "₹9,400 / sq ft", false],
    ["Real rate on carpet", "₹13,460 / sq ft", true]
  ];
  calc.forEach((c, i) => {
    const ry = py + 0.70 + i * 0.22;
    s.addShape(pres.ShapeType.rect, {
      x: IX + 0.22, y: ry, w: IW - 0.44, h: 0.20,
      fill: { color: c[2] ? "E7EDF5" : CARD }, line: { type: "none" }
    });
    s.addText(c[0], {
      x: IX + 0.36, y: ry, w: 5.0, h: 0.20,
      fontFace: BODY, fontSize: 9.5, bold: c[2], color: c[2] ? BLUE : T2, valign: "middle", margin: 0
    });
    s.addText(c[1], {
      x: IX + IW - 2.2, y: ry, w: 1.84, h: 0.20,
      fontFace: BODY, fontSize: 9.5, bold: true, color: c[2] ? BLUE : T1,
      align: "right", valign: "middle", margin: 0
    });
  });
  s.addNotes("Screen one. Two things nobody else does: the price is on the page without a form, and the calculator shows the real rate on carpet. Point at the last row - advertised 9,400 becomes 13,460 once loading is exposed.");
}

/* ---- MOCKUP 2: review page, honest negatives ---- */
{
  const s = slideL();
  const y0 = head(s, "07", "The review page", null);
  const cy = browser(s, y0, "otho.in / reviews / neopolis-tower-a", "Reviews");
  const IX = M + 0.3, IW = W - 0.6;

  s.addText("OTHO PROJECT REVIEW  ·  KOKAPET", {
    x: IX, y: cy + 0.16, w: 6.5, h: 0.22,
    fontFace: BODY, fontSize: 8, color: T3, charSpacing: 1.2, margin: 0
  });
  s.addText("Neopolis — Tower A", {
    x: IX, y: cy + 0.42, w: 6.5, h: 0.5,
    fontFace: HEAD, fontSize: 22, bold: true, color: T1, charSpacing: -0.5, margin: 0, valign: "middle"
  });
  s.addText("Reviewed on site, 14 August 2026. Verified against TG-RERA filing.", {
    x: IX, y: cy + 0.94, w: 6.5, h: 0.26,
    fontFace: BODY, fontSize: 9.5, color: T3, margin: 0, valign: "middle"
  });

  s.addShape(pres.ShapeType.rect, {
    x: IX + IW - 2.5, y: cy + 0.2, w: 2.5, h: 1.0, fill: { color: INK }, line: { type: "none" }
  });
  s.addText("7.4", {
    x: IX + IW - 2.4, y: cy + 0.3, w: 1.0, h: 0.6,
    fontFace: HEAD, fontSize: 30, bold: true, color: BRASS_BR, margin: 0, valign: "middle"
  });
  s.addText("OTHO SCORE", {
    x: IX + IW - 1.35, y: cy + 0.4, w: 1.2, h: 0.2,
    fontFace: BODY, fontSize: 7.5, color: D3, charSpacing: 1, margin: 0
  });
  s.addText("out of 10", {
    x: IX + IW - 1.35, y: cy + 0.6, w: 1.2, h: 0.22,
    fontFace: BODY, fontSize: 9, bold: true, color: D1, margin: 0
  });

  const panels = [
    ["What's good", GREEN, [
      "Lowest loading factor in the layout at 36%",
      "18% more land per unit than the nearest comparison",
      "Developer has delivered four projects on schedule",
      "Genuine 9am commute to Financial District: 14 min"
    ]],
    ["What we'd flag", RED, [
      "Metro Phase 2 is unfunded — do not price it in",
      "Amenity ratio is 1 clubhouse per 640 families",
      "Water: borewell dependent, no HMWSSB line yet",
      "East-facing units overlook the service road"
    ]]
  ];
  const pw = (IW - 0.24) / 2, py = cy + 1.42;
  panels.forEach((p, i) => {
    const x = IX + i * (pw + 0.24);
    s.addShape(pres.ShapeType.rect, { x, y: py, w: pw, h: 2.72, fill: { color: CARD_2 }, line: { type: "none" } });
    s.addShape(pres.ShapeType.ellipse, {
      x: x + 0.22, y: py + 0.22, w: 0.13, h: 0.13, fill: { color: p[1] }, line: { type: "none" }
    });
    s.addText(p[0], {
      x: x + 0.46, y: py + 0.12, w: pw - 0.68, h: 0.34,
      fontFace: HEAD, fontSize: 13, bold: true, color: T1, valign: "middle", margin: 0
    });
    p[2].forEach((t, j) => {
      const ry = py + 0.52 + j * 0.53;
      s.addShape(pres.ShapeType.rect, { x: x + 0.18, y: ry, w: pw - 0.36, h: 0.46, fill: { color: CARD }, line: { type: "none" } });
      s.addText(t, {
        x: x + 0.32, y: ry, w: pw - 0.64, h: 0.46,
        fontFace: BODY, fontSize: 9.5, color: T2, valign: "middle", lineSpacing: 13, margin: 0
      });
    });
  });
  s.addNotes("This is the moat in one screen. Every project page carries a What We Would Flag column, on a project OTHO earns money from. No portal in India publishes this. Expect the founders to react here - that reaction is the conversation worth having.");
}

/* ---- MOCKUP 3: locality + infrastructure tracker ---- */
{
  const s = slideL();
  const y0 = head(s, "07", "The locality page", null);
  const cy = browser(s, y0, "otho.in / localities / kokapet", "Localities");
  const IX = M + 0.3, IW = W - 0.6;

  s.addText("LOCALITY REPORT  ·  UPDATED MONTHLY", {
    x: IX, y: cy + 0.16, w: 6.5, h: 0.22,
    fontFace: BODY, fontSize: 8, color: T3, charSpacing: 1.2, margin: 0
  });
  s.addText("Kokapet", {
    x: IX, y: cy + 0.42, w: 6.5, h: 0.5,
    fontFace: HEAD, fontSize: 24, bold: true, color: T1, charSpacing: -0.5, margin: 0, valign: "middle"
  });
  s.addText("Infrastructure confidence — what's funded, what's promised", {
    x: IX, y: cy + 1.0, w: 7.0, h: 0.26,
    fontFace: HEAD, fontSize: 11.5, bold: true, color: T1, margin: 0, valign: "middle"
  });

  const infra = [
    ["ORR access", "Operational since 2018", "CONFIRMED", GREEN, GREEN_BG],
    ["Financial District road widening", "Funded, under construction", "LIKELY", GREEN, GREEN_BG],
    ["Metro Phase 2 corridor", "Approved, financial sanction pending", "UNFUNDED", RED, RED_BG],
    ["HMWSSB water line", "Proposed, no tender issued", "UNCERTAIN", BRASS, "F6EEDA"]
  ];
  infra.forEach((r, i) => {
    const ry = cy + 1.30 + i * 0.50;
    s.addShape(pres.ShapeType.rect, { x: IX, y: ry, w: IW, h: 0.44, fill: { color: CARD_2 }, line: { type: "none" } });
    s.addText(r[0], {
      x: IX + 0.22, y: ry, w: 3.7, h: 0.44,
      fontFace: HEAD, fontSize: 11, bold: true, color: T1, valign: "middle", margin: 0
    });
    s.addText(r[1], {
      x: IX + 4.1, y: ry, w: IW - 4.1 - 1.5, h: 0.44,
      fontFace: BODY, fontSize: 9.5, color: T2, valign: "middle", margin: 0
    });
    s.addShape(pres.ShapeType.rect, {
      x: IX + IW - 1.35, y: ry + 0.10, w: 1.13, h: 0.24, fill: { color: r[4] }, line: { type: "none" }
    });
    s.addText(r[2], {
      x: IX + IW - 1.35, y: ry + 0.10, w: 1.13, h: 0.24,
      fontFace: BODY, fontSize: 7.5, bold: true, color: r[3],
      align: "center", valign: "middle", charSpacing: 0.6, margin: 0
    });
  });

  const dy = cy + 3.36;
  s.addText("Real drive times, measured at 9am on a weekday", {
    x: IX, y: dy, w: 7.0, h: 0.26,
    fontFace: HEAD, fontSize: 11.5, bold: true, color: T1, margin: 0, valign: "middle"
  });
  const dest = [["Financial District", "14 min"], ["HITEC City", "26 min"], ["Airport", "38 min"], ["Gachibowli", "19 min"]];
  const dw = (IW - 3 * 0.07) / 4;
  dest.forEach((d, i) => {
    const x = IX + i * (dw + 0.07);
    s.addShape(pres.ShapeType.rect, { x, y: dy + 0.30, w: dw, h: 0.50, fill: { color: CARD_2 }, line: { type: "none" } });
    s.addText(d[1], {
      x: x + 0.16, y: dy + 0.35, w: dw - 0.32, h: 0.25,
      fontFace: HEAD, fontSize: 13, bold: true, color: T1, margin: 0, valign: "middle"
    });
    s.addText(d[0], {
      x: x + 0.16, y: dy + 0.59, w: dw - 0.32, h: 0.19,
      fontFace: BODY, fontSize: 8, color: T3, margin: 0
    });
  });
  s.addNotes("Screen three. The confidence column is the point - Metro Phase 2 marked unfunded on a page about a locality that sells partly on Metro. That single label is what makes buyers trust the other three rows.");
}

/* ==================================================== 17 & 18 FEATURES */
function featureSlide(lead, feats, notes) {
  const s = slideL();
  const y0 = head(s, "07", "What goes in the platform", lead);
  const w3 = cw(3);
  feats.forEach((f, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = cx(col, 3), y = y0 + row * 2.28;
    s.addShape(pres.ShapeType.rect, {
      x, y, w: w3, h: 2.05, fill: { color: CARD }, line: { type: "none" }, shadow: softShadow()
    });
    s.addText(f[0], {
      x: x + 0.3, y: y + 0.24, w: w3 - 0.6, h: 0.4,
      fontFace: HEAD, fontSize: 15, bold: true, color: T1, margin: 0, valign: "middle"
    });
    s.addText(f[1], {
      x: x + 0.3, y: y + 0.7, w: w3 - 0.6, h: 0.95,
      fontFace: BODY, fontSize: 11.5, color: T2, lineSpacing: 17, margin: 0
    });
    s.addText(f[2].toUpperCase(), {
      x: x + 0.3, y: y + 1.68, w: w3 - 0.6, h: 0.26,
      fontFace: BODY, fontSize: 8.5, bold: true, color: BRASS, charSpacing: 1.1, margin: 0
    });
  });
  s.addNotes(notes);
}

featureSlide("Nothing here is unproven. It's proven elsewhere and missing in Indian property.", [
  ["Comparison engine", "Any two projects side by side on carpet, real rate, land share, density, possession.", "From CarWale"],
  ["Expert project reviews", "OTHO rates every project it covers, with a score and a written verdict. Including the bad ones.", "From CarWale"],
  ["Resident reviews", "People who live there rate build quality, management, and what broke first.", "From CarWale"],
  ["Real rate calculator", "Loading factor exposed. What you pay per usable foot, not per marketing foot.", "OTHO original"],
  ["Honest negatives", "Every project page lists what's wrong with it. The trust engine of the whole platform.", "OTHO original"],
  ["Price estimate", "What a unit is actually worth, from registration data — not from the asking price.", "From Zillow"]
], "Every feature names where it is borrowed from. That is deliberate - it tells them we are not inventing risk, we are importing proven ideas into a category that lacks them.");

featureSlide("Continued — the trust and service layer.", [
  ["Locality pages", "Price history, infrastructure status, commute times measured at peak hour, schools, water.", "From MagicBricks"],
  ["Your number stays private", "Never sold, never shared with brokers. One conversation, with OTHO.", "From NoBroker"],
  ["Verified listings only", "Every project checked against its RERA filing before it appears. No cloned photos.", "Fixes the #1 complaint"],
  ["Site visit booking", "Real calendar slots, confirmed on WhatsApp. Not a form promising a callback.", "From NoBroker"],
  ["Infrastructure tracker", "Metro Phase 2 and Future City with funding and construction status, not developer promises.", "OTHO original"],
  ["Services layer", "Home loans, legal checks, registration, interiors. Added later, once trust exists.", "From NoBroker"]
], "The private number promise is the one to emphasise. It costs OTHO nothing and no incumbent can match it without breaking their own revenue model.");

/* ============================================================ 19 */
{
  const s = slideL();
  const y0 = head(s, "08", "Built in four layers", null);

  const layers = [
    ["LAYER 1", "Days 1–90", "Trust", "Website, project pages, comparison engine, reviews and guides. No listings, no transactions. We earn the right to be believed before we ask for anything.", INK],
    ["LAYER 2", "Months 4–12", "Coverage", "Every meaningful Hyderabad project reviewed and comparable. Resident reviews live. Price estimates from registration data. The default check before buying in this city.", "222C36"],
    ["LAYER 3", "Year 2", "Transactions", "Exclusive developer mandates, site visits, bookings. Revenue arrives on intent we already own, so cost per booking is a fraction of portal leads.", "2E3B47"],
    ["LAYER 4", "Year 3+", "Services and data", "Loans, legal, registration, interiors. And the data business — developers and banks paying for what OTHO knows about demand. The high-margin end.", "3B4B59"]
  ];
  const rh = 1.06, gap = 0.08;
  layers.forEach((l, i) => {
    const y = y0 + i * (rh + gap);
    s.addShape(pres.ShapeType.rect, { x: M, y, w: W, h: rh, fill: { color: l[4] }, line: { type: "none" } });
    s.addText(l[0], {
      x: M + 0.32, y: y + 0.18, w: 1.5, h: 0.3,
      fontFace: BODY, fontSize: 9, bold: true, color: BRASS_BR, charSpacing: 1.4, margin: 0
    });
    s.addText(l[1], {
      x: M + 0.32, y: y + 0.52, w: 1.5, h: 0.32,
      fontFace: BODY, fontSize: 11, color: D3, margin: 0
    });
    s.addText(l[2], {
      x: M + 2.1, y, w: 2.5, h: rh,
      fontFace: HEAD, fontSize: 19, bold: true, color: D1, valign: "middle", margin: 0
    });
    s.addText(l[3], {
      x: M + 4.75, y, w: W - 5.05, h: rh,
      fontFace: BODY, fontSize: 12.5, color: D2, lineSpacing: 18, valign: "middle", margin: 0
    });
  });
  s.addText(
    "Every competitor started at Layer 3 and tried to reverse into trust. It doesn't work — you can't earn " +
    "credibility from people already annoyed by your calls.",
    { x: M, y: y0 + 4 * (rh + gap) + 0.18, w: W, h: 0.6,
      fontFace: BODY, fontSize: 14.5, italic: true, color: T1, lineSpacing: 21, margin: 0 }
  );
  s.addNotes("The sequencing is the strategy. Slower for six months, much harder to copy afterwards. If they push to start selling immediately, this is the slide to come back to.");
}

/* ============================================================ 20 */
{
  const s = slideL();
  const y0 = head(s, "09", "What we produce", null);

  const colw = [2.35, 4.35, 1.5, 3.43];
  const hdr = ["Format", "What it is", "Volume", "Job"];
  s.addShape(pres.ShapeType.rect, { x: M, y: y0, w: W, h: 0.4, fill: { color: INK }, line: { type: "none" } });
  let hx = M;
  hdr.forEach((h, i) => {
    s.addText(h.toUpperCase(), {
      x: hx + 0.22, y: y0, w: colw[i] - 0.3, h: 0.4,
      fontFace: BODY, fontSize: 9, bold: true, color: D2, charSpacing: 1.3, valign: "middle", margin: 0
    });
    hx += colw[i];
  });

  const rows = [
    ["Project review film", "8–12 min walkthrough with a verdict. Good and bad, on camera.", "2 / month", "The signature format. Builds the library."],
    ["Comparison film", "Two projects, one screen, real numbers.", "1 / month", "Most shared format. Drives the tool."],
    ["Founder podcast", "30–40 min with a developer, planner, architect or lawyer.", "2 / month", "Authority. Only OTHO can book these guests."],
    ["Locality deep-dive", "Kokapet, Financial District, Tellapur — including drawbacks.", "1 / month", "Search traffic and AI citations."],
    ["The dictionary", "Loading factor, UDS, carpet vs SBA, reading a RERA filing.", "2 / month", "Permanent traffic. Gets OTHO quoted by AI."],
    ["Monthly market note", "Registrations, prices, launches, absorption. Real data.", "1 / month", "Journalists start quoting it. Free PR."],
    ["Vertical clips", "Cut from everything above.", "20–25 / month", "Reach on Instagram, Shorts, LinkedIn."],
    ["Founder posts", "Site observations, pricing oddities, war stories.", "8–10 / month", "Nobody can copy twenty years of stories."]
  ];
  const rh = 0.44, gap = 0.05;
  rows.forEach((r, i) => {
    const y = y0 + 0.46 + i * (rh + gap);
    band(s, M, y, W, rh);
    let x = M;
    r.forEach((cell, j) => {
      s.addText(cell, {
        x: x + 0.22, y, w: colw[j] - 0.34, h: rh,
        fontFace: j === 0 ? HEAD : BODY, fontSize: j === 0 ? 12.5 : 11,
        bold: j === 0, color: j === 0 ? T1 : (j === 2 ? BRASS : T2),
        valign: "middle", margin: 0
      });
      x += colw[j];
    });
  });
  s.addText(
    "All of it from two shoot days a month — one studio, one on site. Roughly 35 usable pieces. " +
    "Production is what Production X does, which is why this costs a fraction of agency rates.",
    { x: M, y: y0 + 0.46 + 8 * (rh + gap) + 0.16, w: W, h: 0.6,
      fontFace: BODY, fontSize: 14, color: T1, lineSpacing: 21, margin: 0 }
  );
  s.addNotes("This answers what content we actually make. The closing line is your commercial advantage - production in-house is why the budget works.");
}

/* ============================================================ 21 */
{
  const s = slideL();
  const y0 = head(s, "10", "How we promote it", null);

  const rows = [
    ["YouTube", "Review films, comparisons, podcast", "Where property research actually happens now"],
    ["Instagram", "Vertical clips, project reveals, founder pieces", "Reach and recall"],
    ["LinkedIn", "Founder posts, market notes, commentary", "Reaches GCC employees — the real buyers"],
    ["Search & AI", "Guides, locality pages, comparisons written to be cited", "Free enquiries that compound monthly"],
    ["Google Search ads", "Project names, locality and competitor terms", "Small budget, highest intent only"],
    ["Meta retargeting", "People who watched a film or opened a project page", "Cheap re-engagement. No cold reach."],
    ["WhatsApp", "Opt-in updates, visit confirmations, conversations", "Highest open rate in this market"],
    ["PR", "Market note pitched to Telangana Today, Deccan Chronicle, Siasat", "Third-party credibility, no media cost"],
    ["Developers", "Co-marketing on mandate projects", "They fund reach we would otherwise buy"],
    ["Portals", "Listings for coverage only", "Necessary, never the core"]
  ];
  const rh = 0.42, gap = 0.05;
  rows.forEach((r, i) => {
    const y = y0 + i * (rh + gap);
    band(s, M, y, W, rh);
    s.addText(r[0], {
      x: M + 0.26, y, w: 2.2, h: rh,
      fontFace: HEAD, fontSize: 12.5, bold: true, color: T1, valign: "middle", margin: 0
    });
    s.addText(r[1], {
      x: M + 2.6, y, w: 5.1, h: rh,
      fontFace: BODY, fontSize: 11.5, color: T2, valign: "middle", margin: 0
    });
    s.addText(r[2], {
      x: M + 7.85, y, w: W - 8.1, h: rh,
      fontFace: BODY, fontSize: 11.5, color: BLUE, valign: "middle", margin: 0
    });
  });
  s.addText("The free one that matters most: response time. A lead that waits four hours is gone.", {
    x: M, y: y0 + 10 * (rh + gap) + 0.14, w: W, h: 0.44,
    fontFace: BODY, fontSize: 14, bold: true, color: T1, margin: 0, valign: "middle"
  });
  s.addNotes("Ten channels, each with a job. If asked what we would cut first at a lower budget: cold paid reach goes, organic stays. The response time line at the bottom costs nothing and protects everything spent upstream.");
}

/* ============================================================ 22 BUDGET */
{
  const s = slideL();
  const y0 = head(s, "11", "Budget", "Three levels. Start low, move up only when the numbers justify it.");
  const w3 = cw(3);

  const tiers = [
    ["LEVEL 1", "Foundation", "₹1.2L", [["Media spend", "₹40,000"], ["Tools & CRM", "₹15,000"], ["Production X", "₹65,000"]],
     "Website live, podcast running, articles publishing. Paid limited to project-name search.", false],
    ["LEVEL 2  ·  RECOMMENDED", "Build", "₹2.5L", [["Media spend", "₹1,00,000"], ["Tools & CRM", "₹20,000"], ["Production X", "₹1,30,000"]],
     "Full content calendar, two shoot days a month, search and retargeting live, portals active.", true],
    ["LEVEL 3  ·  MONTH 7+", "Scale", "₹5L", [["Media spend", "₹2,60,000"], ["Tools & CRM", "₹30,000"], ["Production X", "₹2,10,000"]],
     "Only once cost per booking is known and working. Adds Meta reach, YouTube ads and PR.", false]
  ];

  tiers.forEach((t, i) => {
    const x = cx(i, 3), on = t[5];
    const opts = {
      x, y: y0, w: w3, h: 4.0,
      fill: { color: on ? INK : CARD }, line: { type: "none" }
    };
    if (!on) opts.shadow = softShadow();
    s.addShape(pres.ShapeType.rect, opts);
    s.addText(t[0], {
      x: x + 0.3, y: y0 + 0.26, w: w3 - 0.6, h: 0.28,
      fontFace: BODY, fontSize: 8.5, bold: true, color: on ? BRASS_BR : T3, charSpacing: 1.4, margin: 0
    });
    s.addText(t[1], {
      x: x + 0.3, y: y0 + 0.58, w: w3 - 0.6, h: 0.4,
      fontFace: HEAD, fontSize: 18, bold: true, color: on ? D1 : T1, margin: 0, valign: "middle"
    });
    s.addText(t[2], {
      x: x + 0.3, y: y0 + 1.02, w: w3 - 0.6, h: 0.78,
      fontFace: HEAD, fontSize: 40, bold: true, color: on ? D1 : T1, charSpacing: -1.2, margin: 0, valign: "middle"
    });
    s.addText("PER MONTH", {
      x: x + 0.3, y: y0 + 1.82, w: w3 - 0.6, h: 0.24,
      fontFace: BODY, fontSize: 8.5, color: on ? D3 : T3, charSpacing: 1.4, margin: 0
    });
    t[3].forEach((ln, j) => {
      const ly = y0 + 2.2 + j * 0.34;
      s.addText(ln[0], {
        x: x + 0.3, y: ly, w: 1.9, h: 0.3,
        fontFace: BODY, fontSize: 11.5, color: on ? D2 : T2, valign: "middle", margin: 0
      });
      s.addText(ln[1], {
        x: x + w3 - 1.6, y: ly, w: 1.3, h: 0.3,
        fontFace: BODY, fontSize: 11.5, bold: true, color: on ? D1 : T1,
        align: "right", valign: "middle", margin: 0
      });
    });
    s.addText(t[4], {
      x: x + 0.3, y: y0 + 3.3, w: w3 - 0.6, h: 0.6,
      fontFace: BODY, fontSize: 10.5, color: on ? D3 : T3, lineSpacing: 15, margin: 0
    });
  });

  s.addText(
    "Media is the part that scales. Production and management stay roughly flat, because the content engine " +
    "runs on the same two shoot days whatever the ad budget is.",
    { x: M, y: y0 + 4.22, w: W, h: 0.6, fontFace: BODY, fontSize: 14, color: T1, lineSpacing: 21, margin: 0 }
  );
  s.addNotes("Lead with Level 2 as the recommendation but make clear Level 1 is a real option, not a token. Say plainly: Level 3 is gated - we do not scale spend until we know what a booking actually costs. That restraint is what makes the whole budget credible.");
}

/* ============================================================ 23 SETUP */
{
  const s = slideL();
  const y0 = head(s, "11", "What it costs to start", null);

  const rows = [
    ["Website and comparison engine v1", "9 project pages, comparison tool, real-rate calculator, guides, visit booking, CRM connected", "₹2–3L"],
    ["Podcast setup", "We already own the cameras. This is set dressing and sound only.", "₹30–50k"],
    ["Brand kit", "Logo application, templates, partner collateral, ad templates with RERA number built in", "₹40–60k"]
  ];
  const rh = 0.86, gap = 0.07;
  rows.forEach((r, i) => {
    const y = y0 + i * (rh + gap);
    band(s, M, y, W, rh);
    s.addText(r[0], {
      x: M + 0.32, y, w: 3.9, h: rh,
      fontFace: HEAD, fontSize: 14, bold: true, color: T1, valign: "middle", lineSpacing: 19, margin: 0
    });
    s.addText(r[1], {
      x: M + 4.4, y, w: W - 4.4 - 1.9, h: rh,
      fontFace: BODY, fontSize: 12, color: T2, valign: "middle", lineSpacing: 17, margin: 0
    });
    s.addText(r[2], {
      x: M + W - 1.82, y, w: 1.5, h: rh,
      fontFace: HEAD, fontSize: 17, bold: true, color: T1,
      align: "right", valign: "middle", margin: 0
    });
  });

  const ty = y0 + 3 * (rh + gap);
  s.addShape(pres.ShapeType.rect, { x: M, y: ty, w: W, h: 0.86, fill: { color: INK }, line: { type: "none" } });
  s.addText("Total setup, before launch", {
    x: M + 0.32, y: ty, w: 6.0, h: 0.86,
    fontFace: HEAD, fontSize: 15, bold: true, color: D1, valign: "middle", margin: 0
  });
  s.addText("₹2.7–4.1L", {
    x: M + W - 2.6, y: ty, w: 2.28, h: 0.86,
    fontFace: HEAD, fontSize: 23, bold: true, color: BRASS_BR,
    align: "right", valign: "middle", charSpacing: -0.5, margin: 0
  });

  s.addText("Built once, reused on every project after Neopolis. Only the shoots repeat.", {
    x: M, y: ty + 1.06, w: W, h: 0.4,
    fontFace: BODY, fontSize: 14.5, bold: true, color: T1, margin: 0, valign: "middle"
  });
  s.addText(
    "One honest caveat: version one of the comparison engine is hand-built data for 10–15 projects. " +
    "Automating it — pulling RERA and registration records directly — is a Layer 2 engineering cost we'd scope " +
    "properly once we know the data is worth automating.",
    { x: M, y: ty + 1.5, w: W, h: 0.85, fontFace: BODY, fontSize: 13, italic: true, color: T3, lineSpacing: 19, margin: 0 }
  );
  s.addNotes("The caveat at the bottom is deliberate. Do not let them think the full automated platform is included for three lakh. Version one is manual data on a small set of projects, which is the right way to test whether anyone values it before building a pipeline.");
}

/* ============================================================ 24 KPIs */
{
  const s = slideL();
  const y0 = head(s, "12", "What we measure",
    "Reported from the first week of spend. These are counted, not estimated.");

  const rows = [
    ["Brand search visibility", "Whether OTHO appears when someone looks for it", "Monthly", BRASS],
    ["Podcast views and watch time", "Whether the authority play is landing", "Monthly", BRASS],
    ["Enquiries by source", "Which channels produce — free and paid counted separately", "Weekly", BLUE],
    ["Cost per enquiry", "Whether paid media is getting cheaper or dearer", "Weekly", BLUE],
    ["Response time", "How long a buyer waits before a human replies", "Weekly", BLUE],
    ["Site visits booked vs held", "Whether we bring serious people or curious ones", "Weekly", BLUE],
    ["Bookings by source", "The number that finally matters", "Monthly", GREEN],
    ["Cost per booking", "What it costs to sell one home through marketing", "Monthly", GREEN]
  ];
  const rh = 0.46, gap = 0.05;
  rows.forEach((r, i) => {
    const y = y0 + i * (rh + gap);
    band(s, M, y, W, rh);
    s.addShape(pres.ShapeType.ellipse, {
      x: M + 0.3, y: y + 0.165, w: 0.13, h: 0.13, fill: { color: r[3] }, line: { type: "none" }
    });
    s.addText(r[0], {
      x: M + 0.62, y, w: 3.5, h: rh,
      fontFace: HEAD, fontSize: 13, bold: true, color: T1, valign: "middle", margin: 0
    });
    s.addText(r[1], {
      x: M + 4.35, y, w: W - 4.35 - 1.4, h: rh,
      fontFace: BODY, fontSize: 12, color: T2, valign: "middle", margin: 0
    });
    s.addText(r[2], {
      x: M + W - 1.32, y, w: 1.02, h: rh,
      fontFace: BODY, fontSize: 10.5, bold: true, color: T3,
      align: "right", valign: "middle", margin: 0
    });
  });
  s.addText(
    "How this helps: these decide the budget. If cost per enquiry falls and site visits convert, we move up a " +
    "level. If they don't, we stop and fix the funnel before spending more.",
    { x: M, y: y0 + 8 * (rh + gap) + 0.2, w: W, h: 0.7,
      fontFace: BODY, fontSize: 14, color: T1, lineSpacing: 21, margin: 0 }
  );
  s.addNotes("Answer the question they are really asking - how do I know this is working. These KPIs are a decision function, not a report card. Response time is the one to watch weekly because it is free to fix and it protects everything spent upstream.");
}

/* ============================================================ 25 BREAK-EVEN */
{
  const s = slideL();
  const y0 = head(s, "12", "What it takes to break even",
    "At this budget the useful question isn't return multiples — it's how little has to happen before this pays for itself.");

  const cBasis = 2.05, cVal = 2.5, cLab = W - cVal * 2 - cBasis;
  const rows = [
    ["", "Foundation", "Build", "", "hd"],
    ["Monthly cost, all in", "₹1.2L", "₹2.5L", "From section 11", "n"],
    ["Average unit value", "₹2.5 Cr", "₹2.5 Cr", "OUR ASSUMPTION", "a"],
    ["OTHO commission", "2%", "2%", "OUR ASSUMPTION", "a"],
    ["Revenue per booking", "₹5L", "₹5L", "Calculated", "n"],
    ["Bookings needed to break even", "1 in 4 months", "1 in 2 months", "Calculated", "t"],
    ["Return at 1 booking a month", "4.2×", "2.0×", "Calculated", "t"],
    ["Return at 2 bookings a month", "8.3×", "4.0×", "Calculated", "t"]
  ];
  const rh = 0.47, gap = 0.05;
  rows.forEach((r, i) => {
    const y = y0 + i * (rh + gap);
    const hd = r[4] === "hd", tot = r[4] === "t", asm = r[4] === "a";
    const bg = hd ? INK : (tot ? CARD_2 : CARD);
    const fg = hd ? D1 : T1;

    s.addShape(pres.ShapeType.rect, { x: M, y, w: cLab - gap, h: rh, fill: { color: bg }, line: { type: "none" } });
    s.addText(r[0], {
      x: M + 0.26, y, w: cLab - 0.5, h: rh,
      fontFace: BODY, fontSize: 12.5, bold: hd || tot, color: fg, valign: "middle", margin: 0
    });

    [r[1], r[2]].forEach((v, j) => {
      const x = M + cLab + j * cVal;
      s.addShape(pres.ShapeType.rect, { x, y, w: cVal - gap, h: rh, fill: { color: bg }, line: { type: "none" } });
      s.addText(v, {
        x, y, w: cVal - gap, h: rh,
        fontFace: hd ? BODY : HEAD, fontSize: hd ? 11.5 : 13.5, bold: true,
        color: tot ? GREEN : fg, align: "center", valign: "middle", margin: 0
      });
    });

    const xb = M + cLab + cVal * 2;
    s.addShape(pres.ShapeType.rect, { x: xb, y, w: cBasis, h: rh, fill: { color: bg }, line: { type: "none" } });
    if (asm) {
      s.addShape(pres.ShapeType.rect, {
        x: xb + 0.16, y: y + 0.125, w: cBasis - 0.32, h: 0.22,
        fill: { color: "F6EEDA" }, line: { type: "none" }
      });
      s.addText(r[3], {
        x: xb + 0.16, y: y + 0.125, w: cBasis - 0.32, h: 0.22,
        fontFace: BODY, fontSize: 8, bold: true, color: BRASS,
        align: "center", valign: "middle", charSpacing: 0.6, margin: 0
      });
    } else {
      s.addText(r[3], {
        x: xb + 0.16, y, w: cBasis - 0.32, h: rh,
        fontFace: BODY, fontSize: 10.5, color: hd ? D2 : T3, valign: "middle", margin: 0
      });
    }
  });

  s.addText(
    "The two amber rows are ours. Give us your real unit value and commission and this table updates in front " +
    "of you — it's the only part of the plan we're guessing at. Note too that commission pays on registration, " +
    "so cash lands three to six months behind the spend.",
    { x: M, y: y0 + 8 * (rh + gap) + 0.16, w: W, h: 0.8,
      fontFace: BODY, fontSize: 12.5, italic: true, color: T3, lineSpacing: 18, margin: 0 }
  );
  s.addNotes("Volunteer the amber rows before anyone challenges them. Then land the point: Foundation pays for itself at one booking every four months. That is a much easier yes than a forecast they would want to argue with. If they give you the real numbers in the room, redo the arithmetic live.");
}

/* ============================================================ 26 */
{
  const s = slideD();
  s.addText("13", {
    x: M, y: 2.25, w: 1.2, h: 0.4,
    fontFace: BODY, fontSize: 11, bold: true, color: BRASS_BR, charSpacing: 2.6, margin: 0
  });
  s.addText("The first 90 days", {
    x: M, y: 2.75, w: 10.5, h: 1.3,
    fontFace: HEAD, fontSize: 54, bold: true, color: D1, charSpacing: -1.4, margin: 0, valign: "middle"
  });
  s.addText("One project — Neopolis — used to build and prove the whole system.", {
    x: M, y: 4.25, w: 9.5, h: 0.6, fontFace: BODY, fontSize: 17.5, color: D2, margin: 0, valign: "middle"
  });
  s.addNotes("Transition slide. Everything before this was strategy; everything after is execution with dates.");
}

/* ==================================================== 27-29 MONTHS */
const months = [
  ["Days 1–30  ·  Foundation", "Identity, plumbing, first content", [
    "OTHO brand applied properly — logo, templates, tone; the Propertunity change completed everywhere",
    "Hosting, analytics and CRM live on the domain you've secured, with routing and a response clock",
    "The social accounts you've created completed and activated — bios, links, first posts",
    "Website design signed off; comparison engine specified",
    "Sit with sales: what buyers ask, where they walk away",
    "First studio day — two podcast episodes, founder pieces to camera"
  ], "OTHO exists online, CRM works, two episodes in hand",
   "Month one is unglamorous on purpose. Spending before tracking works is how developer marketing budgets disappear without evidence."],

  ["Days 31–60  ·  Launch", "Website live, publishing starts", [
    "Website live — Neopolis project page, comparison engine, real rate calculator, guides, visit booking",
    "Podcast launches, fortnightly from here",
    "First project review film and first comparison film published",
    "Guides and locality pages start publishing weekly",
    "Google Search on project terms; portal listings up",
    "Site shoot — walkthrough, drone, progress, location drive"
  ], "Platform live, first tracked enquiries, search indexing",
   "This is the month they see something real. The website and the first films are the visible proof that the plan is moving."],

  ["Days 61–90  ·  Prove", "Widen, measure, decide", [
    "Meta retargeting on, now there's an audience to retarget",
    "Second and third project reviews — the library starts",
    "First monthly market note published and pitched to press",
    "Channel partner kit with per-partner tracking links",
    "Full funnel report from real numbers — targets set here, not before",
    "Documented playbook so project two starts at week six"
  ], "Real cost per enquiry, agreed targets, a repeatable system",
   "Month three is where we stop guessing. Say clearly: we will not forecast cost per booking today because we have no baseline. At day 90 you get the real number and we set targets together."]
];

months.forEach((mo, idx) => {
  const s = slideL();
  const y0 = head(s, "13", mo[0], null);

  s.addText(mo[1], {
    x: M, y: y0 - 0.06, w: W, h: 0.48,
    fontFace: HEAD, fontSize: 20, bold: true, color: BRASS, margin: 0, valign: "middle"
  });

  const rh = 0.56, gap = 0.05, top = y0 + 0.60;
  mo[2].forEach((t, i) => {
    const y = top + i * (rh + gap);
    band(s, M, y, W, rh);
    s.addShape(pres.ShapeType.ellipse, {
      x: M + 0.32, y: y + 0.215, w: 0.13, h: 0.13, fill: { color: BRASS }, line: { type: "none" }
    });
    s.addText(t, {
      x: M + 0.68, y, w: W - 1.0, h: rh,
      fontFace: BODY, fontSize: 13.5, color: T2, valign: "middle", lineSpacing: 18, margin: 0
    });
  });

  const by = top + 6 * (rh + gap) + 0.1;
  s.addShape(pres.ShapeType.rect, { x: M, y: by, w: W, h: 0.72, fill: { color: INK }, line: { type: "none" } });
  s.addText("END OF MONTH " + (idx + 1), {
    x: M + 0.32, y: by, w: 2.4, h: 0.72,
    fontFace: BODY, fontSize: 9, bold: true, color: BRASS_BR, charSpacing: 1.6, valign: "middle", margin: 0
  });
  s.addText(mo[3], {
    x: M + 3.0, y: by, w: W - 3.3, h: 0.72,
    fontFace: HEAD, fontSize: 15, bold: true, color: D1, valign: "middle", margin: 0
  });
  s.addNotes(mo[4]);
});

/* ============================================================ 30 */
{
  const s = slideL();
  const y0 = head(s, "14", "After the first 90 days", null);

  const rows = [
    ["Months 4–6", "Review library grows to 10–12 Hyderabad projects. Resident reviews open. Search and AI start delivering enquiries at no media cost. Referral programme live.", "First enquiries arriving free"],
    ["Months 7–9", "Price estimates built from registration data. Second and third mandates onboarded using the Neopolis template. Paid media scales only if cost per booking justifies it.", "Three projects on one system"],
    ["Months 10–12", "Every meaningful Kokapet and west Hyderabad project covered. Market note quoted by press. Services layer begins — loan and legal partners.", "Default place to check in west Hyderabad"]
  ];
  const rh = 1.42, gap = 0.1;
  rows.forEach((r, i) => {
    const y = y0 + i * (rh + gap);
    s.addShape(pres.ShapeType.rect, {
      x: M, y, w: W, h: rh, fill: { color: CARD }, line: { type: "none" }, shadow: softShadow()
    });
    s.addText(r[0], {
      x: M + 0.36, y, w: 2.0, h: rh,
      fontFace: HEAD, fontSize: 17, bold: true, color: BRASS, valign: "middle", margin: 0
    });
    s.addText(r[1], {
      x: M + 2.6, y, w: 5.9, h: rh,
      fontFace: BODY, fontSize: 12.5, color: T2, lineSpacing: 18, valign: "middle", margin: 0
    });
    s.addText(r[2], {
      x: M + 8.8, y, w: W - 9.16, h: rh,
      fontFace: HEAD, fontSize: 13.5, bold: true, color: T1, valign: "middle", lineSpacing: 18, margin: 0
    });
  });
  s.addNotes("Months four to twelve. The key transition is that enquiries start arriving free from search and AI - that is when the economics change and paid media becomes optional rather than essential.");
}

/* ============================================================ 31 */
{
  const s = slideL();
  const y0 = head(s, "15", "Where this goes", null);

  const hz = [
    ["Year 1", "HYDERABAD WEST", "Own one micro-market completely", "Kokapet, Financial District, Narsingi, Tellapur. Every project reviewed and honestly rated. The goal is not scale — it's proof the model converts better than portal leads."],
    ["Year 2", "HYDERABAD", "The whole city, plus transactions", "Full city coverage. Exclusive mandates as the core revenue line. Services layer live. The name buyers check before visiting anything."],
    ["Years 3–4", "SOUTH INDIA", "Bangalore, Chennai, Pune", "The content and review system is city-agnostic — only the data changes. Each city launches on the template Neopolis produced."],
    ["Years 5–7", "INDIA", "National platform, data business", "Top ten cities. The high-margin line arrives — developers, banks and funds paying for OTHO's demand data."],
    ["Years 8–10", "GLOBAL", "NRI corridors first", "The first step abroad isn't a new market — it's this market from the other side. Gulf, Singapore, US and UK buyers who need honest remote due diligence."]
  ];
  const rh = 0.94, gap = 0.06;
  hz.forEach((h, i) => {
    const y = y0 + i * (rh + gap);
    band(s, M, y, W, rh);
    s.addText(h[0], {
      x: M + 0.32, y: y + 0.14, w: 1.6, h: 0.38,
      fontFace: HEAD, fontSize: 16, bold: true, color: BRASS, margin: 0, valign: "middle"
    });
    s.addText(h[1], {
      x: M + 0.32, y: y + 0.5, w: 1.7, h: 0.3,
      fontFace: BODY, fontSize: 8.5, color: T3, charSpacing: 1.1, margin: 0
    });
    s.addText(h[2], {
      x: M + 2.2, y, w: 3.5, h: rh,
      fontFace: HEAD, fontSize: 14, bold: true, color: T1, valign: "middle", lineSpacing: 18, margin: 0
    });
    s.addText(h[3], {
      x: M + 5.95, y, w: W - 6.27, h: rh,
      fontFace: BODY, fontSize: 11.5, color: T2, lineSpacing: 16, valign: "middle", margin: 0
    });
  });
  s.addText("Ten years is four cities and one honest habit, repeated.", {
    x: M, y: y0 + 5 * (rh + gap) + 0.16, w: W, h: 0.44,
    fontFace: HEAD, fontSize: 17, bold: true, italic: true, color: T1, margin: 0, valign: "middle"
  });
  s.addNotes("The NRI line is worth pausing on. The natural first step abroad is not a new market, it is this market from the other side - buyers who cannot inspect anything themselves and need an honest proxy more than anyone.");
}

/* ============================================================ 32 */
{
  const s = slideL();
  const y0 = head(s, "16", "What we need from you", null);

  const rows = [
    ["One person who can approve", "Approval by committee misses launch windows.", "Day 1"],
    ["Founders on camera, twice a month", "Half a day. The reviews and podcast are the whole plan, and only you can front them.", "From week 3"],
    ["Two guest introductions a month", "Your relationships are what make the podcast unmatchable.", "Ongoing"],
    ["Willingness to publish negatives", "The honest reviews are the moat. Soften them to protect a relationship and the strategy collapses into another portal.", "Agree now"],
    ["Your real numbers", "Average unit value and commission, so the model stops being our guesswork.", "Week 2"],
    ["Weekly time with sales", "Marketing that doesn't hear objections keeps producing leads sales can't close.", "Ongoing"]
  ];
  const rh = 0.72, gap = 0.06;
  rows.forEach((r, i) => {
    const y = y0 + i * (rh + gap);
    band(s, M, y, W, rh);
    s.addText(r[0], {
      x: M + 0.32, y, w: 3.7, h: rh,
      fontFace: HEAD, fontSize: 13.5, bold: true, color: T1, valign: "middle", lineSpacing: 18, margin: 0
    });
    s.addText(r[1], {
      x: M + 4.2, y, w: W - 4.2 - 1.7, h: rh,
      fontFace: BODY, fontSize: 12, color: T2, valign: "middle", lineSpacing: 17, margin: 0
    });
    s.addText(r[2], {
      x: M + W - 1.62, y, w: 1.3, h: rh,
      fontFace: BODY, fontSize: 11.5, bold: true, color: BRASS,
      align: "right", valign: "middle", margin: 0
    });
  });
  s.addText(
    "The hardest one is publishing honest negatives on projects run by developers you've known twenty years. " +
    "It's also the only reason a buyer would believe anything else on the platform.",
    { x: M, y: y0 + 6 * (rh + gap) + 0.16, w: W, h: 0.7,
      fontFace: BODY, fontSize: 13.5, italic: true, color: T1, lineSpacing: 20, margin: 0 }
  );
  s.addNotes("Raise the honest negatives point yourself rather than letting it surface in month three. If they will not commit to it, the moat disappears and this becomes another portal. Better to know in the room.");
}

/* ============================================================ 33 */
{
  const s = slideD();
  s.addText("Ninety days to exist.\nA year to be trusted.\nTen to be everywhere.", {
    x: M, y: 1.95, w: 11.0, h: 3.2,
    fontFace: HEAD, fontSize: 48, bold: true, color: D1, lineSpacing: 66, charSpacing: -1.1, margin: 0, valign: "middle"
  });
  s.addText("PRODUCTION X", {
    x: M, y: 6.02, w: 5, h: 0.32,
    fontFace: BODY, fontSize: 11.5, bold: true, color: BRASS_BR, charSpacing: 3.4, margin: 0
  });
  s.addText("Strategy & launch plan for OTHO Realty   ·   August 2026", {
    x: M, y: 6.4, w: W, h: 0.28, fontFace: BODY, fontSize: 10.5, color: D3, margin: 0
  });
  s.addNotes("Close here and stop. Do not add a summary slide - this line is the summary. Then hand over to questions.");
}

pres.writeFile({ fileName: "/home/user/OTHO-REALTY/deck/Building_OTHO_ProductionX.pptx" })
  .then(f => console.log("written:", f));
