import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

/* ------------------ MIDDLEWARE ------------------ */

// Allow all origins (safe for dev + simple production setup)
app.use(
  cors({
    origin: "*"
  })
);

app.use(express.json());

/* ------------------ HEALTH CHECK ------------------ */

app.get("/", (req, res) => {
  res.json({
    status: "Quantrev AI Backend Running 🚀"
  });
});

/* ------------------ AI ROUTE ------------------ */

app.post("/api/ai", async (req, res) => {
  try {
    const { prompt, code } = req.body || {};

    if (!prompt) {
      return res.status(200).json({
        result: "Say something 😊"
      });
    }

    // Safety check for API key
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: "Missing GROQ_API_KEY in environment variables"
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

    /* ------------------ CODE MODE ------------------ */
    if (isCodeMode) {
      messages = [
        {
          role: "system",
          content:
            "You are a senior software engineer. Debug code clearly and provide fixed solutions."
        },
        {
          role: "user",
          content: `Code:\n\n${code}\n\nTask:\n\n${prompt}`
        }
      ];
    }

    /* ------------------ NORMAL MODE ------------------ */
    else {
      messages = [
        {
          role: "system",
          content:
            "You are Quantrev AI, a helpful, intelligent assistant that responds clearly and naturally."
        },
        {
          role: "user",
          content: prompt
        }
      ];
    }

    /* ------------------ GROQ REQUEST ------------------ */

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
    console.log(
      "AI ERROR:",
      error?.response?.data || error.message
    );

    return res.status(500).json({
      error:
        error?.response?.data?.error?.message ||
        "AI request failed"
    });
  }
});

/* ------------------ START SERVER ------------------ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});