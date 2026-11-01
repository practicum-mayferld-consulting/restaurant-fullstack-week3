// api/reservations.js → POST /api/reservations
const pool = require('./_db')
const { verifyToken, getTokenFromCookie } = require('./_auth')

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, phone, guests, date, time_slot, seating, notes } = req.body

  if (!name || !email || !phone || !guests || !date)
    return res.status(400).json({ error: 'Name, email, phone, guests and date are required.' })

  const guestsNum = parseInt(guests, 10)
  if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 12)
    return res.status(400).json({ error: 'Guests must be between 1 and 12.' })

  // Attach user_id if logged in
  const token = getTokenFromCookie(req)
  const payload = verifyToken(token)
  const userId = payload ? payload.userId : null

  try {
    const result = await pool.query(
      `INSERT INTO reservations (user_id, name, email, phone, guests, date, time_slot, seating, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, name, email, date, time_slot, guests`,
      [userId, name, email, phone, guestsNum, date, time_slot || null, seating || null, notes || null]
    )
    return res.status(201).json({ message: 'Reservation confirmed!', reservation: result.rows[0] })
  } catch (err) {
    console.error('Reservation error:', err)
    return res.status(500).json({ error: 'Could not save reservation.' })
  }
}
