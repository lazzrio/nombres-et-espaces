(function(){
  "use strict";
  var CHNAMES=["Géométrie","Matrices","Déterminants","Espaces vectoriels","Applications linéaires","Séries numériques","Séries de Fourier"];
  var CHMAT  =["alg","alg","alg","alg","alg","ana","ana"];

  /* ---- QCM bank ---- */
  var QCM=[
   /* Ch 0 — Géométrie */
   {c:0,q:"Le produit scalaire de u=(1,2,3) et v=(4,-1,2) vaut :",o:["8","4","-2","12"],a:0,e:"u·v = 1·4 + 2·(-1) + 3·2 = 4 − 2 + 6 = 8."},
   {c:0,q:"L'aire du parallélogramme construit sur u et v vaut :",o:["u·v","‖u‖·‖v‖·cosθ","‖u∧v‖","det(u,v,0)"],a:2,e:"L'aire est la norme du produit vectoriel : ‖u∧v‖ = ‖u‖·‖v‖·|sinθ|."},
   {c:0,q:"Le produit mixte [u,v,w] égale :",o:["u·(v+w)","(u∧v)·w","u·v·w","u∧(v∧w)"],a:1,e:"[u,v,w] = (u∧v)·w = det(u,v,w). Son module donne le volume du parallélépipède."},
   {c:0,q:"Un plan d'équation 2x + y − z = 5 a pour vecteur normal :",o:["(2,1,-1)","(5,0,0)","(1,1,1)","(-2,-1,1)"],a:0,e:"Les coefficients (a,b,c) sont les composantes du vecteur normal."},

   /* Ch 1 — Matrices */
   {c:1,q:"Si A est de taille 3×5 et B de taille 5×2, le produit AB existe et est de taille :",o:["3×2","5×5","2×3","non défini"],a:0,e:"Les colonnes de A (5) égalent les lignes de B (5). Résultat : 3 lignes × 2 colonnes."},
   {c:1,q:"On a toujours (AB)^T =",o:["A^T B^T","B^T A^T","(A B)^T","AB"],a:1,e:"La transposition d'un produit inverse l'ordre : ᵗ(AB) = ᵗB·ᵗA."},
   {c:1,q:"L'inverse d'un produit AB (A et B inversibles) vaut :",o:["A⁻¹B⁻¹","B⁻¹A⁻¹","(BA)⁻¹","A B⁻¹"],a:1,e:"(AB)⁻¹ = B⁻¹A⁻¹ — même règle d'inversion d'ordre que pour la transposée."},
   {c:1,q:"Le rang d'une matrice se lit après échelonnage comme :",o:["nombre de lignes","nombre de colonnes","nombre de pivots non nuls","déterminant"],a:2,e:"Le rang est le nombre de pivots (lignes non nulles) après échelonnement."},
   {c:1,q:"Pour calculer A⁻¹ par Gauss-Jordan, on écrit :",o:["[A | 0] et on échelonne","[A | I] puis on échelonne jusqu'à [I | B]","det(A) puis <sup>t</sup>com(A)","det(A) · A"],a:1,e:"Méthode de la matrice augmentée : [A|I] → [I|A⁻¹]."},
   {c:1,q:"Le produit matriciel est :",o:["commutatif","associatif mais non commutatif","non associatif","commutatif si carré"],a:1,e:"Associatif : A(BC)=(AB)C. En général AB ≠ BA."},

   /* Ch 2 — Déterminants */
   {c:2,q:"Le déterminant d'une matrice 2×2 [[a,b],[c,d]] vaut :",o:["ab − cd","ad − bc","ac − bd","a + d − b − c"],a:1,e:"det = ad − bc, formule à connaître."},
   {c:2,q:"Pour une matrice carrée n×n : det(λA) vaut :",o:["λ·det(A)","λⁿ·det(A)","n·det(A)","det(A)"],a:1,e:"Chaque ligne est multipliée par λ, donc det est multiplié par λⁿ."},
   {c:2,q:"A est inversible si et seulement si :",o:["det(A) = 0","det(A) ≠ 0","det(A) = 1","A est carrée"],a:1,e:"det(A) ≠ 0 ⟺ A inversible ⟺ rg(A) = n."},
   {c:2,q:"det(AB) vaut :",o:["det(A) + det(B)","det(A)·det(B)","det(BA) toujours","det(A+B)"],a:1,e:"Multiplicativité : det(AB) = det(A)·det(B)."},
   {c:2,q:"Pour une matrice triangulaire, le déterminant est :",o:["nul","le produit des coefficients diagonaux","la somme des diagonaux","1"],a:1,e:"det(triangulaire) = produit des coefficients diagonaux — d'où l'intérêt d'échelonner."},
   {c:2,q:"Ajouter à une ligne un multiple d'une autre a pour effet sur le déterminant :",o:["il est multiplié par 2","aucun effet","il change de signe","il devient nul"],a:1,e:"L_i ← L_i + λL_j ne change pas le déterminant (utilisé pour créer des zéros)."},
   {c:2,q:"La règle de Sarrus s'applique :",o:["à toute taille n","seulement à n=3","seulement à n=2","aux matrices triangulaires"],a:1,e:"Sarrus est SEULEMENT pour n=3. À partir de n=4 : développement par cofacteurs."},

   /* Ch 3 — Espaces vectoriels */
   {c:3,q:"Pour montrer que F est un sev de E, il suffit de :",o:["montrer que F ≠ ∅ seulement","0 ∈ F et stabilité par λu + v","que F est fini","que F contient E"],a:1,e:"Caractérisation à retenir : F non vide (0 dedans) + stable par combinaisons linéaires."},
   {c:3,q:"La dimension de ℝⁿ est :",o:["1","n","2n","n²"],a:1,e:"Base canonique (e_1,...,e_n), donc dim ℝⁿ = n."},
   {c:3,q:"La dimension de K_n[X] (polynômes de degré ≤ n) est :",o:["n","n+1","2n","∞"],a:1,e:"Base : 1, X, X², ..., Xⁿ, soit n+1 vecteurs."},
   {c:3,q:"La dimension de ℳ_{m,n}(K) est :",o:["m + n","mn","m² + n²","max(m,n)"],a:1,e:"Base des matrices E_ij (un 1 en position i,j, des 0 ailleurs) : mn éléments."},
   {c:3,q:"Une famille (v_1, ..., v_p) est libre si :",o:["elle engendre E","∑ λ_i v_i = 0 ⟹ tous λ_i = 0","p = dim E","v_1 ≠ 0"],a:1,e:"Définition de la liberté : la seule combinaison linéaire nulle est la triviale."},
   {c:3,q:"Formule de Grassmann :",o:["dim(F+G) = dim F · dim G","dim(F+G) = dim F + dim G","dim(F+G) = dim F + dim G − dim(F∩G)","dim(F+G) = max(dim F, dim G)"],a:2,e:"Formule à connaître : dim(F+G) = dim F + dim G − dim(F∩G)."},
   {c:3,q:"F ⊕ G (somme directe) est équivalent à :",o:["F ⊂ G","F ∩ G = {0}","F = G","F ∪ G = E"],a:1,e:"Somme directe = intersection réduite au vecteur nul (décomposition unique)."},

   /* Ch 4 — Applications linéaires */
   {c:4,q:"Le théorème du rang énonce :",o:["dim(Ker f) + dim(Im f) = dim F","dim E = dim(Ker f) + rg(f)","rg(f) = dim(Ker f)","dim(Im f) = dim(Ker f)"],a:1,e:"Théorème du rang : dim E = dim(Ker f) + rg(f). E = espace de départ !"},
   {c:4,q:"f linéaire est injective ssi :",o:["f est bijective","Ker f = {0}","Im f = F","rg(f) > 0"],a:1,e:"Caractérisation spécifique aux applications linéaires : injectivité ⟺ noyau réduit à {0}."},
   {c:4,q:"Si dim E = dim F (fini) et f : E → F linéaire, alors f bijective ⟺ :",o:["f injective seulement","f injective ou surjective","f surjective seulement","f nulle"],a:1,e:"En dim finie égale : injective ⟺ surjective ⟺ bijective."},
   {c:4,q:"La matrice de f dans les bases ℬ, ℬ' a pour j-ième colonne :",o:["les coords de f dans ℬ","les coords de f(e_j) dans ℬ'","les coords de e_j dans ℬ'","les valeurs propres"],a:1,e:"Colonne j = image du j-ième vecteur de la base de départ, exprimée dans la base d'arrivée."},
   {c:4,q:"La matrice d'une composée g ∘ f est :",o:["Mat(g) + Mat(f)","Mat(g) · Mat(f)","Mat(f) · Mat(g)","(Mat(f))⁻¹"],a:1,e:"Mat(g ∘ f) = Mat(g) · Mat(f) — attention à l'ordre (g agit après f)."},
   {c:4,q:"f est un isomorphisme entre E et F (dim finie) ssi :",o:["dim E ≠ dim F","dim E = dim F et f linéaire","dim E = dim F et f bijective linéaire","f = identité"],a:2,e:"Isomorphisme = application linéaire bijective. En dim finie, exige dim E = dim F."},
   {c:4,q:"Le rang d'une application linéaire f est :",o:["dim(Ker f)","dim(Im f)","dim E","dim F"],a:1,e:"rg(f) = dim(Im f) — la dimension de l'espace des images."},

   /* Ch 5 — Séries numériques */
   {c:5,q:"Une condition NÉCESSAIRE (mais pas suffisante) pour que ∑ u_n converge est :",o:["u_n < 1","u_n → 0","u_n > 0","(u_n) monotone"],a:1,e:"Contre-exemple classique : u_n = 1/n → 0 mais ∑ 1/n diverge."},
   {c:5,q:"La série ∑ 1/n^α converge si et seulement si :",o:["α > 0","α > 1","α ≥ 1","α < 1"],a:1,e:"Critère de Riemann : ∑ 1/n^α CV ⟺ α > 1 (strict)."},
   {c:5,q:"La série harmonique ∑ 1/n :",o:["converge","diverge","converge à 1","dépend"],a:1,e:"Diverge — cas limite α = 1 dans Riemann."},
   {c:5,q:"Règle de D'Alembert : si u_{n+1}/u_n → ℓ, alors si ℓ = 1 :",o:["CV","DV","indéterminé","division impossible"],a:2,e:"ℓ = 1 : le critère ne conclut pas. Chercher un autre outil (équivalence, Riemann...)."},
   {c:5,q:"La série ∑ q^n (n≥0) converge et vaut 1/(1-q) si :",o:["q > 0","|q| < 1","q < 0","q ≠ 1"],a:1,e:"Géométrique : CV ⟺ |q| < 1, somme 1/(1-q)."},
   {c:5,q:"Le théorème de Leibniz s'applique à ∑ (-1)^n a_n si :",o:["a_n > 0","(a_n) décroit vers 0","a_n → +∞","(a_n) est bornée"],a:1,e:"Séries alternées : (a_n) positive, décroissante, → 0."},
   {c:5,q:"« Convergence absolue » signifie :",o:["u_n > 0","∑ |u_n| converge","∑ u_n²  converge","(u_n) est bornée"],a:1,e:"∑ |u_n| converge. Impliquant : ∑ u_n converge."},
   {c:5,q:"Deux suites u_n ~ v_n (équivalentes) impliquent, pour les séries à termes positifs :",o:["mêmes sommes","même nature (CV/DV)","∑ u_n < ∑ v_n","aucun lien"],a:1,e:"L'équivalence entraîne même nature (à termes de signe constant à partir d'un rang)."},

   /* Ch 6 — Séries de Fourier */
   {c:6,q:"Pour f 2π-périodique paire, on a :",o:["a_n = 0","b_n = 0","c_n = 0","aucune symétrie"],a:1,e:"Symétrie paire : b_n = 0 (sin est impair). Astuce : intégrer sur [0,π] ×2."},
   {c:6,q:"Pour f 2π-périodique impaire, on a :",o:["a_n = 0","b_n = 0","f = 0","c_0 ≠ 0"],a:0,e:"Symétrie impaire : a_n = 0 (cos est pair). La série ne contient que des sinus."},
   {c:6,q:"Théorème de Dirichlet : la série de Fourier converge en tout point x vers :",o:["f(x)","(f(x⁺) + f(x⁻))/2","f'(x)","∫ f"],a:1,e:"Dirichlet : moyenne des limites à gauche et à droite. Si f continue en x, on retrouve f(x)."},
   {c:6,q:"Formule de Parseval :",o:["∫f = a_0 + ∑ a_n","(1/π)∫f² = a_0²/2 + ∑(a_n² + b_n²)","∫f² = a_0","∫f = 0"],a:1,e:"Parseval — égalité de l'énergie. Sert à calculer des sommes numériques (∑ 1/n² = π²/6...)."},
   {c:6,q:"Le coefficient a_n de Fourier vaut (période 2π) :",o:["(1/2π)∫f","(1/π)∫f·cos(nt)dt","∫f·sin(nt)dt","f(nπ)"],a:1,e:"a_n = (1/π)∫_{-π}^{π} f(t)cos(nt) dt. Le facteur 1/π (et non 1/2π) est l'usage habituel."},
   {c:6,q:"Le lien entre coefficients complexes et réels (n ≥ 1) est :",o:["c_n = a_n + b_n","c_n = (a_n − i b_n)/2","c_n = i a_n","c_n = a_n"],a:1,e:"c_n = (a_n − i b_n)/2, et c_{-n} = conjugué de c_n."},
   {c:6,q:"L'hypothèse minimale de Dirichlet est que f soit :",o:["continue partout","C¹ par morceaux","polynomiale","périodique seulement"],a:1,e:"Continue par morceaux + C¹ par morceaux suffisent. Les discontinuités sont autorisées."}
  ];

  /* ---- Flashcards ---- */
  var FLASH=[
   {c:0,q:"Aire du parallélogramme construit sur u et v ?",a:"‖u∧v‖."},
   {c:0,q:"Volume du parallélépipède construit sur u, v, w ?",a:"|[u,v,w]| = |det(u,v,w)|."},
   {c:0,q:"Vecteur normal à un plan d'équation ax + by + cz + d = 0 ?",a:"(a, b, c)."},
   {c:0,q:"u orthogonal à v ⟺ ... ?",a:"u · v = 0."},

   {c:1,q:"Condition pour que le produit AB existe ?",a:"colonnes de A = lignes de B."},
   {c:1,q:"ᵗ(AB) = ?",a:"ᵗB · ᵗA (inversion de l'ordre)."},
   {c:1,q:"(AB)⁻¹ = ?",a:"B⁻¹ · A⁻¹."},
   {c:1,q:"Méthode de Gauss-Jordan pour A⁻¹ ?",a:"[A | I] → opérations élémentaires → [I | A⁻¹]."},
   {c:1,q:"Trois opérations élémentaires sur les lignes ?",a:"L_i ↔ L_j ; L_i ← λL_i (λ≠0) ; L_i ← L_i + λL_j."},

   {c:2,q:"det 2×2 [[a,b],[c,d]] ?",a:"ad − bc."},
   {c:2,q:"det(AB) ?",a:"det(A) · det(B)."},
   {c:2,q:"det(λA) pour A ∈ ℳ_n ?",a:"λⁿ · det(A)."},
   {c:2,q:"A inversible ⟺ ... ?",a:"det(A) ≠ 0."},
   {c:2,q:"Méthode de Cramer : x_i = ?",a:"det(A_i) / det(A), où A_i = A avec col. i remplacée par B."},
   {c:2,q:"det d'une matrice triangulaire ?",a:"Produit des coefficients diagonaux."},

   {c:3,q:"Caractérisation d'un sev F ?",a:"F ≠ ∅ (0 ∈ F) et ∀ u,v ∈ F, ∀ λ, λu + v ∈ F."},
   {c:3,q:"dim ℝⁿ ?",a:"n."},
   {c:3,q:"dim K_n[X] ?",a:"n + 1."},
   {c:3,q:"dim ℳ_{m,n}(K) ?",a:"mn."},
   {c:3,q:"Base = ... + ... ?",a:"Famille libre ET génératrice."},
   {c:3,q:"Formule de Grassmann ?",a:"dim(F+G) = dim F + dim G − dim(F ∩ G)."},

   {c:4,q:"Énoncé du théorème du rang ?",a:"dim E = dim(Ker f) + rg(f)."},
   {c:4,q:"f linéaire injective ⟺ ... ?",a:"Ker f = {0}."},
   {c:4,q:"rg(f) = ... ?",a:"dim(Im f) = rg de la matrice de f."},
   {c:4,q:"Matrice de f dans les bases ℬ, ℬ' : structure ?",a:"Colonne j = coordonnées de f(e_j) dans ℬ'."},
   {c:4,q:"Mat(g ∘ f) = ?",a:"Mat(g) · Mat(f)."},
   {c:4,q:"Changement de base pour un endomorphisme ?",a:"M' = P⁻¹ · M · P, avec P matrice de passage."},

   {c:5,q:"Condition nécessaire de convergence ?",a:"u_n → 0. La réciproque est fausse !"},
   {c:5,q:"Critère de Riemann : ∑ 1/n^α CV ⟺ ?",a:"α > 1 (strict)."},
   {c:5,q:"Série géométrique ∑ q^n : CV et somme ?",a:"CV ⟺ |q| < 1 ; somme = 1/(1−q)."},
   {c:5,q:"Règle de D'Alembert : cas ℓ = 1 ?",a:"Indéterminé — le critère ne conclut pas."},
   {c:5,q:"Théorème des séries alternées (Leibniz) ?",a:"(a_n) positive, décroissante, → 0 ⟹ ∑ (−1)ⁿ a_n converge."},
   {c:5,q:"Convergence absolue ⟹ ?",a:"Convergence simple. Réciproque fausse (semi-convergence)."},

   {c:6,q:"Coefficient a_n (période 2π) ?",a:"a_n = (1/π) ∫_{-π}^{π} f(t)·cos(nt) dt."},
   {c:6,q:"Coefficient b_n ?",a:"b_n = (1/π) ∫_{-π}^{π} f(t)·sin(nt) dt."},
   {c:6,q:"f paire → ? ; f impaire → ?",a:"paire : b_n = 0 ; impaire : a_n = 0."},
   {c:6,q:"Énoncé du théorème de Dirichlet ?",a:"f 2π-péri, C¹ par mcx ⟹ S(x) = (f(x⁺) + f(x⁻))/2."},
   {c:6,q:"Formule (identité) de Parseval ?",a:"(1/π) ∫ f² = a_0²/2 + ∑ (a_n² + b_n²)."},
   {c:6,q:"Coefficient complexe c_n ?",a:"c_n = (1/2π) ∫ f(t)·e^{-int} dt ; c_n = (a_n − i b_n)/2 pour n ≥ 1."}
  ];

  var sel=new Set([0,1,2,3,4,5,6]), fmt="qcm", ord="chap";
  var pool=[], idx=0, score=0, answered=false;

  var $=function(id){return document.getElementById(id);};
  var setup=$("quizSetup"), run=$("quizRun"), result=$("quizResult"),
      chips=$("chapChips"), cont=$("qContainer");

  CHNAMES.forEach(function(name,i){
    var b=document.createElement("button");
    b.className="chapchip on" + (CHMAT[i]==="ana"?" ana":"");
    b.textContent=i+" · "+name;
    b.addEventListener("click",function(){
      if(sel.has(i)){sel.delete(i);b.classList.remove("on");}else{sel.add(i);b.classList.add("on");}
    });
    chips.appendChild(b);
  });
  $("chapAll").addEventListener("click",function(){sel=new Set([0,1,2,3,4,5,6]);chips.querySelectorAll(".chapchip").forEach(function(c){c.classList.add("on");});});
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
