import * as React from "react";
import type { UploadedFile } from "@/lib/types";
import { toast } from "sonner";
import type { UploadFilesOptions } from "uploadthing/types";

// import { getErrorMessage } from "@/lib/handle-error";
// import { uploadFiles } from "@/lib/uploadthing";
import { type OurFileRouter } from "@/lib/uploadthing/core";
import { uploadFiles } from "@/lib/uploadthing/uploadthing";
import { getErrorMessage } from "@/lib/uploadthing/handle-error";

interface UseUploadFileProps
  extends Pick<
    UploadFilesOptions<OurFileRouter, keyof OurFileRouter>,
    "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
  > {
  defaultUploadedFiles?: UploadedFile[];
}

export function useUploadFile(
  endpoint: keyof OurFileRouter,
  { defaultUploadedFiles = [], ...props }: UseUploadFileProps = {}
) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<UploadedFile[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {}
  );
  const [isUploading, setIsUploading] = React.useState(false);

  async function uploadThings(files: File[]) {
    setIsUploading(true);
    try {
      const res = await uploadFiles(endpoint, {
        ...props,
        files,
        onUploadProgress: ({
          file,
          progress,
        }: {
          file: any;
          progress: any;
        }): void => {
          setProgresses((prev) => {
            return {
              ...prev,
              [file]: progress,
            };
          });
        },
      });

      setUploadedFiles((prev) => (prev ? [...prev, ...res] : res));
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    uploadedFiles,
    progresses,
    uploadFiles: uploadThings,
    isUploading,
  };
}
