"use client";
import { useState } from 'react';
import { Send, Bot, RefreshCw } from 'lucide-react';

const predefinedQuestions = [
  {
    question: 'Why choose TMRC FB for your mortgage?',
    answer: 'We offer 99.9% approval rate with competitive market rates.'
  },
  {
    question: 'How long does mortgage processing take?',
    answer: 'Processing typically takes a minimum of 15 working days.'
  },
  {
    question: 'What is the eligible age for a mortgage?',
    answer: 'Applicants must be between 25 and 65 years old.'
  },
  {
    question: 'What services do you offer?',
    answer: 'We provide home finance, auto loans, and *personal loans.'
  }
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'TMRCFB bot', text: 'How can I help you?' }
  ]);
  const [input, setInput] = useState('');

  const sendToBackend = async (messageText: string) => {
    await fetch('/api/https://web.whatsapp.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageText })
    });
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const predefined = predefinedQuestions.find(q => q.question === messageText);

    let botReply = '';

    if (predefined) {
      botReply = predefined.answer;
    } else {
      await sendToBackend(messageText);
      botReply = 'Thanks! Our team will contact you soon.';
    }

    setMessages([...messages, { sender: 'user', text: messageText }, { sender: 'bot', text: botReply }]);
    setInput('');
  };

  const handleRefresh = () => {
    setMessages([{ sender: 'TMRCFB bot', text: 'How can I help you?' }]);
    setInput('');
  };

  return (
<div className="fixed bottom-5 left-5 sm:left-15 z-50 w-[90%] sm:w-[350px] max-w-[350px]">
  {!isOpen ? (
    <div className="relative group">
   <div
  className="bg-[#0e837c] text-white rounded-full p-3 cursor-pointer shadow-lg flex items-center justify-center w-15 h-15"
  onClick={() => {
    setMessages([{ sender: 'TMRCFB bot', text: 'How can I help you?' }]);
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
            <button onClick={() => {
  setIsOpen(false);
  setMessages([]);
}
} className="text-xl font-bold leading-none cursor-pointer">×</button>
          </div>

          <div className="bg-white p-3 flex flex-col gap-2">
            <div className="flex justify-end">
              <button
                onClick={handleRefresh}
                className="text-sm text-gray-500 hover:text-[#0e837c] flex items-center gap-1 cursor-pointer"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-25 sm:max-h-40 overflow-y-auto text-sm">
              {messages.map((msg, idx) => {
                const isGreeting = msg.text === 'How can I help you?';
                const baseStyle = 'rounded-xl p-2 max-w-[100%]';
                const bgStyle = isGreeting
                  ? 'bg-white font-semibold text-gray-500'
                  : msg.sender === 'bot'
                  ? 'bg-gray-100'
                  : 'bg-[#83b3a3] self-end';

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

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2">
              <button onClick={() => handleSend()} className="text-[#96e9b0]">
                For more info, <a href="https://mehwish@mfigroup.ae">click here</a>
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
