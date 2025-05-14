"use client";
import { useState } from "react";
import { Bot, RefreshCw } from "lucide-react";
import { useRef, useEffect } from "react";
import WelcomePopup from "@/components/popup";

type Question = { question: string; answer: string };
type Segment = { services: string; questions: Question[]; hidden?: boolean };
type Message = { sender: string; text: string };

const segments: Segment[] = [
    { services: 'Mortgage', questions: [
      { question: "What is the maximum loan amount I can get?", answer: "Up to 50% of your monthly income. For other income based, please reach out to us." },
      { question: "What is the maximum fixed interest period?", answer: "From 2 to max 5 years. Shorter terms usually mean lower rates." },
      { question: "Can I apply for a mortgage at 60 years?", answer: "Yes. Tenure will be less as the maximum age of employment is 65 and up to 70 for business owners." },
      { question: "What is the max property value I can mortgage?", answer: "No cap. Up to 80% for properties under 5 million; 60–70% for higher values." },    
      ]},
    { services: 'Business Banking', 
      hidden: true,
      questions: [
        { question: "What services do we offer?", answer: "We provide business accounts, loans, and financial advisory services." },
    ]},
    { services: 'Auto Finance', questions: [
        { question: "Can expats & non-residents apply for an auto loan in Dubai?", answer: "Expats with valid UAE residency can apply for auto loans. However, most banks do not offer car loans to non-residents (those without a UAE residence visa)." },
        { question: "What's the difference between loan options for expats and UAE nationals?", answer: "Expats may face slightly higher interest rates or stricter income requirements than UAE nationals. Some banks also have specific loan products tailored for expats." },
        { question: "What documents are required for expats to apply for a car loan?", answer: " Expats usually need to submit: 1.Passport with valid UAE residence visa 2.Emirates ID 3.UAE driving license 4.Salary certificate 5.Recent bank statements (3 to 6 months)" },
        { question: "Can non-residents finance a car purchase in Dubai?", answer: "Non-residents typically cannot get a traditional auto loan from UAE banks. They may need to explore personal loans from their home country or leasing options from international car dealers in Dubai." },
      ]},
    { services: 'Company Formation', questions: [
        
      { question: "What are the main types of business jurisdictions in Dubai?", answer: "Dubai offers three main jurisdictions: 1.Mainland (Onshore): Business can operate anywhere in the UAE and internationally. 2.Free Zone: Full ownership, but business limited within the Free Zone and internationally. 3.Offshore: Mainly for international business; no physical office required in Dubai." },
      { question: "Can a foreigner own 100% of a company in Dubai?", answer: "1. Yes. As of 2021, foreigners can own 100% of mainland businesses in many sectors. 2.Free zones have always allowed 100% foreign ownership." },
      { question: "What are the most common legal structures?", answer: "1. LLC (Limited Liability Company) -Ideal for mainland businesses. 2. Free Zone Company (FZC or FZE) -Common in free zones. 3. Branch Office -For existing companies expanding into Dubai. 4. Sole Establishment -Owned by one individual." },
      { question: "What documents are required to start a business in Dubai?", answer: "Mainly documents include: 1.Passport copies of shareholders/directors. 2.Visa and Emirates ID (if resident). 3.Business plan (for some activities). 4.Trade name reservation. 5. Initial approval from authorities. 6. Lease agreement (Ejari)" },
      ]},
  
    { services: 'Taxation', 
      hidden: true,
      questions: 
    [
        { question: "What services do we offer?", answer: "We offer tax planning, filing, and compliance services." },
    ]},
    { services: 'Accounting and Bookkeeping', 
      hidden: true,
      questions: [
        { question: "What services do we offer?", answer: "We provide bookkeeping, financial reporting, and accounting services." },
    ]},
  ];

  

  export default function ChatbotFullPage() {
    const [messages, setMessages] = useState<Message[]>([
      { sender: "bot", text: "Please select a segment to proceed." }
    ]);
    
    
    const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  
    const bottomRef = useRef<HTMLDivElement | null>(null);

  
    useEffect(() => {
      if (selectedSegment && bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [selectedSegment]);
  
    const handleSegmentClick = (segment: Segment) => {
      setSelectedSegment(segment);
      setMessages([
        { sender: "bot", text: "Please select a question related to this segment." },
      ]);
    };
  
    const handleQuestionClick = (question: Question) => {
      const filteredMessages = messages.filter(
        (msg) => msg.text !== "Please select a question related to this segment."
      );
    
      setMessages([
        ...filteredMessages,
        { sender: "user", text: question.question },
        { sender: "bot", text: question.answer },
      ]);
    };
    
    const handleRefresh = () => {
      setMessages([
        { sender: "bot", text: "Please select a segment to proceed." }
      ]);
      setSelectedSegment(null);
    };
    
  
    const whatsappLink =
      "https://wa.me/971505899143?text=Hi%20I%20am%20interested%20in%20learning%20more%20about%20your%20services";
  
    return (
      <div className="min-h-screen h-screen overflow-y-auto flex flex-col items-center justify-start bg-white p-4">

  {/* Welcome Popup */}
  <WelcomePopup />

  {/* Header */}
  <div className="w-full max-w-5xl bg-[#0e837c] text-white px-4 py-3 rounded-t-lg shadow-md flex items-center justify-between">
  <div className="flex items-center gap-2">
    {/* Bot Icon */}
    <Bot className="w-6 h-6" />
    <span className="font-semibold sm:text-base text-sm">TMRCFB Assistant</span>
  </div>
  <button
    onClick={handleRefresh}
    className="flex items-center gap-1 text-sm text-white hover:text-gray-200 cursor-pointer"
  >
    <RefreshCw className="w-4 h-4" /> Refresh
  </button>
</div>


  {/* Chat Area */}
  <div className="w-full max-w-5xl flex flex-col gap-3 bg-gray-50 p-4 shadow-md border border-gray-200 rounded-b-lg sm:h-[85vh] h-[75vh] overflow-hidden relative">

    {/* Chat Messages */}
    <div className={`flex flex-col gap-2 overflow-y-auto sm:h-[55vh] h-[40vh] pr-2
  ${messages.length === 1 && messages[0].text === "Please select a segment to proceed."
    ? "items-center justify-center text-center"
    : ""}
`}>

      {messages.map((msg, idx) => {
        const isGreeting =
          msg.text === "Please select a segment to proceed." ||
          msg.text === "Please select a question related to this segment.";
        const baseStyle = "rounded-xl px-4 py-2 sm:max-w-[75%] max-w-[70%] sm:text-base text-[15px]";
        const bgStyle = isGreeting
          ? "bg-white font-semibold text-gray-500 self-center"
          : msg.sender === "bot"
          ? "bg-[#c8ad55] text-white self-start"
          : "bg-[#83b3a3] text-white self-end";

          if (msg.sender === "bot" && !isGreeting) {
            return (
              <div key={idx} className="flex items-start gap-2 self-start">
                <img
                  src="/images/logo.jpeg"
                  alt="Bot Logo"
                  className="sm:w-14 sm:h-11 w-10 h-8 rounded-full mt-1"
                />
                <div className={`${baseStyle} ${bgStyle}`}>
                  {msg.text}
                </div>
              </div>
            );
          }

        if (msg.sender !== "bot" && !isGreeting) {
          return (
          <div key={idx} className="flex flex-row-reverse items-end gap-2 self-end">
                <img
                  src="/images/sender.jpg"
                  alt="Sender Image"
                  className="sm:w-14 sm:h-11 w-10 h-8 rounded-full mt-1 opacity-60"
                />
                <div className={`${baseStyle} ${bgStyle}`}>
            {msg.text}
          </div>
          </div>
        );
      }
      return (
        <div key={idx} className={`${baseStyle} ${bgStyle}`}>
          {msg.text}
        </div>
      );
    })}
    </div>

    {/* Segments */}
    <div className="sm:mt-10 mt-6 flex justify-center w-full">
      <div className="sm:max-h-[22vh] max-h-[22vh] overflow-y-auto rounded-lg border border-gray-200 p-3 bg-white shadow-inner sm:w-[80%] sm:max-w-4xl max-w-full flex flex-col justify-start">
        {!selectedSegment ? (
          <div className="flex flex-wrap gap-2 justify-center">
            {segments
              .filter((segment) => !segment.hidden)
              .map((segment, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSegmentClick(segment)}
                  className="sm:text-[14px] text-[14px] px-4 py-2 rounded-full bg-[#0e837c] text-white text-center hover:bg-[#83b3a3] w-full sm:w-auto max-w-xs break-words cursor-pointer"
                >
                  {segment.services}
                </button>
              ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setSelectedSegment(null);
                setMessages([]);
              }}
              className="sm:text-[15px] text-[14px] text-[#c8ad55] underline hover:text-[#e0c974] w-fit cursor-pointer"
            >
              ← Back to Segments
            </button>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedSegment.questions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuestionClick(q)}
                  className="sm:text-[15px] text-[14px] sm:px-4 px-2 py-2 rounded-full bg-[#0e837c] text-white text-center hover:bg-[#83b3a3] w-auto cursor-pointer"
                >
                  {q.question}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

    {/* WhatsApp */}
    <div className="mt-3">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 fixed sm:bottom-20 bottom-18 hover:text-green-800 flex items-center gap-1 text-sm cursor-pointer"
      >
        For more info, <b>click here</b>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.372 0 0 5.373 0 12c0 2.125.555 4.11 1.516 5.844L0 24l6.262-1.594C8.014 23.445 9.956 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.603 17.197c-.249.699-1.434 1.366-2.058 1.454-.524.073-1.179.104-1.899-.12-.437-.136-1.004-.328-1.724-.644-3.034-1.311-5.012-4.542-5.168-4.765-.153-.22-1.234-1.646-1.234-3.14 0-1.493.789-2.225 1.069-2.51.279-.282.621-.353.83-.353h.592c.186 0 .437-.063.684.52.249.583.84 2.017.915 2.162.073.146.123.312.024.499-.1.186-.149.299-.298.464-.1.166-.214.3-.338.406-.125.137-.263.298-.35.468.08.162.148.34.215.513.027.06.06.123.08.183.042.142.07.289.1.437.06.304.114.618.174.937.092.497.193 1.007.278 1.512z" />
        </svg>
      </a>
    </div>
  </div>

  {/* Footer */}
  <footer className="w-full max-w-5xl text-center sm:text-[13px] text-[11px] text-black py-1 mt-3 leading-tight sm:h-[40px] h-[30px] overflow-hidden">
    <div>© {new Date().getFullYear()} TMRC Chatbot. All rights reserved.</div>
    <div className="text-[#0e837c]">
      <a
        href="https://tmrcfb.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        www.tmrcfb.com
      </a>{" "}
      | 1202 Conrad Business Tower, Sheikh Zayed Rd, Dubai,
      UAE P.O Box: 37547
    </div>
  </footer>

</div>

    );
  }
  