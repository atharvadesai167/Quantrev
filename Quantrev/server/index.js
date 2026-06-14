import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔍 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Quantrev AI Backend Running 🚀");
});

// MAIN AI ROUTE
app.post("/api/ai", async (req, res) => {
  try {
    const { code, prompt } = req.body;

    if (!prompt) {
      return res.json({
        result: "Say something 😊"
      });
    }

    // DETECT IF USER IS TALKING ABOUT CODE OR JUST CHATTING
    const isCodeMode =
      code &&
      code.length > 20 &&
      (
        prompt.toLowerCase().includes("fix") ||
        prompt.toLowerCase().includes("bug") ||
        prompt.toLowerCase().includes("error") ||
        prompt.toLowerCase().includes("debug") ||
        prompt.toLowerCase().includes("explain") ||
        prompt.toLowerCase().includes("wrong")


      );

    let messages;

    if (isCodeMode) {
      // CODE DEBUGGING MODE
      messages = [
        {
          role: "system",
          content:
            "You are a senior software engineer. Help debug code, explain issues clearly, and give correct fixed code."
        },
        {
          role: "user",
          content: `Code:\n${code}\n\nTask:\n${prompt}`
        }
      ];
    } else {
      // NORMAL CHAT MODE
      messages = [
        {
          role: "system",
          content:
            "You are a friendly AI assistant. Reply naturally to greetings and normal conversation in a simple way."
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
        }
      }
    );

    const aiResponse =
      response?.data?.choices?.[0]?.message?.content;

    res.json({
      result: aiResponse
    });

  } catch (error) {
    console.log("AI ERROR:", error?.response?.data || error.message);

    res.status(500).json({
      error: "AI request failed"
    });
  }
});

//  START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});