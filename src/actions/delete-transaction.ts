"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const deleteTransactionSchema = z.object({
  id: z.string(),
});

type DeleteTransactionSchema = z.infer<typeof deleteTransactionSchema>;

export async function deleteTransaction({ id }: DeleteTransactionSchema) {
  deleteTransactionSchema.parse({ id });

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.transaction.delete({
    where: {
      id,
    },
  });

  revalidatePath("/transactions");
}
