// Shared domain types. Shapes mirror the planned FastAPI response models
// so the sample data layer can later be swapped for real API calls.

export type Importance = "high" | "medium" | "low";
export type Category =
  | "personal"
  | "job-search"
  | "recruiting"
  | "networking"
  | "appointments"
  | "general";
export type ItemKind = "missed" | "followup" | "flagged" | "memory" | "date" | "junk";
export type Tone = "warm" | "concise" | "formal" | "enthusiastic";

export interface Account {
  id: string;
  label: string;
  address: string;
  provider: string;
  colorVar: string; // CSS variable name for the account dot
}

export interface Message {
  id: string;
  from: string;
  fromAddress: string;
  to: string;
  sentAt: string; // ISO
  body: string;
}

export interface Thread {
  id: string;
  subject: string;
  accountId: string;
  category: Category;
  participants: string[];
  labels: string[];
  messages: Message[];
}

export interface InsightItem {
  id: string;
  kind: ItemKind;
  title: string;
  summary: string;
  reason: string; // why InboxIQ surfaced it
  threadId: string;
  accountId: string;
  category: Category;
  importance: Importance;
  urgency: number; // 0-100, for ranking follow-ups
  dueAt?: string; // ISO
  isNew?: boolean;
}

export interface Draft {
  id: string;
  threadId: string;
  to: string;
  subject: string;
  tone: Tone;
  body: string;
  savedAt?: string;
}

export interface WatchEntry {
  id: string;
  label: string;
  match: string; // person, domain, or keyword
  type: "person" | "company" | "keyword";
  note: string;
  threadIds: string[];
}

export interface ItemState {
  done?: boolean;
  snoozedUntil?: string;
}
