"use client";
import { useState } from "react";
import { Bot, RefreshCw } from "lucide-react";

type Question = {
  question: string;
  answer: string;
};

type Segment = {
  services: string;
  questions: Question[];
  hidden?: boolean;
};

type Message = {
  sender: string;
  text: string;
};

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
      { question: "Can expats and non-residents apply for an auto loan in Dubai?", answer: "Expats with valid UAE residency can apply for auto loans. However, most banks do not offer car loans to non-residents (those without a UAE residence visa)." },
      { question: "What is the difference between loan options for expats and UAE nationals?", answer: "Expats may face slightly higher interest rates or stricter income requirements than UAE nationals. Some banks also have specific loan products tailored for expats." },
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

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "TMRCFB bot", text: "Please select a segment to proceed." },
  ]);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);

  const handleSegmentClick = (segment: Segment) => {
    setSelectedSegment(segment);
    setMessages([
      { sender: "bot", text: "Please select a question related to this segment." },
    ]);
  };
  

  const handleQuestionClick = (question: Question) => {
    setMessages([
      ...messages,
      { sender: "user", text: question.question },
      { sender: "bot", text: question.answer },
    ]);
  };

  const handleRefresh = () => {
    setMessages([{ sender: "TMRCFB bot", text: "Please select a segment to proceed." }]);
    setSelectedSegment(null);
  };

  const whatsappLink = "https://wa.me/971505899143?text=Hi%20I%20am%20interested%20in%20learning%20more%20about%20your%20services";

  return (
    <div className="fixed bottom-8 left-5 sm:left-20 z-50 w-[90%] sm:w-[380px] max-w-[350px] h-[80vh]">
      {!isOpen ? (
        <div className="relative group">
          <div
            className="bg-[#0e837c] text-white rounded-full p-3 cursor-pointer shadow-lg flex items-center justify-center w-18 h-18"
            onClick={() => {
              setMessages([
                { sender: "TMRCFB bot", text: "Please select a segment to proceed." },
              ]);
              setIsOpen(true);
            }}
          >
            <Bot className="w-8 h-8" />
          </div>
          <div className="absolute -top-8 left-8 bg-[#0e837c] text-white text-xs px-3 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Hey! This is your TMRC FB assistant
          </div>
        </div>
      ) : (
        <div className="rounded-xl shadow-lg overflow-hidden bg-transparent border-none">
          <div className="bg-[#0e837c] text-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              <span>Let's chat</span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setMessages([]);
                setSelectedSegment(null);
              }}
              className="text-xl font-bold leading-none cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="bg-transparent p-3 flex flex-col gap-2">
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
                const isGreeting = msg.text === "Please select a segment to proceed." || msg.text === "Please select a question related to this segment.";
                const baseStyle = "rounded-xl p-2 max-w-[100%]";
                const bgStyle = isGreeting
                ? "bg-white font-semibold text-gray-500"
                : msg.sender === "bot"
                ? "bg-[#c8ad55] text-white"
                : "bg-[#83b3a3] text-white self-end";
              
              

                return (
                  <div key={idx} className={`${baseStyle} ${bgStyle}`}>
                    {msg.text}
                  </div>
                );
              })}
            </div>

            {!selectedSegment && (
              <div className="flex flex-wrap gap-2 mt-2 justify-start">

           {/* segments.map((segment, idx) => (  use this when all segmnents will be shown*/}
                    {segments.filter(segment => !segment.hidden).map((segment, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSegmentClick(segment)}
                    className="text-sm px-4 py-2 rounded-full bg-[#83b3a3] cursor-pointer hover:bg-[#0e837c]"
                  >
                    {segment.services}
                  </button>
                ))}
              </div>
            )}
{selectedSegment && (
    <div className="flex flex-col gap-2 mt-2 justify-start">
  <button
    onClick={() => {
      setSelectedSegment(null);
      setMessages([{ sender: "TMRCFB bot", text: "Please select a segment to proceed." }]);
    }}
    className="text-sm text-[#c8ad55] underline hover:text-[#e0c974] w-fit cursor-pointer"
  >
    ← Back to Segments
  </button>

  <div className="flex flex-col gap-2 mt-2 max-h-40 overflow-y-auto pr-1 bg-transparent rounded-lg">
  {selectedSegment.questions.map((q, idx) => (
    <button
      key={idx}
      onClick={() => handleQuestionClick(q)}
      className="text-sm px-4 py-2 rounded-full bg-[#83b3a3] cursor-pointer hover:bg-[#0e837c] text-left"
    >
      {q.question}
    </button>
  ))}
</div>

</div>

)}


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
