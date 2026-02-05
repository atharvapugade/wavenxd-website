"use client";

export default function WhatsAppFloat({ small }) {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = encodeURIComponent(
    "Hello WaveNxD Team, I would like to know more about your products."
  );

  return (
    <div className="relative group flex items-center">
      <a
        href={`https://wa.me/91${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`${
          small ? "w-12 h-12" : "w-14 h-14"
        } bg-[#25D366] rounded-full shadow-xl flex items-center justify-center transition-transform duration-200 hover:scale-110`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className={`${small ? "w-6 h-6" : "w-7 h-7"}`}
          fill="white"
        >
          <path d="M19.11 17.41c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.97 2.63 1.11 2.81c.14.18 1.91 2.91 4.63 4.08.65.28 1.16.45 1.56.57.66.21 1.27.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16.01 3C8.84 3 3 8.84 3 16c0 2.53.74 5 2.14 7.11L3 29l6.06-2.01A12.9 12.9 0 0016.01 29C23.16 29 29 23.16 29 16S23.16 3 16.01 3zm0 23.7c-2.09 0-4.14-.56-5.92-1.63l-.42-.25-3.6 1.2 1.17-3.51-.27-.45A10.69 10.69 0 015.31 16c0-5.9 4.8-10.7 10.7-10.7 5.9 0 10.69 4.8 10.69 10.7 0 5.9-4.79 10.7-10.69 10.7z" />
        </svg>
      </a>

      <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap pointer-events-none">
        Chat on WhatsApp
      </span>
    </div>
  );
}
