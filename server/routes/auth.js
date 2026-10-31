// routes/auth.js — signup, login, logout, and /me (session check)
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { query } from '../db.js'

const router = Router()

// ── POST /api/auth/signup ─────────────────────────────────────────────────────
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' })
  }

  try {
    // Check if email already in use
    const existing = await query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists.' })
    }

    // Hash the password — never store plaintext
    const hash = await bcrypt.hash(password, 12)

    const result = await query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hash]
    )
    const user = result.rows[0]

    // Start session immediately after signup
    req.session.userId = user.id
    req.session.userName = user.name

    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Server error during signup.' })
  }
})

// ── POST /api/auth/login ──────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  try {
    const result = await query(
      'SELECT id, name, email, password FROM users WHERE email = $1',
      [email]
    )

    const user = result.rows[0]
    if (!user) {
      // Generic message — don't reveal whether the email exists
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    // Regenerate session ID to prevent session fixation
    req.session.regenerate((err) => {
      if (err) {
        console.error('Session regenerate error:', err)
        return res.status(500).json({ error: 'Server error during login.' })
      }
      req.session.userId = user.id
      req.session.userName = user.name
      res.json({ user: { id: user.id, name: user.name, email: user.email } })
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Server error during login.' })
  }
})

// ── POST /api/auth/logout ─────────────────────────────────────────────────────
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out.' })
    }
    res.clearCookie('connect.sid')
    res.json({ message: 'Logged out successfully.' })
  })
})

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
// Frontend calls this on load to restore the session (survives page refresh)
router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ user: null })
  }

  try {
    const result = await query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [req.session.userId]
    )
    const user = result.rows[0]
    if (!user) {
      return res.status(401).json({ user: null })
    }
    res.json({ user })
  } catch (err) {
    console.error('Session check error:', err)
    res.status(500).json({ error: 'Server error.' })
  }
})

export default router
