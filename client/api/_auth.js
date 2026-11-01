// api/_auth.js — JWT helpers shared by all auth functions
// Sign a token manually without jsonwebtoken (pure Node.js crypto)
const crypto = require('crypto')

const SECRET = process.env.SESSION_SECRET || 'savoria_dev_secret'

function base64url(str) {
  return Buffer.from(str).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

// Create a simple signed token: base64(header).base64(payload).signature
function signToken(payload) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = base64url(JSON.stringify({ ...payload, iat: Date.now() }))
  const sig = crypto
    .createHmac('sha256', SECRET)
    .update(`${header}.${body}`)
    .digest('base64url')
  return `${header}.${body}.${sig}`
}

// Verify and decode — returns payload or null
function verifyToken(token) {
  if (!token) return null
  try {
    const [header, body, sig] = token.split('.')
    const expected = crypto
      .createHmac('sha256', SECRET)
      .update(`${header}.${body}`)
      .digest('base64url')
    if (sig !== expected) return null
    return JSON.parse(Buffer.from(body, 'base64').toString())
  } catch {
    return null
  }
}

// Read token from cookie header
function getTokenFromCookie(req) {
  const raw = req.headers.cookie || ''
  const match = raw.match(/(?:^|;\s*)savoria_token=([^;]+)/)
  return match ? match[1] : null
}

// Set auth cookie on response
function setAuthCookie(res, token) {
  res.setHeader('Set-Cookie',
    `savoria_token=${token}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=604800`
  )
}

// Clear auth cookie
function clearAuthCookie(res) {
  res.setHeader('Set-Cookie',
    `savoria_token=; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=0`
  )
}

module.exports = { signToken, verifyToken, getTokenFromCookie, setAuthCookie, clearAuthCookie }
