import { useState, useCallback } from "react";
import type { PdfFile } from "../types";

let counter = 0;
function nextId(): string {
  return `file-${++counter}-${Date.now()}`;
}

export function useFileManager() {
  const [files, setFiles] = useState<PdfFile[]>([]);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const pdfs = arr.filter((f) => f.type === "application/pdf");
    if (pdfs.length === 0) return;

    const entries: PdfFile[] = pdfs.map((file) => ({
      id: nextId(),
      file,
      name: file.name,
      size: file.size,
    }));

    setFiles((prev) => [...prev, ...entries]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const moveFile = useCallback((fromIndex: number, toIndex: number) => {
    setFiles((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return { files, addFiles, removeFile, clearFiles, moveFile, totalSize };
}
