import { useState } from "react";
import { FileDropZone } from "./components/FileDropZone";
import { FileList } from "./components/FileList";
import { Controls } from "./components/Controls";
import { useFileManager } from "./hooks/useFileManager";
import { mergePdfs } from "./utils/mergePdfs";

export default function App() {
  const { files, addFiles, removeFile, clearFiles, moveFile, totalSize } = useFileManager();
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleMerge() {
    setError(null);
    setMerging(true);
  
    try {
      const blob = await mergePdfs(files.map((f) => f.file));
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pdf-merged.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to merge PDFs"
      );
    } finally {
      setMerging(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">PDF Combiner</h1>
        <p className="header__privacy">
          Files are processed locally in your browser. You can view the code <a href="https://github.com/TrueNought/pdf-combiner" target="_blank" rel="noopener noreferrer">here</a>.
        </p>
      </header>

      <main className="main">
        <FileDropZone onFilesSelected={addFiles} />
        <FileList files={files} onRemove={removeFile} onMove={moveFile} />
        <Controls
          fileCount={files.length}
          totalSize={totalSize}
          merging={merging}
          onMerge={handleMerge}
          onClear={clearFiles}
        />
        {error && (
          <div className="error" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}
      </main>
    </div>
  );
}
