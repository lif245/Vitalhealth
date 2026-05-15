import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('Missing ANTHROPIC_API_KEY');
    return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
  }

  const anthropic = new Anthropic({ apiKey });
  const { message, healthData } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const systemPrompt = `You are a friendly, encouraging Thai AI Health Coach for the 'VitalHealth' app.
    
    Here is the user's current health data for today:
    - Calories Burned: ${healthData?.caloriesBurned || 0} kcal
    - Calories Intake: ${healthData?.caloriesIntake || 0} kcal
    - Steps: ${healthData?.steps || 0} steps
    - Sleep: ${healthData?.sleepHours || 0} hours
    
    Guidelines:
    1. Reply in Thai language ONLY.
    2. Be concise, friendly, and use emojis occasionally.
    3. If they ask for food or exercise recommendations, tailor them to their current stats.
    4. Keep answers short (2-4 sentences) suitable for a small chat widget.`;

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 400,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: message,
        }
      ],
    });

    const reply = msg.content[0]?.text?.trim();
    if (!reply) throw new Error('Empty response from Claude');

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Claude Chat error:', error.message);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
