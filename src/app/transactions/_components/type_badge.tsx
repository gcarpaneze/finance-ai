import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@prisma/client";
import { CircleIcon } from "lucide-react";

function TypeBadge({ transaction }: { transaction: Transaction }) {
  if (transaction.type === "DEPOSIT") {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-1 fill-primary" size={8} />
        Depósito
      </Badge>
    );
  } else if (transaction.type === "EXPENSE") {
    return (
      <Badge className="bg-[#F63522] bg-opacity-10 font-bold text-[#F63522] hover:bg-[#F63522] hover:bg-opacity-10">
        <CircleIcon className="mr-1 fill-destructive" size={8} />
        Despesa
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-muted font-bold text-white hover:bg-muted">
        <CircleIcon className="mr-1 fill-white" size={8} />
        Investimento
      </Badge>
    );
  }
}

export default TypeBadge;
