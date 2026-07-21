import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { saveAs } from "file-saver";

export const generateDocx = async (filename: string, content: string) => {
  const lines = content.split('\n');
  const children: (Paragraph | Table)[] = [];

  let inTable = false;
  let tableRows: TableRow[] = [];

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("[TABLE_START]")) {
      inTable = true;
      tableRows = [];
      return;
    }

    if (trimmedLine.startsWith("[TABLE_END]")) {
      inTable = false;
      children.push(
        new Table({
          rows: tableRows,
          width: { size: 100, type: WidthType.PERCENTAGE },
        })
      );
      return;
    }

    if (inTable) {
      if (trimmedLine.startsWith("[TABLE_ROW]")) {
        const cells = trimmedLine
          .replace("[TABLE_ROW]", "")
          .split("|")
          .map(
            (cell) =>
              new TableCell({
                children: [new Paragraph(cell.trim())],
                borders: {
                    top: { style: BorderStyle.SINGLE, size: 1 },
                    bottom: { style: BorderStyle.SINGLE, size: 1 },
                    left: { style: BorderStyle.SINGLE, size: 1 },
                    right: { style: BorderStyle.SINGLE, size: 1 },
                },
              })
          );
        tableRows.push(new TableRow({ children: cells }));
      }
      return;
    }

    if (!trimmedLine) {
      children.push(new Paragraph({ children: [new TextRun("")] }));
      return;
    }

    // Heuristic for headings (e.g., lines ending in '===')
    if (trimmedLine.includes("===") || trimmedLine.match(/^[A-Z\s]{5,}$/)) {
      children.push(
        new Paragraph({
          text: trimmedLine.replace(/=/g, '').trim(),
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        })
      );
    } else {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              font: "Times New Roman",
            }),
          ],
        })
      );
    }
  });

  const doc = new Document({
    sections: [{
      children,
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${filename}.docx`);
};
