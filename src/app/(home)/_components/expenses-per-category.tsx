import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TRANSACTION_CATEGORY_LABELS } from "@/constants/transactions";
import type { TotalExpensePerCategory } from "@/data/get-dashboard";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ExpensesPercategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

function ExpensesPerCategory({
  expensesPerCategory,
}: ExpensesPercategoryProps) {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md pb-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Gastos por categoria</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {expensesPerCategory.map((category) => (
            <div key={category.category} className="space-y-1">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold">
                  {TRANSACTION_CATEGORY_LABELS[category.category]}
                </p>
                <p className="text-sm font-bold">
                  {category.percentageOfTotal}%
                </p>
              </div>

              <Progress value={category.percentageOfTotal} />
            </div>
          ))}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}

export default ExpensesPerCategory;
