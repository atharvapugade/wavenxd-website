"use client";

import Image from "next/image";

export default function IndustryContent({ content }) {
  if (!content) {
    return <div className="text-gray-500">Select an application to view details.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Image */}
      <div className="w-full md:w-1/3">
        <Image src={content.image} alt={content.title} width={400} height={300} className="rounded-lg shadow-md" />
      </div>

      {/* Text & Technical Papers */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-3">{content.title}</h2>
          <p className="text-gray-700 leading-relaxed">{content.description}</p>
        </div>

        {content.technicalPapers && content.technicalPapers.length > 0 && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Technical Papers:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {content.technicalPapers.map((paper, idx) => (
                <li key={idx}>
                  <a
                    href={paper.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    {paper.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
