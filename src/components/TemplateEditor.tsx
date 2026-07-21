import { useState } from 'react';
import { ALL_TEMPLATE_IDS } from '../constants';
import { getTemplate } from '../data/templates';
import { SPMIData } from '../types';

export const TemplateEditor = ({
  identity,
  customTemplates,
  setCustomTemplates,
}: {
  identity: SPMIData;
  customTemplates: Record<string, string>;
  setCustomTemplates: (templates: Record<string, string>) => void;
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(ALL_TEMPLATE_IDS[0]);

  const handleUpdate = (content: string) => {
    setCustomTemplates({ ...customTemplates, [selectedTemplate]: content });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mt-8">
      <h2 className="text-xl font-semibold mb-4">Editor Template Dokumen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="p-2 border rounded"
        >
          {ALL_TEMPLATE_IDS.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
        <textarea
          className="w-full h-64 p-2 border rounded font-mono text-sm"
          value={customTemplates[selectedTemplate] || getTemplate(selectedTemplate, identity)}
          onChange={(e) => handleUpdate(e.target.value)}
        />
      </div>
    </div>
  );
};
