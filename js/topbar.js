/* Barre du haut escamotable : un bouton la masque (pour gagner de la place), une petite pastille la ramène.
   Le choix est mémorisé. Chargé dans le <head> pour éviter tout « flash » de la barre au chargement. */
(function () {
  "use strict";
  var KEY = "ci_topbar", root = document.documentElement;
  function lire() { try { return localStorage.getItem(KEY) === "off"; } catch (e) { return false; } }
  function ecrire(off) {
    root.classList.toggle("topbar-off", off);
    try { localStorage.setItem(KEY, off ? "off" : "on"); } catch (e) {}
    var nav = document.getElementById("nav");
    if (nav) nav.classList.remove("open");
  }
  root.classList.toggle("topbar-off", lire());

  document.addEventListener("DOMContentLoaded", function () {
    var inner = document.querySelector(".topbar-in");
    if (!inner) return;
    var cacher = document.createElement("button");
    cacher.type = "button";
    cacher.className = "tb-hide";
    cacher.title = "Masquer la barre du haut (gagner de la place)";
    cacher.setAttribute("aria-label", "Masquer la barre du haut");
    cacher.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M6 15l6-6 6 6"/><path d="M6 20h12"/></svg>';
    var burger = document.getElementById("burger");
    if (burger) inner.insertBefore(cacher, burger); else inner.appendChild(cacher);
    cacher.addEventListener("click", function () { ecrire(true); });

    var montrer = document.createElement("button");
    montrer.type = "button";
    montrer.className = "tb-show";
    montrer.title = "Afficher la barre du haut";
    montrer.setAttribute("aria-label", "Afficher la barre du haut");
    montrer.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M6 9l6 6 6-6"/></svg><span>Menu</span>';
    document.body.appendChild(montrer);
    montrer.addEventListener("click", function () { ecrire(false); });
  });
})();
