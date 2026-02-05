"use client";

import { useState } from "react";
import RetellVoiceFloat from "./../components/RetellVoiceFloat";
import RetellInit from "./../components/RetellInit";
import CDWidget from "./../components/CDWidget";

export default function WidgetWrapper() {
  const [sdkReady, setSdkReady] = useState(false);

  return (
    <>
      {/* Initialize Retell Chat SDK */}
      <RetellInit onReady={() => setSdkReady(true)} />

      {/* CD Widget Chat */}
      <CDWidget />

      {/* Voice AI Button */}
      <RetellVoiceFloat sdkReady={sdkReady} />
    </>
  );
}
