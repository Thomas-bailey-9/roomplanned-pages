/* RoomPlanned shared catalogue
   One list of products, photos and product drawings used by every page.
   Edit products and photos here only. Product ids are stored in visitors' browsers
   (saved pieces, basket, room plans), so never change an existing id.

   Pages read it from window.RoomPlannedCatalogue:
     products   every product, in shop order
     floor      pieces that can go on a floor plan, in planner order (id, name, short, retailer, room, price, colour, dims)
     photos     product id -> photo link
     product(id) one product by id, or null
     art(p, colour, cls)  photo or drawing for a product, as HTML */
(function(){
  'use strict';

  /* ---------- products ----------
     dims are width × depth × height in cm. price null means "Price to check".
     short is the label drawn on floor plans; only pieces that stand on the floor have one.
     Real products can also carry brand and url (the retailer's product page). */
  const ABEL_SPECS=[['Upholstery','Soft matte velvet'],['Arms','Rounded arms with piping'],['Filling','Foam and fibre seat filling; fibre-filled back cushions'],
    ['Assembly','Part assembled'],['Guarantee','10 years, as listed by Dunelm. See Dunelm for the terms.'],['Arm height','64 cm'],['Back height','51 cm'],['Leg height','4 cm']];
  const ABEL=()=>{
    const base={retailer:'Dunelm',brand:'Dunelm',cat:'Sofas',room:'Living room',family:'abel',material:'Fabric: 100% recycled polyester',delivery:'Check with retailer',popular:6,
      notes:'1 × sofa.',checked:'Price checked on Dunelm, 13 November 2026',
      desc:'A soft matte velvet sofa with rounded, piped arms, foam and fibre seat cushions and fibre-filled back cushions.'};
    const olive=photo=>[{n:'Olive',full:'Matte Soft Velvet Olive',hex:'#796f37',photo}];
    return [
      Object.assign({},base,{id:'abel-2-seater-sofa',name:'Abel Matte Velvet 2 Seater Sofa',version:'2 seater',short:'2 seater',seating:'2 seats',price:549,shape:'sofa',dims:[150,81,88],
        colours:olive('images/products/abel-2-seater-olive.webp'),listedColours:['Navy','Orange Umber'],
        url:'https://www.dunelm.com/product/abel-matte-velvet-2-seater-sofa-1000282323?defaultSkuId=31012949',
        specs:ABEL_SPECS.concat([['Maximum user weight','Tested to 220 kg'],['Packaging','1 box: H 155 × W 93 × D 86 cm, 45 kg packed (box and contents)']])}),
      Object.assign({},base,{id:'abel-3-seater-sofa',name:'Abel Matte Velvet 3 Seater Sofa',version:'3 seater',short:'3 seater',seating:'3 seats',price:599,shape:'sofa',dims:[190,81,88],
        colours:olive('images/products/abel-3-seater-olive.webp'),listedColours:['Navy'],
        url:'https://www.dunelm.com/product/abel-matte-velvet-3-seater-sofa-1000282331?defaultSkuId=31012950',
        specs:ABEL_SPECS.concat([['Maximum user weight','Tested up to 330 kg'],['Packaging','1 box: H 195 × W 86 × D 93 cm, 56 kg packed (box and contents)']])}),
      Object.assign({},base,{id:'abel-chaise-sofa',name:'Abel Matte Velvet Reversible Corner Chaise Sofa',version:'Reversible chaise',short:'Chaise sofa',seating:'3 seats and a chaise',price:949,shape:'chaise',dims:[190,141,88],
        /* planner footprint: an approximate L. 81 cm sofa body with a 71 cm wide chaise; default chaise on the right when facing the sofa, as photographed */
        footprint:{kind:'L',body:81,chaiseW:71,side:'right',approx:true},
        colours:olive('images/products/abel-reversible-chaise-olive.webp'),listedColours:['Navy','Orange Umber'],
        url:'https://www.dunelm.com/product/abel-matte-velvet-reversible-corner-chaise-sofa-1000282339?defaultSkuId=31013004',
        dimsNote:'Overall depth 141 cm includes the chaise. Dunelm’s written listing gives 81 cm, the depth of the sofa itself; the 141 cm comes from Dunelm’s dimension diagram.',
        specs:[['Chaise','Reversible. Photographed with the chaise on the right when facing the sofa (on your left when seated).'],['Chaise width','71 cm'],['Sofa depth without chaise','81 cm']]
          .concat(ABEL_SPECS,[['Maximum user weight','Tested to 220 kg'],['Packaging','1 box: H 195 × W 86 × D 93 cm, 67 kg packed (box and contents)']])}),
      Object.assign({},base,{id:'abel-corner-sofa',name:'Abel Matte Velvet Corner Sofa',version:'Corner sofa',short:'Corner sofa',seating:'4 seats, corner',price:1199,shape:'corner',dims:[243,172,88],
        footprint:{kind:'box',approx:true},config:'Configuration shown',
        colours:olive('images/products/abel-corner-sofa-olive.webp'),listedColours:['Navy','Orange Umber'],
        url:'https://www.dunelm.com/product/abel-matte-velvet-corner-sofa-1000282335',
        dimsNote:'Overall size. Dunelm doesn’t list the inner dimensions, so the planner uses the 243 × 172 cm overall box rather than an exact L shape.',
        specs:[['Configuration','Configuration shown. Dunelm lists a Left Hand Corner (Olive only) and a Right Hand Corner (Olive, Navy and Orange Umber). We haven’t verified which one this photo shows, so check with Dunelm before you buy.']]
          .concat(ABEL_SPECS,[['Maximum user weight','Tested up to 330 kg'],['Packaging','2 boxes: H 177 × W 86 × D 93 cm, 48 kg, and H 170 × W 86 × D 93 cm, 45 kg (packed weights)']])})
    ];
  };
  const PRODUCTS=[
    {id:'rhianna-sofa',name:'Rhianna 3 Seater Fabric Sofa',short:'Sofa',retailer:'Furniture Village',cat:'Sofas',room:'Living room',price:1095,shape:'sofa',colours:[{n:'Teal',hex:'#3f5a57'},{n:'Oatmeal',hex:'#d6cbb7'},{n:'Charcoal',hex:'#55595a'}],dims:[222,95,78],material:'Velvet-touch fabric, hardwood frame',delivery:'4–6 weeks',popular:9},
    {id:'earth-coffee-table',name:'Earth Coffee Table',short:'Coffee table',retailer:'Furniture Village',cat:'Tables',room:'Living room',price:299,shape:'coffee',colours:[{n:'Natural oak',hex:'#c39a62'}],dims:[120,60,45],material:'Solid oak top, powder-coated steel legs',delivery:'1–2 weeks',popular:7},
    {id:'veron-ottoman-bed',name:'Duo+ Collection Veron End Lift Ottoman Bed Frame',short:'Ottoman bed',retailer:'Furniture Village',cat:'Beds',room:'Bedroom',price:549,shape:'bed',colours:[{n:'Silver grey',hex:'#a7a9ad'},{n:'Mink',hex:'#b5a593'}],dims:[150,210,120],material:'Woven fabric, gas-lift storage base',delivery:'3–4 weeks',popular:8},
    {id:'grace-chest',name:'Grace 6 Drawer Wide Chest',short:'Chest',retailer:'Furniture Village',cat:'Storage',room:'Bedroom',price:null,shape:'chest',colours:[{n:'White',hex:'#efeee8'},{n:'Sage',hex:'#a9b8a2'}],dims:[140,45,85],material:'Painted hardwood, soft-close runners',delivery:'Check with retailer',popular:5},
    {id:'mabel-armchair',name:'Mabel Natural Boucle Swivel Armchair',short:'Armchair',retailer:'Homebase',brand:'Kyoto Futons',cat:'Sofas',room:'Living room',price:545,shape:'armchair',colours:[{n:'Natural',hex:'#a49e94'}],dims:[74,80,75.5],material:'Boucle (95% polyester, 5% cotton), rubber wood and plywood',delivery:'Check with retailer',popular:10,url:'https://www.homebase.co.uk/en-uk/mabel-natural-boucle-swivel-armchair/p/0806851'},
    /* Abel collection (Dunelm): four separate sofas shown together as one collection card in the shop.
       Prices, colours and specifications checked on dunelm.com on 13 November 2026 (not live prices, stock or delivery).
       Only Olive has photographs here, so only Olive can be chosen; other colours Dunelm lists are named in listedColours. */
    ...ABEL(),
    {id:'fenwick-dining-table',name:'Fenwick 4 Seat Dining Table',short:'Dining table',retailer:'Oakhaven Home',cat:'Tables',room:'Dining room',price:649,shape:'dining',colours:[{n:'Walnut',hex:'#8a6440'},{n:'Light oak',hex:'#c9a777'}],dims:[160,90,76],material:'Walnut veneer, solid legs',delivery:'2–4 weeks',popular:6},
    /* Holden: details and price checked on dunelm.com on 13 November 2026. Not a live price, stock or delivery check.
       One finish only. dims are the product itself; drawer and packaging sizes are kept separately in specs. */
    {id:'holden-bedside',name:'Holden 1 Drawer Bedside Table, Oak',short:'Bedside',retailer:'Dunelm',brand:'Dunelm',cat:'Storage',room:'Bedroom',price:74.5,shape:'bedside',
      colours:[{n:'Oak',hex:'#c79f6f'}],dims:[39,35,59],
      material:'Oak, rubber wood, pine and MDF, with oak veneers (as listed by Dunelm)',delivery:'Check with retailer',popular:8,url:'https://www.dunelm.com/product/holden-1-drawer-bedside-table-1000280175',
      desc:'A compact oak bedside table with a white-washed finish, one drawer, an open shelf and a long metal handle.',
      notes:'1 × bedside table, ready assembled.',
      specs:[['Finish','Oak, white-washed with natural wood grain (as described by Dunelm)'],['Storage','1 drawer and 1 open shelf'],['Assembly','Ready assembled'],
        ['Drawer size','W 28.5 × D 29 × H 13.5 cm'],['Packaging','1 box: W 46 × D 66 × H 41 cm, 12 kg packed (box and contents)']],
      checked:'Price checked on Dunelm, 13 November 2026'},
    {id:'wren-bookcase',name:'Wren Tall Bookcase',short:'Bookcase',retailer:'Oakhaven Home',cat:'Storage',room:'Living room',price:259,shape:'bookcase',colours:[{n:'Ash',hex:'#d7c2a0'}],dims:[80,32,180],material:'Ash veneer, adjustable shelves',delivery:'1–2 weeks',popular:4},
    /* Galley: prices, sizes and colours checked on dunelm.com on 12 November 2026. price is the lowest size ("From £8").
       Each size has its own price; each colour has its own photo. It hangs from the ceiling, so the planner keeps it apart from floor pieces. */
    {id:'arlo-pendant',name:'Galley Gloss Easy Fit Pendant Shade',short:'Pendant',retailer:'Dunelm',brand:'Dunelm',cat:'Lighting',room:'Dining room',price:8,shape:'pendant',ceiling:true,
      colours:[{n:'Ivory',hex:'#e6e0d2',photo:'images/products/galley-pendant-shade-ivory.webp'},{n:'Anthracite',hex:'#56575a',photo:'images/products/galley-pendant-shade-anthracite.webp'}],
      sizes:[{n:'19cm diameter',spec:'H 19cm × Dia. 19cm',dia:19,h:19,price:8},{n:'29cm diameter',spec:'H 16cm × Dia. 29cm',dia:29,h:16,price:10},{n:'40cm diameter',spec:'H 24cm × Dia. 40cm',dia:40,h:24,price:20}],defaultSize:1,
      dims:[29,29,16],material:'Metal, gloss finish',delivery:'Check with retailer',popular:9,url:'https://www.dunelm.com/product/galley-easy-fit-pendant-shade-1000120313',
      desc:'A dome-shaped gloss metal pendant shade. It attaches to your existing ceiling light fitting, so no wiring or electrician is needed. The cord and bulb holder shown in the photos are not included.',
      notes:'Shade only: 1 × pendant shade. Takes 1 bulb, maximum 8W (bulb not included). Indoor use. Wipe clean with a soft cloth.',checked:'Price checked on Dunelm, 12 November 2026'},
    /* Tahara: details and price checked on dunelm.com on 13 November 2026. Not a live price, stock or delivery check.
       One colour and one size only. A decor piece, so it has no floor footprint in the planner. */
    {id:'tahara-vase',name:'Cedar & Sage Tahara Stoneware Vase',retailer:'Dunelm',brand:'Cedar & Sage',cat:'Decor',room:'Living room',price:13,shape:'vase',
      colours:[{n:'Cream',hex:'#d6d0c4'}],dims:[13.5,13.5,14.5],material:'Stoneware',delivery:'Check with retailer',popular:7,
      url:'https://www.dunelm.com/product/cedar-sage-tahara-stoneware-vase-1000273493',
      desc:'A compact cream stoneware vase with a glossy glaze and a classic milk-churn shape. A neutral finishing touch for shelves, sideboards and bedside tables.',
      notes:'1 × vase.',
      specs:[['Finish','Soft cream glaze, glossy'],['Shape','Classic milk-churn silhouette'],['Use','Indoor'],['Care','Wipe clean with a soft cloth']],
      checked:'Price checked on Dunelm, 13 November 2026'},
    {id:'rowan-bed',name:'Rowan Upholstered Double Bed',short:'Double bed',retailer:'Linden & Co',cat:'Beds',room:'Bedroom',price:699,shape:'bed',colours:[{n:'Stone',hex:'#bdb5a6'},{n:'Forest',hex:'#3d5545'}],dims:[145,205,115],material:'Linen blend, slatted base',delivery:'3–5 weeks',popular:5}
  ];

  /* Order pieces appear in the planner's "Add furniture" list */
  const FLOOR_ORDER=['rhianna-sofa','abel-2-seater-sofa','abel-3-seater-sofa','abel-chaise-sofa','abel-corner-sofa','mabel-armchair','earth-coffee-table','wren-bookcase','veron-ottoman-bed','rowan-bed','holden-bedside','grace-chest','fenwick-dining-table'];

  /* ---------- photos ----------
     Add a link and that piece shows the photo on every page.
     Pieces without a photo, or whose photo fails to load, show the drawing instead.
     Only use photos you have permission to show. */
  const PHOTOS={
    'rhianna-sofa':'https://media.furniturevillage.co.uk/i/fv/PRODZFRSP000000000069104_rhianna_3-seater-fabric-sofa_aston-seafoam-47520?$product$&w=577&fmt=auto',
    'veron-ottoman-bed':'https://media.furniturevillage.co.uk/i/fv/PRODZFRSP000000000064700_veron_end-lift-ottoman-frame_silver_4ft6?$large$&w=648&fmt=auto',
    'earth-coffee-table':'https://media.furniturevillage.co.uk/i/fv/PRODEATHCFTB--001_earth_coffee-table?$large$',
    'grace-chest':'https://media.furniturevillage.co.uk/i/fv/PRODZFRSP000000000054937_grace_6-drawer-wide-chest_white?$medium$&fmt=auto',
    'mabel-armchair':'images/products/mabel-natural-boucle-swivel-armchair.webp',
    'arlo-pendant':'images/products/galley-pendant-shade-ivory.webp',
    'holden-bedside':'images/products/holden-1-drawer-bedside-table-oak.webp',
    'tahara-vase':'images/products/cedar-sage-tahara-stoneware-vase-cream.webp'
  };

  /* ---------- drawings (used when there is no photo) ---------- */
  function shade(hex, amt){const n=parseInt(hex.slice(1),16);let r=(n>>16)+amt,g=(n>>8&255)+amt,b=(n&255)+amt;const c=v=>Math.max(0,Math.min(255,v));return '#'+((1<<24)+(c(r)<<16)+(c(g)<<8)+c(b)).toString(16).slice(1)}
  const LEG='#4a4643';
  const ART = {
    sofa(c){const d=shade(c,-22),l=shade(c,14);let ch='';for(let x=52;x<200;x+=19)ch+=`<path d="M${x} 50v40" stroke="${d}" stroke-width="2.5"/>`;
      return `<ellipse cx="120" cy="136" rx="104" ry="7" fill="#000" opacity=".07"/><rect x="34" y="40" width="172" height="62" rx="20" fill="${c}"/>${ch}<rect x="30" y="88" width="180" height="34" rx="12" fill="${l}"/><path d="M60 90v30M95 90v30M130 90v30M165 90v30" stroke="${d}" stroke-width="1.5" opacity=".5"/><rect x="16" y="66" width="30" height="62" rx="14" fill="${c}"/><rect x="194" y="66" width="30" height="62" rx="14" fill="${c}"/><rect x="30" y="127" width="6" height="8" fill="${LEG}"/><rect x="204" y="127" width="6" height="8" fill="${LEG}"/>`},
    corner(c){const d=shade(c,-20),l=shade(c,12);return `<ellipse cx="120" cy="138" rx="108" ry="7" fill="#000" opacity=".07"/><rect x="20" y="44" width="200" height="50" rx="14" fill="${c}"/><rect x="20" y="86" width="140" height="34" rx="10" fill="${l}"/><rect x="150" y="80" width="70" height="52" rx="10" fill="${l}"/><path d="M150 92v28M80 90v28M115 90v28" stroke="${d}" stroke-width="1.5" opacity=".6"/><rect x="10" y="70" width="24" height="58" rx="10" fill="${c}"/><circle cx="60" cy="72" r="14" fill="${shade(c,-35)}"/><circle cx="190" cy="68" r="13" fill="#d9cfbd"/>`},
    chaise(c){const d=shade(c,-20),l=shade(c,12);return `<ellipse cx="120" cy="138" rx="108" ry="7" fill="#000" opacity=".07"/><rect x="30" y="44" width="180" height="50" rx="14" fill="${c}"/><rect x="30" y="86" width="110" height="34" rx="10" fill="${l}"/><rect x="132" y="82" width="78" height="50" rx="10" fill="${l}"/><path d="M85 90v28M132 90v28" stroke="${d}" stroke-width="1.5" opacity=".6"/><rect x="18" y="70" width="24" height="58" rx="10" fill="${c}"/>`},
    armchair(c){const d=shade(c,-14);return `<ellipse cx="120" cy="140" rx="64" ry="6" fill="#000" opacity=".07"/><path d="M70 40q50-22 100 0v60H70Z" fill="${c}"/><rect x="72" y="92" width="96" height="32" rx="12" fill="${shade(c,8)}"/><rect x="56" y="70" width="26" height="58" rx="13" fill="${d}"/><rect x="158" y="70" width="26" height="58" rx="13" fill="${d}"/><path d="M76 128l-4 10M164 128l4 10" stroke="#8a6440" stroke-width="4" stroke-linecap="round"/><g fill="${shade(c,-8)}" opacity=".5"><circle cx="100" cy="60" r="2"/><circle cx="120" cy="54" r="2"/><circle cx="140" cy="60" r="2"/><circle cx="110" cy="76" r="2"/><circle cx="130" cy="76" r="2"/></g>`},
    coffee(c){return `<ellipse cx="120" cy="128" rx="96" ry="6" fill="#000" opacity=".07"/><rect x="28" y="64" width="184" height="14" rx="3" fill="${c}"/><path d="M28 70h184" stroke="${shade(c,-25)}" stroke-width="1" opacity=".5"/><path d="M40 72q10 0 6 18" stroke="${shade(c,-30)}" opacity=".3"/><path d="M58 78l-6 46h10l6-46M182 78l6 46h-10l-6-46" fill="#55524e"/>`},
    dining(c){return `<ellipse cx="120" cy="140" rx="100" ry="6" fill="#000" opacity=".07"/><rect x="22" y="56" width="196" height="12" rx="2" fill="${c}"/><rect x="30" y="68" width="180" height="8" fill="${shade(c,-18)}"/><path d="M36 76h10l-2 60h-6ZM194 76h10l-2 60h-6Z" fill="${shade(c,-12)}"/><path d="M60 76h8l-2 54h-4ZM172 76h8l-2 54h-4Z" fill="${shade(c,-30)}"/>`},
    bed(c){const d=shade(c,-18);return `<ellipse cx="120" cy="140" rx="104" ry="6" fill="#000" opacity=".07"/><rect x="40" y="22" width="160" height="78" rx="6" fill="${c}"/><path d="M56 22v78M72 22v78M88 22v78M104 22v78M120 22v78M136 22v78M152 22v78M168 22v78M184 22v78" stroke="${d}" stroke-width="1.4" opacity=".6"/><rect x="32" y="82" width="176" height="24" rx="6" fill="#f6f5f1" stroke="#dcdad3"/><path d="M40 94h160" stroke="#e5e3dc"/><rect x="58" y="70" width="52" height="18" rx="8" fill="#fbfaf7" stroke="#e1dfd8"/><rect x="130" y="70" width="52" height="18" rx="8" fill="#fbfaf7" stroke="#e1dfd8"/><rect x="28" y="104" width="184" height="28" rx="4" fill="${c}"/><rect x="32" y="132" width="8" height="6" fill="${LEG}"/><rect x="200" y="132" width="8" height="6" fill="${LEG}"/>`},
    chest(c){const d=shade(c,-28);let r='';for(let i=0;i<3;i++){const y=40+i*30;r+=`<rect x="54" y="${y}" width="64" height="26" rx="2" fill="${shade(c,4)}" stroke="${d}" stroke-width="1.2"/><rect x="122" y="${y}" width="64" height="26" rx="2" fill="${shade(c,4)}" stroke="${d}" stroke-width="1.2"/><circle cx="86" cy="${y+13}" r="3" fill="#b9b4aa"/><circle cx="154" cy="${y+13}" r="3" fill="#b9b4aa"/>`}
      return `<ellipse cx="120" cy="142" rx="80" ry="6" fill="#000" opacity=".07"/><rect x="46" y="30" width="148" height="104" rx="3" fill="${c}" stroke="${d}" stroke-width="1.2"/><rect x="42" y="26" width="156" height="8" rx="2" fill="${shade(c,8)}" stroke="${d}" stroke-width="1.2"/>${r}<rect x="50" y="134" width="8" height="6" fill="${d}"/><rect x="182" y="134" width="8" height="6" fill="${d}"/>`},
    bedside(c){const d=shade(c,-30);return `<ellipse cx="120" cy="142" rx="52" ry="5" fill="#000" opacity=".07"/><rect x="78" y="54" width="84" height="74" rx="3" fill="${c}"/><rect x="84" y="62" width="72" height="26" rx="2" fill="${shade(c,8)}" stroke="${d}" stroke-width="1"/><rect x="84" y="94" width="72" height="26" rx="2" fill="${shade(c,8)}" stroke="${d}" stroke-width="1"/><rect x="108" y="73" width="24" height="4" rx="2" fill="${d}"/><rect x="108" y="105" width="24" height="4" rx="2" fill="${d}"/><path d="M84 128l-3 12M156 128l3 12" stroke="${d}" stroke-width="4"/><rect x="104" y="40" width="18" height="14" rx="3" fill="#e5e0d6"/><path d="M113 40c0-10 8-16 14-20" stroke="#6f8a62" stroke-width="2" fill="none"/>`},
    bookcase(c){const d=shade(c,-30);const bk=['#6f8a62','#c9b48e','#3f5a57','#b45f3f','#d8d2c4','#8a6440'];let b='';[[30,40],[64,74],[98,108]].forEach(([y],i)=>{let x=86;for(let k=0;k<5;k++){const w=6+((k+i)%3)*3,h=22-((k*7+i)%8);b+=`<rect x="${x}" y="${y+30-h}" width="${w}" height="${h}" fill="${bk[(k+i*2)%6]}"/>`;x+=w+2}});
      return `<ellipse cx="120" cy="148" rx="58" ry="5" fill="#000" opacity=".07"/><rect x="76" y="18" width="88" height="128" rx="2" fill="${c}" stroke="${d}"/><rect x="82" y="24" width="76" height="116" fill="${shade(c,-12)}"/><path d="M82 60h76M82 94h76M82 128h76" stroke="${c}" stroke-width="4"/>${b}<circle cx="142" cy="120" r="8" fill="#e5e0d6"/>`},
    pendant(c){return `<path d="M120 0v52" stroke="#3b3835" stroke-width="2"/><rect x="114" y="48" width="12" height="10" rx="2" fill="#b38b4d"/><path d="M72 106q0-48 48-48t48 48Z" fill="${c}"/><path d="M72 106h96" stroke="${shade(c,-25)}" stroke-width="2"/><ellipse cx="120" cy="110" rx="16" ry="6" fill="#ffe8a8"/><ellipse cx="120" cy="140" rx="70" ry="8" fill="#ffe8a8" opacity=".35"/>`},
    vase(c){return `<ellipse cx="120" cy="142" rx="46" ry="5" fill="#000" opacity=".07"/><g stroke="#6f8a62" stroke-width="2" fill="none"><path d="M120 70C114 40 96 26 80 16M120 70c4-26 20-42 42-50M120 70c-2-20 0-40 4-56"/></g><g fill="#7f9a70"><ellipse cx="92" cy="26" rx="7" ry="3" transform="rotate(-30 92 26)"/><ellipse cx="104" cy="38" rx="7" ry="3" transform="rotate(-50 104 38)"/><ellipse cx="148" cy="28" rx="7" ry="3" transform="rotate(30 148 28)"/><ellipse cx="136" cy="42" rx="7" ry="3" transform="rotate(50 136 42)"/><ellipse cx="124" cy="22" rx="6" ry="3" transform="rotate(80 124 22)"/></g><path d="M106 70h28c0 10 16 22 16 42 0 18-14 28-30 28s-30-10-30-28c0-20 16-32 16-42Z" fill="${c}"/><path d="M96 100c10 4 38 4 48 0" stroke="${shade(c,-20)}" opacity=".5" fill="none"/>`}
  };
  const art = (p, colour, cls='art') => {
    const svg=`<svg class="${cls}" viewBox="0 0 240 160" role="img" aria-label="${p.name}">${ART[p.shape](colour||p.colours[0].hex)}</svg>`;
    /* a colour with its own photo shows that photo; otherwise the main photo shows the first colour, another listed colour shows the drawing,
       and an old colour saved before a product changed shows the main photo */
    const c=p.colours.find(x=>x.hex===colour)||(colour?null:p.colours[0]);
    const url=c&&c.photo||(c&&c!==p.colours[0]?null:PHOTOS[p.id]),alt=p.colours.some(x=>x.photo)?`${p.name} in ${(c||p.colours[0]).n}`:p.name;
    if(!url)return svg;
    return `<span class="ph"><img src="${url}" alt="${alt}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('err')">${svg}</span>`;
  };

  /* £1,095, or £74.50 when there are pence */
  const money=v=>'£'+Number(v).toLocaleString('en-GB',{minimumFractionDigits:Number(v)%1?2:0,maximumFractionDigits:2});

  /* ---------- options: colour and size ----------
     A basket line, saved piece or planned piece can remember {colour, size} by name. */
  const sizeOf=(p,n)=>p&&p.sizes?(p.sizes.find(s=>s.n===n)||p.sizes[p.defaultSize||0]):null;
  const colourOf=(p,n)=>p.colours.find(c=>c.n===n)||p.colours[0];
  const unitPrice=(p,size)=>{const s=sizeOf(p,size);return s?s.price:p.price};
  /* "From £8" when a piece comes in sizes at different prices and no size is chosen */
  const priceText=(p,size)=>{const v=size?unitPrice(p,size):p.price;if(v===null||v===undefined)return p.url?`Check price at ${p.retailer}`:'Price to check';
    return (!size&&p.sizes?'From ':'')+money(v)};
  /* bring a line saved before a product changed up to date: unknown colours become the first colour, a missing size the default size */
  const fixVariant=l=>{const p=byId[l.id];if(!p||!p.sizes)return l;const c=colourOf(p,l.colour);l.colour=c.n;l.hex=c.hex;l.size=sizeOf(p,l.size).n;return l};

  const byId=Object.fromEntries(PRODUCTS.map(p=>[p.id,p]));
  /* sample products that were withdrawn without an automatic replacement: saved data keeps them until the visitor chooses one */
  const LEGACY={'sienna-corner-sofa':{name:'Sienna Velvet Corner Sofa',retailer:'Linden & Co',price:1499,dims:[268,180,84],colour:'#6d6b3c',family:'abel'}};
  const FLOOR=FLOOR_ORDER.map(id=>{const p=byId[id];return{id:p.id,name:p.name,short:p.short,retailer:p.retailer,room:p.room,price:p.price,colour:p.colours[0].hex,dims:p.dims}})
    /* placeholders so older plans still draw; never offered in the planner's add list */
    .concat(Object.entries(LEGACY).map(([id,o])=>({id,name:o.name+' (replaced sample)',short:'Replaced sample',retailer:o.retailer,room:'Living room',price:null,colour:'#a3a596',dims:o.dims,replaced:true})));

  /* collections: several products shown as one card in the shop */
  const FAMILIES={abel:{id:'abel-sofa-collection',key:'abel',name:'Abel Matte Velvet Sofa Collection',styles:'4 sofa styles',retailer:'Dunelm',cat:'Sofas',room:'Living room',popular:6,
    members:['abel-2-seater-sofa','abel-3-seater-sofa','abel-chaise-sofa','abel-corner-sofa'],cardPhoto:'abel-3-seater-sofa'}};

  /* the floor area a placed piece covers, as rectangles in plan centimetres. Most pieces are one rectangle;
     the chaise sofa is an approximate L. item: {id, x, y, r, side} */
  const floorById=Object.fromEntries(FLOOR.map(f=>[f.id,f]));
  function rects(item){
    const f=floorById[item.id];if(!f)return [];
    const W=f.dims[0],D=f.dims[1],r=(((item.r||0)%360)+360)%360,p=byId[item.id],fp=p&&p.footprint;
    let local=[[0,0,W,D]];
    if(fp&&fp.kind==='L'){const right=(item.side||fp.side)==='right';local=[[0,0,W,fp.body],right?[W-fp.chaiseW,fp.body,W,D]:[0,fp.body,fp.chaiseW,D]]}
    return local.map(([u0,v0,u1,v1])=>{let x0,x1,y0,y1;
      if(r===90){x0=D-v1;x1=D-v0;y0=u0;y1=u1}else if(r===180){x0=W-u1;x1=W-u0;y0=D-v1;y1=D-v0}else if(r===270){x0=v0;x1=v1;y0=W-u1;y1=W-u0}else{x0=u0;x1=u1;y0=v0;y1=v1}
      return {x:item.x+x0,y:item.y+y0,w:x1-x0,d:y1-y0}});
  }
  const area=item=>rects(item).reduce((s,r)=>s+r.w*r.d,0);
  /* outline points of a placed piece, relative to its top-left corner, for drawing (an L for the chaise sofa) */
  function outline(item){
    const f=floorById[item.id];if(!f)return [];const W=f.dims[0],D=f.dims[1],r=(((item.r||0)%360)+360)%360,p=byId[item.id],fp=p&&p.footprint;
    let pts=[[0,0],[W,0],[W,D],[0,D]];
    if(fp&&fp.kind==='L'){const b=fp.body,cw=fp.chaiseW;pts=(item.side||fp.side)==='right'?[[0,0],[W,0],[W,D],[W-cw,D],[W-cw,b],[0,b]]:[[0,0],[W,0],[W,b],[cw,b],[cw,D],[0,D]]}
    return pts.map(([u,v])=>r===90?[D-v,u]:r===180?[W-u,D-v]:r===270?[v,W-u]:[u,v]);
  }
  const rectsOverlap=(A,B)=>A.some(a=>B.some(b=>a.x<b.x+b.w&&b.x<a.x+a.w&&a.y<b.y+b.d&&b.y<a.y+a.d));
  /* pieces that hang from the ceiling (shown on the plan, but not counted as floor space) */
  const CEILING=PRODUCTS.filter(p=>p.ceiling).map(p=>p.id);

  /* ---------- retired sample pieces ----------
     Sample products that were replaced by real ones. Old ids still saved in visitors' browsers are moved to the
     replacement once (plans keep their position, rotation and count; basket lines keep their quantity), and a
     one-time notice explains what changed, because the size and price differ. */
  const RETIRED={
    'hollis-bedside':{to:'holden-bedside',name:'Hollis Oak Bedside Table',retailer:'Oakhaven Home',price:179,dims:[48,40,58],floor:true},
    'ida-vase':{to:'tahara-vase',name:'Ida Stoneware Vase',retailer:'Harbour Living',price:34}
  };
  const resolve=id=>RETIRED[id]?RETIRED[id].to:id;
  const NOTICE_KEY='rp-notices';
  function store(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
  function load(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
  function migrate(){
    const hits={},hit=(id,place)=>{(hits[id]=hits[id]||new Set()).add(place)};
    /* room plans: swap the id in place */
    const plan=load('rp-plan');
    if(plan&&plan.plans&&typeof plan.plans==='object'){let n=0;
      Object.values(plan.plans).forEach(r=>[].concat(r&&Array.isArray(r.items)?r.items:[],r&&Array.isArray(r.ceiling)?r.ceiling:[]).forEach(i=>{if(i&&RETIRED[i.id]){hit(i.id,'plan');i.id=RETIRED[i.id].to;n++}}));
      if(n&&!store('rp-plan',plan))Object.values(hits).forEach(s=>s.delete('plan'))}
    /* shop: saved pieces, their saved options, and basket lines (same piece and colour are merged, quantities added) */
    const shop=load('rp-shop');
    if(shop&&typeof shop==='object'){let n=0;const local={};
      if(Array.isArray(shop.saved)&&shop.saved.some(id=>RETIRED[id])){shop.saved.forEach(id=>{if(RETIRED[id])local[id]=1});shop.saved=[...new Set(shop.saved.map(resolve))];n++}
      if(shop.savedVar&&typeof shop.savedVar==='object')Object.keys(shop.savedVar).forEach(id=>{if(RETIRED[id]){const to=RETIRED[id].to;if(!shop.savedVar[to])shop.savedVar[to]={colour:byId[to].colours[0].n};delete shop.savedVar[id];local[id]=1;n++}});
      if(Array.isArray(shop.bag)&&shop.bag.some(l=>l&&RETIRED[l.id])){const out=[];
        shop.bag.forEach(l=>{if(!l)return;if(RETIRED[l.id]){local[l.id]=1;const p=byId[RETIRED[l.id].to],c=p.colours[0];l={id:p.id,colour:c.n,hex:c.hex,qty:Math.max(1,+l.qty||1)}}
          const same=out.find(o=>o.id===l.id&&o.colour===l.colour&&o.size===l.size);same?same.qty+=l.qty:out.push(l)});
        shop.bag=out;n++}
      if(n&&store('rp-shop',shop))Object.keys(local).forEach(id=>hit(id,'shop'))}
    /* saved renders keep a list of the piece ids in the room */
    const rend=load('rp-renders');
    if(Array.isArray(rend)){const local={};rend.forEach(r=>{if(r&&r.snap&&Array.isArray(r.snap.items))r.snap.items=r.snap.items.map(id=>{if(RETIRED[id]){local[id]=1;return RETIRED[id].to}return id})});
      if(Object.keys(local).length&&store('rp-renders',rend))Object.keys(local).forEach(id=>hit(id,'renders'))}
    const ids=Object.keys(hits).filter(id=>hits[id].size);
    if(ids.length){const notes=load(NOTICE_KEY)||{};
      ids.forEach(id=>{const prev=notes[id]&&!notes[id].seen?notes[id].where:[];notes[id]={where:[...new Set([...prev,...hits[id]])],seen:false,at:Date.now()}});
      store(NOTICE_KEY,notes)}
  }
  migrate();

  /* one-time notice, shown on any page that loads the catalogue, until the visitor dismisses it */
  const PLACES={plan:'your room plans',shop:'your saved pieces and basket',renders:'your saved renders'};
  const listJoin=a=>a.length>1?a.slice(0,-1).join(', ')+' and '+a[a.length-1]:a[0];
  const dimText=a=>`${a[0]} × ${a[1]} × ${a[2]} cm`;
  function noticeText(id,n){
    const o=RETIRED[id],p=byId[o.to],c=p.colours[0].n,where=listJoin(n.where.map(w=>PLACES[w]).filter(Boolean));
    const size=o.floor?`It’s a different size (${dimText(p.dims)}, was ${dimText(o.dims)}) and price (${money(p.price)}, was ${money(o.price)}).`:`It costs ${money(p.price)} (was ${money(o.price)}).`;
    const end=o.floor&&n.where.includes('plan')?'Positions and quantities are unchanged, so check your room’s fit notes and totals.':'Quantities are unchanged, so check your totals.';
    return `The ${o.name} from ${o.retailer} was example data. In ${where} it’s now the real ${p.name} from ${p.retailer}. ${size} It comes in one ${o.floor?'finish':'colour'}, ${c}, so any other colour you’d chosen is now ${c}. ${end}`;
  }
  function showNotice(){
    const notes=load(NOTICE_KEY)||{};const ids=Object.keys(notes).filter(id=>RETIRED[id]&&notes[id]&&!notes[id].seen&&Array.isArray(notes[id].where));
    if(!ids.length||document.getElementById('rpNotice'))return;
    const box=document.createElement('div');box.id='rpNotice';box.setAttribute('role','status');
    box.style.cssText='position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:120;width:min(560px,calc(100% - 24px));max-height:calc(100vh - 120px);overflow:auto;'+
      'background:var(--surface,#fff);color:var(--ink,#16251f);border:1px solid var(--line,#e3e1da);border-left:5px solid var(--green,#2c4a3b);border-radius:14px;'+
      'box-shadow:0 10px 30px rgba(0,0,0,.18);padding:14px 16px;font:14px/1.45 var(--font,system-ui,sans-serif);display:flex;gap:12px;align-items:flex-start';
    box.innerHTML=`<div style="flex:1;min-width:0"><b style="display:block;margin-bottom:2px">${ids.length>1?'We’ve replaced some sample pieces':'We’ve replaced a sample piece'}</b>`+
      ids.map(id=>`<p style="margin:0 0 6px">${noticeText(id,notes[id])}</p>`).join('')+
      `</div><button type="button" style="flex:none;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--green,#2c4a3b);background:var(--green,#2c4a3b);color:var(--green-ink,#fff);font:600 14px var(--font,system-ui,sans-serif);cursor:pointer">OK</button>`;
    box.querySelector('button').addEventListener('click',()=>{const cur=load(NOTICE_KEY)||{};ids.forEach(id=>{if(cur[id])cur[id].seen=true});store(NOTICE_KEY,cur);box.remove()});
    document.body.appendChild(box);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',showNotice);else showNotice();

  /* ---------- withdrawn samples the visitor replaces themselves ----------
     Sienna is not swapped automatically: Abel comes in four sizes, so the visitor chooses one.
     legacyRefs(id) says where the old id is still saved; replaceLegacy() swaps it for the chosen version,
     keeping basket quantities and room positions, so costs and fit notes are recalculated from then on. */
  function legacyRefs(id){
    const out={saved:false,bag:0,plan:[],renders:0};
    const shop=load('rp-shop');if(shop){out.saved=Array.isArray(shop.saved)&&shop.saved.includes(id);out.bag=(Array.isArray(shop.bag)?shop.bag:[]).filter(l=>l&&l.id===id).reduce((s,l)=>s+(+l.qty||1),0)}
    const plan=load('rp-plan');if(plan&&plan.plans)Object.entries(plan.plans).forEach(([room,r])=>{const n=(r&&Array.isArray(r.items)?r.items:[]).filter(i=>i&&i.id===id).length;if(n)out.plan.push({room,n})});
    const rend=load('rp-renders');if(Array.isArray(rend))out.renders=rend.filter(r=>r&&r.snap&&Array.isArray(r.snap.items)&&r.snap.items.includes(id)).length;
    out.any=out.saved||out.bag>0||out.plan.length>0||out.renders>0;return out;
  }
  function replaceLegacy(id,to,colour,only){
    const p=byId[to];if(!p||!LEGACY[id])return false;const c=colourOf(p,colour);let ok=true;
    const want=k=>!only||only.includes(k);
    const shop=load('rp-shop');
    if(shop&&(want('saved')||want('bag'))){
      if(want('saved')&&Array.isArray(shop.saved)&&shop.saved.includes(id)){shop.saved=[...new Set(shop.saved.map(x=>x===id?to:x))];shop.savedVar=shop.savedVar||{};shop.savedVar[to]={colour:c.n}}
      if(want('bag')&&Array.isArray(shop.bag)){const out=[];shop.bag.forEach(l=>{if(!l)return;if(l.id===id){l={id:to,colour:c.n,hex:c.hex,qty:Math.max(1,+l.qty||1)};if(p.config)l.config=p.config}
        const same=out.find(o=>o.id===l.id&&o.colour===l.colour&&o.size===l.size&&o.config===l.config);same?same.qty+=l.qty:out.push(l)});shop.bag=out}
      ok=store('rp-shop',shop)&&ok}
    const plan=load('rp-plan');
    if(plan&&plan.plans&&want('plan')){Object.values(plan.plans).forEach(r=>(r&&Array.isArray(r.items)?r.items:[]).forEach(i=>{if(i&&i.id===id){i.id=to;i.colour=c.n;if(p.footprint&&p.footprint.kind==='L')i.side=p.footprint.side}}));ok=store('rp-plan',plan)&&ok}
    const rend=load('rp-renders');
    if(Array.isArray(rend)&&want('renders')){rend.forEach(r=>{if(r&&r.snap&&Array.isArray(r.snap.items))r.snap.items=r.snap.items.map(x=>x===id?to:x)});ok=store('rp-renders',rend)&&ok}
    return ok;
  }
  /* a reminder on every page while a withdrawn sample is still saved; "Not now" hides it for this visit */
  function showLegacyNotice(){
    if(document.getElementById('rpLegacy'))return;let hidden=false;try{hidden=sessionStorage.getItem('rp-legacy-later')==='1'}catch(e){}
    if(hidden||document.getElementById('rpNotice'))return;
    const id=Object.keys(LEGACY).find(k=>legacyRefs(k).any);if(!id)return;
    const o=LEGACY[id],fam=FAMILIES[o.family],r=legacyRefs(id),where=[r.saved&&'saved pieces',r.bag&&'basket',r.plan.length&&'room plans',r.renders&&'saved renders'].filter(Boolean);
    const onShop=/shop\.html$/.test(location.pathname)&&/^#piece-abel/.test(location.hash),onPlan=/plan\.html$/.test(location.pathname);
    /* pages that already show their own replacement choices don't need the floating reminder */
    if((onPlan&&r.plan.length)||onShop)return;
    const box=document.createElement('div');box.id='rpLegacy';box.setAttribute('role','status');
    box.style.cssText='position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:119;width:min(560px,calc(100% - 24px));'+
      'background:var(--surface,#fff);color:var(--ink,#16251f);border:1px solid var(--line,#e3e1da);border-left:5px solid #a87a22;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.18);'+
      'padding:14px 16px;font:14px/1.45 var(--font,system-ui,sans-serif)';
    const btn='min-height:44px;padding:0 16px;border-radius:999px;font:600 14px var(--font,system-ui,sans-serif);cursor:pointer;display:inline-flex;align-items:center;text-decoration:none';
    box.innerHTML=`<b style="display:block;margin-bottom:2px">Sample product replaced: choose an Abel sofa</b>The ${o.name} from ${o.retailer} was example data and has been withdrawn. It’s still in your ${where.join(', ').replace(/, ([^,]*)$/,' and $1')}. We haven’t swapped it automatically, because the Abel sofas come in four sizes. ${onShop?'Choose a sofa above, then use “Replace my sample sofa”.':onPlan?'Use the choices above the plan to replace it.':''}`+
      `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">${onShop?'':`<a href="shop.html#piece-${fam.members[0]}" style="${btn};background:var(--green,#2c4a3b);color:var(--green-ink,#fff);border:1px solid var(--green,#2c4a3b)">Choose an Abel sofa</a>`}<button type="button" style="${btn};background:transparent;color:inherit;border:1px solid var(--line,#e3e1da)">Not now</button></div>`;
    box.querySelector('button').addEventListener('click',()=>{try{sessionStorage.setItem('rp-legacy-later','1')}catch(e){}box.remove()});
    document.body.appendChild(box);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',showLegacyNotice);else showLegacyNotice();

  window.RoomPlannedCatalogue={
    products:PRODUCTS,
    floor:FLOOR,
    photos:PHOTOS,
    ceiling:CEILING,
    product:id=>byId[resolve(id)]||null,
    families:FAMILIES,legacy:LEGACY,rects,area,rectsOverlap,outline,legacyRefs,replaceLegacy,
    linkTarget:id=>LEGACY[id]?FAMILIES[LEGACY[id].family].members[0]:resolve(id),
    familyOf:id=>{const p=byId[id];return p&&p.family?FAMILIES[p.family]:null},
    resolve,retired:RETIRED,money,
    art,sizeOf,colourOf,unitPrice,priceText,fixVariant
  };
})();
