"use client";

import Script from "next/script";

export default function RetellInit({ onReady }) {
  return (
    <Script
      id="retell-widget"
      src="https://dashboard.retellai.com/retell-widget.js"
      type="module"
      data-public-key={process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY}
      data-agent-id={process.env.NEXT_PUBLIC_RETELL_CHAT_AGENT_ID}
      strategy="afterInteractive"
      onLoad={() => {
        if (window.Retell?.chat) {
          window.Retell.chat.init({
            agent_id: process.env.NEXT_PUBLIC_RETELL_CHAT_AGENT_ID,
            hide_default_launcher: false,
          });
        }
        // Notify parent that SDK is loaded
        if (typeof onReady === "function") onReady();
      }}
    />
  );
}
