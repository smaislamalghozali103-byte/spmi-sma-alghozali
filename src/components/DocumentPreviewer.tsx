import React, { useState, useEffect, useRef } from "react";
import { SPMIData } from "../types";
import { getTemplate } from "../data/templates";
import { generateDocx } from "../utils/docxUtils";
import { generateDocumentContent } from "../utils/documentGeneratorService";
import { StandarLulusanTable } from "./StandarLulusanTable";

export const DocumentPreviewer = ({
  identity,
  templateId,
  customTemplates,
}: {
  identity: SPMIData;
  templateId: string;
  customTemplates: Record<string, string>;
}) => {
  const [content, setContent] = useState<string>(() => {
    const cached = sessionStorage.getItem(`${templateId}-${JSON.stringify(identity)}`);
    return cached || customTemplates[templateId] || getTemplate(templateId, identity);
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customTemplates[templateId]) {
      setContent(customTemplates[templateId]);
      return;
    }

    const cacheKey = `${templateId}-${JSON.stringify(identity)}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setContent(cached);
      return;
    }

    setLoading(true);
    generateDocumentContent(templateId, identity)
      .then((newContent) => {
        sessionStorage.setItem(cacheKey, newContent);
        setContent(newContent);
        setLoading(false);
      })
      .catch((err) => {
        setContent(`Error: ${err.message}. Please note: You may have exceeded the daily API quota for document generation. Please try again later or limit your requests.`);
        setLoading(false);
      });
  }, [templateId, identity, customTemplates]);

  const lines = content.split('\n');

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">{templateId} {loading && "(Generating...)"}</h3>
        <button
          onClick={() => generateDocx(templateId, content)}
          className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
        >
          Download .docx
        </button>
      </div>
      <div className="bg-white shadow-lg mx-auto p-12 max-w-[210mm] min-h-[297mm] font-serif text-gray-900 leading-relaxed">
        {lines.map((line, i) => {
          if (line.includes("===")) {
            return <h1 key={i} className="text-2xl font-bold text-center my-6 border-b pb-2">{line.replace(/=/g, '').trim()}</h1>;
          }
          if (line.match(/^[A-Z\s]{5,}$/)) {
            return <h1 key={i} className="text-xl font-bold text-center my-4">{line.trim()}</h1>;
          }
          return <p key={i} className="mb-4 text-justify">{line}</p>;
        })}
        {templateId === "Standar Mutu" && <StandarLulusanTable />}
      </div>
    </div>
  );
};
