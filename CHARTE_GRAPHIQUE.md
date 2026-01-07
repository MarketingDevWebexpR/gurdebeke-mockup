# Charte Graphique - Gurdebeke Recyclage

> Document de référence pour la refonte du site gurdebeke.com

---

## 1. Identité Visuelle

### Logo
- **Fichier**: `assets/logo/logo-gurdebeke.png`
- **Format**: PNG avec transparence
- **Couleurs du logo**:
  - Texte "GURDEBEKE" en gris foncé `#1D1D1B`
  - "RECYCLAGE" en vert `#70B62C`
  - Trait décoratif: dégradé Jaune `#F3E600` → Orange `#FFCC03` → Rouge `#E73C1F` → Vert `#5E9923`

---

## 2. Palette de Couleurs

### Couleurs Principales

| Nom | HEX | RGB | Usage |
|-----|-----|-----|-------|
| **Vert Principal** | `#70B62C` | rgb(112, 182, 44) | Couleur principale, CTA, liens actifs |
| **Vert Foncé** | `#5CBA3C` | rgb(92, 186, 60) | Hover, accents |
| **Vert Secondaire** | `#5E9923` | rgb(94, 153, 35) | Dégradés, éléments secondaires |
| **Jaune/Or** | `#FFB901` | rgb(255, 185, 1) | Accent, dates, highlights |
| **Jaune Vif** | `#F3E600` | rgb(243, 230, 0) | Dégradé logo, bloc services |
| **Orange** | `#FFCC03` | rgb(255, 204, 3) | Dégradé logo, bloc services |
| **Rouge** | `#E73C1F` | rgb(231, 60, 31) | Dégradé logo, bloc services |

### Couleurs Neutres

| Nom | HEX | RGB | Usage |
|-----|-----|-----|-------|
| **Noir Texte** | `#1D1D1B` | rgb(29, 29, 27) | Titres, texte principal |
| **Gris Foncé** | `#333333` | rgb(51, 51, 51) | Texte secondaire |
| **Gris Moyen** | `#444444` | rgb(68, 68, 68) | Corps de texte |
| **Gris Clair** | `#777777` | rgb(119, 119, 119) | Texte tertiaire |
| **Gris Très Clair** | `#9D9D9C` | rgb(157, 157, 156) | Placeholders |
| **Blanc** | `#FFFFFF` | rgb(255, 255, 255) | Fond, texte sur couleur |
| **Gris Fond** | `#F8F8F8` | rgb(248, 248, 248) | Arrière-plans sections |
| **Gris Fond Alt** | `#EFEFEF` | rgb(239, 239, 239) | Arrière-plans alternatifs |

### Blocs Services (Homepage)

| Service | Couleur | HEX |
|---------|---------|-----|
| Vente & Location | Jaune | `#F3E600` |
| Collecte & Transport | Orange | `#FFCC03` |
| Recyclage & Traitement | Rouge | `#E73C1F` |
| Déconditionnement | Vert | `#5E9923` |

---

## 3. Typographies

### Familles de Polices

#### Titres Principaux (Hero)
- **Police**: `Capture It` (serif)
- **Style**: Impact, italique
- **Usage**: Slides hero, titres sections majeurs

#### Titres Sections
- **Police**: `DIN Pro Bold`
- **Fallback**: `DIN Pro`
- **Style**: Majuscules, bold
- **Usage**: Titres de sections, sous-titres

#### Corps de Texte
- **Police**: `Work Sans`
- **Fallback**: `sans-serif`
- **Poids**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Usage**: Paragraphes, descriptions

#### Navigation & UI
- **Police**: `Poppins`
- **Fallback**: `sans-serif`
- **Usage**: Menu navigation, boutons

#### Accents
- **Police**: `Oswald`
- **Fallback**: `sans-serif`
- **Usage**: Éléments d'accent, tags

### Hiérarchie Typographique

| Élément | Police | Taille | Poids | Couleur |
|---------|--------|--------|-------|---------|
| H1 Hero | Capture It | ~80px | - | Blanc |
| H2 Section | DIN Pro Bold | 36-48px | Bold | #1D1D1B |
| H3 Sous-titre | Work Sans | 24-28px | 600 | #333333 |
| Body | Work Sans | 16px | 400 | #444444 |
| Small | Work Sans | 14px | 400 | #777777 |
| Button | Poppins | 14-16px | 500 | Blanc |
| Nav | Poppins | 14px | 500 | #1D1D1B |

---

## 4. Composants UI

### Boutons

#### Bouton Principal (CTA)
```css
background-color: #70B62C;
color: #FFFFFF;
padding: 15px 40px;
font-family: 'Poppins', sans-serif;
font-weight: 500;
text-transform: uppercase;
letter-spacing: 1px;
border: none;
transition: background-color 0.3s;
```
**Hover**: `background-color: #5CBA3C;`

#### Bouton Secondaire
```css
background-color: transparent;
color: #70B62C;
border: 2px solid #70B62C;
```

### Cards (Types de Déchets)
```css
background: #FFFFFF;
padding: 30px;
text-align: center;
box-shadow: 0 2px 10px rgba(0,0,0,0.1);
transition: transform 0.3s, box-shadow 0.3s;
```
**Hover**:
- `transform: translateY(-5px);`
- `box-shadow: 0 5px 20px rgba(0,0,0,0.15);`

### Liens
- **Couleur**: `#70B62C`
- **Hover**: underline
- **Navigation active**: `#70B62C` avec bordure bottom

---

## 5. Structure de la Page

### Header
- **Hauteur top bar**: ~40px (fond blanc)
- **Hauteur nav principale**: ~80px
- **Position**: Fixed on scroll
- **Logo**: Aligné à gauche

### Hero Slider
- **Hauteur**: 100vh ou ~700px
- **Overlay**: `rgba(0, 0, 0, 0.4)` sur images
- **Animation**: Slide horizontal

### Sections
- **Padding vertical**: 80-100px
- **Container max-width**: ~1200px
- **Espacement entre sections**: 0 (bord à bord pour certaines)

### Footer
- **Fond**: Blanc avec bordure top grise
- **Colonnes**: 4 (Logo/Contact, À Propos, Types de Déchets, Autres)
- **Copyright**: Fond gris clair

---

## 6. Iconographie

### Icônes Services (Homepage)
- **Style**: Outline/line icons blancs
- **Taille**: ~80px
- **Fichiers**: `assets/icons/`
  - `vente-location.png`
  - `collecte-transport.png`
  - `recyclage-traitement.png`
  - `deconditionnement.png`

### Icônes Types de Déchets
- **Style**: Outline vert `#70B62C`
- **Taille**: ~60-80px
- **Fichiers**: `assets/icons/dechets/`
  - `dechets-verts.png`
  - `bois.png`
  - `biodechets.png`
  - `dib.png` (Déchets Industriels Banals)
  - `encombrants.png`
  - `plastiques.png`
  - `papiers-cartons.png`
  - `metaux.png`
  - `pneumatiques.png`
  - `dechets-dangereux.png`
  - `terre-gravats.png`
  - `boues.png`
  - `deee.png`
  - `amiante-ciment.png`
  - `omr.png` (Ordures Ménagères)
  - `verres.png`
  - `construction-demolition.png`
  - `textile.png`

### Icônes Réseaux Sociaux
- **Facebook**: `assets/icons/facebook.png`
- **LinkedIn**: `assets/icons/linkedin.png`

---

## 7. Images & Médias

### Slides Hero
- **Format**: JPG haute qualité
- **Dimensions**: 1920x1080 minimum
- **Fichiers**: `assets/slides/`
  - `slide-verre.jpg` - Bouteilles en verre recyclage
  - `slide-saint-just.jpg` - Centre Saint-Just
  - `slide-fretoy.jpg` - Site de Fretoy
  - `slide-biodechets.jpg` - Biodéchets

### Images Sections
- **Fichiers**: `assets/images/`
  - `qui-sommes-nous.png` - Section présentation
  - `deconditionnement-section.png` - Section déconditionnement
  - `certification-iso-14001.webp` - Badge certification

### Backgrounds
- Section Types de Déchets: Image floue de bouteilles plastique avec overlay
- Pattern décoratif: Losanges verts pour les accents

---

## 8. Responsive Breakpoints

| Breakpoint | Largeur | Usage |
|------------|---------|-------|
| Desktop Large | > 1200px | Layout complet |
| Desktop | 992px - 1200px | Ajustements mineurs |
| Tablet | 768px - 991px | Navigation hamburger |
| Mobile Large | 576px - 767px | Stack colonnes |
| Mobile | < 576px | Mobile first |

---

## 9. Animations & Transitions

### Transitions Standard
```css
transition: all 0.3s ease;
```

### Hover Cards
```css
transform: translateY(-5px);
box-shadow: 0 10px 30px rgba(0,0,0,0.1);
```

### Slider Hero
- **Type**: Slide horizontal
- **Durée**: 500ms
- **Auto-play**: 5-6 secondes

---

## 10. Structure des Assets

```
assets/
├── logo/
│   └── logo-gurdebeke.png
├── icons/
│   ├── facebook.png
│   ├── linkedin.png
│   ├── vente-location.png
│   ├── collecte-transport.png
│   ├── recyclage-traitement.png
│   ├── deconditionnement.png
│   └── dechets/
│       ├── dechets-verts.png
│       ├── bois.png
│       ├── biodechets.png
│       ├── dib.png
│       ├── encombrants.png
│       ├── plastiques.png
│       ├── papiers-cartons.png
│       ├── metaux.png
│       ├── pneumatiques.png
│       ├── dechets-dangereux.png
│       ├── terre-gravats.png
│       ├── boues.png
│       ├── deee.png
│       ├── amiante-ciment.png
│       ├── omr.png
│       ├── verres.png
│       ├── construction-demolition.png
│       └── textile.png
├── images/
│   ├── qui-sommes-nous.png
│   ├── deconditionnement-section.png
│   ├── certification-iso-14001.webp
│   ├── arrow-circle.png
│   ├── bg-types-dechets.png
│   └── bg-pattern.png
├── slides/
│   ├── slide-verre.jpg
│   ├── slide-saint-just.jpg
│   ├── slide-fretoy.jpg
│   └── slide-biodechets.jpg
└── screenshots/
    ├── gurdebeke-homepage-hero.png
    ├── gurdebeke-qui-sommes-nous.png
    ├── gurdebeke-actualites.png
    └── gurdebeke-footer.png
```

---

## 11. Informations de Contact

- **Téléphone**: 03 44 93 25 25
- **Email**: accueil@gurdebeke.com
- **Siège**: Noyon, France
- **Sites**: 10 sites
- **Effectif**: 170 salariés
- **Création**: 1972

---

## 12. Certifications

- **ISO 14001** - Management environnemental (SGS)

---

*Document généré le 7 janvier 2026 pour le projet de refonte Gurdebeke*
