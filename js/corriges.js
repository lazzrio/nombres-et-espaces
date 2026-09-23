/* Page Corrigés : thème, menu, suivi « fait », recherche, filtres, ouverture par l'adresse (#imu-3) */
(function () {
  "use strict";
  var LS_THEME = "ci_theme", LS_FAITS = "ci_corriges";

  /* ---------- thème (même clé que le reste du site) ---------- */
  var root = document.documentElement, thBtn = document.getElementById("themeBtn"), thIcon = document.getElementById("thIcon");
  var SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  function curTheme() {
    if (root.getAttribute("data-theme")) return root.getAttribute("data-theme");
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function paintIcon() { if (thIcon) thIcon.innerHTML = curTheme() === "dark" ? SUN : MOON; }
  try { var st = localStorage.getItem(LS_THEME); if (st) root.setAttribute("data-theme", st); } catch (e) {}
  paintIcon();
  if (thBtn) thBtn.addEventListener("click", function () {
    var next = curTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem(LS_THEME, next); } catch (e) {}
    paintIcon();
  });
  var burger = document.getElementById("burger"), nav = document.getElementById("nav");
  if (burger && nav) burger.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* ---------- suivi « fait » ---------- */
  var faits = {};
  try { faits = JSON.parse(localStorage.getItem(LS_FAITS) || "{}"); } catch (e) { faits = {}; }
  function sauver() { try { localStorage.setItem(LS_FAITS, JSON.stringify(faits)); } catch (e) {} }

  var items = Array.prototype.slice.call(document.querySelectorAll("article.cx[id]"));
  var sections = Array.prototype.slice.call(document.querySelectorAll("section.cx-chap[data-cat]"));

  function peindre(it) {
    var ok = !!faits[it.id];
    it.classList.toggle("done", ok);
    var b = it.querySelector(".cx-done");
    if (b) { b.textContent = ok ? "✓ Fait" : "Marquer fait"; b.setAttribute("aria-pressed", ok ? "true" : "false"); }
  }
  items.forEach(function (it) {
    var hd = it.querySelector(".cx-hd");
    if (!hd) return;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "cx-done";
    b.title = "Exercice refait seul ? Cochez-le pour suivre votre progression.";
    b.addEventListener("click", function () {
      if (faits[it.id]) delete faits[it.id]; else faits[it.id] = 1;
      sauver(); peindre(it); progression();
    });
    hd.appendChild(b);
    peindre(it);
  });

  function progression() {
    var vis = items.filter(function (i) { return !i.hidden; });
    var n = vis.filter(function (i) { return faits[i.id]; }).length;
    var el = document.getElementById("cxProgress");
    if (el) el.textContent = n + " / " + vis.length + " faits";
    sections.forEach(function (sec) {
      var its = sec.querySelectorAll("article.cx[id]"), k = 0;
      its.forEach(function (i) { if (faits[i.id]) k++; });
      var card = document.querySelector('.cx-card[href="#' + sec.id + '"]');
      if (!card) return;
      var bar = card.querySelector(".bar i"), cnt = card.querySelector(".cnt");
      if (bar) bar.style.width = (its.length ? Math.round(k / its.length * 100) : 0) + "%";
      if (cnt) cnt.textContent = k + " / " + its.length + " faits";
    });
  }

  /* ---------- recherche et filtres ---------- */
  var champ = document.getElementById("cxSearch");
  var choix = document.getElementById("cxCat");
  var cat = "all";
  function normaliser(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(new RegExp("[" + String.fromCharCode(0x300) + "-" + String.fromCharCode(0x36f) + "]", "g"), "");
  }
  function filtrer() {
    var q = normaliser(champ ? champ.value.trim() : "");
    sections.forEach(function (sec) {
      var okCat = cat === "all" || sec.getAttribute("data-cat") === cat;
      var vus = 0;
      sec.querySelectorAll("article.cx[id]").forEach(function (it) {
        var montre = okCat && (!q || normaliser(it.textContent).indexOf(q) !== -1);
        it.hidden = !montre;
        if (montre) vus++;
      });
      sec.hidden = !okCat || (!!q && vus === 0);
    });
    var vide = document.getElementById("cxEmpty");
    if (vide) vide.hidden = items.some(function (i) { return !i.hidden; });
    progression();
  }
  if (champ) champ.addEventListener("input", filtrer);
  if (choix) choix.addEventListener("change", function () { cat = choix.value; filtrer(); });

  /* ---------- tout déplier / méthodes seules ---------- */
  function ouvrir(sel, etat) {
    items.forEach(function (it) {
      if (it.hidden) return;
      it.querySelectorAll(sel).forEach(function (d) { d.open = etat; });
    });
  }
  var tout = document.getElementById("cxExpand");
  if (tout) tout.addEventListener("click", function () {
    var etat = tout.getAttribute("data-open") !== "1";
    ouvrir("details.cx-meth, details.cx-corr", etat);
    tout.setAttribute("data-open", etat ? "1" : "0");
    tout.textContent = etat ? "Tout replier" : "Tout déplier";
  });
  var meth = document.getElementById("cxMeth");
  if (meth) meth.addEventListener("click", function () {
    ouvrir("details.cx-corr", false);
    ouvrir("details.cx-meth", true);
  });

  /* impression : tout déplier */
  window.addEventListener("beforeprint", function () {
    document.querySelectorAll("details.cx-meth, details.cx-corr").forEach(function (d) { d.open = true; });
  });

  /* ---------- ouverture directe via l'adresse ---------- */
  function ouvrirAncre() {
    var h = decodeURIComponent((location.hash || "").slice(1));
    var el = h && document.getElementById(h);
    if (!el) return;
    if (el.hidden || (el.closest("section") && el.closest("section").hidden)) {
      if (champ) champ.value = "";
      cat = "all";
      if (choix) choix.value = "all";
      filtrer();
    }
    if (el.matches("article.cx")) {
      var c = el.querySelector("details.cx-corr");
      if (c) c.open = true;
    }
    setTimeout(function () {
      var h = document.documentElement, avant = h.style.scrollBehavior;
      h.style.scrollBehavior = "auto";
      el.scrollIntoView(true);
      h.style.scrollBehavior = avant;
    }, 30);
  }
  window.addEventListener("hashchange", ouvrirAncre);
  ouvrirAncre();
  progression();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
})();
