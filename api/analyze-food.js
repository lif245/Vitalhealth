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
  const { base64Image, mimeType } = req.body;

  if (!base64Image) {
    return res.status(400).json({ error: 'Image is required' });
  }

  // Improved base64 cleaning: remove everything before the comma
  const cleanBase64 = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;

  try {
    console.log('Sending request to Claude Vision API...');
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 400,
      temperature: 0,
      system: "You are an expert nutritionist. Analyze the provided image of food. Respond strictly with a JSON object containing two keys: 'name' (string, the name of the food in Thai) and 'kcal' (number, the estimated calories). Example: {\"name\": \"ข้าวมันไก่\", \"kcal\": 600}",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mimeType && mimeType.startsWith('image/') ? mimeType : "image/jpeg",
                data: cleanBase64,
              },
            },
            {
              type: "text",
              text: "Identify this food and its estimated calories. Thai language please."
            }
          ],
        }
      ],
    });

    const textContent = msg.content[0].text.trim();
    console.log('Claude response:', textContent);
    
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
       throw new Error('Invalid AI response format');
     }
    
    const result = JSON.parse(jsonMatch[0]);
    return res.status(200).json(result);

  } catch (error) {
    console.error('Claude API error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
