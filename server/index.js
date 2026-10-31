import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import { pool } from './db.js'
import authRouter from './routes/auth.js'
import menuRouter from './routes/menu.js'
import reservationsRouter from './routes/reservations.js'

const app = express()
const PORT = process.env.PORT || 3001
const PgSession = connectPgSimple(session)

// ── Middleware ────────────────────────────────────────────────────────────────

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true, // allow cookies/sessions cross-origin
}))

app.use(express.json())

// Session stored in Postgres so it survives server restarts
app.use(session({
  store: new PgSession({
    pool,
    tableName: 'user_sessions',
    createTableIfMissing: true, // auto-creates the sessions table
  }),
  secret: process.env.SESSION_SECRET || 'dev_secret_change_me',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
}))

// ── Routes ────────────────────────────────────────────────────────────────────

app.use('/api/auth', authRouter)
app.use('/api/menu', menuRouter)
app.use('/api/reservations', reservationsRouter)

// Health check — useful for Railway to verify the server is alive
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Savoria server running on http://localhost:${PORT}`)
})
