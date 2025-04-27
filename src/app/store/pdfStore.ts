import { create } from "zustand";
import { pdfjs } from "react-pdf";
import { PDFDocument, degrees } from "pdf-lib";

// Configure pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFState {
  file: File | null;
  numPages: number;
  pdfDataUrl: string | null;
  pageRotations: number[];
  isLoading: boolean;
  error: string | null;

  setFile: (file: File | null) => void;
  setNumPages: (numPages: number) => void;
  setPdfDataUrl: (url: string | null) => void;
  rotatePage: (pageIndex: number) => void;
  resetRotations: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  loadPdf: (file: File) => Promise<void>;
  generateModifiedPdf: () => Promise<Uint8Array | null>;
}

export const usePdfStore = create<PDFState>((set, get) => ({
  file: null,
  numPages: 0,
  pdfDataUrl: null,
  pageRotations: [],
  isLoading: false,
  error: null,

  setFile: (file) => set({ file }),
  setNumPages: (numPages) => set({ numPages }),
  setPdfDataUrl: (url) => set({ pdfDataUrl: url }),
  rotatePage: (pageIndex) => {
    const { pageRotations } = get();
    const newRotations = [...pageRotations];
    // 不再使用取模运算，让角度可以一直累加
    newRotations[pageIndex] = (newRotations[pageIndex] || 0) + 90;
    set({ pageRotations: newRotations });
  },
  resetRotations: () => set({ pageRotations: [] }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  loadPdf: async (file) => {
    try {
      set({ isLoading: true, error: null, file });

      const pdfDataUrl = URL.createObjectURL(file);
      const loadingTask = pdfjs.getDocument(pdfDataUrl);
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const pageRotations = Array(numPages).fill(0);

      set({
        numPages,
        pageRotations,
        pdfDataUrl,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error loading PDF:", error);
      set({
        error: "Failed to load PDF. Please try another file.",
        isLoading: false,
      });
    }
  },

  generateModifiedPdf: async () => {
    const { file, pageRotations } = get();

    if (!file) return null;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Apply rotations to each page
      const pages = pdfDoc.getPages();
      pages.forEach((page, index) => {
        const rotation = pageRotations[index] || 0;
        if (rotation !== 0) {
          // 对于连续累加的角度值，仍然需要归一化为0-359度范围
          // 因为PDF库需要标准的旋转角度
          const normalizedRotation = (rotation % 360) as 0 | 90 | 180 | 270;
          page.setRotation(degrees(normalizedRotation));
        }
      });

      const modifiedPdfBytes = await pdfDoc.save();
      return modifiedPdfBytes;
    } catch (error) {
      console.error("Error generating modified PDF:", error);
      set({ error: "Failed to generate modified PDF." });
      return null;
    }
  },
}));
