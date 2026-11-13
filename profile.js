/* RoomPlanned profile helpers, shared by every page.
   Load it in <head> so the header's Account button is styled before the page paints.

   The profile lives in the browser only (localStorage "rp-account"); there is no sign-in.
   Records written before profiles could be created explicitly may hold the example profile
   ("Alex") that the old Account page filled in automatically. Those are reported as "sample",
   never as the visitor's own profile, and are never erased here.

   window.RoomPlannedProfile:
     read()            the stored account record, or null
     status(acc)       "saved" (a profile the visitor created or kept), "sample" (the old example, unconfirmed) or "none"
     SAMPLE            the old example profile's values
     photoOk(url)      true if a stored photo is a safe image data URL
     initials(name)    up to two capital letters
     textOn(hex)       a readable text colour for a background
     avatar(acc, cls)  an avatar element (photo, or initials on the chosen colour)
     paint()           refresh the header Account button */
(function(){
  'use strict';
  var KEY='rp-account';
  var SAMPLE={name:'Alex',handle:'alex.at.home',town:'Leeds',bio:'Two-bed flat, renting, slowly making the living room feel like ours.'};
  var PHOTO=/^data:image\/(webp|jpeg|png);base64,[A-Za-z0-9+\/=]+$/;
  var HEX=/^#[0-9a-f]{6}$/i;

  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
  function status(a){
    if(!a||typeof a!=='object')return 'none';
    if(a.profileSaved)return 'saved';
    if(a.v>=2)return 'none';                          /* written by the new Account page: only profileSaved counts */
    if(!('name' in a)&&!('handle' in a))return 'none';
    /* an older record: if any profile text differs from the example, the visitor saved it themselves */
    var changed=['name','handle','town','bio'].some(function(k){return String(a[k]||'')!==String(SAMPLE[k]||'')});
    return changed?'saved':'sample';
  }
  function photoOk(u){return typeof u==='string'&&u.length<400000&&PHOTO.test(u)}
  function initials(n){var s=String(n||'').trim().split(/\s+/).filter(Boolean).map(function(w){return w[0]}).join('').slice(0,2).toUpperCase();return s||'?'}
  function textOn(hex){if(!HEX.test(hex||''))return '#ffffff';var n=parseInt(hex.slice(1),16),l=.299*(n>>16)+.587*(n>>8&255)+.114*(n&255);return l>150?'#16251f':'#ffffff'}
  var USER='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6"/></svg>';
  function avatar(a,cls){
    var el=document.createElement('span');el.className=cls||'';
    if(a&&photoOk(a.photo)){var img=document.createElement('img');img.src=a.photo;img.alt='';el.appendChild(img);return el}
    var bg=a&&HEX.test(a.colour||'')?a.colour:'#2c4a3b';el.style.background=bg;el.style.color=textOn(bg);el.textContent=initials(a&&a.name);return el;
  }

  /* header button styles: injected here so all nine pages share them */
  var css='.acct-btn{display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 16px 0 6px;margin-left:4px;border-radius:999px;border:1px solid transparent;'+
    'background:var(--sage-soft,#e6ece3);color:var(--ink,#16251f);text-decoration:none;font-weight:600;font-size:14px;white-space:nowrap;flex:none}'+
    '.acct-btn:hover{border-color:var(--sage,#6b8068)}'+
    '.acct-btn[aria-current="page"]{background:var(--green,#2c4a3b);color:var(--green-ink,#fff)}'+
    '.acct-av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;overflow:hidden;flex:none;font-size:12px;font-weight:800;letter-spacing:-.02em}'+
    '.acct-av svg{width:20px;height:20px}.acct-av img{width:100%;height:100%;object-fit:cover;display:block}'+
    '@media (max-width:640px){.acct-btn{width:42px;padding:0;margin-left:0;justify-content:center}.acct-btn .acct-txt{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}}'+
    /* small phones: tighten the header so four controls fit without sideways scrolling */
    '@media (max-width:480px){header.site .wrap{gap:10px}header.site .icons{gap:2px}header.site .icons .icon-btn,header.site .icons .acct-btn{width:40px;height:40px}}'+
    '@media (max-width:374px){header.site .logo span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}}';
  var st=document.createElement('style');st.id='rp-profile-css';st.textContent=css;(document.head||document.documentElement).appendChild(st);

  function paint(){
    var a=read(),saved=status(a)==='saved';
    document.querySelectorAll('.acct-btn').forEach(function(b){
      var slot=b.querySelector('.acct-av');if(!slot)return;
      var fresh=saved?avatar(a,'acct-av'):null;
      if(fresh){fresh.setAttribute('aria-hidden','true');slot.replaceWith(fresh)}
      else if(slot.querySelector('img')||slot.textContent.trim()){var u=document.createElement('span');u.className='acct-av';u.setAttribute('aria-hidden','true');u.innerHTML=USER;slot.replaceWith(u)}
      b.title=saved&&a.name?'Account: '+String(a.name).slice(0,40):'Account';
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',paint);else paint();
  window.addEventListener('storage',function(e){if(e.key===KEY||e.key===null)paint()});
  window.RoomPlannedProfile={read:read,status:status,SAMPLE:SAMPLE,photoOk:photoOk,initials:initials,textOn:textOn,avatar:avatar,paint:paint,USER:USER};
})();
