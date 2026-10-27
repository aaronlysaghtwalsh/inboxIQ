import { accounts, threads } from "./data";
import type { Category } from "./types";

export const getAccount = (id: string) => accounts.find((a) => a.id === id)!;
export const getThread = (id: string) => threads.find((t) => t.id === id)!;

export const categoryLabels: Record<Category, string> = {
  personal: "Personal", "job-search": "Job search", recruiting: "Recruiting",
  networking: "Networking", appointments: "Appointments", general: "General",
};

export function relDay(iso: string) {
  const d = new Date(iso);
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const diff = Math.round((new Date(d).setHours(0, 0, 0, 0) - start.getTime()) / 86_400_000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff > 1 && diff < 7) return `In ${diff} days`;
  if (diff < -1 && diff > -60) return `${-diff} days ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export const fullDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
