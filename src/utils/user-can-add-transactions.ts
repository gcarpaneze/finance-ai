import { auth } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "./get-current-month-transactions";
import { userIsPremium } from "./user-is-premium";

async function userCanAddNewTransactions() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const hasPremiumPlan = await userIsPremium({ userId });

  if (hasPremiumPlan) return true;

  const currentMonthsTransactions = await getCurrentMonthTransactions({
    userId,
  });

  if (currentMonthsTransactions <= 10) return true;

  return false;
}

export { userCanAddNewTransactions };
