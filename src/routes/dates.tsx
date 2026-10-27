import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/inbox/AppShell";
import { ItemCard } from "@/components/inbox/ItemCard";
import { itemsByKind, useInbox } from "@/lib/inbox/store";

export const Route = createFileRoute("/dates")({
  head: () => ({
    meta: [
      { title: "Dates & Commitments — InboxIQ" },
      { name: "description", content: "Deadlines, appointments and promises pulled from your email into one timeline." },
      { property: "og:title", content: "Dates & Commitments — InboxIQ" },
      { property: "og:description", content: "Every deadline and appointment from your inboxes on one timeline." },
    ],
  }),
  component: DatesPage,
});

function DatesPage() {
  const { isActive } = useInbox();
  const list = itemsByKind("date").filter(isActive).sort((a, b) => a.dueAt!.localeCompare(b.dueAt!));
  const groups = new Map<string, typeof list>();
  list.forEach((i) => {
    const k = new Date(i.dueAt!).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
    groups.set(k, [...(groups.get(k) ?? []), i]);
  });

  return (
    <>
      <PageHeader title="Dates & Commitments" subtitle="Deadlines, appointments and promises extracted from your conversations." />
      <div className="space-y-6">
        {[...groups].map(([day, l]) => (
          <section key={day} className="grid gap-3 sm:grid-cols-[160px_1fr]">
            <p className="font-display text-xl text-primary sm:pt-3">{day}</p>
            <div className="space-y-2.5">{l.map((i) => <ItemCard key={i.id} item={i} />)}</div>
          </section>
        ))}
        {!list.length && <p className="text-sm text-muted-foreground">No upcoming dates.</p>}
      </div>
    </>
  );
}
