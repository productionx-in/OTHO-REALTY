/* OTHO prototype — Production X. Vanilla JS, no dependencies. */
(function () {
"use strict";
var D = window.OTHO_DATA, P = D.P, L = D.L, BLOG = D.BLOG, G = D.GUIDES, EP = D.EP, SCORE = D.SCORE, AMEN = D.AMEN;

var inr = function (n) { return '₹' + Math.round(n).toLocaleString('en-IN'); };
var cr  = function (n) { return '₹' + (n / 1e7).toFixed(2) + ' Cr'; };
var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
var ls = {
  get: function (k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } },
  set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};

/* ---------- state ---------- */
var user   = ls.get('otho_user', null);
var saved  = ls.get('otho_saved', []);
var leads  = ls.get('otho_leads', []);
var subs   = ls.get('otho_subs', []);
var pending = null;   /* action to resume after verification */
var otpCode = null;

function isSaved(id) { return saved.indexOf(id) > -1; }
function toggleSave(id) { var i = saved.indexOf(id); if (i > -1) saved.splice(i, 1); else saved.push(id); ls.set('otho_saved', saved); updateSl(); }
function updateSl() { var a = document.getElementById('slLink'); if (a) a.textContent = 'Shortlist' + (saved.length ? ' (' + saved.length + ')' : ''); }

/* ---------- metrics ---------- */
function m(p) {
  var load = (p.sba - p.carpet) / p.sba * 100;
  return { load: load, real: (p.sba * p.rate) / p.carpet, total: p.sba * p.rate };
}
function scoreCls(s) { return s >= 7.5 ? 's-hi' : (s >= 6.5 ? 's-mid' : 's-lo'); }
function leadScore(l) {
  var t = { 'Within 3 months': 3, 'In 3–6 months': 2, 'In 6–12 months': 1, 'Just researching': 0 }[l.timeline] || 0;
  var b = l.budget >= 30000000 ? 2 : (l.budget >= 15000000 ? 1 : 0);
  var n = t + b;
  return n >= 4 ? ['HOT', 'lb-hot'] : (n >= 2 ? ['WARM', 'lb-warm'] : ['COLD', 'lb-cold']);
}

/* ---------- assets ---------- */
function svgSkyline() {
  var g = '', x, y;
  for (x = 0; x <= 1080; x += 40) g += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="260"/>';
  for (y = 0; y <= 260; y += 40) g += '<line x1="0" y1="' + y + '" x2="1080" y2="' + y + '"/>';
  var win = '', cols = [[70,165],[155,120],[225,75],[318,145],[396,45],[502,110],[586,160],[656,85],[756,135],[834,67],[926,175]];
  cols.forEach(function (c) { for (var r = 0; r < 5; r++) for (var q = 0; q < 3; q++) win += '<rect x="' + (c[0] + q * 16) + '" y="' + (c[1] + r * 22) + '" width="8" height="11"/>'; });
  return '<svg viewBox="0 0 1080 260" role="img" aria-label="City skyline illustration" style="display:block;width:100%;height:auto">'
    + '<rect width="1080" height="260" fill="var(--sunk)"/><g fill="none" stroke="var(--line)" stroke-width="1">' + g + '</g>'
    + '<g fill="var(--card)" stroke="var(--ink-3)" stroke-width="1.5">'
    + '<rect x="60" y="150" width="70" height="110"/><rect x="145" y="105" width="58" height="155"/><rect x="215" y="60" width="80" height="200"/>'
    + '<rect x="308" y="130" width="64" height="130"/><rect x="386" y="30" width="92" height="230"/><rect x="492" y="95" width="70" height="165"/>'
    + '<rect x="576" y="145" width="56" height="115"/><rect x="646" y="70" width="86" height="190"/><rect x="746" y="120" width="64" height="140"/>'
    + '<rect x="824" y="52" width="78" height="208"/><rect x="916" y="160" width="64" height="100"/></g>'
    + '<g fill="var(--brass)" opacity=".55">' + win + '</g>'
    + '<rect x="0" y="252" width="1080" height="8" fill="var(--ink)" opacity=".18"/></svg>';
}
function svgPlan(u) {
  var rooms = [[30,30,210,200,'Living / Dining',''],[30,230,210,140,'Master bedroom','4.2 × 3.6 m'],
    [240,30,180,110,'Kitchen','3.0 × 2.6 m'],[240,140,180,80,'Foyer',''],[240,220,180,150,'Bedroom 2','3.6 × 3.2 m'],
    [420,30,150,110,'Balcony',''],[420,140,150,90,'Bath',''],[420,230,150,140,'Bedroom 3','3.4 × 3.2 m']];
  var s = '<svg viewBox="0 0 600 420" role="img" aria-label="Indicative floor plan" style="display:block;width:100%;height:auto">'
    + '<rect width="600" height="420" fill="var(--card)"/><rect x="30" y="30" width="540" height="340" fill="none" stroke="var(--ink)" stroke-width="5"/>';
  rooms.forEach(function (r) {
    s += '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" fill="none" stroke="var(--ink-3)" stroke-width="2"/>'
      + '<text x="' + (r[0] + 10) + '" y="' + (r[1] + 21) + '" font-family="sans-serif" font-size="12" fill="var(--ink)">' + esc(r[4]) + '</text>';
    if (r[5]) s += '<text x="' + (r[0] + 10) + '" y="' + (r[1] + 37) + '" font-family="monospace" font-size="10" fill="var(--ink-3)">' + esc(r[5]) + '</text>';
  });
  s += '<g stroke="var(--card)" stroke-width="6"><line x1="240" y1="175" x2="240" y2="205"/><line x1="300" y1="220" x2="330" y2="220"/>'
    + '<line x1="420" y1="175" x2="420" y2="200"/><line x1="120" y1="230" x2="150" y2="230"/></g>'
    + '<text x="30" y="398" font-family="monospace" font-size="10" fill="var(--ink-3)">CARPET ' + u.carpet.toLocaleString('en-IN')
    + ' SQ FT · SUPER BUILT-UP ' + u.sba.toLocaleString('en-IN') + ' SQ FT · INDICATIVE, NOT TO SCALE</text>'
    + '<g stroke="var(--ink-3)" stroke-width="1"><line x1="470" y1="392" x2="570" y2="392"/><line x1="470" y1="388" x2="470" y2="396"/><line x1="570" y1="388" x2="570" y2="396"/></g>'
    + '<text x="497" y="384" font-family="monospace" font-size="9" fill="var(--ink-3)">5 metres</text></svg>';
  return s;
}
function svgMap(l) {
  var g = '', x, y;
  for (x = 0; x <= 1080; x += 52) g += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="380"/>';
  for (y = 0; y <= 380; y += 52) g += '<line x1="0" y1="' + y + '" x2="1080" y2="' + y + '"/>';
  return '<svg viewBox="0 0 1080 380" role="img" aria-label="Schematic map" style="display:block;width:100%;height:auto">'
    + '<rect width="1080" height="380" fill="var(--sunk)"/><g stroke="var(--line)" stroke-width="1">' + g + '</g>'
    + '<path d="M0,250 C220,215 400,300 640,255 S920,180 1080,215" fill="none" stroke="var(--ink-3)" stroke-width="14" stroke-linecap="round" opacity=".35"/>'
    + '<path d="M0,250 C220,215 400,300 640,255 S920,180 1080,215" fill="none" stroke="var(--paper)" stroke-width="2" stroke-dasharray="12 10"/>'
    + '<text x="34" y="238" font-family="monospace" font-size="11" fill="var(--ink-3)">OUTER RING ROAD</text>'
    + '<path d="M300,380 L340,140 L560,60" fill="none" stroke="var(--ink-3)" stroke-width="8" opacity=".3"/>'
    + '<path d="M720,380 L700,180 L1080,120" fill="none" stroke="var(--ink-3)" stroke-width="8" opacity=".3"/>'
    + '<circle cx="520" cy="170" r="15" fill="var(--brass)"/><circle cx="520" cy="170" r="26" fill="none" stroke="var(--brass)" stroke-width="2" opacity=".5"/>'
    + '<text x="520" y="212" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="600" fill="var(--ink)">' + esc(l.n) + '</text>'
    + '<g font-family="sans-serif" font-size="12" fill="var(--ink-2)">'
    + '<circle cx="205" cy="105" r="6" fill="var(--ink-3)"/><text x="220" y="110">Financial District</text>'
    + '<circle cx="855" cy="95" r="6" fill="var(--ink-3)"/><text x="870" y="100">HITEC City</text>'
    + '<circle cx="780" cy="310" r="6" fill="var(--ink-3)"/><text x="795" y="315">Airport road</text>'
    + '<circle cx="235" cy="315" r="6" fill="var(--ink-3)"/><text x="250" y="320">Reservoir</text></g>'
    + '<text x="34" y="356" font-family="monospace" font-size="10" fill="var(--ink-3)">SCHEMATIC — NOT A SURVEY MAP</text></svg>';
}
function frame(label, desc, h) {
  return '<div class="frame" style="min-height:' + (h || 180) + 'px">'
    + '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="1.4" aria-hidden="true" style="opacity:.5">'
    + '<rect x="2.5" y="4.5" width="19" height="15"/><circle cx="12" cy="12" r="3.6"/><path d="M7.5 4.5l1.6-2h5.8l1.6 2"/></svg>'
    + '<b>' + esc(label) + '</b><span>' + esc(desc) + '</span></div>';
}
function monogram(name, size) {
  var w = name.replace(/[^A-Za-z0-9 ]/g, '').split(' ').filter(Boolean);
  var ch = (w[0] ? w[0][0] : 'O') + (w[1] ? w[1][0] : (w[0] && w[0][1] ? w[0][1] : ''));
  var s = size || 46;
  return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 46 46" aria-hidden="true" style="flex:0 0 auto">'
    + '<rect width="46" height="46" fill="var(--ink)"/><text x="23" y="30" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="var(--brass)">'
    + esc(ch.toUpperCase()) + '</text></svg>';
}

/* ---------- gate ---------- */
function gated(action, label) { return 'data-gate="' + esc(action) + '" data-glabel="' + esc(label || '') + '"'; }
function requireUser(action, label) {
  if (user && user.verified) { runAction(action, label); return; }
  pending = { action: action, label: label };
  openModal(1);
}
function runAction(action, label) {
  var parts = action.split(':');
  if (parts[0] === 'visit')  { location.hash = '#/visit'; toast('Verified — pick a slot below.'); }
  else if (parts[0] === 'plan')  toast('Prototype — a live build emails the floor plan PDF to ' + (user ? user.email : 'you') + '.');
  else if (parts[0] === 'price') { render(); toast('Unit pricing unlocked.'); }
  else if (parts[0] === 'save')  { toggleSave(+parts[1]); render(); }
  else if (parts[0] === 'brochure') toast('Prototype — a live build sends the brochure on WhatsApp.');
  else toast('Verified.');
}
function toast(msg) {
  var t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:26px;background:var(--ink);color:#fff;padding:12px 18px;font-size:14px;z-index:200;max-width:90vw;text-align:center';
  document.body.appendChild(t);
  setTimeout(function () { t.remove(); }, 3800);
}

function openModal(step) {
  var ov = document.getElementById('ov'), mo = document.getElementById('modal');
  ov.classList.add('on');
  if (step === 1) {
    mo.innerHTML = '<button class="x" id="mx" aria-label="Close">×</button>'
      + '<div class="steps"><i class="on"></i><i></i></div>'
      + '<h3 id="ovT">One step, then it\'s yours</h3>'
      + '<p style="color:var(--ink-2);font-size:14px;margin:0 0 16px">'
      + esc(pending && pending.label ? pending.label : 'Verify once and everything on OTHO unlocks — floor plans, unit pricing, site visits.')
      + ' We verify by OTP so we know you are real. Your number is never shared with a developer or broker.</p>'
      + '<div class="fields" style="grid-template-columns:1fr 1fr">'
      + '<div><label for="uPhone">MOBILE NUMBER</label><input type="tel" id="uPhone" placeholder="10 digits" maxlength="10" inputmode="numeric"></div>'
      + '<div><label for="uEmail">EMAIL</label><input type="email" id="uEmail" placeholder="you@example.com"></div></div>'
      + '<div class="fields" style="grid-template-columns:1fr 1fr">'
      + '<div><label for="uProf">PROFESSION</label><select id="uProf">'
      + ['Salaried — IT / GCC','Salaried — other','Business owner','Doctor / healthcare','Government service','NRI','Investor','Other'].map(function (o) { return '<option>' + o + '</option>'; }).join('')
      + '</select></div>'
      + '<div><label for="uTime">PLANNING TO BUY</label><select id="uTime">'
      + ['Within 3 months','In 3–6 months','In 6–12 months','Just researching'].map(function (o) { return '<option>' + o + '</option>'; }).join('')
      + '</select></div></div>'
      + '<div><label for="uBud">BUDGET · <span id="uBudV">₹2.50 Cr</span></label>'
      + '<input type="range" id="uBud" min="5000000" max="60000000" step="500000" value="25000000"></div>'
      + '<div class="consent-row"><input type="checkbox" id="uConsent">'
      + '<label for="uConsent">I agree to be contacted by OTHO about my enquiry on phone, WhatsApp and email, between 09:00 and 21:00. I can withdraw at any time from consent preferences. My details will not be shared with any developer or broker.</label></div>'
      + '<p class="err" id="uErr"></p>'
      + '<button class="btn wide" id="uNext" style="margin-top:10px">Send OTP</button>'
      + '<p class="note" style="text-align:center">Prototype — no real SMS is sent.</p>';
    document.getElementById('uBud').addEventListener('input', function () {
      document.getElementById('uBudV').textContent = '₹' + (+this.value / 1e7).toFixed(2) + ' Cr';
    });
    document.getElementById('uNext').addEventListener('click', step1);
    document.getElementById('mx').addEventListener('click', closeModal);
  } else {
    mo.innerHTML = '<button class="x" id="mx" aria-label="Close">×</button>'
      + '<div class="steps"><i class="on"></i><i class="on"></i></div>'
      + '<h3 id="ovT">Enter the code</h3>'
      + '<p style="color:var(--ink-2);font-size:14px;margin:0 0 4px">Sent to +91 ' + esc(user.phone) + '.</p>'
      + '<div class="hint">DEMO MODE — your code is <strong>' + otpCode + '</strong>. A live build sends this by SMS.</div>'
      + '<div class="otpbox">' + [0,1,2,3,4,5].map(function (i) { return '<input type="text" maxlength="1" inputmode="numeric" data-otp="' + i + '" aria-label="Digit ' + (i+1) + '">'; }).join('') + '</div>'
      + '<p class="err" id="oErr"></p>'
      + '<button class="btn wide" id="oVerify">Verify and continue</button>'
      + '<button class="btn ghost wide" id="oBack" style="margin-top:8px">Change number</button>';
    var boxes = mo.querySelectorAll('[data-otp]');
    boxes[0].focus();
    Array.prototype.forEach.call(boxes, function (b, i) {
      b.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
        if (this.value && boxes[i + 1]) boxes[i + 1].focus();
      });
      b.addEventListener('keydown', function (e) { if (e.key === 'Backspace' && !this.value && boxes[i - 1]) boxes[i - 1].focus(); });
    });
    document.getElementById('oVerify').addEventListener('click', step2);
    document.getElementById('oBack').addEventListener('click', function () { openModal(1); });
    document.getElementById('mx').addEventListener('click', closeModal);
  }
}
function closeModal() { document.getElementById('ov').classList.remove('on'); }
function step1() {
  var ph = document.getElementById('uPhone').value.replace(/\D/g, ''),
      em = document.getElementById('uEmail').value.trim(),
      er = document.getElementById('uErr');
  if (ph.length !== 10) { er.textContent = 'Enter a valid 10-digit mobile number.'; return; }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { er.textContent = 'Enter a valid email address.'; return; }
  if (!document.getElementById('uConsent').checked) { er.textContent = 'Please tick consent — we cannot contact you without it.'; return; }
  user = {
    phone: ph, email: em,
    profession: document.getElementById('uProf').value,
    timeline: document.getElementById('uTime').value,
    budget: +document.getElementById('uBud').value,
    verified: false, at: new Date().toISOString()
  };
  otpCode = String(Math.floor(100000 + Math.random() * 900000));
  openModal(2);
}
function step2() {
  var boxes = document.querySelectorAll('[data-otp]'), code = '';
  Array.prototype.forEach.call(boxes, function (b) { code += b.value; });
  if (code !== otpCode) { document.getElementById('oErr').textContent = 'That code does not match. Try again.'; return; }
  user.verified = true;
  ls.set('otho_user', user);
  leads.push({
    phone: user.phone, email: user.email, profession: user.profession,
    timeline: user.timeline, budget: user.budget,
    source: (pending && pending.action) || 'direct',
    at: new Date().toISOString()
  });
  ls.set('otho_leads', leads);
  closeModal();
  var p = pending; pending = null;
  render();
  if (p) runAction(p.action, p.label); else toast('Verified. Everything is unlocked.');
}

/* ---------- shared blocks ---------- */
function pcard(p) {
  var x = m(p);
  return '<div class="card pad0"><a href="#/project/' + p.id + '" style="text-decoration:none;color:inherit;display:block">'
    + frame('PROJECT PHOTOGRAPHY', 'Exterior render or site photo', 145)
    + '<div class="card-body"><div class="pcard-top"><div><div class="meta">' + esc(p.loc.toUpperCase()) + ' · ' + esc(p.status.toUpperCase()) + '</div>'
    + '<h3>' + esc(p.n) + '</h3><div class="meta" style="margin:2px 0 0">' + esc(p.dev) + '</div></div>'
    + '<div class="score ' + scoreCls(p.score) + '">' + p.score.toFixed(1) + '</div></div>'
    + '<p>' + esc(p.sum) + '</p>'
    + '<div class="pmeta"><span>Real rate <b>' + inr(x.real) + '</b></span><span>Loading <b>' + x.load.toFixed(0) + '%</b></span><span>From <b>' + cr(x.total) + '</b></span></div>'
    + '<div class="tagrow">' + p.am.slice(0, 4).map(function (i) { return '<span class="tag">' + esc(AMEN[i]) + '</span>'; }).join('') + '</div>'
    + '</div></a><div class="card-body" style="border-top:1px solid var(--line);padding-top:11px">'
    + '<button class="save" ' + gated('save:' + p.id, 'Save this project to your shortlist.') + ' aria-pressed="' + (isSaved(p.id) ? 'true' : 'false') + '">'
    + (isSaved(p.id) ? '★ Saved' : '☆ Save') + '</button></div></div>';
}
function visitBand() {
  return '<div class="band"><h2>See it yourself</h2><p>Pick a slot. You get a WhatsApp confirmation from one named person at OTHO — not eight brokers.</p>'
    + '<div class="slots" id="slots">' + ['Sat 10:00','Sat 12:30','Sat 16:00','Sun 11:00','Sun 15:30'].map(function (s) {
      return '<button class="slot" aria-pressed="false">' + s + '</button>'; }).join('')
    + '</div><button class="btn brass" id="bookBtn">Confirm this slot</button><p id="bookMsg" style="margin-top:13px;min-height:1.4em"></p></div>';
}
function newsletter() {
  return '<div class="nl"><div><h3>The monthly Hyderabad market note</h3>'
    + '<p>Registrations, prices, launches and absorption — with sources, so you can check us. No sales pitch, unsubscribe in one click.</p></div>'
    + '<form id="nlForm"><input type="email" id="nlEmail" placeholder="you@example.com" aria-label="Email"><button class="btn brass" type="submit">Subscribe</button></form>'
    + '<p id="nlMsg" style="grid-column:1/-1;margin:0;font-size:13.5px;opacity:.85;min-height:1.2em"></p></div>';
}
function calcHTML(p) {
  return '<div class="calc"><div class="fields">'
    + '<div><label for="sba">SUPER BUILT-UP (SQ FT)</label><input type="number" id="sba" value="' + p.sba + '" min="100" step="10"></div>'
    + '<div><label for="carpet">RERA CARPET (SQ FT)</label><input type="number" id="carpet" value="' + p.carpet + '" min="100" step="10"></div>'
    + '<div><label for="rate">ADVERTISED RATE (₹/SQ FT)</label><input type="number" id="rate" value="' + p.rate + '" min="100" step="50"></div></div>'
    + '<div class="out"><div class="out-row"><span>Loading factor</span><span id="oLoad">—</span></div>'
    + '<div class="out-row"><span>Total price on super built-up</span><span id="oTotal">—</span></div>'
    + '<div class="out-row key"><span>Real rate on carpet</span><span id="oReal">—</span></div>'
    + '<div class="out-row"><span>You are paying for</span><span id="oWaste">—</span></div></div></div>';
}
function legalShell(title, lede, blocks) {
  return '<div class="wrap"><section><p class="eyebrow">LEGAL</p><h1>' + esc(title) + '</h1><p class="sub">' + esc(lede) + '</p><div class="prose">'
    + blocks.map(function (b) {
      if (b[0] === 'p') return '<p>' + esc(b[1]) + '</p>';
      if (b[0] === 'h') return '<h3>' + esc(b[1]) + '</h3>';
      if (b[0] === 'l') return '<ul>' + b[1].map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
      return ''; }).join('')
    + '</div><p class="note">Prototype text. A live site requires this reviewed and finalised by counsel before launch.</p></section></div>';
}
function proseBody(body) {
  return body.map(function (b) {
    if (b[0] === 'p') return '<p>' + esc(b[1]) + '</p>';
    if (b[0] === 'h') return '<h3>' + esc(b[1]) + '</h3>';
    if (b[0] === 'q') return '<div class="pullq">' + esc(b[1]) + '</div>';
    if (b[0] === 'l') return '<ul>' + b[1].map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
    return ''; }).join('');
}

/* ---------- views ---------- */
var V = {};

V.home = function () {
  var top = P.slice().sort(function (a, b) { return b.score - a.score; }).slice(0, 3);
  return '<div class="wrap">'
    + '<section style="padding-top:48px">'
    + '<p style="font-family:var(--f-h);font-size:clamp(1rem,2.2vw,1.26rem);color:var(--ink-3);margin:0 0 10px">Every property platform tells you what\'s for sale.</p>'
    + '<h1>OTHO tells you what\'s worth buying.</h1>'
    + '<p class="sub">Independent reviews of ' + P.length + ' Hyderabad projects, with the real price per usable foot, the things nobody puts in a brochure, and your phone number kept out of the market.</p>'
    + '<div class="cta-row" style="margin-bottom:24px"><a class="btn" href="#/search">Search by budget and amenities</a>'
    + '<a class="btn ghost" href="#/compare">Compare two</a><a class="btn ghost" href="#/methodology">How we score</a></div>'
    + svgSkyline() + '</section>'
    + '<section><div class="promise">'
    + '<div><b>Your number is never shared</b><span>One conversation, with us. Not resold to eight brokers the moment you enquire.</span></div>'
    + '<div><b>We publish the negatives</b><span>Every project page lists what is wrong with it, including projects we earn on.</span></div>'
    + '<div><b>Checked against RERA</b><span>Carpet areas and completion dates read from the filing, not the sales sheet.</span></div>'
    + '</div></section>'
    + '<section><h2>Highest rated right now</h2><p class="lede">Scored on land share, loading, delivery record, water, density and measured commute times. The full method is published.</p>'
    + '<div class="grid g3">' + top.map(pcard).join('') + '</div>'
    + '<p class="note"><a href="#/projects" style="color:var(--brass)">See all ' + P.length + ' reviewed projects →</a></p></section>'
    + '<section><h2>Latest from the blog</h2>'
    + '<div class="grid g3">' + BLOG.slice(0, 3).map(function (b) {
        return '<a class="card" href="#/blog/' + b.slug + '"><div class="meta">' + esc(b.cat.toUpperCase()) + ' · ' + esc(b.d) + ' · ' + esc(b.read) + '</div>'
        + '<h3>' + esc(b.t) + '</h3><p>' + esc(b.x) + '</p></a>'; }).join('') + '</div>'
    + '<p class="note"><a href="#/blog" style="color:var(--brass)">All articles →</a></p></section>'
    + '<section><h2>Where to buy, honestly assessed</h2><p class="lede">Each locality carries an infrastructure confidence label based on funding and construction status — not on what a sales office says is coming.</p>'
    + '<div class="grid g3">' + L.map(function (l) {
        return '<a class="card" href="#/locality/' + l.slug + '"><div class="meta">' + esc(l.price) + ' · ' + esc(l.trend) + '</div><h3>' + esc(l.n) + '</h3><p>' + esc(l.blurb) + '</p></a>'; }).join('') + '</div></section>'
    + '<section>' + newsletter() + '</section>'
    + '<section>' + visitBand() + '</section></div>';
};

V.search = function () {
  return '<div class="wrap"><section><p class="eyebrow">SEARCH</p><h1>Find it by what actually matters</h1>'
    + '<p class="lede">Filter on budget, configuration, locality, status and amenities. Sort on real rate per usable foot, not the advertised number.</p>'
    + '<div class="calc"><div class="fields">'
    + '<div><label for="qLoc">LOCALITY</label><select id="qLoc"><option value="">Any</option>' + L.map(function (l) { return '<option>' + esc(l.n) + '</option>'; }).join('') + '</select></div>'
    + '<div><label for="qBhk">CONFIGURATION</label><select id="qBhk"><option value="">Any</option><option value="2">2 BHK and up</option><option value="3">3 BHK and up</option><option value="4">4 BHK</option></select></div>'
    + '<div><label for="qStat">STATUS</label><select id="qStat"><option value="">Any</option><option>Ready to move</option><option>Under construction</option><option>Newly launched</option></select></div>'
    + '<div><label for="qSort">SORT BY</label><select id="qSort"><option value="score">OTHO score</option><option value="real">Real rate, lowest first</option><option value="load">Loading, lowest first</option><option value="price">Total price, lowest first</option></select></div></div>'
    + '<div style="margin-bottom:14px"><label for="qBud">MAXIMUM BUDGET · <span id="qBudV">₹6.00 Cr</span></label>'
    + '<input type="range" id="qBud" min="8000000" max="60000000" step="500000" value="60000000"></div>'
    + '<div><label>AMENITIES — MUST HAVE ALL SELECTED</label><div class="chips" id="qAm">'
    + AMEN.map(function (a, i) { return '<button class="chip" data-am="' + i + '" aria-pressed="false">' + esc(a) + '</button>'; }).join('') + '</div></div>'
    + '<button class="btn ghost sm" id="qClear">Clear all filters</button></div>'
    + '<p class="note" id="qCount" style="margin-bottom:16px"></p>'
    + '<div class="grid g2" id="qList"></div></section></div>';
};

V.projects = function () {
  return '<div class="wrap"><section><p class="eyebrow">REVIEWED PROJECTS</p><h1>All ' + P.length + ' projects we cover</h1>'
    + '<p class="lede">We review on site and against the RERA filing. A score below 7 does not mean do not buy — it means know what you are trading away.</p>'
    + '<div class="chips" id="locChips"><button class="chip" data-loc="" aria-pressed="true">All</button>'
    + L.map(function (l) { return '<button class="chip" data-loc="' + esc(l.n) + '" aria-pressed="false">' + esc(l.n) + '</button>'; }).join('') + '</div>'
    + '<div class="grid g2" id="plist">' + P.map(pcard).join('') + '</div></section></div>';
};

function projTabs(id, tab) {
  var t = [['','Overview'],['floorplans','Floor plans'],['pricing','Pricing'],['gallery','Gallery'],['progress','Progress'],['location','Location']];
  return '<div class="tabs">' + t.map(function (x) {
    return '<a href="#/project/' + id + (x[0] ? '/' + x[0] : '') + '" class="' + ((tab || '') === x[0] ? 'on' : '') + '">' + x[1] + '</a>'; }).join('') + '</div>';
}

V.project = function (id, tab) {
  var p = P[id]; if (!p) return V.notfound();
  var x = m(p);
  var head = '<div class="wrap"><section>'
    + '<p class="crumb"><a href="#/projects">Projects</a> / ' + esc(p.loc) + '</p>'
    + '<p class="eyebrow">' + esc(p.dev.toUpperCase()) + ' · ' + esc(p.status.toUpperCase()) + ' · TG-RERA P0XXXXXXX</p>'
    + '<h1>' + esc(p.n) + '</h1><p class="sub">' + esc(p.sum) + '</p>'
    + '<div class="cta-row" style="margin-bottom:18px">'
    + '<button class="btn" ' + gated('visit', 'Book a site visit at ' + p.n + '.') + '>Book a site visit</button>'
    + '<a class="btn ghost" href="#/compare?a=' + p.id + '">Compare this</a>'
    + '<button class="save" ' + gated('save:' + p.id, 'Save ' + p.n + ' to your shortlist.') + ' aria-pressed="' + (isSaved(p.id) ? 'true' : 'false') + '">'
    + (isSaved(p.id) ? '★ Saved' : '☆ Save') + '</button></div>'
    + '<div class="stats"><div class="stat"><b>' + p.carpet.toLocaleString('en-IN') + '</b><span>RERA CARPET SQ FT</span></div>'
    + '<div class="stat"><b>' + cr(x.total) + '</b><span>INDICATIVE PRICE</span></div>'
    + '<div class="stat"><b>' + inr(x.real) + '</b><span>REAL RATE / CARPET FT</span></div>'
    + '<div class="stat"><b>' + esc(p.poss) + '</b><span>POSSESSION</span></div></div></section>'
    + '<section style="padding-top:24px">' + projTabs(id, tab);
  var body = '';

  if (!tab) {
    body = '<h2>Our verdict</h2>'
      + '<div class="verdict"><div><div class="big">' + p.score.toFixed(1) + '</div><div class="lbl">OTHO SCORE / 10</div></div><p>' + esc(p.sum) + '</p></div>'
      + '<div class="grid g2"><div class="panel"><h3><span class="dot" style="background:var(--good)"></span>What\'s good</h3><ul>'
      + p.good.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>'
      + '<div class="panel"><h3><span class="dot" style="background:var(--bad)"></span>What we\'d flag</h3><ul>'
      + p.flag.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div></div>'
      + '<h2 style="margin-top:32px">Amenities</h2><div class="chips">'
      + p.am.map(function (i) { return '<span class="chip" style="cursor:default">' + esc(AMEN[i]) + '</span>'; }).join('') + '</div>'
      + '<h2 style="margin-top:32px">What you\'re actually paying</h2><p class="lede">Pre-filled with this project. Change anything and it recalculates.</p>' + calcHTML(p);
  } else if (tab === 'floorplans') {
    body = '<h2>Floor plans</h2><p class="lede">Carpet and super built-up shown together, because one is what you buy and the other is what you pay for.</p>'
      + '<div class="plan-wrap" style="margin-bottom:14px"><div class="pcard-top" style="margin-bottom:12px">'
      + '<div><div class="meta">' + p.bhk + ' BHK · TYPICAL UNIT</div><h3>' + esc(p.n) + '</h3></div>'
      + '<div class="pmeta" style="margin:0"><span>Carpet <b>' + p.carpet.toLocaleString('en-IN') + '</b></span><span>SBA <b>' + p.sba.toLocaleString('en-IN') + '</b></span>'
      + '<span>Loading <b>' + x.load.toFixed(0) + '%</b></span></div></div>' + svgPlan(p) + '</div>'
      + '<div class="locked"><b>Download the full plan set</b><p>All unit types as a PDF, with dimensions and the RERA carpet schedule.</p>'
      + '<button class="btn" ' + gated('plan', 'Download the floor plan set for ' + p.n + '.') + '>Get the PDF</button></div>';
  } else if (tab === 'pricing') {
    if (user && user.verified) {
      var rows = [['Base rate on super built-up', inr(p.rate) + ' / sq ft'],
                  ['Super built-up area', p.sba.toLocaleString('en-IN') + ' sq ft'],
                  ['Base price', cr(x.total)],
                  ['Floor rise (indicative, per floor)', inr(p.rate * 0.004 * p.sba)],
                  ['Car parking (2 covered)', inr(650000)],
                  ['Corpus and maintenance advance', inr(p.sba * 95)],
                  ['GST at 5% on base', inr(x.total * 0.05)],
                  ['Stamp duty and registration ~7.5%', inr(x.total * 0.075)]];
      body = '<h2>Pricing, broken down</h2><p class="lede">The number a sales office quotes is rarely the number you pay. This is the whole stack.</p>'
        + '<div class="scroll"><table><thead><tr><th>Line</th><th>Indicative</th></tr></thead><tbody>'
        + rows.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td class="v">' + esc(r[1]) + '</td></tr>'; }).join('')
        + '<tr><td><strong>All-in, approximately</strong></td><td class="v" style="background:var(--info-bg);color:var(--info)">'
        + cr(x.total * 1.125 + 650000 + p.sba * 95 + p.rate * 0.004 * p.sba) + '</td></tr>'
        + '</tbody></table></div><p class="note">Illustrative modelling. Confirm every line against the developer\'s cost sheet and the sale agreement.</p>';
    } else {
      body = '<h2>Pricing, broken down</h2><p class="lede">Base rate, floor rise, parking, corpus, GST, stamp duty — the whole stack, not the headline.</p>'
        + '<div class="locked"><b>Verify to see the full cost breakdown</b>'
        + '<p>We ask once, by OTP, so we know you are a real buyer. Your number is never passed to the developer.</p>'
        + '<button class="btn" ' + gated('price', 'See the full cost breakdown for ' + p.n + '.') + '>Verify with OTP</button></div>';
    }
  } else if (tab === 'gallery') {
    body = '<h2>Gallery</h2><p class="lede">What the shoot covers. Every image is dated so you can tell a current photo from a launch render.</p>'
      + '<div class="grid g2">' + [['EXTERIOR — TOWER','Drone, elevation, approach road'],['CLUBHOUSE','Interior, pool, gym'],
        ['SHOW FLAT — LIVING','Wide and detail, natural light'],['SHOW FLAT — KITCHEN','Fittings, counter, utility'],
        ['LANDSCAPE / PODIUM','Open area, walkways, play zone'],['APPROACH AND SURROUNDS','What you see from the gate']]
        .map(function (f) { return frame(f[0], f[1], 200); }).join('') + '</div>'
      + '<p class="note">Prototype frames, filled from the monthly site shoot.</p>';
  } else if (tab === 'progress') {
    var st = [['Excavation and foundation',100],['Structure to podium',Math.min(100,p.prog+30)],['Tower structure',p.prog],
              ['Blockwork and plaster',Math.max(0,p.prog-22)],['MEP and finishes',Math.max(0,p.prog-34)],['Amenities and landscape',Math.max(0,p.prog-45)]];
    body = '<h2>Construction progress</h2><p class="lede">Updated monthly with dated photographs. Overall completion is ' + p.prog + '% against a declared possession of ' + esc(p.poss) + '.</p>'
      + '<div class="infra" style="margin-bottom:16px">' + st.map(function (s) {
        return '<div class="infra-row" style="grid-template-columns:1fr 120px 54px"><div><b>' + esc(s[0]) + '</b></div>'
        + '<div class="bar"><i style="width:' + s[1] + '%"></i></div><div style="font-family:var(--f-m);font-size:12px;text-align:right">' + s[1] + '%</div></div>'; }).join('') + '</div>'
      + '<div class="grid g3">' + ['Jun 2026','Jul 2026','Aug 2026'].map(function (mo) { return frame(mo.toUpperCase(), 'Dated site photograph', 150); }).join('') + '</div>';
  } else if (tab === 'location') {
    var l = null; L.forEach(function (z) { if (z.n === p.loc) l = z; });
    body = '<h2>Location</h2><p class="lede">Drive times measured at 9am on a weekday, not calculated from straight-line distance.</p>'
      + (l ? svgMap(l) + '<div class="stats" style="margin-top:14px">' + l.times.map(function (t) {
          return '<div class="stat"><b>' + esc(t[0]) + '</b><span>' + esc(t[1].toUpperCase()) + '</span></div>'; }).join('') + '</div>'
        + '<h3 style="margin-top:28px">Infrastructure confidence</h3><div class="infra">' + l.infra.map(function (r) {
          return '<div class="infra-row"><div><b>' + esc(r[0]) + '</b><em>' + esc(r[1]) + '</em></div><span class="pill ' + r[3] + '">' + esc(r[2]) + '</span></div>'; }).join('') + '</div>'
        + '<p class="note"><a href="#/locality/' + l.slug + '" style="color:var(--brass)">Full ' + esc(l.n) + ' report →</a></p>' : '');
  } else return V.notfound();

  return head + body + '</section><section>' + visitBand() + '</section></div>';
};

V.compare = function (q) {
  var a = q && q.a != null ? +q.a : 0, b = a === 3 ? 0 : 3;
  return '<div class="wrap"><section><p class="eyebrow">COMPARISON ENGINE</p><h1>Compare it honestly</h1>'
    + '<p class="lede">Pick any two. Green marks the better of the pair on each line — lower wins on rate and loading, higher wins on carpet, land share and score.</p>'
    + '<div class="cta-row" style="margin-bottom:18px">'
    + '<select id="selA" aria-label="First project">' + P.map(function (p, i) { return '<option value="' + i + '"' + (i === a ? ' selected' : '') + '>' + esc(p.n) + '</option>'; }).join('') + '</select>'
    + '<select id="selB" aria-label="Second project">' + P.map(function (p, i) { return '<option value="' + i + '"' + (i === b ? ' selected' : '') + '>' + esc(p.n) + '</option>'; }).join('') + '</select></div>'
    + '<div class="scroll"><table><thead><tr><th>Measure</th><th id="hA">—</th><th id="hB">—</th></tr></thead><tbody id="cmpBody"></tbody></table></div>'
    + '<p class="note">Land share is indexed against the set average. Higher means more land per apartment.</p></section></div>';
};

V.blog = function () {
  return '<div class="wrap"><section><p class="eyebrow">BLOG</p><h1>What we are seeing in the market</h1>'
    + '<p class="lede">Written by the people who do the reviews. No press releases, no launch announcements.</p>'
    + '<div class="grid g2">' + BLOG.map(function (b) {
      return '<a class="card" href="#/blog/' + b.slug + '"><div class="meta">' + esc(b.cat.toUpperCase()) + ' · ' + esc(b.d) + ' · ' + esc(b.read) + '</div>'
      + '<h3>' + esc(b.t) + '</h3><p>' + esc(b.x) + '</p></a>'; }).join('') + '</div></section>'
    + '<section>' + newsletter() + '</section></div>';
};

V.blogPost = function (slug) {
  var b = null; BLOG.forEach(function (x) { if (x.slug === slug) b = x; });
  if (!b) return V.notfound();
  return '<div class="wrap"><section><p class="crumb"><a href="#/blog">Blog</a> / ' + esc(b.cat) + '</p>'
    + '<h1>' + esc(b.t) + '</h1><p class="sub">' + esc(b.x) + '</p>'
    + '<p class="meta" style="font-family:var(--f-m);font-size:11px;color:var(--ink-3)">' + esc(b.d) + ' · ' + esc(b.read) + ' read</p>'
    + '<div class="prose">' + proseBody(b.body) + '</div></section>'
    + '<section>' + newsletter() + '</section></div>';
};

V.localities = function () {
  return '<div class="wrap"><section><p class="eyebrow">LOCALITIES</p><h1>Where to buy, honestly assessed</h1>'
    + '<p class="lede">Price, direction of travel, and an infrastructure confidence label for every promised improvement.</p>'
    + '<div class="grid g2">' + L.map(function (l) {
      return '<a class="card" href="#/locality/' + l.slug + '"><div class="meta">' + esc(l.price) + ' · ' + esc(l.trend) + '</div><h3>' + esc(l.n) + '</h3><p>' + esc(l.blurb) + '</p></a>'; }).join('') + '</div></section></div>';
};

V.locality = function (slug) {
  var l = null; L.forEach(function (x) { if (x.slug === slug) l = x; });
  if (!l) return V.notfound();
  var here = P.filter(function (p) { return p.loc === l.n; });
  return '<div class="wrap"><section><p class="crumb"><a href="#/localities">Localities</a></p>'
    + '<p class="eyebrow">LOCALITY REPORT · UPDATED MONTHLY</p><h1>' + esc(l.n) + '</h1><p class="sub">' + esc(l.blurb) + '</p>'
    + '<div class="stats"><div class="stat"><b>' + esc(l.price) + '</b><span>PRICE BAND</span></div>'
    + '<div class="stat"><b>' + esc(l.trend) + '</b><span>DIRECTION</span></div>'
    + '<div class="stat"><b>' + here.length + '</b><span>PROJECTS REVIEWED</span></div></div></section>'
    + '<section>' + svgMap(l) + '<div class="stats" style="margin-top:14px">' + l.times.map(function (t) {
      return '<div class="stat"><b>' + esc(t[0]) + '</b><span>' + esc(t[1].toUpperCase()) + '</span></div>'; }).join('') + '</div></section>'
    + '<section><h2>Infrastructure confidence</h2><p class="lede">Labelled on funding and construction status, not on announcements.</p>'
    + '<div class="infra">' + l.infra.map(function (r) {
      return '<div class="infra-row"><div><b>' + esc(r[0]) + '</b><em>' + esc(r[1]) + '</em></div><span class="pill ' + r[3] + '">' + esc(r[2]) + '</span></div>'; }).join('') + '</div></section>'
    + (here.length ? '<section><h2>Projects we cover here</h2><div class="grid g2">' + here.map(pcard).join('') + '</div></section>' : '') + '</div>';
};

V.guides = function () {
  return '<div class="wrap"><section><p class="eyebrow">GUIDES</p><h1>The mechanics, explained plainly</h1>'
    + '<p class="lede">The things a sales office will talk around, written so you can check them yourself.</p>'
    + '<div class="grid g2">' + G.map(function (g) {
      return '<a class="card" href="#/guides/' + g.slug + '"><div class="meta">GUIDE</div><h3>' + esc(g.t) + '</h3><p>' + esc(g.x) + '</p></a>'; }).join('') + '</div></section></div>';
};

V.guide = function (slug) {
  var g = null; G.forEach(function (x) { if (x.slug === slug) g = x; });
  if (!g) return V.notfound();
  return '<div class="wrap"><section><p class="crumb"><a href="#/guides">Guides</a></p><h1>' + esc(g.t) + '</h1><p class="sub">' + esc(g.x) + '</p>'
    + '<div class="prose">' + proseBody(g.body) + '</div>'
    + '<p class="note" style="margin-top:24px"><a href="#/compare" style="color:var(--brass)">Try it on two real projects →</a></p></section></div>';
};

V.tools = function () {
  return '<div class="wrap"><section><p class="eyebrow">CALCULATORS</p><h1>Work it out before anyone tells you</h1>'
    + '<p class="lede">Two numbers decide most purchases: what you actually pay per usable foot, and what the bank will lend you.</p></section>'
    + '<section><h2>Real rate on carpet</h2><p class="lede">Enter any project\'s figures. Loading factor and real rate calculate as you type.</p>'
    + calcHTML({sba:2650, carpet:1850, rate:11300}) + '</section>'
    + '<section><h2>Loan and affordability</h2><p class="lede">Indicative only. Banks assess the project as well as you.</p>'
    + '<div class="calc"><div class="fields">'
    + '<div><label for="lAmt">PROPERTY PRICE (₹)</label><input type="number" id="lAmt" value="29900000" step="100000"></div>'
    + '<div><label for="lDown">DOWN PAYMENT (%)</label><input type="number" id="lDown" value="20" min="10" max="90"></div>'
    + '<div><label for="lRate">INTEREST RATE (% P.A.)</label><input type="number" id="lRate" value="8.6" step="0.05"></div>'
    + '<div><label for="lYears">TENURE (YEARS)</label><input type="number" id="lYears" value="20" min="1" max="30"></div></div>'
    + '<div class="out"><div class="out-row"><span>Down payment</span><span id="lOutDown">—</span></div>'
    + '<div class="out-row"><span>Loan amount</span><span id="lOutLoan">—</span></div>'
    + '<div class="out-row key"><span>Monthly EMI</span><span id="lOutEmi">—</span></div>'
    + '<div class="out-row"><span>Total interest over term</span><span id="lOutInt">—</span></div>'
    + '<div class="out-row"><span>Income usually needed</span><span id="lOutInc">—</span></div></div>'
    + '<p class="note">Lenders generally want the EMI under about 40% of net monthly income. Stamp duty and registration are not included.</p></div></section></div>';
};

V.shortlist = function () {
  var list = saved.map(function (i) { return P[i]; }).filter(Boolean);
  if (!list.length) return '<div class="wrap"><section><p class="eyebrow">YOUR SHORTLIST</p><h1>Nothing saved yet</h1>'
    + '<p class="lede">Save projects as you browse and they collect here, so you can compare them side by side.</p>'
    + '<a class="btn" href="#/projects">Browse projects</a></section></div>';
  var rows = [['Real rate on carpet', function (p) { return inr(m(p).real); }], ['Loading factor', function (p) { return m(p).load.toFixed(1) + '%'; }],
    ['RERA carpet', function (p) { return p.carpet.toLocaleString('en-IN') + ' sq ft'; }], ['Indicative price', function (p) { return cr(m(p).total); }],
    ['OTHO score', function (p) { return p.score.toFixed(1); }], ['Possession', function (p) { return p.poss; }]];
  return '<div class="wrap"><section><p class="eyebrow">YOUR SHORTLIST</p><h1>' + list.length + ' saved project' + (list.length > 1 ? 's' : '') + '</h1>'
    + '<p class="lede">Kept on this device. Verified users can sync across devices.</p>'
    + '<div class="scroll" style="margin-bottom:18px"><table><thead><tr><th>Measure</th>' + list.map(function (p) { return '<th>' + esc(p.n) + '</th>'; }).join('') + '</tr></thead><tbody>'
    + rows.map(function (r) { return '<tr><td>' + r[0] + '</td>' + list.map(function (p) { return '<td class="v">' + esc(r[1](p)) + '</td>'; }).join('') + '</tr>'; }).join('')
    + '</tbody></table></div><div class="grid g2">' + list.map(pcard).join('') + '</div></section></div>';
};

V.leads = function () {
  var hot = leads.filter(function (l) { return leadScore(l)[0] === 'HOT'; }).length;
  return '<div class="wrap"><section><p class="eyebrow">INTERNAL DEMO · NOT PUBLIC</p><h1>What you capture instead of losing</h1>'
    + '<p class="lede">This is the page OTHO staff would see. Every verified visitor arrives with a phone, an email, a profession, a buying timeline and a budget — scored automatically so sales calls the right people first.</p>'
    + '<div class="stats"><div class="stat"><b>' + leads.length + '</b><span>VERIFIED LEADS</span></div>'
    + '<div class="stat"><b>' + hot + '</b><span>HOT — BUYING IN 3 MONTHS</span></div>'
    + '<div class="stat"><b>' + subs.length + '</b><span>NEWSLETTER SUBSCRIBERS</span></div>'
    + '<div class="stat"><b>' + saved.length + '</b><span>PROJECTS SHORTLISTED</span></div></div></section>'
    + '<section>' + (leads.length
      ? '<div class="scroll"><table><thead><tr><th>Phone</th><th>Email</th><th>Profession</th><th>Timeline</th><th>Budget</th><th>Triggered by</th><th>Score</th></tr></thead><tbody>'
        + leads.slice().reverse().map(function (l) {
          var s = leadScore(l);
          return '<tr><td>+91 ' + esc(l.phone) + '</td><td>' + esc(l.email) + '</td><td>' + esc(l.profession) + '</td><td>' + esc(l.timeline) + '</td>'
          + '<td class="v">' + cr(l.budget) + '</td><td>' + esc(l.source) + '</td><td class="v"><span class="lead-badge ' + s[1] + '">' + s[0] + '</span></td></tr>'; }).join('')
        + '</tbody></table></div>'
      : '<div class="locked"><b>No leads captured yet in this session</b><p>Try booking a visit or unlocking pricing on any project — the OTP flow will capture a lead and it will appear here.</p>'
        + '<a class="btn" href="#/projects">Go and trigger one</a></div>')
    + '<p class="note">Prototype — stored in your browser only. A live build writes to the CRM with consent timestamp, source page and UTM parameters, and pushes hot leads to WhatsApp within minutes.</p></section>'
    + '<section><h2>Why this answers the problem</h2><div class="prose">'
    + '<p>The complaint was that a lot of visitors arrive and are never heard from again. Gating the whole site would fix that and destroy the traffic at the same time — search engines cannot crawl what is behind a login, and the brand promise is that nothing is hidden.</p>'
    + '<div class="pullq">Gate the intent, not the information.</div>'
    + '<p>So browsing, reviews, comparisons, guides and blog stay open. Verification is asked only where someone is signalling they are serious: booking a visit, downloading the plan set, unlocking the full cost breakdown, or saving a shortlist. Those people convert, and they are the ones worth a call.</p>'
    + '</div></section></div>';
};

V.methodology = function () {
  return '<div class="wrap"><section><p class="eyebrow">HOW WE SCORE</p><h1>The method, published in full</h1>'
    + '<p class="sub">If we are going to put a number on someone\'s building, the working has to be visible.</p></section>'
    + '<section><h2>The six inputs</h2><div class="scroll"><table><thead><tr><th>Input</th><th>Weight</th><th>What we measure</th></tr></thead><tbody>'
    + SCORE.map(function (s) { return '<tr><td><strong>' + esc(s[0]) + '</strong></td><td class="v">' + esc(s[1]) + '</td><td>' + esc(s[2]) + '</td></tr>'; }).join('')
    + '</tbody></table></div></section>'
    + '<section><h2>What the score is not</h2><div class="prose">'
    + '<p>It is not a prediction of price appreciation. Nobody can do that honestly, and anyone selling a forecast built on unfunded infrastructure is selling something else.</p>'
    + '<p>It is not a recommendation. A 6.5 can be exactly right for a buyer who values a five-minute commute above everything.</p>'
    + '<div class="pullq">A low score means know what you are giving up. It does not mean do not buy.</div>'
    + '<h3>How we gather it</h3><ul><li>Carpet areas and possession dates from the TG-RERA filing, never the brochure</li>'
    + '<li>Land and unit counts from the sanctioned plan</li><li>Drive times measured in a car at 9am on a weekday</li>'
    + '<li>Water and infrastructure status from the relevant authority, with funding stage recorded</li><li>A physical site visit before any project is scored</li></ul>'
    + '<h3>When we change a score</h3><p>Re-reviewed every six months, and immediately if something material changes. Every change is dated and the previous score stays visible.</p>'
    + '</div><p class="note"><a href="#/charter" style="color:var(--brass)">Read the editorial charter →</a></p></section></div>';
};

V.charter = function () {
  return '<div class="wrap"><section><p class="eyebrow">EDITORIAL CHARTER</p><h1>What we will and will not publish</h1>'
    + '<p class="sub">We earn money from developers and publish criticism of their projects. That tension is real, so the rules governing it are public.</p></section>'
    + '<section><div class="prose">'
    + '<h3>Everything negative must be a cited fact</h3>'
    + '<p>We do not publish "this project is bad." We publish "the sanctioned plan shows one clubhouse for 640 units" or "no municipal water connection has been tendered as of August 2026." Every flag traces to a filing, a measurement, or an authority record.</p>'
    + '<div class="pullq">Opinion is litigable. A sourced measurement is not.</div>'
    + '<h3>Right of reply</h3><p>Developers see every finding before publication and have five working days to respond. Disputed facts carry their response alongside. Where they show we are wrong, we correct and say so.</p>'
    + '<h3>Commercial separation</h3><ul><li>No developer may pay to change, soften or remove a finding</li><li>No developer may pay for placement in search results or comparisons</li>'
    + '<li>A mandate relationship is disclosed on the project page</li><li>Reviewers are not compensated on sales of projects they score</li></ul>'
    + '<h3>Corrections</h3><p>Errors are corrected at the top of the page, dated, with the original text preserved. We do not quietly edit.</p>'
    + '</div></section></div>';
};

V.developers = function () {
  return '<div class="wrap"><section><p class="eyebrow">FOR DEVELOPERS</p><h1>We move inventory by making buyers confident, not by making more calls.</h1>'
    + '<p class="sub">OTHO takes a small number of exclusive mandates. Buyers arrive having read the honest case for and against your project — which is why they convert faster and negotiate less.</p>'
    + '<div class="cta-row"><a class="btn" href="#/contact">Talk about a mandate</a><a class="btn ghost" href="#/methodology">See how we score</a></div></section>'
    + '<section><h2>What a mandate includes</h2><div class="grid g2">'
    + '<div class="panel"><h3>Distribution</h3><ul><li>A reviewed project page with full comparison data</li><li>Placement across search, locality and comparison pages</li>'
    + '<li>Video walkthrough and a comparison film</li><li>Channel partner kit with per-partner attribution</li></ul></div>'
    + '<div class="panel"><h3>Intelligence</h3><ul><li>Monthly demand report on your micro-market</li><li>What buyers ask, object to, and walk away from</li>'
    + '<li>Real cost per booking, by source</li><li>Competitive pricing movement in your layout</li></ul></div></div></section>'
    + '<section><h2>The honest part</h2><div class="prose">'
    + '<p>Your project page will carry a section on what is wrong with it. We will not remove it, and we will not soften it because a mandate is at stake.</p>'
    + '<div class="pullq">The flags are why buyers believe the rest of the page.</div>'
    + '<h3>How we are paid</h3><p>A commission on completed sale, on registration. No listing fees, no pay-per-lead, no paid placement. If your inventory does not move, we do not earn.</p>'
    + '</div></section></div>';
};

V.about = function () {
  return '<div class="wrap"><section><p class="eyebrow">ABOUT OTHO</p><h1>We make money when you buy well, not when you buy fast.</h1>'
    + '<p class="sub">OTHO is an advisory business, not a listings portal. That distinction decides everything about how this site works.</p></section>'
    + '<section><h2>How we\'re different, concretely</h2><div class="scroll"><table><thead><tr><th>&nbsp;</th><th>A listings portal</th><th>OTHO</th></tr></thead><tbody>'
    + '<tr><td>Your phone number</td><td class="v lose">Sold to several brokers</td><td class="v win">Never shared</td></tr>'
    + '<tr><td>What it tells you</td><td class="v lose">What is available</td><td class="v win">What is worth buying</td></tr>'
    + '<tr><td>Negative information</td><td class="v lose">Not published</td><td class="v win">On every project page</td></tr>'
    + '<tr><td>Area shown</td><td class="v lose">Super built-up</td><td class="v win">Carpet and real rate</td></tr>'
    + '<tr><td>Paid by</td><td class="v lose">Listing fees, per lead</td><td class="v win">Developer mandate on completion</td></tr>'
    + '</tbody></table></div></section>'
    + '<section><h2>How we are paid</h2><div class="prose">'
    + '<p>We earn a commission from developers when a sale completes. That is a real conflict of interest and we would rather name it than pretend it away.</p>'
    + '<div class="pullq">Every project page carries what is wrong with it — including projects we earn on. If that ever stops, nothing else here is worth reading.</div>'
    + '<h3>What we will not do</h3><ul><li>Sell or share your contact details with anyone</li><li>Remove a negative finding because a developer asked</li>'
    + '<li>Publish an appreciation forecast built on unfunded infrastructure</li><li>Quote a rate on super built-up without the carpet figure beside it</li></ul>'
    + '</div></section><section>' + visitBand() + '</section></div>';
};

V.team = function () {
  var t = [['Founder','Two decades in Hyderabad residential. Has sat on both sides of the table — developer sales and buyer advisory.'],
    ['Co-founder','Twenty years of transactions across the western corridor. Knows which projects were rescued and which were quietly repriced.'],
    ['Head of research','Reads the filings. Every carpet area, sanctioned plan and possession date passes through here.'],
    ['Site reviewer','Visits every project before it is scored, measures the commute in a car, and photographs what the brochure crops out.']];
  return '<div class="wrap"><section><p class="eyebrow">TEAM</p><h1>The people whose judgement this is</h1>'
    + '<p class="lede">A score is only worth the experience behind it.</p>'
    + '<div class="grid g2">' + t.map(function (x) {
      return '<div class="card pad0">' + frame('PORTRAIT', 'Studio headshot', 175) + '<div class="card-body"><h3>' + esc(x[0]) + '</h3><p>' + esc(x[1]) + '</p></div></div>'; }).join('') + '</div>'
    + '<p class="note">Names, photographs and biographies to be supplied by OTHO before launch.</p></section></div>';
};

V.contact = function () {
  return '<div class="wrap"><section><p class="eyebrow">CONTACT</p><h1>One conversation, with one person</h1>'
    + '<p class="lede">We call between 09:00 and 21:00 only, as the telecom rules require, and your number is never passed on.</p>'
    + '<div class="grid g2">'
    + '<div class="panel"><h3>Buyers</h3><ul><li>WhatsApp: +91 XXXXX XXXXX</li><li>Email: hello@otho.in</li><li>Hours: 09:00–21:00, all days</li></ul></div>'
    + '<div class="panel"><h3>Developers and press</h3><ul><li>Mandates: developers@otho.in</li><li>Press: press@otho.in</li><li>Grievances: <a href="#/grievance">grievance officer</a></li></ul></div></div>'
    + '<div class="calc" style="margin-top:18px"><div class="fields">'
    + '<div><label for="cName">YOUR NAME</label><input type="text" id="cName" placeholder="Name"></div>'
    + '<div><label for="cPhone">PHONE</label><input type="tel" id="cPhone" placeholder="+91"></div>'
    + '<div><label for="cTopic">WHAT ABOUT</label><select id="cTopic"><option>Buying advice</option><option>A specific project</option><option>Developer mandate</option><option>Press enquiry</option></select></div></div>'
    + '<div><label for="cMsg">MESSAGE</label><textarea id="cMsg" placeholder="What are you trying to work out?"></textarea></div>'
    + '<div class="consent-row"><input type="checkbox" id="cConsent">'
    + '<label for="cConsent">I agree to be contacted about this enquiry. I can withdraw at any time from <a href="#/consent" style="color:var(--brass)">consent preferences</a>.</label></div>'
    + '<div class="cta-row" style="margin-top:14px"><button class="btn" id="cBtn">Send</button><span id="cMsgOut" style="font-size:13.5px;color:var(--ink-3)"></span></div></div>'
    + '<p class="note">Consent is collected separately from the terms of use, as the DPDP Act requires.</p></section></div>';
};

V.careers = function () {
  return '<div class="wrap"><section><p class="eyebrow">CAREERS</p><h1>We are hiring people who would rather be right than agreeable</h1>'
    + '<p class="lede">Publishing criticism of your own clients is not for everyone. If it appeals, these are the roles.</p>'
    + '<div class="grid g2">' + [['Research analyst','Read filings, measure commutes, and defend a finding to a developer who does not like it.'],
      ['Site reviewer','Visit every project before it is scored. Photograph what the brochure crops out.'],
      ['Content producer','Two shoot days a month, roughly thirty finished pieces.'],
      ['Buyer advisor','One point of contact for a buyer, from first enquiry to registration.']].map(function (r) {
      return '<div class="card"><div class="meta">HYDERABAD · FULL TIME</div><h3>' + esc(r[0]) + '</h3><p>' + esc(r[1]) + '</p></div>'; }).join('')
    + '</div><p class="note">Write to careers@otho.in with something you have researched, not a covering letter.</p></section></div>';
};

V.faq = function () {
  var q = [
    ["Do you sell my phone number?","No, and the business model does not depend on it. A listings portal earns by reselling one enquiry to several brokers. We earn a commission from the developer when a sale completes, so there is nothing to gain from passing your number on."],
    ["Why do I have to verify with OTP?","Only for actions that signal you are serious — booking a visit, downloading plans, unlocking the full cost breakdown. Reviews, comparisons, guides and the blog are open to everyone, no login. We verify so our advisors talk to real buyers rather than bots."],
    ["How can you criticise projects you earn money from?","Because the criticism is what makes the endorsement worth anything. Every finding is a cited fact with a right of reply, set out in the editorial charter."],
    ["Is the OTHO score a prediction of returns?","No. It measures what you are trading away — land share, loading, water, density, delivery record and access."],
    ["Why is your price different from the developer's?","We show the real rate on RERA carpet area alongside the advertised rate on super built-up. Same flat, same money, different denominator."],
    ["Do you charge buyers anything?","No. Advice, comparisons, guides and site visits are free to buyers."],
    ["What if I disagree with a review?","Tell us. If you can show a figure is wrong we correct it at the top of the page, dated, with the original preserved."],
    ["Can I buy from abroad?","Yes. The NRI article covers FEMA rules, repatriation and power of attorney, and we can act as your eyes on the ground."]
  ];
  return '<div class="wrap"><section><p class="eyebrow">FAQ</p><h1>Questions we get asked</h1>'
    + '<div class="faq" style="margin-top:18px">' + q.map(function (x) {
      return '<details><summary>' + esc(x[0]) + '</summary><div class="ans">' + esc(x[1]) + '</div></details>'; }).join('') + '</div></section></div>';
};

V.market = function () {
  return '<div class="wrap"><section><p class="eyebrow">MARKET REPORT · AUGUST 2026</p><h1>Hyderabad, in numbers we can source</h1>'
    + '<p class="lede">Published monthly. Every figure carries its source so you can check it rather than trust us.</p>'
    + '<div class="stats"><div class="stat"><b>19 months</b><span>INVENTORY OVERHANG</span></div>'
    + '<div class="stat"><b>~97,000</b><span>UNSOLD UNITS</span></div>'
    + '<div class="stat"><b>₹8,258</b><span>AVG PRICE / SQ FT</span></div>'
    + '<div class="stat"><b>+1%</b><span>H1 SALES GROWTH</span></div></div></section>'
    + '<section><h2>What the numbers say</h2><div class="prose">'
    + '<p>Hyderabad carries the highest residential inventory overhang of any major Indian city. Launches have continued to run ahead of absorption, and roughly 97,000 units sit unsold.</p>'
    + '<div class="pullq">This is a buyer\'s market that mostly still talks like a seller\'s market.</div>'
    + '<p>The demand engine underneath is strong — Hyderabad leads the country on GCC office absorption. What has overshot is the residential supply response, not the demand for housing.</p>'
    + '<h3>Sources</h3><p>Anarock quarterly residential viewpoints; Knight Frank H1 2026 India Real Estate; Telangana registration data; Hyderabad trade press.</p>'
    + '</div></section><section>' + newsletter() + '</section></div>';
};

V.podcast = function () {
  return '<div class="wrap"><section><p class="eyebrow">THE OTHO PODCAST</p><h1>Conversations with people who actually know</h1>'
    + '<p class="lede">Developers, planners, architects and lawyers, on the record. Fortnightly.</p>'
    + '<div class="grid g2">' + EP.map(function (e) {
      return '<div class="card pad0">' + frame('EPISODE ARTWORK', 'Studio still or guest portrait', 135)
      + '<div class="card-body"><div class="meta">EPISODE ' + e.n + ' · ' + esc(e.d) + ' · ' + esc(e.len) + '</div><h3>' + esc(e.t) + '</h3><p>' + esc(e.g) + '</p></div></div>'; }).join('')
    + '</div></section></div>';
};

V.visit = function () {
  return '<div class="wrap"><section><p class="eyebrow">BOOK A SITE VISIT</p><h1>One conversation, with one person</h1>'
    + '<p class="lede">Pick a slot and you get a WhatsApp confirmation from a named person at OTHO. No call centre, no resold enquiry, and calls only between 09:00 and 21:00.</p>'
    + visitBand() + '</section></div>';
};

V.privacy = function () {
  return legalShell('Privacy notice', 'How we collect, use and protect your personal data under the Digital Personal Data Protection Act.', [
    ['h','What we collect'],
    ['l',['Name, phone number and email when you verify or make an enquiry','Profession, buying timeline and budget, so an advisor can be useful rather than generic','The projects you view, save or compare','Device and browser information for security and performance']],
    ['h','Why we collect it'],
    ['p','To respond to your enquiry, arrange site visits, and send updates you asked for. We do not build advertising profiles and we do not sell data.'],
    ['h','Who we share it with'],
    ['p','Nobody outside OTHO, other than the processors needed to run the service — hosting, messaging and CRM providers, each bound by contract. We do not pass your contact details to developers or brokers without your explicit, separate consent for that specific project.'],
    ['h','Your rights'],
    ['l',['Access the data we hold about you','Correct anything inaccurate','Erase your data','Withdraw consent at any time, as easily as it was given','Nominate someone to act for you','Complain to the Data Protection Board']],
    ['h','How to withdraw'],
    ['p','Use the consent preferences page, or write to the grievance officer. Withdrawal takes effect immediately.'],
    ['h','How long we keep it'],
    ['p','Enquiry data for three years from your last interaction, unless you ask us to erase it sooner.'],
    ['h','Consent, stated separately'],
    ['p','This notice is standalone. Agreeing to our terms of use is not agreement to be contacted — that consent is asked for separately, in plain language, at the point of collection.']
  ]);
};

V.consent = function () {
  var items = [['Essential service','Responding to your enquiry and arranging site visits. Required to provide the service.',true,true],
    ['Project updates','Construction progress and price changes for projects you saved.',true,false],
    ['Market report','The monthly Hyderabad report by email.',false,false],
    ['WhatsApp messages','Visit confirmations and replies on WhatsApp.',true,false],
    ['Phone calls','Calls from OTHO between 09:00 and 21:00 only.',true,false]];
  return '<div class="wrap"><section><p class="eyebrow">CONSENT PREFERENCES</p><h1>Turn anything off, right here</h1>'
    + '<p class="lede">Withdrawal has to be as easy as consent. It is on this page, one click, no email required.</p>'
    + items.map(function (i, n) {
      return '<div class="tog" style="display:flex;justify-content:space-between;align-items:center;gap:16px;background:var(--card);border:1px solid var(--line);padding:14px 16px;margin-bottom:9px">'
      + '<div><b style="display:block;font-size:14.5px">' + esc(i[0]) + '</b><span style="font-size:13px;color:var(--ink-3)">' + esc(i[1]) + '</span></div>'
      + '<button class="sw" data-cons="' + n + '" aria-pressed="' + (i[2] ? 'true' : 'false') + '" aria-label="' + esc(i[0]) + '"' + (i[3] ? ' disabled' : '')
      + ' style="width:46px;height:26px;border-radius:13px;background:' + (i[2] ? 'var(--good)' : 'var(--line)') + ';border:0;cursor:pointer;position:relative;flex:0 0 auto'
      + (i[3] ? ';opacity:.55;cursor:not-allowed' : '') + '">'
      + '<i style="position:absolute;top:3px;left:' + (i[2] ? '23px' : '3px') + ';width:20px;height:20px;border-radius:50%;background:var(--card);display:block"></i></button></div>'; }).join('')
    + '<div class="cta-row" style="margin-top:16px"><button class="btn" id="consSave">Save preferences</button>'
    + '<button class="btn ghost" id="consAll">Withdraw all non-essential</button>'
    + '<button class="btn ghost" id="consErase">Erase my data</button>'
    + '<span id="consMsg" style="font-size:13.5px;color:var(--ink-3)"></span></div>'
    + '<p class="note">A live build writes these immediately and stops the relevant processing.</p></section></div>';
};

V.terms = function () {
  return legalShell('Terms of use', 'The rules for using this site. Plain language, no traps.', [
    ['h','What this site is'],['p','An information and advisory service for property buyers in Hyderabad. It is not a listings marketplace and does not sell property directly.'],
    ['h','Accuracy'],['p','We take reasonable care that figures match the source documents. Filings change and errors happen. Verify anything material before you transact.'],
    ['h','Our reviews and scores'],['p','Reviews express our assessment based on documented facts and site inspection. They are opinion informed by evidence, not financial advice.'],
    ['h','Your use'],['l',['Do not scrape, republish or resell our content without permission','Do not submit false resident reviews','Do not use the site to harass any developer or individual']],
    ['h','Liability'],['p','We are not liable for decisions you take based on this site. Do your own due diligence and read the sale agreement.'],
    ['h','Governing law'],['p','Indian law, with jurisdiction in Hyderabad.']
  ]);
};

V.disclaimer = function () {
  return legalShell('Reviews disclaimer', 'What our scores mean and what they do not.', [
    ['h','Prototype notice'],['p','This site is currently a prototype. Project names, developers and localities are real and publicly listed. Sizes, rates, land shares, scores and verdicts shown here are illustrative modelling for demonstration and are not published OTHO reviews or statements of fact about any project or developer.'],
    ['h','Opinion based on documented fact'],['p','In the live service, every finding traces to a RERA filing, a sanctioned plan, an authority record or a physical measurement. Where something is judgement rather than document, we say so on the page.'],
    ['h','Not investment advice'],['p','Nothing here is a recommendation to buy, sell or hold property, and no part of it is a forecast of returns.'],
    ['h','Point in time'],['p','A score reflects the project as assessed on the date shown. Scores are re-reviewed every six months and whenever something material changes.'],
    ['h','Right of reply'],['p','Developers see findings before publication and may respond. Disputed facts carry their response alongside. Demonstrated errors are corrected at the top of the page, dated.']
  ]);
};

V.grievance = function () {
  return legalShell('Grievance officer', 'Who to contact if something has gone wrong with your data or a review.', [
    ['h','Data protection grievances'],['p','Under the DPDP Act you may raise a grievance about how your personal data has been handled. The grievance officer responds within the statutory period.'],
    ['l',['Grievance Officer, OTHO Realty','Email: grievance@otho.in','Address: to be confirmed before launch, Hyderabad, Telangana','Response: within 30 days of receipt']],
    ['h','If you are not satisfied'],['p','You may escalate to the Data Protection Board of India. We will tell you how, and we will not obstruct it.'],
    ['h','Complaints about a review'],['p','Write to editorial@otho.in with the specific figure you believe is wrong and the document that shows it.'],
    ['h','RERA complaints'],['p','If your complaint concerns a developer rather than OTHO, TG-RERA is the correct authority.']
  ]);
};

V.notfound = function () {
  return '<div class="wrap"><section><h1>Page not found</h1><p class="lede">That link does not exist in the prototype.</p><a class="btn" href="#/">Back to home</a></section></div>';
};

/* ---------- wiring ---------- */
function wireCalc() {
  var s = document.getElementById('sba'), c = document.getElementById('carpet'), r = document.getElementById('rate');
  if (!s) return;
  function go() {
    var S = +s.value, C = +c.value, R = +r.value, set = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = v; };
    if (!(S > 0 && C > 0 && R > 0) || C > S) { set('oLoad','—'); set('oTotal','—'); set('oReal', C > S ? 'carpet exceeds built-up' : '—'); set('oWaste','—'); return; }
    set('oLoad', ((S - C) / S * 100).toFixed(1) + '%'); set('oTotal', inr(S * R));
    set('oReal', inr(S * R / C) + ' / sq ft'); set('oWaste', Math.round(S - C).toLocaleString('en-IN') + ' sq ft you cannot use');
  }
  [s, c, r].forEach(function (e) { e.addEventListener('input', go); }); go();
}
function wireLoan() {
  var a = document.getElementById('lAmt'); if (!a) return;
  var d = document.getElementById('lDown'), r = document.getElementById('lRate'), y = document.getElementById('lYears');
  function go() {
    var A = +a.value, Dn = +d.value, R = +r.value / 100 / 12, N = +y.value * 12, set = function (id, v) { document.getElementById(id).textContent = v; };
    if (!(A > 0 && Dn >= 0 && Dn < 100 && R > 0 && N > 0)) { ['lOutDown','lOutLoan','lOutEmi','lOutInt','lOutInc'].forEach(function (i) { set(i,'—'); }); return; }
    var down = A * Dn / 100, Ln = A - down, emi = Ln * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    set('lOutDown', inr(down)); set('lOutLoan', inr(Ln)); set('lOutEmi', inr(emi) + ' / month');
    set('lOutInt', inr(emi * N - Ln)); set('lOutInc', inr(emi / 0.4) + ' / month');
  }
  [a, d, r, y].forEach(function (e) { e.addEventListener('input', go); }); go();
}
function wireCompare() {
  var a = document.getElementById('selA'), b = document.getElementById('selB'); if (!a) return;
  function go() {
    var A = P[+a.value], B = P[+b.value], ma = m(A), mb = m(B);
    document.getElementById('hA').textContent = A.n; document.getElementById('hB').textContent = B.n;
    var rows = [['Developer', A.dev, B.dev, 0, 0, 0],
      ['Advertised rate', inr(A.rate) + ' / sq ft', inr(B.rate) + ' / sq ft', A.rate, B.rate, -1],
      ['RERA carpet area', A.carpet.toLocaleString('en-IN') + ' sq ft', B.carpet.toLocaleString('en-IN') + ' sq ft', A.carpet, B.carpet, 1],
      ['Loading factor', ma.load.toFixed(1) + '%', mb.load.toFixed(1) + '%', ma.load, mb.load, -1],
      ['Real rate on carpet', inr(ma.real) + ' / sq ft', inr(mb.real) + ' / sq ft', ma.real, mb.real, -1],
      ['Indicative price', cr(ma.total), cr(mb.total), ma.total, mb.total, 0],
      ['Land share per unit', A.land.toFixed(2) + '×', B.land.toFixed(2) + '×', A.land, B.land, 1],
      ['Amenities', A.am.length + ' of ' + AMEN.length, B.am.length + ' of ' + AMEN.length, A.am.length, B.am.length, 1],
      ['OTHO score', A.score.toFixed(1), B.score.toFixed(1), A.score, B.score, 1],
      ['Possession', A.poss, B.poss, 0, 0, 0]];
    var body = document.getElementById('cmpBody'); body.innerHTML = '';
    rows.forEach(function (r) {
      var tr = document.createElement('tr'), t0 = document.createElement('td'); t0.textContent = r[0]; tr.appendChild(t0);
      var cls = ['', ''];
      if (r[5] !== 0 && r[3] !== r[4]) { var ab = r[5] === -1 ? r[3] < r[4] : r[3] > r[4]; cls = ab ? ['win','lose'] : ['lose','win']; }
      [[r[1], cls[0]], [r[2], cls[1]]].forEach(function (cc) {
        var td = document.createElement('td'); td.className = 'v ' + cc[1]; td.textContent = cc[0]; tr.appendChild(td); });
      body.appendChild(tr);
    });
  }
  a.addEventListener('change', go); b.addEventListener('change', go); go();
}
function wireSearch() {
  var loc = document.getElementById('qLoc'); if (!loc) return;
  var bhk = document.getElementById('qBhk'), st = document.getElementById('qStat'), so = document.getElementById('qSort'),
      bud = document.getElementById('qBud'), budV = document.getElementById('qBudV'), amBox = document.getElementById('qAm');
  function sel() { return Array.prototype.filter.call(amBox.children, function (c) { return c.getAttribute('aria-pressed') === 'true'; })
      .map(function (c) { return +c.getAttribute('data-am'); }); }
  function go() {
    budV.textContent = '₹' + (+bud.value / 1e7).toFixed(2) + ' Cr';
    var want = sel();
    var list = P.filter(function (p) {
      if (loc.value && p.loc !== loc.value) return false;
      if (bhk.value && p.bhk < +bhk.value) return false;
      if (st.value && p.status !== st.value) return false;
      if (m(p).total > +bud.value) return false;
      for (var i = 0; i < want.length; i++) if (p.am.indexOf(want[i]) === -1) return false;
      return true;
    });
    list.sort(function (x, y) {
      if (so.value === 'real') return m(x).real - m(y).real;
      if (so.value === 'load') return m(x).load - m(y).load;
      if (so.value === 'price') return m(x).total - m(y).total;
      return y.score - x.score;
    });
    document.getElementById('qCount').textContent = list.length + ' of ' + P.length + ' projects match';
    document.getElementById('qList').innerHTML = list.length ? list.map(pcard).join('')
      : '<p class="lede">Nothing matches. Try widening the budget or removing an amenity.</p>';
  }
  [loc, bhk, st, so].forEach(function (e) { e.addEventListener('change', go); });
  bud.addEventListener('input', go);
  amBox.addEventListener('click', function (e) {
    var c = e.target.closest('.chip'); if (!c) return;
    c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); go();
  });
  document.getElementById('qClear').addEventListener('click', function () {
    loc.value = ''; bhk.value = ''; st.value = ''; so.value = 'score'; bud.value = 60000000;
    Array.prototype.forEach.call(amBox.children, function (c) { c.setAttribute('aria-pressed', 'false'); }); go();
  });
  go();
}
function wireChips() {
  var box = document.getElementById('locChips'); if (!box) return;
  box.addEventListener('click', function (e) {
    var c = e.target.closest('.chip'); if (!c) return;
    Array.prototype.forEach.call(box.children, function (x) { x.setAttribute('aria-pressed', 'false'); });
    c.setAttribute('aria-pressed', 'true');
    var v = c.getAttribute('data-loc'), list = v ? P.filter(function (p) { return p.loc === v; }) : P;
    document.getElementById('plist').innerHTML = list.length ? list.map(pcard).join('') : '<p class="lede">No projects reviewed there yet.</p>';
  });
}
function wireVisit() {
  var slots = document.getElementById('slots'); if (!slots) return;
  var chosen = null;
  slots.addEventListener('click', function (e) {
    var b = e.target.closest('.slot'); if (!b) return;
    Array.prototype.forEach.call(slots.children, function (x) { x.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', 'true'); chosen = b.textContent;
    document.getElementById('bookMsg').textContent = '';
  });
  document.getElementById('bookBtn').addEventListener('click', function () {
    if (!chosen) { document.getElementById('bookMsg').textContent = 'Pick a slot first.'; return; }
    if (!(user && user.verified)) { requireUser('visit', 'Confirm your site visit for ' + chosen + '.'); return; }
    document.getElementById('bookMsg').textContent = 'Confirmed for ' + chosen + '. Prototype — a live build sends WhatsApp confirmation to +91 ' + user.phone + ' and writes the booking to the CRM.';
  });
}
function wireNewsletter() {
  var f = document.getElementById('nlForm'); if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = document.getElementById('nlEmail').value.trim(), msg = document.getElementById('nlMsg');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { msg.textContent = 'Enter a valid email address.'; return; }
    if (subs.indexOf(v) === -1) { subs.push(v); ls.set('otho_subs', subs); }
    msg.textContent = 'Subscribed. ' + v + ' will get the next monthly note. Unsubscribe in one click from any email.';
    document.getElementById('nlEmail').value = '';
  });
}
function wireMisc() {
  var cb = document.getElementById('cBtn');
  if (cb) cb.addEventListener('click', function () {
    var ok = document.getElementById('cConsent').checked, n = document.getElementById('cName').value.trim();
    document.getElementById('cMsgOut').textContent = !n ? 'Add your name first.'
      : (!ok ? 'Please tick consent — we cannot contact you without it.'
      : 'Prototype — a live build writes this to the CRM with your consent record and timestamp.');
  });
  var cs = document.getElementById('consSave');
  if (cs) cs.addEventListener('click', function () { document.getElementById('consMsg').textContent = 'Preferences saved.'; });
  var ca = document.getElementById('consAll');
  if (ca) ca.addEventListener('click', function () {
    Array.prototype.forEach.call(document.querySelectorAll('.sw:not([disabled])'), function (s) {
      s.setAttribute('aria-pressed', 'false'); s.style.background = 'var(--line)'; s.querySelector('i').style.left = '3px'; });
    document.getElementById('consMsg').textContent = 'All non-essential processing withdrawn.';
  });
  var ce = document.getElementById('consErase');
  if (ce) ce.addEventListener('click', function () {
    user = null; leads = []; subs = []; saved = [];
    ls.set('otho_user', null); ls.set('otho_leads', []); ls.set('otho_subs', []); ls.set('otho_saved', []);
    updateSl();
    document.getElementById('consMsg').textContent = 'Everything erased from this device.';
  });
  document.addEventListener('click', function (e) {
    var s = e.target.closest('.sw');
    if (s && !s.disabled) {
      var on = s.getAttribute('aria-pressed') === 'true';
      s.setAttribute('aria-pressed', on ? 'false' : 'true');
      s.style.background = on ? 'var(--line)' : 'var(--good)';
      s.querySelector('i').style.left = on ? '3px' : '23px';
    }
  });
}

/* ---------- router ---------- */
function parse() {
  var h = location.hash.replace(/^#/, '') || '/', qi = h.indexOf('?'), q = {};
  if (qi > -1) { h.slice(qi + 1).split('&').forEach(function (kv) { var p = kv.split('='); q[p[0]] = decodeURIComponent(p[1] || ''); }); h = h.slice(0, qi); }
  return { s: h.split('/').filter(Boolean), q: q };
}
function render() {
  var r = parse(), s = r.s, html;
  if (!s.length) html = V.home();
  else if (s[0] === 'search') html = V.search();
  else if (s[0] === 'projects') html = V.projects();
  else if (s[0] === 'project') html = V.project(+s[1], s[2]);
  else if (s[0] === 'compare') html = V.compare(r.q);
  else if (s[0] === 'blog') html = s[1] ? V.blogPost(s[1]) : V.blog();
  else if (s[0] === 'localities') html = V.localities();
  else if (s[0] === 'locality') html = V.locality(s[1]);
  else if (s[0] === 'guides') html = s[1] ? V.guide(s[1]) : V.guides();
  else if (s[0] === 'tools') html = V.tools();
  else if (s[0] === 'shortlist') html = V.shortlist();
  else if (s[0] === 'leads') html = V.leads();
  else if (s[0] === 'market') html = V.market();
  else if (s[0] === 'podcast') html = V.podcast();
  else if (s[0] === 'methodology') html = V.methodology();
  else if (s[0] === 'charter') html = V.charter();
  else if (s[0] === 'developers') html = V.developers();
  else if (s[0] === 'about') html = V.about();
  else if (s[0] === 'team') html = V.team();
  else if (s[0] === 'contact') html = V.contact();
  else if (s[0] === 'careers') html = V.careers();
  else if (s[0] === 'faq') html = V.faq();
  else if (s[0] === 'visit') html = V.visit();
  else if (s[0] === 'privacy') html = V.privacy();
  else if (s[0] === 'consent') html = V.consent();
  else if (s[0] === 'terms') html = V.terms();
  else if (s[0] === 'disclaimer') html = V.disclaimer();
  else if (s[0] === 'grievance') html = V.grievance();
  else html = V.notfound();

  document.getElementById('app').innerHTML = html;
  wireCalc(); wireLoan(); wireCompare(); wireSearch(); wireChips(); wireVisit(); wireNewsletter(); wireMisc();
  updateSl();

  var top = s[0] || '';
  Array.prototype.forEach.call(document.querySelectorAll('#links a'), function (a) {
    var t = a.getAttribute('href').replace('#/', '').split('/')[0];
    a.classList.toggle('on', t === top || (top === 'project' && t === 'projects') || (top === 'locality' && t === 'localities'));
  });
  document.getElementById('links').classList.remove('open');
  window.scrollTo(0, 0);
}

document.addEventListener('click', function (e) {
  var g = e.target.closest('[data-gate]');
  if (g) { e.preventDefault(); requireUser(g.getAttribute('data-gate'), g.getAttribute('data-glabel')); }
});
document.getElementById('ov').addEventListener('click', function (e) { if (e.target === this) closeModal(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
window.addEventListener('hashchange', render);
document.getElementById('home').addEventListener('click', function () { location.hash = '#/'; });
document.getElementById('menu').addEventListener('click', function () { document.getElementById('links').classList.toggle('open'); });
render();
})();
