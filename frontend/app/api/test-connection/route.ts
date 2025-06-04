import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    console.log("Testing Supabase connection...");

    // Test basic connection
    const { data, error } = await supabase
      .from("thesis_tbl")
      .select("count", { count: "exact", head: true });

    if (error) {
      console.error("Supabase connection error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          details: error.message,
        },
        { status: 500 },
      );
    }

    console.log("Supabase connection successful, count:", data);

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      count: data,
    });
  } catch (error) {
    console.error("Error testing connection:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
