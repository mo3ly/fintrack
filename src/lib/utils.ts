import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};

export type Action = "create" | "update" | "delete";

export type OptimisticAction<T> = {
  action: Action;
  data: T;
};

export const arabicToEnglishNumbers = (str: string) => {
  const arabicNums = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const chars = str.split("");
  const converted = chars
    .map((char: string) => {
      const index = arabicNums.indexOf(char);
      return index !== -1 ? index : char;
    })
    .join("");
  return converted;
};

// Custom amount field with Arabic number handling and coercion to number
export const zNumber = z.preprocess((value) => {
  if (typeof value === "string") {
    const converted = arabicToEnglishNumbers(value);
    const parsedNumber = parseFloat(converted);
    return isNaN(parsedNumber) ? value : parsedNumber;
  }
  return value;
}, z.number({ invalid_type_error: "must be a number" }));
