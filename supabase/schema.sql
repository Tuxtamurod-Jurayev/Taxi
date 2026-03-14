create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  telegram_id bigint unique,
  name text,
  phone text,
  role text check (role in ('admin', 'taxi', 'passenger')) not null default 'passenger',
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  login text primary key,
  password text not null
);

insert into public.admin_users (login, password)
values ('admin', 'admin123')
on conflict (login) do update set password = excluded.password;

create table if not exists public.passenger_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  passenger_name text,
  from_location text not null,
  to_location text not null,
  departure_time timestamptz not null,
  phone text not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.taxi_routes (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid references public.users(id) on delete set null,
  driver_name text,
  driver_phone text,
  car_model text,
  car_plate text,
  from_location text not null,
  to_location text not null,
  departure_time timestamptz not null,
  seats integer not null default 1,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  passenger_id uuid references public.passenger_requests(id) on delete cascade,
  taxi_id uuid references public.taxi_routes(id) on delete cascade,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.passenger_requests enable row level security;
alter table public.taxi_routes enable row level security;
alter table public.bookings enable row level security;

alter table public.passenger_requests add column if not exists passenger_name text;
alter table public.taxi_routes add column if not exists driver_name text;
alter table public.taxi_routes add column if not exists driver_phone text;
alter table public.taxi_routes add column if not exists car_model text;
alter table public.taxi_routes add column if not exists car_plate text;

drop policy if exists "Passenger requests are readable by authenticated users" on public.passenger_requests;
drop policy if exists "Passenger can insert own request" on public.passenger_requests;
drop policy if exists "Taxi routes are readable by authenticated users" on public.taxi_routes;
drop policy if exists "Taxi can insert own route" on public.taxi_routes;

create policy "Passenger requests are readable by everyone"
on public.passenger_requests
for select
to anon, authenticated
using (true);

create policy "Passenger requests can be inserted by everyone"
on public.passenger_requests
for insert
to anon, authenticated
with check (true);

create policy "Passenger requests can be deleted by everyone"
on public.passenger_requests
for delete
to anon, authenticated
using (true);

create policy "Taxi routes are readable by everyone"
on public.taxi_routes
for select
to anon, authenticated
using (true);

create policy "Taxi routes can be inserted by everyone"
on public.taxi_routes
for insert
to anon, authenticated
with check (true);
