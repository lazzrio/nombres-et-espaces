/* Section « Spécial DS » : thème, menu, compte à rebours, cases à cocher (plan, checklist),
   méthodes (notes de marge), exercices (suivi « fait », recherche, filtres), DS blancs (chrono, barème). */
(function () {
  "use strict";
  var LS_THEME = "ci_theme", LS_DATE = "ci_ds_date", LS_CHECKS = "ci_ds_checks", LS_FAITS = "ci_ds_faits",
      LS_CHRONO = "ci_ds_chrono_", LS_BAR = "ci_ds_bareme";
  var DEFAULT_DATE = "2026-10-14";

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function lsGet(k, def) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- thème et menu (même clé que le reste du site) ---------- */
  var root = document.documentElement, thBtn = $("#themeBtn"), thIcon = $("#thIcon");
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
  var burger = $("#burger"), nav = $("#nav");
  if (burger && nav) burger.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* ---------- date du DS et compte à rebours ---------- */
  function dsDate() {
    var s = null;
    try { s = localStorage.getItem(LS_DATE); } catch (e) {}
    return /^\d{4}-\d{2}-\d{2}$/.test(s || "") ? s : DEFAULT_DATE;
  }
  function toDate(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function today() { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }
  function daysLeft() { return Math.round((toDate(dsDate()) - today()) / 864e5); }
  var JOURS = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
  var MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  function fmtCourt(d) { return JOURS[d.getDay()] + " " + d.getDate() + " " + MOIS[d.getMonth()]; }
  function fmtLong(d) {
    var J = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    var M = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    return J[d.getDay()] + " " + d.getDate() + " " + M[d.getMonth()] + " " + d.getFullYear();
  }
  function chipText(n) {
    if (n > 1) return "DS dans " + n + " jours";
    if (n === 1) return "DS demain";
    if (n === 0) return "DS aujourd'hui";
    return "DS passé";
  }
  function paintCountdown() {
    var n = daysLeft(), d = toDate(dsDate());
    $$(".js-count-chip").forEach(function (e) { e.textContent = chipText(n); });
    $$(".js-count-n").forEach(function (e) { e.textContent = n >= 0 ? String(n) : "–"; });
    $$(".js-count-l").forEach(function (e) {
      e.textContent = n > 1 ? "jours avant le DS" : n === 1 ? "jour avant le DS" : n === 0 ? "c'est aujourd'hui" : "DS passé";
    });
    $$(".js-count-date").forEach(function (e) { e.textContent = fmtLong(d); });
    $$(".pday[data-off]").forEach(function (c) {
      var off = +c.getAttribute("data-off"), dd = new Date(d.getTime());
      dd.setDate(dd.getDate() - off);
      var dt = $(".dt", c); if (dt) dt.textContent = fmtCourt(dd);
      c.classList.toggle("today", dd.getTime() === today().getTime());
    });
  }
  var inDate = $("#dsDate");
  if (inDate) {
    inDate.value = dsDate();
    inDate.addEventListener("change", function () {
      if (/^\d{4}-\d{2}-\d{2}$/.test(inDate.value)) { try { localStorage.setItem(LS_DATE, inDate.value); } catch (e) {} paintCountdown(); }
    });
  }
  $$("[data-setdate]").forEach(function (b) {
    b.addEventListener("click", function () {
      var d = b.getAttribute("data-setdate");
      try { localStorage.setItem(LS_DATE, d); } catch (e) {}
      if (inDate) inDate.value = d;
      paintCountdown();
    });
  });
  paintCountdown();

  /* ---------- cases à cocher persistantes (plan, checklist) ---------- */
  var checks = lsGet(LS_CHECKS, {});
  var boxes = $$("input[type=checkbox][data-ds]");
  function groupsOf(b) { return (b.getAttribute("data-g") || "").split(/\s+/).filter(Boolean); }
  function paintProgress() {
    var seen = {};
    boxes.forEach(function (b) { groupsOf(b).forEach(function (g) { (seen[g] = seen[g] || []).push(b); }); });
    Object.keys(seen).forEach(function (g) {
      var all = seen[g], k = all.filter(function (b) { return b.checked; }).length;
      $$('[data-prog="' + g + '"]').forEach(function (e) { e.textContent = k + " / " + all.length; });
      $$('[data-bar="' + g + '"]').forEach(function (e) { e.style.width = Math.round(k / all.length * 100) + "%"; });
    });
  }
  boxes.forEach(function (b) {
    var k = b.getAttribute("data-ds");
    b.checked = !!checks[k];
    b.addEventListener("change", function () {
      if (b.checked) checks[k] = 1; else delete checks[k];
      lsSet(LS_CHECKS, checks); paintProgress();
    });
  });
  paintProgress();

  /* ---------- méthodes : notes de marge, exemples dépliés ---------- */
  var tn = $("#toggleNotes");
  if (tn) tn.addEventListener("click", function () {
    var hide = document.body.classList.toggle("hide-notes");
    tn.textContent = hide ? "Afficher les notes de marge" : "Masquer les notes de marge (copie propre)";
    if (window.ajusterFormules) window.ajusterFormules(document);
  });
  var te = $("#toggleEx");
  if (te) te.addEventListener("click", function () {
    var open = te.getAttribute("data-open") !== "1";
    $$("details.exm").forEach(function (d) { d.open = open; });
    te.setAttribute("data-open", open ? "1" : "0");
    te.textContent = open ? "Tout replier" : "Tout déplier";
  });
  window.addEventListener("beforeprint", function () {
    $$("details").forEach(function (d) { d.open = true; });
  });
  var pb = $("#printSurvie");
  if (pb) pb.addEventListener("click", function () {
    document.body.classList.add("print-survie");
    window.print();
  });
  window.addEventListener("afterprint", function () { document.body.classList.remove("print-survie"); });

  /* ---------- exercices : suivi « fait », recherche, filtres ---------- */
  var faits = lsGet(LS_FAITS, {});
  var items = $$("article.cx[id]");
  var sections = $$("section.cx-chap[data-cat]");
  function peindre(it) {
    var ok = !!faits[it.id];
    it.classList.toggle("done", ok);
    var b = $(".cx-done", it);
    if (b) { b.textContent = ok ? "✓ Fait" : "Marquer fait"; b.setAttribute("aria-pressed", ok ? "true" : "false"); }
  }
  function progression() {
    var vis = items.filter(function (i) { return !i.hidden; });
    var n = vis.filter(function (i) { return faits[i.id]; }).length;
    var el = $("#cxProgress"); if (el) el.textContent = n + " / " + vis.length + " faits";
    sections.forEach(function (sec) {
      var its = $$("article.cx[id]", sec), k = 0;
      its.forEach(function (i) { if (faits[i.id]) k++; });
      var card = $('.cx-card[href="#' + sec.id + '"]');
      if (!card) return;
      var bar = $(".bar i", card), cnt = $(".cnt", card);
      if (bar) bar.style.width = (its.length ? Math.round(k / its.length * 100) : 0) + "%";
      if (cnt) cnt.textContent = k + " / " + its.length + " faits";
    });
  }
  items.forEach(function (it) {
    var hd = $(".cx-hd", it);
    if (!hd) return;
    var b = document.createElement("button");
    b.type = "button"; b.className = "cx-done";
    b.title = "Exercice refait seul ? Cochez-le pour suivre votre progression.";
    b.addEventListener("click", function () {
      if (faits[it.id]) delete faits[it.id]; else faits[it.id] = 1;
      lsSet(LS_FAITS, faits); peindre(it); progression();
    });
    hd.appendChild(b); peindre(it);
  });
  var champ = $("#cxSearch"), choix = $("#cxCat"), cat = "all";
  function norm(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(new RegExp("[" + String.fromCharCode(0x300) + "-" + String.fromCharCode(0x36f) + "]", "g"), "");
  }
  function filtrer() {
    var q = norm(champ ? champ.value.trim() : "");
    sections.forEach(function (sec) {
      var okCat = cat === "all" || sec.getAttribute("data-cat") === cat, vus = 0;
      $$("article.cx[id]", sec).forEach(function (it) {
        var montre = okCat && (!q || norm(it.textContent).indexOf(q) !== -1);
        it.hidden = !montre; if (montre) vus++;
      });
      sec.hidden = !okCat || (!!q && vus === 0);
    });
    var vide = $("#cxEmpty"); if (vide) vide.hidden = items.some(function (i) { return !i.hidden; });
    progression();
  }
  if (champ) champ.addEventListener("input", filtrer);
  if (choix) choix.addEventListener("change", function () { cat = choix.value; filtrer(); });
  function ouvrir(sel, etat) {
    items.forEach(function (it) { if (!it.hidden) $$(sel, it).forEach(function (d) { d.open = etat; }); });
  }
  var tout = $("#cxExpand");
  if (tout) tout.addEventListener("click", function () {
    var etat = tout.getAttribute("data-open") !== "1";
    ouvrir("details.cx-meth, details.cx-corr", etat);
    tout.setAttribute("data-open", etat ? "1" : "0");
    tout.textContent = etat ? "Tout replier" : "Tout déplier";
  });
  var meth = $("#cxMeth");
  if (meth) meth.addEventListener("click", function () { ouvrir("details.cx-corr", false); ouvrir("details.cx-meth", true); });
  progression();

  /* ---------- ouverture directe via l'adresse (#m-1-2, #ds-e1-3, #blanc-1) ---------- */
  function ouvrirAncre() {
    var h = decodeURIComponent((location.hash || "").slice(1));
    var el = h && document.getElementById(h);
    if (!el) return;
    if (items.length && (el.hidden || (el.closest("section") && el.closest("section").hidden))) {
      if (champ) champ.value = ""; cat = "all"; if (choix) choix.value = "all"; filtrer();
    }
    var p = el.parentElement;
    while (p) { if (p.tagName === "DETAILS") p.open = true; p = p.parentElement; }
    if (el.matches("article.cx")) { var c = $("details.cx-corr", el); if (c) c.open = true; }
    setTimeout(function () {
      var h2 = document.documentElement, avant = h2.style.scrollBehavior;
      h2.style.scrollBehavior = "auto"; el.scrollIntoView(true); h2.style.scrollBehavior = avant;
    }, 40);
  }
  window.addEventListener("hashchange", ouvrirAncre);
  ouvrirAncre();

  /* ---------- DS blancs : chronomètre ---------- */
  var chronos = $$(".chrono[data-total]");
  function mmss(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
  }
  chronos.forEach(function (c) {
    var id = c.getAttribute("data-id"), total = +c.getAttribute("data-total");
    var etat = lsGet(LS_CHRONO + id, { left: total, running: false, end: 0 });
    var time = $(".time", c), msg = $(".cmsg", c);
    var bGo = $('[data-chrono="go"]', c), bReset = $('[data-chrono="reset"]', c);
    function save() { lsSet(LS_CHRONO + id, etat); }
    function paint() {
      time.textContent = mmss(etat.left);
      c.classList.toggle("warn15", etat.left <= 900 && etat.left > 300);
      c.classList.toggle("warn5", etat.left <= 300);
      bGo.textContent = etat.running ? "⏸ Pause" : (etat.left === total ? "▶ Lancer le chrono" : (etat.left === 0 ? "Terminé" : "▶ Reprendre"));
      bGo.classList.toggle("go", !etat.running && etat.left > 0);
      var m;
      if (etat.left === 0) m = "Temps écoulé : pose le stylo. La correction est sous le sujet.";
      else if (!etat.running && etat.left === total) m = "Prêt ? Feuille blanche, stylo, sans le cours. Lance le chrono quand tu commences.";
      else if (!etat.running) m = "En pause. Reprends quand tu es prêt.";
      else if (etat.left <= 300) m = "Dernières minutes : relis les signes, les bornes, les jacobiens. Écris tes conclusions.";
      else if (etat.left <= 900) m = "Il reste 15 minutes : termine ce que tu fais, garde 10 minutes pour la relecture.";
      else m = "Une question à la fois. Bloqué plus de 8 minutes ? Passe à la suite et reviens.";
      msg.textContent = m;
    }
    function tick() {
      if (!etat.running) return;
      etat.left = Math.max(0, Math.round((etat.end - Date.now()) / 1000));
      if (etat.left === 0) { etat.running = false; save(); }
      paint();
    }
    bGo.addEventListener("click", function () {
      if (etat.left === 0) return;
      if (etat.running) { etat.running = false; }
      else { etat.running = true; etat.end = Date.now() + etat.left * 1000; }
      save(); paint();
    });
    bReset.addEventListener("click", function () {
      if (etat.left < total && !window.confirm("Remettre le chronomètre à 90 minutes ?")) return;
      etat = { left: total, running: false, end: 0 }; save(); paint();
    });
    if (etat.running) { etat.left = Math.max(0, Math.round((etat.end - Date.now()) / 1000)); if (etat.left === 0) etat.running = false; }
    paint();
    setInterval(tick, 500);
  });

  /* ---------- DS blancs : barème et auto-notation ---------- */
  var bar = lsGet(LS_BAR, {});
  var bars = $$("input.bar[data-b]");
  bars.forEach(function (b) {
    var k = b.getAttribute("data-b");
    b.checked = !!bar[k];
    b.addEventListener("change", function () {
      if (b.checked) bar[k] = 1; else delete bar[k];
      lsSet(LS_BAR, bar); paintScores();
    });
  });
  function fmt(x) { return (Math.round(x * 100) / 100).toString().replace(".", ","); }
  function paintScores() {
    $$("[data-score]").forEach(function (box) {
      var ds = box.getAttribute("data-score"), tot = +box.getAttribute("data-total") || 20, s = 0;
      $$('input.bar[data-ds-id="' + ds + '"]').forEach(function (b) { if (b.checked) s += +b.getAttribute("data-pts"); });
      $(".sc", box).textContent = fmt(s) + " / " + tot;
      var r = s / tot, m;
      if (s === 0) m = "Coche dans chaque correction les points que ta copie aurait obtenus (sois sévère : une justification absente = pas de point).";
      else if (r < 0.5) m = "Moins de la moitié : repère les exercices où tu perds le plus et refais-les à partir de la méthode correspondante.";
      else if (r < 0.7) m = "Correct, mais fragile : regarde si les points perdus viennent du calcul ou de la rédaction.";
      else if (r < 0.85) m = "Solide. Les points qui restent se jouent sur les justifications : rédige-les systématiquement.";
      else m = "Excellent. Refais un autre DS blanc dans quelques jours pour vérifier que c'est stable.";
      $(".sm", box).textContent = m;
    });
  }
  paintScores();

  /* ---------- formulaire : recherche, filtres, « je connais » ---------- */
  var fis = $$("article.fi");
  if (fis.length) {
    var fmQ = $("#fmSearch"), fmCh = "all", fmT = "all", fmHide = false;
    var tot = $("#fmTotal"); if (tot) tot.textContent = String(fis.length);
    function fmNorm(s) { return norm(s); }
    function fmFilter() {
      var q = fmNorm(fmQ ? fmQ.value.trim() : ""), vis = 0;
      fis.forEach(function (a) {
        var ok = (fmCh === "all" || a.getAttribute("data-ch") === fmCh) &&
                 (fmT === "all" || a.getAttribute("data-t") === fmT) &&
                 (!q || fmNorm(a.textContent).indexOf(q) !== -1) &&
                 !(fmHide && $("input", a).checked);
        a.classList.toggle("fm-hidden", !ok);
        if (ok) vis++;
      });
      $$("section.fm-sec").forEach(function (sec) {
        sec.classList.toggle("fm-hidden", !$$("article.fi", sec).some(function (a) { return !a.classList.contains("fm-hidden"); }));
      });
      var e = $("#fmEmpty"); if (e) e.hidden = vis > 0;
      var c = $("#fmCount"); if (c) c.textContent = vis + " / " + fis.length + " fiches";
      var nf = (fmCh !== "all" ? 1 : 0) + (fmT !== "all" ? 1 : 0) + (fmHide ? 1 : 0), fn = $("#fmFiltN");
      if (fn) { fn.textContent = nf ? String(nf) : ""; fn.hidden = !nf; }
    }
    var fb = $("#fmFiltBtn"), fbox = $("#fmFilters");
    if (fb && fbox) fb.addEventListener("click", function () {
      var open = fbox.hidden;
      fbox.hidden = !open; fb.setAttribute("aria-expanded", open ? "true" : "false");
    });
    function fmKnown() { fis.forEach(function (a) { a.classList.toggle("known", $("input", a).checked); }); }
    fis.forEach(function (a) { $("input", a).addEventListener("change", function () { fmKnown(); if (fmHide) fmFilter(); }); });
    if (fmQ) fmQ.addEventListener("input", fmFilter);
    function chips(id, attr, set) {
      $$("#" + id + " .fchip").forEach(function (b) {
        b.addEventListener("click", function () {
          $$("#" + id + " .fchip").forEach(function (x) { x.classList.remove("active"); });
          b.classList.add("active"); set(b.getAttribute(attr)); fmFilter();
        });
      });
    }
    chips("fmChCh", "data-ch", function (v) { fmCh = v; });
    chips("fmChT", "data-t", function (v) { fmT = v; });
    var hb = $("#fmHide");
    if (hb) hb.addEventListener("click", function () {
      fmHide = !fmHide; hb.setAttribute("data-on", fmHide ? "1" : "0");
      hb.textContent = fmHide ? "Afficher tout" : "Masquer ce que je connais"; fmFilter();
    });
    var fp = $("#fmPrint");
    if (fp) fp.addEventListener("click", function () { window.print(); });
    window.setTimeout(function () { fmKnown(); fmFilter(); }, 0);
  }

  /* ---------- hors ligne (https) ---------- */
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
})();
