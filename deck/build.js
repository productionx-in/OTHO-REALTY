const pptxgen = require("pptxgenjs");

const NAVY    = "1A2332";
const NAVY_2  = "24313F";
const LIGHT   = "F5F5F3";
const WHITE   = "FFFFFF";
const CARD    = "FFFFFF";
const GOLD    = "B07E22";
const GOLD_BR = "E8B04B";
const BLUE    = "2E6FD9";
const RED     = "C4453A";
const GREEN   = "3D8B63";
const GREY    = "676C74";
const GREY_LT = "A8ADB4";
const RULE    = "DFDFDB";

const HEAD = "Cambria";
const BODY = "Calibri";

const M = 0.7;              // left margin
const W = 13.33 - M * 2;    // content width

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Production X";
pres.company = "Production X";
pres.title = "Building OTHO";

function shadow() {
  return { type: "outer", color: "1A2332", blur: 8, offset: 2, angle: 90, opacity: 0.10 };
}

// ---------- slide shells ----------

function darkSlide() {
  const s = pres.addSlide();
  s.background = { color: NAVY };
  return s;
}

function lightSlide() {
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  return s;
}

function sectionTitle(s, num, text) {
  s.addShape(pres.ShapeType.ellipse, {
    x: M, y: 0.52, w: 0.42, h: 0.42, fill: { color: GOLD }
  });
  s.addText(num, {
    x: M, y: 0.52, w: 0.42, h: 0.42,
    fontFace: BODY, fontSize: 13, bold: true, color: WHITE,
    align: "center", valign: "middle", margin: 0
  });
  s.addText(text, {
    x: M + 0.62, y: 0.46, w: W - 0.62, h: 0.56,
    fontFace: HEAD, fontSize: 30, bold: true, color: NAVY,
    align: "left", valign: "middle", margin: 0
  });
}

function kicker(s, text, color) {
  s.addText(text, {
    x: M, y: 1.18, w: W, h: 0.34,
    fontFace: BODY, fontSize: 15, color: color || GREY,
    align: "left", valign: "top", margin: 0
  });
}

// ---------- 01 TITLE ----------
{
  const s = darkSlide();
  s.addText("PRODUCTION X", {
    x: M, y: 0.75, w: 5, h: 0.32,
    fontFace: BODY, fontSize: 12, bold: true, color: GOLD_BR,
    charSpacing: 3, margin: 0
  });
  s.addText("Building OTHO", {
    x: M, y: 1.9, w: 11.2, h: 1.5,
    fontFace: HEAD, fontSize: 64, bold: true, color: WHITE, margin: 0
  });
  s.addText(
    "Where you stand today, what's broken in Indian property platforms, " +
    "the product we build in that gap, and the first 90 days.",
    { x: M, y: 3.5, w: 8.4, h: 1.0, fontFace: BODY, fontSize: 18, color: "C9CDD3", lineSpacing: 26, margin: 0 }
  );

  const items = [
    ["Starting", "Neopolis, Kokapet"],
    ["First milestone", "90 days"],
    ["The model", "CarWale, for property"],
    ["Horizon", "Hyderabad → India → global"]
  ];
  items.forEach((it, i) => {
    const x = M + i * 3.0;
    s.addText(it[0].toUpperCase(), {
      x, y: 5.35, w: 2.8, h: 0.26,
      fontFace: BODY, fontSize: 10, color: GREY_LT, charSpacing: 1.5, margin: 0
    });
    s.addText(it[1], {
      x, y: 5.64, w: 2.8, h: 0.4,
      fontFace: HEAD, fontSize: 15, bold: true, color: WHITE, margin: 0
    });
  });
  s.addText("Strategy & launch plan for OTHO Realty  ·  August 2026", {
    x: M, y: 6.7, w: W, h: 0.3, fontFace: BODY, fontSize: 11, color: GREY, margin: 0
  });
  s.addNotes("Open here. This is a strategy deck, not a campaign plan. Say: I looked at where OTHO stands online today, what every competitor gets wrong, and what we build in that gap. We start with Neopolis and the same system carries to every project after.");
}

// ---------- 02 WHAT THIS COVERS ----------
{
  const s = darkSlide();
  s.addText("What's in this", {
    x: M, y: 0.7, w: W, h: 0.7, fontFace: HEAD, fontSize: 34, bold: true, color: WHITE, margin: 0
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
    const y = 1.85 + i * 0.82;
    s.addText(r[0], {
      x: M, y, w: 0.7, h: 0.5,
      fontFace: HEAD, fontSize: 20, bold: true, color: GOLD_BR, margin: 0, valign: "middle"
    });
    s.addText(r[1], {
      x: M + 0.78, y, w: 4.6, h: 0.5,
      fontFace: HEAD, fontSize: 17, bold: true, color: WHITE, margin: 0, valign: "middle"
    });
    s.addText(r[2], {
      x: M + 5.5, y, w: 6.3, h: 0.5,
      fontFace: BODY, fontSize: 14, color: "AEB4BC", margin: 0, valign: "middle"
    });
  });
  s.addNotes("Walk through the agenda quickly, about 30 seconds. The point is to signal this is structured and finite, not a wandering pitch.");
}

// ---------- 03 WHAT I FOUND ----------
{
  const s = lightSlide();
  sectionTitle(s, "01", "What I found");
  kicker(s, "I searched for OTHO Realty the way a buyer would. Then I searched for Propertunity.");

  const rows = [
    ['"OTHO Realty" on Google', "Returns Square Yards, 99acres, NoBroker. Nothing about you.", "NOTHING", RED],
    ['"Propertunity" Hyderabad', "Returns firms in Florida, the UK and Australia. Not you.", "NOTHING", RED],
    ["Website", "None found under either name", "NOTHING", RED],
    ["YouTube", "No channel", "NOTHING", RED],
    ["Articles, guides, press", "Nothing indexed anywhere", "NOTHING", RED],
    ["Instagram, LinkedIn, GBP", "To confirm with you in week one", "TO CHECK", GREY],
    ["Founder relationships", "Two decades, tier-one developers. The whole asset.", "STRONG", GREEN]
  ];
  rows.forEach((r, i) => {
    const y = 1.75 + i * 0.62;
    s.addShape(pres.ShapeType.rect, {
      x: M, y, w: W, h: 0.54, fill: { color: CARD }, line: { color: RULE, width: 0.5 }
    });
    s.addText(r[0], {
      x: M + 0.22, y, w: 3.5, h: 0.54,
      fontFace: HEAD, fontSize: 13.5, bold: true, color: NAVY, valign: "middle", margin: 0
    });
    s.addText(r[1], {
      x: M + 3.85, y, w: 6.3, h: 0.54,
      fontFace: BODY, fontSize: 12.5, color: GREY, valign: "middle", margin: 0
    });
    s.addText(r[2], {
      x: M + W - 1.75, y, w: 1.55, h: 0.54,
      fontFace: BODY, fontSize: 10.5, bold: true, color: r[3],
      align: "right", valign: "middle", charSpacing: 1, margin: 0
    });
  });
  s.addNotes("This is your strongest opening. Hand them a phone and let them search. The name change from Propertunity cost nothing because there was nothing online to lose. Do not apologise for this slide - it sets up the next one.");
}

// ---------- 04 ZERO BAGGAGE ----------
{
  const s = darkSlide();
  s.addText("Zero footprint means\nzero baggage.", {
    x: M, y: 1.7, w: 9.6, h: 2.0,
    fontFace: HEAD, fontSize: 46, bold: true, color: WHITE, lineSpacing: 54, margin: 0
  });
  s.addText(
    "No dead accounts. No abandoned campaigns. No complaints ranking on page one. " +
    "No confused brand to unpick.\n\n" +
    "Every competitor in this deck carries years of that. OTHO gets to build it properly " +
    "the first time — and if the ambition is national, the foundation matters more than the first campaign.",
    { x: M, y: 4.0, w: 9.6, h: 2.0, fontFace: BODY, fontSize: 16, color: "C9CDD3", lineSpacing: 24, margin: 0 }
  );
  s.addNotes("Turn the weakness into the argument. Starting from zero is cheaper than starting from a bad reputation. This is also why the foundation work in the first 30 days matters.");
}

// ---------- 05 THE MARKET ----------
{
  const s = lightSlide();
  sectionTitle(s, "02", "The market you're entering");

  const stats = [
    ["₹2.6 lakh cr", "Indian proptech market in 2025", "IMARC / Ken Research"],
    ["₹6.9 lakh cr", "Where it reaches by 2031", "IMARC / Ken Research"],
    ["19 months", "Unsold inventory in Hyderabad — worst in India", "Anarock"],
    ["40%", "Of ~10,000 Neopolis homes, still unsold", "Trade press 2026"]
  ];
  stats.forEach((st, i) => {
    const x = M + i * 3.06;
    s.addShape(pres.ShapeType.rect, {
      x, y: 1.75, w: 2.86, h: 2.15, fill: { color: CARD }, line: { color: RULE, width: 0.5 }, shadow: shadow()
    });
    s.addText(st[0], {
      x: x + 0.24, y: 1.95, w: 2.4, h: 0.7,
      fontFace: HEAD, fontSize: 27, bold: true, color: NAVY, margin: 0, valign: "middle"
    });
    s.addText(st[1], {
      x: x + 0.24, y: 2.7, w: 2.4, h: 0.8,
      fontFace: BODY, fontSize: 12.5, color: GREY, margin: 0, valign: "top"
    });
    s.addText(st[2].toUpperCase(), {
      x: x + 0.24, y: 3.5, w: 2.4, h: 0.28,
      fontFace: BODY, fontSize: 9, color: GREY_LT, charSpacing: 1, margin: 0
    });
  });

  s.addText(
    "Two things are true at once. The category is large and growing fast. And in Hyderabad, " +
    "developers are sitting on stock they cannot move — agents are quoting Neopolis units near " +
    "₹6,300/sq ft against list prices of ₹11,000–12,000.",
    { x: M, y: 4.35, w: W, h: 0.9, fontFace: BODY, fontSize: 15.5, color: NAVY, lineSpacing: 24, margin: 0 }
  );
  s.addText(
    "That gap is the opening. When a developer's own pricing is being undercut by half in the grey market, " +
    "what they need is not another listings portal. It's someone who brings buyers who arrive already convinced.",
    { x: M, y: 5.35, w: W, h: 0.9, fontFace: BODY, fontSize: 15.5, color: GREY, lineSpacing: 24, margin: 0 }
  );
  s.addNotes("Rupee figures throughout. The proptech market converts from roughly 30 billion dollars at 2026 rates. Pause on the 6,300 versus 11,000 gap - that is the commercial argument for everything that follows.");
}

// ---------- 06 THE GAP ----------
{
  const s = lightSlide();
  sectionTitle(s, "03", "The gap");
  kicker(s, "Every major Indian platform runs the same business: collect a lead, sell it to several brokers, let them fight over it.");

  s.addShape(pres.ShapeType.rect, {
    x: M, y: 1.78, w: 6.0, h: 3.5, fill: { color: CARD }, line: { color: RULE, width: 0.5 }, shadow: shadow()
  });
  s.addText("What buyers complain about", {
    x: M + 0.3, y: 2.0, w: 5.4, h: 0.4, fontFace: HEAD, fontSize: 17, bold: true, color: NAVY, margin: 0
  });
  s.addText([
    { text: "Spam is complaint number one across reviews of every major portal", options: { bullet: true, breakLine: true } },
    { text: "People keep a second “property phone” — or change their number entirely", options: { bullet: true, breakLine: true } },
    { text: "43% report encountering fraudulent listings", options: { bullet: true, breakLine: true } },
    { text: "Listings cloned across portals; AI-generated fake interiors", options: { bullet: true, breakLine: true } },
    { text: "The same flat listed by eight brokers at six different prices", options: { bullet: true } }
  ], {
    x: M + 0.3, y: 2.55, w: 5.4, h: 2.5,
    fontFace: BODY, fontSize: 13.5, color: GREY, paraSpaceAfter: 9, margin: 0
  });

  s.addShape(pres.ShapeType.rect, {
    x: M + 6.35, y: 1.78, w: 5.58, h: 3.5, fill: { color: NAVY }, line: { color: NAVY, width: 0.5 }, shadow: shadow()
  });
  s.addText("Why nobody fixes it", {
    x: M + 6.65, y: 2.0, w: 4.98, h: 0.4, fontFace: HEAD, fontSize: 17, bold: true, color: GOLD_BR, margin: 0
  });
  s.addText(
    "They can't. Reselling one lead to eight brokers IS the revenue model.\n\n" +
    "A portal that promised never to share your number would have to dismantle its own P&L to keep the promise.\n\n" +
    "That's the gap. Not a feature they forgot — a door their business model locks from the inside.",
    { x: M + 6.65, y: 2.55, w: 4.98, h: 2.5, fontFace: BODY, fontSize: 14, color: "C9CDD3", lineSpacing: 22, margin: 0 }
  );

  s.addText(
    "Meanwhile the question buyers most want answered — which of these should I actually buy? — is served by nobody. " +
    "Portals answer “what is available.” Nobody answers “what is good.”",
    { x: M, y: 5.5, w: W, h: 0.8, fontFace: BODY, fontSize: 15.5, color: NAVY, lineSpacing: 24, margin: 0 }
  );
  s.addNotes("This is the most important slide in the deck. The gap is structural, not an oversight. Say the line about the door locked from the inside - it is what makes the opportunity defensible rather than just an idea.");
}

// ---------- 07 STATEMENT ----------
{
  const s = darkSlide();
  s.addText("A platform with two million\nlistings is worthless if\nenquiring on one gets you\neight phone calls.", {
    x: M, y: 1.8, w: 11.0, h: 3.4,
    fontFace: HEAD, fontSize: 40, bold: true, color: WHITE, lineSpacing: 52, margin: 0
  });
  s.addNotes("Deliver this slowly. It reframes the entire category from a scale competition to a trust competition - which is the only competition OTHO can win from a standing start.");
}

// ---------- 08 COMPETITORS ----------
{
  const s = lightSlide();
  sectionTitle(s, "04", "Who we're up against");

  const rows = [
    [
      { text: "Player", options: { bold: true } },
      { text: "Scale", options: { bold: true } },
      { text: "Model", options: { bold: true } },
      { text: "Where they're weak", options: { bold: true } }
    ],
    ["NoBroker", "₹803cr FY24, +32%\n34mn installs\n3.2mn monthly users",
     "Zero brokerage. ₹999 subscription. Services — loans, movers, interiors. Bank referrals ~₹120cr.",
     "Built for rentals and resale, not new launches. Thin on premium. No advisory layer."],
    ["99acres", "~13.3mn visits/month", "Classifieds. Developers and brokers pay to list and be seen.",
     "Pure volume. Lead resold repeatedly. No opinion on anything."],
    ["MagicBricks", "~12.1mn visits/month", "Classifieds plus locality data and price trend tools.",
     "Has data but no judgement. Tools sit beside the same lead-resale engine."],
    ["Housing.com", "~9.8mn visits/month", "Classifieds with better design and mapping.",
     "Best interface of the four, same underlying business."],
    ["Square Yards", "₹1,410cr FY25\nEBITDA ₹46cr", "Full-service brokerage at volume.",
     "3.3% margin. Proof that chasing transaction volume is a trap."]
  ];

  s.addTable(rows, {
    x: M, y: 1.6, w: W,
    colW: [1.9, 2.2, 3.9, 3.93],
    fontFace: BODY, fontSize: 11.5, color: GREY,
    border: { type: "solid", color: RULE, pt: 0.5 },
    fill: { color: CARD },
    valign: "top",
    rowH: 0.45,
    margin: 0.09
  });
  s.addNotes("Read across the last row deliberately. Square Yards built 1,410 crore of revenue and kept 46 crore. Use it to say what OTHO will refuse to do - never compete on listing count or transaction volume.");
}

// ---------- 09 SQUARE YARDS LESSON ----------
{
  const s = darkSlide();
  s.addText("The lesson in the last row", {
    x: M, y: 1.5, w: W, h: 0.6, fontFace: BODY, fontSize: 14, color: GOLD_BR, charSpacing: 2, margin: 0
  });
  s.addText("₹1,410cr in.\n₹46cr kept.", {
    x: M, y: 2.2, w: 6.2, h: 2.0,
    fontFace: HEAD, fontSize: 52, bold: true, color: WHITE, lineSpacing: 62, margin: 0
  });
  s.addText(
    "Volume brokerage in India is a treadmill.\n\n" +
    "OTHO should never compete on listing count or transaction volume. " +
    "That race is won by whoever burns the most money, and the prize is a 3% margin.\n\n" +
    "Compete on judgement instead. Judgement has margin.",
    { x: M + 6.6, y: 2.25, w: 5.3, h: 2.6, fontFace: BODY, fontSize: 16, color: "C9CDD3", lineSpacing: 25, margin: 0 }
  );
  s.addNotes("Founders with big ambitions usually want volume. This slide argues for margin instead, backed by a real company's filings. Expect a question here - the answer is that OTHO earns from mandates and data, not from GMV.");
}

// ---------- 10 SWOT: S + W ----------
{
  const s = lightSlide();
  sectionTitle(s, "05", "SWOT — what we have, what we lack");

  function swotCard(x, title, color, items) {
    s.addShape(pres.ShapeType.rect, {
      x, y: 1.55, w: 5.79, h: 4.75, fill: { color: CARD }, line: { color: RULE, width: 0.5 }, shadow: shadow()
    });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.3, y: 1.82, w: 0.34, h: 0.34, fill: { color: color } });
    s.addText(title, {
      x: x + 0.76, y: 1.78, w: 4.7, h: 0.42,
      fontFace: HEAD, fontSize: 18, bold: true, color: NAVY, valign: "middle", margin: 0
    });
    const txt = items.map((it, i) => ([
      { text: it[0] + " — ", options: { bold: true, color: NAVY, breakLine: false } },
      { text: it[1], options: { color: GREY, breakLine: i !== items.length - 1 } }
    ])).flat();
    s.addText(txt, {
      x: x + 0.3, y: 2.35, w: 5.19, h: 3.75,
      fontFace: BODY, fontSize: 12, lineSpacing: 17, paraSpaceAfter: 10, margin: 0, valign: "top"
    });
  }

  swotCard(M, "Strengths", GREEN, [
    ["Tier-one relationships", "direct access to DSR, Sattva, My Home, Aparna, Prestige. ~70% of Indian residential sales run through channel partners. A funded startup can buy engineers; it cannot buy twenty years of trust with a developer's sales head."],
    ["Timing", "a 19-month overhang means developers are actively looking for a better answer right now."],
    ["No legacy tech debt", "the portals are locked into the shared-lead P&L. OTHO can build the clean architecture from zero."],
    ["Regulatory tailwind", "TRAI and DPDP rules make the spam-and-resell model steadily more expensive."]
  ]);

  swotCard(M + 6.14, "Weaknesses", RED, [
    ["No product or data engineering yet", "the comparison engine is a data acquisition and verification problem across RERA, HMDA and registration records. This is what kills proptech startups."],
    ["Zero digital brand equity", "twenty years of word-of-mouth does not transfer to search."],
    ["Advisory doesn't scale linearly", "every mandate consumes senior human time."],
    ["Key-person dependency", "relationships and podcast authority both sit with the founders."],
    ["Working capital", "commission pays on registration, so cash lands 3–9 months behind the cost."]
  ]);
  s.addNotes("Do not rush the weaknesses. Presenting them honestly to people with twenty years of experience buys more credibility than any strength on the left. The data engineering point is the real risk - flag that we will need a technical hire or partner by month four.");
}

// ---------- 11 SWOT: O + T ----------
{
  const s = lightSlide();
  sectionTitle(s, "05", "SWOT — the opening, and what could go wrong");

  function swotCard(x, title, color, items) {
    s.addShape(pres.ShapeType.rect, {
      x, y: 1.55, w: 5.79, h: 4.75, fill: { color: CARD }, line: { color: RULE, width: 0.5 }, shadow: shadow()
    });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.3, y: 1.82, w: 0.34, h: 0.34, fill: { color: color } });
    s.addText(title, {
      x: x + 0.76, y: 1.78, w: 4.7, h: 0.42,
      fontFace: HEAD, fontSize: 18, bold: true, color: NAVY, valign: "middle", margin: 0
    });
    const txt = items.map((it, i) => ([
      { text: it[0] + " — ", options: { bold: true, color: NAVY, breakLine: false } },
      { text: it[1], options: { color: GREY, breakLine: i !== items.length - 1 } }
    ])).flat();
    s.addText(txt, {
      x: x + 0.3, y: 2.35, w: 5.19, h: 3.75,
      fontFace: BODY, fontSize: 12, lineSpacing: 17, paraSpaceAfter: 10, margin: 0, valign: "top"
    });
  }

  swotCard(M, "Opportunities", BLUE, [
    ["The overhang itself", "~97,000 unsold units is a large, motivated mandate pipeline. Every stuck project is a sales conversation."],
    ["The transparency vacuum", "no Indian portal publishes loading factor, true density or UDS as standard fields."],
    ["AI citation land-grab", "brands cited in AI answers earn far more clicks, and AI referral traffic converts around 3x. That window is open now."],
    ["Bharat Future City", "master plan and zoning due December 2026 — a dateable, high-search event with no incumbent authority."],
    ["NRI buyers", "under-served, higher ticket sizes, and they need an honest proxy on the ground."]
  ]);

  swotCard(M + 6.14, "Threats", GOLD, [
    ["Developer backlash on honest negatives", "we earn from developers while publishing unflattering facts. Needs a written editorial charter, agreed up front."],
    ["Incumbent capital response", "Housing or 99acres can copy a comparison engine faster than we can build a brand. Defensibility is exclusive inventory and verified data, not features."],
    ["Deepening downturn", "if the overhang passes 24 months, marketing budgets and commissions get cut together."],
    ["RERA exposure", "₹10,000/day penalties and mandatory RERA numbers in every ad. One sloppy campaign is existential for a firm selling trust."],
    ["Defamation risk", "“this project is bad” is litigable. A cited pollution reading is not. The distinction must be enforced editorially."]
  ]);
  s.addNotes("The threats column is where you show you have thought past the pitch. The defamation point matters - honest negatives must be built on cited facts, never opinion. Offer to bring in media counsel before the first negative is published.");
}

// ---------- 12 THE MOAT ----------
{
  const s = darkSlide();
  s.addText("What the SWOT forces", {
    x: M, y: 0.95, w: W, h: 0.5, fontFace: BODY, fontSize: 14, color: GOLD_BR, charSpacing: 2, margin: 0
  });
  s.addText("The moat is not the platform.\nFeatures get copied.", {
    x: M, y: 1.55, w: 11.0, h: 1.5,
    fontFace: HEAD, fontSize: 38, bold: true, color: WHITE, lineSpacing: 46, margin: 0
  });

  const cols = [
    ["Exclusive inventory", "Mandates competitors literally cannot list."],
    ["Verified data", "A proprietary dataset built by physically auditing projects."],
    ["A trust brand", "One the portals cannot adopt without cannibalising their own revenue."]
  ];
  cols.forEach((c, i) => {
    const x = M + i * 4.0;
    s.addShape(pres.ShapeType.rect, {
      x, y: 3.5, w: 3.7, h: 1.9, fill: { color: NAVY_2 }, line: { color: "3A4754", width: 0.5 }
    });
    s.addText(c[0], {
      x: x + 0.28, y: 3.75, w: 3.14, h: 0.45,
      fontFace: HEAD, fontSize: 16, bold: true, color: GOLD_BR, margin: 0
    });
    s.addText(c[1], {
      x: x + 0.28, y: 4.25, w: 3.14, h: 1.0,
      fontFace: BODY, fontSize: 13, color: "C9CDD3", lineSpacing: 19, margin: 0
    });
  });
  s.addText("The platform is the delivery mechanism for those three. Build in that order.", {
    x: M, y: 5.75, w: W, h: 0.5, fontFace: BODY, fontSize: 16, italic: true, color: WHITE, margin: 0
  });
  s.addNotes("This is the strategic conclusion. If they remember one thing from the middle of the deck, it should be that features get copied and the archive of honest reviews does not.");
}

// ---------- 13 THE MODEL ----------
{
  const s = darkSlide();
  s.addText("06", {
    x: M, y: 1.5, w: 1.0, h: 0.6, fontFace: HEAD, fontSize: 20, bold: true, color: GOLD_BR, margin: 0
  });
  s.addText("The model:\nCarWale, for property.", {
    x: M, y: 2.1, w: 10.5, h: 1.9,
    fontFace: HEAD, fontSize: 46, bold: true, color: WHITE, lineSpacing: 56, margin: 0
  });
  s.addText(
    "CarWale did not beat the classifieds by having more cars. It won by owning the step before " +
    "the transaction — expert reviews, side-by-side comparisons, price guides, owner ratings, EMI calculators.\n\n" +
    "It became where Indians go to decide. It reached 65 million car buyers and built roughly " +
    "₹1,260cr of revenue on the intent it had already earned.",
    { x: M, y: 4.3, w: 10.2, h: 1.9, fontFace: BODY, fontSize: 16.5, color: "C9CDD3", lineSpacing: 25, margin: 0 }
  );
  s.addNotes("Naming a company they already know does more work than any abstract explanation. Everyone in an Indian boardroom knows CarWale. The point: it won the category without ever winning on listings.");
}

// ---------- 14 CLASSIFIEDS VS RESEARCH ----------
{
  const s = lightSlide();
  sectionTitle(s, "06", "Two different businesses");

  const cards = [
    ["Classifieds business", "Everyone else", RED, [
      "Answers “what's available”",
      "Monetises by reselling your attention",
      "Wins on volume and ad spend",
      "The buyer is the product"
    ]],
    ["Research business", "OTHO", GREEN, [
      "Answers “what should I buy”",
      "Monetises intent it has already earned",
      "Wins on trust and depth",
      "The buyer is the customer"
    ]]
  ];
  cards.forEach((c, i) => {
    const x = M + i * 6.14;
    const dark = i === 1;
    s.addShape(pres.ShapeType.rect, {
      x, y: 1.65, w: 5.79, h: 2.9,
      fill: { color: dark ? NAVY : CARD }, line: { color: dark ? NAVY : RULE, width: 0.5 }, shadow: shadow()
    });
    s.addText(c[1].toUpperCase(), {
      x: x + 0.3, y: 1.9, w: 5.19, h: 0.3,
      fontFace: BODY, fontSize: 10, bold: true, color: dark ? GOLD_BR : c[2], charSpacing: 1.5, margin: 0
    });
    s.addText(c[0], {
      x: x + 0.3, y: 2.22, w: 5.19, h: 0.45,
      fontFace: HEAD, fontSize: 20, bold: true, color: dark ? WHITE : NAVY, margin: 0
    });
    s.addText(c[3].map((t, j) => ({
      text: t, options: { bullet: true, breakLine: j !== c[3].length - 1 }
    })), {
      x: x + 0.3, y: 2.8, w: 5.19, h: 1.6,
      fontFace: BODY, fontSize: 13.5, color: dark ? "C9CDD3" : GREY, paraSpaceAfter: 8, margin: 0
    });
  });

  s.addText("In Indian real estate, the research layer is empty.", {
    x: M, y: 4.85, w: W, h: 0.5, fontFace: HEAD, fontSize: 22, bold: true, color: NAVY, margin: 0
  });
  s.addText(
    "No price estimate, no expert project reviews, no honest comparison engine, no resident ratings. " +
    "Every player is fighting over the classifieds half of the market.",
    { x: M, y: 5.4, w: W, h: 0.7, fontFace: BODY, fontSize: 15, color: GREY, lineSpacing: 23, margin: 0 }
  );
  s.addNotes("The right-hand card is deliberately dark - it is the side OTHO sits on. Land the closing line: every competitor is fighting over half the market and ignoring the other half entirely.");
}

// ---------- 15 THE ONE LINER ----------
{
  const s = darkSlide();
  s.addText("Every property platform tells you\nwhat's for sale.", {
    x: M, y: 2.1, w: 11.4, h: 1.5,
    fontFace: HEAD, fontSize: 36, color: "8E959E", lineSpacing: 48, margin: 0
  });
  s.addText("OTHO tells you what's\nworth buying.", {
    x: M, y: 3.75, w: 11.4, h: 1.6,
    fontFace: HEAD, fontSize: 46, bold: true, color: WHITE, lineSpacing: 58, margin: 0
  });
  s.addNotes("This is the positioning line. Say it, then stop talking for a beat. If they repeat it back later in the meeting, the deck has done its job.");
}

// ---------- 16 COMPARISON ENGINE ----------
{
  const s = lightSlide();
  sectionTitle(s, "07", "The signature screen");
  kicker(s, "Two projects. One is 5% cheaper on the board, and 2% dearer in reality.");

  const cx = M, cy = 1.78, cw = W, rowH = 0.52;
  const c1 = 4.6, c2 = (cw - c1) / 2;

  const rows = [
    ["", "Project A", "Project B", "hd"],
    ["Advertised rate", "₹9,483", "₹9,994", "a"],
    ["RERA carpet area", "1,842 sq ft", "1,861 sq ft", "n"],
    ["Loading factor", "44%", "36%", "b"],
    ["Real rate on carpet", "₹13,720", "₹13,440", "b"],
    ["Land share per unit", "Lower", "18% more", "b"],
    ["OTHO verdict", "Looks cheaper", "Actually cheaper", "b"]
  ];

  rows.forEach((r, i) => {
    const y = cy + i * rowH;
    const isHd = r[3] === "hd";
    s.addShape(pres.ShapeType.rect, {
      x: cx, y, w: c1, h: rowH,
      fill: { color: isHd ? NAVY : CARD }, line: { color: RULE, width: 0.5 }
    });
    s.addText(r[0], {
      x: cx + 0.22, y, w: c1 - 0.4, h: rowH,
      fontFace: BODY, fontSize: 13, bold: isHd, color: isHd ? WHITE : NAVY, valign: "middle", margin: 0
    });

    let f1 = CARD, f2 = CARD, t1 = NAVY, t2 = NAVY;
    if (isHd) { f1 = NAVY; f2 = NAVY; t1 = WHITE; t2 = WHITE; }
    else if (r[3] === "a") { f1 = "E4F0E9"; t1 = GREEN; }
    else if (r[3] === "b") { f1 = "F8E7E5"; t1 = RED; f2 = "E4F0E9"; t2 = GREEN; }

    s.addShape(pres.ShapeType.rect, { x: cx + c1, y, w: c2, h: rowH, fill: { color: f1 }, line: { color: RULE, width: 0.5 } });
    s.addText(r[1], {
      x: cx + c1, y, w: c2, h: rowH,
      fontFace: BODY, fontSize: 13.5, bold: true, color: t1, align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.ShapeType.rect, { x: cx + c1 + c2, y, w: c2, h: rowH, fill: { color: f2 }, line: { color: RULE, width: 0.5 } });
    s.addText(r[2], {
      x: cx + c1 + c2, y, w: c2, h: rowH,
      fontFace: BODY, fontSize: 13.5, bold: true, color: t2, align: "center", valign: "middle", margin: 0
    });
  });

  s.addText(
    "Every portal in India shows the two advertised numbers and lets you pick the wrong flat. " +
    "Figures illustrative until built from live TG-RERA filings.",
    { x: M, y: 5.55, w: W, h: 0.7, fontFace: BODY, fontSize: 13.5, italic: true, color: GREY, lineSpacing: 21, margin: 0 }
  );
  s.addNotes("This is your demo moment. Walk down the column slowly. Project A looks cheaper on the advertised rate and is actually more expensive per usable foot with less land. No portal in India shows this - it is the whole product in one screen.");
}

// ---------- 17 PLATFORM FEATURES 1 ----------
{
  const s = lightSlide();
  sectionTitle(s, "07", "What goes in the platform");
  kicker(s, "Nothing here is unproven. It's proven elsewhere and missing in Indian property.");

  const feats = [
    ["Comparison engine", "Any two projects side by side on carpet, real rate, land share, density, possession.", "From CarWale"],
    ["Expert project reviews", "OTHO rates every project it covers, with a score and a written verdict. Including the bad ones.", "From CarWale"],
    ["Resident reviews", "People who live there rate build quality, management, and what broke first.", "From CarWale"],
    ["Real rate calculator", "Loading factor exposed. What you pay per usable foot, not per marketing foot.", "OTHO original"],
    ["Honest negatives", "Every project page lists what's wrong with it. The trust engine of the whole platform.", "OTHO original"],
    ["Price estimate", "What a unit is actually worth, from registration data — not from the asking price.", "From Zillow"]
  ];
  feats.forEach((f, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M + col * 4.0, y = 1.78 + row * 2.25;
    s.addShape(pres.ShapeType.rect, {
      x, y, w: 3.7, h: 2.05, fill: { color: CARD }, line: { color: RULE, width: 0.5 }, shadow: shadow()
    });
    s.addText(f[0], {
      x: x + 0.26, y: y + 0.2, w: 3.18, h: 0.4,
      fontFace: HEAD, fontSize: 15, bold: true, color: NAVY, margin: 0
    });
    s.addText(f[1], {
      x: x + 0.26, y: y + 0.65, w: 3.18, h: 0.95,
      fontFace: BODY, fontSize: 12, color: GREY, lineSpacing: 17, margin: 0
    });
    s.addText(f[2].toUpperCase(), {
      x: x + 0.26, y: y + 1.62, w: 3.18, h: 0.28,
      fontFace: BODY, fontSize: 9, bold: true, color: GOLD, charSpacing: 1, margin: 0
    });
  });
  s.addNotes("Every feature names where it is borrowed from. That is deliberate - it tells them we are not inventing risk, we are importing proven ideas into a category that lacks them.");
}

// ---------- 18 PLATFORM FEATURES 2 ----------
{
  const s = lightSlide();
  sectionTitle(s, "07", "What goes in the platform");
  kicker(s, "Continued — the trust and service layer.");

  const feats = [
    ["Locality pages", "Price history, infrastructure status, commute times measured at peak hour, schools, water.", "From MagicBricks"],
    ["Your number stays private", "Never sold, never shared with brokers. One conversation, with OTHO.", "From NoBroker"],
    ["Verified listings only", "Every project checked against its RERA filing before it appears. No cloned photos.", "Fixes the #1 complaint"],
    ["Site visit booking", "Real calendar slots, confirmed on WhatsApp. Not a form promising a callback.", "From NoBroker"],
    ["Infrastructure tracker", "Metro Phase 2 and Future City with funding and construction status, not developer promises.", "OTHO original"],
    ["Services layer", "Home loans, legal checks, registration, interiors. Added later, once trust exists.", "From NoBroker"]
  ];
  feats.forEach((f, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M + col * 4.0, y = 1.78 + row * 2.25;
    s.addShape(pres.ShapeType.rect, {
      x, y, w: 3.7, h: 2.05, fill: { color: CARD }, line: { color: RULE, width: 0.5 }, shadow: shadow()
    });
    s.addText(f[0], {
      x: x + 0.26, y: y + 0.2, w: 3.18, h: 0.4,
      fontFace: HEAD, fontSize: 15, bold: true, color: NAVY, margin: 0
    });
    s.addText(f[1], {
      x: x + 0.26, y: y + 0.65, w: 3.18, h: 0.95,
      fontFace: BODY, fontSize: 12, color: GREY, lineSpacing: 17, margin: 0
    });
    s.addText(f[2].toUpperCase(), {
      x: x + 0.26, y: y + 1.62, w: 3.18, h: 0.28,
      fontFace: BODY, fontSize: 9, bold: true, color: GOLD, charSpacing: 1, margin: 0
    });
  });
  s.addNotes("The private number promise is the one to emphasise. It costs OTHO nothing and no incumbent can match it without breaking their own revenue model.");
}

// ---------- 19 FOUR LAYERS ----------
{
  const s = lightSlide();
  sectionTitle(s, "08", "Built in four layers");

  const layers = [
    ["Layer 1", "Days 1–90", "Trust", "Website, project pages, comparison engine, reviews and guides. No listings, no transactions. We earn the right to be believed before we ask for anything.", NAVY],
    ["Layer 2", "Months 4–12", "Coverage", "Every meaningful Hyderabad project reviewed and comparable. Resident reviews live. Price estimates from registration data. OTHO becomes the default check before buying in this city.", "2E4257"],
    ["Layer 3", "Year 2", "Transactions", "Exclusive developer mandates, site visits, bookings. Revenue arrives on intent we already own, so cost per booking is a fraction of portal leads.", "3A5670"],
    ["Layer 4", "Year 3+", "Services and data", "Loans, legal, registration, interiors. And the data business — developers and banks paying for what OTHO knows about demand. The high-margin end.", "4A6B88"]
  ];
  layers.forEach((l, i) => {
    const y = 1.6 + i * 1.16;
    s.addShape(pres.ShapeType.rect, {
      x: M, y, w: W, h: 1.05, fill: { color: l[4] }, line: { color: l[4], width: 0.5 }
    });
    s.addText(l[0], {
      x: M + 0.3, y: y + 0.16, w: 1.5, h: 0.34,
      fontFace: BODY, fontSize: 11, bold: true, color: GOLD_BR, charSpacing: 1, margin: 0
    });
    s.addText(l[1], {
      x: M + 0.3, y: y + 0.52, w: 1.5, h: 0.34,
      fontFace: BODY, fontSize: 11, color: "9AA3AD", margin: 0
    });
    s.addText(l[2], {
      x: M + 2.0, y: y + 0.2, w: 2.5, h: 0.65,
      fontFace: HEAD, fontSize: 19, bold: true, color: WHITE, valign: "middle", margin: 0
    });
    s.addText(l[3], {
      x: M + 4.6, y: y + 0.16, w: 7.2, h: 0.75,
      fontFace: BODY, fontSize: 12.5, color: "C9CDD3", lineSpacing: 17, valign: "middle", margin: 0
    });
  });

  s.addText(
    "Every competitor started at Layer 3 and tried to reverse into trust. It doesn't work — you can't earn " +
    "credibility from people already annoyed by your calls.",
    { x: M, y: 6.35, w: W, h: 0.6, fontFace: BODY, fontSize: 14.5, italic: true, color: NAVY, lineSpacing: 21, margin: 0 }
  );
  s.addNotes("The sequencing is the strategy. Slower for six months, much harder to copy afterwards. If they push to start selling immediately, this is the slide to come back to.");
}

// ---------- 20 WHAT WE PRODUCE ----------
{
  const s = lightSlide();
  sectionTitle(s, "09", "What we produce");

  const rows = [
    [
      { text: "Format", options: { bold: true } },
      { text: "What it is", options: { bold: true } },
      { text: "Volume", options: { bold: true } },
      { text: "Job", options: { bold: true } }
    ],
    ["Project review film", "8–12 min walkthrough with a verdict. Good and bad, on camera.", "2 / month", "The signature format. Builds the review library."],
    ["Comparison film", "Two projects, one screen, real numbers.", "1 / month", "Most shared format. Drives the comparison tool."],
    ["Founder podcast", "30–40 min with a developer, planner, architect or lawyer.", "2 / month", "Authority. Only OTHO can book these guests."],
    ["Locality deep-dive", "Kokapet, Financial District, Tellapur — including drawbacks.", "1 / month", "Search traffic and AI citations."],
    ["The dictionary", "Loading factor, UDS, carpet vs SBA, reading a RERA filing.", "2 / month", "Permanent traffic. Gets OTHO quoted by AI."],
    ["Monthly market note", "Registrations, prices, launches, absorption. Real data.", "1 / month", "Journalists start quoting it. Free PR."],
    ["Vertical clips", "Cut from everything above.", "20–25 / month", "Reach on Instagram, Shorts, LinkedIn."],
    ["Founder posts", "Site observations, pricing oddities, war stories.", "8–10 / month", "Nobody can copy twenty years of stories."]
  ];

  s.addTable(rows, {
    x: M, y: 1.5, w: W,
    colW: [2.4, 4.5, 1.5, 3.53],
    fontFace: BODY, fontSize: 11, color: GREY,
    border: { type: "solid", color: RULE, pt: 0.5 },
    fill: { color: CARD },
    valign: "middle",
    rowH: 0.42,
    margin: 0.08
  });

  s.addText(
    "All of it from two shoot days a month — one studio, one on site. Roughly 35 usable pieces. " +
    "Production is what Production X does, which is why this costs a fraction of agency rates.",
    { x: M, y: 5.75, w: W, h: 0.6, fontFace: BODY, fontSize: 14, color: NAVY, lineSpacing: 21, margin: 0 }
  );
  s.addNotes("This answers what content we actually make. The closing line is your commercial advantage - production in-house is why the budget works.");
}

// ---------- 21 HOW WE PROMOTE ----------
{
  const s = lightSlide();
  sectionTitle(s, "10", "How we promote it");

  const rows = [
    ["YouTube", "Review films, comparisons, podcast", "Where property research actually happens now"],
    ["Instagram", "Vertical clips, project reveals, founder pieces", "Reach and recall"],
    ["LinkedIn", "Founder posts, market notes, commentary", "Reaches GCC employees — the real buyers"],
    ["Search & AI", "Guides, locality pages, comparisons written to be cited", "Free enquiries that compound monthly"],
    ["Google Search ads", "Project names, locality and competitor terms", "Small budget, highest intent only"],
    ["Meta retargeting", "People who watched a film or opened a project page", "Cheap re-engagement. No cold reach."],
    ["WhatsApp", "Opt-in updates, visit confirmations, conversations", "Highest open rate in this market"],
    ["PR", "Monthly market note pitched to Telangana Today, Deccan Chronicle, Siasat", "Third-party credibility, no media cost"],
    ["Developers", "Co-marketing on mandate projects", "They fund reach we would otherwise buy"],
    ["Portals", "Listings for coverage only", "Necessary, never the core"]
  ];
  rows.forEach((r, i) => {
    const y = 1.55 + i * 0.47;
    s.addShape(pres.ShapeType.rect, {
      x: M, y, w: W, h: 0.42, fill: { color: CARD }, line: { color: RULE, width: 0.5 }
    });
    s.addText(r[0], {
      x: M + 0.2, y, w: 2.2, h: 0.42,
      fontFace: HEAD, fontSize: 12.5, bold: true, color: NAVY, valign: "middle", margin: 0
    });
    s.addText(r[1], {
      x: M + 2.5, y, w: 5.2, h: 0.42,
      fontFace: BODY, fontSize: 11.5, color: GREY, valign: "middle", margin: 0
    });
    s.addText(r[2], {
      x: M + 7.85, y, w: 4.0, h: 0.42,
      fontFace: BODY, fontSize: 11.5, color: BLUE, valign: "middle", margin: 0
    });
  });
  s.addText("The free one that matters most: response time. A lead that waits four hours is gone.", {
    x: M, y: 6.42, w: W, h: 0.45, fontFace: BODY, fontSize: 14, bold: true, color: NAVY, margin: 0
  });
  s.addNotes("Ten channels, each with a job. If asked what we would cut first at a lower budget: cold paid reach goes, organic stays. The response time line at the bottom costs nothing and protects everything.");
}


// ---------- BUDGET: TIERS ----------
{
  const s = lightSlide();
  sectionTitle(s, "11", "Budget");
  kicker(s, "Three levels. Start low, move up only when the numbers justify it.");

  const tiers = [
    ["Level 1", "Foundation", "₹1.2L", [["Media spend","₹40,000"],["Tools & CRM","₹15,000"],["Production X","₹65,000"]],
     "Website live, podcast running, articles publishing. Paid limited to project-name search.", false],
    ["Level 2  ·  Recommended", "Build", "₹2.5L", [["Media spend","₹1,00,000"],["Tools & CRM","₹20,000"],["Production X","₹1,30,000"]],
     "Full content calendar, two shoot days a month, search and retargeting live, portals active.", true],
    ["Level 3  ·  Month 7+", "Scale", "₹5L", [["Media spend","₹2,60,000"],["Tools & CRM","₹30,000"],["Production X","₹2,10,000"]],
     "Only once cost per booking is known and working. Adds Meta reach, YouTube ads and PR.", false]
  ];

  tiers.forEach((t, i) => {
    const x = M + i * 4.0;
    const on = t[5];
    s.addShape(pres.ShapeType.rect, {
      x, y: 1.72, w: 3.7, h: 4.3,
      fill: { color: on ? NAVY : CARD },
      line: { color: on ? NAVY : RULE, width: on ? 1.5 : 0.5 },
      shadow: shadow()
    });
    s.addText(t[0].toUpperCase(), {
      x: x + 0.26, y: 1.95, w: 3.18, h: 0.3,
      fontFace: BODY, fontSize: 9, bold: true, color: on ? GOLD_BR : GREY_LT, charSpacing: 1.2, margin: 0
    });
    s.addText(t[1], {
      x: x + 0.26, y: 2.28, w: 3.18, h: 0.42,
      fontFace: HEAD, fontSize: 19, bold: true, color: on ? WHITE : NAVY, margin: 0
    });
    s.addText(t[2], {
      x: x + 0.26, y: 2.72, w: 3.18, h: 0.72,
      fontFace: HEAD, fontSize: 38, bold: true, color: on ? WHITE : NAVY, margin: 0
    });
    s.addText("PER MONTH", {
      x: x + 0.26, y: 3.44, w: 3.18, h: 0.26,
      fontFace: BODY, fontSize: 9, color: on ? "9AA3AD" : GREY_LT, charSpacing: 1.2, margin: 0
    });
    t[3].forEach((ln, j) => {
      const ly = 3.85 + j * 0.36;
      s.addText(ln[0], {
        x: x + 0.26, y: ly, w: 1.95, h: 0.32,
        fontFace: BODY, fontSize: 12, color: on ? "C9CDD3" : GREY, valign: "middle", margin: 0
      });
      s.addText(ln[1], {
        x: x + 2.2, y: ly, w: 1.24, h: 0.32,
        fontFace: BODY, fontSize: 12, bold: true, color: on ? WHITE : NAVY,
        align: "right", valign: "middle", margin: 0
      });
    });
    s.addText(t[4], {
      x: x + 0.26, y: 5.05, w: 3.18, h: 0.85,
      fontFace: BODY, fontSize: 11, color: on ? "9AA3AD" : GREY_LT, lineSpacing: 15, margin: 0
    });
  });

  s.addText(
    "Media is the part that scales. Production and management stay roughly flat, because the content engine " +
    "runs on the same two shoot days whatever the ad budget is.",
    { x: M, y: 6.2, w: W, h: 0.7, fontFace: BODY, fontSize: 14, color: NAVY, lineSpacing: 21, margin: 0 }
  );
  s.addNotes("Lead with Level 2 as the recommendation but make clear Level 1 is a real option, not a token. Say plainly: Level 3 is gated - we do not scale spend until we know what a booking actually costs. That restraint is what makes the whole budget credible.");
}

// ---------- BUDGET: SETUP ----------
{
  const s = lightSlide();
  sectionTitle(s, "11", "What it costs to start");

  const rows = [
    ["Website and comparison engine v1", "9 project pages, comparison tool, real-rate calculator, guides, visit booking, CRM connected", "₹2–3L"],
    ["Podcast setup", "We already own the cameras. This is set dressing and sound only.", "₹30–50k"],
    ["Brand kit", "Logo application, templates, partner collateral, ad templates with RERA number built in", "₹40–60k"]
  ];
  rows.forEach((r, i) => {
    const y = 1.62 + i * 0.92;
    s.addShape(pres.ShapeType.rect, {
      x: M, y, w: W, h: 0.82, fill: { color: CARD }, line: { color: RULE, width: 0.5 }
    });
    s.addText(r[0], {
      x: M + 0.28, y, w: 3.9, h: 0.82,
      fontFace: HEAD, fontSize: 14, bold: true, color: NAVY, valign: "middle", margin: 0
    });
    s.addText(r[1], {
      x: M + 4.35, y, w: 5.9, h: 0.82,
      fontFace: BODY, fontSize: 12, color: GREY, valign: "middle", lineSpacing: 17, margin: 0
    });
    s.addText(r[2], {
      x: M + W - 1.85, y, w: 1.6, h: 0.82,
      fontFace: HEAD, fontSize: 16, bold: true, color: NAVY,
      align: "right", valign: "middle", margin: 0
    });
  });

  s.addShape(pres.ShapeType.rect, {
    x: M, y: 4.4, w: W, h: 0.82, fill: { color: NAVY }, line: { color: NAVY, width: 0.5 }
  });
  s.addText("Total setup, before launch", {
    x: M + 0.28, y: 4.4, w: 6.0, h: 0.82,
    fontFace: HEAD, fontSize: 15, bold: true, color: WHITE, valign: "middle", margin: 0
  });
  s.addText("₹2.7–4.1L", {
    x: M + W - 2.4, y: 4.4, w: 2.15, h: 0.82,
    fontFace: HEAD, fontSize: 22, bold: true, color: GOLD_BR,
    align: "right", valign: "middle", margin: 0
  });

  s.addText("Built once, reused on every project after Neopolis. Only the shoots repeat.", {
    x: M, y: 5.42, w: W, h: 0.4, fontFace: BODY, fontSize: 14.5, bold: true, color: NAVY, margin: 0
  });
  s.addText(
    "One honest caveat: version one of the comparison engine is hand-built data for 10–15 projects. " +
    "Automating it — pulling RERA and registration records directly — is a Layer 2 engineering cost we will " +
    "scope properly once we know the data is worth automating.",
    { x: M, y: 5.85, w: W, h: 0.85, fontFace: BODY, fontSize: 13, italic: true, color: GREY, lineSpacing: 19, margin: 0 }
  );
  s.addNotes("The caveat at the bottom is deliberate. Do not let them think the full automated platform is included for three lakh. Version one is manual data on a small set of projects, which is the right way to test whether anyone values it before building a pipeline.");
}

// ---------- KPIs ----------
{
  const s = lightSlide();
  sectionTitle(s, "12", "What we measure");
  kicker(s, "Reported from the first week of spend. These are counted, not estimated.");

  const rows = [
    ["Brand search visibility", "Whether OTHO appears when someone looks for it", "Monthly", GOLD],
    ["Podcast views and watch time", "Whether the authority play is landing", "Monthly", GOLD],
    ["Enquiries by source", "Which channels produce — free and paid counted separately", "Weekly", BLUE],
    ["Cost per enquiry", "Whether paid media is getting cheaper or dearer", "Weekly", BLUE],
    ["Response time", "How long a buyer waits before a human replies", "Weekly", BLUE],
    ["Site visits booked vs held", "Whether we bring serious people or curious ones", "Weekly", BLUE],
    ["Bookings by source", "The number that finally matters", "Monthly", GREEN],
    ["Cost per booking", "What it costs to sell one home through marketing", "Monthly", GREEN]
  ];
  rows.forEach((r, i) => {
    const y = 1.72 + i * 0.53;
    s.addShape(pres.ShapeType.rect, {
      x: M, y, w: W, h: 0.47, fill: { color: CARD }, line: { color: RULE, width: 0.5 }
    });
    s.addShape(pres.ShapeType.ellipse, { x: M + 0.24, y: y + 0.155, w: 0.16, h: 0.16, fill: { color: r[3] } });
    s.addText(r[0], {
      x: M + 0.58, y, w: 3.6, h: 0.47,
      fontFace: HEAD, fontSize: 13, bold: true, color: NAVY, valign: "middle", margin: 0
    });
    s.addText(r[1], {
      x: M + 4.35, y, w: 6.2, h: 0.47,
      fontFace: BODY, fontSize: 12, color: GREY, valign: "middle", margin: 0
    });
    s.addText(r[2], {
      x: M + W - 1.5, y, w: 1.25, h: 0.47,
      fontFace: BODY, fontSize: 11, bold: true, color: GREY_LT,
      align: "right", valign: "middle", margin: 0
    });
  });

  s.addText(
    "How this helps: these decide the budget. If cost per enquiry falls and site visits convert, we move up a level. " +
    "If they don't, we stop and fix the funnel before spending more.",
    { x: M, y: 6.1, w: W, h: 0.7, fontFace: BODY, fontSize: 14, color: NAVY, lineSpacing: 21, margin: 0 }
  );
  s.addNotes("Answer the question they are really asking - how do I know this is working. These KPIs are a decision function, not a report card. Response time is the one to watch weekly because it is free to fix and it protects everything spent upstream.");
}

// ---------- BREAK-EVEN ----------
{
  const s = lightSlide();
  sectionTitle(s, "12", "What it takes to break even");
  kicker(s, "At this budget the useful question isn't return multiples — it's how little has to happen before this pays for itself.");

  const cw2 = 2.55, c0 = W - cw2 * 2 - 2.1;
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

  rows.forEach((r, i) => {
    const y = 1.95 + i * 0.5;
    const hd = r[4] === "hd", tot = r[4] === "t", asm = r[4] === "a";
    const bg = hd ? NAVY : (tot ? "E9EAE7" : CARD);
    const fg = hd ? WHITE : NAVY;

    s.addShape(pres.ShapeType.rect, { x: M, y, w: c0, h: 0.5, fill: { color: bg }, line: { color: RULE, width: 0.5 } });
    s.addText(r[0], {
      x: M + 0.22, y, w: c0 - 0.4, h: 0.5,
      fontFace: BODY, fontSize: 12.5, bold: hd || tot, color: fg, valign: "middle", margin: 0
    });

    [r[1], r[2]].forEach((v, j) => {
      const x = M + c0 + j * cw2;
      s.addShape(pres.ShapeType.rect, { x, y, w: cw2, h: 0.5, fill: { color: bg }, line: { color: RULE, width: 0.5 } });
      s.addText(v, {
        x, y, w: cw2, h: 0.5,
        fontFace: hd ? BODY : HEAD, fontSize: hd ? 12 : 13.5, bold: true,
        color: tot ? GREEN : fg, align: "center", valign: "middle", margin: 0
      });
    });

    const x3 = M + c0 + cw2 * 2;
    s.addShape(pres.ShapeType.rect, { x: x3, y, w: 2.1, h: 0.5, fill: { color: bg }, line: { color: RULE, width: 0.5 } });
    s.addText(r[3], {
      x: x3 + 0.14, y, w: 1.82, h: 0.5,
      fontFace: BODY, fontSize: asm ? 9.5 : 10.5, bold: asm,
      color: asm ? GOLD : (hd ? WHITE : GREY_LT),
      charSpacing: asm ? 0.6 : 0, valign: "middle", margin: 0
    });
  });

  s.addText(
    "The two amber rows are ours. Give us your real unit value and commission and this table updates in front of you — " +
    "it's the only part of the plan we're guessing at. Note too that commission pays on registration, so cash lands three to six months behind the spend.",
    { x: M, y: 6.0, w: W, h: 0.85, fontFace: BODY, fontSize: 13, italic: true, color: GREY, lineSpacing: 19, margin: 0 }
  );
  s.addNotes("Volunteer the amber rows before anyone challenges them. Then land the point: Foundation pays for itself at one booking every four months. That is a much easier yes than a forecast they would want to argue with. If they give you the real numbers in the room, redo the arithmetic live.");
}

// ---------- 22 90 DAYS SECTION ----------
{
  const s = darkSlide();
  s.addText("13", {
    x: M, y: 2.2, w: 1.0, h: 0.6, fontFace: HEAD, fontSize: 20, bold: true, color: GOLD_BR, margin: 0
  });
  s.addText("The first 90 days", {
    x: M, y: 2.8, w: 10.5, h: 1.2,
    fontFace: HEAD, fontSize: 52, bold: true, color: WHITE, margin: 0
  });
  s.addText("One project — Neopolis — used to build and prove the whole system.", {
    x: M, y: 4.2, w: 9.5, h: 0.6, fontFace: BODY, fontSize: 18, color: "C9CDD3", margin: 0
  });
  s.addNotes("Transition slide. Everything before this was strategy; everything after is execution with dates.");
}

// ---------- 23-25 THE THREE MONTHS ----------
const months = [
  ["Days 1–30", "Foundation", "Identity, plumbing, first content", [
    "OTHO brand applied properly — logo, templates, tone; the Propertunity change completed everywhere",
    "Domain, hosting, analytics, CRM with routing and a response clock",
    "Google Business, Instagram, LinkedIn, YouTube claimed and set up",
    "Website design signed off; comparison engine specified",
    "Sit with sales: what buyers ask, where they walk away",
    "First studio day — two podcast episodes, founder pieces to camera"
  ], "OTHO exists online, CRM works, two episodes in hand",
   "Month one is unglamorous on purpose. Spending before tracking works is how developer marketing budgets disappear without evidence."],

  ["Days 31–60", "Launch", "Website live, publishing starts", [
    "Website live — Neopolis project page, comparison engine, real rate calculator, guides, visit booking",
    "Podcast launches, fortnightly from here",
    "First project review film and first comparison film published",
    "Guides and locality pages start publishing weekly",
    "Google Search on project terms; portal listings up",
    "Site shoot — walkthrough, drone, progress, location drive"
  ], "Platform live, first tracked enquiries, search indexing",
   "This is the month they see something real. The website and the first films are the visible proof that the plan is moving."],

  ["Days 61–90", "Prove", "Widen, measure, decide", [
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
  const s = lightSlide();
  sectionTitle(s, "13", mo[0] + "  ·  " + mo[1]);

  s.addText(mo[2], {
    x: M, y: 1.25, w: W, h: 0.45, fontFace: HEAD, fontSize: 20, bold: true, color: NAVY, margin: 0
  });

  mo[3].forEach((t, i) => {
    const y = 1.95 + i * 0.66;
    s.addShape(pres.ShapeType.ellipse, {
      x: M + 0.05, y: y + 0.14, w: 0.2, h: 0.2, fill: { color: GOLD }
    });
    s.addText(t, {
      x: M + 0.45, y, w: W - 0.9, h: 0.58,
      fontFace: BODY, fontSize: 14, color: GREY, valign: "middle", lineSpacing: 19, margin: 0
    });
  });

  s.addShape(pres.ShapeType.rect, {
    x: M, y: 6.0, w: W, h: 0.72, fill: { color: NAVY }, line: { color: NAVY, width: 0.5 }
  });
  s.addText("END OF MONTH " + (idx + 1), {
    x: M + 0.28, y: 6.0, w: 2.4, h: 0.72,
    fontFace: BODY, fontSize: 10, bold: true, color: GOLD_BR, charSpacing: 1.5, valign: "middle", margin: 0
  });
  s.addText(mo[4], {
    x: M + 2.9, y: 6.0, w: W - 3.2, h: 0.72,
    fontFace: HEAD, fontSize: 15, bold: true, color: WHITE, valign: "middle", margin: 0
  });
  s.addNotes(mo[5]);
});

// ---------- 26 AFTER 90 DAYS ----------
{
  const s = lightSlide();
  sectionTitle(s, "14", "After the first 90 days");

  const rows = [
    ["Months 4–6", "Review library grows to 10–12 Hyderabad projects. Resident reviews open. Search and AI start delivering enquiries at no media cost. Referral programme live.", "First enquiries arriving free"],
    ["Months 7–9", "Price estimates built from registration data. Second and third mandates onboarded using the Neopolis template. Paid media scales only if cost per booking justifies it.", "Three projects on one system"],
    ["Months 10–12", "Every meaningful Kokapet and west Hyderabad project covered. Market note quoted by press. Services layer begins — loan and legal partners.", "Default place to check in west Hyderabad"]
  ];
  rows.forEach((r, i) => {
    const y = 1.75 + i * 1.55;
    s.addShape(pres.ShapeType.rect, {
      x: M, y, w: W, h: 1.35, fill: { color: CARD }, line: { color: RULE, width: 0.5 }, shadow: shadow()
    });
    s.addText(r[0], {
      x: M + 0.3, y: y + 0.2, w: 1.9, h: 0.5,
      fontFace: HEAD, fontSize: 17, bold: true, color: GOLD, margin: 0
    });
    s.addText(r[1], {
      x: M + 2.4, y: y + 0.22, w: 5.9, h: 0.95,
      fontFace: BODY, fontSize: 12.5, color: GREY, lineSpacing: 18, margin: 0
    });
    s.addText(r[2], {
      x: M + 8.5, y: y + 0.22, w: 3.3, h: 0.95,
      fontFace: HEAD, fontSize: 13.5, bold: true, color: NAVY, valign: "middle", margin: 0
    });
  });
  s.addNotes("Months four to twelve. The key transition is that enquiries start arriving free from search and AI - that is when the economics change and paid media becomes optional rather than essential.");
}

// ---------- 27 TEN YEARS ----------
{
  const s = lightSlide();
  sectionTitle(s, "15", "Where this goes");

  const hz = [
    ["Year 1", "Hyderabad west", "Own one micro-market completely", "Kokapet, Financial District, Narsingi, Tellapur. Every project reviewed and honestly rated. The goal is not scale — it's proof the model converts better than portal leads."],
    ["Year 2", "Hyderabad", "The whole city, plus transactions", "Full city coverage. Exclusive mandates as the core revenue line. Services layer live. The name buyers check before visiting anything."],
    ["Years 3–4", "South India", "Bangalore, Chennai, Pune", "The content and review system is city-agnostic — only the data changes. Each city launches on the template Neopolis produced."],
    ["Years 5–7", "India", "National platform, data business", "Top ten cities. The high-margin line arrives — developers, banks and funds paying for OTHO's demand data."],
    ["Years 8–10", "Global", "NRI corridors first", "The first step abroad isn't a new market — it's this market from the other side. Gulf, Singapore, US and UK buyers who need honest remote due diligence."]
  ];
  hz.forEach((h, i) => {
    const y = 1.5 + i * 1.02;
    s.addShape(pres.ShapeType.rect, {
      x: M, y, w: W, h: 0.92, fill: { color: CARD }, line: { color: RULE, width: 0.5 }
    });
    s.addText(h[0], {
      x: M + 0.26, y: y + 0.1, w: 1.5, h: 0.4,
      fontFace: HEAD, fontSize: 17, bold: true, color: GOLD, margin: 0
    });
    s.addText(h[1], {
      x: M + 0.26, y: y + 0.5, w: 1.6, h: 0.32,
      fontFace: BODY, fontSize: 10, color: GREY_LT, charSpacing: 0.8, margin: 0
    });
    s.addText(h[2], {
      x: M + 2.1, y: y + 0.1, w: 3.5, h: 0.72,
      fontFace: HEAD, fontSize: 14, bold: true, color: NAVY, valign: "middle", margin: 0
    });
    s.addText(h[3], {
      x: M + 5.8, y: y + 0.1, w: 6.0, h: 0.72,
      fontFace: BODY, fontSize: 11.5, color: GREY, lineSpacing: 16, valign: "middle", margin: 0
    });
  });
  s.addText("Ten years is four cities and one honest habit, repeated.", {
    x: M, y: 6.7, w: W, h: 0.45, fontFace: HEAD, fontSize: 17, bold: true, italic: true, color: NAVY, margin: 0
  });
  s.addNotes("The NRI line is worth pausing on. The natural first step abroad is not a new market, it is this market from the other side - buyers who cannot inspect anything themselves and need an honest proxy more than anyone.");
}

// ---------- 28 WHAT WE NEED ----------
{
  const s = lightSlide();
  sectionTitle(s, "16", "What we need from you");

  const rows = [
    ["One person who can approve", "Approval by committee misses launch windows.", "Day 1"],
    ["Founders on camera, twice a month", "Half a day. The reviews and podcast are the whole plan, and only you can front them.", "From week 3"],
    ["Two guest introductions a month", "Your relationships are what make the podcast unmatchable.", "Ongoing"],
    ["Willingness to publish negatives", "The honest reviews are the moat. Soften them to protect a relationship and the strategy collapses into another portal.", "Agree now"],
    ["Your real numbers", "Average unit value and commission, so the model stops being our guesswork.", "Week 2"],
    ["Weekly time with sales", "Marketing that doesn't hear objections keeps producing leads sales can't close.", "Ongoing"]
  ];
  rows.forEach((r, i) => {
    const y = 1.6 + i * 0.78;
    s.addShape(pres.ShapeType.rect, {
      x: M, y, w: W, h: 0.68, fill: { color: CARD }, line: { color: RULE, width: 0.5 }
    });
    s.addText(r[0], {
      x: M + 0.26, y, w: 3.7, h: 0.68,
      fontFace: HEAD, fontSize: 13.5, bold: true, color: NAVY, valign: "middle", margin: 0
    });
    s.addText(r[1], {
      x: M + 4.1, y, w: 6.4, h: 0.68,
      fontFace: BODY, fontSize: 12, color: GREY, valign: "middle", lineSpacing: 16, margin: 0
    });
    s.addText(r[2], {
      x: M + W - 1.85, y, w: 1.6, h: 0.68,
      fontFace: BODY, fontSize: 11.5, bold: true, color: GOLD,
      align: "right", valign: "middle", margin: 0
    });
  });
  s.addText(
    "The hardest one is publishing honest negatives on projects run by developers you've known twenty years. " +
    "It's also the only reason a buyer would believe anything else on the platform.",
    { x: M, y: 6.3, w: W, h: 0.7, fontFace: BODY, fontSize: 13.5, italic: true, color: NAVY, lineSpacing: 20, margin: 0 }
  );
  s.addNotes("Raise the honest negatives point yourself rather than letting it surface in month three. If they will not commit to it, the moat disappears and this becomes another portal. Better to know in the room.");
}

// ---------- 29 CLOSING ----------
{
  const s = darkSlide();
  s.addText("Ninety days to exist.\nA year to be trusted.\nTen to be everywhere.", {
    x: M, y: 2.0, w: 11.0, h: 3.0,
    fontFace: HEAD, fontSize: 46, bold: true, color: WHITE, lineSpacing: 62, margin: 0
  });
  s.addText("PRODUCTION X", {
    x: M, y: 6.05, w: 5, h: 0.35,
    fontFace: BODY, fontSize: 12, bold: true, color: GOLD_BR, charSpacing: 3, margin: 0
  });
  s.addText("Strategy & launch plan for OTHO Realty  ·  August 2026", {
    x: M, y: 6.42, w: W, h: 0.3, fontFace: BODY, fontSize: 11, color: GREY, margin: 0
  });
  s.addNotes("Close here and stop. Do not add a summary slide - this line is the summary. Then hand over to questions.");
}

pres.writeFile({ fileName: "/home/user/OTHO-REALTY/deck/Building_OTHO_ProductionX.pptx" })
  .then(f => console.log("written:", f));
