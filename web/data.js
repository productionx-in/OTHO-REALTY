/* OTHO prototype data.
   Project names, developers and localities are real and publicly listed.
   Sizes, rates, scores and verdicts are ILLUSTRATIVE for prototype purposes
   and are not published OTHO reviews. Verify against TG-RERA before use. */

window.OTHO_DATA = (function () {

  var AMEN = ["Clubhouse","Swimming pool","Gym","Kids play area","Sports courts",
              "Landscaped gardens","Jogging track","Co-working space","EV charging","Power backup"];

  /* 20 Hyderabad projects — real names and developers, indicative figures */
  var P = [
    {n:"Rajapushpa Regalia", dev:"Rajapushpa Properties", loc:"Kokapet", bhk:3, sba:2480, carpet:1735, rate:10800, land:0.98, poss:"Ready", status:"Ready to move", prog:100, score:7.8,
     am:[0,1,2,3,5,6,9], sum:"Ready inventory in a market where almost everything is under construction. You pay for certainty and get it.",
     good:["Ready to move — no construction risk","Established clubhouse and landscaping","Strong resale depth in Kokapet"],
     flag:["Priced at the top of the Kokapet band","Limited remaining inventory and choice of floor","Older specification than 2026 launches"]},

    {n:"Rajapushpa Aurelia", dev:"Rajapushpa Properties", loc:"Kokapet", bhk:3, sba:2610, carpet:1820, rate:11200, land:1.02, poss:"Dec 2027", status:"Under construction", prog:54, score:7.9,
     am:[0,1,2,3,4,5,6,7,9], sum:"One of the better-specified launches in Kokapet, with a loading factor slightly below the local average.",
     good:["30% loading against a Kokapet average nearer 33%","Podium parking keeps ground level open","Developer has a consistent delivery record"],
     flag:["Metro Phase 2 is unfunded — do not price it in","Premium to the layout average is real","Clubhouse completes after tower handover"]},

    {n:"Rajapushpa Atria", dev:"Rajapushpa Properties", loc:"Kokapet", bhk:3, sba:2340, carpet:1640, rate:10400, land:0.94, poss:"Jun 2027", status:"Under construction", prog:71, score:7.3,
     am:[0,1,2,3,5,9], sum:"Sensible mid-premium option. Fewer amenities than the newer launches, and priced accordingly.",
     good:["Advanced construction stage lowers delivery risk","Entry price below the Kokapet median","Compact efficient layouts"],
     flag:["No co-working or EV provision","Smaller clubhouse relative to unit count","Single access road at peak hours"]},

    {n:"Rajapushpa The Retreat", dev:"Rajapushpa Properties", loc:"Kokapet", bhk:4, sba:3480, carpet:2440, rate:11900, land:1.22, poss:"Mar 2028", status:"Under construction", prog:41, score:8.2,
     am:[0,1,2,3,4,5,6,7,8,9], sum:"Low density and the best land share we have modelled in Kokapet. Expensive, and the number behind the price is visible.",
     good:["Best land share per unit in the Kokapet set","Full amenity provision including co-working","30% loading despite large formats"],
     flag:["Highest ticket size in the locality","Possession is two years out","Only two lifts per tower"]},

    {n:"Rajapushpa Eterna", dev:"Rajapushpa Properties", loc:"Gachibowli", bhk:3, sba:2290, carpet:1600, rate:11500, land:0.81, poss:"Sep 2027", status:"Under construction", prog:58, score:7.0,
     am:[0,1,2,3,5,9], sum:"You are buying the Gachibowli commute. Density is high and the land share reflects it.",
     good:["Walk or short drive to most IT campuses","Strongest rental demand in the set","Retail and schools already established"],
     flag:["Low land share per unit","30% loading on compact units","Construction traffic on the approach road"]},

    {n:"My Home Navadweepa", dev:"My Home Constructions", loc:"Kokapet", bhk:3, sba:2705, carpet:1880, rate:11000, land:1.05, poss:"Dec 2028", status:"Under construction", prog:36, score:7.7,
     am:[0,1,2,3,4,5,6,9], sum:"Large-format township product from the most prolific builder in this market. Scale is the advantage and the drawback.",
     good:["Township scale supports amenity depth","Developer delivery record is well documented","Good land share for the price band"],
     flag:["Very large community — expect crowding at peak","Possession over two years away","Internal circulation depends on later phases"]},

    {n:"My Home Nishada", dev:"My Home Constructions", loc:"Kokapet", bhk:3, sba:2560, carpet:1790, rate:10600, land:1.00, poss:"Jun 2027", status:"Under construction", prog:78, score:7.5,
     am:[0,1,2,3,5,6,9], sum:"Nearing completion, priced below the newer launches, and the most predictable option in the locality.",
     good:["78% complete — low delivery risk","Below-median rate for Kokapet","Handover expected within 12 months"],
     flag:["Amenities trail the structure","Limited unit choice remaining","Parking allocation tighter than newer projects"]},

    {n:"My Home Apas", dev:"My Home Constructions", loc:"Kokapet", bhk:4, sba:3260, carpet:2270, rate:11400, land:1.10, poss:"Mar 2029", status:"Newly launched", prog:12, score:7.4,
     am:[0,1,2,3,4,5,6,7,8,9], sum:"Newly launched large formats. Full amenity list on paper; almost none of it built yet.",
     good:["Full amenity specification including pet park","Early-stage pricing advantage","Large 4BHK formats are scarce here"],
     flag:["Only 12% complete — longest delivery risk in the set","Everything is currently a render","Launch pricing typically rises before handover"]},

    {n:"Prestige Clairemont", dev:"Prestige Group", loc:"Kollur", bhk:3, sba:2420, carpet:1690, rate:9600, land:1.08, poss:"Dec 2028", status:"Under construction", prog:29, score:7.6,
     am:[0,1,2,3,4,5,6,7,9], sum:"Strong specification at a Kollur rate. The trade is distance from the office corridor.",
     good:["Materially lower rate than Kokapet for similar spec","Generous land share and open area","National developer with audited accounts"],
     flag:["35+ minutes to Financial District at peak","Retail and schools still thin","Kollur resale market is untested at this price"]},

    {n:"Prestige Golden Grove", dev:"Prestige Group", loc:"Kollur", bhk:3, sba:2280, carpet:1600, rate:9200, land:1.14, poss:"Jun 2029", status:"Newly launched", prog:9, score:7.2,
     am:[0,1,2,3,5,6,9], sum:"The value end of the Prestige range here. Low rate, low completion, long wait.",
     good:["Lowest rate among national-developer stock","High land share per unit","Reservoir-side location"],
     flag:["9% complete — three-year horizon","Infrastructure around it is still forming","Amenities in the final phase"]},

    {n:"Brigade Gateway Towers", dev:"Brigade Group", loc:"Neopolis, Kokapet", bhk:4, sba:3390, carpet:2360, rate:12200, land:0.96, poss:"Dec 2029", status:"Newly launched", prog:7, score:7.1,
     am:[0,1,2,3,4,5,6,7,8,9], sum:"Landmark height on a premium Neopolis parcel. The address is the product; the fundamentals are mid-table.",
     good:["Signature tower with skyline visibility","Mixed-use with commercial on the same parcel","Full amenity provision"],
     flag:["Highest rate in the whole set","Land share below average despite the price","Vertical density means long lift waits at peak","Possession over three years away"]},

    {n:"Sattva Lakeridge", dev:"Sattva Group", loc:"Neopolis, Kokapet", bhk:3, sba:2650, carpet:1845, rate:11300, land:0.99, poss:"Jun 2028", status:"Under construction", prog:44, score:7.4,
     am:[0,1,2,3,4,5,6,9], sum:"Solid Neopolis product at close to the layout average on every measure we track.",
     good:["Balanced across land share, loading and amenity","Lake-facing units on the north edge","Halfway through construction"],
     flag:["30% loading is average, not better","Neopolis has heavy unsold stock — negotiate","Water supply still borewell dependent"]},

    {n:"Godrej Neopolis", dev:"Godrej Properties", loc:"Neopolis, Kokapet", bhk:3, sba:2720, carpet:1900, rate:11600, land:0.88, poss:"Mar 2029", status:"Under construction", prog:24, score:7.0,
     am:[0,1,2,3,4,5,6,7,9], sum:"Single-tower high-rise on a compact parcel. Brand and finish are strong; the land underneath is thin.",
     good:["Listed developer with strong governance","High-quality specification and finishes","Efficient 3BHK layouts"],
     flag:["Low land share — 3.5 acres for a 49-floor tower","Single tower means single point of circulation","Premium is largely brand, not land"]},

    {n:"Aliens Space Station 2", dev:"Aliens Group", loc:"Kokapet", bhk:3, sba:2450, carpet:1690, rate:10200, land:0.90, poss:"Dec 2027", status:"Under construction", prog:49, score:6.5,
     am:[0,1,2,3,5,9], sum:"Distinctive design and an inconsistent delivery history. Price reflects both.",
     good:["Below-median rate for Kokapet","Unusual architecture and layouts","Halfway complete"],
     flag:["31% loading","Developer has delivered late before — check the RERA record","Amenity completion has slipped on earlier phases"]},

    {n:"Aparna Cyber Commune", dev:"Aparna Constructions", loc:"Nallagandla", bhk:3, sba:2180, carpet:1540, rate:8900, land:1.03, poss:"Ready", status:"Ready to move", prog:100, score:7.6,
     am:[0,1,2,3,4,5,6,9], sum:"Ready, established and priced well below the western premium belt. The compromise is address, not quality.",
     good:["Ready to move with amenities operational","Strong value per usable foot","Established schools and retail nearby"],
     flag:["Nallagandla appreciation trails Kokapet","Older specification","Limited inventory left"]},

    {n:"Aparna Sarovar Zenith", dev:"Aparna Constructions", loc:"Nallagandla", bhk:3, sba:2320, carpet:1630, rate:9100, land:1.09, poss:"Ready", status:"Ready to move", prog:100, score:7.7,
     am:[0,1,2,3,4,5,6,7,9], sum:"One of the better ready options in the west. Low density and mature landscaping.",
     good:["Ready with full amenities functioning","High land share per unit","Well-maintained common areas"],
     flag:["Further from the Financial District than Kokapet","Resale premium is modest","No EV charging provision"]},

    {n:"Vasavi Atlantis", dev:"Vasavi Group", loc:"Kokapet", bhk:3, sba:2390, carpet:1660, rate:10500, land:0.92, poss:"Sep 2027", status:"Under construction", prog:63, score:7.0,
     am:[0,1,2,3,5,9], sum:"Mid-market Kokapet option with a reasonable rate and an unremarkable specification.",
     good:["Advanced construction lowers risk","Reasonable entry into Kokapet","Compact, efficient units"],
     flag:["31% loading","Amenity list is thin for the locality","Below-average land share"]},

    {n:"Candeur Landmark", dev:"Candeur Constructions", loc:"Gachibowli", bhk:3, sba:2210, carpet:1550, rate:10900, land:0.79, poss:"Dec 2027", status:"Under construction", prog:52, score:6.7,
     am:[0,1,2,3,5,9], sum:"Close to the office corridor and dense because of it. Convenience is the whole case.",
     good:["Very short commute for IT employees","Strong rental yield potential","Retail at the doorstep"],
     flag:["Lowest land share in the set","30% loading on small units","Congested approach at peak hours"]},

    {n:"NCC Urban One", dev:"NCC Urban", loc:"Narsingi", bhk:3, sba:2050, carpet:1450, rate:8600, land:0.95, poss:"Ready", status:"Ready to move", prog:100, score:7.1,
     am:[0,1,2,3,5,6,9], sum:"Honest value product. Ready, functional, and priced where the location warrants.",
     good:["Lowest ticket size among ready stock","Established community with occupancy","ORR access within minutes"],
     flag:["Smaller unit sizes than the western belt","Arterial road still two lanes at peak","Finishes are functional rather than premium"]},

    {n:"Ramky One Galaxia", dev:"Ramky Estates", loc:"Nallagandla", bhk:2, sba:1480, carpet:1050, rate:8400, land:0.86, poss:"Jun 2027", status:"Under construction", prog:67, score:6.9,
     am:[0,1,2,3,5,9], sum:"The entry point in this set. Small formats, low ticket, and a straightforward proposition.",
     good:["Lowest total price of anything we cover","Advanced construction stage","Good for first-time buyers and investors"],
     flag:["29% loading on already small units","Limited amenity depth","Two-bedroom resale is a thinner market"]}
  ];

  P.forEach(function (p, i) { p.id = i; });

  var L = [
    {slug:"kokapet", n:"Kokapet", blurb:"The premium western micro-market. Highest prices, highest unsold stock, and the widest gap between advertised and real rates.",
     price:"₹10,200–12,200 / sq ft", trend:"+12% year on year",
     infra:[["ORR access","Operational since 2018","CONFIRMED","p-ok"],["Financial District road widening","Funded, under construction","LIKELY","p-ok"],["Metro Phase 2 corridor","Approved, financial sanction pending","UNFUNDED","p-no"],["HMWSSB water line","Proposed, no tender issued","UNCERTAIN","p-mid"]],
     times:[["14 min","Financial District"],["19 min","Gachibowli"],["26 min","HITEC City"],["38 min","Airport"]]},
    {slug:"neopolis-kokapet", n:"Neopolis, Kokapet", blurb:"The HMDA auction layout inside Kokapet. Record land prices, landmark towers, and roughly 40% of launched homes still unsold.",
     price:"₹11,300–12,200 / sq ft", trend:"+9% year on year",
     infra:[["Layout internal roads","Complete","CONFIRMED","p-ok"],["ORR link road","Operational","CONFIRMED","p-ok"],["Metro Phase 2 corridor","Approved, unfunded","UNFUNDED","p-no"],["Sewage capacity upgrade","Under review","UNCERTAIN","p-mid"]],
     times:[["13 min","Financial District"],["18 min","Gachibowli"],["25 min","HITEC City"],["37 min","Airport"]]},
    {slug:"gachibowli", n:"Gachibowli", blurb:"Office core turned residential. You buy the commute and pay for it in loading and density.",
     price:"₹10,900–11,500 / sq ft", trend:"+6% year on year",
     infra:[["Arterial network","Complete","CONFIRMED","p-ok"],["Multi-level parking","Funded","LIKELY","p-ok"],["Metro Phase 2 station","Corridor approved, unfunded","UNFUNDED","p-no"],["Stormwater upgrade","Under review","UNCERTAIN","p-mid"]],
     times:[["8 min","Financial District"],["0 min","Gachibowli"],["18 min","HITEC City"],["44 min","Airport"]]},
    {slug:"narsingi", n:"Narsingi", blurb:"The value corridor. Genuine price advantage, thinner infrastructure, resale depth still being established.",
     price:"₹8,600–9,200 / sq ft", trend:"+14% year on year",
     infra:[["ORR interchange","Operational","CONFIRMED","p-ok"],["Arterial widening","Sanctioned, work not begun","UNCERTAIN","p-mid"],["Metro Phase 2 spur","Not in current DPR","UNFUNDED","p-no"],["Municipal water line","Partially laid","LIKELY","p-ok"]],
     times:[["21 min","Financial District"],["24 min","Gachibowli"],["33 min","HITEC City"],["41 min","Airport"]]},
    {slug:"nallagandla", n:"Nallagandla", blurb:"Mature, established and materially cheaper than the premium belt. Ready inventory actually exists here.",
     price:"₹8,400–9,100 / sq ft", trend:"+8% year on year",
     infra:[["Internal road network","Complete","CONFIRMED","p-ok"],["Schools and healthcare","Operational","CONFIRMED","p-ok"],["Metro Phase 2 corridor","Not in current DPR","UNFUNDED","p-no"],["Lake rejuvenation","Sanctioned","LIKELY","p-ok"]],
     times:[["24 min","Financial District"],["16 min","Gachibowli"],["21 min","HITEC City"],["47 min","Airport"]]},
    {slug:"kollur", n:"Kollur", blurb:"Where the national developers are buying land. Cheapest entry to branded stock, longest commute.",
     price:"₹9,200–9,600 / sq ft", trend:"+16% year on year",
     infra:[["ORR access via Patancheru","Operational","CONFIRMED","p-ok"],["Approach road widening","Funded, under construction","LIKELY","p-ok"],["Metro Phase 2 Patancheru corridor","Priority corridor, unfunded","UNFUNDED","p-no"],["Municipal water","Not yet extended","UNCERTAIN","p-mid"]],
     times:[["36 min","Financial District"],["31 min","Gachibowli"],["29 min","HITEC City"],["58 min","Airport"]]}
  ];

  var BLOG = [
    {slug:"kokapet-unsold", t:"Kokapet has a price problem, and it isn't the price", x:"Roughly 40% of Neopolis stock is unsold while agents quote half the list rate. Here is what that means if you are buying this quarter.", d:"12 Aug 2026", cat:"Market", read:"6 min",
     body:[["p","Neopolis was auctioned at record land rates and launched at record prices. Three years on, a large share of what was launched has not sold, and agents are quoting well below the official rate to move units."],
       ["q","When the grey market sets your price, the advertised number stops being information."],
       ["h","What this means for a buyer"],
       ["p","It means you have room. Not the fantasy discount the agent is quoting, but genuine room on payment schedule, floor rise, parking, and registration costs. Developers with completed inventory and interest running are far more flexible than their sales offices first suggest."],
       ["h","Where the actual value is"],
       ["l",["Near-complete towers where the developer is carrying finance cost","Unsold higher floors in projects that sold out lower ones","Ready inventory in Nallagandla and Narsingi, which never inflated the same way"]],
       ["p","What it does not mean is that everything in Kokapet is a bargain. Land share and loading vary widely inside the same layout, and the cheapest advertised rate in Neopolis is not the cheapest real rate."]]},
    {slug:"metro-phase-2-truth", t:"Metro Phase 2: what is actually funded", x:"Corridors are approved. Financial sanction is not the same thing, and your ROI model should know the difference.", d:"29 Jul 2026", cat:"Infrastructure", read:"5 min",
     body:[["p","Almost every sales pitch in west Hyderabad now mentions Metro Phase 2. Very few mention that the corridors have administrative approval but not full financial sanction, and that construction has not begun on most of them."],
       ["h","Where it actually stands"],
       ["l",["76.4 km approved by the state, with a joint funding structure","Detailed project report submitted and discussed at central level","In-principle agreement on cost sharing","Full financial sanction still pending","Staggered opening targeted between 2028 and 2030"]],
       ["q","An approved corridor and a funded corridor are different assets. Only one of them carries a date."],
       ["h","How to price it"],
       ["p","Treat Metro as an upside case, not a base case. If a project only works financially because of a station that has no sanctioned funding and no construction start, that is not an investment thesis — it is a hope."]]},
    {slug:"loading-factor-trap", t:"The cheaper flat that costs more", x:"A worked example of two real-world Kokapet configurations where the lower advertised rate is the more expensive home.", d:"15 Jul 2026", cat:"Buying", read:"4 min",
     body:[["p","Two flats in the same layout. One advertises ₹10,400 per square foot, the other ₹11,200. The first looks 7% cheaper."],
       ["h","Now put carpet area next to it"],
       ["p","The first quotes 2,340 super built-up against 1,640 RERA carpet — 30% loading. The second quotes 2,610 against 1,820 — also 30%. Same loading, so here the cheaper rate really is cheaper. That is not always true."],
       ["p","Change the first project's carpet to 1,570 and its loading rises to 33%. Its real rate on carpet becomes ₹15,500 against the other's ₹16,060 — still cheaper, but the gap has closed by more than half."],
       ["q","The advertised rate tells you what the developer wants to be compared on."],
       ["h","The habit worth building"],
       ["p","Ask for RERA carpet in writing on every shortlist. Divide total price by carpet. Rank on that number. It takes two minutes and it reorders most shortlists."]]},
    {slug:"ready-vs-under-construction", t:"Ready, or under construction, in this market", x:"With inventory this high, the usual advice about buying early does not hold as cleanly.", d:"2 Jul 2026", cat:"Buying", read:"5 min",
     body:[["p","The standard argument for buying early is that launch pricing is lowest and appreciation accrues to you. That works in a market where supply is tight. Hyderabad's is not."],
       ["h","What high inventory changes"],
       ["l",["Launch pricing advantage narrows when the developer still has unsold stock at handover","Delivery risk is a real cost, not a theoretical one","Ready stock can be negotiated because finance cost is already being carried"]],
       ["q","In a glut, certainty is underpriced and optimism is overpriced."],
       ["h","Who should still buy early"],
       ["p","Buyers with a long horizon, a specific unit requirement that only exists in a new launch, and the tolerance to wait through a slip. Everyone else should at least price the ready option before dismissing it."]]},
    {slug:"what-we-check", t:"The eleven things we check before scoring a project", x:"Our review checklist, published in full, so you can run it yourself.", d:"18 Jun 2026", cat:"Method", read:"7 min",
     body:[["p","Every project we cover goes through the same checklist before a score is assigned. You can run most of it yourself in an afternoon."],
       ["l",["RERA registration in force and the declared possession date","Carpet area per unit type from the filing, not the sales sheet","Sanctioned plan: total land, unit count, floors approved","Land share per unit, calculated from the above","Loading factor per configuration","Water source and whether a municipal connection is sanctioned","Lift count against units per floor","Parking allocation against unit count","Drive times measured in a car at 9am","The developer's completed projects and delivery against declared dates","Litigation disclosures in the filing"]],
       ["q","None of this requires special access. It requires an afternoon and the willingness to read a filing."],
       ["p","Where our assessment adds something is in the comparison — knowing that 30% loading is average here and 27% is genuinely good, because we have measured the whole set."]]},
    {slug:"nri-remote-buying", t:"Buying in Hyderabad from abroad", x:"FEMA rules, repatriation limits, power of attorney, and the mistake that costs NRIs the most.", d:"4 Jun 2026", cat:"NRI", read:"6 min",
     body:[["p","NRIs and OCIs may buy residential and commercial property in India without special permission. Agricultural land, plantations and farmhouses are not permitted."],
       ["h","Paying for it"],
       ["l",["Funds must move through normal banking channels, or from NRE, NRO or FCNR accounts","No payment in foreign currency notes or traveller's cheques","Indian bank home loans are available, repaid from the same accounts"]],
       ["h","Getting money back out"],
       ["p","Sale proceeds from up to two residential properties may be repatriated where the purchase was funded in foreign exchange, subject to applicable limits. Keep every remittance record from day one — reconstructing them years later is painful."],
       ["q","The biggest NRI risk is not fraud. It is buying on a video call from someone paid to sell it."],
       ["h","Power of attorney"],
       ["p","Have it drafted narrowly for the specific transaction rather than granting general authority, and get it attested at the Indian consulate. A general POA handed to a stranger is the single most expensive shortcut in this market."]]}
  ];

  var GUIDES = [
    {slug:"loading-factor", t:"What loading factor really costs you", x:"The single number that decides whether a cheaper flat is actually cheaper.",
     body:[["p","Every price advertised in Hyderabad is quoted on super built-up area. You will never stand in all of it. The gap between what you pay for and what you can use is the loading factor, typically 28% to 35% in the western corridor."],
       ["q","A project advertising 5% cheaper can cost you 2% more per usable foot."],
       ["h","How to work it out"],
       ["p","Take super built-up, subtract RERA carpet, divide by super built-up. A 2,650 sq ft flat with 1,850 carpet carries 30% loading. At ₹11,300 advertised you pay ₹16,190 for every foot you can furnish."],
       ["h","What it buys"],
       ["l",["Lobbies, staircases and lift shafts","Shared corridors on your floor","A proportionate slice of the clubhouse","Service areas and utility rooms"]]]},
    {slug:"carpet-vs-sba", t:"Carpet, built-up, super built-up", x:"Three areas, three meanings, and only one is legally defined.",
     body:[["p","Carpet area is usable floor area within your walls, legally defined since RERA. Built-up adds wall thickness and balcony. Super built-up adds your share of everything communal."],
       ["q","Compare on carpet, or you are not comparing."],
       ["h","Which is quoted"],
       ["p","Almost always super built-up, because it produces the lowest-looking rate. Legal, and the reason two projects quoting similar rates can differ 15% in real cost."]]},
    {slug:"uds", t:"What UDS means for your resale", x:"Undivided share is the land you actually own.",
     body:[["p","You buy two things: the apartment, and an undivided share of the land beneath it. The apartment depreciates. The land does not."],
       ["h","Why it decides redevelopment"],
       ["p","What you are owed in a redevelopment is driven by your undivided share. Sixty flats on an acre gives each owner far more land than two hundred on the same acre."],
       ["q","You are buying land with a building on it, not a building with land under it."]]},
    {slug:"read-rera", t:"How to read a TG-RERA filing", x:"Fifteen minutes on the portal answers most of what a sales office talks around.",
     body:[["p","Every project above eight units or 500 square metres must be registered before marketing. The filing is public and contains what the brochure will not."],
       ["h","What to pull out"],
       ["l",["Declared completion date, against what you were told verbally","Carpet area per unit type","Approved plans and sanctioned floors","Litigation disclosures","The promoter's other projects and their status"]],
       ["q","If the verbal date is earlier than the RERA date, believe the filing."]]},
    {slug:"home-loan", t:"What banks actually check", x:"Approval depends as much on the project as on you.",
     body:[["p","Two things are assessed: your ability to repay, and the asset's suitability as security. Buyers focus on the first and get surprised by the second."],
       ["h","On the project"],
       ["l",["Whether the bank has already approved it","Clear title and approved plans","RERA registration in force","Construction stage and delivery record"]],
       ["p","If no major bank has approved a project, treat that as a finding. Their legal teams looked at the title, and their conclusion is free."]]}
  ];

  var EP = [
    {n:1,t:"Why Kokapet prices are where they are",g:"Founders",d:"14 Aug 2026",len:"38 min"},
    {n:2,t:"What the builder won't explain about loading factor",g:"With a practising architect",d:"28 Aug 2026",len:"41 min"},
    {n:3,t:"Metro Phase 2 — what's actually funded",g:"With an infrastructure journalist",d:"11 Sep 2026",len:"35 min"},
    {n:4,t:"How a developer decides your price",g:"With a Hyderabad developer",d:"25 Sep 2026",len:"44 min"},
    {n:5,t:"Reading a RERA filing before you pay",g:"With a property lawyer",d:"9 Oct 2026",len:"33 min"},
    {n:6,t:"Bharat Future City — the real timeline",g:"With an early land buyer",d:"23 Oct 2026",len:"39 min"}
  ];

  var SCORE = [
    ["Land share per unit","20%","Total land divided by total units, indexed to the market average. The one thing that cannot be renovated later."],
    ["Loading factor","20%","RERA carpet against super built-up, read from the filing rather than the brochure."],
    ["Delivery record","15%","Completed projects and how many landed within the RERA declared date."],
    ["Water security","15%","Municipal connection, sanctioned line, borewell dependency and storage."],
    ["Density and amenity","15%","Families per lift, per clubhouse and per parking level. Comfort in year five."],
    ["Access and commute","15%","Drive times measured at peak hour, and whether improvements are funded or announced."]
  ];

  return {P:P, L:L, BLOG:BLOG, GUIDES:GUIDES, EP:EP, SCORE:SCORE, AMEN:AMEN};
})();
