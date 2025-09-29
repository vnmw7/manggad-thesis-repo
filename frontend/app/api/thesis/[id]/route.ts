/*
System: Suno Automation
Module: Thesis ID API Route
Purpose: Handle single thesis operations with correct Supabase table mappings
*/

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/thesis/[id] - Get a single thesis by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`📖 Fetching thesis with ID: ${params.id}`);

  try {
    const { data: thesis, error } = await supabase
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
      .eq("ths_id", params.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Thesis not found" },
          { status: 404 }
        );
      }
      console.error("Error fetching thesis:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch thesis", details: error.message },
        { status: 500 }
      );
    }

    // Transform the data to include profile information
    const thesisWithProfile = {
      ...thesis,
      profile: thesis.tblprofiles,
    };

    console.log(`✅ Successfully fetched thesis: ${thesis.ths_title}`);
    return NextResponse.json({
      success: true,
      data: thesisWithProfile,
    });
  } catch (error) {
    console.error("Error in GET /api/thesis/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/thesis/[id] - Update a thesis
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Build update object with ths_ prefixes
    const updateData: any = {};
    if (body.title !== undefined) updateData.ths_title = body.title;
    if (body.department !== undefined) updateData.ths_department = body.department;
    if (body.submitted_date !== undefined) updateData.ths_submitted_date = body.submitted_date;
    if (body.publication_date !== undefined) updateData.ths_publication_date = body.publication_date;
    if (body.abstract !== undefined) updateData.ths_abstract = body.abstract;
    if (body.keywords !== undefined) updateData.ths_keywords = body.keywords;
    if (body.file_url !== undefined) updateData.ths_file_url = body.file_url;
    if (body.doi !== undefined) updateData.ths_doi = body.doi;

    const { data: thesis, error } = await supabase
      .from("tblthesis")
      .update(updateData)
      .eq("ths_id", params.id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Thesis not found" },
          { status: 404 }
        );
      }
      console.error("Error updating thesis:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update thesis", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: thesis,
      message: "Thesis updated successfully",
    });
  } catch (error) {
    console.error("Error in PUT /api/thesis/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/thesis/[id] - Delete a thesis
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("tblthesis")
      .delete()
      .eq("ths_id", params.id);

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Thesis not found" },
          { status: 404 }
        );
      }
      console.error("Error deleting thesis:", error);
      return NextResponse.json(
        { success: false, error: "Failed to delete thesis", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thesis deleted successfully",
    });
  } catch (error) {
    console.error("Error in DELETE /api/thesis/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}