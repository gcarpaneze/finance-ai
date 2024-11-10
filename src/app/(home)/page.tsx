import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { getMonth, isMatch } from "date-fns";

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

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <SummaryCards />
      </div>
    </>
  );
}

export default Page;
