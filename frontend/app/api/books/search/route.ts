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

    let query = supabase.from("thesis_tbl").select("*");

    // Text search across multiple columns
    if (filterAndSearchQuery) {
      // Try full-text search first
      try {
        const { data, error } = await supabase
          .from("thesis_tbl")
          .select("*")
          .textSearch("fts", filterAndSearchQuery, {
            type: "websearch",
            config: "english",
          })
          .order("yearOfSubmission", { ascending: false });

        if (!error && data) {
          return NextResponse.json({
            success: true,
            data: data,
            message: "Search completed successfully",
          });
        }
      } catch (ftsError) {
        console.warn(
          "Full-text search failed, falling back to basic search:",
          ftsError,
        );
      }

      // Fallback to basic search using ilike
      const searchTerms = filterAndSearchQuery
        .toLowerCase()
        .split(" ")
        .filter((term: string) => term.length > 0);

      if (searchTerms.length > 0) {
        const searchConditions = searchTerms
          .map(
            (term: string) =>
              `title.ilike.%${term}%,abstract.ilike.%${term}%,keywords.ilike.%${term}%,department.ilike.%${term}%,program.ilike.%${term}%`,
          )
          .join(",");

        query = query.or(searchConditions);
      }
    }

    // Year filter
    if (year) {
      query = query.eq("yearOfSubmission", parseInt(year));
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
    const { data: books, error } = await query.order("yearOfSubmission", {
      ascending: false,
    });

    if (error) {
      console.error("Error searching books:", error);
      return NextResponse.json(
        { success: false, error: "Failed to search books" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: books || [],
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
