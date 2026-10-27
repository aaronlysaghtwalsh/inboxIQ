import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/inbox/AppShell";
import { ItemList } from "@/components/inbox/ItemList";
import { itemsByKind } from "@/lib/inbox/store";

export const Route = createFileRoute("/follow-ups")({
  head: () => ({
    meta: [
      { title: "Follow-Ups — InboxIQ" },
      { name: "description", content: "Replies you owe, ranked by urgency." },
      { property: "og:title", content: "Follow-Ups — InboxIQ" },
      { property: "og:description", content: "Replies you owe, ranked by urgency." },
    ],
  }),
  component: FollowUpsPage,
});

function FollowUpsPage() {
  return (
    <>
      <PageHeader title="Follow-Ups" subtitle="Replies you owe, ranked by urgency." />
      <ItemList items={itemsByKind("followup")} />
    </>
  );
}
