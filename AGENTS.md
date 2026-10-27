<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- InboxIQ data lives in `src/lib/inbox/` (types, synthetic data, deterministic draft templates, a localStorage-backed provider); swap the provider/data for FastAPI calls later without touching pages.
- The app shell (sidebar + mobile menu) wraps all routes from `__root.tsx`; each nav section is its own route file.
