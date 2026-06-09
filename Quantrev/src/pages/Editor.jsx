import { useState } from "react";
import EditorMonaco from "@monaco-editor/react";

export default function Editor() {
  const [code, setCode] = useState(`// Start coding here
function hello() {
  console.log("Quantrev AI");
}
`);

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // 🚀 AI CALL
  const askAI = async () => {
    console.log("ASK CLICKED");
    console.log("Prompt:", prompt);

    if (!prompt.trim()) {
      setResponse("⚠️ Please enter a prompt");
      return;
    }

    setLoading(true);
    setResponse("Thinking... 🤖");

    try {
      const res = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          prompt,
        }),
      });

      const data = await res.json();

      console.log("Backend response:", data);

      if (data?.result) {
        setResponse(data.result);
      } else {
        setResponse("⚠️ No response from AI");
      }
    } catch (err) {
      console.error("AI Error:", err);
      setResponse("❌ Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-white text-black">

      {/* LEFT - EDITOR */}
      <div className="w-1/2 flex flex-col">

        <div className="p-4 border-b border-black/10">
          <h2 className="text-sm font-semibold">Code Editor</h2>
        </div>

        <div className="flex-1">
          <EditorMonaco
            height="100%"
            language="javascript"
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-light"
          />
        </div>

      </div>

      {/* DIVIDER */}
      <div className="w-px bg-black/10"></div>

      {/* RIGHT - AI PANEL */}
      <div className="w-1/2 flex flex-col">

        <div className="p-4 border-b border-black/10">
          <h2 className="text-sm font-semibold">Quantrev AI</h2>
        </div>

        {/* RESPONSE */}
        <div className="flex-1 p-4 overflow-y-auto whitespace-pre-wrap text-sm">
          {response}
        </div>

        {/* INPUT */}
        <div className="p-4">
          <div className="flex items-center border border-black/20 rounded-2xl px-4 py-3">

            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask AI to debug your code..."
              className="w-full outline-none"
            />

            <button
              onClick={askAI}
              disabled={loading}
              className="ml-3 text-sm font-medium hover:opacity-60 disabled:opacity-40"
            >
              {loading ? "..." : "Ask"}
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}