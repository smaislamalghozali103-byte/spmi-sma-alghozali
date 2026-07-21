import React from 'react';

const TableWrapper = ({ title, headers, rows }: { title: string, headers: string[], rows: string[][] }) => (
  <div className="my-6">
    <h4 className="font-bold mb-2 text-gray-800">{title}</h4>
    <table className="w-full border-collapse border border-gray-600 text-sm">
      <thead>
        <tr className="bg-gray-100">
          {headers.map((h, i) => (
            <th key={i} className="border border-gray-600 p-2 text-left text-gray-900">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} className="border border-gray-600 p-2 text-gray-700">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const StandarLulusanTable = () => {
  const syariahRows = [
    ["1", "Mampu membaca Al-Qur’an dengan fasih", "", ""],
    ["2", "Menguasai ilmu tajwid secara mendalam", "", ""],
    ["3", "Memahami Fiqih Mu’amalah (tata cara transaksi/sosial)", "", ""],
    ["4", "Hafalan 5 Juz (Juz 27, 28, 29, 30, dan 1)", "", ""],
  ];
  const kauniyahRows = [
    ["1", "Mampu membuat Karya Tulis Ilmiah (KTI)", "", ""],
    ["2", "Menguasai kemampuan numerik dan kalkulus", "", ""],
    ["3", "Berpidato & menulis teks dalam Bahasa Arab", "", ""],
    ["4", "Berpidato & menulis teks dalam Bahasa Inggris", "", ""],
    ["5", "Mencapai KKM & kesiapan Ujian Masuk PTN", "", ""],
  ];
  const nafiahRows = [
    ["1", "Memiliki kemampuan berorganisasi yang baik", "", ""],
    ["2", "Menguasai keterampilan masa depan (Hard Skill)", "", ""],
    ["3", "Menguasai keterampilan masa depan (Soft Skill)", "", ""],
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-300 pb-2">Lulusan SMA Islam Al-Ghozali</h2>
      <TableWrapper title="I. BIDANG SYARI’AH" headers={["No", "Indikator Kompetensi", "Status", "Catatan (Hafalan/Pemahaman)"]} rows={syariahRows} />
      <TableWrapper title="II. BIDANG KAUNIYAH" headers={["No", "Indikator Kompetensi", "Status", "Catatan (Nilai/Karya)"]} rows={kauniyahRows} />
      <TableWrapper title="III. BIDANG NAFI’AH" headers={["No", "Indikator Kompetensi", "Status", "Keterangan"]} rows={nafiahRows} />
    </div>
  );
};
