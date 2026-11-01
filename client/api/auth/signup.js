// api/auth/signup.js → POST /api/auth/signup
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

  const { name, email, password } = req.body

  if (!name || !email || !password)
    return res.status(400).json({ error: 'Name, email and password are required.' })
  if (password.length < 6)
    return res.status(400).json({ error: 'Password must be at least 6 characters.' })

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.rows.length > 0)
      return res.status(409).json({ error: 'An account with this email already exists.' })

    const hash = await bcrypt.hash(password, 12)
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hash]
    )
    const user = result.rows[0]

    // Sign a JWT and set it as httpOnly cookie
    const token = signToken({ userId: user.id, name: user.name })
    setAuthCookie(res, token)

    return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error('Signup error:', err)
    return res.status(500).json({ error: 'Server error during signup.' })
  }
}
