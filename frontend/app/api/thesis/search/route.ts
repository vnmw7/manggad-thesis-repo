/*
System: Suno Automation
Module: Thesis Search API Route
Purpose: Search thesis records with filters matching Supabase table structure
*/

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST /api/thesis/search - Search thesis with filters
export async function POST(request: NextRequest) {
  console.log("🔍 Starting thesis search...");

  try {
    const body = await request.json();
    const { filterAndSearchQuery, year, departments, programs } = body;

    // Start with base query
    let query = supabase
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
      `);

    // Apply search filter for text query
    if (filterAndSearchQuery) {
      // Search in title, abstract, keywords, and author name
      query = query.or(`
        ths_title.ilike.%${filterAndSearchQuery}%,
        ths_abstract.ilike.%${filterAndSearchQuery}%,
        ths_keywords.ilike.%${filterAndSearchQuery}%
      `);
    }

    // Apply year filter
    if (year) {
      const startDate = new Date(year, 0, 1).toISOString().split('T')[0];
      const endDate = new Date(year, 11, 31).toISOString().split('T')[0];
      query = query
        .gte("ths_publication_date", startDate)
        .lte("ths_publication_date", endDate);
    }

    // Apply department filter
    if (departments && departments.length > 0) {
      query = query.in("ths_department", departments);
    }

    // Order by publication date (most recent first)
    query = query.order("ths_publication_date", { ascending: false, nullsFirst: false });

    const { data: thesisData, error } = await query;

    if (error) {
      console.error("❌ Search error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Search failed",
          details: error.message,
        },
        { status: 500 },
      );
    }

    // Apply program filter on the joined profile data
    let filteredData = thesisData || [];
    if (programs && programs.length > 0) {
      filteredData = filteredData.filter((thesis: any) =>
        thesis.tblprofiles?.prf_degree_program &&
        programs.includes(thesis.tblprofiles.prf_degree_program)
      );
    }

    // Transform the data to include profile information
    const thesisList = filteredData.map((thesis: any) => ({
      ...thesis,
      profile: thesis.tblprofiles,
    }));

    console.log(`✅ Search completed. Found ${thesisList.length} results`);
    return NextResponse.json({
      success: true,
      data: thesisList,
      count: thesisList.length,
    });
  } catch (error) {
    console.error("💥 Unexpected error in thesis search:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Search failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}