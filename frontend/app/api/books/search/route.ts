import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST /api/books/search - Search books with filters
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filterAndSearchQuery, year, departments, programs } = body;

    if (!filterAndSearchQuery && !year && !departments && !programs) {
      return NextResponse.json(
        { success: false, error: "At least one search parameter is required" },
        { status: 400 },
      );
    }

    let query = supabase.from("thesis_tbl").select(`
        id,
        title,
        abstract,
        degreeAwarded,
        keywords,
        firstName,
        middleName,
        lastName,
        supervisors,
        department,
        program,
        created_at
      `);

    // Text search across multiple columns
    if (filterAndSearchQuery) {
      // Try full-text search first
      try {
        const { data, error } = await supabase
          .from("thesis_tbl")
          .select(
            `
            id,
            title,
            abstract,
            degreeAwarded,
            keywords,
            firstName,
            middleName,
            lastName,
            supervisors,
            department,
            program,
            created_at
          `,
          )
          .textSearch("fts", filterAndSearchQuery, {
            type: "websearch",
            config: "english",
          })
          .order("degreeAwarded", { ascending: false });

        if (!error && data) {
          // Transform the data
          const transformedBooks = data.map((book) => ({
            id: book.id,
            title: book.title,
            abstract: book.abstract,
            degreeAwarded: new Date(book.degreeAwarded).getFullYear(),
            keywords: Array.isArray(book.keywords)
              ? book.keywords
              : [book.keywords || ""],
            authors: [book.firstName, book.middleName, book.lastName]
              .filter(Boolean)
              .join(" "),
            advisors: Array.isArray(book.supervisors)
              ? book.supervisors
              : [book.supervisors || "N/A"],
            department: book.department,
            program: book.program,
            coverImage: "/defaults/defaultBookCover.png",
            recommendations: 0,
            language: "English",
            created_at: book.created_at,
          }));

          return NextResponse.json({
            success: true,
            data: transformedBooks,
            message: "Search completed successfully",
          });
        }
      } catch (ftsError) {
        console.warn(
          "Full-text search failed, falling back to basic search:",
          ftsError,
        );
      } // Fallback to basic search using ilike
      const searchTerms = filterAndSearchQuery
        .toLowerCase()
        .split(" ")
        .filter((term: string) => term.length > 0);

      if (searchTerms.length > 0) {
        // Build search conditions for each term, handling arrays properly
        const searchConditions = searchTerms
          .map((term: string) => {
            // For array columns, use array contains operator
            return [
              `title.ilike.%${term}%`,
              `abstract.ilike.%${term}%`,
              `department.ilike.%${term}%`,
              `program.ilike.%${term}%`,
              `firstName.ilike.%${term}%`,
              `lastName.ilike.%${term}%`,
              `keywords.cs.{${term}}`, // Use contains for array
              `supervisors.cs.{${term}}`, // Use contains for array
            ].join(",");
          })
          .join(",");

        query = query.or(searchConditions);
      }
    }

    // Year filter
    if (year) {
      // Since degreeAwarded is a DATE field, we need to filter by year properly
      query = query
        .gte("degreeAwarded", `${year}-01-01`)
        .lt("degreeAwarded", `${parseInt(year) + 1}-01-01`);
    }

    // Department filter
    if (departments && Array.isArray(departments) && departments.length > 0) {
      const deptConditions = departments
        .map((dept: string) => `department.ilike.%${dept}%`)
        .join(",");
      query = query.or(deptConditions);
    }

    // Program filter
    if (programs && Array.isArray(programs) && programs.length > 0) {
      const programConditions = programs
        .map((program: string) => `program.ilike.%${program}%`)
        .join(",");
      query = query.or(programConditions);
    }

    // Execute the query
    const { data: rawBooks, error } = await query.order("degreeAwarded", {
      ascending: false,
    });

    if (error) {
      console.error("Error searching books:", error);
      return NextResponse.json(
        { success: false, error: "Failed to search books" },
        { status: 500 },
      );
    }

    // Transform the data
    const books =
      rawBooks?.map((book) => ({
        id: book.id,
        title: book.title,
        abstract: book.abstract,
        degreeAwarded: new Date(book.degreeAwarded).getFullYear(),
        keywords: Array.isArray(book.keywords)
          ? book.keywords
          : [book.keywords || ""],
        authors: [book.firstName, book.middleName, book.lastName]
          .filter(Boolean)
          .join(" "),
        advisors: Array.isArray(book.supervisors)
          ? book.supervisors
          : [book.supervisors || "N/A"],
        department: book.department,
        program: book.program,
        coverImage: "/defaults/defaultBookCover.png",
        recommendations: 0,
        language: "English",
        created_at: book.created_at,
      })) || [];

    return NextResponse.json({
      success: true,
      data: books,
      message: "Search completed successfully",
    });
  } catch (error) {
    console.error("Error in POST /api/books/search:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
