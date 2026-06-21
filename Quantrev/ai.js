import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { code, prompt } = req.body || {};

    if (!prompt) {
      return res.status(200).json({
        result: "Say something 😊"
      });
    }

    // ✅ IMPORTANT: check API key early
    if (!process.env.GROQ_API_KEY) {
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

    let messages;

    // CODE MODE
    if (isCodeMode) {
      messages = [
        {
          role: "system",
          content:
            "You are a senior software engineer. Help debug code, explain issues clearly, and provide corrected code."
        },
        {
          role: "user",
          content: `Code:\n\n${code}\n\nTask:\n\n${prompt}`
        }
      ];
    }

    // NORMAL MODE
    else {
      messages = [
        {
          role: "system",
          content:
            "You are Quantrev AI, a helpful and intelligent AI assistant."
        },
        {
          role: "user",
          content: prompt
        }
      ];
    }

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
        timeout: 15000
      }
    );

    const aiResponse =
      response?.data?.choices?.[0]?.message?.content;

    return res.status(200).json({
      result: aiResponse || "No response from AI"
    });

  } catch (error) {
    console.log("AI ERROR:", error?.response?.data || error.message);

    return res.status(500).json({
      error:
        error?.response?.data?.error?.message ||
        error.message ||
        "AI request failed"
    });
  }
}