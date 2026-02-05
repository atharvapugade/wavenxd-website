"use client";

import { useState, useEffect, useRef } from "react";
import WhatsAppFloat from "./WhatsAppFloat";
import EnquiryButton from "./EnquiryButton";

export default function FloatingWidgets() {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hintTimeoutRef = useRef(null);
  const hoverRef = useRef(false);

  const handleToggle = () => {
    setOpen(!open);
    setShowHint(false);
  };

  // Show hint automatically every 10 seconds
  useEffect(() => {
    const showBubble = () => {
      if (!open && !hoverRef.current) {
        setShowHint(true);
        hintTimeoutRef.current = setTimeout(() => {
          setShowHint(false);
        }, 1200);
      }
    };

    const interval = setInterval(showBubble, 10000);
    return () => {
      clearInterval(interval);
      clearTimeout(hintTimeoutRef.current);
    };
  }, [open]);

  return (
    <div className="fixed left-6 bottom-6 z-50 flex flex-col items-center">

      {/* Hint Bubble, aligned with lower half of button */}
      <div
        className={`widget-hint absolute left-full ml-3 bottom-0 translate-y-[60%]
                    bg-black text-white text-[12px] font-semibold px-3 py-2 rounded-md shadow-lg border-2 border-black/80 whitespace-nowrap
                    transition-all duration-500 ease-out transform
                    ${showHint && !open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
      >
        Click to connect

        {/* Arrow pointing to lower center of main button */}
        <span className="absolute left-0 top-0 translate-y-1/2 -translate-x-full
                         w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px]
                         border-t-transparent border-b-transparent border-r-black"></span>
      </div>

      {/* Widget menu (WhatsApp + Enquiry) */}
      <div
        className={`widget-menu flex flex-col items-center mb-3 transition-all duration-500 ease-in-out ${
          open
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-90 pointer-events-none"
        }`}
      >
        <div className="mb-4 transform scale-110">
          <WhatsAppFloat small />
        </div>
        <div className="transform scale-110">
          <EnquiryButton small />
        </div>
      </div>

      {/* Main Button */}
      <button
        ref={hoverRef}
        onMouseEnter={() => {
          hoverRef.current = true;
          setShowHint(true);
          hintTimeoutRef.current = setTimeout(() => setShowHint(false), 1200);
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
        }}
        className={`main-widget-btn w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center shadow-2xl hover:shadow-3xl transform transition-all duration-300 ${
          !open ? "animate-pulse" : "scale-95"
        } text-2xl`}
        onClick={handleToggle}
        aria-label="Support options"
      >
        🎧
      </button>

    </div>
  );
}
