"use client";
import { useState } from "react";
import { Bot, RefreshCw } from "lucide-react";

const predefinedQuestions = [
  {
    question: "Why choose TMRC FB for your mortgage?",
    answer: "We offer 99.9% approval rate with competitive market rates.",
  },
  {
    question: "How long does mortgage processing take?",
    answer: "Processing typically takes a minimum of 15 working days.",
  },
  {
    question: "What is the eligible age for a mortgage?",
    answer: "Applicants must be between 25 and 65 years old.",
  },
  {
    question: "What services do you offer?",
    answer: "We provide home finance, auto loans, and personal loans.",
  },
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "TMRCFB bot", text: "How can I help you?" },
  ]);

  const handleSend = (text: string) => {
    const predefined = predefinedQuestions.find((q) => q.question === text);
    const botReply = predefined ? predefined.answer : "Let me check that for you.";
    setMessages([
      ...messages,
      { sender: "user", text },
      { sender: "bot", text: botReply },
    ]);
  };

  const handleRefresh = () => {
    setMessages([{ sender: "TMRCFB bot", text: "How can I help you?" }]);
  };

  const whatsappLink = "https://wa.me/542117384?text=Hi%20I%20am%20interested%20in%20learning%20more%20about%20your%20services";

  return (
    <div className="fixed bottom-5 left-5 sm:left-15 z-50 w-[90%] sm:w-[350px] max-w-[350px]">
      {!isOpen ? (
        <div className="relative group">
          <div
            className="bg-[#0e837c] text-white rounded-full p-3 cursor-pointer shadow-lg flex items-center justify-center w-15 h-15"
            onClick={() => {
              setMessages([
                { sender: "TMRCFB bot", text: "How can I help you?" },
              ]);
              setIsOpen(true);
            }}
          >
            <Bot className="w-6 h-6" />
          </div>
          <div className="absolute -top-8 left-8 bg-[#0e837c] text-white text-xs px-3 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Hey! This is your TMRC FB assistant
          </div>
        </div>
      ) : (
        <div className="rounded-xl shadow-lg border border-gray-300 overflow-hidden">
          <div className="bg-[#0e837c] text-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              <span>Let's chat</span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setMessages([]);
              }}
              className="text-xl font-bold leading-none cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="bg-white p-3 flex flex-col gap-2">
            <div className="flex justify-end">
              <button
                onClick={handleRefresh}
                className="text-sm text-gray-500 hover:text-[#0e837c] flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-35 sm:max-h-40 overflow-y-auto text-sm">
              {messages.map((msg, idx) => {
                const isGreeting = msg.text === "How can I help you?";
                const baseStyle = "rounded-xl p-2 max-w-[100%]";
                const bgStyle = isGreeting
                  ? "bg-white font-semibold text-gray-500"
                  : msg.sender === "bot"
                  ? "bg-gray-100 text-black"
                  : "bg-[#83b3a3] self-end";

                return (
                  <div key={idx} className={`${baseStyle} ${bgStyle}`}>
                    {msg.text}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2 mt-2 justify-start">
              {predefinedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.question)}
                  className="text-sm px-4 py-2 rounded-full bg-[#83b3a3] cursor-pointer hover:bg-[#0e837c]"
                >
                  {q.question}
                </button>
              ))}
            </div>

        
            <div className="flex items-center gap-2 mt-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 flex items-center gap-1 hover:text-green-800"
              >
                For more info, <br />
                <b>click here</b>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.372 0 0 5.373 0 12c0 2.125.555 4.11 1.516 5.844L0 24l6.262-1.594C8.014 23.445 9.956 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.603 17.197c-.249.699-1.434 1.366-2.058 1.454-.524.073-1.179.104-1.899-.12-.437-.136-1.004-.328-1.724-.644-3.034-1.311-5.012-4.542-5.168-4.765-.153-.22-1.234-1.646-1.234-3.14 0-1.493.789-2.225 1.069-2.51.279-.282.621-.353.83-.353h.592c.186 0 .437-.063.684.52.249.583.84 2.017.915 2.162.073.146.123.312.024.499-.1.186-.149.299-.298.464-.149.165-.314.368-.448.495-.149.137-.304.287-.131.563.173.277.765 1.26 1.646 2.04 1.131 1.007 2.083 1.32 2.36 1.467.277.146.437.122.6-.073.165-.195.688-.799.873-1.074.184-.277.366-.232.621-.14.256.092 1.622.767 1.898.906.277.14.457.209.524.324.066.114.066.662-.183 1.36z" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
