"use client";

import { useState } from "react";
import EnquiryModal from "./EnquiryModal";

export default function EnquiryButton({ small }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center group">
      {/* Enquiry Button */}
      <button
        onClick={() => setOpen(true)}
        className={`
          ${small ? "w-12 h-12" : "w-14 h-14"}
          bg-blue-600
          text-white
          rounded-full
          flex items-center justify-center
          shadow-xl
          transition-transform duration-200
          hover:scale-110
        `}
        aria-label="Enquire Now"
      >
        {/* FORM-FILLING ICON (paper + pen) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${small ? "w-5 h-5" : "w-6 h-6"}`}
        >
          <path d="M3 3v18h18V7.828l-6-6H3zm13 1.414L20.586 9H16V4.414zM5 5h9v4h4v9H5V5zm7 2H7v2h5V7zm0 3H7v2h5v-2zm0 3H7v2h5v-2z" />
        </svg>
      </button>

      {/* Tooltip (now on top) */}
      <span
        className={`
          absolute
          bottom-full
          mb-3
          left-1/2
          -translate-x-1/2
          bg-gray-900
          text-white
          text-xs
          px-3
          py-1.5
          rounded-md
          opacity-0
          translate-y-2
          group-hover:opacity-100
          group-hover:translate-y-0
          transition-all
          duration-200
          whitespace-nowrap
          pointer-events-none
        `}
      >
        Enquire Now
      </span>

      {/* Enquiry Modal */}
      {open && <EnquiryModal onClose={() => setOpen(false)} />}
    </div>
  );
}
