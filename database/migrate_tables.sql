/*
System: Suno Automation
Module: Database Migration
Purpose: Create normalized profile and thesis tables for relational syncing.
*/

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS tblprofiles (
    prf_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    prf_user_id uuid,
    prf_created_at timestamptz NOT NULL DEFAULT now(),
    prf_name text NOT NULL,
    prf_email text,
    prf_affiliation text,
    prf_department text,
    prf_image_url text,
    prf_degree_program text,
    prf_author_bio text
);

CREATE TABLE IF NOT EXISTS tblthesis (
    ths_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ths_prf_id uuid NOT NULL REFERENCES tblprofiles(prf_id) ON DELETE CASCADE,
    ths_created_at timestamptz NOT NULL DEFAULT now(),
    ths_title text NOT NULL,
    ths_department text,
    ths_submitted_date date,
    ths_publication_date date,
    ths_abstract text,
    ths_keywords text,
    ths_file_url text,
    ths_doi text UNIQUE
);
