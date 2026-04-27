import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    const client = await db.connect();
    await client.sql`
      CREATE TABLE IF NOT EXISTS sleep_logs (
        id SERIAL PRIMARY KEY,
        hours FLOAT NOT NULL,
        quality VARCHAR(50),
        date DATE DEFAULT CURRENT_DATE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error('Database setup error:', error);
  }

  if (request.method === 'GET') {
    try {
      const { rows } = await db.query('SELECT * FROM sleep_logs ORDER BY created_at DESC');
      return response.status(200).json(rows);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  if (request.method === 'POST') {
    const { hours, quality } = request.body;
    if (hours === undefined) {
      return response.status(400).json({ error: 'Hours are required' });
    }
    try {
      const result = await db.query(
        'INSERT INTO sleep_logs (hours, quality) VALUES ($1, $2) RETURNING *',
        [hours, quality]
      );
      return response.status(201).json(result.rows[0]);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  return response.status(405).json({ error: 'Method not allowed' });
}
