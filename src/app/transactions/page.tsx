import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/prisma";

import AddTransactionButton from "@/components/add-transaction-button";
import { TransactionsColumns } from "./_columns";
import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const transaction = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  return (
    <>
      <Navbar />

      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>

          <AddTransactionButton />
        </div>

        <DataTable columns={TransactionsColumns} data={transaction} />
      </div>
    </>
  );
}

export default Page;
