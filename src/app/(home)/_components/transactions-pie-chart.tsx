"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/data/get-dashboard";
import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import PercentageItem from "./perentage-item";

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  investimentsTotal: number;
  expensesTotal: number;
}

const chartConfig = {
  [TransactionType.INVESTIMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

function TransactionsPieChart({
  depositsTotal,
  expensesTotal,
  investimentsTotal,
  typesPercentage,
}: TransactionsPieChartProps) {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTIMENT,
      amount: investimentsTotal,
      fill: "#FFFFFF",
    },
  ];

  return (
    <Card className="flex flex-col p-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={false} />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUp size={16} className="text-primary" />}
            label="Receita"
            value={typesPercentage.DEPOSIT}
          />

          <PercentageItem
            icon={<TrendingDown size={16} className="text-red-500" />}
            label="Despesa"
            value={typesPercentage.EXPENSE}
          />

          <PercentageItem
            icon={<PiggyBank size={16} />}
            label="Investimento"
            value={typesPercentage.INVESTIMENT}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default TransactionsPieChart;
