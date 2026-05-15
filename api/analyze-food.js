import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { base64Image, mimeType } = req.body;

  if (!base64Image) {
    return res.status(400).json({ error: 'Image is required' });
  }

  // Remove the data:image/...;base64, prefix if it exists
  const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 300,
      temperature: 0.2,
      system: "You are an expert nutritionist. Analyze the provided image of food. Respond strictly with a JSON object containing two keys: 'name' (string, the name of the food in Thai) and 'kcal' (number, the estimated calories). Do not include any other text or markdown formatting. Example: {\"name\": \"ข้าวมันไก่\", \"kcal\": 600}",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mimeType || "image/jpeg",
                data: cleanBase64,
              },
            },
            {
              type: "text",
              text: "วิเคราะห์ภาพอาหารนี้และบอกชื่ออาหารภาษาไทยและแคลอรีโดยประมาณ (ตอบเป็น JSON เท่านั้น)"
            }
          ],
        }
      ],
    });

    const textContent = msg.content[0].text.trim();
    
    // In case Claude wraps the JSON in markdown code blocks
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
       throw new Error('Could not find JSON in response');
    }
    
    const result = JSON.parse(jsonMatch[0]);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Claude API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
