import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "./get-current-month-transactions";

async function userCanAddNewTransactions() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = (await clerkClient()).users.getUser(userId);

  const hasPremiumPlan =
    (await user).publicMetadata.subscriptionPlan === "premium";

  if (hasPremiumPlan) return true;

  const currentMonthsTransactions = await getCurrentMonthTransactions({
    userId,
  });

  if (currentMonthsTransactions <= 10) return true;

  return false;
}

export { userCanAddNewTransactions };
