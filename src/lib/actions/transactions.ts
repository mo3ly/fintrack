"use server";

import { revalidatePath } from "next/cache";
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "@/lib/api/transactions/mutations";
import {
  TransactionId,
  NewTransactionParams,
  UpdateTransactionParams,
  transactionIdSchema,
  insertTransactionParams,
  updateTransactionParams,
} from "@/lib/db/schema/transactions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateTransactions = () => revalidatePath("/transactions");

export const createTransactionAction = async (input: NewTransactionParams) => {
  try {
    const payload = insertTransactionParams.parse(input);
    await createTransaction(payload);
    revalidateTransactions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateTransactionAction = async (input: UpdateTransactionParams) => {
  try {
    const payload = updateTransactionParams.parse(input);
    await updateTransaction(payload.id, payload);
    revalidateTransactions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteTransactionAction = async (input: TransactionId) => {
  try {
    const payload = transactionIdSchema.parse({ id: input });
    await deleteTransaction(payload.id);
    revalidateTransactions();
  } catch (e) {
    return handleErrors(e);
  }
};