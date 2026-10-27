import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/inbox/AppShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { accounts } from "@/lib/inbox/data";
import { useInbox } from "@/lib/inbox/store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — InboxIQ" },
      { name: "description", content: "Manage accounts, briefing preferences and sample data for InboxIQ." },
      { property: "og:title", content: "Settings — InboxIQ" },
      { property: "og:description", content: "Manage accounts and briefing preferences." },
    ],
  }),
  component: SettingsPage,
});

function Row({ title, desc, defaultOn = true }: { title: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div><p className="text-sm font-medium">{title}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
      <Switch checked={on} onCheckedChange={setOn} />
    </div>
  );
}

function SettingsPage() {
  const { reset } = useInbox();
  return (
    <>
      <PageHeader title="Settings" subtitle="Preferences are stored on this device only." />
      <div className="space-y-6">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h2 className="font-semibold">Accounts</h2>
          <p className="mt-1 text-xs text-muted-foreground">This preview uses sample accounts. Real mailbox connections aren't available yet.</p>
          <div className="mt-3 divide-y divide-border">
            {accounts.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `var(${a.colorVar})` }} />
                  <div className="min-w-0"><p className="text-sm font-medium">{a.label}</p><p className="truncate text-xs text-muted-foreground">{a.address} · {a.provider}</p></div>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">Sample</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-2" disabled>Connect account (coming soon)</Button>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h2 className="font-semibold">Briefing</h2>
          <div className="divide-y divide-border">
            <Row title="Morning briefing" desc="Prepare a summary every day at 7:00 AM" />
            <Row title="Include junk rescue" desc="Show possibly important messages from spam" />
            <Row title="Weekend briefings" desc="Also prepare briefings on Saturday and Sunday" defaultOn={false} />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h2 className="font-semibold">Sample data</h2>
          <p className="mt-1 text-xs text-muted-foreground">Restore all completed, snoozed and edited items to their original state.</p>
          <Button variant="destructive" className="mt-3" onClick={() => { reset(); toast.success("Sample data reset"); }}>Reset sample data</Button>
        </section>
      </div>
    </>
  );
}
