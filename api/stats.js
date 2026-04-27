import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const foodPromise = db.query('SELECT SUM(kcal) as total_kcal FROM food_logs WHERE created_at >= CURRENT_DATE');
    const exercisePromise = db.query('SELECT SUM(calories) as total_burned FROM exercise_logs WHERE created_at >= CURRENT_DATE');
    const sleepPromise = db.query('SELECT hours FROM sleep_logs WHERE created_at >= CURRENT_DATE ORDER BY created_at DESC LIMIT 1');

    const [foodRes, exerciseRes, sleepRes] = await Promise.all([foodPromise, exercisePromise, sleepPromise]);

    return response.status(200).json({
      calories_consumed: foodRes.rows[0].total_kcal || 0,
      calories_burned: exerciseRes.rows[0].total_burned || 0,
      sleep_hours: sleepRes.rows[0]?.hours || 0,
      steps: 0 // Placeholder for steps as we don't have a table for it yet
    });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
