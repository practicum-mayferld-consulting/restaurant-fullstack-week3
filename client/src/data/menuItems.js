// Central data file — all menu items as an array of objects
// Used by the Menu component with useState filter
const menuItems = [
  // ── STARTERS ──────────────────────────────────
  {
    id: 1,
    category: 'starters',
    name: 'Truffle Arancini',
    price: 24,
    description:
      'Crispy Carnaroli rice, wild black winter truffle, aged 24-month Parmigiano-Reggiano, smoked garlic emulsion.',
    tags: ['Vegetarian', 'GF Available'],
    pairing: 'Franciacorta Brut Rosé, Bellavista 2018',
    signature: false,
  },
  {
    id: 2,
    category: 'starters',
    name: 'Roasted Beet Carpaccio',
    price: 22,
    description:
      'Heirloom golden & ruby beets, whipped goat curd, toasted pistachio dukkah, 12-year aged balsamico pearls.',
    tags: ['Vegetarian', 'Gluten-Free'],
    pairing: 'Sancerre Blanc, Domaine Vacheron 2021',
    signature: false,
  },
  {
    id: 3,
    category: 'starters',
    name: 'Hamachi Crudo',
    price: 28,
    description:
      'Japanese yellowtail, finger lime caviar, cold-pressed olive oil, shiso oil infusion, citrus ponzu jelly.',
    tags: ['Dairy-Free', 'Gluten-Free'],
    pairing: "Albariño do Ferreiro 'Cepas Vellas' 2020",
    signature: false,
  },

  // ── MAINS ──────────────────────────────────────
  {
    id: 4,
    category: 'mains',
    name: 'Herb-Crusted Ribeye',
    price: 58,
    description:
      '45-day dry-aged prime beef, charred shallot puree, bone marrow jus, wild foraged chanterelles, baby glazed carrots.',
    tags: ['Gluten-Free'],
    pairing: 'Châteauneuf-du-Pape, Clos des Papes 2017',
    signature: true,
  },
  {
    id: 5,
    category: 'mains',
    name: 'Pan-Seared Pacific Salmon',
    price: 46,
    description:
      'Crispy skin king salmon, saffron fennel velouté, braised tender baby leeks, cured trout roe, preserved Meyer lemon.',
    tags: ['Pescatarian', 'Gluten-Free'],
    pairing: 'Meursault 1er Cru, Genevrières 2019',
    signature: false,
  },
  {
    id: 6,
    category: 'mains',
    name: 'Wood-Fired Morel Risotto',
    price: 38,
    description:
      'Acquerello aged carnaroli, spring morel mushrooms, roasted pine nuts, fermented black garlic butter, shaved pecorino.',
    tags: ['Vegetarian', 'Vegan on Request'],
    pairing: 'Barolo Monvigliero, Comm. G.B. Burlotto 2018',
    signature: false,
  },

  // ── DESSERTS ───────────────────────────────────
  {
    id: 7,
    category: 'desserts',
    name: 'Valrhona Dark Ganache Tart',
    price: 18,
    description:
      '70% Guanaja chocolate ganache, smoked Maldon fleur de sel caramel, toasted hazelnut praline crust, gold leaf.',
    tags: ['Vegetarian'],
    pairing: 'Quinta do Noval 20-Year Tawny Port',
    signature: false,
  },
  {
    id: 8,
    category: 'desserts',
    name: 'Artisanal White Truffle Gelato',
    price: 16,
    description:
      'Churned fior di latte gelato, Piedmontese acacia white honey, crunchy wild honeycomb shard, micro-basil.',
    tags: ['Vegetarian', 'Gluten-Free'],
    pairing: "Château d'Yquem Sauternes 2011",
    signature: false,
  },
  {
    id: 9,
    category: 'desserts',
    name: 'Poached Bergamot Pear',
    price: 17,
    description:
      'Spiced Chianti Classico reduction, Tahitian vanilla bean mascarpone mousse, crisp crushed almond tuile.',
    tags: ['Gluten-Free'],
    pairing: 'Vin Santo del Chianti Rufina, Selvapiana',
    signature: false,
  },
]

export default menuItems
