import React, { useState } from 'react';
import { BookOpen, FileText, CheckSquare, Award, Star, ListCollapse, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface ReferenceDoc {
  id: string;
  title: string;
  category: 'regulasi' | 'alghozali' | 'akademis';
  source: string;
  summary: string;
  keyPoints: string[];
}

export const SPMIKnowledgeBase = () => {
  const [selectedDocId, setSelectedDocId] = useState<string>('ghozali-skl');
  const [searchTerm, setSearchTerm] = useState('');

  const references: ReferenceDoc[] = [
    {
      id: 'ghozali-skl',
      title: 'Laporan Capaian SKL SMA Islam Al-Ghozali',
      category: 'alghozali',
      source: 'Yayasan Pendidikan Islam Al-Ghozali (2026)',
      summary: 'Standar Kelulusan (SKL) yang dirancang khusus untuk mengintegrasikan aspek akademik nasional dengan pembiasaan keagamaan khas pesantren (Syari’ah, Kauniyah, dan Nafi’ah).',
      keyPoints: [
        'Bidang Syari’ah menitikberatkan pada kefasihan membaca Al-Qur’an, tajwid mendalam, fiqih muamalah, dan hafalan minimal 5 Juz.',
        'Bidang Kauniyah berfokus pada kecakapan riset (KTI), penguasaan matematika/kalkulus, pidato dwibahasa (Arab/Inggris), serta kesiapan masuk PTN.',
        'Bidang Nafi’ah berorientasi pada soft skill masa depan, kepemimpinan organisasi, serta keahlian praktis.'
      ]
    },
    {
      id: 'ghozali-spmi',
      title: 'Buku Induk SPMI SMA Islam Al-Ghozali',
      category: 'alghozali',
      source: 'Buku Induk SPMI-AG/2026/SKL/VOL-I',
      summary: 'Panduan operasional dan yuridis tertinggi di tingkat sekolah yang memetakan siklus PPEPP secara mandiri untuk mengawal target kelulusan.',
      keyPoints: [
        'Visi 2030: Generasi Islami, Berprestasi Akademik Tinggi, Menguasai Teknologi, dan Berwawasan Lingkungan.',
        'Siklus PPEPP: Penetapan target SKL tahunan, Pelaksanaan kurikulum khas, Evaluasi (EDS & Rapor Pendidikan), Pengendalian (tindakan korektif gap capaian), Peningkatan (Continuous Quality Improvement).',
        'Struktur organisasi penjaminan mutu berjenjang dari LJM (tingkat yayasan/institusi), GKM (Gugus Kendali Mutu tingkat fakultas/bidang), hingga UKM (Unit Kendali Mutu tingkat prodi/jurusan).'
      ]
    },
    {
      id: 'jejangkit-study',
      title: 'Implementasi SPMI SMAN 1 Jejangkit',
      category: 'akademis',
      source: 'Jurnal Ilmiah Manajemen dan Kewirausahaan (2025)',
      summary: 'Penelitian kualitatif deskriptif mengenai efektivitas SPMI di SMAN 1 Jejangkit dalam menumbuhkan budaya mutu sekolah secara terstruktur.',
      keyPoints: [
        'Penerapan strategi "Whole School Approach" yang melibatkan kepala sekolah, guru, staf, siswa, dan orang tua dalam tim penjamin mutu (TPMPS).',
        'Kebijakan wajib In-House Training (IHT) minimal 2 kali setahun bagi seluruh pendidik guna meningkatkan kompetensi profesional.',
        'Tantangan utama berupa keterbatasan sumber daya fisik/digital dan resistensi terhadap perubahan kurikulum nasional.'
      ]
    },
    {
      id: 'bandung-study',
      title: 'Optimalisasi Program Pelatihan dan Pembiasaan SMPN 9 Bandung',
      category: 'akademis',
      source: 'UPI - Jurnal Dinamika Pembelajaran (2025)',
      summary: 'Kajian komprehensif mengenai sinergi antara pelatihan teknis pendidik (IT, pedagogi berbasis kebutuhan) dengan program pembiasaan harian siswa.',
      keyPoints: [
        'Program pembiasaan terbagi menjadi mutlak (Upacara Senin, Jumat Keagamaan) dan rutinan bergilir (Kebersihan, Literasi, Olahraga).',
        'Pemanfaatan teknologi ramah kuota melalui Google Form untuk memetakan gaya belajar (audio, visual, kinestetik) dan ujian Computer-Based Test (CBT) offline.',
        'Pentingnya partisipasi masyarakat (komite sekolah dan orang tua) untuk mendukung pendanaan Proyek Penguatan Profil Pelajar Pancasila (P5).'
      ]
    },
    {
      id: 'reg-53-2023',
      title: 'Permendikbudristek No. 53 Tahun 2023',
      category: 'regulasi',
      source: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI',
      summary: 'Regulasi penjaminan mutu pendidikan tinggi dan sekolah yang mendesentralisasikan standar minimal mutu agar satuan pendidikan lebih fleksibel dan adaptif.',
      keyPoints: [
        'Menetapkan 14 Standar Nasional yang dikelompokkan ke dalam standar luaran, standar proses, dan standar masukan.',
        'Siklus SPMI (PPEPP) harus diintegrasikan langsung ke dalam tata kelola manajemen harian sekolah/perguruan tinggi.',
        'Pelaporan berkala melalui pangkalan data terintegrasi (PD Dikti atau sistem manajemen sekolah) sebagai bukti keabsahan akreditasi.'
      ]
    },
    {
      id: 'reg-28-2016',
      title: 'Permendikbud No. 28 Tahun 2016',
      category: 'regulasi',
      source: 'Salinan Peraturan Menteri Pendidikan RI',
      summary: 'Dasar hukum pengembangan Sistem Penjaminan Mutu Pendidikan Dasar dan Menengah yang memisahkan fungsi penjaminan mutu internal (SPMI) dan eksternal (SPME/Akreditasi).',
      keyPoints: [
        'Setiap satuan pendidikan wajib memiliki sistem mandiri untuk merencanakan, melaksanakan, mengendalikan, dan meningkatkan mutu.',
        'Mendorong kolaborasi dengan Lembaga Penjaminan Mutu Pendidikan (LPMP) di tingkat provinsi.',
        'Keberhasilan SPMI diukur dari tumbuhnya budaya mutu secara mandiri tanpa ketergantungan pada pengawasan eksternal.'
      ]
    }
  ];

  const filteredReferences = references.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeDoc = references.find(doc => doc.id === selectedDocId) || references[0];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]" id="spmi-knowledge-center">
      {/* Sidebar List */}
      <div className="w-full md:w-80 border-r border-gray-200 bg-gray-50 p-4 flex flex-col space-y-4">
        <div>
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Pusat Referensi SPMI
          </h3>
          <p className="text-xs text-gray-500 mt-1">Dokumen rujukan nasional, akademis, dan integrasi Al-Ghozali</p>
        </div>

        <input 
          type="text"
          placeholder="Cari referensi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[450px]">
          {/* Group 1: Al-Ghozali Core */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Kekhasan Al-Ghozali</span>
            <div className="space-y-1 mt-1">
              {filteredReferences.filter(r => r.category === 'alghozali').map(doc => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-2 rounded text-xs transition ${selectedDocId === doc.id ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'hover:bg-gray-200 text-gray-700'}`}
                >
                  {doc.title}
                </button>
              ))}
            </div>
          </div>

          {/* Group 2: Regulasi */}
          <div className="pt-2">
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Regulasi Nasional</span>
            <div className="space-y-1 mt-1">
              {filteredReferences.filter(r => r.category === 'regulasi').map(doc => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-2 rounded text-xs transition ${selectedDocId === doc.id ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'hover:bg-gray-200 text-gray-700'}`}
                >
                  {doc.title}
                </button>
              ))}
            </div>
          </div>

          {/* Group 3: Akademis */}
          <div className="pt-2">
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Kajian & Best Practices</span>
            <div className="space-y-1 mt-1">
              {filteredReferences.filter(r => r.category === 'akademis').map(doc => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-2 rounded text-xs transition ${selectedDocId === doc.id ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'hover:bg-gray-200 text-gray-700'}`}
                >
                  {doc.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto max-h-[650px] bg-white">
        <div className="border-b border-gray-100 pb-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              activeDoc.category === 'alghozali' ? 'bg-emerald-100 text-green-800' :
              activeDoc.category === 'regulasi' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
            }`}>
              {activeDoc.category === 'alghozali' ? 'Kekhasan Al-Ghozali' :
               activeDoc.category === 'regulasi' ? 'Regulasi Pemerintah' : 'Kajian Praktik Baik'}
            </span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-500 font-mono">{activeDoc.source}</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">{activeDoc.title}</h2>
        </div>

        <div className="prose max-w-none text-sm text-gray-600 space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Ringkasan Dokumen</h4>
            <p className="text-gray-700 leading-relaxed bg-indigo-50/40 p-3 rounded-lg border border-indigo-100/50">{activeDoc.summary}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Poin-Poin Kunci</h4>
            <ul className="space-y-2">
              {activeDoc.keyPoints.map((point, idx) => (
                <li key={idx} className="flex gap-2 items-start text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">{idx + 1}</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conditional Rendering for Special Word Tables */}
          {activeDoc.id === 'ghozali-skl' && (
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Tampilan Format Laporan Capaian SKL (Gaya Dokumen Word)</h4>
              
              {/* Syari'ah Table */}
              <div className="mb-6">
                <h5 className="font-bold text-sm text-indigo-900 mb-2">I. BIDANG SYARI’AH</h5>
                <table className="w-full border-collapse border border-gray-400 text-xs">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-400 px-3 py-2 text-center w-12">No</th>
                      <th className="border border-gray-400 px-3 py-2 text-left">Indikator Kompetensi</th>
                      <th className="border border-gray-400 px-3 py-2 text-center w-24">Status</th>
                      <th className="border border-gray-400 px-3 py-2 text-left">Catatan (Hafalan/Pemahaman)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">1</td>
                      <td className="border border-gray-400 px-3 py-2">Mampu membaca Al-Qur’an dengan fasih</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-gray-400">[ Belum Diisi ]</td>
                      <td className="border border-gray-400 px-3 py-2 text-gray-400">Standar tajwid dasar...</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">2</td>
                      <td className="border border-gray-400 px-3 py-2">Menguasai ilmu tajwid secara mendalam</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-gray-400">[ Belum Diisi ]</td>
                      <td className="border border-gray-400 px-3 py-2 text-gray-400">Makharijul huruf & sifatul huruf...</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">3</td>
                      <td className="border border-gray-400 px-3 py-2">Memahami Fiqih Mu’amalah (tata cara transaksi/sosial)</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-gray-400">[ Belum Diisi ]</td>
                      <td className="border border-gray-400 px-3 py-2 text-gray-400">Prinsip akad syariah & jual-beli...</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">4</td>
                      <td className="border border-gray-400 px-3 py-2">Hafalan 5 Juz (Juz 27, 28, 29, 30, dan 1)</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-gray-400">[ Belum Diisi ]</td>
                      <td className="border border-gray-400 px-3 py-2 text-gray-400">Setoran hafalan terjadwal...</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Kauniyah Table */}
              <div className="mb-6">
                <h5 className="font-bold text-sm text-indigo-900 mb-2">II. BIDANG KAUNIYAH</h5>
                <table className="w-full border-collapse border border-gray-400 text-xs">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-400 px-3 py-2 text-center w-12">No</th>
                      <th className="border border-gray-400 px-3 py-2 text-left">Indikator Kompetensi</th>
                      <th className="border border-gray-400 px-3 py-2 text-center w-24">Status</th>
                      <th className="border border-gray-400 px-3 py-2 text-left">Catatan (Nilai/Karya)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">1</td>
                      <td className="border border-gray-400 px-3 py-2">Mampu membuat Karya Tulis Ilmiah (KTI)</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-gray-400">[ Belum Diisi ]</td>
                      <td className="border border-gray-400 px-3 py-2 text-gray-400">Sistematika penulisan & orisinalitas...</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">2</td>
                      <td className="border border-gray-400 px-3 py-2">Menguasai kemampuan numerik dan kalkulus</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-gray-400">[ Belum Diisi ]</td>
                      <td className="border border-gray-400 px-3 py-2 text-gray-400">Limit, diferensial, & integrasi dasar...</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">3</td>
                      <td className="border border-gray-400 px-3 py-2">Berpidato & menulis teks dalam Bahasa Arab</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-gray-400">[ Belum Diisi ]</td>
                      <td className="border border-gray-400 px-3 py-2 text-gray-400">Pidato (khutbah/muhadharah)...</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">4</td>
                      <td className="border border-gray-400 px-3 py-2">Berpidato & menulis teks dalam Bahasa Inggris</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-gray-400">[ Belum Diisi ]</td>
                      <td className="border border-gray-400 px-3 py-2 text-gray-400">Public speaking & essay writing...</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">5</td>
                      <td className="border border-gray-400 px-3 py-2">Mencapai KKM & kesiapan Ujian Masuk PTN</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-gray-400">[ Belum Diisi ]</td>
                      <td className="border border-gray-400 px-3 py-2 text-gray-400">Hasil tryout UTBK-SNBT...</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Nafi'ah Table */}
              <div>
                <h5 className="font-bold text-sm text-indigo-900 mb-2">III. BIDANG NAFI’AH</h5>
                <table className="w-full border-collapse border border-gray-400 text-xs">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-400 px-3 py-2 text-center w-12">No</th>
                      <th className="border border-gray-400 px-3 py-2 text-left">Indikator Kompetensi</th>
                      <th className="border border-gray-400 px-3 py-2 text-center w-24">Status</th>
                      <th className="border border-gray-400 px-3 py-2 text-left">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">1</td>
                      <td className="border border-gray-400 px-3 py-2">Memiliki kemampuan berorganisasi yang baik</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-gray-400">[ Belum Diisi ]</td>
                      <td className="border border-gray-400 px-3 py-2 text-gray-400">Keterlibatan OSIS, Pramuka, atau IRM...</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">2</td>
                      <td className="border border-gray-400 px-3 py-2">Menguasai keterampilan masa depan (Hard Skill)</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-gray-400">[ Belum Diisi ]</td>
                      <td className="border border-gray-400 px-3 py-2 text-gray-400">Pemrograman dasar, desain grafis, robotika...</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 text-center">3</td>
                      <td className="border border-gray-400 px-3 py-2">Menguasai keterampilan masa depan (Soft Skill)</td>
                      <td className="border border-gray-400 px-3 py-2 text-center text-gray-400">[ Belum Diisi ]</td>
                      <td className="border border-gray-400 px-3 py-2 text-gray-400">Komunikasi, kolaborasi, problem solving...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeDoc.id === 'ghozali-spmi' && (
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Tampilan Matriks Sasaran Mutu 2026 (Gaya Dokumen Word)</h4>
              <table className="w-full border-collapse border border-gray-400 text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 px-2 py-1.5 text-center w-10">No</th>
                    <th className="border border-gray-400 px-2 py-1.5 text-left w-32">Bidang Operasional</th>
                    <th className="border border-gray-400 px-2 py-1.5 text-left">Indikator Mutu Utama (KPI)</th>
                    <th className="border border-gray-400 px-2 py-1.5 text-center w-40">Target Capaian</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1.5 text-center">1</td>
                    <td className="border border-gray-400 px-2 py-1.5 font-medium">Akademik</td>
                    <td className="border border-gray-400 px-2 py-1.5">Persentase kelulusan peserta didik kelas XII dari satuan pendidikan</td>
                    <td className="border border-gray-400 px-2 py-1.5 text-center bg-green-50 text-green-800 font-semibold">100% Lulus</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1.5 text-center">2</td>
                    <td className="border border-gray-400 px-2 py-1.5 font-medium">SDM (Pendidik)</td>
                    <td className="border border-gray-400 px-2 py-1.5">Tingkat persentase kehadiran guru dalam KBM di kelas</td>
                    <td className="border border-gray-400 px-2 py-1.5 text-center">&ge; 95% Kehadiran</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1.5 text-center">3</td>
                    <td className="border border-gray-400 px-2 py-1.5 font-medium">Kesiswaan</td>
                    <td className="border border-gray-400 px-2 py-1.5">Tingkat persentase kehadiran siswa dalam seluruh aktivitas sekolah</td>
                    <td className="border border-gray-400 px-2 py-1.5 text-center">&ge; 95% Kehadiran</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1.5 text-center">4</td>
                    <td className="border border-gray-400 px-2 py-1.5 font-medium">SDM (Pendidik)</td>
                    <td className="border border-gray-400 px-2 py-1.5">Kelengkapan dokumen administrasi perangkat pembelajaran (Modul Ajar, ATP, Prota, Promes)</td>
                    <td className="border border-gray-400 px-2 py-1.5 text-center font-semibold">100% Lengkap &amp; Tervalidasi</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1.5 text-center">5</td>
                    <td className="border border-gray-400 px-2 py-1.5 font-medium">Akademik</td>
                    <td className="border border-gray-400 px-2 py-1.5">Pelaksanaan supervisi akademik klinis oleh Kepala Sekolah kepada guru</td>
                    <td className="border border-gray-400 px-2 py-1.5 text-center">Minimal 2 Kali / Tahun / Guru</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1.5 text-center">6</td>
                    <td className="border border-gray-400 px-2 py-1.5 font-medium">Penjaminan Mutu</td>
                    <td className="border border-gray-400 px-2 py-1.5">Pelaksanaan monitoring evaluasi internal program kerja strategis</td>
                    <td className="border border-gray-400 px-2 py-1.5 text-center">Minimal 2 Kali / Tahun</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1.5 text-center">7</td>
                    <td className="border border-gray-400 px-2 py-1.5 font-medium">Penjaminan Mutu</td>
                    <td className="border border-gray-400 px-2 py-1.5">Pelaksanaan Audit Mutu Internal (AMI) secara menyeluruh oleh TPMPS</td>
                    <td className="border border-gray-400 px-2 py-1.5 text-center">Minimal 1 Kali / Tahun</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
