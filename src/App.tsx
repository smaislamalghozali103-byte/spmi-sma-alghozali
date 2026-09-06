/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { SPMIData } from './types';
import { SchoolIdentityForm } from './components/SchoolIdentityForm';
import { DocumentPreviewer } from './components/DocumentPreviewer';
import { FolderStructure } from './components/FolderStructure';
import { TemplateEditor } from './components/TemplateEditor';
import { SPMIKnowledgeBase } from './components/SPMIKnowledgeBase';
import { ALL_TEMPLATE_IDS } from './constants';
import { generateZip } from './utils/zipUtils';
import { BookOpen, FileSpreadsheet, FolderClosed, CloudUpload, LogOut, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { initAuth, googleSignIn, logout } from './lib/driveAuth';
import { saveToDrive } from './lib/driveService';

export default function App() {
  const [identity, setIdentity] = useState<SPMIData>({
    namaSekolah: 'SMA Islam Al-Ghozali',
    yayasan: 'Yayasan Pendidikan Islam Pondok Modern Al Ghozali',
    alamat: 'Jl. Raya Pendidikan No. 10, Purwokerto',
    npsn: '12345678',
    nss: '123456789012',
    akreditasi: 'A',
    kepalaSekolah: 'H. Ahmad Fauzi, M.Pd.',
    ketuaSPMI: 'Siti Aminah, S.Pd.',
    visi: 'Menjadi lembaga pendidikan Islam yang unggul, berkarakter, dan berdaya saing global berbasis teknologi.',
    misi: '1. Menyelenggarakan pendidikan Islam yang integratif. 2. Membentuk karakter siswa yang berakhlakul karimah. 3. Mengembangkan literasi digital berbasis nilai Islami.',
    programUnggulan: 'Program Tahfidz Quran, Kelas Digital, dan English Club.',
    masalahUtama: 'Masih rendahnya literasi digital siswa dan guru.',
    dataSiswaJuli2025: 'Jumlah siswa baru: 120 siswa. Total siswa: 450 siswa.',
  });

  const [customTemplates, setCustomTemplates] = useState<Record<string, string>>({});
  const [generatedFolders, setGeneratedFolders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'documents' | 'knowledge'>('documents');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      () => setIsAuthenticated(true),
      () => setIsAuthenticated(false)
    );
    const savedIdentity = localStorage.getItem('spmi_identity');
    const savedTemplates = localStorage.getItem('spmi_templates');
    try {
      if (savedIdentity) setIdentity(JSON.parse(savedIdentity));
      if (savedTemplates) setCustomTemplates(JSON.parse(savedTemplates));
    } catch {
      localStorage.removeItem('spmi_identity');
      localStorage.removeItem('spmi_templates');
    }
    return unsubscribe;
  }, []);

  const handleSaveToDrive = async () => {
    if (!isAuthenticated) {
      const signInResult = await googleSignIn();
      if (!signInResult) return;
      setIsAuthenticated(true);
    }
    
    setIsUploading(true);
    try {
      const content = JSON.stringify({ identity, customTemplates });
      const fileName = `SPMI_Data_${identity.namaSekolah}_${new Date().toISOString()}.json`;
      await saveToDrive(fileName, content);
      alert('Data berhasil disimpan ke Google Drive.');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan ke Google Drive.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerate = async () => {
    setGeneratedFolders(ALL_TEMPLATE_IDS);
    await generateZip(identity, customTemplates);
  };

  const [activeDoc, setActiveDoc] = useState('SK Tim');

  const volumes = {
    "Volume I: Dasar Penjaminan Mutu": ["SK Tim", "Manual SPMI", "Kebijakan Mutu", "Standar Mutu"],
    "Volume II: Evaluasi Diri & Pemetaan": ["Evaluasi Diri Sekolah", "Peta Mutu", "Analisis Rapor Pendidikan"],
    "Volume III: Rencana Kerja": ["RKT", "RKJM", "Program Perbaikan Mutu"],
    "Volume IV: Operasional & Audit": ["SOP", "Monitoring", "Evaluasi", "Audit Mutu Internal"],
    "Volume V: Tindak Lanjut & Pelaporan": ["RTL", "Laporan SPMI", "Berita Acara", "Notulen", "Daftar Hadir"],
    "Volume VI: Lampiran": ["Instrumen", "Checklist", "Bukti Fisik"]
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Header Panel */}
      <header className="max-w-7xl mx-auto mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="spmi-header p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800 bg-white/70 px-3 py-1.5 rounded-full"><Sparkles className="w-3.5 h-3.5" /> Sistem Penjaminan Mutu Internal</span>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-950 tracking-tight mt-3">Ruang Kerja Mutu 2026</h1>
          <p className="text-sm text-slate-600 mt-2">{identity.namaSekolah} <span className="mx-1 text-emerald-600">•</span> {identity.yayasan}</p>
        </div>
        
        {/* Tab Navigator */}
        <div className="flex bg-white/70 p-1.5 rounded-xl border border-white/80 self-start md:self-auto shadow-sm">
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition ${activeTab === 'documents' ? 'bg-white text-gray-950 shadow-sm font-bold' : 'text-gray-500 hover:text-gray-950'}`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Dokumen &amp; Generator SPMI
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition ${activeTab === 'knowledge' ? 'bg-white text-gray-950 shadow-sm font-bold' : 'text-gray-500 hover:text-gray-950'}`}
          >
            <BookOpen className="w-4 h-4" />
            Pusat Referensi &amp; Pengetahuan
          </button>
        </div>
      </div></header>

      <div className="max-w-7xl mx-auto">
        {activeTab === 'documents' ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <aside className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
                  <FolderClosed className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-gray-800 text-sm">Daftar Buku &amp; Dokumen</h3>
                </div>
                <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
                  {Object.entries(volumes).map(([volName, docs]) => (
                    <div key={volName} className="space-y-1">
                      <h4 className="font-bold text-xs text-gray-400 tracking-wider uppercase">{volName}</h4>
                      <div className="flex flex-col pl-1 space-y-0.5">
                        {docs.map(doc => (
                          <button 
                            key={doc} 
                            onClick={() => setActiveDoc(doc)} 
                            className={`w-full text-left px-2 py-1.5 rounded text-xs transition ${
                              activeDoc === doc 
                                ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-950'
                            }`}
                          >
                            {doc}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>

              <div className="lg:col-span-3">
                <DocumentPreviewer identity={identity} templateId={activeDoc} customTemplates={customTemplates} />
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <SchoolIdentityForm identity={identity} onChange={setIdentity} />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      localStorage.setItem('spmi_identity', JSON.stringify(identity));
                      localStorage.setItem('spmi_templates', JSON.stringify(customTemplates));
                      alert('Data berhasil disimpan ke penyimpanan lokal.');
                    }}
                    className="w-full py-3 flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Simpan Lokal
                  </button>
                  <button
                    onClick={handleSaveToDrive}
                    disabled={isUploading}
                    className={`w-full py-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition ${
                      isAuthenticated 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                    }`}
                  >
                    <CloudUpload className="w-5 h-5" />
                    {isUploading ? 'Menyimpan...' : isAuthenticated ? 'Simpan ke Drive' : 'Login & Simpan Drive'}
                  </button>
                </div>
                {isAuthenticated && (
                  <button 
                    onClick={logout}
                    className="w-full py-2 flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-gray-900 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar dari Google Drive
                  </button>
                )}
                <TemplateEditor identity={identity} customTemplates={customTemplates} setCustomTemplates={setCustomTemplates} />
              </div>
              <div className="lg:col-span-1">
                <button onClick={handleGenerate} className="mb-4 w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Siapkan semua dokumen (.zip)
                </button>
                <FolderStructure 
                  generatedFolders={generatedFolders.length === 0 ? [activeDoc] : generatedFolders} 
                  identity={identity} 
                  customTemplates={customTemplates} 
                />
              </div>
            </div>
          </>
        ) : (
          <SPMIKnowledgeBase />
        )}
      </div>
    </div>
  );
}
