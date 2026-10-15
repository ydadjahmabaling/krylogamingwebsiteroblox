# BloxMart — Roblox Store (Vercel-ready)

A dynamic Roblox store with a working login system (users + admin) and an admin
panel for listing/deleting items. Static frontend + Vercel serverless API.

## Features
- **Storefront** (`index.html`) — item catalog, live search, buy button (demo)
- **Login system** — register/log in, HttpOnly session cookie (7 days), bcrypt-hashed passwords
- **Admin panel** (`admin.html`) — admin-only item listing & deletion, gated behind admin role
- **Logo** — uses `logo.png` (navbar, favicon, footer)

## Demo Accounts
| Role  | Username | Password   |
|-------|----------|------------|
| Admin | `admin`  | `admin123` |
| User  | `user`   | `user123`  |

## Deploy to Vercel
1. Push this folder to a Git repo (or run `vercel` in it with the Vercel CLI)
2. Deploy — no environment variables needed
3. Visit `/` for the store, `/admin.html` for the admin panel

## Project Structure
```
index.html          Storefront
admin.html          Admin panel
logo.png            Site logo
assets/             style.css, app.js, admin.js
api/login.js        POST login
api/logout.js       POST logout
api/register.js     POST register
api/me.js           GET current session user
api/items.js        GET catalog | POST add (admin) | DELETE remove (admin)
data/store.js       Shared data layer (users, sessions, items)
vercel.json         Vercel config
```

## Important: Persistence
Vercel serverless functions are **stateless** — the in-memory data store resets
between cold starts, so admin-added items are not permanent there. For a real
store, connect a database. `data/store.js` is the only file you need to change:

- **Vercel Postgres** (recommended): swap `items`/`users`/`sessions` for SQL queries
- **Vercel KV** (Redis): simplest drop-in for sessions + item list
- Keep the exported function signatures (`getSessionUser`, `createSession`, etc.)
  and the rest of the app keeps working unchanged.

## Local Development
```bash
npm i
npx vercel dev        # runs the exact same serverless functions locally
```
