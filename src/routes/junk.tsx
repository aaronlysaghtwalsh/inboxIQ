import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/inbox/AppShell";
import { ItemList } from "@/components/inbox/ItemList";
import { itemsByKind } from "@/lib/inbox/store";

export const Route = createFileRoute("/junk")({
  head: () => ({
    meta: [
      { title: "Junk Rescue — InboxIQ" },
      { name: "description", content: "Messages filtered as spam that may actually matter." },
      { property: "og:title", content: "Junk Rescue — InboxIQ" },
      { property: "og:description", content: "Messages filtered as spam that may actually matter." },
    ],
  }),
  component: JunkPage,
});

function JunkPage() {
  return (
    <>
      <PageHeader title="Junk Rescue" subtitle="Messages filtered as spam that may actually matter." />
      <ItemList items={itemsByKind("junk")} />
    </>
  );
}
