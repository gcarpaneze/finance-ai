import { db } from "@/lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";

async function getCurrentMonthTransactions({ userId }: { userId: string }) {
  const currentMonthsTransactions = await db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lte: endOfMonth(new Date()),
      },
    },
  });

  return currentMonthsTransactions;
}

export { getCurrentMonthTransactions };
