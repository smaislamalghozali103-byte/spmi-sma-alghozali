import React, { useState, useEffect } from "react";
import { Download, LoaderCircle } from 'lucide-react';
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

  const blocks = content.split(/(\[TABLE_START\][\s\S]*?\[TABLE_END\])/g).filter(Boolean);

  return (
    <section className="bg-slate-100/80 p-4 md:p-7 rounded-2xl border border-slate-200 shadow-inner">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5">
        <div><p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Pratinjau dokumen</p><h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">{templateId} {loading && <LoaderCircle className="w-4 h-4 animate-spin text-emerald-700" />}</h3></div>
        <button
          onClick={() => generateDocx(templateId, content)}
          className="px-4 py-2.5 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700"
        >
          <Download className="w-4 h-4" /> Unduh .docx
        </button>
      </div>
      <div className="bg-white shadow-lg mx-auto p-6 md:p-12 max-w-[210mm] min-h-[297mm] font-serif text-slate-900 leading-relaxed document-page">
        {blocks.map((block, blockIndex) => {
          if (block.startsWith('[TABLE_START]')) {
            const rows = block.replace('[TABLE_START]', '').replace('[TABLE_END]', '').trim().split('\n').map(row => row.replace('[TABLE_ROW]', '').split('|'));
            return <div key={blockIndex} className="my-5 overflow-x-auto"><table className="w-full min-w-[580px] border-collapse text-xs"><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex} className={rowIndex === 0 ? 'bg-slate-100 font-bold' : 'even:bg-slate-50'}>{row.map((cell, cellIndex) => <td key={cellIndex} className="border border-slate-300 px-2 py-2 align-top">{cell.trim()}</td>)}</tr>)}</tbody></table></div>;
          }
          return block.split('\n').map((line, i) => {
          if (line.includes("===")) {
            return <h1 key={`${blockIndex}-${i}`} className="text-2xl font-bold text-center my-6 border-b pb-2">{line.replace(/=/g, '').trim()}</h1>;
          }
          if (line.match(/^[A-Z\s]{5,}$/)) {
            return <h1 key={`${blockIndex}-${i}`} className="text-xl font-bold text-center my-4">{line.trim()}</h1>;
          }
          if (!line.trim()) return <div key={`${blockIndex}-${i}`} className="h-3" />;
          return <p key={`${blockIndex}-${i}`} className="mb-3 text-justify">{line}</p>;
          });
        })}
        {templateId === "Standar Mutu" && <StandarLulusanTable />}
      </div>
    </section>
  );
};
