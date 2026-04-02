# Cargo Trace System Tracking MVP

Production-ready MVP delivery tracking system built with Next.js App Router, TypeScript, Tailwind CSS, MongoDB, Mongoose, and NextAuth credentials authentication.

## Features

- Public tracking lookup at `/` and `/track/[trackingNumber]`
- Protected admin login at `/admin/login`
- Admin dashboard with shipment stats and searchable shipment table
- Shipment creation with auto-generated tracking numbers
- Shipment detail view with metadata editing and tracking update form
- Tracking timeline for both public and admin views
- MongoDB-backed seed flow for a default admin account

## Tech Stack

- Next.js 15.5
- React 19
- TypeScript
- Tailwind CSS 4
- MongoDB + Mongoose
- NextAuth
- Zod
- React Hook Form
- bcryptjs
- Sonner toasts

## Environment Variables

Create a `.env.local` file based on `.env.example`.

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cargotracesystem
NEXTAUTH_SECRET=replace-with-a-long-random-secret
NEXTAUTH_URL=http://localhost:3000
ADMIN_NAME=Cargo Trace System Admin
ADMIN_EMAIL=admin@cargotracesystem.local
ADMIN_PASSWORD=change-this-password
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Seed the default admin manually if needed:

```bash
npm run seed
```

The login flow also attempts to seed the default admin automatically if no admin exists yet and the admin env vars are configured.

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm run start
```

## Project Structure

```text
.
├── app
│   ├── admin
│   │   ├── (dashboard)
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── page.tsx
│   │   │   └── shipments
│   │   │       ├── [id]/page.tsx
│   │   │       ├── new/page.tsx
│   │   │       └── page.tsx
│   │   └── login/page.tsx
│   ├── api
│   │   ├── auth/[...nextauth]/route.ts
│   │   └── track/[trackingNumber]/route.ts
│   ├── track/[trackingNumber]/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components
│   ├── admin
│   ├── forms
│   ├── public
│   └── shared
├── lib
│   ├── actions
│   ├── auth.ts
│   ├── constants.ts
│   ├── data.ts
│   ├── mongodb.ts
│   ├── seed.ts
│   ├── tracking-number.ts
│   ├── utils.ts
│   └── validation.ts
├── models
│   ├── Admin.ts
│   ├── Shipment.ts
│   └── TrackingHistory.ts
├── scripts
│   └── seed-admin.ts
├── types
│   ├── index.ts
│   └── next-auth.d.ts
├── middleware.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Notes

- Admin routes are protected by `middleware.ts` and server-side session checks.
- Tracking numbers are generated in the format `CTS-YYYY-XXXXXXXX`.
- Every shipment creation writes the first tracking history entry automatically.
- Every tracking update refreshes the shipment’s current location and current status.
- The app is structured to deploy cleanly on Vercel once MongoDB and auth env vars are configured.
# delivery-site
# delivery-site
# delivery-site
# delivery-site
