This project is an online thesis repository for La Consolacion College Bacolod. It is a web application with a Next.js frontend and a Node.js backend.

### Tech Stack

**Frontend:**

*   **Framework:** Next.js
*   **Language:** TypeScript
*   **UI Libraries:**
    *   React
    *   Tailwind CSS
    *   Shadcn UI
    *   MagicUI
    *   Framer Motion
    *   Sentry for error tracking
    *   PostHog for analytics
*   **Data Fetching:** SWR
*   **Authentication:** NextAuth.js, Supabase
*   **File Uploads:** Cloudinary

**Backend:**

*   **Framework:** Express.js
*   **Language:** TypeScript
*   **Database:** Supabase (PostgreSQL)
*   **Environment Variable Management:** Doppler

### Environment Variables

The application uses environment variables for configuration. Here's how they are structured:

**Frontend (`Frontend\.env`):**

*   `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name.
*   `CLOUDINARY_API_KEY`: Cloudinary API key.
*   `CLOUDINARY_API_SECRET`: Cloudinary API secret.
*   `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key.

**Backend (`Backend/\\.env`):**

*   `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name.
*   `CLOUDINARY_API_KEY`: Cloudinary API key.
*   `CLOUDINARY_API_SECRET`: Cloudinary API secret.
*   `SUPABASE_DATABASE_URL`: Supabase project URL.
*   `SUPABASE_ANON_KEY`: Supabase anonymous key.

### Project Structure

```
manggad-thesis-repo/
├── Backend/
│   ├── database_migration/
│   │   ├── schema/
│   │   ├── scripts/
│   │   ├── seeds/
│   ├── lib/
│   ├── .env
│   ├── package.json
│   ├── readme.md
│   ├── server.ts
│   └── tsconfig.json
├── Frontend/
│   ├── app/
│   │   ├── (user)/
│   │   ├── _components/
│   │   ├── about/
│   │   ├── admin/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── faq/
│   │   ├── home/
│   ├── components/
│   │   ├── magicui/
│   │   ├── spaSections/
│   │   ├── ui/
│   ├── constants/
│   ├── lib/
│   ├── public/
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   ├── sentry.edge.config.ts
│   ├── sentry.server.config.ts
│   ├── tailwind.config.ts
│   ├── test-api.js
│   └── tsconfig.json
```

### How it all connects

1.  The **Next.js frontend** is the main entry point for users.
2.  It uses **NextAuth.js** and **Supabase** for authentication.
3.  **Cloudinary** is used for image uploads and management.
4.  The **Express.js backend** provides a REST API for the frontend.
5.  **Supabase** serves as the primary database which is online.
6.  **Doppler** is used to manage environment variables securely in the backend.
7.  **Sentry** is used for error monitoring and **PostHog** for product analytics.
