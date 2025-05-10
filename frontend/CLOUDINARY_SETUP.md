# File Upload with Cloudinary and Next.js

This project uses Next.js API routes for file uploads to Cloudinary.

## Setup

1. Create a `.env.local` file in the Frontend directory based on `.env.local.example`:

```
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Replace the placeholder values with your actual Cloudinary and Supabase credentials.

3. Make sure the Cloudinary npm package is installed:

```bash
npm install cloudinary
```

## How File Upload Works

1. When a user uploads a thesis document or supplementary files, the `uploadFileToCloudinary` function in `AddThesisSection.tsx` creates a FormData object and sends it to the `/api/upload` Next.js API route.

2. The API route (`/api/upload/route.ts`) receives the file, processes it as a buffer, and uploads it to Cloudinary.

3. The API route returns a JSON response with the Cloudinary URL, which is then stored in the Supabase database along with the thesis metadata.

4. Files are organized in Cloudinary folders based on their type:
   - PDF files go to 'manggad/pdf'
   - Images go to 'manggad/img'
   - Other files go to 'manggad/other'

## Type Safety

The implementation includes TypeScript types for all API responses and Cloudinary interactions to ensure type safety throughout the application.
