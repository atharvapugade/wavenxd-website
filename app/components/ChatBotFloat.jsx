"use client";

import { useEffect, useState } from "react";
import { Bot } from "lucide-react";

export default function ChatBotFloat({ small }) {
  const [retellReady, setRetellReady] = useState(false);

  useEffect(() => {
    // Poll until Retell SDK is fully ready
    const interval = setInterval(() => {
      if (window.Retell?.chat?.openChat) {
        setRetellReady(true);
        clearInterval(interval);
      }
    }, 200); // check every 200ms

    return () => clearInterval(interval);
  }, []);

  const handleOpenChat = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (retellReady) {
      window.Retell.chat.openChat({
        agent_id: process.env.NEXT_PUBLIC_RETELL_CHAT_AGENT_ID,
      });
    } else {
      console.warn("Retell Chat is still loading...");
    }
  };

  return (
    <button
      type="button"
      onClick={handleOpenChat}
      disabled={!retellReady}
      className={`chat-ai-btn ${small ? "w-12 h-12" : "w-14 h-14"} ${
        !retellReady ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-label="AI Assistant"
    >
      <Bot size={small ? 18 : 22} strokeWidth={1.8} />
    </button>
  );
}
