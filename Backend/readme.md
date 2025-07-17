# Database Migration Tutorial

This tutorial explains how to execute and migrate the database using the provided scripts.

## Prerequisites

1. Ensure you have Node.js installed on your system.
2. Install the required dependencies by running:

   ```bash
   npm install
   ```

3. Set up the `.env` file with the `SUPABASE_DATABASE_URL` environment variable pointing to your database connection string.

## Steps to Migrate the Database

1. Open a terminal and navigate to the `Backend/database_migration/` directory.

2. Run the migration script

   - To apply migrations:

     ```bash
     npx ts-node migrate.ts
     ```

3. Check the terminal output for success or error messages.

4. Run the seeder script.

   - To apply migrations (up):

     ```bash
     npx ts-node seeder.ts
     ```

## Notes

- The `up` direction applies the migrations defined in the `profile.ts` file.
- The `down` direction reverts the migrations defined in the `profile.tsx` file.
- Ensure the database connection string in the `.env` file is correct before running the script.