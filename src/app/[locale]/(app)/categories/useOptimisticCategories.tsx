
import { type Category, type CompleteCategory } from "@/lib/db/schema/categories";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Category>) => void;

export const useOptimisticCategories = (
  categories: CompleteCategory[],
  
) => {
  const [optimisticCategories, addOptimisticCategory] = useOptimistic(
    categories,
    (
      currentState: CompleteCategory[],
      action: OptimisticAction<Category>,
    ): CompleteCategory[] => {
      const { data } = action;

      

      const optimisticCategory = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticCategory]
            : [...currentState, optimisticCategory];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticCategory } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticCategory, optimisticCategories };
};
