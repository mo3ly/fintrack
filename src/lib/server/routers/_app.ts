import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { categoriesRouter } from "./categories";
import { transactionsRouter } from "./transactions";

export const appRouter = router({
  computers: computersRouter,
  categories: categoriesRouter,
  transactions: transactionsRouter,
});

export type AppRouter = typeof appRouter;
