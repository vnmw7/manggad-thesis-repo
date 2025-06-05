import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/books/[id] - Get book by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Book ID is required" },
        { status: 400 },
      );
    }

    const { data: book, error } = await supabase
      .from("thesis_tbl")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Book not found" },
          { status: 404 },
        );
      }
      console.error("Error fetching book:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch book" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error("Error in GET /api/books/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/books/[id] - Update book by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Book ID is required" },
        { status: 400 },
      );
    }

    const {
      title,
      abstract,
      language,
      keywords,
      yearOfSubmission,
      authors,
      advisors,
      coverImage,
      department,
      program,
    } = body;

    const updateData: any = {};

    // Only update fields that are provided
    if (title !== undefined) updateData.title = title;
    if (abstract !== undefined) updateData.abstract = abstract;
    if (language !== undefined) updateData.language = language;
    if (keywords !== undefined) updateData.keywords = keywords;
    if (yearOfSubmission !== undefined)
      updateData.yearOfSubmission = parseInt(yearOfSubmission);
    if (authors !== undefined) updateData.authors = JSON.stringify(authors);
    if (advisors !== undefined) updateData.advisors = JSON.stringify(advisors);
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (department !== undefined) updateData.department = department;
    if (program !== undefined) updateData.program = program;

    updateData.updated_at = new Date().toISOString();

    const { data: book, error } = await supabase
      .from("thesis_tbl")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating book:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update book" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: book,
      message: "Book updated successfully",
    });
  } catch (error) {
    console.error("Error in PUT /api/books/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/books/[id] - Delete book by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Book ID is required" },
        { status: 400 },
      );
    }

    const { data: book, error } = await supabase
      .from("thesis_tbl")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Book not found" },
          { status: 404 },
        );
      }
      console.error("Error deleting book:", error);
      return NextResponse.json(
        { success: false, error: "Failed to delete book" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: book,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error in DELETE /api/books/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
