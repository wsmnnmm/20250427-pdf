"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { usePdfStore } from "../store/pdfStore";
import { createPageThumbnail, revokeObjectURLs } from "../utils/pdfUtils";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

export default function PdfViewer() {
  const {
    file,
    numPages,
    pdfDataUrl,
    pageRotations,
    isLoading,
    error,
    loadPdf,
    rotatePage,
    generateModifiedPdf,
  } = usePdfStore();

  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingThumbnails, setGeneratingThumbnails] = useState(false);
  const [zoom, setZoom] = useState(1); // 添加缩放状态

  // Handle file drop
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const pdfFile = acceptedFiles[0];
        if (pdfFile.type === "application/pdf") {
          await loadPdf(pdfFile);
        } else {
          alert("Please upload a PDF file");
        }
      }
    },
    [loadPdf]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  // Generate thumbnails when PDF is loaded
  useEffect(() => {
    async function generateThumbnails() {
      if (numPages > 0 && pdfDataUrl) {
        setGeneratingThumbnails(true);
        try {
          // Clean up previous thumbnails
          if (thumbnails.length > 0) {
            revokeObjectURLs(thumbnails);
          }

          // Generate thumbnails for each page
          const newThumbnails: string[] = [];
          for (let i = 0; i < numPages; i++) {
            const thumbnail = await createPageThumbnail(pdfDataUrl, i);
            newThumbnails.push(thumbnail);
          }

          setThumbnails(newThumbnails);
        } catch (error) {
          console.error("生成缩略图时出错:", error);
        } finally {
          setGeneratingThumbnails(false);
        }
      } else {
        setThumbnails([]);
      }
    }

    generateThumbnails();

    // Cleanup function to revoke object URLs when component unmounts
    return () => {
      if (thumbnails.length > 0) {
        revokeObjectURLs(thumbnails);
      }
    };
  }, [numPages, pdfDataUrl]);

  // Handle download of modified PDF
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const pdfBytes = await generateModifiedPdf();
      if (pdfBytes) {
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = file ? `rotated-${file.name}` : "rotated-document.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Error downloading PDF:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-start bg-[#f7f5ee]">
      {/* 上传区域或操作区 */}
      <div className="w-full max-w-5xl">
        {!file ? (
          <div
            {...getRootProps()}
            className={`h-[350px] w-full border-2 border-dashed rounded-xl bg-white border-[#e8e3d8] flex flex-col items-center justify-center cursor-pointer transition-all space-y-3 shadow-md hover:shadow-lg ${
              isDragActive ? "border-[#ff7a1a] bg-orange-50" : ""
            }`}
          >
            <img
              src="https://ext.same-assets.com/1526427961/972736266.svg"
              alt="Upload PDF"
              width={48}
              height={48}
              draggable="false"
              className="mb-2"
            />
            <p className="font-medium text-base leading-6 opacity-80 select-none pointer-events-none">
              {isDragActive
                ? "Drop the PDF here"
                : "Click to upload or drag and drop"}
            </p>
            <input {...getInputProps()} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* 操作按钮区 */}
            <div className="flex flex-wrap gap-3 justify-center items-center mb-2">
              <button
                onClick={() => {
                  // 旋转全部页面
                  pageRotations.forEach((_, idx) => rotatePage(idx));
                }}
                className="px-4 py-2 bg-[#ff6b1a] text-white rounded-md font-medium shadow hover:bg-[#e86a00] transition-colors"
                disabled={isGenerating}
              >
                Rotate all
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#1a253c] text-white rounded-md font-medium shadow hover:bg-[#111] transition-colors"
                disabled={isGenerating}
              >
                Remove PDF
              </button>
              {/* 添加缩放按钮 */}
              <button
                className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:shadow-lg transition-all"
                onClick={() => setZoom((z) => Math.min(z + 0.1, 2))}
                aria-label="放大"
                title="放大"
              >
                <svg width="20" height="20" fill="none">
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke="#222"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10 6v8M6 10h8"
                    stroke="#222"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:shadow-lg transition-all"
                onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}
                aria-label="缩小"
                title="缩小"
              >
                <svg width="20" height="20" fill="none">
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke="#222"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6 10h8"
                    stroke="#222"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            {/* 文件名 */}
            <div className="text-lg flex justify-center font-medium text-[#222] mb-2">
              <span>{file.name}</span>
            </div>

            {/* 缩略图区 - 需要应用缩放 */}
            {isLoading || generatingThumbnails ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-[#ff7a1a] font-medium">
                  {isLoading ? "Loading PDF..." : "Generating thumbnails..."}
                </p>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4">{error}</div>
            ) : (
              <div className="flex flex-wrap gap-6 justify-center">
                {thumbnails.map((thumbnail, index) => (
                  <div key={index} className="relative group">
                    {/* 右上角旋转按钮 */}
                    <button
                      className="absolute z-10 top-1 right-1 rounded-full p-1 hover:scale-105 hover:fill-white bg-[#ff612f] fill-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        rotatePage(index);
                      }}
                      aria-label="旋转页面"
                    >
                      <svg
                        className="w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"></path>
                      </svg>
                    </button>
                    {/* 缩略图卡片 */}
                    <div
                      className="flex-col cursor-pointer rounded-xl overflow-hidden bg-white hover:shadow-xl transition-shadow duration-200"
                      onClick={() => rotatePage(index)}
                      style={{
                        width: 200 * zoom,
                        height: 288 * zoom,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 8,
                        position: "relative",
                      }}
                    >
                      <img
                        src={thumbnail}
                        alt={`页面 ${index + 1}`}
                        className="object-contain transition-transform duration-300"
                        style={{
                          width: 160 * zoom,
                          height: 240 * zoom,
                          transform: `rotate(${pageRotations[index]}deg)`,
                          transition: "transform 0.3s ease-in-out", // 添加旋转过渡动画
                        }}
                      />
                      {/* 旋转动画指示 */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        点击旋转
                      </div>
                      {/* 角标 */}
                      <div>{index + 1}</div>
                    </div>
                    {/* 角度显示 */}
                    <div className="text-center text-xs text-[#888]">
                      {pageRotations[index] % 360 || 0}°
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 下载按钮单独放在下方 */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="px-10 py-3 bg-[#ff6b1a] text-white rounded-md font-semibold text-lg shadow hover:bg-[#e86a00] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? "生成中..." : "下载"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
