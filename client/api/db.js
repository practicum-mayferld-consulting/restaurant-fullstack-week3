// api/db.js — shared Postgres pool for all serverless functions
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1, // keep connections low for serverless
})

export const query = (text, params) => pool.query(text, params)
export default pool
