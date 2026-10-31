// routes/reservations.js — create and (if logged in) list reservations
import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

// ── POST /api/reservations ────────────────────────────────────────────────────
// Any visitor can submit a reservation (auth optional — user_id attached if logged in)
router.post('/', async (req, res) => {
  const { name, email, phone, guests, date, time_slot, seating, notes } = req.body

  // Basic validation
  if (!name || !email || !phone || !guests || !date) {
    return res.status(400).json({ error: 'Name, email, phone, guests, and date are required.' })
  }

  const guestsNum = parseInt(guests, 10)
  if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 12) {
    return res.status(400).json({ error: 'Guests must be between 1 and 12.' })
  }

  // Attach user_id if the request comes from a logged-in user
  const userId = req.session.userId || null

  try {
    const result = await query(
      `INSERT INTO reservations (user_id, name, email, phone, guests, date, time_slot, seating, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, name, email, date, time_slot, guests`,
      [userId, name, email, phone, guestsNum, date, time_slot || null, seating || null, notes || null]
    )

    res.status(201).json({
      message: 'Reservation confirmed!',
      reservation: result.rows[0],
    })
  } catch (err) {
    console.error('Reservation error:', err)
    res.status(500).json({ error: 'Could not save reservation.' })
  }
})

// ── GET /api/reservations/mine ────────────────────────────────────────────────
// Returns reservations for the currently logged-in user
router.get('/mine', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'You must be logged in to view your reservations.' })
  }

  try {
    const result = await query(
      `SELECT id, name, email, phone, guests, date, time_slot, seating, notes, created_at
       FROM reservations
       WHERE user_id = $1
       ORDER BY date DESC`,
      [req.session.userId]
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Reservations fetch error:', err)
    res.status(500).json({ error: 'Could not fetch reservations.' })
  }
})

export default router
