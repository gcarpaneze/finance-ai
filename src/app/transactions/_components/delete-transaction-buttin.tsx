"use client";

import { useState } from "react";

import { Loader2Icon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { deleteTransaction } from "@/actions/delete-transaction";

interface EditTransactionProps {
  id: string;
}

function DeleteTransactionButton({ id }: EditTransactionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  async function handleDeleteTransaction(id: string) {
    setIsDeleteLoading(true);

    try {
      await deleteTransaction({ id });
    } catch (error) {
      console.log(error);
    } finally {
      setIsDialogOpen(false);
      setIsDeleteLoading(false);
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setIsDialogOpen(true)}
        disabled={isDeleteLoading}
      >
        <TrashIcon />
      </Button>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deletar transação</DialogTitle>
            <DialogDescription>
              Essa ação é irreversível. Tem certeza que deseja excluir essa
              transação?
            </DialogDescription>
          </DialogHeader>

          <form
            action={() => handleDeleteTransaction(id)}
            className="space-y-8"
          >
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isDeleteLoading}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isDeleteLoading}>
                {isDeleteLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Deletar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteTransactionButton;
