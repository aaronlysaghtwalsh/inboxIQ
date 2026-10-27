import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Hash, User } from "lucide-react";
import { PageHeader } from "@/components/inbox/AppShell";
import { ThreadSheet } from "@/components/inbox/ThreadSheet";
import { AccountDot } from "@/components/inbox/ItemCard";
import { watchlist } from "@/lib/inbox/data";
import { getThread, relDay } from "@/lib/inbox/format";

export const Route = createFileRoute("/watchlist")({
  head: () => ({
    meta: [
      { title: "Watchlist — InboxIQ" },
      { name: "description", content: "People, companies and keywords InboxIQ watches for across all your inboxes." },
      { property: "og:title", content: "Watchlist — InboxIQ" },
      { property: "og:description", content: "Never miss a message from the people and companies that matter." },
    ],
  }),
  component: WatchlistPage,
});

const icons = { person: User, company: Building2, keyword: Hash };

function WatchlistPage() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <PageHeader title="Watchlist" subtitle="People, companies and keywords that always get surfaced, whichever inbox they land in." />
      <div className="grid gap-4 sm:grid-cols-2">
        {watchlist.map((w) => {
          const Icon = icons[w.type];
          return (
            <div key={w.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon className="h-4 w-4" /></div>
                <div className="min-w-0">
                  <p className="font-semibold">{w.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{w.match}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{w.note}</p>
              <div className="mt-4 space-y-1.5 border-t border-border pt-3">
                {w.threadIds.map((id) => {
                  const t = getThread(id);
                  const last = t.messages[t.messages.length - 1];
                  return (
                    <button key={id} onClick={() => setOpen(id)} className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted">
                      <span className="truncate">{t.subject}</span>
                      <span className="flex shrink-0 items-center gap-2"><AccountDot id={t.accountId} /><span className="text-xs text-muted-foreground">{relDay(last.sentAt)}</span></span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {open && <ThreadSheet threadId={open} open onOpenChange={(o) => !o && setOpen(null)} />}
    </>
  );
}
