/*
System: Suno Automation
Module: Frontend API
Purpose: API utility functions for thesis management with Supabase integration
*/

// Database table: tblprofiles
export interface Profile {
  prf_id: string;
  prf_user_id?: string;
  prf_created_at: string;
  prf_name: string;
  prf_email?: string;
  prf_affiliation?: string;
  prf_department?: string;
  prf_image_url?: string;
  prf_degree_program?: string;
  prf_author_bio?: string;
}

// Database table: tblthesis
export interface Thesis {
  ths_id: string;
  ths_prf_id: string;
  ths_created_at: string;
  ths_title: string;
  ths_department?: string;
  ths_submitted_date?: string;
  ths_publication_date?: string;
  ths_abstract?: string;
  ths_keywords?: string;
  ths_file_url?: string;
  ths_doi?: string;
  // Joined profile data
  profile?: Profile;
}

// Legacy Book interface for backward compatibility
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

// Convert thesis data to book format for compatibility
function thesisToBook(thesis: Thesis): Book {
  return {
    id: thesis.ths_id,
    title: thesis.ths_title,
    degreeAwarded: new Date(thesis.ths_publication_date || thesis.ths_submitted_date || '').getFullYear() || new Date().getFullYear(),
    coverImage: '/defaults/defaultBookCover.png',
    recommendations: 0,
    abstract: thesis.ths_abstract || '',
    keywords: thesis.ths_keywords ? thesis.ths_keywords.split(', ') : [],
    language: 'English',
    authors: thesis.profile ? [thesis.profile.prf_name] : [],
    advisors: [],
    department: thesis.ths_department || thesis.profile?.prf_department,
    program: thesis.profile?.prf_degree_program,
    created_at: thesis.ths_created_at,
    updated_at: thesis.ths_created_at,
  };
}

// Get all thesis/books from Supabase
export async function getAllThesis(): Promise<ApiResponse<Thesis[]>> {
  try {
    const response = await fetch("/api/thesis");

    if (!response.ok) {
      console.error("Failed to fetch thesis:", response.status);
      return {
        success: false,
        error: "Failed to fetch thesis from server",
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API request failed:", error);
    return {
      success: false,
      error: "Failed to connect to server",
    };
  }
}

// Get all books (wrapper for backward compatibility)
export async function getAllBooks(): Promise<ApiResponse<Book[]>> {
  const thesisResponse = await getAllThesis();

  if (!thesisResponse.success) {
    return {
      success: false,
      error: thesisResponse.error,
    };
  }

  const books = thesisResponse.data?.map(thesisToBook) || [];
  return {
    success: true,
    data: books,
  };
}

// Get thesis by ID from Supabase
export async function getThesisById(id: string): Promise<ApiResponse<Thesis>> {
  try {
    const response = await fetch(`/api/thesis/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          error: "Thesis not found",
        };
      }
      console.error("Failed to fetch thesis:", response.status);
      return {
        success: false,
        error: "Failed to fetch thesis details",
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API request failed:", error);
    return {
      success: false,
      error: "Failed to connect to server",
    };
  }
}

// Get book by ID (wrapper for backward compatibility)
export async function getBookById(id: string): Promise<ApiResponse<Book>> {
  const thesisResponse = await getThesisById(id);

  if (!thesisResponse.success) {
    return {
      success: false,
      error: thesisResponse.error?.replace('Thesis', 'Book') || 'Book not found',
    };
  }

  if (thesisResponse.data) {
    return {
      success: true,
      data: thesisToBook(thesisResponse.data),
    };
  }

  return {
    success: false,
    error: 'Book not found',
  };
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

// Search parameters for thesis
export interface SearchParams {
  filterAndSearchQuery?: string;
  year?: number;
  departments?: string[];
  programs?: string[];
}

// Search thesis in Supabase
export async function searchThesis(
  searchParams: SearchParams,
): Promise<ApiResponse<Thesis[]>> {
  try {
    const response = await fetch("/api/thesis/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchParams),
    });

    if (!response.ok) {
      console.error("Search API failed:", response.status);
      return {
        success: false,
        error: "Search failed. Please try again.",
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Search API request failed:", error);
    return {
      success: false,
      error: "Failed to connect to server",
    };
  }
}

// Search books (wrapper for backward compatibility)
export async function searchBooks(
  searchParams: SearchParams,
): Promise<ApiResponse<Book[]>> {
  const thesisResponse = await searchThesis(searchParams);

  if (!thesisResponse.success) {
    return {
      success: false,
      error: thesisResponse.error,
    };
  }

  const books = thesisResponse.data?.map(thesisToBook) || [];
  return {
    success: true,
    data: books,
  };
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
