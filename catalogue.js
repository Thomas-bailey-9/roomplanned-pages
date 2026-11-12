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
  const PRODUCTS=[
    {id:'rhianna-sofa',name:'Rhianna 3 Seater Fabric Sofa',short:'Sofa',retailer:'Furniture Village',cat:'Sofas',room:'Living room',price:1095,shape:'sofa',colours:[{n:'Teal',hex:'#3f5a57'},{n:'Oatmeal',hex:'#d6cbb7'},{n:'Charcoal',hex:'#55595a'}],dims:[222,95,78],material:'Velvet-touch fabric, hardwood frame',delivery:'4–6 weeks',popular:9},
    {id:'earth-coffee-table',name:'Earth Coffee Table',short:'Coffee table',retailer:'Furniture Village',cat:'Tables',room:'Living room',price:299,shape:'coffee',colours:[{n:'Natural oak',hex:'#c39a62'}],dims:[120,60,45],material:'Solid oak top, powder-coated steel legs',delivery:'1–2 weeks',popular:7},
    {id:'veron-ottoman-bed',name:'Duo+ Collection Veron End Lift Ottoman Bed Frame',short:'Ottoman bed',retailer:'Furniture Village',cat:'Beds',room:'Bedroom',price:549,shape:'bed',colours:[{n:'Silver grey',hex:'#a7a9ad'},{n:'Mink',hex:'#b5a593'}],dims:[150,210,120],material:'Woven fabric, gas-lift storage base',delivery:'3–4 weeks',popular:8},
    {id:'grace-chest',name:'Grace 6 Drawer Wide Chest',short:'Chest',retailer:'Furniture Village',cat:'Storage',room:'Bedroom',price:null,shape:'chest',colours:[{n:'White',hex:'#efeee8'},{n:'Sage',hex:'#a9b8a2'}],dims:[140,45,85],material:'Painted hardwood, soft-close runners',delivery:'Check with retailer',popular:5},
    {id:'mabel-armchair',name:'Mabel Natural Boucle Swivel Armchair',short:'Armchair',retailer:'Homebase',brand:'Kyoto Futons',cat:'Sofas',room:'Living room',price:545,shape:'armchair',colours:[{n:'Natural',hex:'#a49e94'}],dims:[74,80,75.5],material:'Boucle (95% polyester, 5% cotton), rubber wood and plywood',delivery:'Check with retailer',popular:10,url:'https://www.homebase.co.uk/en-uk/mabel-natural-boucle-swivel-armchair/p/0806851'},
    {id:'sienna-corner-sofa',name:'Sienna Velvet Corner Sofa',short:'Corner sofa',retailer:'Linden & Co',cat:'Sofas',room:'Living room',price:1499,shape:'corner',colours:[{n:'Olive',hex:'#6d6b3c'},{n:'Dusk blue',hex:'#4f6178'}],dims:[268,180,84],material:'Recycled velvet, pocket-sprung seat',delivery:'6–8 weeks',popular:6},
    {id:'fenwick-dining-table',name:'Fenwick 4 Seat Dining Table',short:'Dining table',retailer:'Oakhaven Home',cat:'Tables',room:'Dining room',price:649,shape:'dining',colours:[{n:'Walnut',hex:'#8a6440'},{n:'Light oak',hex:'#c9a777'}],dims:[160,90,76],material:'Walnut veneer, solid legs',delivery:'2–4 weeks',popular:6},
    {id:'hollis-bedside',name:'Hollis Oak Bedside Table',short:'Bedside',retailer:'Oakhaven Home',cat:'Storage',room:'Bedroom',price:179,shape:'bedside',colours:[{n:'Oak',hex:'#c49a6c'},{n:'Black',hex:'#3a3836'}],dims:[48,40,58],material:'Solid oak, two drawers',delivery:'1–2 weeks',popular:8},
    {id:'wren-bookcase',name:'Wren Tall Bookcase',short:'Bookcase',retailer:'Oakhaven Home',cat:'Storage',room:'Living room',price:259,shape:'bookcase',colours:[{n:'Ash',hex:'#d7c2a0'}],dims:[80,32,180],material:'Ash veneer, adjustable shelves',delivery:'1–2 weeks',popular:4},
    {id:'arlo-pendant',name:'Arlo Linen Pendant Light',retailer:'Harbour Living',cat:'Lighting',room:'Dining room',price:89,shape:'pendant',colours:[{n:'Natural linen',hex:'#ddd4c3'},{n:'Sage',hex:'#9aab92'}],dims:[45,45,32],material:'Linen shade, brass fittings',delivery:'3–5 days',popular:9},
    {id:'ida-vase',name:'Ida Stoneware Vase',retailer:'Harbour Living',cat:'Decor',room:'Living room',price:34,shape:'vase',colours:[{n:'Speckled stone',hex:'#d8d1c4'},{n:'Clay',hex:'#c08d6b'}],dims:[18,18,26],material:'Hand-glazed stoneware',delivery:'3–5 days',popular:7},
    {id:'rowan-bed',name:'Rowan Upholstered Double Bed',short:'Double bed',retailer:'Linden & Co',cat:'Beds',room:'Bedroom',price:699,shape:'bed',colours:[{n:'Stone',hex:'#bdb5a6'},{n:'Forest',hex:'#3d5545'}],dims:[145,205,115],material:'Linen blend, slatted base',delivery:'3–5 weeks',popular:5}
  ];

  /* Order pieces appear in the planner's "Add furniture" list */
  const FLOOR_ORDER=['rhianna-sofa','sienna-corner-sofa','mabel-armchair','earth-coffee-table','wren-bookcase','veron-ottoman-bed','rowan-bed','hollis-bedside','grace-chest','fenwick-dining-table'];

  /* ---------- photos ----------
     Add a link and that piece shows the photo on every page.
     Pieces without a photo, or whose photo fails to load, show the drawing instead.
     Only use photos you have permission to show. */
  const PHOTOS={
    'rhianna-sofa':'https://media.furniturevillage.co.uk/i/fv/PRODZFRSP000000000069104_rhianna_3-seater-fabric-sofa_aston-seafoam-47520?$product$&w=577&fmt=auto',
    'veron-ottoman-bed':'https://media.furniturevillage.co.uk/i/fv/PRODZFRSP000000000064700_veron_end-lift-ottoman-frame_silver_4ft6?$large$&w=648&fmt=auto',
    'earth-coffee-table':'https://media.furniturevillage.co.uk/i/fv/PRODEATHCFTB--001_earth_coffee-table?$large$',
    'grace-chest':'https://media.furniturevillage.co.uk/i/fv/PRODZFRSP000000000054937_grace_6-drawer-wide-chest_white?$medium$&fmt=auto',
    'mabel-armchair':'images/products/mabel-natural-boucle-swivel-armchair.webp'
  };;

  /* ---------- drawings (used when there is no photo) ---------- */
  function shade(hex, amt){const n=parseInt(hex.slice(1),16);let r=(n>>16)+amt,g=(n>>8&255)+amt,b=(n&255)+amt;const c=v=>Math.max(0,Math.min(255,v));return '#'+((1<<24)+(c(r)<<16)+(c(g)<<8)+c(b)).toString(16).slice(1)}
  const LEG='#4a4643';
  const ART = {
    sofa(c){const d=shade(c,-22),l=shade(c,14);let ch='';for(let x=52;x<200;x+=19)ch+=`<path d="M${x} 50v40" stroke="${d}" stroke-width="2.5"/>`;
      return `<ellipse cx="120" cy="136" rx="104" ry="7" fill="#000" opacity=".07"/><rect x="34" y="40" width="172" height="62" rx="20" fill="${c}"/>${ch}<rect x="30" y="88" width="180" height="34" rx="12" fill="${l}"/><path d="M60 90v30M95 90v30M130 90v30M165 90v30" stroke="${d}" stroke-width="1.5" opacity=".5"/><rect x="16" y="66" width="30" height="62" rx="14" fill="${c}"/><rect x="194" y="66" width="30" height="62" rx="14" fill="${c}"/><rect x="30" y="127" width="6" height="8" fill="${LEG}"/><rect x="204" y="127" width="6" height="8" fill="${LEG}"/>`},
    corner(c){const d=shade(c,-20),l=shade(c,12);return `<ellipse cx="120" cy="138" rx="108" ry="7" fill="#000" opacity=".07"/><rect x="20" y="44" width="200" height="50" rx="14" fill="${c}"/><rect x="20" y="86" width="140" height="34" rx="10" fill="${l}"/><rect x="150" y="80" width="70" height="52" rx="10" fill="${l}"/><path d="M150 92v28M80 90v28M115 90v28" stroke="${d}" stroke-width="1.5" opacity=".6"/><rect x="10" y="70" width="24" height="58" rx="10" fill="${c}"/><circle cx="60" cy="72" r="14" fill="${shade(c,-35)}"/><circle cx="190" cy="68" r="13" fill="#d9cfbd"/>`},
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
    const url=PHOTOS[p.id];
    if(!url||(colour&&colour!==p.colours[0].hex&&p.colours.some(x=>x.hex===colour)))return svg;  /* photo shows the main colour; another listed colour shows the drawing; an old colour saved before a product changed shows the photo */
    return `<span class="ph"><img src="${url}" alt="${p.name}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('err')">${svg}</span>`;
  };;

  const byId=Object.fromEntries(PRODUCTS.map(p=>[p.id,p]));
  const FLOOR=FLOOR_ORDER.map(id=>{const p=byId[id];return{id:p.id,name:p.name,short:p.short,retailer:p.retailer,room:p.room,price:p.price,colour:p.colours[0].hex,dims:p.dims}});

  window.RoomPlannedCatalogue={
    products:PRODUCTS,
    floor:FLOOR,
    photos:PHOTOS,
    product:id=>byId[id]||null,
    art
  };
})();
