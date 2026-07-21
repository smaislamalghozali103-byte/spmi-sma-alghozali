import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  app.use(express.json());

  app.post("/api/generate-document", async (req, res) => {
    const { templateId, data } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key is missing" });
    }

    const prompt = `
      Generate a professional, full-length document content for the template: "${templateId}".
      Use the following school identity as the basis:
      School Name: ${data.namaSekolah}
      Vision: ${data.visi}
      Mission: ${data.misi}
      Program Unggulan: ${data.programUnggulan}
      Masalah Utama: ${data.masalahUtama}

      MANDATORY GRADUATION STANDARDS:
      All graduates of SMA Islam Al-Ghozali must meet the following standards, which MUST be included as tables in relevant curriculum or quality documents:

      I. BIDANG SYARI’AH
      | No | Indikator Kompetensi | Status | Catatan (Hafalan/Pemahaman) |
      |:---|:---|:---|:---|
      | 1 | Mampu membaca Al-Qur’an dengan fasih | | |
      | 2 | Menguasai ilmu tajwid secara mendalam | | |
      | 3 | Memahami Fiqih Mu’amalah (tata cara transaksi/sosial) | | |
      | 4 | Hafalan 5 Juz (Juz 27, 28, 29, 30, dan 1) | | |

      II. BIDANG KAUNIYAH
      | No | Indikator Kompetensi | Status | Catatan (Nilai/Karya) |
      |:---|:---|:---|:---|
      | 1 | Mampu membuat Karya Tulis Ilmiah (KTI) | | |
      | 2 | Menguasai kemampuan numerik dan kalkulus | | |
      | 3 | Berpidato & menulis teks dalam Bahasa Arab | | |
      | 4 | Berpidato & menulis teks dalam Bahasa Inggris | | |
      | 5 | Mencapai KKM & kesiapan Ujian Masuk PTN | | |

      III. BIDANG NAFI’AH
      | No | Indikator Kompetensi | Status | Keterangan |
      |:---|:---|:---|:---|
      | 1 | Memiliki kemampuan berorganisasi yang baik | | |
      | 2 | Menguasai keterampilan masa depan (Hard Skill) | | |
      | 3 | Menguasai keterampilan masa depan (Soft Skill) | | |
      
      Requirements:
      1. Write extensive, professional narrative content for every section of the document.
      2. Ensure EACH section contains at least 200 words of detailed, high-quality, academic-style educational narrative content.
      3. Do not use placeholders, brackets, or short summaries.
      4. Incorporate concepts like "Peningkatan Mutu Pendidikan", "Habituasi Siswa", "Pelatihan Guru", "Kolaborasi", and "Integrasi Teknologi" as seen in professional educational journals.
      5. Structure the document formally with introduction, detailed analysis/discussion, and conclusion.
      6. Wherever data presentation or structured information is required, use the following custom format for tables:
         [TABLE_START]
         [TABLE_ROW]Header1|Header2|Header3
         [TABLE_ROW]Row1a|Row1b|Row1c
         [TABLE_END]
      7. Return only the raw document content as a string without markdown code blocks.
    `;

    try {
      console.log("Attempting Gemini API call...");
      // Debugging: inspect 'ai' object structure
      // console.log("AI Instance Structure:", Object.keys(ai));
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });
      const content = response.text || "";
      res.json({ content });
    } catch (error: any) {
      console.error("Gemini API Error details:", error);
      
      // Check if it is a rate limit error (status 429)
      if (error && error.status === 429) {
        return res.status(429).json({ error: "Quota exceeded. Please wait a few seconds and try again." });
      }

      if (error instanceof Error) {
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      res.status(500).json({ error: "Failed to generate content: " + (error instanceof Error ? error.message : "Unknown error") });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
