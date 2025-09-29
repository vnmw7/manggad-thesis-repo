/*
System: Suno Automation
Module: Profiles API Route
Purpose: Handle profile/author data operations with Supabase table mappings
*/

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/profiles - Get all profiles
export async function GET() {
  console.log("👤 Starting GET /api/profiles request...");

  try {
    const { data: profiles, error } = await supabase
      .from("tblprofiles")
      .select(`
        prf_id,
        prf_user_id,
        prf_created_at,
        prf_name,
        prf_email,
        prf_affiliation,
        prf_department,
        prf_image_url,
        prf_degree_program,
        prf_author_bio
      `)
      .order("prf_name", { ascending: true });

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Database query failed",
          details: error.message,
        },
        { status: 500 },
      );
    }

    console.log(`✅ Successfully fetched ${profiles?.length || 0} profiles`);
    return NextResponse.json({
      success: true,
      data: profiles || [],
      count: profiles?.length || 0,
    });
  } catch (error) {
    console.error("💥 Unexpected error in GET /api/profiles:", error);
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

// POST /api/profiles - Create a new profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      user_id,
      name,
      email,
      affiliation,
      department,
      image_url,
      degree_program,
      author_bio,
    } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 },
      );
    }

    const { data: profile, error } = await supabase
      .from("tblprofiles")
      .insert([
        {
          prf_user_id: user_id,
          prf_name: name,
          prf_email: email,
          prf_affiliation: affiliation,
          prf_department: department,
          prf_image_url: image_url,
          prf_degree_program: degree_program,
          prf_author_bio: author_bio,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating profile:", error);
      return NextResponse.json(
        { success: false, error: "Failed to create profile", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: profile,
      message: "Profile created successfully",
    });
  } catch (error) {
    console.error("Error in POST /api/profiles:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}