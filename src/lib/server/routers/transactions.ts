import { getTransactionById, getTransactions } from "@/lib/api/transactions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  transactionIdSchema,
  insertTransactionParams,
  updateTransactionParams,
} from "@/lib/db/schema/transactions";
import { createTransaction, deleteTransaction, updateTransaction } from "@/lib/api/transactions/mutations";

export const transactionsRouter = router({
  getTransactions: publicProcedure.query(async () => {
    return getTransactions();
  }),
  getTransactionById: publicProcedure.input(transactionIdSchema).query(async ({ input }) => {
    return getTransactionById(input.id);
  }),
  createTransaction: publicProcedure
    .input(insertTransactionParams)
    .mutation(async ({ input }) => {
      return createTransaction(input);
    }),
  updateTransaction: publicProcedure
    .input(updateTransactionParams)
    .mutation(async ({ input }) => {
      return updateTransaction(input.id, input);
    }),
  deleteTransaction: publicProcedure
    .input(transactionIdSchema)
    .mutation(async ({ input }) => {
      return deleteTransaction(input.id);
    }),
});
