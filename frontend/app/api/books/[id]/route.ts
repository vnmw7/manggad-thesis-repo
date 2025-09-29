/*
System: Suno Automation
Module: Books ID API Route (Legacy)
Purpose: Backward compatibility wrapper for single thesis operations using old Books interface
*/

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

    console.log(`📖 Fetching book (thesis) with ID: ${id}`);

    const { data: thesis, error } = await supabase
      .from("tblthesis")
      .select(`
        ths_id,
        ths_title,
        ths_abstract,
        ths_department,
        ths_submitted_date,
        ths_publication_date,
        ths_keywords,
        ths_file_url,
        ths_doi,
        ths_created_at,
        tblprofiles (
          prf_name,
          prf_email,
          prf_department,
          prf_degree_program,
          prf_image_url,
          prf_author_bio
        )
      `)
      .eq("ths_id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Book not found" },
          { status: 404 },
        );
      }
      console.error("Error fetching thesis:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch book", details: error.message },
        { status: 500 },
      );
    }

    // Transform thesis data to Book format
    const publicationYear = thesis.ths_publication_date
      ? new Date(thesis.ths_publication_date).getFullYear()
      : thesis.ths_submitted_date
      ? new Date(thesis.ths_submitted_date).getFullYear()
      : new Date().getFullYear();

    const book = {
      id: thesis.ths_id,
      title: thesis.ths_title,
      abstract: thesis.ths_abstract || "",
      degreeAwarded: publicationYear,
      yearOfSubmission: publicationYear, // Alias for compatibility
      keywords: thesis.ths_keywords
        ? (typeof thesis.ths_keywords === 'string'
          ? thesis.ths_keywords.split(', ')
          : Array.isArray(thesis.ths_keywords)
          ? thesis.ths_keywords
          : [])
        : [],
      authors: thesis.tblprofiles?.prf_name || "Unknown Author",
      firstName: thesis.tblprofiles?.prf_name?.split(' ')[0] || "",
      lastName: thesis.tblprofiles?.prf_name?.split(' ').slice(-1)[0] || "",
      advisors: ["N/A"],
      supervisors: ["N/A"], // Alias for compatibility
      department: thesis.ths_department || thesis.tblprofiles?.prf_department || "",
      program: thesis.tblprofiles?.prf_degree_program || "",
      coverImage: thesis.tblprofiles?.prf_image_url || "/defaults/defaultBookCover.png",
      recommendations: 0,
      language: "English",
      thesis_document_url: thesis.ths_file_url,
      doi: thesis.ths_doi,
      created_at: thesis.ths_created_at,
      // Additional fields for detail view
      degreeLevel: thesis.tblprofiles?.prf_degree_program || "Unknown Degree",
      copyright: "Author holds copyright",
      thirdPartyCopyright: "no",
      license: "No License/All Rights Reserved",
      orcid: "",
      notes: thesis.tblprofiles?.prf_author_bio || "No notes available.",
      supplementary_files_urls: [],
    };

    console.log(`✅ Successfully fetched book: ${thesis.ths_title}`);
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

    // Build update object for thesis table
    const updateData: any = {};

    if (body.title !== undefined) updateData.ths_title = body.title;
    if (body.abstract !== undefined) updateData.ths_abstract = body.abstract;
    if (body.keywords !== undefined) {
      updateData.ths_keywords = Array.isArray(body.keywords)
        ? body.keywords.join(", ")
        : body.keywords;
    }
    if (body.department !== undefined) updateData.ths_department = body.department;
    if (body.yearOfSubmission !== undefined || body.degreeAwarded !== undefined) {
      const year = body.yearOfSubmission || body.degreeAwarded;
      updateData.ths_publication_date = new Date(year, 0, 1).toISOString().split('T')[0];
    }
    if (body.thesis_document_url !== undefined) updateData.ths_file_url = body.thesis_document_url;
    if (body.doi !== undefined) updateData.ths_doi = body.doi;

    const { data: thesis, error } = await supabase
      .from("tblthesis")
      .update(updateData)
      .eq("ths_id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Book not found" },
          { status: 404 },
        );
      }
      console.error("Error updating thesis:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update book", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: thesis,
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

    const { error } = await supabase
      .from("tblthesis")
      .delete()
      .eq("ths_id", id);

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Book not found" },
          { status: 404 },
        );
      }
      console.error("Error deleting thesis:", error);
      return NextResponse.json(
        { success: false, error: "Failed to delete book", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
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