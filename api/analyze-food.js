import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: Missing GEMINI_API_KEY' });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Switched to 1.5-flash for better free tier stability
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { base64Image, mimeType } = req.body;

  if (!base64Image) {
    return res.status(400).json({ error: 'Image is required' });
  }

  const cleanBase64 = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;

  try {
    const prompt = "Identify the food in this image and estimate its calories. Respond strictly with a JSON object containing two keys: 'name' (Thai string) and 'kcal' (number). Example: {\"name\": \"ข้าวมันไก่\", \"kcal\": 600}";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: cleanBase64,
          mimeType: mimeType || "image/jpeg"
        }
      }
    ]);

    const textContent = result.response.text().trim();
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
       throw new Error('Invalid AI response format');
    }
    
    const analysisResult = JSON.parse(jsonMatch[0]);
    return res.status(200).json(analysisResult);

  } catch (error) {
    console.error('Gemini Vision error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
