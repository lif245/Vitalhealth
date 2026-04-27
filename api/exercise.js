import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    const client = await db.connect();
    await client.sql`
      CREATE TABLE IF NOT EXISTS exercise_logs (
        id SERIAL PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        duration INTEGER NOT NULL,
        calories INTEGER,
        date DATE DEFAULT CURRENT_DATE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error('Database setup error:', error);
  }

  if (request.method === 'GET') {
    try {
      const { rows } = await db.query('SELECT * FROM exercise_logs ORDER BY created_at DESC');
      return response.status(200).json(rows);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  if (request.method === 'POST') {
    const { type, duration, calories } = request.body;
    if (!type || !duration) {
      return response.status(400).json({ error: 'Type and duration are required' });
    }
    try {
      const result = await db.query(
        'INSERT INTO exercise_logs (type, duration, calories) VALUES ($1, $2, $3) RETURNING *',
        [type, duration, calories]
      );
      return response.status(201).json(result.rows[0]);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  return response.status(405).json({ error: 'Method not allowed' });
}
