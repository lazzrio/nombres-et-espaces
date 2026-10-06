(function(){
  "use strict";
  var CHNAMES=[
    "Géométrie",
    "Fonctions plusieurs variables",
    "Opérateurs vectoriels",
    "Courbes & surfaces",
    "Intégrales multiples",
    "Intégrales curvilignes",
    "Intégrales de surface",
    "Optimisation"
  ];

  /* ---- QCM bank ---- */
  var QCM=[
   /* Ch 0 — Géométrie */
   {c:0,q:"Le produit scalaire de \\(u=(1,\\,\\allowbreak 2,\\,\\allowbreak 3)\\) et \\(v=(4,\\,\\allowbreak -1,\\,\\allowbreak 2)\\) vaut :",o:["8","4","-2","12"],a:0,e:"\\(u\\cdot v=1\\cdot 4+2\\cdot (-1)+3\\cdot 2=4-2+6=8\\)."},
   {c:0,q:"L'aire du parallélogramme construit sur \\(u\\) et \\(v\\) vaut :",o:["\\(u\\cdot v\\)","\\(\\Vert u\\Vert \\cdot \\Vert v\\Vert \\cdot \\cos \\,\\theta\\)","\\(\\Vert u\\wedge v\\Vert\\)","\\(\\det (u,\\,\\allowbreak v,\\,\\allowbreak 0)\\)"],a:2,e:"L'aire est la norme du produit vectoriel : \\(\\Vert u\\wedge v\\Vert =\\Vert u\\Vert \\cdot \\Vert v\\Vert \\cdot |\\sin \\,\\theta |\\)."},
   {c:0,q:"Le produit mixte \\([u,\\,\\allowbreak v,\\,\\allowbreak w]\\) égale :",o:["\\(u\\cdot (v+w)\\)","\\((u\\wedge v)\\cdot w\\)","\\(u\\cdot v\\cdot w\\)","\\(u\\wedge (v\\wedge w)\\)"],a:1,e:"\\([u,\\,\\allowbreak v,\\,\\allowbreak w]=(u\\wedge v)\\cdot w=\\det (u,\\,\\allowbreak v,\\,\\allowbreak w)\\). Son module donne le volume."},
   {c:0,q:"Un plan d'équation \\(2x+y-z=5\\) a pour vecteur normal :",o:["\\((2,\\,\\allowbreak 1,\\,\\allowbreak -1)\\)","\\((5,\\,\\allowbreak 0,\\,\\allowbreak 0)\\)","\\((1,\\,\\allowbreak 1,\\,\\allowbreak 1)\\)","\\((-2,\\,\\allowbreak -1,\\,\\allowbreak 1)\\)"],a:0,e:"Les coefficients \\((a,\\,\\allowbreak b,\\,\\allowbreak c)\\) sont les composantes du vecteur normal."},
   {c:0,q:"Distance du point \\((1,\\,\\allowbreak 1,\\,\\allowbreak 1)\\) au plan \\(x+y+z=6\\) :",o:["\\(\\frac{3}{\\sqrt{3}}=\\sqrt{3}\\)","\\(\\frac{6}{\\sqrt{3}}\\)","1","0"],a:0,e:"\\(d=|1+1+1-6|/\\sqrt{1+1+1}=\\frac{3}{\\sqrt{3}}=\\sqrt{3}\\)."},

   /* Ch 1 — Fonctions plusieurs variables */
   {c:1,q:"Pour \\(f(x,\\,\\allowbreak y)=x^{2}y+y^{3}\\), la dérivée partielle \\(\\frac{\\partial  f}{\\partial  x}\\) vaut :",o:["\\(x^{2}+3y^{2}\\)","\\(2xy\\)","\\(2xy+3y^{2}\\)","\\(2x+y^{3}\\)"],a:1,e:"On dérive en \\(x\\) en fixant \\(y\\) comme une constante : \\((x^{2})'\\,\\cdot \\,y=2xy\\)."},
   {c:1,q:"Le théorème de Schwarz énonce que, pour \\(f\\) de classe \\(C^{2}\\) :",o:["\\(\\frac{\\partial  f}{\\partial  x}=\\frac{\\partial  f}{\\partial  y}\\)","\\(\\frac{\\partial ^{2} f}{\\partial  x \\partial  y}=\\frac{\\partial ^{2} f}{\\partial  y \\partial  x}\\)","\\(f\\) est différentiable","\\(\\frac{\\partial  f}{\\partial  x}\\cdot y=0\\)"],a:1,e:"L'ordre des dérivations mixtes ne compte pas quand \\(f\\) est \\(C^{2}\\)."},
   {c:1,q:"La matrice jacobienne d'une fonction \\(f\\colon \\mathbb{R} ^{3}\\to \\mathbb{R} ^{2}\\) est de taille :",o:["\\(2\\times 3\\)","\\(3\\times 2\\)","\\(3\\times 3\\)","\\(2\\times 2\\)"],a:0,e:"\\(J_{f}\\) a \\(p\\) lignes et \\(n\\) colonnes : ici \\(p=2,\\,\\allowbreak n=3\\), donc \\(2\\times 3\\)."},
   {c:1,q:"Pour \\(f\\colon \\mathbb{R} ^{2}\\to \\mathbb{R}\\), le gradient est :",o:["un scalaire","un vecteur (2 composantes)","une matrice \\(2\\times 2\\)","toujours nul"],a:1,e:"\\(\\nabla  f=\\left(\\frac{\\partial  f}{\\partial  x},\\,\\allowbreak \\frac{\\partial  f}{\\partial  y}\\right)\\) — un vecteur à 2 composantes."},
   {c:1,q:"Une méthode standard pour montrer qu'une limite de \\(f(x,\\,\\allowbreak y)\\) en \\((0,\\,\\allowbreak 0)\\) n'existe pas :",o:["passer en polaires","tester deux chemins différents","calculer les dérivées","appliquer Schwarz"],a:1,e:"Si deux chemins (par ex. \\(y=0\\) et \\(y=x\\)) donnent des limites différentes, la limite n'existe pas."},

   /* Ch 2 — Opérateurs vectoriels */
   {c:2,q:"Pour un champ scalaire \\(f,\\,\\allowbreak \\nabla  f\\) est :",o:["un champ scalaire","un champ vectoriel","une matrice","un nombre"],a:1,e:"Le gradient d'un champ scalaire est un champ vectoriel."},
   {c:2,q:"Pour un champ vectoriel \\(F,\\,\\allowbreak \\operatorname{div} \\,F\\) est :",o:["un champ vectoriel","un champ scalaire","un nombre","le rotationnel"],a:1,e:"La divergence est un champ scalaire : somme des dérivées partielles diagonales."},
   {c:2,q:"L'identité \\(\\operatorname{rot} (\\operatorname{grad} \\,f)\\) vaut :",o:["\\(\\operatorname{grad} \\,f\\)","\\(f\\)","0","\\(\\nabla  f\\)"],a:2,e:"\\(\\operatorname{rot} (\\nabla  f)=0\\) pour tout champ scalaire de classe \\(C^{2}\\) — conséquence de Schwarz."},
   {c:2,q:"L'identité \\(\\operatorname{div} (\\operatorname{rot} \\,F)\\) vaut :",o:["\\(\\operatorname{div} \\,F\\)","\\(\\operatorname{rot} \\,F\\)","0","\\(F\\)"],a:2,e:"\\(\\operatorname{div} (\\operatorname{rot} \\,F)=0\\) pour tout champ vectoriel \\(C^{2}\\) — dualité avec \\(\\operatorname{rot} (\\operatorname{grad} \\,f)=0\\)."},
   {c:2,q:"Le laplacien \\(\\Delta f\\) est défini par :",o:["\\(\\operatorname{grad} (\\operatorname{div} \\,f)\\)","\\(\\operatorname{div} (\\operatorname{grad} \\,f)\\)","\\(\\operatorname{rot} (\\operatorname{grad} \\,f)\\)","\\(\\operatorname{rot} (\\operatorname{rot} \\,f)\\)"],a:1,e:"\\(\\Delta f=\\operatorname{div} (\\operatorname{grad} \\,f)=\\frac{\\partial ^{2} f}{\\partial  x^{2}}+\\frac{\\partial ^{2} f}{\\partial  y^{2}}+\\frac{\\partial ^{2} f}{\\partial  z^{2}}\\)."},
   {c:2,q:"Si \\(\\operatorname{rot} \\,F=0\\) sur un ouvert simplement connexe, alors \\(F\\) :",o:["est constant","dérive d'un potentiel scalaire","est nul","est irrotationnel mais pas de potentiel"],a:1,e:"\\(F=\\nabla  \\varphi\\) pour un certain champ scalaire \\(\\varphi\\). On dit que \\(F\\) est un champ de gradient."},
   {c:2,q:"Le gradient de \\(f\\) est, en tout point, orienté :",o:["dans le sens des \\(f\\) décroissants","tangent aux lignes de niveau","normal aux surfaces \\(f=\\text{cste}\\)","parallèle à Ox"],a:2,e:"\\(\\nabla  f\\) est perpendiculaire aux surfaces (lignes en \\(2D\\)) où \\(f\\) est constant."},

   /* Ch 3 — Courbes & surfaces */
   {c:3,q:"Les coordonnées polaires sont :",o:["\\(x=r\\,\\cos \\,\\theta ,\\,\\allowbreak y=r\\,\\sin \\,\\theta\\)","\\(x=r\\,\\sin \\,\\theta ,\\,\\allowbreak y=r\\,\\cos \\,\\theta\\)","\\(x=\\theta \\,\\cos \\,r,\\,\\allowbreak y=\\theta \\,\\sin \\,r\\)","\\(x=r,\\,\\allowbreak y=\\theta\\)"],a:0,e:"Polaires : \\(x=r\\,\\cos \\,\\theta ,\\,\\allowbreak y=r\\,\\sin \\,\\theta\\), avec \\(r\\ge 0,\\,\\allowbreak \\theta \\,\\in [0,\\,\\allowbreak 2\\pi [\\)."},
   {c:3,q:"Le jacobien du passage en coordonnées polaires est :",o:["1","\\(r\\)","\\(r^{2}\\)","\\(\\sin \\,\\theta\\)"],a:1,e:"\\(|J|=r\\), donc \\(\\mathrm{d}x\\,\\mathrm{d}y=r\\,\\mathrm{d}r\\,\\mathrm{d}\\theta\\)."},
   {c:3,q:"Le jacobien du passage en coordonnées sphériques est :",o:["\\(r\\)","\\(r^{2}\\)","\\(r\\,\\sin \\,\\varphi\\)","\\(r^{2}\\,\\sin \\,\\varphi\\)"],a:3,e:"\\(|J|=r^{2}\\,\\sin \\,\\varphi\\), donc \\(\\mathrm{d}V=r^{2}\\,\\sin \\,\\varphi \\,\\mathrm{d}r\\,\\mathrm{d}\\varphi \\,\\mathrm{d}\\theta\\)."},
   {c:3,q:"Un cercle de rayon \\(R\\) centré en l'origine peut être paramétré par :",o:["\\((t,\\,\\allowbreak R-t),\\,\\allowbreak t\\,\\in [0,\\,\\allowbreak R]\\)","\\((R\\,\\cos \\,t,\\,\\allowbreak R\\,\\sin \\,t),\\,\\allowbreak t\\,\\in [0,\\,\\allowbreak 2\\pi ]\\)","\\((R,\\,\\allowbreak t),\\,\\allowbreak t\\,\\in [0,\\,\\allowbreak 2\\pi ]\\)","\\((t^{2},\\,\\allowbreak t),\\,\\allowbreak t\\,\\in \\,\\mathbb{R}\\)"],a:1,e:"Paramétrisation classique du cercle : \\((R\\,\\cos \\,t,\\,\\allowbreak R\\,\\sin \\,t)\\)."},
   {c:3,q:"Une sphère de rayon \\(R\\) se paramètre par \\((\\theta ,\\,\\allowbreak \\varphi )\\to\\) :",o:["\\((R,\\,\\allowbreak \\theta ,\\,\\allowbreak \\varphi )\\)","\\((R\\,\\cos \\,\\theta ,\\,\\allowbreak R\\,\\sin \\,\\theta ,\\,\\allowbreak R)\\)","\\((R\\,\\sin \\,\\varphi \\,\\cos \\,\\theta ,\\,\\allowbreak R\\,\\sin \\,\\varphi \\,\\sin \\,\\theta ,\\,\\allowbreak R\\,\\cos \\,\\varphi )\\)","\\((R\\,\\theta ,\\,\\allowbreak R\\,\\varphi ,\\,\\allowbreak R)\\)"],a:2,e:"Paramétrisation classique de la sphère avec \\(\\varphi \\,\\in [0,\\,\\allowbreak \\pi ],\\,\\allowbreak \\theta \\,\\in [0,\\,\\allowbreak 2\\pi [\\)."},
   {c:3,q:"Pour une intégrale sur une boule, quel système est le plus adapté ?",o:["cartésien","polaire","cylindrique","sphérique"],a:3,e:"Symétrie centrale ⟹ sphériques. La boule devient \\(r\\,\\in [0,\\,\\allowbreak R],\\,\\allowbreak \\varphi \\,\\in [0,\\,\\allowbreak \\pi ],\\,\\allowbreak \\theta \\,\\in [0,\\,\\allowbreak 2\\pi [\\)."},

   /* Ch 4 — Intégrales multiples */
   {c:4,q:"Le théorème de Fubini permet de calculer :",o:["une intégrale simple","une intégrale double en deux intégrales successives","une intégrale de surface","le jacobien"],a:1,e:"Fubini : \\(\\iint \\,f\\,\\mathrm{d}x\\,\\mathrm{d}y=\\int \\left(\\int \\,f\\,\\mathrm{d}x\\right)\\mathrm{d}y\\) sous conditions raisonnables (rectangle, \\(f\\) continue)."},
   {c:4,q:"Dans un changement de variables \\((x,\\,\\allowbreak y)\\to (u,\\,\\allowbreak v)\\), on multiplie par :",o:["le déterminant du gradient","la valeur absolue du jacobien \\(|J|\\)","le laplacien","1"],a:1,e:"\\(\\iint \\,f\\,\\mathrm{d}x\\,\\mathrm{d}y=\\iint \\,f\\circ \\varphi \\,\\cdot |J_{\\varphi }|\\,\\mathrm{d}u\\,\\mathrm{d}v\\)."},
   {c:4,q:"Pour intégrer sur un disque, on passe en polaires. dxdy devient :",o:["dr dθ","\\(r\\,\\mathrm{d}r\\,\\mathrm{d}\\theta\\)","\\(r^{2}\\,\\mathrm{d}r\\,\\mathrm{d}\\theta\\)","\\(\\sin \\,\\theta \\,\\mathrm{d}r\\,\\mathrm{d}\\theta\\)"],a:1,e:"Le jacobien polaire est \\(r\\colon \\mathrm{d}x\\,\\mathrm{d}y=r\\,\\mathrm{d}r\\,\\mathrm{d}\\theta\\)."},
   {c:4,q:"Pour un volume \\(\\iiint \\,1\\,\\mathrm{d}x\\,\\mathrm{d}y\\,\\mathrm{d}z\\) d'une boule de rayon \\(R\\) (sphériques) :",o:["\\(\\int _{0}^{R}\\,\\int _{0}^{\\pi }\\,\\int _{0}^{2\\pi }\\,r^{2}\\,\\sin \\,\\varphi \\,\\mathrm{d}\\theta \\,\\mathrm{d}\\varphi \\,\\mathrm{d}r\\)","\\(\\int _{0}^{R}\\,\\int _{0}^{2\\pi }\\,\\int _{0}^{\\pi }\\,r\\,\\sin \\,\\varphi \\,\\mathrm{d}\\theta \\,\\mathrm{d}\\varphi \\,\\mathrm{d}r\\)","\\(\\int _{0}^{R}\\,\\int _{0}^{2\\pi }\\,\\int _{0}^{\\pi }\\,1\\,\\mathrm{d}\\theta \\,\\mathrm{d}\\varphi \\,\\mathrm{d}r\\)","\\(\\int _{0}^{R}\\,4\\pi r^{2}\\,\\mathrm{d}r\\)"],a:0,e:"Volume boule \\(=\\int \\int \\int \\,r^{2}\\,\\sin \\,\\varphi \\,\\mathrm{d}r\\,\\mathrm{d}\\varphi \\,\\mathrm{d}\\theta =\\frac{4\\pi R^{3}}{3}\\)."},
   {c:4,q:"Pour calculer le volume d'un cylindre, le plus adapté est :",o:["cartésiennes","polaires","cylindriques","sphériques"],a:2,e:"Symétrie autour de Oz ⟹ cylindriques. \\(\\mathrm{d}V=r\\,\\mathrm{d}r\\,\\mathrm{d}\\theta \\,\\mathrm{d}z\\)."},

   /* Ch 5 — Intégrales curvilignes */
   {c:5,q:"La circulation d'un champ \\(F=(P,\\,\\allowbreak Q)\\) le long d'une courbe \\(\\gamma\\) paramétrée par \\(t\\) est :",o:["\\(\\int \\,P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y=\\int (P\\cdot x'+Q\\cdot y')\\,\\mathrm{d}t\\)","\\(\\int \\,P\\cdot Q\\,\\mathrm{d}t\\)","\\(\\int (P+Q)\\,\\mathrm{d}t\\)","\\(\\int \\,\\mathrm{d}t\\)"],a:0,e:"\\(\\int _{\\gamma }\\,F\\cdot \\mathrm{d}l=\\int \\,P(\\gamma (t))\\cdot x'(t)+Q(\\gamma (t))\\cdot y'(t)\\,\\mathrm{d}t\\)."},
   {c:5,q:"Green-Riemann relie une circulation sur \\(\\partial  D\\) à :",o:["une intégrale simple","une intégrale double sur \\(D\\)","un flux","une somme"],a:1,e:"\\(\\oint _{\\partial  D}\\,P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y=\\iint _{D}\\,\\left(\\frac{\\partial  Q}{\\partial  x}-\\frac{\\partial  P}{\\partial  y}\\right)\\,\\mathrm{d}x\\,\\mathrm{d}y\\)."},
   {c:5,q:"Pour un champ de gradient \\(F=\\nabla  \\varphi\\), la circulation entre \\(A\\) et \\(B\\) :",o:["est toujours nulle","dépend du chemin","vaut \\(\\varphi (B)-\\varphi (A)\\)","vaut \\(\\varphi (B)+\\varphi (A)\\)"],a:2,e:"\\(\\int _{\\gamma }\\,\\nabla  \\varphi \\cdot \\mathrm{d}l=\\varphi (B)-\\varphi (A)\\). Ne dépend que des extrémités !"},
   {c:5,q:"Sur une courbe fermée, la circulation d'un champ de gradient est :",o:["\\(\\varphi (A)+\\varphi (A)\\)","nulle","\\(\\infty\\)","\\(\\varphi (A)\\)"],a:1,e:"\\(A=B\\) sur courbe fermée, donc \\(\\varphi (B)-\\varphi (A)=0\\)."},
   {c:5,q:"L'aire d'un domaine \\(D\\) via Green-Riemann s'écrit :",o:["\\(\\oint \\,\\mathrm{d}x\\,\\mathrm{d}y\\)","\\(\\frac{1}{2}\\,\\oint \\,(x\\,\\mathrm{d}y-y\\,\\mathrm{d}x)\\)","\\(\\oint \\,(x+y)\\,\\mathrm{d}l\\)","\\(\\oint \\Vert \\gamma '\\Vert \\,\\mathrm{d}t\\)"],a:1,e:"Prendre \\(P=\\frac{-y}{2}\\) et \\(Q=\\frac{x}{2}\\) dans Green donne aire\\((D)=\\frac{1}{2}\\oint (x\\,\\mathrm{d}y-y\\,\\mathrm{d}x)\\)."},

   /* Ch 6 — Intégrales de surface */
   {c:6,q:"Le vecteur normal à une surface paramétrée par \\((u,\\,\\allowbreak v)\\to M(u,\\,\\allowbreak v)\\) est :",o:["\\(\\frac{\\partial  M}{\\partial  u}+\\frac{\\partial  M}{\\partial  v}\\)","\\(\\frac{\\partial  M}{\\partial  u}\\,\\wedge \\,\\frac{\\partial  M}{\\partial  v}\\)","\\(\\frac{\\partial  M}{\\partial  u}\\,\\cdot \\,\\frac{\\partial  M}{\\partial  v}\\)","gradient de \\(M\\)"],a:1,e:"\\(N=\\frac{\\partial  M}{\\partial  u}\\,\\wedge \\,\\frac{\\partial  M}{\\partial  v}\\), et l'élément d'aire \\(\\mathrm{d}S=\\Vert N\\Vert \\,\\mathrm{d}u\\,\\mathrm{d}v\\)."},
   {c:6,q:"Le théorème de Stokes s'écrit :",o:["\\(\\oint _{\\partial  S}\\,F\\cdot \\mathrm{d}l=\\iint _{S}\\,\\operatorname{rot} \\,F\\,\\cdot \\,n\\,\\mathrm{d}S\\)","\\(\\iint _{S}\\,F\\,\\mathrm{d}S=\\oint \\,F\\cdot \\mathrm{d}l\\)","\\(\\oint\\!\\!\\!\\oint _{S}\\,F\\cdot n=\\iiint \\,\\operatorname{div} \\,F\\)","\\(\\operatorname{rot} \\,F=0\\)"],a:0,e:"Stokes : circulation sur le bord = flux du rotationnel à travers la surface."},
   {c:6,q:"Le théorème de Green-Ostrogradski (divergence) énonce :",o:["\\(\\oint\\!\\!\\!\\oint _{\\partial  V}\\,F\\cdot n\\,\\mathrm{d}S=\\iiint _{V}\\,\\operatorname{div} \\,F\\,\\mathrm{d}V\\)","\\(\\oint\\!\\!\\!\\oint \\,F=\\oint \\,F\\)","\\(\\iint \\,\\operatorname{rot} \\,F=\\oint\\!\\!\\!\\oint \\,F\\)","\\(\\operatorname{div} \\,F=0\\)"],a:0,e:"Flux à travers surface fermée = intégrale de la divergence dans le volume."},
   {c:6,q:"Le flux d'un champ vectoriel \\(F\\) à travers une surface \\(S\\) orientée par \\(n\\) vaut :",o:["\\(\\iint _{S}\\,F\\,\\cdot \\,n\\,\\mathrm{d}S\\)","\\(\\iint _{S}\\Vert F\\Vert \\,\\mathrm{d}S\\)","\\(\\iint _{S}\\,\\operatorname{rot} \\,F\\,\\mathrm{d}S\\)","\\(\\int _{\\partial  S}\\,F\\cdot \\mathrm{d}l\\)"],a:0,e:"Définition du flux : \\(\\Phi =\\iint _{S}\\,F\\cdot n\\,\\mathrm{d}S\\)."},
   {c:6,q:"Pour une surface fermée, pour calculer un flux, on préfère souvent :",o:["Stokes","Ostrogradski (divergence)","Green-Riemann","calcul direct"],a:1,e:"Surface fermée ⟹ Ostrogradski transforme en intégrale triple, souvent plus simple."},

   /* Ch 7 — Optimisation */
   {c:7,q:"Un point critique d'une fonction \\(f\\colon \\mathbb{R} ^{2}\\to \\mathbb{R}\\) est un point où :",o:["\\(f=0\\)","\\(\\nabla  f=0\\)","\\(\\Delta =0\\)","\\(H\\) est nulle"],a:1,e:"Point critique \\(=\\nabla  f=0\\). C'est une CN pour un extremum intérieur."},
   {c:7,q:"Le discriminant hessien \\(\\Delta\\) d'une fonction à 2 variables vaut :",o:["\\(f_{xx}+f_{yy}\\)","\\(f_{xx}\\,\\cdot \\,f_{yy}-f_{xy}^{2}\\)","\\(f_{xx}-f_{yy}\\)","\\(f_{xy}^{2}-f_{xx}\\cdot f_{yy}\\)"],a:1,e:"\\(\\Delta =\\det (H)=f_{xx}\\cdot f_{yy}-(f_{xy})^{2}\\). Signe crucial pour la nature du point critique."},
   {c:7,q:"Si \\(\\Delta \\gt 0\\) et \\(f_{xx}\\gt 0\\) en un point critique, c'est :",o:["un maximum","un minimum","un point selle","indéterminé"],a:1,e:"Test de Monge : \\(\\Delta \\gt 0,\\,\\allowbreak f_{xx}\\gt 0\\Longrightarrow\\) minimum local."},
   {c:7,q:"Si \\(\\Delta \\lt 0\\) en un point critique, c'est :",o:["un maximum","un minimum","un point selle","indéterminé"],a:2,e:"\\(\\Delta \\lt 0\\Longrightarrow\\) point selle (col) : minimum dans une direction, maximum dans une autre."},
   {c:7,q:"Si \\(\\Delta =0\\), on peut conclure :",o:["\\(\\min\\) si \\(f_{xx}\\gt 0\\)","\\(\\max\\) si \\(f_{xx}\\lt 0\\)","rien : cas indéterminé","toujours un selle"],a:2,e:"\\(\\Delta =0\\) : le test échoue, il faut une analyse plus fine (Taylor à un ordre supérieur, etc.)."},
   {c:7,q:"Le multiplicateur de Lagrange sert à :",o:["calculer des dérivées","optimiser sous contrainte","calculer un jacobien","résoudre un système"],a:1,e:"Optimiser \\(f\\) sous la contrainte \\(g=0\\colon \\nabla  f=\\lambda \\nabla  g\\) et \\(g=0\\)."},
   {c:7,q:"Le théorème de Fermat pour une fonction \\(f\\) d'une variable dit :",o:["\\(f\\gt 0\\) sur \\(I\\)","si extremum local en \\(c\\), alors \\(f'(c)=0\\)","\\(f''(c)=0\\)","\\(f\\) est monotone"],a:1,e:"CN : en un extremum intérieur, la dérivée s'annule (tangente horizontale)."},
   /* ---- Méthodes & pièges (ajout) ---- */
   {c:1,q:"\\(f(x,\\,\\allowbreak y)=\\frac{x^{3}}{x^{2}+y^{2}}\\). Le numérateur est de degré 3, le dénominateur de degré 2. Le bon réflexe :",o:["tester deux chemins pour réfuter","passer en polaires et majorer \\(|f|\\le r\\)","calculer la jacobienne","appliquer Schwarz"],a:1,e:"Degré du numérateur &gt; degré du dénominateur : on soupçonne une limite 0, à prouver par majoration. En polaires : \\(f=r\\,\\cos ^{3}\\,\\theta ,\\,\\allowbreak |f|\\le r\\to 0\\)."},
   {c:1,q:"En polaires, on trouve \\(f(r\\,\\cos \\,\\theta ,\\,\\allowbreak r\\,\\sin \\,\\theta )=\\cos \\,2\\theta\\). Conclusion :",o:["la limite vaut \\(\\cos \\,2\\theta\\)","la limite vaut 0","la limite n'existe pas","\\(f\\) est continue"],a:2,e:"Le résultat dépend de la direction \\(\\theta\\) et pas de \\(r\\) : la valeur dépend du chemin, donc pas de limite."},
   {c:2,q:"Pour trouver \\(\\varphi\\) tel que \\(\\nabla  \\varphi =F=(2xy+z,\\,\\allowbreak x^{2}+2yz,\\,\\allowbreak x+y^{2})\\), après \\(\\varphi =x^{2}y+xz+C(y,\\,\\allowbreak z)\\), l'étape suivante est :",o:["dériver \\(\\varphi\\) en \\(x\\)","dériver \\(\\varphi\\) en \\(y\\) et identifier avec \\(F_{2}\\)","intégrer \\(F_{3}\\) en \\(z\\)","poser \\(C=0\\)"],a:1,e:"On dérive en \\(y\\colon x^{2}+\\frac{\\partial  C}{\\partial  y}=x^{2}+2yz\\), d'où \\(C=y^{2}z+D(z)\\). Puis on recommence avec \\(z\\)."},
   {c:4,q:"Volume du cône \\(x^{2}+y^{2}\\le z^{2},\\,\\allowbreak 0\\le z\\le h\\). Le bon ordre de bornes en cylindriques :",o:["\\(0\\le r\\le h,\\,\\allowbreak 0\\le z\\le r\\)","\\(0\\le z\\le h,\\,\\allowbreak 0\\le r\\le z,\\,\\allowbreak 0\\le \\theta \\le 2\\pi\\)","\\(0\\le r\\le z,\\,\\allowbreak 0\\le z\\le r\\)","\\(0\\le \\theta \\le \\pi ,\\,\\allowbreak 0\\le r\\le h\\)"],a:1,e:"À \\(z\\) fixé, la section est le disque \\(r\\le z\\). On intègre \\(r\\) (bornes dépendant de \\(z\\)) avant \\(z\\) (bornes constantes). Résultat \\(\\frac{\\pi h^{3}}{3}\\)."},
   {c:4,q:"Sur le disque de rayon \\(R,\\,\\allowbreak \\iint \\,(x^{2}+y^{2})\\,\\mathrm{d}x\\,\\mathrm{d}y\\) vaut :",o:["\\(\\pi R^{2}\\)","\\(\\frac{\\pi R^{4}}{2}\\)","\\(2\\pi R^{3}\\)","\\(\\pi R^{4}\\)"],a:1,e:"Polaires : \\(\\int _{0}^{2\\pi }\\int _{0}^{R}\\,r^{2}\\cdot r\\,\\mathrm{d}r\\,\\mathrm{d}\\theta =2\\pi \\cdot \\frac{R^{4}}{4}=\\frac{\\pi R^{4}}{2}\\). Contrôle : puissance 4 en \\(R\\)."},
   {c:4,q:"Quelle intégrale vaut 0 par symétrie ?",o:["\\(\\iint _{\\mathrm{disque}}\\,x^{2}\\,\\mathrm{d}x\\,\\mathrm{d}y\\)","\\(\\iint _{\\mathrm{disque}}\\,x\\,\\mathrm{d}x\\,\\mathrm{d}y\\)","\\(\\iint _{\\mathrm{disque}}\\,1\\,\\mathrm{d}x\\,\\mathrm{d}y\\)","\\(\\iint _{\\mathrm{disque}}\\,(x^{2}+y^{2})\\,\\mathrm{d}x\\,\\mathrm{d}y\\)"],a:1,e:"Le disque est symétrique en \\(x\\leftrightarrow -x\\) et \\(x\\) est impaire : l'intégrale est nulle."},
   {c:5,q:"\\(\\oint -y\\,\\mathrm{d}x+x\\,\\mathrm{d}y\\) sur le cercle de rayon \\(R\\) (sens direct) vaut :",o:["0","\\(\\pi R^{2}\\)","\\(2\\pi R^{2}\\)","\\(4\\pi R\\)"],a:2,e:"Green : \\(\\frac{\\partial  Q}{\\partial  x}-\\frac{\\partial  P}{\\partial  y}=1-(-1)=2\\), donc \\(2\\,\\times\\) aire \\(=2\\pi R^{2}\\)."},
   {c:5,q:"L'énoncé dit « le long d'un chemin quelconque de \\(A\\) à \\(B\\) ». Cela suggère :",o:["que l'intégrale est nulle","que \\(F\\) est un champ de gradient : \\(W=\\varphi (B)-\\varphi (A)\\)","qu'il faut utiliser Stokes","qu'il faut choisir le segment [AB]"],a:1,e:"Le résultat ne dépend pas du chemin \\(\\Longleftrightarrow F\\) dérive d'un potentiel. On vérifie \\(\\frac{\\partial  P}{\\partial  y}=\\frac{\\partial  Q}{\\partial  x}\\), on cherche \\(\\varphi\\), on conclut."},
   {c:6,q:"Flux sortant de \\(F=(x,\\,\\allowbreak y,\\,\\allowbreak z)\\) à travers la sphère de rayon \\(R\\) :",o:["\\(4\\pi R^{2}\\)","\\(4\\pi R^{3}\\)","\\(\\frac{4\\pi R^{3}}{3}\\)","0"],a:1,e:"\\(\\operatorname{div} \\,F=3\\), donc \\(\\Phi =3\\,\\times \\,\\left(\\frac{4\\pi R^{3}}{3}\\right)=4\\pi R^{3}\\) par Ostrogradski."},
   {c:6,q:"Pour un flux à travers une demi-sphère (surface ouverte), on veut utiliser Ostrogradski. Il faut :",o:["l'appliquer directement","fermer avec le disque, appliquer, retrancher le flux du disque","utiliser Green-Riemann","c'est impossible"],a:1,e:"Ostrogradski exige une surface fermée : on ajoute un couvercle, puis flux(demi-sphère) \\(=\\iiint \\,\\operatorname{div} \\,F\\) − flux(couvercle)."},
   {c:6,q:"Deux surfaces ouvertes ont le même bord orienté. Le flux de \\(\\operatorname{rot} \\,F\\) à travers chacune :",o:["est le même","diffère selon la surface","est nul","dépend de \\(\\operatorname{div} \\,F\\)"],a:0,e:"Par Stokes, \\(\\iint \\,\\operatorname{rot} \\,F\\cdot n\\,\\mathrm{d}S=\\oint \\,F\\cdot \\mathrm{d}l\\) ne dépend que du bord. On choisit la surface la plus simple."},
   {c:7,q:"\\(f=x^{3}-3x+y^{2}\\). En \\((-1,\\,\\allowbreak 0),\\,\\allowbreak f_{xx}=-6,\\,\\allowbreak f_{yy}=2,\\,\\allowbreak f_{xy}=0\\). Nature :",o:["minimum local","maximum local","point selle","indéterminé"],a:2,e:"\\(\\Delta =(-6)(2)-0=-12\\lt 0\\) : point selle."},
   {c:7,q:"Extrema de \\(f=x^{2}+y^{2}-2x\\) sur le disque fermé \\(x^{2}+y^{2}\\le 4\\). Le \\(\\max\\) global vaut :",o:["−1 en \\((1,\\,\\allowbreak 0)\\)","0 en \\((2,\\,\\allowbreak 0)\\)","8 en (−2,0)","4 en \\((0,\\,\\allowbreak 2)\\)"],a:2,e:"Sur le bord, \\(f=4-4\\cos \\,t\\), maximal en \\(t=\\pi \\colon f(-2{,}0)=8\\). L'intérieur ne donne qu'un minimum (−1)."},
   {c:7,q:"Lagrange pour \\(f\\) = xy sur \\(x^{2}+y^{2}=1\\) donne \\(y=2\\lambda x\\) et \\(x=2\\lambda y\\). La bonne manipulation :",o:["diviser par \\(x\\) puis par \\(y\\)","écrire \\(x(1-4\\lambda ^{2})=0\\) et traiter les deux cas","poser \\(\\lambda =1\\)","abandonner Lagrange"],a:1,e:"Substituer donne \\(x=4\\lambda ^{2}x\\Longrightarrow x(1-4\\lambda ^{2})=0\\). Le cas \\(x=0\\) est incompatible avec la contrainte ; reste \\(\\lambda =\\pm \\frac{1}{2}\\)."},
  ];

  /* ---- Flashcards ---- */
  var FLASH=[
   {c:0,q:"Formule de l'aire du parallélogramme construit sur \\(u\\) et \\(v\\) ?",a:"\\(\\Vert u\\,\\wedge \\,v\\Vert\\)."},
   {c:0,q:"Formule du volume du parallélépipède sur \\(u,\\,\\allowbreak v,\\,\\allowbreak w\\) ?",a:"\\(|[u,\\,\\allowbreak v,\\,\\allowbreak w]|=|\\det (u,\\,\\allowbreak v,\\,\\allowbreak w)|\\)."},
   {c:0,q:"Vecteur normal à un plan \\(ax+by+cz+d=0\\) ?",a:"\\((a,\\,\\allowbreak b,\\,\\allowbreak c)\\)."},
   {c:0,q:"Distance d'un point \\(M\\) à un plan \\(ax+by+cz+d=0\\) ?",a:"\\(|ax_{M}+by_{M}+cz_{M}+d|\\,/\\,\\sqrt{a^{2}+b^{2}+c^{2}}\\)."},

   {c:1,q:"Définition d'un ouvert de \\(\\mathbb{R} ^{2}\\) ?",a:"Pour tout point, il existe un disque ouvert centré dedans qui est contenu dans l'ouvert."},
   {c:1,q:"Comment prouver qu'une limite n'existe pas ?",a:"Trouver deux chemins vers le point qui donnent des limites différentes."},
   {c:1,q:"Énoncé du théorème de Schwarz ?",a:"Si \\(f\\) est \\(C^{2}\\), alors \\(\\frac{\\partial ^{2} f}{\\partial  x \\partial  y}=\\frac{\\partial ^{2} f}{\\partial  y \\partial  x}\\) (dérivées mixtes égales)."},
   {c:1,q:"Taille de la jacobienne pour \\(f\\colon \\mathbb{R} ^{n}\\to \\mathbb{R}\\)ᵖ ?",a:"\\(p\\,\\times \\,n\\) (\\(p\\) lignes, \\(n\\) colonnes)."},
   {c:1,q:"Règle de la chaîne pour les jacobiennes ?",a:"\\(J(f\\circ g)(x)=J(f)(g(x))\\,\\cdot \\,J(g)(x)\\)."},
   {c:1,q:"Formule de Taylor à l'ordre 2 en 2 variables ?",a:"\\(f(a+h,\\,\\allowbreak b+k)=f(a,\\,\\allowbreak b)+h\\cdot f_{x}+k\\cdot f_{y}+\\frac{1}{2}(h^{2}f_{xx}+2\\,\\mathrm{h}k\\,f_{xy}+k^{2}f_{yy})+o(h^{2}+k^{2})\\)."},

   {c:2,q:"Expression du gradient \\(\\nabla  f\\) ?",a:"\\(\\left(\\frac{\\partial  f}{\\partial  x},\\,\\allowbreak \\frac{\\partial  f}{\\partial  y},\\,\\allowbreak \\frac{\\partial  f}{\\partial  z}\\right)\\) — champ vectoriel normal aux surfaces \\(f=\\text{cste}\\)."},
   {c:2,q:"Expression de la divergence \\(\\operatorname{div} \\,F\\) ?",a:"\\(\\frac{\\partial  F_{1}}{\\partial  x}+\\frac{\\partial  F_{2}}{\\partial  y}+\\frac{\\partial  F_{3}}{\\partial  z}\\) — champ scalaire."},
   {c:2,q:"Expression du rotationnel \\(\\operatorname{rot} \\,F\\) ?",a:"\\(\\left(\\frac{\\partial  F_{3}}{\\partial  y}-\\frac{\\partial  F_{2}}{\\partial  z},\\,\\allowbreak \\frac{\\partial  F_{1}}{\\partial  z}-\\frac{\\partial  F_{3}}{\\partial  x},\\,\\allowbreak \\frac{\\partial  F_{2}}{\\partial  x}-\\frac{\\partial  F_{1}}{\\partial  y}\\right)\\)."},
   {c:2,q:"Expression du laplacien \\(\\Delta f\\) ?",a:"\\(\\frac{\\partial ^{2} f}{\\partial  x^{2}}+\\frac{\\partial ^{2} f}{\\partial  y^{2}}+\\frac{\\partial ^{2} f}{\\partial  z^{2}}=\\operatorname{div} (\\operatorname{grad} \\,f)\\)."},
   {c:2,q:"Identité \\(\\operatorname{rot} (\\operatorname{grad} \\,f)\\) ?",a:"0 (pour \\(f\\) de classe \\(C^{2}\\))."},
   {c:2,q:"Identité \\(\\operatorname{div} (\\operatorname{rot} \\,F)\\) ?",a:"0 (pour \\(F\\) de classe \\(C^{2}\\))."},
   {c:2,q:"Que dire d'un champ \\(F\\) tel que \\(\\operatorname{rot} \\,F=0\\) ?",a:"\\(F\\) dérive localement d'un potentiel scalaire \\(\\varphi \\,(F=\\nabla  \\varphi )\\)."},

   {c:3,q:"Formules des coordonnées polaires ?",a:"\\(x=r\\,\\cos \\,\\theta ,\\,\\allowbreak y=r\\,\\sin \\,\\theta\\)."},
   {c:3,q:"Jacobien polaire ?",a:"\\(|J|=r\\Longrightarrow \\mathrm{d}x\\,\\mathrm{d}y=r\\,\\mathrm{d}r\\,\\mathrm{d}\\theta\\)."},
   {c:3,q:"Formules des coordonnées cylindriques ?",a:"\\(x=r\\,\\cos \\,\\theta ,\\,\\allowbreak y=r\\,\\sin \\,\\theta ,\\,\\allowbreak z=z\\). \\(|J|=r\\)."},
   {c:3,q:"Formules des coordonnées sphériques ?",a:"\\(x=r\\,\\sin \\,\\varphi \\,\\cos \\,\\theta ,\\,\\allowbreak y=r\\,\\sin \\,\\varphi \\,\\sin \\,\\theta ,\\,\\allowbreak z=r\\,\\cos \\,\\varphi\\). \\(|J|=r^{2}\\,\\sin \\,\\varphi\\)."},
   {c:3,q:"Paramétrisation classique de la sphère de rayon \\(R\\) ?",a:"\\((\\theta ,\\,\\allowbreak \\varphi )\\to (R\\,\\sin \\,\\varphi \\,\\cos \\,\\theta ,\\,\\allowbreak R\\,\\sin \\,\\varphi \\,\\sin \\,\\theta ,\\,\\allowbreak R\\,\\cos \\,\\varphi ),\\,\\allowbreak \\varphi \\,\\in [0,\\,\\allowbreak \\pi ],\\,\\allowbreak \\theta \\,\\in [0,\\,\\allowbreak 2\\pi [\\)."},

   {c:4,q:"Théorème de Fubini sur un rectangle ?",a:"\\(\\iint \\,f\\,\\mathrm{d}x\\,\\mathrm{d}y=\\int \\left(\\int \\,f\\,\\mathrm{d}x\\right)\\,\\mathrm{d}y=\\int \\left(\\int \\,f\\,\\mathrm{d}y\\right)\\,\\mathrm{d}x\\) — les deux ordres valides."},
   {c:4,q:"Formule du changement de variables \\(2D\\) ?",a:"\\(\\iint \\,f\\,\\mathrm{d}x\\,\\mathrm{d}y=\\iint \\,f\\circ \\varphi \\,\\cdot |J_{\\varphi }|\\,\\mathrm{d}u\\,\\mathrm{d}v\\) (\\(\\varphi\\) difféomorphisme)."},
   {c:4,q:"Volume d'un solide en intégrale triple ?",a:"\\(V=\\iiint _{V}\\,1\\,\\mathrm{d}x\\,\\mathrm{d}y\\,\\mathrm{d}z\\). En sphériques : \\(\\int \\int \\int \\,r^{2}\\,\\sin \\,\\varphi \\,\\mathrm{d}r\\,\\mathrm{d}\\varphi \\,\\mathrm{d}\\theta\\)."},
   {c:4,q:"Comment calculer une masse ?",a:"\\(M=\\iiint _{V}\\,\\rho (x,\\,\\allowbreak y,\\,\\allowbreak z)\\,\\mathrm{d}x\\,\\mathrm{d}y\\,\\mathrm{d}z\\) (densité fois volume)."},

   {c:5,q:"Longueur d'une courbe \\(\\gamma\\) ?",a:"\\(L=\\int _{a}^{b}\\Vert \\gamma '(t)\\Vert \\,\\mathrm{d}t\\)."},
   {c:5,q:"Circulation d'un champ \\(F\\) le long de \\(\\gamma\\) ?",a:"\\(\\int _{\\gamma }\\,F\\cdot \\mathrm{d}l=\\int _{\\gamma }\\,P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y=\\int (P\\cdot x'+Q\\cdot y')\\,\\mathrm{d}t\\)."},
   {c:5,q:"Théorème de Green-Riemann ?",a:"\\(\\oint _{\\partial  D}\\,P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y=\\iint _{D}\\,\\left(\\frac{\\partial  Q}{\\partial  x}-\\frac{\\partial  P}{\\partial  y}\\right)\\,\\mathrm{d}x\\,\\mathrm{d}y\\) (\\(\\partial  D\\) orienté positivement)."},
   {c:5,q:"Circulation d'un champ de gradient \\(F=\\nabla  \\varphi\\) ?",a:"\\(\\varphi (B)-\\varphi (A)\\). Ne dépend que des extrémités."},
   {c:5,q:"Aire d'un domaine \\(D\\) par intégrale de bord ?",a:"aire\\((D)=\\frac{1}{2}\\oint _{\\partial  D}\\,(x\\,\\mathrm{d}y-y\\,\\mathrm{d}x)\\)."},

   {c:6,q:"Vecteur normal à une surface \\((u,\\,\\allowbreak v)\\to M(u,\\,\\allowbreak v)\\) ?",a:"\\(N=\\frac{\\partial  M}{\\partial  u}\\,\\wedge \\,\\frac{\\partial  M}{\\partial  v}\\) ; élément d'aire \\(\\mathrm{d}S=\\Vert N\\Vert \\,\\mathrm{d}u\\,\\mathrm{d}v\\)."},
   {c:6,q:"Définition du flux d'un champ \\(F\\) à travers \\(S\\) ?",a:"\\(\\Phi =\\iint _{S}\\,F\\cdot n\\,\\mathrm{d}S=\\iint _{\\Delta }\\,F\\cdot N\\,\\mathrm{d}u\\,\\mathrm{d}v\\)."},
   {c:6,q:"Théorème de Stokes ?",a:"\\(\\oint _{\\partial  S}\\,F\\cdot \\mathrm{d}l=\\iint _{S}\\,\\operatorname{rot} \\,F\\,\\cdot \\,n\\,\\mathrm{d}S\\) (\\(S\\) orientée)."},
   {c:6,q:"Théorème de Green-Ostrogradski (divergence) ?",a:"\\(\\oint\\!\\!\\!\\oint _{\\partial  V}\\,F\\cdot n\\,\\mathrm{d}S=\\iiint _{V}\\,\\operatorname{div} \\,F\\,\\mathrm{d}V\\) (surface fermée, \\(n\\) sortante)."},
   {c:6,q:"Quand utiliser Ostrogradski plutôt que le calcul direct ?",a:"Surface fermée ET \\(\\operatorname{div} \\,F\\) simple ⟹ intégrale triple souvent plus facile."},

   {c:7,q:"Théorème de Fermat (1 variable) ?",a:"Si \\(f\\) admet un extremum local intérieur en \\(c\\), alors \\(f'(c)=0\\)."},
   {c:7,q:"Condition nécessaire d'un extremum de \\(f\\colon \\mathbb{R} ^{2}\\to \\mathbb{R}\\) ?",a:"\\(\\nabla  f(a,\\,\\allowbreak b)=0\\) (point critique)."},
   {c:7,q:"Discriminant hessien \\(\\Delta\\) ?",a:"\\(\\Delta =f_{xx}\\,\\cdot \\,f_{yy}-(f_{xy})^{2}=\\det (H)\\)."},
   {c:7,q:"Test de Monge : nature d'un point critique ?",a:"\\(\\Delta \\gt 0\\) &amp; \\(f_{xx}\\gt 0\\colon \\min ;\\,\\allowbreak \\Delta \\gt 0\\) &amp; \\(f_{xx}\\lt 0\\colon \\max ;\\,\\allowbreak \\Delta \\lt 0\\) : selle ; \\(\\Delta =0\\) : indéterminé."},
   {c:7,q:"Méthode de Lagrange (contrainte \\(g=0\\)) ?",a:"\\(\\nabla  f=\\lambda \\nabla  g\\) et \\(g=0\\). \\(\\lambda\\) = multiplicateur de Lagrange."},
   {c:7,q:"Méthode pour extrema sur un compact ?",a:"Combiner points critiques intérieurs + étude sur le bord (paramétrer), puis comparer toutes les valeurs."}
  ];

  var sel=new Set([0,1,2,3,4,5,6,7]), fmt="qcm", ord="chap";
  var pool=[], idx=0, score=0, answered=false;

  var $=function(id){return document.getElementById(id);};
  var setup=$("quizSetup"), run=$("quizRun"), result=$("quizResult"),
      chips=$("chapChips"), cont=$("qContainer");

  CHNAMES.forEach(function(name,i){
    var b=document.createElement("button");
    b.className="chapchip on";
    b.textContent=i+" · "+name;
    b.addEventListener("click",function(){
      if(sel.has(i)){sel.delete(i);b.classList.remove("on");}else{sel.add(i);b.classList.add("on");}
    });
    chips.appendChild(b);
  });
  $("chapAll").addEventListener("click",function(){sel=new Set([0,1,2,3,4,5,6,7]);chips.querySelectorAll(".chapchip").forEach(function(c){c.classList.add("on");});});
  $("chapNone").addEventListener("click",function(){sel.clear();chips.querySelectorAll(".chapchip").forEach(function(c){c.classList.remove("on");});});
  function seg(id,cb){ $(id).querySelectorAll("button").forEach(function(b){ b.addEventListener("click",function(){
    $(id).querySelectorAll("button").forEach(function(x){x.classList.remove("on");}); b.classList.add("on"); cb(b);
  }); }); }
  seg("segFormat",function(b){fmt=b.getAttribute("data-fmt");});
  seg("segOrder",function(b){ord=b.getAttribute("data-ord");});

  function shuffle(a){ for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }

  function show(el){ setup.style.display="none"; run.classList.remove("active"); result.classList.remove("show");
    if(el==="run")run.classList.add("active"); else if(el==="result")result.classList.add("show"); else setup.style.display=""; }

  $("quizStart").addEventListener("click",function(){
    if(sel.size===0){ $("quizWarn").style.display="block"; return; }
    $("quizWarn").style.display="none";
    var src=(fmt==="qcm"?QCM:FLASH).filter(function(q){return sel.has(q.c);});
    pool=src.slice(); if(ord==="rand")shuffle(pool); else pool.sort(function(x,y){return x.c-y.c;});
    idx=0; score=0; render(); show("run");
  });

  function rm(el){ if(window.renderMathInElement){ var BS=String.fromCharCode(92); window.renderMathInElement(el,{delimiters:[{left:BS+"(",right:BS+")",display:false}],throwOnError:false,strict:false}); } }
  function render(){
    answered=false;
    var q=pool[idx];
    $("qCount").textContent=(idx+1)+" / "+pool.length;
    $("qProg").style.width=Math.round(idx/pool.length*100)+"%";
    $("qScore").textContent="Score : "+score;
    $("qNext").style.display="none";
    cont.innerHTML="";
    if(fmt==="qcm"){
      var card=document.createElement("div"); card.className="qcard";
      var opts=q.o.map(function(t,i){return {t:t,i:i};});
      var mixed=shuffle(opts.slice());
      var letters=["A","B","C","D","E"];
      var html='<div class="qtag">Chapitre '+q.c+' · '+CHNAMES[q.c]+'</div><div class="qtext">'+q.q+'</div><div class="opts">';
      mixed.forEach(function(op,k){ html+='<button class="opt" data-correct="'+(op.i===q.a?1:0)+'"><span class="mk">'+letters[k]+'</span><span>'+op.t+'</span></button>'; });
      html+='</div><div class="qfeed"><div class="verdict"></div><div class="expl"></div></div>';
      card.innerHTML=html; cont.appendChild(card); rm(card);
      card.querySelectorAll(".opt").forEach(function(btn){
        btn.addEventListener("click",function(){
          if(answered)return; answered=true;
          var good=btn.getAttribute("data-correct")==="1";
          if(good)score++;
          card.querySelectorAll(".opt").forEach(function(b){ b.disabled=true;
            if(b.getAttribute("data-correct")==="1")b.classList.add("correct"); });
          if(!good)btn.classList.add("wrong");
          var fb=card.querySelector(".qfeed"); fb.classList.add("show",good?"ok":"no");
          fb.querySelector(".verdict").textContent=good?"✓ Correct":"✗ Incorrect";
          fb.querySelector(".expl").innerHTML=q.e; rm(fb);
          $("qScore").textContent="Score : "+score;
          $("qNext").style.display="";
        });
      });
    } else {
      var f=document.createElement("div"); f.className="flash";
      f.innerHTML='<div class="fside">Question · Ch. '+q.c+'</div><div class="fq">'+q.q+'</div><div class="tap">Cliquez pour révéler la réponse</div>';
      var flipped=false;
      f.addEventListener("click",function(){ if(flipped)return; flipped=true;
        f.innerHTML='<div class="fside">Réponse</div><div class="fa">'+q.a+'</div>'; rm(f);
        $("qNext").style.display="";
      });
      cont.appendChild(f); rm(f);
    }
  }

  $("qNext").addEventListener("click",function(){
    idx++;
    if(idx>=pool.length){ finish(); } else { render(); }
  });
  $("qQuit").addEventListener("click",function(){ show("setup"); });

  function finish(){
    show("result");
    if(fmt==="qcm"){
      var pct=Math.round(score/pool.length*100);
      $("rScore").textContent=pct+"%";
      $("rMsg").textContent=score+" bonnes réponses sur "+pool.length+" — "+
        (pct>=80?"excellent, tu es prêt·e !":pct>=50?"bien, encore quelques révisions ciblées.":"à retravailler : reprends les chapitres concernés.");
    } else {
      $("rScore").textContent="✓";
      $("rMsg").textContent="Série de "+pool.length+" flashcards terminée. Relance pour t'auto-évaluer.";
    }
  }
  $("rRetry").addEventListener("click",function(){ if(ord==="rand")shuffle(pool); idx=0;score=0;render();show("run"); });
  $("rBack").addEventListener("click",function(){ show("setup"); });
})();
