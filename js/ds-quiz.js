/* Quiz « Spécial DS » : QCM et flashcards sur les notions du formulaire.
   La banque de questions est dans js/ds-quiz-data.js (window.DSQ_RAW). Progression mémorisée dans le navigateur. */
(function () {
  "use strict";
  var root = document.getElementById("qz");
  if (!root || !window.DSQ_RAW) return;

  var LS = "ci_ds_quiz";
  var CHN = { "0": "Ch. 0 · Géométrie", "1": "Ch. 1 · Plusieurs variables", "2": "Ch. 2 · Opérateurs vectoriels",
              "3": "Ch. 3 · Courbes et surfaces", "4": "Ch. 4 · Intégrales multiples", "o": "Outils d'ING1" };
  var ORDER = ["0", "1", "2", "3", "4", "o"];
  var BS = String.fromCharCode(92);

  /* ---------- banque ---------- */
  function hash(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }
  var QCM = [], CARDS = [];
  window.DSQ_RAW.split("\n").forEach(function (ln) {
    ln = ln.trim();
    if (!ln) return;
    var p = ln.split(" ;; ");
    if (p[0] === "Q" && p.length >= 7) {
      QCM.push({ id: "q" + hash(p[3]), ch: p[1], fiche: p[2], q: p[3], opts: p.slice(4, p.length - 1), exp: p[p.length - 1] });
    } else if (p[0] === "C" && p.length >= 5) {
      CARDS.push({ id: "c" + hash(p[3]), ch: p[1], fiche: p[2], front: p[3], back: p.slice(4).join(" ;; ") });
    }
  });

  /* ---------- mémoire (try/catch : peut être indisponible) ---------- */
  var S = { q: {}, c: {}, best: {} };
  try { var raw = JSON.parse(localStorage.getItem(LS) || "null"); if (raw) { S.q = raw.q || {}; S.c = raw.c || {}; S.best = raw.best || {}; } } catch (e) {}
  function save() { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {} }

  /* ---------- utilitaires ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  /* & < > à l'intérieur des formules : entités HTML (le reste du texte garde ses balises <b>) */
  function safe(s) {
    return s.replace(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g, function (m, a, b) {
      var inl = a !== undefined, body = inl ? a : b;
      body = body.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return inl ? BS + "(" + body + BS + ")" : BS + "[" + body + BS + "]";
    });
  }
  function maths(el) {
    if (window.renderMathInElement) {
      window.renderMathInElement(el, {
        delimiters: [{ left: BS + "[", right: BS + "]", display: true }, { left: BS + "(", right: BS + ")", display: false }],
        throwOnError: false, strict: false
      });
    }
    if (window.ajusterFormules) window.ajusterFormules(el);
  }
  function pct(a, b) { return b ? Math.round(100 * a / b) : 0; }
  function ficheLink(f) { return '<a class="qz-fiche" href="ds-formules.html#' + f + '">📘 Voir la fiche du formulaire</a>'; }

  /* ---------- état de l'interface ---------- */
  var mode = "qcm";                   /* "qcm" | "cards" */
  var chosen = {};                    /* chapitres cochés */
  ORDER.forEach(function (c) { chosen[c] = true; });
  var play = null;                    /* séance en cours */

  var elTabs = $("#qzTabs"), elChaps = $("#qzChaps"), elCount = $("#qzCount"), elFilter = $("#qzFilter"),
      elStart = $("#qzStart"), elPlay = $("#qzPlay"), elMastery = $("#qzMastery"), elSetup = $("#qzSetup"),
      elPool = $("#qzPool"), elReset = $("#qzReset");

  function bank() { return mode === "qcm" ? QCM : CARDS; }
  function mem() { return mode === "qcm" ? S.q : S.c; }

  function poolItems() {
    var m = mem(), f = elFilter.value;
    return bank().filter(function (it) {
      if (!chosen[it.ch]) return false;
      if (f === "miss") return m[it.id] === 0;
      if (f === "todo") return m[it.id] !== 1;
      return true;
    });
  }

  /* ---------- panneau de réglage ---------- */
  function buildChaps() {
    elChaps.innerHTML = '<button type="button" class="fchip" data-all="1">Tout</button>' + ORDER.map(function (c) {
      var n = bank().filter(function (it) { return it.ch === c; }).length;
      return '<button type="button" class="fchip" data-c="' + c + '" aria-pressed="true">' + CHN[c] + ' <small>(' + n + ')</small></button>';
    }).join("");
    syncChaps();
  }
  function syncChaps() {
    var all = ORDER.every(function (c) { return chosen[c]; });
    $$("[data-c]", elChaps).forEach(function (b) {
      var on = !!chosen[b.getAttribute("data-c")];
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    $("[data-all]", elChaps).classList.toggle("active", all);
  }
  function syncSetup() {
    var n = poolItems().length, want = elCount.value === "all" ? n : Math.min(n, parseInt(elCount.value, 10));
    elPool.textContent = n ? (want + " " + (mode === "qcm" ? "question" : "carte") + (want > 1 ? "s" : "") + " (sur " + n + " disponibles)") : "Rien à réviser avec ces réglages.";
    elStart.disabled = !n;
    $$("button", elTabs).forEach(function (b) {
      var on = b.getAttribute("data-mode") === mode;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
  }
  function buildFilter() {
    elFilter.innerHTML = mode === "qcm"
      ? '<option value="all">Toutes les questions</option><option value="todo">Pas encore réussies</option><option value="miss">Mes erreurs</option>'
      : '<option value="all">Toutes les cartes</option><option value="todo">Pas encore sues</option><option value="miss">À revoir</option>';
  }

  /* ---------- tableau de maîtrise ---------- */
  function renderMastery() {
    var lignes = ORDER.map(function (c) {
      var q = QCM.filter(function (x) { return x.ch === c; }), k = CARDS.filter(function (x) { return x.ch === c; });
      var qo = q.filter(function (x) { return S.q[x.id] === 1; }).length, ko = k.filter(function (x) { return S.c[x.id] === 1; }).length;
      var tot = q.length + k.length, ok = qo + ko, p = pct(ok, tot);
      return '<div class="qz-m"><div class="qz-m-t"><b>' + CHN[c] + '</b><span>' + qo + '/' + q.length + ' QCM · ' + ko + '/' + k.length + ' cartes</span></div>' +
        '<div class="qz-bar" role="img" aria-label="' + p + ' % maîtrisé"><i style="width:' + p + '%"></i></div></div>';
    });
    var tq = QCM.filter(function (x) { return S.q[x.id] === 1; }).length, tc = CARDS.filter(function (x) { return S.c[x.id] === 1; }).length;
    var errs = QCM.filter(function (x) { return S.q[x.id] === 0; }).length;
    elMastery.innerHTML = '<h3 class="qz-h3">Ta maîtrise <span>' + pct(tq + tc, QCM.length + CARDS.length) + ' % (' + (tq + tc) + '/' + (QCM.length + CARDS.length) + ')</span></h3>' +
      '<div class="qz-mgrid">' + lignes.join("") + '</div>' +
      '<p class="qz-note">Une question ou une carte compte comme « maîtrisée » si ta <b>dernière</b> réponse était juste. ' +
      (errs ? errs + ' QCM à retravailler : choisis « Mes erreurs » ci-dessus.' : 'Aucune erreur en attente.') + '</p>';
  }

  /* ---------- séance ---------- */
  function start(items, tout) {
    var n = tout || elCount.value === "all" ? items.length : Math.min(items.length, parseInt(elCount.value, 10));
    play = { mode: mode, items: shuffle(items).slice(0, n), i: 0, ok: 0, ko: [], done: false, answered: false, flipped: false };
    elSetup.classList.add("qz-collapsed");
    elMastery.hidden = true;
    render();
    elPlay.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function head() {
    var p = play, tot = p.items.length, cur = Math.min(p.i + 1, tot);
    return '<div class="qz-top"><span class="qz-pos">' + (mode === "qcm" ? "Question " : "Carte ") + cur + ' / ' + tot + '</span>' +
      '<span class="qz-score">✓ ' + p.ok + (mode === "qcm" ? " · ✗ " + p.ko.length : "") + '</span>' +
      '<button type="button" class="cx-btn" data-act="quit">Arrêter</button></div>' +
      '<div class="qz-bar qz-prog"><i style="width:' + pct(p.i, tot) + '%"></i></div>';
  }

  function render() {
    if (!play) { elPlay.innerHTML = ""; return; }
    if (play.i >= play.items.length) return renderEnd();
    var it = play.items[play.i];
    if (play.mode === "qcm") {
      if (!it.order) it.order = shuffle(it.opts.map(function (o, k) { return k; }));
      var L = "ABCD";
      elPlay.innerHTML = head() +
        '<div class="qz-card"><div class="qz-tags"><span class="fchip active">' + CHN[it.ch] + '</span></div>' +
        '<p class="qz-q">' + safe(it.q) + '</p>' +
        '<div class="qz-opts" role="group" aria-label="Réponses">' + it.order.map(function (k, pos) {
          return '<button type="button" class="qz-opt" data-k="' + k + '"><span class="qz-l">' + L.charAt(pos) + '</span><span class="qz-t">' + safe(it.opts[k]) + '</span></button>';
        }).join("") + '</div>' +
        '<div class="qz-fb" id="qzFb" aria-live="polite"></div></div>';
      maths(elPlay);
    } else {
      elPlay.innerHTML = head() +
        '<div class="qz-card qz-flash" id="qzFlash" tabindex="0" role="button" aria-label="Retourner la carte"><div class="qz-tags"><span class="fchip active">' + CHN[it.ch] + '</span></div>' +
        '<p class="qz-q">' + safe(it.front) + '</p>' +
        '<div class="qz-back" id="qzBack" hidden>' + safe(it.back) + '<div>' + ficheLink(it.fiche) + '</div></div>' +
        '<p class="qz-hint" id="qzHint">Essaie de l\'écrire de mémoire, puis retourne la carte (clic, Espace ou Entrée).</p></div>' +
        '<div class="qz-actions" id="qzAct"><button type="button" class="cx-btn qz-primary" data-act="flip">↻ Retourner la carte</button></div>';
      maths(elPlay);
      var f = $("#qzFlash"); if (f) f.focus({ preventScroll: true });
    }
  }

  function answer(k) {
    var p = play, it = p.items[p.i];
    if (p.answered) return;
    p.answered = true;
    var good = k === 0;
    $$(".qz-opt", elPlay).forEach(function (b) {
      b.disabled = true;
      var kk = parseInt(b.getAttribute("data-k"), 10);
      if (kk === 0) b.classList.add("ok");
      else if (kk === k) b.classList.add("ko");
    });
    S.q[it.id] = good ? 1 : 0;
    if (good) p.ok++; else p.ko.push(it);
    save();
    var last = p.i === p.items.length - 1;
    $("#qzFb").innerHTML = '<div class="qz-verdict ' + (good ? "ok" : "ko") + '">' + (good ? "✓ Exact." : "✗ Pas tout à fait.") + '</div>' +
      '<p class="qz-exp">' + safe(it.exp) + '</p><div class="qz-actions">' + ficheLink(it.fiche) +
      '<button type="button" class="cx-btn qz-primary" data-act="next" id="qzNext">' + (last ? "Voir le résultat" : "Question suivante") + ' →</button></div>';
    maths($("#qzFb"));
    var nx = $("#qzNext"); if (nx) nx.focus({ preventScroll: false });
  }

  function flip() {
    var p = play;
    if (!p || p.flipped) return;
    p.flipped = true;
    $("#qzBack").hidden = false;
    $("#qzHint").hidden = true;
    $("#qzAct").innerHTML = '<button type="button" class="cx-btn qz-redo" data-act="again">↻ À revoir <kbd>←</kbd></button><button type="button" class="cx-btn qz-primary" data-act="knew">✓ Je savais <kbd>→</kbd></button>';
    maths($("#qzBack"));
  }

  function rate(knew) {
    var p = play, it = p.items[p.i];
    if (!p.flipped) return;
    S.c[it.id] = knew ? 1 : 0;
    if (knew) p.ok++; else p.ko.push(it);
    save();
    next();
  }

  function next() {
    play.i++; play.answered = false; play.flipped = false;
    render();
  }

  function renderEnd() {
    var p = play, tot = p.items.length, sc = pct(p.ok, tot);
    var key = p.mode;
    var best = S.best[key] || 0, nouveau = sc > best && tot >= 5;
    if (tot >= 5 && sc > best) { S.best[key] = sc; save(); }
    var msg = sc === 100 ? "Sans faute : tu peux passer à plus difficile (un DS blanc)." :
              sc >= 80 ? "Très solide. Reprends juste les points ci-dessous." :
              sc >= 60 ? "Bonne base : relis les fiches des questions ratées, puis refais « Mes erreurs »." :
              "Les notions ne sont pas encore automatiques : relis le formulaire, puis refais cette série.";
    var list = p.ko.map(function (it) {
      return '<li><div class="qz-miss-q">' + safe(p.mode === "qcm" ? it.q : it.front) + '</div>' +
        (p.mode === "qcm" ? '<div class="qz-miss-a"><b>Réponse :</b> ' + safe(it.opts[0]) + '</div>' : '') + ficheLink(it.fiche) + '</li>';
    }).join("");
    elPlay.innerHTML = '<div class="qz-card qz-end"><div class="qz-big">' + p.ok + ' / ' + tot + '</div>' +
      '<div class="qz-big-l">' + sc + ' % ' + (p.mode === "qcm" ? "de bonnes réponses" : "de cartes sues") + (nouveau ? ' · 🏆 nouveau record' : '') + '</div>' +
      '<p class="qz-q" style="text-align:center">' + msg + '</p>' +
      '<div class="qz-actions" style="justify-content:center">' +
      (p.ko.length ? '<button type="button" class="cx-btn qz-primary" data-act="redo-miss">Refaire les ' + p.ko.length + (p.mode === "qcm" ? " erreur" : " carte") + (p.ko.length > 1 ? "s" : "") + '</button>' : '') +
      '<button type="button" class="cx-btn" data-act="restart">Nouvelle série</button></div>' +
      (p.ko.length ? '<h3 class="qz-h3">À retravailler</h3><ul class="qz-miss">' + list + '</ul>' : '') + '</div>';
    maths(elPlay);
    elPlay.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function quit() {
    play = null;
    elPlay.innerHTML = "";
    elSetup.classList.remove("qz-collapsed");
    elMastery.hidden = false;
    renderMastery(); syncSetup();
  }

  /* ---------- événements ---------- */
  elTabs.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-mode]");
    if (!b || play) return;
    mode = b.getAttribute("data-mode");
    buildFilter(); buildChaps(); syncSetup();
  });
  elChaps.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b || play) return;
    if (b.hasAttribute("data-all")) {
      var all = ORDER.every(function (c) { return chosen[c]; });
      ORDER.forEach(function (c) { chosen[c] = !all; });
    } else {
      var c = b.getAttribute("data-c");
      chosen[c] = !chosen[c];
    }
    syncChaps(); syncSetup();
  });
  elCount.addEventListener("change", syncSetup);
  elFilter.addEventListener("change", syncSetup);
  elStart.addEventListener("click", function () { start(poolItems()); });
  elReset.addEventListener("click", function () {
    if (!confirm("Effacer toute ta progression du quiz (QCM et flashcards) ?")) return;
    S = { q: {}, c: {}, best: {} }; save(); renderMastery(); syncSetup();
  });

  elPlay.addEventListener("click", function (e) {
    var opt = e.target.closest(".qz-opt");
    if (opt && play && play.mode === "qcm") { answer(parseInt(opt.getAttribute("data-k"), 10)); return; }
    var a = e.target.closest("[data-act]");
    if (!a) { if (e.target.closest("#qzFlash") && !e.target.closest("a")) flip(); return; }
    var act = a.getAttribute("data-act");
    if (act === "next") next();
    else if (act === "flip") flip();
    else if (act === "knew") rate(true);
    else if (act === "again") rate(false);
    else if (act === "quit") quit();
    else if (act === "restart") quit();
    else if (act === "redo-miss") { var m = play.ko; play = null; start(m, true); }
  });

  document.addEventListener("keydown", function (e) {
    if (!play || play.i >= play.items.length) return;
    var t = e.target.tagName;
    if (t === "INPUT" || t === "SELECT" || t === "TEXTAREA" || e.ctrlKey || e.metaKey || e.altKey) return;
    if (play.mode === "qcm") {
      if (!play.answered && /^[1-4]$/.test(e.key)) {
        var it = play.items[play.i], k = it.order[parseInt(e.key, 10) - 1];
        if (k !== undefined) { e.preventDefault(); answer(k); }
      } else if (play.answered && (e.key === "ArrowRight" || e.key === "n")) { e.preventDefault(); next(); }
    } else {
      if (!play.flipped && (e.key === " " || e.key === "Enter")) { e.preventDefault(); flip(); }
      else if (play.flipped && e.key === "ArrowRight") { e.preventDefault(); rate(true); }
      else if (play.flipped && e.key === "ArrowLeft") { e.preventDefault(); rate(false); }
    }
  });

  /* ---------- démarrage ---------- */
  var tn = $("#qzNQ"), tc = $("#qzNC");
  if (tn) tn.textContent = QCM.length;
  if (tc) tc.textContent = CARDS.length;
  buildFilter();
  buildChaps();
  syncSetup();
  renderMastery();
})();
