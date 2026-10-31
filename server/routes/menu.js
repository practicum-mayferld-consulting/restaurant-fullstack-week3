// routes/menu.js — public menu API, reads from Postgres
import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

// ── GET /api/menu ─────────────────────────────────────────────────────────────
// Returns all menu items, optionally filtered by ?category=starters|mains|desserts
router.get('/', async (req, res) => {
  const { category } = req.query

  try {
    let sql = 'SELECT * FROM menu_items ORDER BY id ASC'
    let params = []

    if (category && category !== 'all') {
      sql = 'SELECT * FROM menu_items WHERE category = $1 ORDER BY id ASC'
      params = [category]
    }

    const result = await query(sql, params)
    res.json(result.rows)
  } catch (err) {
    console.error('Menu fetch error:', err)
    res.status(500).json({ error: 'Could not fetch menu items.' })
  }
})

// ── GET /api/menu/:id ─────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const result = await query('SELECT * FROM menu_items WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Menu item not found.' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error('Menu item fetch error:', err)
    res.status(500).json({ error: 'Could not fetch menu item.' })
  }
})

export default router
