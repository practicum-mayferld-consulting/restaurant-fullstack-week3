// api/auth/login.js → POST /api/auth/login
const bcrypt = require('bcryptjs')
const pool = require('../_db')
const { signToken, setAuthCookie } = require('../_auth')

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required.' })

  try {
    const result = await pool.query(
      'SELECT id, name, email, password FROM users WHERE email = $1',
      [email]
    )
    const user = result.rows[0]
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ error: 'Invalid email or password.' })

    const token = signToken({ userId: user.id, name: user.name })
    setAuthCookie(res, token)

    return res.status(200).json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ error: 'Server error during login.' })
  }
}
