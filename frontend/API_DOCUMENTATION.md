# Next.js Fullstack API Documentation

This project now uses Next.js API routes instead of a separate backend. All API endpoints are located in the `app/api` directory.

## API Endpoints

### Books API

#### Get All Books

- **GET** `/api/books`
- Returns all books from the database
- Response: `{ success: boolean, data: Book[] }`

#### Get Book by ID

- **GET** `/api/books/[id]`
- Returns a specific book by its ID
- Response: `{ success: boolean, data: Book }`

#### Create New Book

- **POST** `/api/books`
- Creates a new book entry
- Body: Book data (title, abstract, yearOfSubmission, etc.)
- Response: `{ success: boolean, data: Book, message: string }`

#### Update Book

- **PUT** `/api/books/[id]`
- Updates an existing book
- Body: Partial book data to update
- Response: `{ success: boolean, data: Book, message: string }`

#### Delete Book

- **DELETE** `/api/books/[id]`
- Deletes a book by ID
- Response: `{ success: boolean, data: Book, message: string }`

#### Search Books

- **POST** `/api/books/search`
- Searches books with filters
- Body: `{ filterAndSearchQuery?: string, year?: number, departments?: string[], programs?: string[] }`
- Response: `{ success: boolean, data: Book[], message: string }`

#### Add Recommendation

- **POST** `/api/books/[id]/recommend`
- Increments the recommendation counter for a book
- Response: `{ success: boolean, data: Book, message: string }`

### Upload API

#### File Upload

- **POST** `/api/upload`
- Uploads files to Cloudinary
- Supports PDF and image files
- Response: `{ success: boolean, url: string, publicId: string }`

## Book Interface

```typescript
interface Book {
  id: string;
  title: string;
  yearOfSubmission: number;
  coverImage: string;
  recommendations: number;
  abstract: string;
  keywords: string;
  language?: string;
  authors?: string;
  advisors?: string;
  department?: string;
  program?: string;
  created_at?: string;
  updated_at?: string;
}
```

## API Utility Functions

The `/lib/api.ts` file contains utility functions for making API calls:

- `getAllBooks()`
- `getBookById(id)`
- `createBook(bookData)`
- `updateBook(id, bookData)`
- `deleteBook(id)`
- `searchBooks(searchParams)`
- `addRecommendation(id)`

## Environment Variables

Make sure to set up your environment variables in `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Database Schema

The application uses Supabase with a table called `thesis_tbl` that should have the following columns:

- `id` (primary key, text)
- `title` (text, required)
- `abstract` (text, required)
- `yearOfSubmission` (integer, required)
- `coverImage` (text)
- `recommendations` (integer, default: 0)
- `keywords` (text)
- `language` (text)
- `authors` (text, JSON string)
- `advisors` (text, JSON string)
- `department` (text)
- `program` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Migration from Backend

The following backend functionality has been migrated to Next.js API routes:

1. ✅ Book CRUD operations
2. ✅ Search functionality with fallback
3. ✅ Recommendation system
4. ✅ File upload (already existed)
5. ✅ Error handling and loading states
6. ✅ API utility functions

## Testing

You can test the API endpoints using:

1. **Test endpoint**: GET `/api/test` - Returns a simple success message
2. **Postman or similar tools** for API testing
3. **Frontend integration** - The bookContent.tsx component now uses these API routes

## Notes

- The search functionality includes both full-text search and fallback basic search
- All API routes include proper error handling
- Loading states and user feedback are implemented in the frontend
- The API follows RESTful conventions
