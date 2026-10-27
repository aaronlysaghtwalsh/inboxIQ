import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { accounts } from "@/lib/inbox/data";
import { categoryLabels } from "@/lib/inbox/format";
import { useInbox } from "@/lib/inbox/store";
import type { InsightItem } from "@/lib/inbox/types";
import { ItemCard } from "./ItemCard";

export function ItemList({ items, empty = "Nothing here — you're all caught up." }: { items: InsightItem[]; empty?: string }) {
  const { isActive } = useInbox();
  const [imp, setImp] = useState("all");
  const [acct, setAcct] = useState("all");
  const [cat, setCat] = useState("all");
  const [showHidden, setShowHidden] = useState(false);

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (imp === "all" || i.importance === imp) &&
          (acct === "all" || i.accountId === acct) &&
          (cat === "all" || i.category === cat) &&
          (showHidden || isActive(i)),
      ),
    [items, imp, acct, cat, showHidden, isActive],
  );
  const hiddenCount = items.filter((i) => !isActive(i)).length;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Select value={imp} onValueChange={setImp}>
          <SelectTrigger className="h-9 w-[140px] bg-card"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All importance</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={acct} onValueChange={setAcct}>
          <SelectTrigger className="h-9 w-[140px] bg-card"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All accounts</SelectItem>
            {accounts.map((a) => <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="h-9 w-[150px] bg-card"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {Object.entries(categoryLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
        <label className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          <Switch checked={showHidden} onCheckedChange={setShowHidden} />
          Show done & snoozed ({hiddenCount})
        </label>
      </div>
      <div className="space-y-3">
        {filtered.length ? filtered.map((i) => <ItemCard key={i.id} item={i} />) : (
          <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">{empty}</p>
        )}
      </div>
    </div>
  );
}
