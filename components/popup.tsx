"use client";
import { useEffect, useState } from "react";

type WelcomePopupProps = {
  onClose: () => void;
};

export default function WelcomePopup({ onClose }: WelcomePopupProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    onClose()
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  return (
    
    <div className="fixed top-18 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative flex backdrop-blur-md bg-black/70 border border-gray-300 shadow-lg px-4 py-4 rounded-lg text-sm text-white">

<b> Hi! This is your TMRC FB assistant. </b>

<button onClick={() => setShow(false)} className="absolute top-2 right-2 text-md text-white hover:text-gray-700 cursor-pointer">
  ✕
</button>


      </div>
    </div>
  );
}
