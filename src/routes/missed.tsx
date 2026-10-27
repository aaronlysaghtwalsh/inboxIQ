import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/inbox/AppShell";
import { ItemList } from "@/components/inbox/ItemList";
import { itemsByKind } from "@/lib/inbox/store";

export const Route = createFileRoute("/missed")({
  head: () => ({
    meta: [
      { title: "What You Missed — InboxIQ" },
      { name: "description", content: "Important messages that slipped past while you were busy." },
      { property: "og:title", content: "What You Missed — InboxIQ" },
      { property: "og:description", content: "Important messages that slipped past while you were busy." },
    ],
  }),
  component: MissedPage,
});

function MissedPage() {
  return (
    <>
      <PageHeader title="What You Missed" subtitle="Important messages that slipped past while you were busy." />
      <ItemList items={itemsByKind("missed")} />
    </>
  );
}
