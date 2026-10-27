import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/inbox/AppShell";
import { ItemList } from "@/components/inbox/ItemList";
import { itemsByKind } from "@/lib/inbox/store";

export const Route = createFileRoute("/flagged")({
  head: () => ({
    meta: [
      { title: "Flagged — InboxIQ" },
      { name: "description", content: "High-stakes threads InboxIQ thinks deserve a closer look." },
      { property: "og:title", content: "Flagged — InboxIQ" },
      { property: "og:description", content: "High-stakes threads InboxIQ thinks deserve a closer look." },
    ],
  }),
  component: FlaggedPage,
});

function FlaggedPage() {
  return (
    <>
      <PageHeader title="Flagged" subtitle="High-stakes threads InboxIQ thinks deserve a closer look." />
      <ItemList items={itemsByKind("flagged")} />
    </>
  );
}
