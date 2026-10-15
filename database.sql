-- Run this in the Supabase SQL Editor for your project.
create extension if not exists pgcrypto;

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 90),
  description text not null check (char_length(description) between 10 and 1500),
  price numeric(10,2) not null check (price > 0 and price <= 999999),
  category text not null check (category in ('Game Items','Accounts','Services','Collectibles','Other')),
  image_url text,
  seller_id uuid not null references auth.users(id) on delete cascade,
  seller_name text not null default 'Player',
  status text not null default 'active' check (status in ('active','removed')),
  created_at timestamptz not null default now()
);
create index if not exists listings_active_created on public.listings(status, created_at desc);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  sender_email text not null,
  body text not null check (char_length(body) between 1 and 1200),
  created_at timestamptz not null default now()
);
create index if not exists messages_listing_created on public.messages(listing_id, created_at);
create index if not exists messages_participants on public.messages(sender_id, recipient_id);

-- Browser clients cannot query tables directly. All database access is performed by
-- Vercel API routes using the service-role key after verifying the caller's JWT.
alter table public.listings enable row level security;
alter table public.messages enable row level security;
-- Do NOT expose the Supabase service-role key in config.json or frontend JavaScript.
