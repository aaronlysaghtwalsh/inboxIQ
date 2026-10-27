import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { categoryLabels, fullDate, getAccount, getThread } from "@/lib/inbox/format";
import { useInbox } from "@/lib/inbox/store";
import type { InsightItem } from "@/lib/inbox/types";

export function ThreadSheet({
  threadId, open, onOpenChange, item,
}: { threadId: string; open: boolean; onOpenChange: (o: boolean) => void; item?: InsightItem }) {
  const t = getThread(threadId);
  const a = getAccount(t.accountId);
  const { drafts } = useInbox();
  const draft = drafts.find((d) => d.threadId === threadId);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader className="text-left">
          <SheetDescription className="text-xs uppercase tracking-wider">Conversation</SheetDescription>
          <SheetTitle className="font-display text-3xl font-normal leading-tight">{t.subject}</SheetTitle>
        </SheetHeader>

        {item && (
          <div className="mt-4 rounded-xl bg-accent p-4 text-sm text-accent-foreground">
            <p className="flex items-center gap-1.5 font-semibold"><Sparkles className="h-4 w-4" /> Why this surfaced</p>
            <p className="mt-1">{item.reason}. {item.summary}</p>
          </div>
        )}

        <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-border p-4 text-xs">
          <div><dt className="text-muted-foreground">Account</dt><dd className="mt-0.5 font-medium">{a.label} · {a.provider}</dd></div>
          <div><dt className="text-muted-foreground">Address</dt><dd className="mt-0.5 truncate font-medium">{a.address}</dd></div>
          <div><dt className="text-muted-foreground">Category</dt><dd className="mt-0.5 font-medium">{categoryLabels[t.category]}</dd></div>
          <div><dt className="text-muted-foreground">Messages</dt><dd className="mt-0.5 font-medium">{t.messages.length}</dd></div>
          <div className="col-span-2"><dt className="text-muted-foreground">Participants</dt><dd className="mt-0.5 font-medium">{t.participants.join(", ")}</dd></div>
          <div className="col-span-2 flex flex-wrap gap-1.5">
            {t.labels.map((l) => <span key={l} className="rounded-md bg-muted px-2 py-0.5 text-muted-foreground">{l}</span>)}
          </div>
        </dl>

        <div className="mt-6 space-y-4">
          {t.messages.map((m) => (
            <article key={m.id} className="rounded-xl border border-border bg-card p-4">
              <header className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{m.from}</p>
                  <p className="text-xs text-muted-foreground">{m.fromAddress} → {m.to}</p>
                </div>
                <time className="text-xs text-muted-foreground">{fullDate(m.sentAt)}</time>
              </header>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">{m.body}</p>
            </article>
          ))}
        </div>

        {draft && (
          <Button asChild className="mt-6 w-full">
            <Link to="/drafts" search={{ id: draft.id }}>Open suggested reply</Link>
          </Button>
        )}
        <p className="mt-4 text-center text-[11px] text-muted-foreground">Sample conversation · no real mailbox connected</p>
      </SheetContent>
    </Sheet>
  );
}
