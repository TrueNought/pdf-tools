import { useRef, type DragEvent } from "react";
import type { PdfFile } from "../types";
import { FileItem } from "./FileItem";

interface Props {
  files: PdfFile[];
  onRemove: (id: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

export function FileList({ files, onRemove, onMove }: Props) {
  const dragIndex = useRef<number | null>(null);

  function handleDragStart(index: number) {
    dragIndex.current = index;
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  function handleDrop(index: number) {
    if (dragIndex.current !== null && dragIndex.current !== index) {
      onMove(dragIndex.current, index);
    }
    dragIndex.current = null;
  }

  if (files.length === 0) return null;

  return (
    <ul className="file-list">
      {files.map((file, i) => (
        <FileItem
          key={file.id}
          file={file}
          index={i}
          onRemove={onRemove}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </ul>
  );
}
