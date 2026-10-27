import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/inbox/AppShell";
import { ItemList } from "@/components/inbox/ItemList";
import { itemsByKind } from "@/lib/inbox/store";

export const Route = createFileRoute("/memory")({
  head: () => ({
    meta: [
      { title: "Archives & Memory — InboxIQ" },
      { name: "description", content: "Older commitments and context worth remembering." },
      { property: "og:title", content: "Archives & Memory — InboxIQ" },
      { property: "og:description", content: "Older commitments and context worth remembering." },
    ],
  }),
  component: MemoryPage,
});

function MemoryPage() {
  return (
    <>
      <PageHeader title="Archives & Memory" subtitle="Older commitments and context worth remembering." />
      <ItemList items={itemsByKind("memory")} />
    </>
  );
}
