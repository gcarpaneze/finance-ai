"use client";

import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransactions: boolean;
}

function AddTransactionButton({
  userCanAddTransactions,
}: AddTransactionButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={!userCanAddTransactions}
              className="rounded-full font-bold"
              onClick={() => setIsDialogOpen(true)}
            >
              Adicionar transação
              <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>
          {!userCanAddTransactions && (
            <TooltipContent>
              &quot;Você artingiu o limite de transações. Atualize seu plano
              para a versão Premium para criar transações ilimitadas.&quot;
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <UpsertTransactionDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
    </>
  );
}

export default AddTransactionButton;
