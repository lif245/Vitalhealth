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
  // Using the most basic and standard model name 'gemini-pro'
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const { message, healthData } = req.body;

  try {
    const systemPrompt = `คุณคือ AI Health Coach ชื่อ 'VitalHealth'
    ข้อมูลสุขภาพของผู้ใช้ในวันนี้:
    - แคลอรีที่เผาผลาญ: ${healthData?.caloriesBurned || 0} kcal
    - แคลอรีที่กิน: ${healthData?.caloriesIntake || 0} kcal
    - ก้าวเดิน: ${healthData?.steps || 0} ก้าว
    - นอน: ${healthData?.sleepHours || 0} ชม.
    
    คำแนะนำ: ตอบเป็นภาษาไทย สั้นๆ เป็นกันเอง`;

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: message }
    ]);

    const reply = result.response.text().trim();
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Gemini Chat error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
