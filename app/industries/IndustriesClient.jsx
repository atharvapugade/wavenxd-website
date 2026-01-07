"use client";

import { useState } from "react";
import IndustriesTop from "./IndustriesTop";
import IndustryContent from "./IndustryContent";
import { industriesData } from "./industriesData";

export default function IndustriesClient() {
  // Start with the first industry selected by default to avoid null rendering
  const firstIndustryKey = Object.keys(industriesData)[0];
  const firstApplicationKey = Object.keys(
    industriesData[firstIndustryKey].items
  )[0];

  const [selectedContent, setSelectedContent] = useState(
    industriesData[firstIndustryKey]?.items[firstApplicationKey] || null
  );

  const handleSelect = (industryKey, applicationKey) => {
    const content = industriesData[industryKey]?.items[applicationKey];
    setSelectedContent(content);
  };

  return (
    <div className="w-full">
      {/* Top industry selector */}
      <IndustriesTop onSelect={handleSelect} />

      {/* Industry details */}
      <div className="mt-10">
        <IndustryContent content={selectedContent} />
      </div>
    </div>
  );
}
