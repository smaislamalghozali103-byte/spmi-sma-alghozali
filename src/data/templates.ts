import { SPMIData } from '../types';
import { LANDASAN_HUKUM, SKL_CONTENT } from '../constants';

export const getTemplate = (id: string, data: SPMIData): string => {
  const date = new Date().toLocaleDateString('id-ID');
  
  const header = `${data.namaSekolah.toUpperCase()}\n\n`;
  const footer = `\n\nDitetapkan di: ${data.alamat}\nTanggal: ${date}\n\nKepala Sekolah,\n\n\n${data.kepalaSekolah}`;

  const volumes: Record<string, Record<string, string>> = {
    "Volume I: Dasar Penjaminan Mutu": {
      "SK Tim": `${header}KEPUTUSAN KEPALA SEKOLAH\nNOMOR: ...\n\nI. PENDAHULUAN\nTim Penjaminan Mutu Internal (TPMI) dibentuk untuk menjamin mutu pendidikan.\n\nII. LANDASAN HUKUM\n${LANDASAN_HUKUM}\n\nIII. PENETAPAN\nMenetapkan ${data.ketuaSPMI} sebagai Ketua Tim.\n\nIV. PENUTUP\nDemikian keputusan ini untuk dilaksanakan.${footer}`,
      "Manual SPMI": `${header}MANUAL SPMI\n\nI. PENDAHULUAN\nManual ini adalah acuan penyelenggaraan SPMI.\n\nII. LANDASAN HUKUM\n${LANDASAN_HUKUM}\n\nIII. VISI DAN MISI\nVisi: ${data.visi}\nMisi: ${data.misi}\n\nIV. STANDAR MUTU\n${data.programUnggulan}\n\nV. PPEPP\nPenetapan, Pelaksanaan, Evaluasi, Pengendalian, Peningkatan.${footer}`,
      "Kebijakan Mutu": `${header}KEBIJAKAN MUTU\n\nI. LATAR BELAKANG\nMenjamin peningkatan mutu berkelanjutan.\n\nII. TUJUAN\n${data.visi}\n\nIII. KEBIJAKAN\n${data.misi}\n\nIV. PENUTUP${footer}`,
      "Standar Mutu": `${header}STANDAR MUTU PENDIDIKAN\n\nI. PENDAHULUAN\nMatriks indikator dan target mutu.\n\nII. ISI STANDAR\n${SKL_CONTENT}\n\nIII. PENUTUP${footer}`
    },
    "Volume II: Evaluasi Diri & Pemetaan": {
      "Evaluasi Diri Sekolah": `${header}EVALUASI DIRI SEKOLAH (EDS)\n\nI. PROFIL\n${data.namaSekolah}\n\nII. ANALISIS\nData Siswa Juli 2025: ${data.dataSiswaJuli2025}\n\nIII. REKOMENDASI${footer}`,
      "Peta Mutu": `${header}PETA MUTU PENDIDIKAN\n\nI. ANALISIS KONDISI\nMasalah Utama: ${data.masalahUtama}\n\nII. PRIORITAS\nProgram: ...\n\nIII. PENUTUP${footer}`,
      "Analisis Rapor Pendidikan": `${header}ANALISIS RAPOR PENDIDIKAN\n\nI. HASIL ANALISIS\n...\n\nII. PENUTUP${footer}`
    },
    "Volume III: Rencana Kerja": {
      "RKT": `${header}RENCANA KERJA TAHUNAN (RKT) 2026\n\nI. PENDAHULUAN\nMasalah Utama: ${data.masalahUtama}\n\nII. PROGRAM\n${data.programUnggulan}\n\nIII. ANGGARAN\nRKAS\n\nIV. PENUTUP${footer}`,
      "RKJM": `${header}RENCANA KERJA JANGKA MENENGAH (RKJM) 2026-2030\n\nI. VISI & MISI\n${data.visi}\n${data.misi}\n\nII. ANALISIS SOAR\n...\n\nIII. STRATEGI\n...\n\nIV. PENUTUP${footer}`,
      "Program Perbaikan Mutu": `${header}PROGRAM PERBAIKAN MUTU\n\nI. FOKUS\n${data.masalahUtama}\n\nII. SASARAN\n...\n\nIII. PENUTUP${footer}`
    },
    "Volume IV: Operasional & Audit": {
      "SOP": `${header}STANDAR OPERASIONAL PROSEDUR\n\nI. TUJUAN\n...\n\nII. PROSEDUR\n...\n\nIII. PENUTUP${footer}`,
      "Monitoring": `${header}LAPORAN MONITORING\n\nI. HASIL MONITORING\n...\n\nII. PENUTUP${footer}`,
      "Evaluasi": `${header}LAPORAN EVALUASI\n\nI. HASIL EVALUASI\n...\n\nII. PENUTUP${footer}`,
      "Audit Mutu Internal": `${header}AUDIT MUTU INTERNAL\n\nI. TEMUAN AUDIT\n...\n\nII. TINDAK LANJUT\n...\n\nIII. PENUTUP${footer}`
    },
    "Volume V: Tindak Lanjut & Pelaporan": {
      "RTL": `${header}RENCANA TINDAK LANJUT (RTL)\n\nI. HASIL EVALUASI\n...\n\nII. RENCANA TINDAK LANJUT\n...\n\nIII. PENUTUP${footer}`,
      "Laporan SPMI": `${header}LAPORAN PELAKSANAAN SPMI\n\nI. PELAKSANAAN\n...\n\nII. HASIL\n...\n\nIII. PENUTUP${footer}`,
      "Berita Acara": `${header}BERITA ACARA RAPAT SPMI\n\nHari/Tanggal: ${date}\nAgenda: Evaluasi program.\n\nNotulis,\n\n\n[Nama]`,
      "Notulen": `${header}NOTULEN RAPAT\n\nI. AGENDA\n...\n\nII. HASIL RAPAT\n...\n\nIII. PENUTUP${footer}`,
      "Daftar Hadir": `${header}DAFTAR HADIR RAPAT\n\n[Daftar Hadir Terlampir]`
    },
    "Volume VI: Lampiran": {
      "Instrumen": `${header}INSTRUMEN SPMI\n\nFormulir dan instrumen pendukung SPMI.${footer}`,
      "Checklist": `${header}CHECKLIST SPMI\n\nChecklist kelengkapan dokumen dan kegiatan.${footer}`,
      "Bukti Fisik": `${header}BUKTI FISIK SPMI\n\nDokumentasi foto dan dokumen pendukung.`
    }
  };

  const allTemplates: Record<string, string> = {};
  Object.values(volumes).forEach(vol => Object.assign(allTemplates, vol));

  return allTemplates[id] || "Template not found.";
};

