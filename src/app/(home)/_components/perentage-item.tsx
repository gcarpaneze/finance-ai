import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  label: string;
  value: number;
}

function PercentageItem({ icon, label, value }: PercentageItemProps) {
  return (
    <div className="itens center flex justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-white bg-opacity-[10%] p-2">{icon}</div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
}

export default PercentageItem;
