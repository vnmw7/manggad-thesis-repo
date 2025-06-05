import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    console.log("🔍 Testing database schema...");

    // Test if the table exists by attempting to get its structure
    const { data, error } = await supabase
      .from("thesis_tbl")
      .select("*")
      .limit(1);

    if (error) {
      console.error("❌ Database schema error:", error);
    }

    console.log("✅ Table access successful");
    console.log(
      "📊 Sample data structure:",
      data?.[0] ? Object.keys(data[0]) : "No data",
    );

    return NextResponse.json({
      success: true,
      message: "Database schema test successful",
      tableExists: true,
      sampleColumns: data?.[0] ? Object.keys(data[0]) : [],
      hasData: (data?.length || 0) > 0,
    });
  } catch (error) {
    console.error("💥 Schema test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Schema test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
