import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/prisma";

import AddTransactionButton from "@/components/add-transaction-button";
import { TransactionsColumns } from "./_columns";
import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { userCanAddNewTransactions } from "@/utils/userCanAddTransactions";

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

  const userCanAddTransactions = await userCanAddNewTransactions();

  return (
    <>
      <Navbar />

      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>

          <AddTransactionButton
            userCanAddTransactions={userCanAddTransactions}
          />
        </div>

        <ScrollArea>
          <DataTable columns={TransactionsColumns} data={transaction} />
        </ScrollArea>
      </div>
    </>
  );
}

export default Page;
