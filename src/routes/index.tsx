import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/inbox/AppShell";
import { BriefingDialog } from "@/components/inbox/BriefingDialog";
import { ItemCard } from "@/components/inbox/ItemCard";
import { items } from "@/lib/inbox/data";
import { useInbox } from "@/lib/inbox/store";
import type { InsightItem } from "@/lib/inbox/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InboxIQ — Your daily communications briefing" },
      { name: "description", content: "InboxIQ surfaces what matters across all your email accounts: follow-ups, deadlines, commitments and rescued junk." },
      { property: "og:title", content: "InboxIQ — Your daily communications briefing" },
      { property: "og:description", content: "See what matters across every inbox, ranked and explained." },
    ],
  }),
  component: Overview,
});

function Section({ title, to, list }: { title: string; to: NonNullable<LinkProps["to"]>; list: InsightItem[] }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{title}</h2>
        <Link to={to} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="space-y-2.5">
        {list.length ? list.map((i) => <ItemCard key={i.id} item={i} compact />) : (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">All clear.</p>
        )}
      </div>
    </section>
  );
}

function Overview() {
  const { isActive } = useInbox();
  const live = items.filter(isActive);
  const by = (k: InsightItem["kind"]) => live.filter((i) => i.kind === k);
  const high = live.filter((i) => i.importance === "high").length;
  const date = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  const stats = [
    { label: "High priority", value: high },
    { label: "Follow-ups", value: by("followup").length },
    { label: "Deadlines this week", value: by("date").filter((i) => new Date(i.dueAt!).getTime() - Date.now() < 7 * 864e5).length },
    { label: "Rescued from junk", value: by("junk").filter((i) => i.importance !== "low").length },
  ];

  return (
    <>
      <PageHeader title="Good morning, Maya." subtitle={`${date} · Here's what matters across your 3 inboxes.`} action={<BriefingDialog />} />

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <p className="font-display text-4xl">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-8 rounded-2xl bg-brief p-5 text-primary-foreground sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-wider opacity-80">Top of mind</p>
        <p className="mt-2 font-display text-2xl leading-snug sm:text-3xl">
          Two job opportunities are moving fast — Lumen Health needs your availability and Jonah's Northwind referral wants a resume by Friday.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Section title="Requires attention" to="/missed" list={by("missed")} />
        <Section title="Follow-ups by urgency" to="/follow-ups" list={by("followup").sort((a, b) => b.urgency - a.urgency).slice(0, 4)} />
        <Section title="New developments" to="/flagged" list={live.filter((i) => i.isNew && i.kind !== "followup" && i.kind !== "missed").concat(by("flagged").filter((i) => !i.isNew)).slice(0, 3)} />
        <Section title="Upcoming deadlines" to="/dates" list={by("date").sort((a, b) => a.dueAt!.localeCompare(b.dueAt!)).slice(0, 4)} />
        <Section title="Older commitments" to="/memory" list={by("memory")} />
        <Section title="Possibly important junk" to="/junk" list={by("junk").filter((i) => i.importance !== "low")} />
      </div>
    </>
  );
}
