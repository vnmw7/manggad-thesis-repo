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

      // Try to list all tables
      const { data: tables, error: tableError } = await supabase
        .rpc("get_table_names") // This might not work, but let's try
        .single();

      return NextResponse.json(
        {
          success: false,
          error: "Table access failed",
          details: error.message,
          suggestion:
            "Check if 'thesis_tbl' table exists and has proper permissions",
          tableError: tableError?.message,
        },
        { status: 500 },
      );
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
