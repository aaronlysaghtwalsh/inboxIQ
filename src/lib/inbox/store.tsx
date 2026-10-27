import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { initialDrafts, items as allItems } from "./data";
import { generateDraft } from "./templates";
import type { Draft, InsightItem, ItemState, Tone } from "./types";

// Local UI state (completion, snoozes, drafts). Persisted to localStorage
// until a FastAPI backend replaces this provider.
const KEY = "inboxiq-state-v1";

interface Persisted {
  itemState: Record<string, ItemState>;
  drafts: Draft[];
  variants: Record<string, number>;
}

const seedDrafts = () => initialDrafts.map((d) => ({ ...d, body: generateDraft(d.threadId, d.tone) }));

interface Store {
  itemState: Record<string, ItemState>;
  drafts: Draft[];
  isActive: (i: InsightItem) => boolean;
  toggleDone: (id: string) => void;
  snooze: (id: string, days: number) => void;
  unsnooze: (id: string) => void;
  saveDraft: (id: string, patch: Partial<Draft>) => void;
  regenerate: (id: string, tone: Tone) => string;
  reset: () => void;
}

const Ctx = createContext<Store | null>(null);

export function InboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(() => ({ itemState: {}, drafts: seedDrafts(), variants: {} }));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, loaded]);

  const setItem = (id: string, patch: ItemState) =>
    setState((s) => ({ ...s, itemState: { ...s.itemState, [id]: { ...s.itemState[id], ...patch } } }));

  const isActive = useCallback(
    (i: InsightItem) => {
      const st = state.itemState[i.id];
      if (st?.done) return false;
      if (st?.snoozedUntil && new Date(st.snoozedUntil) > new Date()) return false;
      return true;
    },
    [state.itemState],
  );

  const regenerate = (id: string, tone: Tone) => {
    const d = state.drafts.find((x) => x.id === id)!;
    const v = (state.variants[id] ?? 0) + 1;
    const body = generateDraft(d.threadId, tone, v);
    setState((s) => ({ ...s, variants: { ...s.variants, [id]: v } }));
    return body;
  };

  const value = useMemo<Store>(
    () => ({
      itemState: state.itemState,
      drafts: state.drafts,
      isActive,
      toggleDone: (id) => setItem(id, { done: !state.itemState[id]?.done }),
      snooze: (id, days) => setItem(id, { snoozedUntil: new Date(Date.now() + days * 86_400_000).toISOString() }),
      unsnooze: (id) => setItem(id, { snoozedUntil: undefined }),
      saveDraft: (id, patch) =>
        setState((s) => ({
          ...s,
          drafts: s.drafts.map((d) => (d.id === id ? { ...d, ...patch, savedAt: new Date().toISOString() } : d)),
        })),
      regenerate,
      reset: () => setState({ itemState: {}, drafts: seedDrafts(), variants: {} }),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, isActive],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useInbox() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useInbox must be used inside InboxProvider");
  return c;
}

export const itemsByKind = (kind: InsightItem["kind"]) =>
  allItems.filter((i) => i.kind === kind).sort((a, b) => b.urgency - a.urgency);
