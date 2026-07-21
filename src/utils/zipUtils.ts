import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getTemplate } from '../data/templates';
import { SPMIData } from '../types';
import { ALL_TEMPLATE_IDS } from '../constants';

export const generateZip = async (identity: SPMIData, customTemplates: Record<string, string>) => {
  const zip = new JSZip();

  ALL_TEMPLATE_IDS.forEach((id) => {
    const content = customTemplates[id] || getTemplate(id, identity);
    zip.file(`${id}.txt`, content);
  });

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'SPMI_Documents_2026.zip');
};
