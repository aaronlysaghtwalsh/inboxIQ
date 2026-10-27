import type { Account, Draft, InsightItem, Thread, WatchEntry } from "./types";

// Synthetic sample data. All people, companies and addresses are fictional.
const DAY = 86_400_000;
const at = (days: number, hour = 9, min = 0) => {
  const d = new Date();
  d.setHours(hour, min, 0, 0);
  return new Date(d.getTime() + days * DAY).toISOString();
};

export const accounts: Account[] = [
  { id: "personal", label: "Personal", address: "maya.chen@fastmail.example", provider: "Fastmail", colorVar: "--acct-1" },
  { id: "career", label: "Career", address: "maya.chen.careers@gmail.example", provider: "Gmail", colorVar: "--acct-2" },
  { id: "work", label: "Freelance", address: "hello@mayachen.studio", provider: "Google Workspace", colorVar: "--acct-3" },
];

export const threads: Thread[] = [
  {
    id: "t1", subject: "Final round — Senior Product Designer", accountId: "career", category: "job-search",
    participants: ["Priya Raman (Lumen Health)", "Maya Chen"], labels: ["Interview", "Lumen Health"],
    messages: [
      { id: "m1", from: "Priya Raman", fromAddress: "priya.raman@lumenhealth.example", to: "Maya Chen", sentAt: at(-3, 14, 12),
        body: "Hi Maya,\n\nThe panel loved your portfolio review. We'd like to invite you to a final round with our VP of Product, Daniel Okafor.\n\nCould you share 2–3 windows that work for you next week? Ideally before Thursday so we can keep momentum.\n\nBest,\nPriya" },
    ],
  },
  {
    id: "t2", subject: "Re: Coffee next month?", accountId: "personal", category: "networking",
    participants: ["Jonah Feld", "Maya Chen"], labels: ["Networking"],
    messages: [
      { id: "m2", from: "Maya Chen", fromAddress: "maya.chen@fastmail.example", to: "Jonah Feld", sentAt: at(-19, 10, 2),
        body: "Jonah — great running into you at the Figma meetup. Would love to hear more about the design systems team at Northwind. Coffee sometime next month?" },
      { id: "m3", from: "Jonah Feld", fromAddress: "jonah@northwind.example", to: "Maya Chen", sentAt: at(-17, 18, 40),
        body: "Absolutely! Things are hectic until the 1st but ping me after and we'll find a time. Also — we're opening a staff designer role soon, happy to refer you." },
    ],
  },
  {
    id: "t3", subject: "Your dental cleaning is confirmed", accountId: "personal", category: "appointments",
    participants: ["Brightside Dental", "Maya Chen"], labels: ["Appointment"],
    messages: [
      { id: "m4", from: "Brightside Dental", fromAddress: "appointments@brightsidedental.example", to: "Maya Chen", sentAt: at(-6, 8, 0),
        body: "Hi Maya, this confirms your cleaning with Dr. Alvarez on " + new Date(at(3, 15, 30)).toDateString() + " at 3:30 PM. Reply C to confirm or call to reschedule. A $40 fee applies for cancellations within 24 hours." },
    ],
  },
  {
    id: "t4", subject: "Invoice #1042 — Brand refresh, phase 2", accountId: "work", category: "general",
    participants: ["Tom Becker (Oakline Coffee)", "Maya Chen"], labels: ["Invoice", "Client"],
    messages: [
      { id: "m5", from: "Maya Chen", fromAddress: "hello@mayachen.studio", to: "Tom Becker", sentAt: at(-24, 11, 0),
        body: "Hi Tom, attaching invoice #1042 for phase 2 ($3,800). Net 15 as agreed. Thanks again — the new packaging looks fantastic on shelf." },
      { id: "m6", from: "Tom Becker", fromAddress: "tom@oaklinecoffee.example", to: "Maya Chen", sentAt: at(-22, 9, 15),
        body: "Got it, passing to accounts. Should go out end of next week." },
    ],
  },
  {
    id: "t5", subject: "Recruiter intro: Staff Designer at Parallel", accountId: "career", category: "recruiting",
    participants: ["Elena Vasquez (Talent, Parallel)", "Maya Chen"], labels: ["Recruiter"],
    messages: [
      { id: "m7", from: "Elena Vasquez", fromAddress: "elena@parallel-recruiting.example", to: "Maya Chen", sentAt: at(-1, 16, 22),
        body: "Hi Maya — I lead design hiring at Parallel. Your work on the Lumen onboarding case study is exactly the kind of thinking we need. Open to a 20-minute chat this week? Comp range is $185–210k + equity." },
    ],
  },
  {
    id: "t6", subject: "Lease renewal — action needed by the 15th", accountId: "personal", category: "personal",
    participants: ["Harbor Property Mgmt", "Maya Chen"], labels: ["Housing"],
    messages: [
      { id: "m8", from: "Harbor Property Management", fromAddress: "leasing@harborpm.example", to: "Maya Chen", sentAt: at(-4, 13, 5),
        body: "Your lease at 418 Elm St, Unit 3B expires in 60 days. Please sign the renewal (12 months, $2,140/mo) or give notice by the 15th. After that date, month-to-month rates apply." },
    ],
  },
  {
    id: "t7", subject: "Congrats on your nomination!", accountId: "personal", category: "general",
    participants: ["AIGA Awards Committee", "Maya Chen"], labels: ["Award"],
    messages: [
      { id: "m9", from: "AIGA Local Chapter", fromAddress: "awards@aiga-local.example", to: "Maya Chen", sentAt: at(-2, 7, 50),
        body: "Your Oakline Coffee packaging has been shortlisted for the Regional Design Awards. Please confirm attendance for the ceremony and submit a 100-word project statement." },
    ],
  },
  {
    id: "t8", subject: "Reference request for Sam Ortiz", accountId: "career", category: "networking",
    participants: ["Sam Ortiz", "Maya Chen"], labels: ["Reference"],
    messages: [
      { id: "m10", from: "Sam Ortiz", fromAddress: "sam.ortiz@mail.example", to: "Maya Chen", sentAt: at(-5, 20, 11),
        body: "Hey Maya! I'm in final rounds at Calder & Co. Would you be willing to be a reference? They may reach out this week. Totally fine if not — thank you either way." },
    ],
  },
  {
    id: "t9", subject: "Promised: portfolio feedback for Leah", accountId: "personal", category: "networking",
    participants: ["Leah Kim", "Maya Chen"], labels: ["Mentorship"],
    messages: [
      { id: "m11", from: "Leah Kim", fromAddress: "leah.kim@school.example", to: "Maya Chen", sentAt: at(-41, 15, 0),
        body: "Thank you so much for chatting at the bootcamp demo day! Here's my portfolio link like you asked. Any feedback whenever you have time would mean a lot." },
      { id: "m12", from: "Maya Chen", fromAddress: "maya.chen@fastmail.example", to: "Leah Kim", sentAt: at(-40, 9, 30),
        body: "Of course! I'll send detailed notes within a couple of weeks." },
    ],
  },
  {
    id: "t10", subject: "Your Lumen Health offer details (action required)", accountId: "career", category: "job-search",
    participants: ["Lumen Health HR", "Maya Chen"], labels: ["Possible spam"],
    messages: [
      { id: "m13", from: "Lumen Health People Team", fromAddress: "people@lumenhealth.example", to: "Maya Chen", sentAt: at(-1, 6, 3),
        body: "Hi Maya, please complete the attached background check consent form so we can move quickly following your final round. This is a standard step for all finalist candidates." },
    ],
  },
  {
    id: "t11", subject: "Package held — customs fee", accountId: "personal", category: "general",
    participants: ["Delivery Notice"], labels: ["Spam"],
    messages: [
      { id: "m14", from: "Parcel Service", fromAddress: "no-reply@parcel-tracking-secure.example", to: "Maya Chen", sentAt: at(-1, 3, 12),
        body: "Your package is held. Pay $2.99 customs fee within 24h via the link below or it will be returned." },
    ],
  },
  {
    id: "t12", subject: "Workshop speaker invite — Design Systems Summit", accountId: "work", category: "networking",
    participants: ["Rina Takahashi (DSS)", "Maya Chen"], labels: ["Speaking", "Possible spam"],
    messages: [
      { id: "m15", from: "Rina Takahashi", fromAddress: "rina@designsystemssummit.example", to: "Maya Chen", sentAt: at(-2, 12, 40),
        body: "We'd love to have you lead a 90-minute workshop on brand-to-product systems. Honorarium $1,500 + travel. Proposals are due in 10 days." },
    ],
  },
  {
    id: "t13", subject: "Annual physical — please book", accountId: "personal", category: "appointments",
    participants: ["Cedar Family Clinic", "Maya Chen"], labels: ["Health"],
    messages: [
      { id: "m16", from: "Cedar Family Clinic", fromAddress: "care@cedarclinic.example", to: "Maya Chen", sentAt: at(-9, 10, 0),
        body: "Our records show you're due for your annual physical. Book online or call. Insurance coverage resets on Jan 1." },
    ],
  },
  {
    id: "t14", subject: "Re: Northwind staff designer role", accountId: "career", category: "recruiting",
    participants: ["Jonah Feld", "Maya Chen"], labels: ["Referral"],
    messages: [
      { id: "m17", from: "Jonah Feld", fromAddress: "jonah@northwind.example", to: "Maya Chen", sentAt: at(0, 8, 15),
        body: "Hey! The staff role just went live. I put your name in with the hiring manager, Ama. She'd like to see your resume by Friday if you're interested." },
    ],
  },
];

export const items: InsightItem[] = [
  { id: "i1", kind: "missed", title: "Lumen Health wants final-round availability", summary: "Priya asked for 2–3 windows next week, ideally before Thursday.", reason: "Hiring manager waiting on you · 3 days unanswered", threadId: "t1", accountId: "career", category: "job-search", importance: "high", urgency: 94, dueAt: at(2, 17) },
  { id: "i2", kind: "followup", title: "Reply to Lumen Health with interview windows", summary: "Keep momentum — suggest Tue/Wed slots and confirm the VP panel.", reason: "Deadline in 2 days", threadId: "t1", accountId: "career", category: "job-search", importance: "high", urgency: 94, dueAt: at(2, 17) },
  { id: "i3", kind: "missed", title: "Jonah referred you for Northwind staff role", summary: "Hiring manager Ama wants your resume by Friday.", reason: "New today · referral from a warm contact", threadId: "t14", accountId: "career", category: "recruiting", importance: "high", urgency: 88, dueAt: at(3, 17), isNew: true },
  { id: "i4", kind: "followup", title: "Send resume to Jonah for Northwind", summary: "Attach your updated resume and thank him for the referral.", reason: "Due Friday", threadId: "t14", accountId: "career", category: "recruiting", importance: "high", urgency: 86, dueAt: at(3, 17), isNew: true },
  { id: "i5", kind: "followup", title: "Chase Oakline invoice #1042", summary: "$3,800 promised \u201cend of next week\u201d — now 22 days ago.", reason: "Payment overdue by ~7 days", threadId: "t4", accountId: "work", category: "general", importance: "high", urgency: 78 },
  { id: "i6", kind: "missed", title: "Recruiter from Parallel reached out", summary: "Staff Designer, $185–210k + equity. Wants a 20-min chat this week.", reason: "Matches your job-search watchlist", threadId: "t5", accountId: "career", category: "recruiting", importance: "medium", urgency: 64, isNew: true },
  { id: "i7", kind: "followup", title: "Answer Sam's reference request", summary: "Calder & Co. may contact you this week.", reason: "Unanswered for 5 days · time-sensitive for Sam", threadId: "t8", accountId: "career", category: "networking", importance: "medium", urgency: 70 },
  { id: "i8", kind: "followup", title: "Book coffee with Jonah", summary: "He said to ping after the 1st. That's coming up.", reason: "You proposed this meeting", threadId: "t2", accountId: "personal", category: "networking", importance: "low", urgency: 40 },
  { id: "i9", kind: "flagged", title: "Lease renewal decision", summary: "Sign 12-month renewal at $2,140/mo or give notice by the 15th.", reason: "Financial · hard deadline", threadId: "t6", accountId: "personal", category: "personal", importance: "high", urgency: 82, dueAt: at(12, 17) },
  { id: "i10", kind: "flagged", title: "Design award shortlist — confirm attendance", summary: "Submit a 100-word statement and RSVP for the ceremony.", reason: "New development · recognition", threadId: "t7", accountId: "personal", category: "general", importance: "medium", urgency: 58, isNew: true },
  { id: "i11", kind: "date", title: "Dental cleaning with Dr. Alvarez", summary: "3:30 PM · $40 fee if cancelled within 24h.", reason: "Appointment", threadId: "t3", accountId: "personal", category: "appointments", importance: "medium", urgency: 50, dueAt: at(3, 15, 30) },
  { id: "i12", kind: "date", title: "Lumen Health availability due", summary: "Priya asked for windows before Thursday.", reason: "Requested deadline", threadId: "t1", accountId: "career", category: "job-search", importance: "high", urgency: 94, dueAt: at(2, 17) },
  { id: "i13", kind: "date", title: "Northwind resume due", summary: "Send to Jonah / hiring manager Ama.", reason: "Requested deadline", threadId: "t14", accountId: "career", category: "recruiting", importance: "high", urgency: 86, dueAt: at(3, 17) },
  { id: "i14", kind: "date", title: "Workshop proposal due — DSS", summary: "90-min workshop, $1,500 honorarium.", reason: "Opportunity deadline", threadId: "t12", accountId: "work", category: "networking", importance: "medium", urgency: 55, dueAt: at(8, 23, 59) },
  { id: "i15", kind: "date", title: "Lease renewal deadline", summary: "Sign or give notice.", reason: "Contract deadline", threadId: "t6", accountId: "personal", category: "personal", importance: "high", urgency: 82, dueAt: at(12, 17) },
  { id: "i16", kind: "memory", title: "You promised Leah portfolio feedback", summary: "You said \u201cwithin a couple of weeks\u201d — that was 40 days ago.", reason: "Unkept commitment", threadId: "t9", accountId: "personal", category: "networking", importance: "medium", urgency: 60 },
  { id: "i17", kind: "memory", title: "Jonah offered a referral weeks ago", summary: "This is the same contact now referring you at Northwind.", reason: "Relationship context", threadId: "t2", accountId: "personal", category: "networking", importance: "low", urgency: 30 },
  { id: "i18", kind: "memory", title: "Annual physical before insurance reset", summary: "Coverage resets Jan 1 — book before year end.", reason: "Older reminder", threadId: "t13", accountId: "personal", category: "appointments", importance: "low", urgency: 35 },
  { id: "i19", kind: "junk", title: "Lumen Health background check form", summary: "Landed in spam, but sender matches your active interview.", reason: "Known sender domain · active job process", threadId: "t10", accountId: "career", category: "job-search", importance: "high", urgency: 80 },
  { id: "i20", kind: "junk", title: "Speaking invite — Design Systems Summit", summary: "Paid workshop invitation filtered as promotional.", reason: "Personalized content · real event", threadId: "t12", accountId: "work", category: "networking", importance: "medium", urgency: 55 },
  { id: "i21", kind: "junk", title: "\u201cPackage held — customs fee\u201d", summary: "Likely phishing. Kept in junk; shown for transparency.", reason: "Suspicious link domain · low confidence", threadId: "t11", accountId: "personal", category: "general", importance: "low", urgency: 5 },
];

export const watchlist: WatchEntry[] = [
  { id: "w1", label: "Lumen Health", match: "lumenhealth.example", type: "company", note: "Active interview — final round", threadIds: ["t1", "t10"] },
  { id: "w2", label: "Jonah Feld", match: "jonah@northwind.example", type: "person", note: "Referral contact at Northwind", threadIds: ["t2", "t14"] },
  { id: "w3", label: "\u201cStaff Designer\u201d", match: "staff designer", type: "keyword", note: "Target role title", threadIds: ["t5", "t14"] },
  { id: "w4", label: "Oakline Coffee", match: "oaklinecoffee.example", type: "company", note: "Client — outstanding invoice", threadIds: ["t4"] },
];

export const initialDrafts: Draft[] = [
  { id: "d1", threadId: "t1", to: "priya.raman@lumenhealth.example", subject: "Re: Final round — Senior Product Designer", tone: "warm", body: "" },
  { id: "d2", threadId: "t14", to: "jonah@northwind.example", subject: "Re: Northwind staff designer role", tone: "enthusiastic", body: "" },
  { id: "d3", threadId: "t4", to: "tom@oaklinecoffee.example", subject: "Following up: Invoice #1042", tone: "formal", body: "" },
  { id: "d4", threadId: "t8", to: "sam.ortiz@mail.example", subject: "Re: Reference request", tone: "warm", body: "" },
];
