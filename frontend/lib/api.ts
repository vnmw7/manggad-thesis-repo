// API utility functions for books
import { mockGetAllBooks, mockSearchBooks, mockGetBookById } from "./mockData";

export interface Book {
  id: string;
  title: string;
  degreeAwarded: number;
  coverImage: string;
  recommendations: number;
  abstract: string;
  keywords: string | string[];
  language?: string;
  authors?: string | string[];
  advisors?: string | string[];
  department?: string;
  program?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Get all books
export async function getAllBooks(): Promise<ApiResponse<Book[]>> {
  try {
    const response = await fetch("/api/books");

    // Check if response is ok
    if (!response.ok) {
      console.warn("API endpoint failed, using mock data");
      return await mockGetAllBooks();
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.warn("API request failed, falling back to mock data:", error);
    return await mockGetAllBooks();
  }
}

// Get book by ID
export async function getBookById(id: string): Promise<ApiResponse<Book>> {
  try {
    const response = await fetch(`/api/books/${id}`);

    // Check if response is ok
    if (!response.ok) {
      console.warn("API endpoint failed, using mock data");
      return await mockGetBookById(id);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.warn("API request failed, falling back to mock data:", error);
    return await mockGetBookById(id);
  }
}

// Create a new book
export async function createBook(
  bookData: Partial<Book>,
): Promise<ApiResponse<Book>> {
  try {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to create book:", error);
    return {
      success: false,
      error: "Failed to create book",
    };
  }
}

// Update a book
export async function updateBook(
  id: string,
  bookData: Partial<Book>,
): Promise<ApiResponse<Book>> {
  try {
    const response = await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to update book:", error);
    return {
      success: false,
      error: "Failed to update book",
    };
  }
}

// Delete a book
export async function deleteBook(id: string): Promise<ApiResponse<Book>> {
  try {
    const response = await fetch(`/api/books/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to delete book:", error);
    return {
      success: false,
      error: "Failed to delete book",
    };
  }
}

// Search books
export interface SearchParams {
  filterAndSearchQuery?: string;
  year?: number;
  departments?: string[];
  programs?: string[];
}

export async function searchBooks(
  searchParams: SearchParams,
): Promise<ApiResponse<Book[]>> {
  try {
    const response = await fetch("/api/books/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchParams),
    });

    // Check if response is ok
    if (!response.ok) {
      console.warn("Search API endpoint failed, using mock data");
      return await mockSearchBooks(searchParams);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.warn(
      "Search API request failed, falling back to mock data:",
      error,
    );
    return await mockSearchBooks(searchParams);
  }
}

// Add recommendation to a book
export async function addRecommendation(
  id: string,
): Promise<ApiResponse<Book>> {
  try {
    const response = await fetch(`/api/books/${id}/recommend`, {
      method: "POST",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to add recommendation:", error);
    return {
      success: false,
      error: "Failed to add recommendation",
    };
  }
}
