// api/auth/logout.js → POST /api/auth/logout
const { clearAuthCookie } = require('../_auth')

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  clearAuthCookie(res)
  return res.status(200).json({ message: 'Logged out successfully.' })
}
