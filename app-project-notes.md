# Project reference notes

Covers: domain setup, and how local-device storage behaves for
signed-out users.

---

## Domain setup

The app runs at **https://app.thewonderwarrior.com**. The bare domain
`thewonderwarrior.com` and `www.thewonderwarrior.com` are **not** attached
to this Vercel project.

### What's happening with the bare domain and www right now

The DNS records at Namecheap still point at Vercel:

| Record | Host | Value |
|--------|------|----------------------------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com.` |

Because neither domain is attached to any Vercel project, visitors see
Vercel's default "This deployment cannot be found" page.

### Two options going forward

#### 1. Leave them as-is

Harmless. Just a Vercel 404 page if anyone visits. Fine for now if the
bare URLs aren't being shared or bookmarked.

#### 2. Point them at a landing site when you build one

When the marketing/landing site is ready (on Framer, Squarespace, Webflow,
or another Next.js project), update the A record and www CNAME at Namecheap
to point at whichever host the landing site uses. Each of those tools gives
you specific records to enter — just paste them into Namecheap's Advanced
DNS tab in place of the current Vercel records.

### One more thing — when you add a landing site

If the landing page has **Sign In** / **Sign Up** CTAs, point them at:

- `https://app.thewonderwarrior.com/signin`
- `https://app.thewonderwarrior.com/signup`

No code change is needed in this project. BetterAuth expects the request's
`Origin` header to match the `BETTER_AUTH_URL` env var (currently
`https://app.thewonderwarrior.com`), and those links take the user straight
to the app where Origin will match correctly.

---

## Local-device storage — what survives, what doesn't

Signed-out users can still write reflections. Those notes save to the
**browser's local storage on that one device**. The data is surprisingly
durable, but with real limits.

### What survives ✓

- **Closing and reopening the app / PWA** — notes stay.
- **Phone restart** — notes stay.
- **Weeks / months of not opening it** — generally fine (iOS *can* evict
  storage from unused apps, but it's rare in practice).

### What wipes it ✗

- **Removing the PWA from the home screen** (uninstalling it) — all local
  notes for that device are gone.
- **Clearing browser/site data manually** in iOS Settings → Safari → Clear
  History and Website Data.
- **Switching devices** — another phone, a laptop, or a friend's device
  won't see those notes. They only exist on the device where they were
  written.

### One subtlety to know about on iOS

The home-screen PWA and regular Safari on the same phone can have
**separate storage**. So if someone writes notes inside the PWA and later
visits `app.thewonderwarrior.com` in Safari itself, they might not see
those notes — even though it's the same URL. Same in reverse.

### The practical takeaway for users

The "save to this browser only" banner on the reflection section is
honest about the tradeoff:

- **Signed out** → notes are safe day-to-day, but tied to one device and
  can be lost if the PWA is removed or storage cleared.
- **Signed in** → notes live in the database, safe across devices and
  reinstalls.

### Gotcha worth flagging to users

If someone writes notes while signed out and later signs up, the local
notes **don't** automatically upload to the database. They'd have to
re-enter or copy-paste them.

If this becomes a problem, we can add a one-time "migrate local notes to
your account" step that runs right after sign-up or first sign-in. It's
about 30 minutes of work; not built yet.
