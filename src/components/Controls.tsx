interface Props {
  fileCount: number;
  totalSize: number;
  merging: boolean;
  onMerge: () => void;
  onClear: () => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Controls({
  fileCount,
  totalSize,
  merging,
  onMerge,
  onClear,
}: Props) {
  if (fileCount === 0) return null;

  return (
    <div className="controls">
      <div className="controls__info">
        <span>
          {fileCount} file{fileCount !== 1 ? "s" : ""} selected
        </span>
        <span className="controls__separator">·</span>
        <span>{formatSize(totalSize)} total</span>
      </div>
      <div className="controls__actions">
        <button
          className="btn btn--secondary"
          onClick={onClear}
          disabled={merging}
        >
          Clear All
        </button>
        <button
          className="btn btn--primary"
          onClick={onMerge}
          disabled={fileCount < 2 || merging}
        >
          {merging ? "Merging…" : "Merge PDFs"}
        </button>
      </div>
    </div>
  );
}
