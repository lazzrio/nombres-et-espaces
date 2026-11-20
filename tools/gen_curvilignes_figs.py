# Génère les schémas SVG de la fiche « intégrales curvilignes » (fiche-curvilignes.html) et les insère à leur place.
# Usage : python tools/gen_curvilignes_figs.py
# Idempotent : chaque emplacement est repéré par un commentaire <!-- cl-slot:nom --> placé dans la page ;
# le bloc généré est encadré par <!-- cl-begin:nom --> ... <!-- cl-end:nom --> et remplacé à chaque exécution.
# Le CSS des figures est ajouté à css/style.css sous le marqueur « schémas de la fiche curvilignes ».
import math, os, re, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
PAGE = os.path.join(ROOT, 'fiche-curvilignes.html')
CSS = os.path.join(ROOT, 'css', 'style.css')
MARK = '/* schémas de la fiche curvilignes */'


def tx(s):
    """texte SVG : e{r} -> e avec indice r"""
    parts = re.split(r'\{([^}]*)\}', s)
    out = ''
    for i, p in enumerate(parts):
        out += p if i % 2 == 0 else '<tspan class="sb" dy="4">%s</tspan><tspan dy="-4"></tspan>' % p
    return out


def f2(v):
    return ('%.1f' % v).rstrip('0').rstrip('.')


class F:
    def __init__(self, n, w, h):
        self.n, self.w, self.h, self.p = n, w, h, []

    def add(self, s):
        self.p.append(s)

    def mk(self, c):
        return 'url(#cl%d%s)' % (self.n, c)

    def text(self, x, y, s, cls='', anchor='start'):
        self.add('<text class="%s" x="%s" y="%s" text-anchor="%s">%s</text>' % (cls, f2(x), f2(y), anchor, tx(s)))

    def path(self, pts, cls, close=False, extra=''):
        d = 'M' + ' L'.join('%s %s' % (f2(x), f2(y)) for x, y in pts) + (' Z' if close else '')
        self.add('<path class="%s" d="%s" %s/>' % (cls, d, extra))

    def line(self, a, b, cls='ax', arrow=None):
        m = ' marker-end="%s"' % self.mk(arrow) if arrow else ''
        self.add('<path class="%s" d="M%s %s L%s %s"%s/>' % (cls, f2(a[0]), f2(a[1]), f2(b[0]), f2(b[1]), m))

    def dot(self, x, y, cls='pt', r=3.6):
        self.add('<circle class="%s" cx="%s" cy="%s" r="%s"/>' % (cls, f2(x), f2(y), r))

    def tri(self, x, y, dx, dy, cls='mk-a', s=8):
        """petite pointe de flèche centrée en (x,y), orientée selon (dx,dy) (coordonnées SVG)"""
        L = math.hypot(dx, dy); ux, uy = dx / L, dy / L
        tip = (x + ux * s * .7, y + uy * s * .7)
        b1 = (x - ux * s * .7 - uy * s * .5, y - uy * s * .7 + ux * s * .5)
        b2 = (x - ux * s * .7 + uy * s * .5, y - uy * s * .7 - ux * s * .5)
        self.add('<path class="%s" d="M%s %s L%s %s L%s %s Z"/>' % (cls, f2(tip[0]), f2(tip[1]), f2(b1[0]), f2(b1[1]), f2(b2[0]), f2(b2[1])))

    def svg(self, name, aria, caption):
        defs = '<defs>' + ''.join(
            '<marker id="cl%d%s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="%s" d="M0,0 L10,5 L0,10 z"/></marker>'
            % (self.n, c, k) for c, k in (('a', 'mk-a'), ('b', 'mk-b'), ('i', 'mk-i'), ('r', 'mk-r'), ('m', 'mk-m'))) + '</defs>'
        return ('<!-- cl-fig:%s --><figure class="cl-fig"><svg viewBox="0 0 %d %d" role="img" aria-label="%s">%s%s</svg>'
                '<figcaption>%s</figcaption></figure>' % (name, self.w, self.h, aria, defs, ''.join(self.p), caption))


def bez(P, u):
    a = (1 - u) ** 3, 3 * (1 - u) ** 2 * u, 3 * (1 - u) * u ** 2, u ** 3
    return (sum(a[i] * P[i][0] for i in range(4)), sum(a[i] * P[i][1] for i in range(4)))


def dbez(P, u):
    a = 3 * (1 - u) ** 2, 6 * (1 - u) * u, 3 * u ** 2
    return (sum(a[i] * (P[i + 1][0] - P[i][0]) for i in range(3)), sum(a[i] * (P[i + 1][1] - P[i][1]) for i in range(3)))


def arcpts(cx, cy, r, a0, a1, n=60):
    """arc de cercle en coordonnées SVG, angles mathématiques en degrés (sens trigo = a croissant)"""
    return [(cx + r * math.cos(math.radians(a0 + (a1 - a0) * i / n)), cy - r * math.sin(math.radians(a0 + (a1 - a0) * i / n))) for i in range(n + 1)]


def tang(pts, i):
    a, b = pts[max(i - 1, 0)], pts[min(i + 1, len(pts) - 1)]
    return (b[0] - a[0], b[1] - a[1])


def arrows_on(f, pts, idx, cls='mk-a', s=9):
    for i in idx:
        dx, dy = tang(pts, i)
        f.tri(pts[i][0], pts[i][1], dx, dy, cls, s)


FIG = {}


def ecrire(chemin, texte):
    # écriture via un fichier temporaire puis remplacement (certains éditeurs / serveurs verrouillent le fichier d'origine)
    tmp = chemin + '.tmp'
    with open(tmp, 'w', encoding='utf-8', newline='\n') as fh:
        fh.write(texte)
    os.replace(tmp, chemin)

# ------------------------------------------------------------ 1. chemin orienté, origine, extrémité, c'(t), F(c(t))
f = F(1, 360, 215)
P = [(38, 165), (95, 35), (215, 205), (322, 58)]
pts = [bez(P, i / 80) for i in range(81)]
f.path(pts, 'cv')
arrows_on(f, pts, [16, 64])
A, B = P[0], P[3]
f.dot(*A, 'ptb'); f.dot(*B, 'ptb')
f.text(A[0] - 2, A[1] + 22, 'origine c(a)', 'tb', 'start')
f.text(B[0] + 2, B[1] - 12, 'extrémité c(b)', 'tb', 'end')
f.text(70, 68, 'C', 'big ta', 'middle')
M = bez(P, .5); T = dbez(P, .5); L = math.hypot(*T); T = (T[0] / L, T[1] / L)
f.dot(*M, 'pt')
tv = (M[0] + T[0] * 64, M[1] + T[1] * 64)
f.line(M, tv, 'vecb', 'b')
ang = math.radians(-48)
Fd = (T[0] * math.cos(ang) - T[1] * math.sin(ang), T[0] * math.sin(ang) + T[1] * math.cos(ang))
fv = (M[0] + Fd[0] * 58, M[1] + Fd[1] * 58)
f.line(M, fv, 'veca', 'a')
f.text(tv[0] + 4, tv[1] + 16, "c′(t)", 'it tb', 'start')
f.text(fv[0] + 6, fv[1] - 4, "F(c(t))", 'it ta', 'start')
f.path(arcpts(M[0], M[1], 26, -math.degrees(math.atan2(T[1], T[0])), -math.degrees(math.atan2(T[1], T[0])) + 48, 12), 'thin')
f.text(M[0] + 34, M[1] - 5, 'α', 'it', 'start')
f.text(M[0] - 6, M[1] + 22, 'c(t)', 'it', 'middle')
f.text(180, 14, 'ce qui est intégré : F · c′ = ‖F‖ ‖c′‖ cos α', 'tm', 'middle')
FIG['chemin'] = f.svg('chemin', 'Courbe orientée de c(a) à c(b), avec le vecteur dérivé c′(t) et le champ F(c(t)) en un point',
                      "Le chemin va de <b>c(a)</b> à <b>c(b)</b>. En chaque point, on prend la composante de <b>F</b> le long de <b>c′(t)</b> : positive si F pousse dans le sens du parcours, nulle si F est perpendiculaire, négative s'il s'y oppose.")

# ------------------------------------------------------------ 2. C et C-
f = F(2, 360, 175)
for k, (cx, sign) in enumerate(((92, 1), (268, -1))):
    cy, r = 118, 62
    pts = arcpts(cx, cy, r, 0, 180) if sign == 1 else arcpts(cx, cy, r, 180, 0)
    f.line((cx - r - 14, cy), (cx + r + 14, cy), 'ax dsh')
    f.path(pts, 'cv' if sign == 1 else 'cv2')
    arrows_on(f, pts, [30], 'mk-a' if sign == 1 else 'mk-b', 10)
    s0, s1 = pts[0], pts[-1]
    f.dot(*s0, 'ptb' if sign == 1 else 'ptc'); f.dot(*s1, 'pt')
    f.text(s0[0], s0[1] + 18, 'départ' if True else '', 'tm', 'middle')
    f.text(s1[0], s1[1] + 18, 'arrivée', 'tm', 'middle')
f.text(92 + 62, 150, '(1, 0)', 'it', 'middle'); f.text(92 - 62, 150, '(−1, 0)', 'it', 'middle')
f.text(268 - 62, 150, '(−1, 0)', 'it', 'middle'); f.text(268 + 62, 150, '(1, 0)', 'it', 'middle')
f.text(92, 20, 'C', 'big ta', 'middle'); f.text(92, 38, 'c(t) = (cos t, sin t)', 'tm', 'middle')
f.text(268, 20, 'C⁻', 'big tb', 'middle'); f.text(268, 38, 'c⁻(t) = c(π − t)', 'tm', 'middle')
f.text(92, 92, '↺', 'big', 'middle'); f.text(268, 92, '↻', 'big', 'middle')
FIG['orient'] = f.svg('orient', 'Demi-cercle C parcouru dans le sens trigonométrique de (1,0) à (−1,0), et C moins parcouru dans l\'autre sens',
                      "Même demi-cercle, deux sens : échanger départ et arrivée <b>change le signe</b> de l'intégrale (\\(\\int_{C^-}=-\\int_C\\)).")

# ------------------------------------------------------------ 3. changement de paramétrisation
f = F(3, 360, 200)
cx, cy, r = 180, 156, 104
pts = arcpts(cx, cy, r, 0, 180)
f.line((cx - r - 12, cy), (cx + r + 12, cy), 'ax dsh')
f.path(pts, 'cv')
arrows_on(f, pts, [20, 40], 'mk-a', 10)
for a, l1, l2 in ((0, 't = 0', 'u = 0'), (180, 't = π', 'u = 1')):
    x, y = cx + r * math.cos(math.radians(a)), cy - r * math.sin(math.radians(a))
    f.dot(x, y, 'ptb')
    f.text(x, y + 19, l1, 'tm', 'middle'); f.text(x, y + 36, l2, 'tm', 'middle')
f.dot(cx, cy - r, 'ptb')
f.text(cx, cy - r - 10, 't = π/2 · u = ½', 'tm', 'middle')
f.text(180, 16, 'même arc, même sens : c₂(u) = c₁(πu)', 'tb', 'middle')
f.text(180, 112, 'c₁ : t ∈ [0, π]', 'it ta', 'middle')
f.text(180, 134, 'c₂ : u ∈ [0, 1]', 'it tb', 'middle')
FIG['param'] = f.svg('param', 'Un même demi-cercle avec deux paramétrages, t entre 0 et pi et u entre 0 et 1',
                     "Changement de paramétrisation \\(\\varphi(u)=\\pi u\\) : on parcourt le même arc dans le même sens, seule la « vitesse » change. L'intégrale curviligne est la même.")

# ------------------------------------------------------------ 4. Green-Riemann : bord orienté positivement
f = F(4, 360, 215)
cx, cy = 125, 108
blob = []
for i in range(161):
    th = 2 * math.pi * i / 160
    rr = 80 * (1 + .14 * math.cos(3 * th + .6) + .08 * math.sin(2 * th))
    blob.append((cx + rr * math.cos(th), cy - rr * math.sin(th)))
f.path(blob, 'dom', True)
f.path(blob, 'cv', True)
arrows_on(f, blob, [0, 27, 55, 80, 107, 135], 'mk-a', 10)
f.text(cx - 6, cy + 8, 'Δ', 'big', 'middle')
f.text(cx + 98, cy - 78, '∂Δ', 'big ta', 'start')
f.line((cx + 98, cy - 80), (blob[18][0] + 4, blob[18][1] - 6), 'thin', None)
f.text(248, 100, 'Δ reste', 'tb', 'start'); f.text(248, 118, 'à gauche', 'tb', 'start'); f.text(248, 136, 'du bord', 'tb', 'start')
f.text(248, 160, 'sens trigo', 'tm', 'start')
FIG['green'] = f.svg('green', 'Domaine Δ dont le bord ∂Δ est parcouru dans le sens trigonométrique, le domaine restant à gauche',
                     "Orientation positive : en suivant le bord, le domaine \\(\\Delta\\) est <b>à gauche</b>. Si le sens est inverse, on applique Green à \\(C^-\\) et on change le signe.")

# ------------------------------------------------------------ 5. carré autour de O (Ex 3d)
f = F(5, 360, 235)
cx, cy, h = 150, 120, 72
Pq = {'A': (cx + h, cy - h), 'B': (cx - h, cy - h), 'C': (cx - h, cy + h), 'D': (cx + h, cy + h)}
f.line((cx - h - 26, cy), (cx + h + 26, cy), 'ax', None); f.line((cx, cy + h + 24), (cx, cy - h - 24), 'ax', None)
sq = [Pq['A'], Pq['B'], Pq['C'], Pq['D']]
f.path(sq, 'dom', True)
f.path(sq, 'cv', True)
for (p, q) in ((Pq['A'], Pq['B']), (Pq['B'], Pq['C']), (Pq['C'], Pq['D']), (Pq['D'], Pq['A'])):
    f.tri((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, q[0] - p[0], q[1] - p[1], 'mk-a', 11)
for k, (nm, tx_, dx, dy, an) in enumerate((('A', 'A(1,1)', 6, -8, 'start'), ('B', 'B(−1,1)', -6, -8, 'end'), ('C', 'C(−1,−1)', -6, 17, 'end'), ('D', 'D(1,−1)', 6, 17, 'start'))):
    f.dot(*Pq[nm], 'ptb'); f.text(Pq[nm][0] + dx, Pq[nm][1] + dy, tx_, 'it', an)
# O interdit
f.line((cx - 7, cy - 7), (cx + 7, cy + 7), 'bad2'); f.line((cx - 7, cy + 7), (cx + 7, cy - 7), 'bad2')
f.text(cx + 12, cy + 22, 'O', 'it tr', 'start')
f.text(cx, cy - 26, 'π/2', 'tm', 'middle'); f.text(cx, cy + 44, 'π/2', 'tm', 'middle')
f.text(cx - 46, cy - 4, 'π/2', 'tm', 'middle'); f.text(cx + 46, cy - 4, 'π/2', 'tm', 'middle')
f.text(252, 104, 'O ∈ Δ :', 'tr', 'start'); f.text(252, 122, 'F non défini', 'tr', 'start'); f.text(252, 142, 'Green interdit', 'tr', 'start')
f.text(252, 170, 'total 4 × π/2', 'tb', 'start'); f.text(252, 188, '= 2π', 'tb', 'start')
FIG['carre'] = f.svg('carre', 'Carré ABCD de sommets (1,1), (-1,1), (-1,-1), (1,-1) parcouru dans le sens direct, avec l\'origine O à l\'intérieur où le champ n\'est pas défini',
                     "Exercice 3 d : le carré entoure l'origine, où \\(F\\) n'est pas défini. Chaque côté apporte \\(\\pi/2\\) ; Green-Riemann donnerait \\(0\\) : c'est faux.")

# ------------------------------------------------------------ 6. lentille (Ex 3e)
f = F(6, 360, 250)
s, ox, oy = 72, 92, 170
def Pm(x, y): return (ox + s * x, oy - s * y)
f.line(Pm(-1.15, 0), Pm(2.2, 0), 'ax', None); f.line(Pm(0, -1.15), Pm(0, 2.2), 'ax', None)
c1 = [(Pm(1, 0)[0] + s * math.cos(math.radians(a)), Pm(1, 0)[1] - s * math.sin(math.radians(a))) for a in range(0, 361, 4)]
c2 = [(Pm(0, 1)[0] + s * math.cos(math.radians(a)), Pm(0, 1)[1] - s * math.sin(math.radians(a))) for a in range(0, 361, 4)]
f.path(c1, 'thin dsh faint', True); f.path(c2, 'thin dsh faint', True)
arc_a = [(Pm(0, 1)[0] + s * math.cos(math.radians(-90 + 90 * i / 50)), Pm(0, 1)[1] - s * math.sin(math.radians(-90 + 90 * i / 50))) for i in range(51)]
arc_b = [(Pm(1, 0)[0] + s * math.cos(math.radians(90 + 90 * i / 50)), Pm(1, 0)[1] - s * math.sin(math.radians(90 + 90 * i / 50))) for i in range(51)]
f.path(arc_a + arc_b, 'dom', True)
f.path(arc_a, 'cv'); f.path(arc_b, 'cv')
arrows_on(f, arc_a, [25], 'mk-a', 10); arrows_on(f, arc_b, [25], 'mk-a', 10)
f.dot(*Pm(0, 0), 'ptb'); f.dot(*Pm(1, 1), 'ptb')
f.text(Pm(0, 0)[0] - 8, Pm(0, 0)[1] + 16, 'O', 'it', 'end'); f.text(Pm(1, 1)[0] + 8, Pm(1, 1)[1] - 6, '(1, 1)', 'it', 'start')
f.text(Pm(1, -0.55)[0] + 18, Pm(1, -.55)[1], 'D₁ : centre (1, 0)', 'tm', 'start')
f.text(Pm(-0.62, 1.0)[0] - 18, Pm(-.62, 1.5)[1], 'D₂ : centre (0, 1)', 'tm', 'start')
f.text(Pm(.5, .5)[0], Pm(.5, .5)[1] + 4, 'Δ', 'big', 'middle')
f.text(258, 70, 'Q_x − P_y', 'tb', 'start'); f.text(258, 88, '= 2 − 1 = 1', 'tb', 'start')
f.text(258, 116, 'donc ∮ = aire(Δ)', 'ta', 'start'); f.text(258, 134, '= π/2 − 1', 'ta', 'start')
FIG['lentille'] = f.svg('lentille', 'Intersection de deux disques de rayon 1 centrés en (1,0) et (0,1), formant une lentille entre O et (1,1), bord orienté dans le sens trigonométrique',
                        "Exercice 3 e : \\(\\Delta\\) est l'intersection des deux disques ; son bord est fait de <b>deux arcs</b>, un de chaque cercle, parcourus dans le sens trigonométrique.")

# ------------------------------------------------------------ 7. potentiel : indépendance du chemin
f = F(7, 360, 235)
cx, cy = 125, 118
for k, rr in enumerate((36, 72, 108)):
    f.path(arcpts(cx, cy, rr, 0, 360, 90), 'thin faint', True)
    f.text(cx - rr + 3, cy - 5, 'f=%d' % (k + 1), 'tm halo', 'start') if k < 2 else f.text(cx - rr + 5, cy + 16, 'f=3', 'tm halo', 'start')
A = (cx + 36, cy); Bp = (cx + 108 * math.cos(math.radians(55)), cy - 108 * math.sin(math.radians(55)))
Pa = [A, (A[0] + 15, A[1] - 40), (Bp[0] - 38, Bp[1] + 50), Bp]
Pb = [A, (A[0] + 70, A[1] + 60), (Bp[0] + 70, Bp[1] + 40), Bp]
ca = [bez(Pa, i / 60) for i in range(61)]; cb = [bez(Pb, i / 60) for i in range(61)]
f.path(ca, 'cv'); f.path(cb, 'cv2')
arrows_on(f, ca, [30], 'mk-a', 10); arrows_on(f, cb, [30], 'mk-b', 10)
f.dot(*A, 'ptb'); f.dot(*Bp, 'ptb')
f.text(A[0] - 6, A[1] + 18, 'A', 'it', 'end'); f.text(Bp[0] - 4, Bp[1] - 8, 'B', 'it', 'end')
g0 = (cx + 72 * math.cos(math.radians(235)), cy - 72 * math.sin(math.radians(235)))
g1 = (cx + 108 * math.cos(math.radians(235)), cy - 108 * math.sin(math.radians(235)))
f.line(g0, g1, 'veca', 'a')
f.text(g1[0] - 4, g1[1] + 14, 'grad f', 'it ta', 'end')
f.text(252, 84, 'chemin 1', 'ta', 'start'); f.text(252, 102, 'chemin 2', 'tb', 'start')
f.text(252, 130, 'même valeur :', 'tm', 'start')
f.text(252, 150, 'f(B) − f(A)', 'ta', 'start'); f.text(252, 168, '= 3 − 1 = 2', 'ta', 'start')
FIG['potentiel'] = f.svg('potentiel', 'Lignes de niveau d\'un potentiel f, deux chemins différents de A à B, et le gradient perpendiculaire aux lignes de niveau',
                         "Si \\(F=\\overrightarrow{\\text{grad}}\\,f\\), la circulation de A à B ne dépend pas du chemin : elle vaut \\(f(B)-f(A)\\). Ici \\(f=\\sqrt{x^2+y^2}\\), juste pour l'illustration ; le gradient est perpendiculaire aux lignes de niveau.")

# ------------------------------------------------------------ 8. ouvert étoilé / non étoilé
f = F(8, 360, 200)
c1x, c2x, cy, R = 95, 265, 90, 72
f.path(arcpts(c1x, cy, R, 0, 360, 90), 'dom', True); f.path(arcpts(c1x, cy, R, 0, 360, 90), 'thin', True)
for a in (20, 75, 140, 200, 255, 320):
    q = (c1x + .82 * R * math.cos(math.radians(a)), cy - .82 * R * math.sin(math.radians(a)))
    f.line((c1x, cy), q, 'thin', None); f.dot(*q, 'pt', 2.6)
f.dot(c1x, cy, 'ptb', 4.4)
f.text(c1x + 7, cy + 17, 'A', 'it', 'start')
f.text(c1x, 186, 'étoilé : [AM] reste dedans', 'tm', 'middle')
ring = arcpts(c2x, cy, R, 0, 360, 90) + [None] + arcpts(c2x, cy, 26, 0, 360, 90)
d = 'M' + ' L'.join('%s %s' % (f2(x), f2(y)) for x, y in arcpts(c2x, cy, R, 0, 360, 90)) + ' Z M' + ' L'.join('%s %s' % (f2(x), f2(y)) for x, y in arcpts(c2x, cy, 26, 0, 360, 90)) + ' Z'
f.add('<path class="dom" fill-rule="evenodd" d="%s"/>' % d)
f.path(arcpts(c2x, cy, R, 0, 360, 90), 'thin', True); f.path(arcpts(c2x, cy, 26, 0, 360, 90), 'thin', True)
M1 = (c2x + R * .82 * math.cos(math.radians(150)), cy - R * .82 * math.sin(math.radians(150)))
M2 = (c2x + R * .82 * math.cos(math.radians(-30)), cy - R * .82 * math.sin(math.radians(-30)))
f.line(M1, M2, 'bad2 dsh', None)
f.dot(*M1, 'pt', 3); f.dot(*M2, 'pt', 3)
f.text(M1[0] - 4, M1[1] - 6, 'M', 'it', 'end'); f.text(M2[0] + 4, M2[1] + 15, 'N', 'it', 'start')
f.line((c2x - 6, cy - 6), (c2x + 6, cy + 6), 'bad2'); f.line((c2x - 6, cy + 6), (c2x + 6, cy - 6), 'bad2')
f.text(c2x + 11, cy - 6, 'O', 'it tr', 'start')
f.text(c2x, 186, 'pas étoilé : [MN] sort', 'tm', 'middle')
FIG['etoile'] = f.svg('etoile', 'Un disque, ouvert étoilé, et une couronne autour de O, qui n\'est pas étoilée',
                      "Étoilé : un point \\(A\\) voit tout l'ouvert en ligne droite. La couronne (comme \\(\\mathbb{R}^2\\setminus\\{O\\}\\)) n'est <b>pas</b> étoilée : le segment \\([MN]\\) passe par le trou.")

# ------------------------------------------------------------ 9. ellipse : t n'est pas l'angle polaire
f = F(9, 360, 282)
cx, cy, a, b = 180, 128, 108, 56
t = math.radians(52)
f.line((cx - a - 16, cy), (cx + a + 16, cy), 'ax', None); f.line((cx, cy + a + 10), (cx, cy - a - 14), 'ax', None)
f.path(arcpts(cx, cy, a, 0, 360, 120), 'thin dsh faint', True)
ell = [(cx + a * math.cos(math.radians(k)), cy - b * math.sin(math.radians(k))) for k in range(0, 361, 3)]
f.path(ell, 'cv', True)
arrows_on(f, ell, [40, 100], 'mk-a', 10)
Q = (cx + a * math.cos(t), cy - a * math.sin(t)); Mm = (cx + a * math.cos(t), cy - b * math.sin(t))
f.line((Mm[0], cy), Q, 'thin dsh', None)
f.line((cx, cy), Q, 'thin dsh faint', None)
f.line((cx, cy), Mm, 'vecb', None)
f.dot(*Q, 'pt', 3); f.dot(*Mm, 'ptb', 4.2)
th = math.degrees(math.atan2(b * math.sin(t), a * math.cos(t)))
f.path(arcpts(cx, cy, 34, 0, math.degrees(t), 24), 'thin')
f.path(arcpts(cx, cy, 58, 0, th, 24), 'thinb')
f.text(cx + 40, cy - 27, 't', 'it ta', 'start'); f.text(cx + 63, cy - 12, 'θ', 'it tb', 'start')
f.text(Q[0] + 6, Q[1] - 2, 'Q', 'it', 'start'); f.text(Mm[0] + 8, Mm[1] + 4, 'M', 'it', 'start')
f.text(cx + a, cy + 18, 'a', 'it', 'middle'); f.text(cx - 9, cy - b + 12, 'b', 'it', 'end')
f.text(cx, 260, 'M = (a cos t, b sin t) · Q = (a cos t, a sin t)', 'tm', 'middle')
f.text(cx, 278, 't ≠ θ : t est l\'angle de Q, pas celui de M', 'tr', 'middle')
FIG['ellipse'] = f.svg('ellipse', 'Ellipse paramétrée par t, avec le cercle de rayon a, le point Q, le point M et l\'angle polaire θ différent de t',
                       "Paramétrage de l'ellipse \\(c(t)=(a\\cos t,\\,b\\sin t)\\) : le paramètre \\(t\\) n'est <b>pas</b> l'angle polaire \\(\\theta\\) du point \\(M\\) (sauf sur les axes ou si \\(a=b\\)).")

# ------------------------------------------------------------ 10. base polaire locale
f = F(10, 360, 240)
ox, oy, r, thd = 52, 205, 150, 38
th = math.radians(thd)
f.line((ox - 10, oy), (ox + 205, oy), 'ax', 'm'); f.line((ox, oy + 10), (ox, oy - 195), 'ax', 'm')
f.text(ox + 208, oy + 5, 'x', 'it tm', 'start'); f.text(ox + 6, oy - 190, 'y', 'it tm', 'start')
Mq = (ox + r * math.cos(th), oy - r * math.sin(th))
f.path(arcpts(ox, oy, r, 6, 72, 50), 'thin dsh faint')
f.line((ox, oy), Mq, 'thin dsh', None)
f.line(Mq, (Mq[0], oy), 'thin dsh faint', None); f.line(Mq, (ox, Mq[1]), 'thin dsh faint', None)
f.text(Mq[0], oy + 16, 'x = r cos θ', 'tm', 'middle'); f.text(ox + 4, Mq[1] - 6, 'y = r sin θ', 'tm', 'start')
f.path(arcpts(ox, oy, 40, 0, thd, 16), 'thin')
f.text(ox + 48, oy - 12, 'θ', 'it', 'start')
f.text(ox + r * .5 * math.cos(th) + 4, oy - r * .5 * math.sin(th) - 12, 'r', 'it', 'end')
er = (math.cos(th), -math.sin(th)); et = (-math.sin(th), -math.cos(th))
f.line(Mq, (Mq[0] + 48 * er[0], Mq[1] + 48 * er[1]), 'vecb', 'b')
f.line(Mq, (Mq[0] + 48 * et[0], Mq[1] + 48 * et[1]), 'veca', 'a')
f.text(Mq[0] + 48 * er[0] + 5, Mq[1] + 48 * er[1] + 4, 'e{r}', 'it tb', 'start')
f.text(Mq[0] + 48 * et[0] - 4, Mq[1] + 48 * et[1] - 6, 'e{θ}', 'it ta', 'end')
f.dot(*Mq, 'pt', 4)
f.text(Mq[0] + 12, Mq[1] + 24, 'M', 'it', 'start')
f.text(250, 60, 'déplacement :', 'tm', 'start')
f.text(250, 80, 'dℓ = dr e{r}', 'ta', 'start'); f.text(250, 100, '+ r dθ e{θ}', 'ta', 'start')
f.text(250, 128, 'sur un cercle', 'tm', 'start'); f.text(250, 146, '(dr = 0) :', 'tm', 'start'); f.text(250, 166, 'dℓ = R dθ e{θ}', 'ta', 'start')
FIG['polaire'] = f.svg('polaire', 'Coordonnées polaires, repère local formé de e_r et e_θ au point M, déplacement élémentaire le long du cercle',
                       "Repère local : \\(\\vec e_r\\) radial, \\(\\vec e_\\theta\\) tangent au cercle. Un petit déplacement a pour composantes \\(dr\\) sur \\(\\vec e_r\\) et \\(r\\,d\\theta\\) sur \\(\\vec e_\\theta\\).")

# ------------------------------------------------------------ CSS
CSS_TXT = MARK + '''
.cl-fig{margin:16px auto;max-width:460px;background:var(--surface2);border:1px solid var(--line2);border-radius:10px;padding:10px;color:var(--ink)}
.cl-fig svg{display:block;width:100%;height:auto}
.cl-fig figcaption{font-family:var(--f-mono);font-size:12px;color:var(--muted);text-align:center;margin-top:8px;line-height:1.55}
.cl-fig figcaption b{color:var(--ink);font-weight:600}
.cl-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr));gap:12px;align-items:start;margin:16px 0}
.cl-grid .cl-fig{margin:0;max-width:none}
.cl-fig text{font-family:var(--f-body);font-size:14px;fill:var(--ink)}
.cl-fig .it{font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:15.5px}
.cl-fig .big{font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:20px}
.cl-fig .sb{font-size:10px}
.cl-fig .ta{fill:var(--accent)}
.cl-fig .tb{fill:var(--warn)}
.cl-fig .tm{fill:var(--muted);font-size:13px}
.cl-fig .tr{fill:var(--bad)}
.cl-fig .halo{paint-order:stroke;stroke:var(--surface2);stroke-width:4px;stroke-linejoin:round}
.cl-fig .ax{stroke:var(--muted);stroke-width:1.3;fill:none}
.cl-fig .thin{stroke:var(--ink);stroke-width:1.5;fill:none}
.cl-fig .thinb{stroke:var(--accent2);stroke-width:1.8;fill:none}
.cl-fig .faint{opacity:.5}
.cl-fig .dsh{stroke-dasharray:5 4}
.cl-fig .cv{stroke:var(--accent);stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round}
.cl-fig .cv2{stroke:var(--accent2);stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round}
.cl-fig .cvthick{stroke:var(--accent);stroke-width:5;fill:none;stroke-linecap:round}
.cl-fig .veca{stroke:var(--accent);stroke-width:2.4;fill:none}
.cl-fig .vecb{stroke:var(--accent2);stroke-width:2.4;fill:none}
.cl-fig .bad2{stroke:var(--bad);stroke-width:2.2;fill:none}
.cl-fig .dom{fill:var(--accent-soft);stroke:none}
.cl-fig .pt{fill:var(--ink)}
.cl-fig .ptb{fill:var(--accent)}
.cl-fig .ptc{fill:var(--accent2)}
.cl-fig .mk-a{fill:var(--accent)}
.cl-fig .mk-b{fill:var(--accent2)}
.cl-fig .mk-i{fill:var(--ink)}
.cl-fig .mk-r{fill:var(--bad)}
.cl-fig .mk-m{fill:var(--muted)}
#controle + p + .tbl-wrap td:first-child{white-space:nowrap}
'''

css = open(CSS, encoding='utf-8').read()
if MARK in css:
    css = css[:css.index(MARK)].rstrip('\n') + '\n'
css += '\n' + CSS_TXT
ecrire(CSS, css)

# ------------------------------------------------------------ insertion dans la page
SLOTS = {
    'chemin': ['chemin'],
    'orient': ['orient', 'param'],
    'green': ['green'],
    'etoile': ['etoile'],
    'potentiel': ['potentiel'],
    'polaire': ['polaire'],
    'ellipse': ['ellipse'],
    'carre': ['carre'],
    'lentille': ['lentille'],
}
page = open(PAGE, encoding='utf-8').read()
n = 0
for slot, names in SLOTS.items():
    tag = '<!-- cl-slot:%s -->' % slot
    if tag not in page:
        print('ANCRE MANQUANTE :', slot); continue
    body = ''.join(FIG[x] for x in names)
    if len(names) > 1:
        body = '<div class="cl-grid">' + body + '</div>'
    block = tag + '<!-- cl-begin:%s -->%s<!-- cl-end:%s -->' % (slot, body, slot)
    page = re.sub(re.escape(tag) + r'(<!-- cl-begin:%s -->.*?<!-- cl-end:%s -->)?' % (slot, slot), lambda m: block, page, count=1, flags=re.S)
    n += len(names)
ecrire(PAGE, page)
print('ok', n, 'figures insérées')
