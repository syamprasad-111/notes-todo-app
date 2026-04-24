const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const summarizeNote = async (req, res)=>{
  try {
    const { text } = req.body;
    if (!text || text.trim()==="")
      return res.status(400).json({ message: "Text is required" });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: `Summarize in 3-4 lines:\n${text}`,
    });
    const summary = response.text;
    res.json({ summary });
  } 
  catch(error){
    console.error("FULL ERROR:", error);
    res.status(500).json({ message: "AI summarization failed" });
  }
};

module.exports = { summarizeNote };