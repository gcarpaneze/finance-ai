import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/prisma";

import AddTransactionButton from "@/components/add-transaction-button";
import { TransactionsColumns } from "./_columns";
import Navbar from "@/components/navbar";

async function Page() {
  const transaction = await db.transaction.findMany({});

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
