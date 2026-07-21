import { Folder, CheckCircle2, Download } from 'lucide-react';
import { ALL_TEMPLATE_IDS } from '../constants';
import { SPMIData } from '../types';
import { getTemplate } from '../data/templates';
import { generateDocx } from '../utils/docxUtils';
import { generateZip } from '../utils/zipUtils';

export const FolderStructure = ({ 
  generatedFolders, 
  identity, 
  customTemplates 
}: { 
  generatedFolders: string[], 
  identity: SPMIData, 
  customTemplates: Record<string, string> 
}) => {
  const allGenerated = generatedFolders.length === ALL_TEMPLATE_IDS.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Struktur Folder SPMI 2026</h2>
        <button
          onClick={() => generateZip(identity, customTemplates)}
          disabled={!allGenerated}
          className={`px-4 py-2 rounded flex items-center gap-2 ${
            allGenerated 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Download className="w-4 h-4" />
          Download All as ZIP
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ALL_TEMPLATE_IDS.map((folder, index) => {
          const isGenerated = generatedFolders.includes(folder);
          const content = customTemplates[folder] || getTemplate(folder, identity);
          return (
            <div key={index} className={`flex items-center justify-between p-3 rounded border transition ${isGenerated ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
              <div className='flex items-center space-x-2'>
                {isGenerated ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Folder className="w-5 h-5 text-blue-600" />}
                <span className={`text-sm font-medium ${isGenerated ? 'text-green-800' : 'text-gray-700'}`}>{folder}</span>
              </div>
              <button
                onClick={() => generateDocx(folder, content)}
                className="p-1 hover:bg-gray-200 rounded"
                title="Download"
              >
                <Download className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
