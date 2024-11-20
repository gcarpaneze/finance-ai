import { clerkClient } from "@clerk/nextjs/server";

async function userIsPremium({ userId }: { userId: string }): Promise<boolean> {
  if (!userId) throw new Error("Unauthorized");

  const user = (await clerkClient()).users.getUser(userId);

  const hasPremiumPlan =
    (await user).publicMetadata.subscriptionPlan === "premium";

  if (hasPremiumPlan) return true;

  return false;
}

export { userIsPremium };
