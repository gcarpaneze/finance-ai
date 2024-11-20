"use client";

import generateAIReport from "@/actions/generate-ai-report";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BotIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";

interface AIReportsButtonProps {
  month: string;
}

function IAReportsButton({ month }: AIReportsButtonProps) {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState<boolean>(false);

  async function handleGenerateAIReport() {
    try {
      setReportIsLoading(true);
      const AIReport = await generateAIReport({ month });
      setReport(AIReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setReport(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full font-bold"
          disabled={reportIsLoading}
        >
          Relatório AI
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Relatório IA</DialogTitle>
          <DialogDescription>
            Use inteligência artificial para gerar um relatório com insights
            sobre suas finanças.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
          <Markdown>{report}</Markdown>
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleGenerateAIReport}>
            {reportIsLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Gerar relatório"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default IAReportsButton;
