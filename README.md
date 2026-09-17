# ∇ Champs & Intégrales

Site de révision pour le cours d'**Analyse 3 — ING2 semestre 1** :
fonctions de plusieurs variables, opérateurs vectoriels (grad, div, rot),
courbes/surfaces/solides, intégrales multiples, curvilignes et de surface,
optimisation.

Statique, sans dépendance, hébergeable tel quel sur GitHub Pages.

## Contenu

| Section | Description |
|---|---|
| 📚 **Cours complet** | 8 chapitres structurés : définitions, théorèmes (Fermat, Schwarz, Green-Riemann, Stokes, Ostrogradski, Lagrange…), méthodes et exemples |
| 💡 **Notions clés** | Une fiche de synthèse par chapitre — l'essentiel pour le DS et le partiel |
| 📘 **Formules détaillées** | Bloc notations + toutes les formules avec conditions et cas particuliers |
| ⚡ **Formules express** | Aide-mémoire brut, une colonne par chapitre |
| 🧭 **Déroulés** | Table de décision « je vois → je pense » + 15 exercices types résolus pas à pas (calculs complets, réponse, pourquoi) |
| 🎯 **Exos types** | Les exercices classiques et leur méthode pas-à-pas |
| 🧰 **À côté** | Prérequis de calcul (primitives, trigo, DL, déterminants), pièges classiques par chapitre, règles de rédaction |
| 🧠 **Quiz & Flashcards** | 60 QCM + 40 flashcards, chapitres au choix, ordre ou aléatoire |
| 📅 **Planning** | Modèle de planning couplé au reste du semestre |

**Fonctionnalités** : thème clair/sombre, suivi de progression (localStorage),
visionneuse plein écran, responsive mobile.

## Programme couvert (feuille officielle 2026-2027)

1. Révisions géométrie du plan et de l'espace
2. Fonctions de plusieurs variables
3. Opérateurs vectoriels (∇ · div · rot · laplacien)
4. Courbes, surfaces et solides (paramétrisations)
5. Intégrales multiples (doubles et triples)
6. Intégrales curvilignes (Green-Riemann)
7. Intégrales de surface (Stokes, Ostrogradski)
8. Optimisation (extrema libres et sous contraintes)

## Structure

```
nombres-et-espaces/
├── index.html          # page unique (SPA)
├── css/
│   └── style.css       # design system, thèmes clair/sombre
├── js/
│   ├── app.js          # navigation, thème, progression, filtres
│   ├── quiz.js         # moteur de quiz + banque de questions
│   └── lightbox.js     # visionneuse plein écran
├── assets/
│   ├── favicon.svg     # nabla ∇
│   └── img/            # (vide pour l'instant)
├── .nojekyll
└── README.md
```

## Publier sur GitHub Pages

### 1. Créer le dépôt

Sur [github.com/new](https://github.com/new), créez un dépôt **vide**
(ne cochez rien : ni README, ni .gitignore).

### 2. Pousser le code

Le dépôt local est déjà initialisé.
Depuis ce dossier :

```bash
git remote add origin https://github.com/VOTRE-PSEUDO/champs-et-integrales.git
git push -u origin main
```

Git demandera votre identifiant et un **jeton d'accès personnel** (à créer
sur [github.com/settings/tokens](https://github.com/settings/tokens) →
*Generate new token (classic)* → portée **`repo`**).

> ⚠️ **N'utilisez pas le bouton « Upload files »** de l'interface web
> (limite à 100 fichiers).

### 3. Activer Pages

**Settings** → **Pages** → *Source : Deploy from a branch* →
Branche **main**, dossier **/ (root)** → **Save**.

Site en ligne sous 1-2 minutes à :
`https://VOTRE-PSEUDO.github.io/champs-et-integrales/`

## Lancer en local

```bash
python -m http.server 8766
```

Puis <http://localhost:8766>.

## Notes

- Contenu = synthèse pédagogique tirée du polycopié Analyse 3 ING2
  2026-2027 (dossier `analyse et algèbre`). Théorèmes standards
  (Schwarz, Green-Riemann, Stokes, Ostrogradski, Fermat, Lagrange)
  en formulation classique.
- Progression stockée en `localStorage` (propre à chaque appareil).
- Nom du dossier historique : `nombres-et-espaces` — il pourra être
  renommé en `champs-et-integrales` lors du push sur GitHub si vous
  préférez que l'URL corresponde au nouveau nom.
