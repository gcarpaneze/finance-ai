import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { getMonth, isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "@/data/get-dashboard";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

async function Page({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const currentMonth = String(getMonth(new Date()) + 1);
  const monthIsInvalid = !month || !isMatch(month, "MM") || month.length === 1;

  if (monthIsInvalid)
    redirect(
      `?month=${currentMonth.length === 1 ? "0${currentMonth}" : currentMonth}`,
    );

  const data = await getDashboard(month);

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards month={month} {...data} />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
