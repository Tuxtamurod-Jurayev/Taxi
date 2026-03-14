# Taxi

Shahar va qishloq orasida yolovchi hamda taxi haydovchilarni boglaydigan React + Supabase + Vercel loyihasi.

## Texnologiyalar

- React + Vite
- Supabase Auth / Database / Realtime
- Recharts
- Vercel

## Ishga tushirish

1. `npm install`
2. `.env.example` ni `.env` ga kochiring
3. `.env` ichidagi Supabase qiymatlarini tekshiring
4. `npm run dev`

## Admin login

- Login: `admin`
- Password: `admin123`

Admin kirish hozircha statik `admin / admin123` tekshiruvi bilan ishlaydi.

## Supabase

`supabase/schema.sql` ichida jadval va RLS namunasi bor.

Loyiha `.env` to'ldirilgan bo'lsa Supabase bilan ishlaydi, aks holda local demo holatiga qaytadi.

