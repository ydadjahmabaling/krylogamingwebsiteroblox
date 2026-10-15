# Krylo Market

A responsive, Vercel-ready gaming marketplace starter with USD listings, Supabase authentication/database, seller contact messaging, and email-allowlisted admin endpoints.

## Included
- `index.html` — complete homepage and sign-in, listing, and message modals
- `public/styles.css` — responsive dark/blue theme and intro animation
- `app.js` — frontend auth, search/filter/sort, listing creation, and messaging
- `api/` — Vercel serverless API routes
- `database.sql` — Supabase tables and indexes
- `config.json` — public browser config for Supabase URL + anon key
- `logo.png` — replace this placeholder with your own logo file

## Setup (required for real accounts/database)
1. Create a project at https://supabase.com/ and open **SQL Editor**.
2. Run all of `database.sql`.
3. In Supabase **Project Settings → API**, copy the Project URL and **anon/public key** into `config.json`:
   ```json
   {
     "supabaseUrl": "https://YOUR_PROJECT.supabase.co",
     "supabaseAnonKey": "YOUR_SUPABASE_ANON_KEY"
   }
   ```
4. In Supabase **Authentication → URL Configuration**, add your deployed Vercel URL to the site URL / redirect URLs. For local development add `http://localhost:3000`.
5. In Vercel, import this project and set environment variables:
   - `SUPABASE_URL` — same project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — server-only service role key (never put this in `config.json`)
   - `ADMIN_EMAILS` — comma-separated list of trusted admin email addresses
6. Deploy. Redeploy after changing environment variables.
7. For local testing: `npm install`, then `npx vercel dev`.

## Logo
Put your image at `public/logo.png`. The project contains a simple placeholder PNG so the site works immediately. Replace it with your own `logo.png`; keep the filename exactly the same.

## Admin access
There is no public admin-password bypass. An account must sign in through Supabase Auth with an email included in `ADMIN_EMAILS` to use:
- `GET /api/admin-listings` — list all listings, including removed ones
- `PATCH /api/admin-listings?id=LISTING_UUID` with `{"status":"active"}` or `{"status":"removed"}` — moderate a listing
- `DELETE /api/admin-listings?id=LISTING_UUID` — soft-remove a listing
- `GET /api/admin-messages` — review recent messages

Admin endpoints are included; the starter UI is the public storefront. Use the API endpoints with an authenticated Bearer token for moderation. To get a token, sign in through the site and inspect the session in your own browser/app or build a private admin panel. Do not share admin tokens.

## Intro animation
The “go with gaming?” text glitches into “Krylo” on first visit. A localStorage flag prevents the animation from repeating on every refresh. Clearing site data will replay it.

## Important marketplace/payment notes
- All prices are USD. This starter does **not** collect or hold money; contact and payment arrangements are between users. Add a reputable payment provider and server-side order/webhook validation before accepting online payments.
- Digital game accounts/items can violate individual games' terms. Only list goods and services you are allowed to sell, and avoid sharing passwords or sensitive account details in messages.
- Supabase email confirmation may be enabled by default. If so, new users need to verify their email before signing in.
- API routes use the Supabase service role only on the server. Keep it private. For a production marketplace, add rate limiting, abuse reporting, email notifications, moderation tools, and a dedicated admin dashboard.
