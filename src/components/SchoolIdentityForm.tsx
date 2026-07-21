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
    <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold">Identitas & Data SPMI</h2>
      {fields.map(field => (
        <div key={field}>
          <input
            placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
            value={identity[field]}
            onChange={(e) => onChange({ ...identity, [field]: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <p className="text-xs text-gray-500 mt-1">{helpers[field]}</p>
        </div>
      ))}
    </div>
  );
};
