import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, MessageSquareText, RefreshCw, Save } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/inbox/AppShell";
import { ThreadSheet } from "@/components/inbox/ThreadSheet";
import { AccountDot } from "@/components/inbox/ItemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getThread, relDay } from "@/lib/inbox/format";
import { useInbox } from "@/lib/inbox/store";
import { toneLabels } from "@/lib/inbox/templates";
import type { Tone } from "@/lib/inbox/types";

export const Route = createFileRoute("/drafts")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s["id"] === "string" ? s["id"] : undefined }),
  head: () => ({
    meta: [
      { title: "Drafts — InboxIQ" },
      { name: "description", content: "Suggested replies you can edit, re-tone and copy." },
      { property: "og:title", content: "Drafts — InboxIQ" },
      { property: "og:description", content: "Suggested replies you can edit, re-tone and copy." },
    ],
  }),
  component: DraftsPage,
});

function DraftsPage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate({ from: "/drafts" });
  const { drafts, saveDraft, regenerate } = useInbox();
  const current = drafts.find((d) => d.id === id) ?? drafts[0]!;
  const [subject, setSubject] = useState(current.subject);
  const [body, setBody] = useState(current.body);
  const [tone, setTone] = useState<Tone>(current.tone);
  const [ctx, setCtx] = useState(false);

  useEffect(() => {
    setSubject(current.subject); setBody(current.body); setTone(current.tone);
  }, [current.id, current.body, current.subject, current.tone]);

  const dirty = subject !== current.subject || body !== current.body || tone !== current.tone;
  const t = getThread(current.threadId);

  return (
    <>
      <PageHeader title="Drafts" subtitle="Suggested replies generated from sample templates. Edit freely — nothing is sent." />
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col">
          {drafts.map((d) => (
            <button
              key={d.id}
              onClick={() => navigate({ search: { id: d.id } })}
              className={`min-w-[220px] rounded-xl border p-3 text-left transition lg:min-w-0 ${
                d.id === current.id ? "border-primary bg-accent" : "border-border bg-card hover:border-ring/40"
              }`}
            >
              <p className="truncate text-sm font-semibold">{d.subject}</p>
              <p className="truncate text-xs text-muted-foreground">To {d.to}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{d.savedAt ? `Saved ${relDay(d.savedAt).toLowerCase()}` : "Suggested"} · {toneLabels[d.tone]}</p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-card sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <AccountDot id={t.accountId} />
            <Button variant="ghost" size="sm" onClick={() => setCtx(true)}><MessageSquareText className="mr-1.5 h-4 w-4" />View conversation</Button>
          </div>
          <div className="mt-3 space-y-3">
            <div className="text-sm"><span className="text-muted-foreground">To: </span>{current.to}</div>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Subject" />
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(toneLabels) as Tone[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setTone(k)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    tone === k ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"
                  }`}
                >
                  {toneLabels[k]}
                </button>
              ))}
            </div>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={12} className="font-sans leading-relaxed" aria-label="Draft body" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => { setBody(regenerate(current.id, tone)); toast(`Regenerated in ${toneLabels[tone].toLowerCase()} tone`); }}>
              <RefreshCw className="mr-2 h-4 w-4" />Regenerate
            </Button>
            <Button variant="outline" onClick={() => { navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`); toast.success("Draft copied"); }}>
              <Copy className="mr-2 h-4 w-4" />Copy
            </Button>
            <Button className="ml-auto" disabled={!dirty} onClick={() => { saveDraft(current.id, { subject, body, tone }); toast.success("Draft saved"); }}>
              <Save className="mr-2 h-4 w-4" />Save
            </Button>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">Templates are deterministic samples — no AI service is called.</p>
        </div>
      </div>
      <ThreadSheet threadId={current.threadId} open={ctx} onOpenChange={setCtx} />
    </>
  );
}
