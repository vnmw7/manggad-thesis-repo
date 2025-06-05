import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST /api/books/[id]/recommend - Increment recommendation counter
export async function POST(
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

    // First, get the current book to check if it exists and get current recommendations
    const { data: currentBook, error: fetchError } = await supabase
      .from("thesis_tbl")
      .select("recommendations")
      .eq("id", id)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Book not found" },
          { status: 404 },
        );
      }
      console.error("Error fetching book:", fetchError);
      return NextResponse.json(
        { success: false, error: "Failed to fetch book" },
        { status: 500 },
      );
    }

    // Increment the recommendation counter
    const newRecommendationCount = (currentBook.recommendations || 0) + 1;

    const { data: updatedBook, error: updateError } = await supabase
      .from("thesis_tbl")
      .update({
        recommendations: newRecommendationCount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating recommendation counter:", updateError);
      return NextResponse.json(
        { success: false, error: "Failed to update recommendation counter" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedBook,
      message: "Recommendation added successfully",
    });
  } catch (error) {
    console.error("Error in POST /api/books/[id]/recommend:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
