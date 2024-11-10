"use client";

import { useState } from "react";
import UpsertTransactionDialog from "@/components/upsert-transaction-dialog";

import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "@prisma/client";

interface EditTransactionProps {
  transaction: Transaction;
}

function EditTransactionButton({ transaction }: EditTransactionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setIsDialogOpen(true)}
      >
        <PencilIcon />
      </Button>

      <UpsertTransactionDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        transactionId={transaction.id}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
      />
    </>
  );
}

export default EditTransactionButton;
