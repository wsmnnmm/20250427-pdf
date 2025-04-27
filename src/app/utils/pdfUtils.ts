/**
 * Utility functions for PDF processing
 */

import { pdfjs } from 'react-pdf';

/**
 * Creates a data URL for a specific page of a PDF document
 * @param pdfUrl The PDF file URL
 * @param pageIndex The index of the page to extract
 * @returns A data URL for the specified page
 */
export async function createPageThumbnail(pdfUrl: string, pageIndex: number): Promise<string> {
  try {
    // 加载PDF文档
    const loadingTask = pdfjs.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    
    // 获取指定页面
    const page = await pdf.getPage(pageIndex + 1); // PDF.js页码从1开始
    
    // 设置缩放比例以获得合适的缩略图大小
    const viewport = page.getViewport({ scale: 0.5 });
    
    // 创建canvas元素
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // 渲染PDF页面到canvas
    await page.render({
      canvasContext: context!,
      viewport: viewport
    }).promise;
    
    // 将canvas转换为数据URL
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('创建页面缩略图时出错:', error);
    throw error;
  }
}

/**
 * Revokes a list of object URLs to free up memory
 * @param urls Array of object URLs to revoke
 */
export function revokeObjectURLs(urls: string[]): void {
  urls.forEach(url => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  });
}