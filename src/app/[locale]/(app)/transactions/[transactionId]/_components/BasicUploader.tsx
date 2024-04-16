"use client";

import { useUploadFile } from "@/lib/hooks/useUploadFile";
import { FileUploader } from "@//components/ui/uploader/file-uploader";

import { UploadedFilesCard } from "./UploadedFilesCard";

export function BasicUploader() {
  const { uploadFiles, progresses, uploadedFiles, isUploading } = useUploadFile(
    "imageUploader",
    { defaultUploadedFiles: [] }
  );

  return (
    <div className="space-y-6">
      <FileUploader
        maxFiles={1}
        maxSize={4 * 1024 * 1024}
        progresses={progresses}
        onUpload={uploadFiles}
        disabled={isUploading}
      />
      {/* <UploadedFilesCard uploadedFiles={uploadedFiles} /> */}
    </div>
  );
}
