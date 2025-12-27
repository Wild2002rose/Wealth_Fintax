import { useState, useEffect, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const API_BASE = "https://localhost:7128/api/chat";

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [options, setOptions] = useState([]);
  const [expectInput, setExpectInput] = useState(false);

  const messagesEndRef = useRef(null);

  // ============================
  // AUTO SCROLL
  // ============================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, options]);

  // ============================
  // START CHAT (ONCE)
  // ============================
  useEffect(() => {
    if (!open) return;

    if (!sessionId) {
      startChat();
    }
  }, [open]);

  async function startChat() {
    try {
      const res = await fetch(`${API_BASE}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      console.log("CHAT START:", data);

      setSessionId(data.sessionId);
      setOptions(data.options || []);
      setExpectInput(data.expectInput);

      setMessages([
        {
          sender: "BOT",
          text: data.botMessage,
        },
      ]);
    } catch (err) {
      console.error("Start chat failed", err);
    }
  }

  // ============================
  // SEND OPTION
  // ============================
  async function sendOption(optionId) {
    const selected = options.find(o => o.id === optionId);

    setMessages(prev => [
      ...prev,
      { sender: "USER", text: selected.text }
    ]);

    setOptions([]);

    const res = await fetch(`${API_BASE}/next`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        selectedOptionId: optionId,
      }),
    });

    const data = await res.json();

    setOptions(data.options || []);
    setExpectInput(data.expectInput);

    setMessages(prev => [
      ...prev,
      { sender: "BOT", text: data.botMessage }
    ]);
  }

  // ============================
  // SEND USER MESSAGE
  // ============================
  async function handleSend(e) {
    e.preventDefault();
    if (!expectInput) return;

    const text = e.target.message.value.trim();
    if (!text) return;

    setMessages(prev => [...prev, { sender: "USER", text }]);
    e.target.reset();

    const res = await fetch(`${API_BASE}/next`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        userInput: text,
      }),
    });

    const data = await res.json();

    setOptions(data.options || []);
    setExpectInput(data.expectInput);

    setMessages(prev => [
      ...prev,
      { sender: "BOT", text: data.botMessage }
    ]);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white 
                   flex items-center justify-center shadow-xl z-[9999]
                   transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <i
          className={`fa-solid ${
            open ? "fa-xmark rotate-90" : "fa-message"
          } text-xl transition-transform duration-300`}
        />
      </button>

      {/* Chat Window */}
      {/* <div
        className={`fixed bottom-24 right-6 w-80 h-[440px] bg-white rounded-2xl shadow-2xl
                    flex flex-col overflow-hidden z-[9998]
                    transition-all duration-300 ease-out
                    ${
                      open
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-5 scale-95 pointer-events-none"
                    }`}
      > */}
      <div
  className={`fixed bottom-24 right-6 w-80 h-[440px] bg-white rounded-2xl shadow-2xl
              flex flex-col overflow-hidden z-[9998]
              origin-bottom-right
              transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
              ${
                open
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-90 translate-y-6 pointer-events-none"
              }`}
>

        {/* Header */}
        <div className="bg-blue-600 text-white px-5 py-4 text-md font-semibold text-center">
          Welcome to WFS Chat
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-3 space-y-4 overflow-y-auto text-sm bg-white">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.sender === "USER" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-xl leading-relaxed animate-fadeIn
                            max-w-[75%] break-words
                            ${
                              m.sender === "BOT"
                                ? "bg-gray-100 text-black"
                                : "bg-blue-100 text-blue-900"
                            }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* OPTIONS (Stable location) */}
        {/* OPTIONS – Dropdown Style */}
{/* OPTIONS – Controlled Dropdown Panel */}
{options.length > 0 && !expectInput && (
  <div className="px-4 pb-3">
    <div className="
  rounded-xl border border-gray-200 bg-white
  shadow-inner
  max-h-40 overflow-y-auto
  animate-dropdown
">

      {options.map((opt, index) => (
        <button
          key={opt.id}
          onClick={() => sendOption(opt.id)}
          className="
            w-full text-left px-4 py-3
            text-sm font-medium text-gray-800
            bg-white
            hover:bg-blue-50 hover:text-blue-700
            active:bg-blue-100
            transition-all duration-200
            flex items-center justify-between
            group
            border-b last:border-b-0
          "
          style={{ animationDelay: `${index * 40}ms` }}
        >
          <span>{opt.text}</span>

          <i
            className="
              fa-solid fa-chevron-right
              text-xs text-gray-400
              opacity-0 translate-x-[-4px]
              group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-200
            "
          />
        </button>
      ))}
    </div>
  </div>
)}



        {/* Input */}
        <form onSubmit={handleSend} className="px-4 py-4 bg-white">
          <div
            className="flex items-center gap-2 px-3 py-2
               rounded-full border border-gray-200
               shadow-sm
               focus-within:ring-1 focus-within:ring-blue-500"
          >
            <input
              name="message"
              disabled={!expectInput}
              placeholder={
                expectInput
                  ? "Type your message..."
                  : "Please choose an option above"
              }
              className="flex-1 bg-transparent text-sm px-2 py-1
                 outline-none placeholder-gray-400
                 disabled:opacity-50"
            />

            <button
              type="submit"
              className="w-9 h-9 flex items-center justify-center 
                 rounded-3xl bg-blue-600 text-white
                 hover:bg-blue-700 active:scale-95
                 transition-all"
            >
              <i className="fa-solid fa-paper-plane text-sm mr-1"></i>
            </button>
          </div>
        </form>
      </div>

      {/* Animation */}
      <style>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.25s ease-out;
  }

  @keyframes dropdown {
    from {
      opacity: 0;
      transform: translateY(-6px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .animate-dropdown {
    animation: dropdown 0.35s cubic-bezier(.22,1,.36,1);
  }
`}</style>

    </>
  );
}
