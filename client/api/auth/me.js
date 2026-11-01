// api/auth/me.js → GET /api/auth/me
// Called on every page load to restore session from JWT cookie
const pool = require('../_db')
const { verifyToken, getTokenFromCookie } = require('../_auth')

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const token = getTokenFromCookie(req)
  const payload = verifyToken(token)

  if (!payload) return res.status(401).json({ user: null })

  try {
    const result = await pool.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [payload.userId]
    )
    const user = result.rows[0]
    if (!user) return res.status(401).json({ user: null })
    return res.status(200).json({ user })
  } catch (err) {
    console.error('Session check error:', err)
    return res.status(500).json({ error: 'Server error.' })
  }
}
