# ∇ Champs & Intégrales

Site de révision pour le cours d'**Analyse 3 — ING2 semestre 1 (ECE)** :
fonctions de plusieurs variables, opérateurs vectoriels (grad, div, rot),
courbes/surfaces/solides, intégrales multiples, curvilignes et de surface,
optimisation.

Statique (seule la bibliothèque de formules KaTeX est chargée depuis un CDN, puis gardée hors ligne), hébergé tel quel sur GitHub Pages :
<https://lazzrio.github.io/nombres-et-espaces/>

## Contenu

| Section | Description |
|---|---|
| 📚 **Cours complet** | 8 chapitres : définitions, théorèmes (Fermat, Schwarz, Poincaré, Green-Riemann, Stokes, Ostrogradsky, Lagrange…), méthodes, exemples, plus les compléments utiles à un ingénieur (EDP simples, ouverts étoilés, coniques et quadriques, éléments de surface, Hessienne en dimension n, Lagrange à plusieurs contraintes) |
| ✅ **Exercices corrigés** (`corriges.html`) | Les 70 exercices de la feuille 2026-2027 + les 4 exercices supplémentaires du chapitre 1 : méthode avec rappels de cours, correction détaillée pas à pas avec les formules écrites comme sur une copie (rendu KaTeX : vraies fractions, intégrales, vecteurs, matrices), pièges, contrôle du résultat. Recherche, filtre par thème, suivi « fait » |
| 🛠 **Méthodes** | La boîte à outils par chapitre |
| 🧭 **Déroulés** | Table de décision « je vois → je pense » + 15 exercices types résolus pas à pas |
| 💡 **Notions clés** | Une fiche de synthèse par chapitre, avec réflexes et pièges |
| 📘 **Formules détaillées** / ⚡ **Express** | Toutes les formules avec leurs conditions, et l'aide-mémoire brut |
| 🎯 **Exos types** | Les exercices classiques et leur méthode |
| 🧰 **À côté** | Prérequis de calcul, ∇ en cylindriques et sphériques, inégalités utiles, vérifier un calcul (SciPy, SymPy, WolframAlpha, GeoGebra), liens avec l'électromagnétisme et la mécanique, pièges classiques, rédaction |
| 🧠 **Quiz & Flashcards** | 60 QCM + 40 flashcards, chapitres au choix |
| 📅 **Planning** | Dates d'évaluation de l'emploi du temps et plan de révision |

Tous les résultats des corrigés ont été vérifiés numériquement (175 contrôles avec NumPy/SciPy).

**Fonctionnalités** : thème clair/sombre, adresses directes vers chaque vue
(`index.html#cours`, `index.html#ch3-quadriques`, `corriges.html#imu-3`),
bouton « retour » du navigateur, suivi de progression (localStorage),
utilisable hors ligne et installable sur téléphone (service worker + manifest),
mise en page testée à 375, 768, 1024 et 1280 px, impression des corrigés dépliés.

## Programme couvert (feuille officielle 2026-2027)

1. Révisions géométrie du plan et de l'espace
2. Fonctions de plusieurs variables (et EDP simples)
3. Opérateurs vectoriels (∇ · div · rot · laplacien, potentiels)
4. Courbes, surfaces et solides (paramétrisations, coniques, quadriques)
5. Intégrales multiples (doubles et triples)
6. Intégrales curvilignes (Green-Riemann)
7. Intégrales de surface (Stokes, Green-Ostrogradsky)
8. Optimisation (extrema libres, sur un compact, sous contraintes)

## Structure

```
nombres-et-espaces/
├── index.html            # page unique (vues : cours, méthodes, déroulés…)
├── corriges.html         # la feuille d'exercices corrigée
├── 404.html              # page d'erreur GitHub Pages
├── manifest.webmanifest  # installation sur téléphone
├── sw.js                 # hors ligne (réseau d'abord, cache ensuite)
├── css/style.css         # design system, thèmes clair/sombre, responsive
├── js/
│   ├── app.js            # navigation, adresses, thème, progression, filtres
│   ├── corriges.js       # recherche, filtres, suivi « fait » des corrigés
│   ├── maths.js          # rendu des formules (KaTeX) et ajustement à la largeur de l'écran
│   ├── quiz.js           # moteur de quiz + banque de questions
│   └── lightbox.js       # visionneuse plein écran
├── assets/
│   ├── favicon.svg, icon-192.png, icon-512.png
│   └── img/              # figures extraites du poly
├── .nojekyll
└── README.md
```

## Mettre en ligne

Le dépôt est relié à `https://github.com/lazzrio/nombres-et-espaces.git`
et GitHub Pages publie la branche **main** (dossier racine). Après un commit :

```bash
git push
```

Le site est à jour sous 1-2 minutes. Si le téléphone affiche une ancienne
version, recharger la page une fois (le service worker récupère toujours
la version réseau en priorité).

## Lancer en local

```bash
python -m http.server 8766
```

Puis <http://localhost:8766>.

## Notes

- Contenu = synthèse pédagogique tirée du polycopié et de la feuille
  d'exercices Analyse 3 ING2 2026-2027 (dossier `analyse et algèbre`).
- Quand un énoncé est ambigu (orientation non précisée, rayon non donné…),
  le corrigé le signale et traite les cas possibles.
- Progression stockée en `localStorage` (propre à chaque appareil).
