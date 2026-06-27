"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, X, File, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FileUploadProps {
  onUpload?: (file: File) => Promise<{ url: string }>;
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
}

interface UploadedFile {
  file: File;
  status: "uploading" | "success" | "error";
  progress: number;
  url?: string;
  error?: string;
}

export function FileUpload({
  onUpload,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  maxFiles = 1,
  className,
  disabled = false,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      const remaining = maxFiles - files.length;
      const toProcess = fileArray.slice(0, remaining);

      for (const file of toProcess) {
        if (file.size > maxSize) {
          setFiles((prev) => [
            ...prev,
            { file, status: "error", progress: 0, error: `File too large (max ${Math.round(maxSize / 1024 / 1024)}MB)` },
          ]);
          continue;
        }

        setFiles((prev) => [
          ...prev,
          { file, status: "uploading", progress: 0 },
        ]);

        try {
          if (onUpload) {
            const result = await onUpload(file);
            setFiles((prev) =>
              prev.map((f) =>
                f.file === file
                  ? { ...f, status: "success", progress: 100, url: result.url }
                  : f
              )
            );
          } else {
            // Simulate upload
            for (let p = 0; p <= 100; p += 20) {
              await new Promise((r) => setTimeout(r, 100));
              setFiles((prev) =>
                prev.map((f) =>
                  f.file === file ? { ...f, progress: p } : f
                )
              );
            }
            setFiles((prev) =>
              prev.map((f) =>
                f.file === file
                  ? { ...f, status: "success", progress: 100, url: URL.createObjectURL(file) }
                  : f
              )
            );
          }
        } catch (err) {
          setFiles((prev) =>
            prev.map((f) =>
              f.file === file
                ? { ...f, status: "error", progress: 0, error: "Upload failed" }
                : f
            )
          );
        }
      }
    },
    [files.length, maxFiles, maxSize, onUpload]
  );

  function removeFile(file: File) {
    setFiles((prev) => prev.filter((f) => f.file !== file));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
        <p className="text-sm font-medium">
          Drag & drop files here, or{" "}
          <span className="text-primary underline cursor-pointer">browse</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {accept === "image/*" ? "Images" : "Files"} up to{" "}
          {Math.round(maxSize / 1024 / 1024)}MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          disabled={disabled}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((uploaded, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 border rounded-lg"
            >
              <File className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {uploaded.file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(uploaded.file.size)}
                </p>
                {uploaded.status === "uploading" && (
                  <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all"
                      style={{ width: `${uploaded.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <div className="flex-shrink-0">
                {uploaded.status === "uploading" && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
                {uploaded.status === "success" && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {uploaded.status === "error" && (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => removeFile(uploaded.file)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
