// api/_db.js — shared Postgres pool
// underscore prefix = Vercel ne l'expose PAS comme route publique
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 3,
})

module.exports = pool
