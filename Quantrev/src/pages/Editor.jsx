import { useState } from "react";
import EditorMonaco from "@monaco-editor/react";

export default function Editor() {
  const [code, setCode] = useState(`// Start coding here
function hello() {
  console.log("Quantrev AI");
}
`);

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "New Chat",
      messages: [],
    },
  ]);

  const [activeChat, setActiveChat] = useState(1);

  const currentChat = conversations.find(
    (chat) => chat.id === activeChat
  );

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setConversations((prev) => [
      newChat,
      ...prev,
    ]);

    setActiveChat(newChat.id);
    setPrompt("");
  };

  const deleteChat = (id) => {
    const updatedChats = conversations.filter(
      (chat) => chat.id !== id
    );

    if (updatedChats.length === 0) {
      const newChat = {
        id: Date.now(),
        title: "New Chat",
        messages: [],
      };

      setConversations([newChat]);
      setActiveChat(newChat.id);
    } else {
      setConversations(updatedChats);

      if (activeChat === id) {
        setActiveChat(updatedChats[0].id);
      }
    }
  };

  const askAI = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            prompt,
          }),
        }
      );

      const data = await res.json();

      const aiResponse =
        data?.result || "⚠️ No response from AI";

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                title:
                  chat.messages.length === 0
                    ? prompt.slice(0, 25)
                    : chat.title,
                messages: [
                  ...chat.messages,
                  {
                    prompt,
                    response: aiResponse,
                  },
                ],
              }
            : chat
        )
      );

      setPrompt("");
    } catch (err) {
      console.error(err);

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    prompt,
                    response:
                      "❌ Error connecting to backend",
                  },
                ],
              }
            : chat
        )
      );

      setPrompt("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-white text-black relative">

      {/* SIDEBAR TOGGLE */}
      <button
        onClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
        className="
          absolute
          top-4
          left-4
          z-50
          border
          border-black/20
          bg-white
          px-3
          py-2
          rounded-lg
          hover:bg-black
          hover:text-white
          transition
        "
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <div
        className={`
          ${
            sidebarOpen
              ? "w-64"
              : "w-0"
          }
          overflow-hidden
          transition-all
          duration-300
          border-r
          border-black/10
          flex
          flex-col
          bg-white
        `}
      >
        <div className="p-4 mt-14">
          <button
            onClick={createNewChat}
            className="
              w-full
              border
              border-black/20
              rounded-xl
              p-3
              hover:bg-black
              hover:text-white
              transition
            "
          >
            + New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              className={`
                flex
                items-center
                justify-between
                p-4
                border-b
                border-black/5
                ${
                  activeChat === chat.id
                    ? "bg-black/5"
                    : ""
                }
              `}
            >
              <button
                onClick={() =>
                  setActiveChat(chat.id)
                }
                className="
                  flex-1
                  text-left
                  truncate
                "
              >
                {chat.title}
              </button>

              <button
                onClick={() =>
                  deleteChat(chat.id)
                }
                className="
                  ml-2
                  text-red-500
                  hover:opacity-60
                "
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* EDITOR */}
      <div className="w-1/2 flex flex-col">
        <div className="p-4 border-b border-black/10">
          <h2 className="text-sm font-semibold">
            Code Editor
          </h2>
        </div>

        <div className="flex-1">
          <EditorMonaco
            height="100%"
            language="javascript"
            value={code}
            onChange={(value) =>
              setCode(value || "")
            }
            theme="vs-light"
          />
        </div>
      </div>

      {/* DIVIDER */}
      <div className="w-px bg-black/10"></div>

      {/* AI PANEL */}
      <div className="w-1/2 flex flex-col">
        <div className="p-4 border-b border-black/10">
          <h2 className="text-sm font-semibold">
            Quantrev AI
          </h2>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {currentChat?.messages.length === 0 ? (
            <div className="text-black/40">
              Start a conversation...
            </div>
          ) : (
            currentChat.messages.map(
              (msg, index) => (
                <div
                  key={index}
                  className="mb-8"
                >
                  <div className="font-semibold mb-2">
                    You
                  </div>

                  <div className="mb-4 whitespace-pre-wrap">
                    {msg.prompt}
                  </div>

                  <div className="font-semibold mb-2">
                    Quantrev AI
                  </div>

                  <div className="whitespace-pre-wrap">
                    {msg.response}
                  </div>
                </div>
              )
            )
          )}

          {loading && (
            <div className="text-black/50">
              Thinking... 🤖
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="p-4">
          <div
            className="
              flex
              items-center
              border
              border-black/20
              rounded-2xl
              px-4
              py-3
            "
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) =>
                setPrompt(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !loading
                ) {
                  askAI();
                }
              }}
              placeholder="Ask AI to debug your code..."
              className="w-full outline-none"
            />

            <button
              onClick={askAI}
              disabled={loading}
              className="
                ml-3
                text-sm
                font-medium
                hover:opacity-60
                disabled:opacity-40
              "
            >
              {loading ? "..." : "Ask"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}