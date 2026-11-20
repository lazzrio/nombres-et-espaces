/* Bouton de thème (clair par défaut, choix mémorisé), pour les pages qui n'ont pas d'autre script de thème. */
(function () {
  "use strict";
  var root = document.documentElement, btn = document.getElementById("themeBtn"), icon = document.getElementById("thIcon");
  if (!btn) return;
  var SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  function cur() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  function paint() { if (icon) icon.innerHTML = cur() === "dark" ? SUN : MOON; }
  try { var st = localStorage.getItem("ci_theme"); if (st) root.setAttribute("data-theme", st); } catch (e) {}
  paint();
  btn.addEventListener("click", function () {
    var next = cur() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("ci_theme", next); } catch (e) {}
    paint();
  });
})();
