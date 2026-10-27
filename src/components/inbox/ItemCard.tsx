import { useState } from "react";
import { AlarmClock, Check, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useInbox } from "@/lib/inbox/store";
import { categoryLabels, getAccount, relDay } from "@/lib/inbox/format";
import type { Importance, InsightItem } from "@/lib/inbox/types";
import { ThreadSheet } from "./ThreadSheet";

export const importanceStyles: Record<Importance, string> = {
  high: "bg-urgent-soft text-urgent",
  medium: "bg-warn-soft text-foreground",
  low: "bg-calm-soft text-calm",
};

export function ImportanceBadge({ level }: { level: Importance }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${importanceStyles[level]}`}>
      {level}
    </span>
  );
}

export function AccountDot({ id }: { id: string }) {
  const a = getAccount(id);
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: `var(${a.colorVar})` }} />
      {a.label}
    </span>
  );
}

export function ItemCard({ item, compact }: { item: InsightItem; compact?: boolean }) {
  const { itemState, toggleDone, snooze, unsnooze } = useInbox();
  const [open, setOpen] = useState(false);
  const st = itemState[item.id];
  const snoozed = st?.snoozedUntil && new Date(st.snoozedUntil) > new Date();

  return (
    <>
      <div
        className={`group rounded-xl border border-border bg-card p-4 shadow-card transition hover:border-ring/40 ${
          st?.done ? "opacity-55" : ""
        }`}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={() => {
              toggleDone(item.id);
              if (!st?.done) toast.success("Marked complete", { action: { label: "Undo", onClick: () => toggleDone(item.id) } });
            }}
            aria-label={st?.done ? "Mark incomplete" : "Mark complete"}
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${
              st?.done ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-primary"
            }`}
          >
            {st?.done && <Check className="h-3 w-3" />}
          </button>

          <button className="min-w-0 flex-1 text-left" onClick={() => setOpen(true)}>
            <div className="flex flex-wrap items-center gap-2">
              <ImportanceBadge level={item.importance} />
              {item.isNew && <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">New</span>}
              {item.dueAt && <span className="text-xs font-medium text-urgent">{relDay(item.dueAt)}</span>}
            </div>
            <p className={`mt-1.5 font-semibold leading-snug ${st?.done ? "line-through" : ""}`}>{item.title}</p>
            {!compact && <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <AccountDot id={item.accountId} />
              <span className="text-xs text-muted-foreground">{categoryLabels[item.category]}</span>
              <span className="inline-flex items-center gap-1 text-xs text-primary">
                <Sparkles className="h-3 w-3" />
                {item.reason}
              </span>
            </div>
          </button>

          <div className="flex shrink-0 items-center gap-1">
            {snoozed ? (
              <Button variant="ghost" size="icon" onClick={() => unsnooze(item.id)} aria-label="Unsnooze">
                <RotateCcw className="h-4 w-4" />
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Snooze">
                    <AlarmClock className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {[
                    ["Tomorrow", 1],
                    ["In 3 days", 3],
                    ["Next week", 7],
                  ].map(([l, d]) => (
                    <DropdownMenuItem
                      key={l}
                      onClick={() => {
                        snooze(item.id, d as number);
                        toast(`Snoozed until ${String(l).toLowerCase()}`);
                      }}
                    >
                      {l}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <ChevronRight className="hidden h-4 w-4 text-muted-foreground sm:block" />
          </div>
        </div>
      </div>
      <ThreadSheet threadId={item.threadId} open={open} onOpenChange={setOpen} item={item} />
    </>
  );
}
