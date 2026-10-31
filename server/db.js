import pg from 'pg'

const { Pool } = pg

// Pool reuses connections — much more efficient than creating one per query
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false } // required for Neon/Railway hosted Postgres
    : false,
})

// Simple query helper — pool.query(sql, params) returns rows
export const query = (text, params) => pool.query(text, params)
