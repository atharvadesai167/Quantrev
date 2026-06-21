import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { code = "", prompt = "" } = req.body || {};

    if (!prompt.trim()) {
      return res.status(200).json({
        result: "Say something 😊"
      });
    }

    // 🔐 CHECK API KEY
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY missing in environment variables");

      return res.status(500).json({
        error: "Server misconfiguration: GROQ_API_KEY missing"
      });
    }

    const lowerPrompt = prompt.toLowerCase();

    const isCodeMode =
      code &&
      code.length > 20 &&
      (
        lowerPrompt.includes("fix") ||
        lowerPrompt.includes("bug") ||
        lowerPrompt.includes("error") ||
        lowerPrompt.includes("debug") ||
        lowerPrompt.includes("explain") ||
        lowerPrompt.includes("wrong")
      );

    const messages = isCodeMode
      ? [
          {
            role: "system",
            content:
              "You are a senior software engineer. You debug code clearly and return corrected code when needed."
          },
          {
            role: "user",
            content: `Code:\n${code}\n\nTask:\n${prompt}`
          }
        ]
      : [
          {
            role: "system",
            content:
              "You are Quantrev AI, a helpful, smart and concise assistant."
          },
          {
            role: "user",
            content: prompt
          }
        ];

    // 🤖 CALL GROQ
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages,
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 20000
      }
    );

    const aiResponse = response?.data?.choices?.[0]?.message?.content;

    if (!aiResponse) {
      return res.status(500).json({
        error: "AI returned empty response"
      });
    }

    return res.status(200).json({
      result: aiResponse
    });

  } catch (error) {
    console.error("AI ERROR:", error?.response?.data || error.message);

    return res.status(500).json({
      error: "AI request failed",
      details: error?.response?.data || error.message
    });
  }
}