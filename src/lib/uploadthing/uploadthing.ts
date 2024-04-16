// @ts-ignore
import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "@/lib/uploadthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
