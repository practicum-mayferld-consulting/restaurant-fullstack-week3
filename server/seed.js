// seed.js — run once with: node seed.js
// Populates the menu_items table from the original hardcoded data
import 'dotenv/config'
import { pool } from './db.js'

const menuItems = [
  // ── STARTERS ──────────────────────────────────────────────────────────
  {
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
    category: 'starters',
    name: 'Hamachi Crudo',
    price: 28,
    description:
      'Japanese yellowtail, finger lime caviar, cold-pressed olive oil, shiso oil infusion, citrus ponzu jelly.',
    tags: ['Dairy-Free', 'Gluten-Free'],
    pairing: "Albariño do Ferreiro 'Cepas Vellas' 2020",
    signature: false,
  },

  // ── MAINS ──────────────────────────────────────────────────────────────
  {
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
    category: 'mains',
    name: 'Wood-Fired Morel Risotto',
    price: 38,
    description:
      'Acquerello aged carnaroli, spring morel mushrooms, roasted pine nuts, fermented black garlic butter, shaved pecorino.',
    tags: ['Vegetarian', 'Vegan on Request'],
    pairing: 'Barolo Monvigliero, Comm. G.B. Burlotto 2018',
    signature: false,
  },

  // ── DESSERTS ───────────────────────────────────────────────────────────
  {
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

async function seed() {
  const client = await pool.connect()
  try {
    console.log('🌱 Starting seed...')

    // Create tables if they don't exist yet
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(100) NOT NULL,
        email      VARCHAR(255) UNIQUE NOT NULL,
        password   VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id          SERIAL PRIMARY KEY,
        category    VARCHAR(50)  NOT NULL CHECK (category IN ('starters', 'mains', 'desserts')),
        name        VARCHAR(200) NOT NULL,
        price       NUMERIC(6,2) NOT NULL,
        description TEXT         NOT NULL,
        tags        TEXT[]       DEFAULT '{}',
        pairing     VARCHAR(300),
        signature   BOOLEAN      DEFAULT FALSE,
        created_at  TIMESTAMPTZ  DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER REFERENCES users(id) ON DELETE SET NULL,
        name       VARCHAR(100) NOT NULL,
        email      VARCHAR(255) NOT NULL,
        phone      VARCHAR(30)  NOT NULL,
        guests     INTEGER      NOT NULL CHECK (guests BETWEEN 1 AND 12),
        date       DATE         NOT NULL,
        time_slot  VARCHAR(20),
        seating    VARCHAR(100),
        notes      TEXT,
        created_at TIMESTAMPTZ  DEFAULT NOW()
      )
    `)

    // Clear existing menu data before re-seeding
    await client.query('DELETE FROM menu_items')
    console.log('  Cleared existing menu items.')

    // Insert all items
    for (const item of menuItems) {
      await client.query(
        `INSERT INTO menu_items (category, name, price, description, tags, pairing, signature)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [item.category, item.name, item.price, item.description, item.tags, item.pairing, item.signature]
      )
      console.log(`  ✓ Inserted: ${item.name}`)
    }

    console.log(`\n✅ Seed complete — ${menuItems.length} menu items inserted.`)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

seed()
