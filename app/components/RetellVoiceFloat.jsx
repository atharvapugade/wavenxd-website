"use client";

import { useEffect, useState } from "react";
import { Mic2, PhoneOff } from "lucide-react";
import { RetellWebClient } from "retell-client-js-sdk";

export default function RetellVoiceFloat() {
  const [retellClient, setRetellClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const client = new RetellWebClient();
    setRetellClient(client);

    client.on("call_ended", () => {
      setIsCallActive(false);
      setIsSpeaking(false);
    });

    client.on("agent_start_talking", () => setIsSpeaking(true));
    client.on("agent_stop_talking", () => setIsSpeaking(false));

    client.on("error", (err) => {
      console.error("Error during call:", err);
      client.stopCall();
      setIsCallActive(false);
      setIsSpeaking(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isCallActive) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 4000);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isCallActive]);

  const handleVoiceCall = async () => {
    if (!retellClient) return;
    try {
      setLoading(true);
      const res = await fetch("/api/create-web-call", { method: "POST" });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      if (!data.access_token) throw new Error("No access token");
      await retellClient.startCall({
        accessToken: data.access_token,
        sampleRate: 24000,
      });
      setIsCallActive(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEndCall = () => {
    if (retellClient) {
      retellClient.stopCall();
      setIsCallActive(false);
      setIsSpeaking(false);
    }
  };

  return (
    <div
      className="fixed bottom-6 z-50 flex flex-col items-center"
      style={{ right: "90px" }}
    >
      <div className="relative flex flex-col items-center">
        {/* Popup */}
        {showPopup && !isCallActive && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium animate-fade-in-up whitespace-nowrap">
            👋 Hi! Need help? Click me!
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-600 rotate-45"></span>
          </div>
        )}

        {/* Start Call Button */}
        {!isCallActive && (
          <button
            onClick={handleVoiceCall}
            disabled={loading}
            aria-label="Voice AI"
            className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform duration-300 relative
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:scale-110 hover:shadow-purple-400/50"}
            `}
          >
            {/* Small waves behind the button */}
            {isSpeaking && (
              <>
                <span className="absolute w-12 h-12 bg-purple-400 rounded-full opacity-30 animate-wave z-0"></span>
                <span className="absolute w-16 h-16 bg-purple-400 rounded-full opacity-20 animate-wave delay-200 z-0"></span>
                <span className="absolute w-20 h-20 bg-purple-400 rounded-full opacity-10 animate-wave delay-400 z-0"></span>
              </>
            )}
            <Mic2 className="w-6 h-6 text-white z-10" />
          </button>
        )}

        {/* End Call Button */}
        {isCallActive && (
          <button
            onClick={handleEndCall}
            aria-label="End Call"
            className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center bg-red-600 hover:scale-110 hover:shadow-red-400/50 transition-transform duration-300 relative`}
          >
            <PhoneOff className="w-6 h-6 text-white z-10" />
            {/* Small waves behind the button while speaking */}
            {isSpeaking && (
              <>
                <span className="absolute w-12 h-12 bg-red-400 rounded-full opacity-30 animate-wave z-0"></span>
                <span className="absolute w-16 h-16 bg-red-400 rounded-full opacity-20 animate-wave delay-200 z-0"></span>
                <span className="absolute w-20 h-20 bg-red-400 rounded-full opacity-10 animate-wave delay-400 z-0"></span>
              </>
            )}
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }

        @keyframes wave {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .animate-wave { animation: wave 1.5s ease-out infinite; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}
