import { type Category } from "@/lib/db/schema/categories";
import {
  type Transaction,
  type CompleteTransaction,
} from "@/lib/db/schema/transactions";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Transaction>) => void;

export const useOptimisticTransactions = (
  transactions: CompleteTransaction[],
  categories: Category[]
) => {
  const [optimisticTransactions, addOptimisticTransaction] = useOptimistic(
    transactions,
    (
      currentState: CompleteTransaction[],
      action: OptimisticAction<Transaction>
    ): CompleteTransaction[] => {
      const { data } = action;

      const optimisticCategory = categories.find(
        (category) => category.id === data.categoryId
      )!;

      const optimisticTransaction = {
        ...data,
        category: optimisticCategory,
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticTransaction]
            : [...currentState, optimisticTransaction];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticTransaction } : item
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item
          );
        default:
          return currentState;
      }
    }
  );

  return { addOptimisticTransaction, optimisticTransactions };
};
