"use client";
import { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-18 left-1/2 transform -translate-x-1/2 z-50">
      <div className="backdrop-blur-md bg-black/70 border border-gray-300 shadow-lg px-4 py-4 rounded-lg text-sm text-white">

<b> Hi! This is your TMRC FB assistant.
<button onClick={() => setShow(false)} className="ml-2 text-md text-black hover:text-gray-700 cursor-pointer">
  ✕
</button>
<br  />Please select a segment to proceed.</b>
      </div>
    </div>
  );
}
