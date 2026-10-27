import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Archive, CalendarClock, Eye, FileText, Flag, Inbox, LayoutDashboard, Menu, Reply, Settings, ShieldAlert,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { accounts } from "@/lib/inbox/data";

const nav = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/missed", label: "What You Missed", icon: Inbox },
  { to: "/follow-ups", label: "Follow-Ups", icon: Reply },
  { to: "/flagged", label: "Flagged", icon: Flag },
  { to: "/memory", label: "Archives & Memory", icon: Archive },
  { to: "/dates", label: "Dates & Commitments", icon: CalendarClock },
  { to: "/junk", label: "Junk Rescue", icon: ShieldAlert },
  { to: "/watchlist", label: "Watchlist", icon: Eye },
  { to: "/drafts", label: "Drafts", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-0.5">
      {nav.map(({ to, label, icon: Icon }) => {
        const active = path === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              active
                ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/60"
            }`}
          >
            <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2 px-3">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-display text-lg text-primary-foreground">
        iq
      </div>
      <span className="font-display text-2xl tracking-tight">InboxIQ</span>
    </div>
  );
}

function Accounts() {
  return (
    <div className="space-y-2 px-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Sample accounts</p>
      {accounts.map((a) => (
        <div key={a.id} className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full" style={{ background: `var(${a.colorVar})` }} />
          <span className="truncate">{a.address}</span>
        </div>
      ))}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col justify-between border-r border-sidebar-border bg-sidebar py-5 lg:flex">
        <div className="space-y-6">
          <Brand />
          <div className="px-2"><NavList /></div>
        </div>
        <Accounts />
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
        <Brand />
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </header>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 bg-sidebar p-0 py-5">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-6">
              <Brand />
              <div className="px-2"><NavList onNavigate={() => setOpen(false)} /></div>
            </div>
            <Accounts />
          </div>
        </SheetContent>
      </Sheet>

      <main className="lg:pl-64">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10">{children}</div>
      </main>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-1 max-w-xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
