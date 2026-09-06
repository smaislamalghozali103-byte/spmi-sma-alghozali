import { Building2 } from 'lucide-react';
import { SPMIData } from "../types";

export const SchoolIdentityForm = ({
  identity,
  onChange,
}: {
  identity: SPMIData;
  onChange: (identity: SPMIData) => void;
}) => {
  const fields: (keyof SPMIData)[] = ["namaSekolah", "yayasan", "alamat", "npsn", "nss", "akreditasi", "kepalaSekolah", "ketuaSPMI", "visi", "misi", "programUnggulan", "masalahUtama", "dataSiswaJuli2025"];
  
  const helpers: Record<keyof SPMIData, string> = {
    namaSekolah: "Contoh: SMA Islam Al-Ghozali",
    yayasan: "Contoh: Yayasan Pendidikan Islam Pondok Modern Al Ghozali",
    alamat: "Contoh: Jl. Pendidikan No. 1, Kota",
    npsn: "Contoh: 12345678",
    nss: "Contoh: 123456789012",
    akreditasi: "Contoh: A",
    kepalaSekolah: "Contoh: Dr. Ahmad, M.Pd.",
    ketuaSPMI: "Contoh: Budi, S.Pd.",
    visi: "Contoh: Terwujudnya lulusan berakhlakul karimah dan berprestasi.",
    misi: "Contoh: Menyelenggarakan pendidikan berbasis nilai Islami.",
    programUnggulan: "Contoh: Tahfidz Al-Qur'an dan Kelas Internasional",
    masalahUtama: "Contoh: Rendahnya kemampuan literasi numerasi siswa.",
    dataSiswaJuli2025: "Contoh: 120 siswa baru, 450 total siswa."
  };
  
  return (
    <section className="space-y-5 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div><h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Building2 className="w-5 h-5 text-emerald-700" /> Profil sekolah</h2><p className="text-sm text-slate-500 mt-1">Data ini otomatis dipakai pada seluruh dokumen yang dihasilkan.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map(field => (
        <label key={field} className={['visi', 'misi', 'programUnggulan', 'masalahUtama', 'dataSiswaJuli2025'].includes(field) ? 'md:col-span-2' : ''}>
          <span className="mb-1.5 block text-xs font-bold text-slate-700">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</span>
          {['visi', 'misi', 'programUnggulan', 'masalahUtama', 'dataSiswaJuli2025'].includes(field) ? <textarea
            rows={3}
            placeholder={helpers[field]}
            value={identity[field]}
            onChange={(e) => onChange({ ...identity, [field]: e.target.value })}
            className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
          /> : <input
            placeholder={helpers[field]}
            value={identity[field]}
            onChange={(e) => onChange({ ...identity, [field]: e.target.value })}
            className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
          />}
        </label>
      ))}
      </div></section>
  );
};
