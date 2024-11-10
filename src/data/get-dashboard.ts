import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TransactionCategory, TransactionType } from "@prisma/client";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export interface TotalExpensePerCategory {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}

async function getDashboard(month: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const where = {
    userId,
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const investimentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTIMENT" },
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const balance = depositsTotal - (investimentsTotal + expensesTotal);

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where },
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTIMENT]: Math.round(
      (Number(investimentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  return {
    depositsTotal,
    investimentsTotal,
    expensesTotal,
    balance,
    typesPercentage,
  };
}

export { getDashboard };