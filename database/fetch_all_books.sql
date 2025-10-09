/*
System: Suno Automation
Module: Database Query
File URL: database/fetch_all_books.sql
Purpose: Fetch all books from the Supabase database with complete author and publication details
*/

-- Fetch all books (thesis records) with their author profiles
-- This query reproduces the same data structure as the /api/books endpoint
SELECT
    -- Thesis (Book) Information
    ths_id AS book_id,
    ths_title AS title,
    ths_abstract AS abstract,
    ths_department AS department,
    ths_submitted_date AS submitted_date,
    ths_publication_date AS publication_date,
    ths_keywords AS keywords,
    ths_file_url AS file_url,
    ths_doi AS doi,
    ths_created_at AS created_at,

    -- Author Profile Information
    tblprofiles.prf_name AS author_name,
    tblprofiles.prf_email AS author_email,
    tblprofiles.prf_department AS author_department,
    tblprofiles.prf_degree_program AS degree_program,
    tblprofiles.prf_affiliation AS affiliation,
    tblprofiles.prf_image_url AS cover_image_url,
    tblprofiles.prf_author_bio AS author_bio,

    -- Computed Fields
    CASE
        WHEN ths_publication_date IS NOT NULL THEN EXTRACT(YEAR FROM ths_publication_date)
        WHEN ths_submitted_date IS NOT NULL THEN EXTRACT(YEAR FROM ths_submitted_date)
        ELSE EXTRACT(YEAR FROM CURRENT_DATE)
    END AS publication_year,

    -- Metadata
    'English' AS language,  -- Default language as used in the API
    0 AS recommendations,   -- Not tracked in current schema

    -- Row ordering metadata
    ROW_NUMBER() OVER (ORDER BY
        CASE
            WHEN ths_publication_date IS NOT NULL THEN ths_publication_date
            ELSE CURRENT_DATE
        END DESC NULLS LAST
    ) AS sort_order

FROM
    tblthesis
LEFT JOIN
    tblprofiles ON tblthesis.ths_prf_id = tblprofiles.prf_id

ORDER BY
    CASE
        WHEN ths_publication_date IS NOT NULL THEN ths_publication_date
        ELSE CURRENT_DATE
    END DESC NULLS LAST,
    ths_created_at DESC;

-- Alternative simplified view for basic book listing
SELECT
    ths_id AS id,
    ths_title AS title,
    tblprofiles.prf_name AS authors,
    ths_department AS department,
    tblprofiles.prf_degree_program AS program,
    CASE
        WHEN ths_publication_date IS NOT NULL THEN EXTRACT(YEAR FROM ths_publication_date)
        WHEN ths_submitted_date IS NOT NULL THEN EXTRACT(YEAR FROM ths_submitted_date)
        ELSE EXTRACT(YEAR FROM CURRENT_DATE)
    END AS degree_awarded,
    COALESCE(tblprofiles.prf_image_url, '/defaults/defaultBookCover.png') AS cover_image,
    ths_created_at AS created_at
FROM
    tblthesis
LEFT JOIN
    tblprofiles ON tblthesis.ths_prf_id = tblprofiles.prf_id
ORDER BY
    CASE
        WHEN ths_publication_date IS NOT NULL THEN ths_publication_date
        ELSE CURRENT_DATE
    END DESC NULLS LAST,
    ths_created_at DESC;

-- Statistics query
SELECT
    COUNT(*) AS total_books,
    COUNT(DISTINCT tblprofiles.prf_id) AS unique_authors,
    COUNT(DISTINCT ths_department) AS departments_represented,
    EXTRACT(YEAR FROM MIN(ths_publication_date)) AS earliest_publication,
    EXTRACT(YEAR FROM MAX(ths_publication_date)) AS latest_publication
FROM tblthesis
LEFT JOIN tblprofiles ON tblthesis.ths_prf_id = tblprofiles.prf_id;

-- Books by department summary
SELECT
    ths_department AS department,
    COUNT(*) AS book_count,
    COUNT(DISTINCT tblprofiles.prf_id) AS author_count,
    EXTRACT(YEAR FROM MIN(ths_publication_date)) AS earliest_publication,
    EXTRACT(YEAR FROM MAX(ths_publication_date)) AS latest_publication
FROM tblthesis
LEFT JOIN tblprofiles ON tblthesis.ths_prf_id = tblprofiles.prf_id
GROUP BY ths_department
ORDER BY book_count DESC;