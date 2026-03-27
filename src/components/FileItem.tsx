import type { DragEvent } from "react";
import type { PdfFile } from "../types";

interface Props {
  file: PdfFile;
  index: number;
  onRemove: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (index: number) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileItem({
  file,
  index,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
}: Props) {
  return (
    <li
      className="file-item"
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={() => onDrop(index)}
    >
      <span className="file-item__grip" title="Drag to reorder">
        ⠿
      </span>
      <span className="file-item__name" title={file.name}>
        {file.name}
      </span>
      <span className="file-item__size">{formatSize(file.size)}</span>
      <button
        className="file-item__remove"
        onClick={() => onRemove(file.id)}
        title="Remove file"
        aria-label={`Remove ${file.name}`}
      >
        ✕
      </button>
    </li>
  );
}
