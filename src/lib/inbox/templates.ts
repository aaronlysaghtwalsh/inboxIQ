import type { Tone } from "./types";

// Deterministic sample templates. No AI service is called; "regenerate"
// cycles through variants by index so output is predictable.
type Ctx = { name: string; topic: string; ask: string };

const variants: Record<Tone, ((c: Ctx) => string)[]> = {
  warm: [
    (c) => `Hi ${c.name},\n\nThank you so much for reaching out about ${c.topic}. ${c.ask}\n\nReally appreciate it, and looking forward to it.\n\nWarmly,\nMaya`,
    (c) => `Hi ${c.name},\n\nSo glad to hear from you! On ${c.topic}: ${c.ask}\n\nLet me know if anything else would help.\n\nBest,\nMaya`,
  ],
  concise: [
    (c) => `Hi ${c.name},\n\nRe ${c.topic}: ${c.ask}\n\nThanks,\nMaya`,
    (c) => `${c.name} — quick reply on ${c.topic}. ${c.ask}\n\n— Maya`,
  ],
  formal: [
    (c) => `Dear ${c.name},\n\nThank you for your message regarding ${c.topic}. ${c.ask}\n\nPlease let me know if you require anything further.\n\nKind regards,\nMaya Chen`,
    (c) => `Dear ${c.name},\n\nI am writing in reference to ${c.topic}. ${c.ask}\n\nI appreciate your attention to this matter.\n\nSincerely,\nMaya Chen`,
  ],
  enthusiastic: [
    (c) => `Hi ${c.name}!\n\nThis is great news about ${c.topic}! ${c.ask}\n\nCan't wait — thank you!\n\nMaya`,
    (c) => `Hey ${c.name},\n\nThrilled about ${c.topic}! ${c.ask}\n\nThanks a million,\nMaya`,
  ],
};

const contexts: Record<string, Ctx> = {
  t1: { name: "Priya", topic: "the final round", ask: "I'm available Tuesday 10am–12pm, Wednesday 1–4pm, or Thursday morning. Happy to adapt to Daniel's schedule." },
  t14: { name: "Jonah", topic: "the staff designer role", ask: "I've attached my updated resume — please pass it along to Ama, and thank you for putting my name in." },
  t4: { name: "Tom", topic: "invoice #1042 ($3,800)", ask: "Could you confirm when payment is scheduled? It was due on Net 15 terms and I haven't seen it come through yet." },
  t8: { name: "Sam", topic: "your reference request", ask: "Yes, I'd be happy to be a reference for Calder & Co. Feel free to share my email and phone number." },
};

export const toneLabels: Record<Tone, string> = {
  warm: "Warm", concise: "Concise", formal: "Formal", enthusiastic: "Enthusiastic",
};

export function generateDraft(threadId: string, tone: Tone, variant = 0): string {
  const ctx = contexts[threadId] ?? { name: "there", topic: "your note", ask: "Thanks for the update — I'll follow up shortly." };
  const list = variants[tone];
  return list[variant % list.length]?.(ctx) ?? "";
}
