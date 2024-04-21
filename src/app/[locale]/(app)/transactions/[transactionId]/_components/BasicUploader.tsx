"use client";

import { useUploadFile } from "@/lib/hooks/useUploadFile";
import { FileUploader } from "@//components/ui/uploader/file-uploader";

import { UploadedFilesCard } from "./UploadedFilesCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function BasicUploader({ transactionId }: { transactionId: string }) {
  const router = useRouter();
  const { uploadFiles, progresses, uploadedFiles, isUploading } = useUploadFile(
    "imageUploader",
    { defaultUploadedFiles: [] }
  );

  // Convert handleUploadComplete to async to ensure it returns a Promise
  useEffect(() => {
    const handleUploadComplete = async () => {
      if (uploadedFiles.length > 0) {
        console.log("uploadedFiles", uploadedFiles);
        const uploadedUrls = uploadedFiles.map((file) => file.url);
        try {
          await updateTransactionImageUrl(transactionId, uploadedUrls[0])
            .then((updatedTransaction) =>
              console.log("Transaction updated:", updatedTransaction)
            )
            .catch((error) =>
              console.error("Error updating transaction:", error)
            );

          router.refresh();
        } catch (error) {
          console.error("Failed to update transaction images:", error);
        }
      }
    };

    handleUploadComplete();
  }, [uploadedFiles]);

  async function updateTransactionImageUrl(
    transactionId: string,
    imageUrl: string
  ) {
    const response = await fetch(
      `/api/transactions/update-image?id=${transactionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: transactionId, imageUrl }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update transaction image:", errorData);
      throw new Error("Failed to update transaction image");
    }

    return response.json();
  }

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
