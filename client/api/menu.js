// api/menu.js → GET /api/menu?category=starters|mains|desserts
const pool = require('./_db')

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { category } = req.query

  try {
    let sql = 'SELECT * FROM menu_items ORDER BY id ASC'
    let params = []

    if (category && category !== 'all') {
      sql = 'SELECT * FROM menu_items WHERE category = $1 ORDER BY id ASC'
      params = [category]
    }

    const result = await pool.query(sql, params)
    return res.status(200).json(result.rows)
  } catch (err) {
    console.error('Menu error:', err)
    return res.status(500).json({ error: 'Could not fetch menu items.' })
  }
}
