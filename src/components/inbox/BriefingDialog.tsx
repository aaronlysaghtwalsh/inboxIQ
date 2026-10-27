import { Copy, Newspaper } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { items } from "@/lib/inbox/data";
import { getAccount, relDay } from "@/lib/inbox/format";
import { useInbox } from "@/lib/inbox/store";

export function BriefingDialog() {
  const { isActive } = useInbox();
  const live = items.filter(isActive);
  const sections = [
    { title: "Needs your attention", list: live.filter((i) => i.kind === "missed") },
    { title: "Follow up today", list: live.filter((i) => i.kind === "followup").sort((a, b) => b.urgency - a.urgency).slice(0, 4) },
    { title: "Coming up", list: live.filter((i) => i.kind === "date").sort((a, b) => a.dueAt!.localeCompare(b.dueAt!)).slice(0, 4) },
    { title: "Don't forget", list: live.filter((i) => i.kind === "memory") },
    { title: "Rescued from junk", list: live.filter((i) => i.kind === "junk" && i.importance !== "low") },
  ].filter((s) => s.list.length);

  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const asText = () =>
    `InboxIQ Morning Briefing — ${today}\n\n` +
    sections.map((s) => `${s.title.toUpperCase()}\n` + s.list.map((i) => `• ${i.title}${i.dueAt ? ` (${relDay(i.dueAt)})` : ""} — ${getAccount(i.accountId).label}`).join("\n")).join("\n\n");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Newspaper className="mr-2 h-4 w-4" />Preview morning briefing</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogDescription className="text-xs uppercase tracking-wider">{today}</DialogDescription>
          <DialogTitle className="font-display text-3xl font-normal">Good morning, Maya.</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          {live.filter((i) => i.importance === "high").length} high-priority items across {new Set(live.map((i) => i.accountId)).size} accounts.
        </p>
        <div className="space-y-5">
          {sections.map((s) => (
            <section key={s.title}>
              <h3 className="border-b border-border pb-1 text-[11px] font-bold uppercase tracking-wider text-primary">{s.title}</h3>
              <ul className="mt-2 space-y-2">
                {s.list.map((i) => (
                  <li key={i.id} className="text-sm">
                    <span className="font-medium">{i.title}</span>
                    <span className="text-muted-foreground"> — {i.dueAt ? `${relDay(i.dueAt)} · ` : ""}{getAccount(i.accountId).label}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <Button variant="outline" onClick={() => { navigator.clipboard.writeText(asText()); toast.success("Briefing copied"); }}>
          <Copy className="mr-2 h-4 w-4" />Copy as text
        </Button>
      </DialogContent>
    </Dialog>
  );
}
