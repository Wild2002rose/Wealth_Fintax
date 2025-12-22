import { useState, useEffect, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          sender: "BOT",
          text: "Hi, good morning 👋 How can I help you?",
        },
      ]);
    }
  }, [open]);

  function handleSend(e) {
    e.preventDefault();
    const text = e.target.message.value.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: "USER", text }]);
    e.target.reset();

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "BOT",
          text: "This response will come from backend services.",
        },
      ]);
    }, 600);
  }

  return (
    <>
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

      <div
        className={`fixed bottom-24 right-6 w-80 h-[440px] bg-white rounded-2xl shadow-2xl
                    flex flex-col overflow-hidden z-[9998]
                    transition-all duration-300 ease-out
                    ${
                      open
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-5 scale-95 pointer-events-none"
                    }`}
      >
        <div className="bg-blue-600 text-white px-5 py-4 text-md font-semibold tracking-wide text-center">
          Welcome to WFS Chat
        </div>

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

        <form onSubmit={handleSend} className="px-4 py-4 bg-white">
          <div
            className="flex items-center gap-2 px-3 py-2
               rounded-full border border-gray-200
               shadow-sm
               focus-within:ring-1 focus-within:ring-blue-500
               transition-all"
          >
            <input
              name="message"
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-sm px-2 py-1
                 outline-none placeholder-gray-400"
            />

            <button
              type="submit"
              className="w-9 h-9 flex items-center justify-center 
                 rounded-3xl bg-blue-600 text-white
                 hover:bg-blue-700 active:scale-95
                 transition-all"
              aria-label="Send message"
            >
              <i className="fa-solid fa-paper-plane text-sm mr-1"></i>
            </button>
          </div>
        </form>
      </div>

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
      `}</style>
    </>
  );
}
