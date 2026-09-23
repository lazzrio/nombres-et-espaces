(function(){
  "use strict";
  var LS_THEME="ci_theme", LS_PROG="ci_prog";

  /* ---------- THEME ---------- */
  var root=document.documentElement, thBtn=document.getElementById("themeBtn"), thIcon=document.getElementById("thIcon");
  var SUN='<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var MOON='<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  function curTheme(){ if(root.getAttribute("data-theme"))return root.getAttribute("data-theme");
    return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"; }
  function paintIcon(){ thIcon.innerHTML = curTheme()==="dark"?SUN:MOON; }
  try{ var st=localStorage.getItem(LS_THEME); if(st)root.setAttribute("data-theme",st); }catch(e){}
  paintIcon();
  thBtn.addEventListener("click",function(){
    var next=curTheme()==="dark"?"light":"dark";
    root.setAttribute("data-theme",next);
    try{localStorage.setItem(LS_THEME,next);}catch(e){}
    paintIcon();
  });

  /* ---------- NAVIGATION ---------- */
  var views=document.querySelectorAll(".view"), navBtns=document.querySelectorAll("#nav button");
  function saut(el){ var h=document.documentElement, avant=h.style.scrollBehavior; h.style.scrollBehavior="auto"; el.scrollIntoView(true); h.style.scrollBehavior=avant; }
  var VIEWS=["home","cours","methodes","deroules","notions","formules","express","exos","boite","quiz","planning"];
  var current=null;
  function go(name,anchor,fromHash){
    if(VIEWS.indexOf(name)<0)name="home";
    if(!fromHash){
      var url=(name==="home"&&!anchor)?location.pathname+location.search:"#"+(anchor||name);
      try{ if(name!==current)history.pushState(null,"",url); else history.replaceState(null,"",url); }catch(e){}
    }
    current=name;
    views.forEach(function(v){v.classList.toggle("active",v.id==="view-"+name);});
    navBtns.forEach(function(b){b.classList.toggle("active",b.getAttribute("data-go")===name);});
    document.getElementById("nav").classList.remove("open");
    if(anchor){ var el=document.getElementById(anchor);
      if(el){ setTimeout(function(){ if(fromHash)saut(el); else el.scrollIntoView({behavior:"smooth",block:"start"}); },60); return; } }
    if(fromHash)window.scrollTo(0,0); else window.scrollTo({top:0,behavior:"smooth"});
  }
  document.body.addEventListener("click",function(e){
    var t=e.target.closest("[data-go]"); if(!t)return;
    e.preventDefault(); go(t.getAttribute("data-go"), t.getAttribute("data-anchor"));
  });
  document.getElementById("burger").addEventListener("click",function(){
    var open=document.getElementById("nav").classList.toggle("open");
    this.setAttribute("aria-expanded",open?"true":"false");
  });

  /* ---------- ADRESSES : index.html#cours, index.html#ch4, index.html#ch3-quadriques ---------- */
  function route(){
    var h=decodeURIComponent((location.hash||"").slice(1));
    if(!h)return false;
    if(VIEWS.indexOf(h)>=0){ go(h,null,true); return true; }
    var el=document.getElementById(h), v=el&&el.closest(".view");
    if(v){ go(v.id.slice(5),h,true); return true; }
    return false;
  }
  window.addEventListener("hashchange",function(){ if(!route())go("home",null,true); });
  if(!route())current="home";

  /* ---------- CHAPTERS DATA (home) ---------- */
  var chapters=[
    {n:0, t:"Révisions géométrie",           s:"Produit scalaire · vectoriel · mixte · droites & plans"},
    {n:1, t:"Fonctions de plusieurs variables", s:"Ouverts · dérivées partielles · jacobienne · Schwarz"},
    {n:2, t:"Opérateurs vectoriels",         s:"∇ · gradient · divergence · rotationnel · laplacien"},
    {n:3, t:"Courbes, surfaces, solides",    s:"Polaires · cylindriques · sphériques · paramétrisations"},
    {n:4, t:"Intégrales multiples",          s:"Fubini · changement de variables · jacobien"},
    {n:5, t:"Intégrales curvilignes",        s:"Circulation · Green-Riemann"},
    {n:6, t:"Intégrales de surface",         s:"Flux · Stokes · Ostrogradski (divergence)"},
    {n:7, t:"Optimisation",                  s:"Points critiques · hessienne · Monge · Lagrange"}
  ];
  var hc=document.getElementById("homeChapters");
  if(hc){
    chapters.forEach(function(c){
      var b=document.createElement("button");
      b.className="chap-row";
      b.setAttribute("data-go","cours"); b.setAttribute("data-anchor","ch"+c.n);
      b.innerHTML='<span class="chap-num">'+c.n+'</span><div><h4>'+c.t+'</h4><div class="sub">'+c.s+'</div></div><span class="arrow">→</span>';
      hc.appendChild(b);
    });
  }

  /* ---------- PROGRESS ---------- */
  var prog={};
  try{ prog=JSON.parse(localStorage.getItem(LS_PROG)||"{}"); }catch(e){ prog={}; }
  var checks=document.querySelectorAll("[data-chk]");
  function saveProg(){ try{localStorage.setItem(LS_PROG,JSON.stringify(prog));}catch(e){} }
  function refreshProg(){
    var done=0; checks.forEach(function(c){ if(prog[c.getAttribute("data-chk")])done++; });
    var total=checks.length||8, pct=Math.round(done/total*100);
    var ring=document.getElementById("progRing"), pctEl=document.getElementById("progPct"),
        txt=document.getElementById("progTxt"), foot=document.getElementById("footProg");
    if(ring)ring.style.setProperty("--p",pct);
    if(pctEl)pctEl.textContent=pct+"%";
    if(txt)txt.textContent=done+" / "+total+" chapitres validés";
    if(foot)foot.textContent="Progression : "+done+" / "+total;
  }
  checks.forEach(function(c){
    var id=c.getAttribute("data-chk");
    c.checked=!!prog[id];
    c.addEventListener("change",function(){ prog[id]=c.checked; saveProg(); refreshProg(); });
  });
  refreshProg();

  /* ---------- TOC SCROLL SPY ---------- */
  var tocLinks=document.querySelectorAll("#toc a");
  tocLinks.forEach(function(a){
    a.addEventListener("click",function(e){
      e.preventDefault();
      var id=a.getAttribute("href").slice(1), el=document.getElementById(id);
      if(el)el.scrollIntoView({behavior:"smooth",block:"start"});
      try{ history.replaceState(null,"","#"+id); }catch(e){}
    });
  });
  if("IntersectionObserver" in window){
    var chaps=document.querySelectorAll(".chapter");
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          var id=en.target.id;
          tocLinks.forEach(function(a){ a.classList.toggle("active",a.getAttribute("href")==="#"+id); });
        }
      });
    },{rootMargin:"-20% 0px -70% 0px"});
    chaps.forEach(function(c){obs.observe(c);});
  }

  /* ---------- FORMULA FILTER ---------- */
  var fchips=document.querySelectorAll("#fFilter .fchip"), fgroups=document.querySelectorAll("[data-fg]");
  fchips.forEach(function(ch){
    ch.addEventListener("click",function(){
      fchips.forEach(function(x){x.classList.remove("active");}); ch.classList.add("active");
      var f=ch.getAttribute("data-f");
      fgroups.forEach(function(g){ g.style.display=(f==="all"||g.getAttribute("data-fg")===f)?"":"none"; });
    });
  });

  /* ---------- HORS LIGNE (GitHub Pages, https) ---------- */
  if("serviceWorker" in navigator && location.protocol==="https:"){
    window.addEventListener("load",function(){ navigator.serviceWorker.register("sw.js").catch(function(){}); });
  }
})();
