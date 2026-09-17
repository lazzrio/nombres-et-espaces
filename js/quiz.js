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
   {c:0,q:"Le produit scalaire de u=(1,2,3) et v=(4,-1,2) vaut :",o:["8","4","-2","12"],a:0,e:"u·v = 1·4 + 2·(-1) + 3·2 = 4 - 2 + 6 = 8."},
   {c:0,q:"L'aire du parallélogramme construit sur u et v vaut :",o:["u·v","‖u‖·‖v‖·cos θ","‖u∧v‖","det(u,v,0)"],a:2,e:"L'aire est la norme du produit vectoriel : ‖u∧v‖ = ‖u‖·‖v‖·|sin θ|."},
   {c:0,q:"Le produit mixte [u,v,w] égale :",o:["u·(v+w)","(u∧v)·w","u·v·w","u∧(v∧w)"],a:1,e:"[u,v,w] = (u∧v)·w = det(u,v,w). Son module donne le volume."},
   {c:0,q:"Un plan d'équation 2x + y − z = 5 a pour vecteur normal :",o:["(2,1,-1)","(5,0,0)","(1,1,1)","(-2,-1,1)"],a:0,e:"Les coefficients (a,b,c) sont les composantes du vecteur normal."},
   {c:0,q:"Distance du point (1,1,1) au plan x + y + z = 6 :",o:["3/√3 = √3","6/√3","1","0"],a:0,e:"d = |1+1+1-6|/√(1+1+1) = 3/√3 = √3."},

   /* Ch 1 — Fonctions plusieurs variables */
   {c:1,q:"Pour f(x, y) = x²y + y³, la dérivée partielle ∂f/∂x vaut :",o:["x² + 3y²","2xy","2xy + 3y²","2x + y³"],a:1,e:"On dérive en x en fixant y comme une constante : (x²)' · y = 2xy."},
   {c:1,q:"Le théorème de Schwarz énonce que, pour f de classe C² :",o:["∂f/∂x = ∂f/∂y","∂²f/∂x∂y = ∂²f/∂y∂x","f est différentiable","∂f/∂x·y = 0"],a:1,e:"L'ordre des dérivations mixtes ne compte pas quand f est C²."},
   {c:1,q:"La matrice jacobienne d'une fonction f : ℝ³ → ℝ² est de taille :",o:["2×3","3×2","3×3","2×2"],a:0,e:"J_f a p lignes et n colonnes : ici p=2, n=3, donc 2×3."},
   {c:1,q:"Pour f : ℝ² → ℝ, le gradient est :",o:["un scalaire","un vecteur (2 composantes)","une matrice 2×2","toujours nul"],a:1,e:"∇f = (∂f/∂x, ∂f/∂y) — un vecteur à 2 composantes."},
   {c:1,q:"Une méthode standard pour montrer qu'une limite de f(x,y) en (0,0) n'existe pas :",o:["passer en polaires","tester deux chemins différents","calculer les dérivées","appliquer Schwarz"],a:1,e:"Si deux chemins (par ex. y=0 et y=x) donnent des limites différentes, la limite n'existe pas."},

   /* Ch 2 — Opérateurs vectoriels */
   {c:2,q:"Pour un champ scalaire f, ∇f est :",o:["un champ scalaire","un champ vectoriel","une matrice","un nombre"],a:1,e:"Le gradient d'un champ scalaire est un champ vectoriel."},
   {c:2,q:"Pour un champ vectoriel F, div F est :",o:["un champ vectoriel","un champ scalaire","un nombre","le rotationnel"],a:1,e:"La divergence est un champ scalaire : somme des dérivées partielles diagonales."},
   {c:2,q:"L'identité rot(grad f) vaut :",o:["grad f","f","0","∇f"],a:2,e:"rot(∇f) = 0 pour tout champ scalaire de classe C² — conséquence de Schwarz."},
   {c:2,q:"L'identité div(rot F) vaut :",o:["div F","rot F","0","F"],a:2,e:"div(rot F) = 0 pour tout champ vectoriel C² — dualité avec rot(grad f) = 0."},
   {c:2,q:"Le laplacien Δf est défini par :",o:["grad(div f)","div(grad f)","rot(grad f)","rot(rot f)"],a:1,e:"Δf = div(grad f) = ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z²."},
   {c:2,q:"Si rot F = 0 sur un ouvert simplement connexe, alors F :",o:["est constant","dérive d'un potentiel scalaire","est nul","est irrotationnel mais pas de potentiel"],a:1,e:"F = ∇φ pour un certain champ scalaire φ. On dit que F est un champ de gradient."},
   {c:2,q:"Le gradient de f est, en tout point, orienté :",o:["dans le sens des f décroissants","tangent aux lignes de niveau","normal aux surfaces f = cste","parallèle à Ox"],a:2,e:"∇f est perpendiculaire aux surfaces (lignes en 2D) où f est constant."},

   /* Ch 3 — Courbes & surfaces */
   {c:3,q:"Les coordonnées polaires sont :",o:["x=r cos θ, y=r sin θ","x=r sin θ, y=r cos θ","x=θ cos r, y=θ sin r","x=r, y=θ"],a:0,e:"Polaires : x=r cos θ, y=r sin θ, avec r ≥ 0, θ ∈ [0, 2π[."},
   {c:3,q:"Le jacobien du passage en coordonnées polaires est :",o:["1","r","r²","sin θ"],a:1,e:"|J| = r, donc dxdy = r dr dθ."},
   {c:3,q:"Le jacobien du passage en coordonnées sphériques est :",o:["r","r²","r sin φ","r² sin φ"],a:3,e:"|J| = r² sin φ, donc dV = r² sin φ dr dφ dθ."},
   {c:3,q:"Un cercle de rayon R centré en l'origine peut être paramétré par :",o:["(t, R−t), t ∈ [0, R]","(R cos t, R sin t), t ∈ [0, 2π]","(R, t), t ∈ [0, 2π]","(t², t), t ∈ ℝ"],a:1,e:"Paramétrisation classique du cercle : (R cos t, R sin t)."},
   {c:3,q:"Une sphère de rayon R se paramètre par (θ, φ) → :",o:["(R, θ, φ)","(R cos θ, R sin θ, R)","(R sin φ cos θ, R sin φ sin θ, R cos φ)","(R θ, R φ, R)"],a:2,e:"Paramétrisation classique de la sphère avec φ ∈ [0,π], θ ∈ [0, 2π[."},
   {c:3,q:"Pour une intégrale sur une boule, quel système est le plus adapté ?",o:["cartésien","polaire","cylindrique","sphérique"],a:3,e:"Symétrie centrale ⟹ sphériques. La boule devient r ∈ [0, R], φ ∈ [0, π], θ ∈ [0, 2π[."},

   /* Ch 4 — Intégrales multiples */
   {c:4,q:"Le théorème de Fubini permet de calculer :",o:["une intégrale simple","une intégrale double en deux intégrales successives","une intégrale de surface","le jacobien"],a:1,e:"Fubini : ∬ f dxdy = ∫(∫ f dx)dy sous conditions raisonnables (rectangle, f continue)."},
   {c:4,q:"Dans un changement de variables (x,y)→(u,v), on multiplie par :",o:["le déterminant du gradient","la valeur absolue du jacobien |J|","le laplacien","1"],a:1,e:"∬ f dxdy = ∬ f∘φ · |J_φ| dudv."},
   {c:4,q:"Pour intégrer sur un disque, on passe en polaires. dxdy devient :",o:["dr dθ","r dr dθ","r² dr dθ","sin θ dr dθ"],a:1,e:"Le jacobien polaire est r : dxdy = r dr dθ."},
   {c:4,q:"Pour un volume ∭ 1 dxdydz d'une boule de rayon R (sphériques) :",o:["∫₀^R ∫₀^π ∫₀^{2π} r² sin φ dθ dφ dr","∫₀^R ∫₀^{2π} ∫₀^π r sin φ dθ dφ dr","∫₀^R ∫₀^{2π} ∫₀^π 1 dθ dφ dr","∫₀^R 4πr² dr"],a:0,e:"Volume boule = ∫∫∫ r² sin φ dr dφ dθ = 4πR³/3."},
   {c:4,q:"Pour calculer le volume d'un cylindre, le plus adapté est :",o:["cartésiennes","polaires","cylindriques","sphériques"],a:2,e:"Symétrie autour de Oz ⟹ cylindriques. dV = r dr dθ dz."},

   /* Ch 5 — Intégrales curvilignes */
   {c:5,q:"La circulation d'un champ F=(P,Q) le long d'une courbe γ paramétrée par t est :",o:["∫ P dx + Q dy = ∫(P·x' + Q·y') dt","∫ P·Q dt","∫(P + Q) dt","∫ dt"],a:0,e:"∫_γ F·dl = ∫ P(γ(t))·x'(t) + Q(γ(t))·y'(t) dt."},
   {c:5,q:"Green-Riemann relie une circulation sur ∂D à :",o:["une intégrale simple","une intégrale double sur D","un flux","une somme"],a:1,e:"∮_∂D P dx + Q dy = ∬_D (∂Q/∂x − ∂P/∂y) dxdy."},
   {c:5,q:"Pour un champ de gradient F = ∇φ, la circulation entre A et B :",o:["est toujours nulle","dépend du chemin","vaut φ(B) − φ(A)","vaut φ(B) + φ(A)"],a:2,e:"∫_γ ∇φ·dl = φ(B) − φ(A). Ne dépend que des extrémités !"},
   {c:5,q:"Sur une courbe fermée, la circulation d'un champ de gradient est :",o:["φ(A) + φ(A)","nulle","∞","φ(A)"],a:1,e:"A = B sur courbe fermée, donc φ(B) − φ(A) = 0."},
   {c:5,q:"L'aire d'un domaine D via Green-Riemann s'écrit :",o:["∮ dx dy","½ ∮ (x dy − y dx)","∮ (x + y) dl","∮ ‖γ'‖ dt"],a:1,e:"Prendre P = −y/2 et Q = x/2 dans Green donne aire(D) = ½∮(x dy − y dx)."},

   /* Ch 6 — Intégrales de surface */
   {c:6,q:"Le vecteur normal à une surface paramétrée par (u,v)→M(u,v) est :",o:["∂M/∂u + ∂M/∂v","∂M/∂u ∧ ∂M/∂v","∂M/∂u · ∂M/∂v","gradient de M"],a:1,e:"N = ∂M/∂u ∧ ∂M/∂v, et l'élément d'aire dS = ‖N‖ dudv."},
   {c:6,q:"Le théorème de Stokes s'écrit :",o:["∮_∂S F·dl = ∬_S rot F · n dS","∬_S F dS = ∮ F·dl","∯_S F·n = ∭ div F","rot F = 0"],a:0,e:"Stokes : circulation sur le bord = flux du rotationnel à travers la surface."},
   {c:6,q:"Le théorème de Green-Ostrogradski (divergence) énonce :",o:["∯_∂V F·n dS = ∭_V div F dV","∯ F = ∮ F","∬ rot F = ∯ F","div F = 0"],a:0,e:"Flux à travers surface fermée = intégrale de la divergence dans le volume."},
   {c:6,q:"Le flux d'un champ vectoriel F à travers une surface S orientée par n vaut :",o:["∬_S F · n dS","∬_S ‖F‖ dS","∬_S rot F dS","∫_∂S F·dl"],a:0,e:"Définition du flux : Φ = ∬_S F·n dS."},
   {c:6,q:"Pour une surface fermée, pour calculer un flux, on préfère souvent :",o:["Stokes","Ostrogradski (divergence)","Green-Riemann","calcul direct"],a:1,e:"Surface fermée ⟹ Ostrogradski transforme en intégrale triple, souvent plus simple."},

   /* Ch 7 — Optimisation */
   {c:7,q:"Un point critique d'une fonction f : ℝ² → ℝ est un point où :",o:["f = 0","∇f = 0","Δ = 0","H est nulle"],a:1,e:"Point critique = ∇f = 0. C'est une CN pour un extremum intérieur."},
   {c:7,q:"Le discriminant hessien Δ d'une fonction à 2 variables vaut :",o:["f_xx + f_yy","f_xx · f_yy − f_xy²","f_xx − f_yy","f_xy² − f_xx·f_yy"],a:1,e:"Δ = det(H) = f_xx·f_yy − (f_xy)². Signe crucial pour la nature du point critique."},
   {c:7,q:"Si Δ > 0 et f_xx > 0 en un point critique, c'est :",o:["un maximum","un minimum","un point selle","indéterminé"],a:1,e:"Test de Monge : Δ>0, f_xx>0 ⟹ minimum local."},
   {c:7,q:"Si Δ < 0 en un point critique, c'est :",o:["un maximum","un minimum","un point selle","indéterminé"],a:2,e:"Δ<0 ⟹ point selle (col) : minimum dans une direction, maximum dans une autre."},
   {c:7,q:"Si Δ = 0, on peut conclure :",o:["min si f_xx > 0","max si f_xx < 0","rien : cas indéterminé","toujours un selle"],a:2,e:"Δ = 0 : le test échoue, il faut une analyse plus fine (Taylor à un ordre supérieur, etc.)."},
   {c:7,q:"Le multiplicateur de Lagrange sert à :",o:["calculer des dérivées","optimiser sous contrainte","calculer un jacobien","résoudre un système"],a:1,e:"Optimiser f sous la contrainte g = 0 : ∇f = λ∇g et g = 0."},
   {c:7,q:"Le théorème de Fermat pour une fonction f d'une variable dit :",o:["f > 0 sur I","si extremum local en c, alors f'(c) = 0","f''(c) = 0","f est monotone"],a:1,e:"CN : en un extremum intérieur, la dérivée s'annule (tangente horizontale)."},
   /* ---- Méthodes & pièges (ajout) ---- */
   {c:1,q:"f(x,y) = x³/(x²+y²). Le numérateur est de degré 3, le dénominateur de degré 2. Le bon réflexe :",o:["tester deux chemins pour réfuter","passer en polaires et majorer |f| ≤ r","calculer la jacobienne","appliquer Schwarz"],a:1,e:"Degré du numérateur > degré du dénominateur : on soupçonne une limite 0, à prouver par majoration. En polaires : f = r cos³θ, |f| ≤ r → 0."},
   {c:1,q:"En polaires, on trouve f(r cos θ, r sin θ) = cos 2θ. Conclusion :",o:["la limite vaut cos 2θ","la limite vaut 0","la limite n'existe pas","f est continue"],a:2,e:"Le résultat dépend de la direction θ et pas de r : la valeur dépend du chemin, donc pas de limite."},
   {c:2,q:"Pour trouver φ tel que ∇φ = F = (2xy + z, x² + 2yz, x + y²), après φ = x²y + xz + C(y,z), l'étape suivante est :",o:["dériver φ en x","dériver φ en y et identifier avec F₂","intégrer F₃ en z","poser C = 0"],a:1,e:"On dérive en y : x² + ∂C/∂y = x² + 2yz, d'où C = y²z + D(z). Puis on recommence avec z."},
   {c:4,q:"Volume du cône x²+y² ≤ z², 0 ≤ z ≤ h. Le bon ordre de bornes en cylindriques :",o:["0≤r≤h, 0≤z≤r","0≤z≤h, 0≤r≤z, 0≤θ≤2π","0≤r≤z, 0≤z≤r","0≤θ≤π, 0≤r≤h"],a:1,e:"À z fixé, la section est le disque r ≤ z. On intègre r (bornes dépendant de z) avant z (bornes constantes). Résultat πh³/3."},
   {c:4,q:"Sur le disque de rayon R, ∬ (x² + y²) dxdy vaut :",o:["πR²","πR⁴/2","2πR³","πR⁴"],a:1,e:"Polaires : ∫₀^{2π}∫₀^R r²·r dr dθ = 2π·R⁴/4 = πR⁴/2. Contrôle : puissance 4 en R."},
   {c:4,q:"Quelle intégrale vaut 0 par symétrie ?",o:["∬_disque x² dxdy","∬_disque x dxdy","∬_disque 1 dxdy","∬_disque (x²+y²) dxdy"],a:1,e:"Le disque est symétrique en x ↔ −x et x est impaire : l'intégrale est nulle."},
   {c:5,q:"∮ −y dx + x dy sur le cercle de rayon R (sens direct) vaut :",o:["0","πR²","2πR²","4πR"],a:2,e:"Green : ∂Q/∂x − ∂P/∂y = 1 − (−1) = 2, donc 2 × aire = 2πR²."},
   {c:5,q:"L'énoncé dit « le long d'un chemin quelconque de A à B ». Cela suggère :",o:["que l'intégrale est nulle","que F est un champ de gradient : W = φ(B) − φ(A)","qu'il faut utiliser Stokes","qu'il faut choisir le segment [AB]"],a:1,e:"Le résultat ne dépend pas du chemin ⟺ F dérive d'un potentiel. On vérifie ∂P/∂y = ∂Q/∂x, on cherche φ, on conclut."},
   {c:6,q:"Flux sortant de F = (x, y, z) à travers la sphère de rayon R :",o:["4πR²","4πR³","4πR³/3","0"],a:1,e:"div F = 3, donc Φ = 3 × (4πR³/3) = 4πR³ par Ostrogradski."},
   {c:6,q:"Pour un flux à travers une demi-sphère (surface ouverte), on veut utiliser Ostrogradski. Il faut :",o:["l'appliquer directement","fermer avec le disque, appliquer, retrancher le flux du disque","utiliser Green-Riemann","c'est impossible"],a:1,e:"Ostrogradski exige une surface fermée : on ajoute un couvercle, puis flux(demi-sphère) = ∭ div F − flux(couvercle)."},
   {c:6,q:"Deux surfaces ouvertes ont le même bord orienté. Le flux de rot F à travers chacune :",o:["est le même","diffère selon la surface","est nul","dépend de div F"],a:0,e:"Par Stokes, ∬ rot F·n dS = ∮ F·dl ne dépend que du bord. On choisit la surface la plus simple."},
   {c:7,q:"f = x³ − 3x + y². En (−1, 0), f_xx = −6, f_yy = 2, f_xy = 0. Nature :",o:["minimum local","maximum local","point selle","indéterminé"],a:2,e:"Δ = (−6)(2) − 0 = −12 < 0 : point selle."},
   {c:7,q:"Extrema de f = x² + y² − 2x sur le disque fermé x²+y² ≤ 4. Le max global vaut :",o:["−1 en (1,0)","0 en (2,0)","8 en (−2,0)","4 en (0,2)"],a:2,e:"Sur le bord, f = 4 − 4cos t, maximal en t = π : f(−2,0) = 8. L'intérieur ne donne qu'un minimum (−1)."},
   {c:7,q:"Lagrange pour f = xy sur x² + y² = 1 donne y = 2λx et x = 2λy. La bonne manipulation :",o:["diviser par x puis par y","écrire x(1 − 4λ²) = 0 et traiter les deux cas","poser λ = 1","abandonner Lagrange"],a:1,e:"Substituer donne x = 4λ²x ⟹ x(1 − 4λ²) = 0. Le cas x = 0 est incompatible avec la contrainte ; reste λ = ±½."},
  ];

  /* ---- Flashcards ---- */
  var FLASH=[
   {c:0,q:"Formule de l'aire du parallélogramme construit sur u et v ?",a:"‖u ∧ v‖."},
   {c:0,q:"Formule du volume du parallélépipède sur u, v, w ?",a:"|[u,v,w]| = |det(u,v,w)|."},
   {c:0,q:"Vecteur normal à un plan ax+by+cz+d=0 ?",a:"(a, b, c)."},
   {c:0,q:"Distance d'un point M à un plan ax+by+cz+d=0 ?",a:"|ax_M + by_M + cz_M + d| / √(a² + b² + c²)."},

   {c:1,q:"Définition d'un ouvert de ℝ² ?",a:"Pour tout point, il existe un disque ouvert centré dedans qui est contenu dans l'ouvert."},
   {c:1,q:"Comment prouver qu'une limite n'existe pas ?",a:"Trouver deux chemins vers le point qui donnent des limites différentes."},
   {c:1,q:"Énoncé du théorème de Schwarz ?",a:"Si f est C², alors ∂²f/∂x∂y = ∂²f/∂y∂x (dérivées mixtes égales)."},
   {c:1,q:"Taille de la jacobienne pour f : ℝⁿ → ℝᵖ ?",a:"p × n (p lignes, n colonnes)."},
   {c:1,q:"Règle de la chaîne pour les jacobiennes ?",a:"J(f∘g)(x) = J(f)(g(x)) · J(g)(x)."},
   {c:1,q:"Formule de Taylor à l'ordre 2 en 2 variables ?",a:"f(a+h,b+k) = f(a,b) + h·f_x + k·f_y + ½(h²f_xx + 2hk f_xy + k²f_yy) + o(h²+k²)."},

   {c:2,q:"Expression du gradient ∇f ?",a:"(∂f/∂x, ∂f/∂y, ∂f/∂z) — champ vectoriel normal aux surfaces f = cste."},
   {c:2,q:"Expression de la divergence div F ?",a:"∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z — champ scalaire."},
   {c:2,q:"Expression du rotationnel rot F ?",a:"(∂F₃/∂y − ∂F₂/∂z, ∂F₁/∂z − ∂F₃/∂x, ∂F₂/∂x − ∂F₁/∂y)."},
   {c:2,q:"Expression du laplacien Δf ?",a:"∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z² = div(grad f)."},
   {c:2,q:"Identité rot(grad f) ?",a:"0 (pour f de classe C²)."},
   {c:2,q:"Identité div(rot F) ?",a:"0 (pour F de classe C²)."},
   {c:2,q:"Que dire d'un champ F tel que rot F = 0 ?",a:"F dérive localement d'un potentiel scalaire φ (F = ∇φ)."},

   {c:3,q:"Formules des coordonnées polaires ?",a:"x = r cos θ, y = r sin θ."},
   {c:3,q:"Jacobien polaire ?",a:"|J| = r ⟹ dxdy = r dr dθ."},
   {c:3,q:"Formules des coordonnées cylindriques ?",a:"x = r cos θ, y = r sin θ, z = z. |J| = r."},
   {c:3,q:"Formules des coordonnées sphériques ?",a:"x = r sin φ cos θ, y = r sin φ sin θ, z = r cos φ. |J| = r² sin φ."},
   {c:3,q:"Paramétrisation classique de la sphère de rayon R ?",a:"(θ, φ) → (R sin φ cos θ, R sin φ sin θ, R cos φ), φ ∈ [0, π], θ ∈ [0, 2π[."},

   {c:4,q:"Théorème de Fubini sur un rectangle ?",a:"∬ f dxdy = ∫(∫ f dx) dy = ∫(∫ f dy) dx — les deux ordres valides."},
   {c:4,q:"Formule du changement de variables 2D ?",a:"∬ f dxdy = ∬ f∘φ · |J_φ| dudv (φ difféomorphisme)."},
   {c:4,q:"Volume d'un solide en intégrale triple ?",a:"V = ∭_V 1 dxdydz. En sphériques : ∫∫∫ r² sin φ dr dφ dθ."},
   {c:4,q:"Comment calculer une masse ?",a:"M = ∭_V ρ(x,y,z) dxdydz (densité fois volume)."},

   {c:5,q:"Longueur d'une courbe γ ?",a:"L = ∫_a^b ‖γ'(t)‖ dt."},
   {c:5,q:"Circulation d'un champ F le long de γ ?",a:"∫_γ F·dl = ∫_γ P dx + Q dy = ∫(P·x' + Q·y') dt."},
   {c:5,q:"Théorème de Green-Riemann ?",a:"∮_∂D P dx + Q dy = ∬_D (∂Q/∂x − ∂P/∂y) dxdy (∂D orienté positivement)."},
   {c:5,q:"Circulation d'un champ de gradient F = ∇φ ?",a:"φ(B) − φ(A). Ne dépend que des extrémités."},
   {c:5,q:"Aire d'un domaine D par intégrale de bord ?",a:"aire(D) = ½∮_∂D (x dy − y dx)."},

   {c:6,q:"Vecteur normal à une surface (u,v)→M(u,v) ?",a:"N = ∂M/∂u ∧ ∂M/∂v ; élément d'aire dS = ‖N‖ dudv."},
   {c:6,q:"Définition du flux d'un champ F à travers S ?",a:"Φ = ∬_S F·n dS = ∬_Δ F·N dudv."},
   {c:6,q:"Théorème de Stokes ?",a:"∮_∂S F·dl = ∬_S rot F · n dS (S orientée)."},
   {c:6,q:"Théorème de Green-Ostrogradski (divergence) ?",a:"∯_∂V F·n dS = ∭_V div F dV (surface fermée, n sortante)."},
   {c:6,q:"Quand utiliser Ostrogradski plutôt que le calcul direct ?",a:"Surface fermée ET div F simple ⟹ intégrale triple souvent plus facile."},

   {c:7,q:"Théorème de Fermat (1 variable) ?",a:"Si f admet un extremum local intérieur en c, alors f'(c) = 0."},
   {c:7,q:"Condition nécessaire d'un extremum de f : ℝ² → ℝ ?",a:"∇f(a, b) = 0 (point critique)."},
   {c:7,q:"Discriminant hessien Δ ?",a:"Δ = f_xx · f_yy − (f_xy)² = det(H)."},
   {c:7,q:"Test de Monge : nature d'un point critique ?",a:"Δ>0 & f_xx>0 : min ; Δ>0 & f_xx<0 : max ; Δ<0 : selle ; Δ=0 : indéterminé."},
   {c:7,q:"Méthode de Lagrange (contrainte g = 0) ?",a:"∇f = λ∇g et g = 0. λ = multiplicateur de Lagrange."},
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
      card.innerHTML=html; cont.appendChild(card);
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
          fb.querySelector(".expl").innerHTML=q.e;
          $("qScore").textContent="Score : "+score;
          $("qNext").style.display="";
        });
      });
    } else {
      var f=document.createElement("div"); f.className="flash";
      f.innerHTML='<div class="fside">Question · Ch. '+q.c+'</div><div class="fq">'+q.q+'</div><div class="tap">Cliquez pour révéler la réponse</div>';
      var flipped=false;
      f.addEventListener("click",function(){ if(flipped)return; flipped=true;
        f.innerHTML='<div class="fside">Réponse</div><div class="fa">'+q.a+'</div>';
        $("qNext").style.display="";
      });
      cont.appendChild(f);
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
