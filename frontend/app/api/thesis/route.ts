/*
System: Suno Automation
Module: Thesis API Route
Purpose: Handle thesis data operations with correct Supabase table mappings
*/

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/thesis - Get all thesis with profile information
export async function GET() {
  console.log("📚 Starting GET /api/thesis request...");

  try {
    // Query tblthesis with joined tblprofiles data
    const { data: thesisData, error } = await supabase
      .from("tblthesis")
      .select(`
        ths_id,
        ths_prf_id,
        ths_created_at,
        ths_title,
        ths_department,
        ths_submitted_date,
        ths_publication_date,
        ths_abstract,
        ths_keywords,
        ths_file_url,
        ths_doi,
        tblprofiles (
          prf_id,
          prf_name,
          prf_email,
          prf_affiliation,
          prf_department,
          prf_image_url,
          prf_degree_program,
          prf_author_bio
        )
      `)
      .order("ths_publication_date", { ascending: false, nullsFirst: false });

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Database query failed",
          details: error.message,
          code: error.code,
          hint: error.hint,
        },
        { status: 500 },
      );
    }

    // Transform the data to include profile information
    const thesisList = thesisData?.map((thesis) => ({
      ...thesis,
      profile: thesis.tblprofiles,
    })) || [];

    console.log(`✅ Successfully fetched ${thesisList.length} thesis records`);
    return NextResponse.json({
      success: true,
      data: thesisList,
      count: thesisList.length,
    });
  } catch (error) {
    console.error("💥 Unexpected error in GET /api/thesis:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "No stack trace";

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: errorMessage,
        stack: process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 },
    );
  }
}

// POST /api/thesis - Create a new thesis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      prf_id,
      title,
      department,
      submitted_date,
      publication_date,
      abstract,
      keywords,
      file_url,
      doi,
    } = body;

    // Validate required fields
    if (!prf_id || !title) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (prf_id and title)" },
        { status: 400 },
      );
    }

    const { data: thesis, error } = await supabase
      .from("tblthesis")
      .insert([
        {
          ths_prf_id: prf_id,
          ths_title: title,
          ths_department: department,
          ths_submitted_date: submitted_date,
          ths_publication_date: publication_date,
          ths_abstract: abstract,
          ths_keywords: keywords,
          ths_file_url: file_url,
          ths_doi: doi,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating thesis:", error);
      return NextResponse.json(
        { success: false, error: "Failed to create thesis", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: thesis,
      message: "Thesis created successfully",
    });
  } catch (error) {
    console.error("Error in POST /api/thesis:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}