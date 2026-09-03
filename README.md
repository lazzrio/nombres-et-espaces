# ∑ Nombres & Espaces

Site de révision pour les cours de **maths ING2 semestre 1** :
Analyse 3 (séries numériques, séries de Fourier) et Algèbre 3
(matrices, déterminants, espaces vectoriels, applications linéaires).

Statique, sans dépendance, hébergeable tel quel sur GitHub Pages.

## Contenu

| Section | Description |
|---|---|
| 📚 **Cours complet** | 7 chapitres structurés : définitions, théorèmes (Cauchy, D'Alembert, Riemann, Dirichlet, Abel, Parseval, théorème du rang, Grassmann…), méthodes et exemples |
| 💡 **Notions clés** | Une fiche de synthèse par chapitre — l'essentiel pour le DS et le partiel |
| 📘 **Formules détaillées** | Bloc notations + toutes les formules avec conditions et cas particuliers |
| ⚡ **Formules express** | Aide-mémoire brut, une colonne par chapitre |
| 🎯 **Exos types** | Les exercices classiques et leur méthode pas-à-pas |
| 🧠 **Quiz & Flashcards** | 46 QCM + 39 flashcards, chapitres au choix, ordre ou aléatoire |
| 📅 **Planning** | Modèle de planning couplé au reste du semestre |

**Fonctionnalités** : thème clair/sombre, suivi de progression (localStorage),
visionneuse plein écran, responsive mobile.

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
│   ├── favicon.svg
│   └── img/            # (vide pour l'instant)
├── .nojekyll           # désactive Jekyll sur GitHub Pages
└── README.md
```

## Publier sur GitHub Pages

### 1. Créer le dépôt

Sur [github.com/new](https://github.com/new), créez un dépôt **vide**
(ne cochez rien : ni README, ni .gitignore).

### 2. Pousser le code

Le dépôt local est déjà initialisé (`git init` + premier commit fait).
Depuis ce dossier :

```bash
git remote add origin https://github.com/VOTRE-PSEUDO/nombres-et-espaces.git
git push -u origin main
```

Git demandera votre identifiant et un **jeton d'accès personnel** (créez-le
sur [github.com/settings/tokens](https://github.com/settings/tokens) → *Generate new token (classic)*
→ portée **`repo`**).

> ⚠️ **N'utilisez pas le bouton « Upload files »** de l'interface web : limite à 100 fichiers.

### 3. Activer Pages

Dans le dépôt : **Settings** → **Pages** → *Source : Deploy from a branch* →
Branche **main**, dossier **/ (root)** → **Save**.

Le site sera en ligne sous 1-2 minutes à l'adresse :

```
https://VOTRE-PSEUDO.github.io/nombres-et-espaces/
```

### 4. Mettre à jour plus tard

```bash
git add .
git commit -m "Mise à jour"
git push
```

## Lancer en local

Pour tester, ouvrez d'abord un serveur (Python 3) :

```bash
python -m http.server 8766
```

Puis ouvrez <http://localhost:8766>.

## Notes

- Le contenu est une **synthèse pédagogique** des cours ING2 — définitions,
  théorèmes standards, méthodes. Aucune ressource externe requise en dehors
  des polices Google Fonts.
- La progression de lecture (chapitres cochés, thème) est stockée dans le
  `localStorage` du navigateur : propre à chaque appareil.
- Les schémas issus des supports de cours n'ont pas été ajoutés ici — les
  chapitres maths sont surtout textuels. Si besoin de figures (courbes
  Fourier, illustrations géométriques), je peux les intégrer.
