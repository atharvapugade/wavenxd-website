"use client";

import { useEffect } from "react";

export default function CDWidget() {
  useEffect(() => {
    if (window.chatWidgetScriptLoaded) return;

    window.ChatWidgetConfig = {
      agentId: "69832dd0ff813f716e2dbcc7",
    };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://storage.googleapis.com/cdwidget/dist/assets/js/main.js";
    document.body.appendChild(script);

    window.chatWidgetScriptLoaded = true;

    return () => {
      // Optional cleanup: remove script if needed
      // document.body.removeChild(script);
    };
  }, []);

  return <div id="cd-widget"></div>;
}
