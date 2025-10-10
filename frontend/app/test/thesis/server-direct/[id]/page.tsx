/*
System: Thesis Repository
Module: Test - Server Direct Approach
File URL: Frontend/app/test/thesis/server-direct/[id]/page.tsx
Purpose: Test thesis fetching using async Server Component with direct Supabase query
*/

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { DebugPanel } from '../../_components/DebugPanel';
import { ThesisTestLogger } from '../../_lib/logger';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ServerDirectTestPage(props: PageProps) {
  const objParams = await props.params;
  const strThesisId = objParams.id;

  // Initialize logger
  const objLogger = new ThesisTestLogger('SERVER-DIRECT');

  console.log('='.repeat(80));
  console.log('🚀 [SERVER-DIRECT] Starting test approach...');
  console.log('='.repeat(80));

  objLogger.log('START', `Testing thesis ID: ${strThesisId}`);
  objLogger.logEnvironment();

  const intStartTime = Date.now();

  let objThesis: any = null;
  let objError: any = null;

  try {
    objLogger.logQuery('Supabase Query', {
      table: 'tblthesis',
      method: 'maybeSingle',
      filter: { ths_id: strThesisId }
    });

    console.log('📡 [SERVER-DIRECT] Executing Supabase query...');
    const { data: thesis, error } = await supabase
      .from('tblthesis')
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
      .eq('ths_id', strThesisId)
      .maybeSingle();

    const intDuration = Date.now() - intStartTime;

    objLogger.log('RESPONSE', `Query completed in ${intDuration}ms`);
    objLogger.log('RESULT', `Has data: ${!!thesis}, Has error: ${!!error}`);

    if (error) {
      objError = error;
      objLogger.logError('Supabase error occurred', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      console.error('❌ [SERVER-DIRECT] Error Details:', error);
    }

    if (thesis) {
      objThesis = thesis;
      objLogger.logSuccess('Thesis data fetched successfully', {
        id: thesis.ths_id,
        title: thesis.ths_title,
        hasAbstract: !!thesis.ths_abstract,
        hasProfile: !!thesis.tblprofiles,
        fieldCount: Object.keys(thesis).length
      });
      console.log('✅ [SERVER-DIRECT] Success! Thesis:', thesis.ths_title);
      console.log('📊 [SERVER-DIRECT] Field count:', Object.keys(thesis).length);
      console.log('👤 [SERVER-DIRECT] Profile joined:', !!thesis.tblprofiles);
      console.log('🔍 [SERVER-DIRECT] Full data:', JSON.stringify(thesis, null, 2));
    } else if (!error) {
      objLogger.logWarning('No thesis found for this ID');
      console.log('⚠️ [SERVER-DIRECT] No thesis found with ID:', strThesisId);
    }
  } catch (exception: any) {
    objError = exception;
    objLogger.logError('Exception caught during fetch', {
      name: exception.name,
      message: exception.message,
      stack: exception.stack
    });
    console.error('💥 [SERVER-DIRECT] Exception:', exception);
  }

  const intTotalDuration = Date.now() - intStartTime;
  objLogger.log('COMPLETE', `Total execution time: ${intTotalDuration}ms`);
  objLogger.printSummary();

  console.log('='.repeat(80));
  console.log('✅ [SERVER-DIRECT] Test complete');
  console.log('='.repeat(80));

  // If no data and no specific error, show 404
  if (!objThesis && !objError) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-gray-900 dark:to-gray-950">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 h-screen w-screen opacity-30 dark:opacity-40">
        <AnimatedGridPattern
          width={50}
          height={50}
          className="h-full w-full fill-black/15 text-black/25 dark:fill-white/10 dark:text-white/20"
          numSquares={100}
          maxOpacity={0.4}
          duration={5}
        />
      </div>

      <Header />

      <main className="relative z-10 flex-1 p-4 lg:p-8">
        <div className="mx-auto max-w-6xl">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/test/thesis"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Back to Test Hub
            </Link>
          </div>

          {/* Page Title */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-blue-700 dark:text-blue-300">
              🖥️ Server Direct Approach
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Async Server Component with .maybeSingle()
            </p>
          </div>

          {/* Debug Panel */}
          <DebugPanel
            strApproach="Server Component - Direct Supabase (.maybeSingle)"
            arrLogs={objLogger.getAllLogs()}
            objData={objThesis}
            objError={objError}
            intQueryTime={intTotalDuration}
            strThesisId={strThesisId}
          />

          {/* Thesis Content */}
          {objThesis && (
            <>
              {/* Main Info Card */}
              <div className="mb-8 rounded-xl border-2 border-gray-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90">
                <div className="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    {objThesis.ths_title}
                  </h2>
                  {objThesis.tblprofiles && (
                    <p className="mt-2 text-lg text-blue-600 dark:text-blue-400">
                      By: {objThesis.tblprofiles.prf_name}
                    </p>
                  )}
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Department:
                    </span>{' '}
                    <span className="text-gray-600 dark:text-gray-400">
                      {objThesis.ths_department || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Publication Date:
                    </span>{' '}
                    <span className="text-gray-600 dark:text-gray-400">
                      {objThesis.ths_publication_date
                        ? new Date(objThesis.ths_publication_date).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>
                  {objThesis.ths_keywords && (
                    <div className="md:col-span-2">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Keywords:
                      </span>{' '}
                      <span className="text-gray-600 dark:text-gray-400">
                        {objThesis.ths_keywords}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Abstract Card */}
              {objThesis.ths_abstract && (
                <div className="mb-8 rounded-xl border-2 border-gray-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Abstract
                  </h3>
                  <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                    {objThesis.ths_abstract}
                  </p>
                </div>
              )}

              {/* Author Profile Card */}
              {objThesis.tblprofiles && (
                <div className="mb-8 rounded-xl border-2 border-gray-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                    👤 Author Information
                  </h3>
                  <div className="flex items-start space-x-4">
                    {objThesis.tblprofiles.prf_image_url && (
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={objThesis.tblprofiles.prf_image_url}
                          alt={objThesis.tblprofiles.prf_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {objThesis.tblprofiles.prf_name}
                      </p>
                      {objThesis.tblprofiles.prf_affiliation && (
                        <p className="text-gray-600 dark:text-gray-400">
                          {objThesis.tblprofiles.prf_affiliation}
                        </p>
                      )}
                      {objThesis.tblprofiles.prf_email && (
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {objThesis.tblprofiles.prf_email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
