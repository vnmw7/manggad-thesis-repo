/*
System: Thesis Repository
Module: Test - Server Minimal Query Approach
File URL: Frontend/app/test/thesis/server-minimal/[id]/page.tsx
Purpose: Test thesis fetching with minimal query (no joins) for debugging
*/

import { notFound } from 'next/navigation';
import Link from 'next/link';
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

export default async function ServerMinimalTestPage(props: PageProps) {
  const objParams = await props.params;
  const strThesisId = objParams.id;

  const objLogger = new ThesisTestLogger('SERVER-MINIMAL');

  console.log('='.repeat(80));
  console.log('⚡ [SERVER-MINIMAL] Testing minimal query approach...');
  console.log('⚡ [SERVER-MINIMAL] No joins, only essential fields');
  console.log('='.repeat(80));

  objLogger.log('START', `Testing thesis ID: ${strThesisId}`);
  objLogger.log('INFO', 'Using minimal field selection without joins');
  objLogger.logEnvironment();

  const intStartTime = Date.now();

  let objThesis: any = null;
  let objError: any = null;

  console.log('📊 [SERVER-MINIMAL] Progressive Query Building:');

  // Step 1: Most minimal possible query
  try {
    console.log('🔹 [STEP-1] from("tblthesis")');
    objLogger.log('STEP-1', 'Building query: from("tblthesis")');

    const objStep1 = supabase.from('tblthesis');
    console.log('  - Type:', typeof objStep1);
    objLogger.logData('Step 1 Result', { type: typeof objStep1 });

    // Step 2: Add minimal select
    console.log('🔹 [STEP-2] .select("ths_id, ths_title")');
    objLogger.log('STEP-2', 'Adding select for id and title only');

    const objStep2 = objStep1.select('ths_id, ths_title');
    console.log('  - Type:', typeof objStep2);

    // Step 3: Add filter
    console.log('🔹 [STEP-3] .eq("ths_id", strThesisId)');
    objLogger.log('STEP-3', `Adding filter: ths_id = ${strThesisId}`);

    const objStep3 = objStep2.eq('ths_id', strThesisId);
    console.log('  - Type:', typeof objStep3);

    // Step 4: Execute with maybeSingle
    console.log('🔹 [STEP-4] .maybeSingle()');
    objLogger.log('STEP-4', 'Executing query with maybeSingle()');

    const { data: minimalData, error: minimalError } = await objStep3.maybeSingle();

    const intMinimalDuration = Date.now() - intStartTime;

    console.log('📊 [STEP-RESULT] Minimal Query Result:');
    console.log('  - Has data:', !!minimalData);
    console.log('  - Has error:', !!minimalError);
    console.log('  - Duration:', `${intMinimalDuration}ms`);

    objLogger.log('MINIMAL-RESULT', 'Minimal query completed', {
      hasData: !!minimalData,
      hasError: !!minimalError,
      duration: intMinimalDuration
    });

    if (minimalError) {
      objError = minimalError;
      objLogger.logError('Minimal query failed', minimalError);
      console.error('❌ [MINIMAL-QUERY] Error:', minimalError);
    }

    if (minimalData) {
      console.log('✅ [MINIMAL-QUERY] Success!');
      console.log('  - ID:', minimalData.ths_id);
      console.log('  - Title:', minimalData.ths_title);
      objLogger.logSuccess('Minimal query successful', minimalData);

      // Now try with more fields (but still no join)
      console.log('🔹 [STEP-5] Expanding to more fields (no join)...');
      objLogger.log('STEP-5', 'Expanding query to include all thesis fields');

      const { data: expandedData, error: expandedError } = await supabase
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
          ths_doi
        `)
        .eq('ths_id', strThesisId)
        .maybeSingle();

      if (expandedError) {
        objError = expandedError;
        objLogger.logError('Expanded query failed', expandedError);
        console.error('❌ [EXPANDED-QUERY] Error:', expandedError);
      }

      if (expandedData) {
        objThesis = expandedData;
        console.log('✅ [EXPANDED-QUERY] Success with all fields!');
        console.log('📊 [EXPANDED-QUERY] Field count:', Object.keys(expandedData).length);
        console.log('🔍 [EXPANDED-QUERY] Full data:', JSON.stringify(expandedData, null, 2));

        objLogger.logSuccess('Expanded query successful', {
          fieldCount: Object.keys(expandedData).length,
          hasAbstract: !!expandedData.ths_abstract,
          hasKeywords: !!expandedData.ths_keywords
        });
      }
    }
  } catch (exception: any) {
    objError = exception;
    objLogger.logError('Exception during minimal query', {
      name: exception.name,
      message: exception.message,
      stack: exception.stack
    });
    console.error('💥 [SERVER-MINIMAL] Exception:', exception);
  }

  const intTotalDuration = Date.now() - intStartTime;
  objLogger.log('COMPLETE', `Total execution time: ${intTotalDuration}ms`);
  objLogger.printSummary();

  console.log('='.repeat(80));
  console.log('✅ [SERVER-MINIMAL] Test complete');
  console.log('='.repeat(80));

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
              ⚡ Server Minimal Query
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Minimal field selection without joins
            </p>
          </div>

          {/* Query Strategy Info */}
          <div className="mb-8 rounded-xl border-2 border-indigo-500/30 bg-indigo-50/90 p-6 shadow-xl backdrop-blur-sm dark:border-indigo-400/30 dark:bg-indigo-900/20">
            <h3 className="mb-3 text-xl font-semibold text-indigo-700 dark:text-indigo-300">
              🔍 Query Strategy
            </h3>
            <div className="space-y-2 text-sm text-indigo-900 dark:text-indigo-200">
              <p>
                <strong>Step 1:</strong> Query only ID and title (2 fields)
              </p>
              <p>
                <strong>Step 2:</strong> If successful, expand to all thesis fields (no join)
              </p>
              <p>
                <strong>Purpose:</strong> Isolate if joins are causing issues
              </p>
            </div>
          </div>

          {/* Debug Panel */}
          <DebugPanel
            strApproach="Server Component - Minimal Query (No Joins)"
            arrLogs={objLogger.getAllLogs()}
            objData={objThesis}
            objError={objError}
            intQueryTime={intTotalDuration}
            strThesisId={strThesisId}
          />

          {/* Thesis Content */}
          {objThesis && (
            <>
              {/* Notice about no profile */}
              <div className="mb-8 rounded-xl border-2 border-blue-500/30 bg-blue-50/90 p-4 text-center shadow-xl backdrop-blur-sm dark:border-blue-400/30 dark:bg-blue-900/20">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  ℹ️ This query does not include profile information (no join). Profile ID:{' '}
                  <code className="font-mono">{objThesis.ths_prf_id}</code>
                </p>
              </div>

              {/* Main Info Card */}
              <div className="mb-8 rounded-xl border-2 border-gray-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90">
                <div className="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    {objThesis.ths_title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                    Profile ID: {objThesis.ths_prf_id}
                  </p>
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
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Submitted Date:
                    </span>{' '}
                    <span className="text-gray-600 dark:text-gray-400">
                      {objThesis.ths_submitted_date
                        ? new Date(objThesis.ths_submitted_date).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">DOI:</span>{' '}
                    <span className="text-gray-600 dark:text-gray-400">
                      {objThesis.ths_doi || 'N/A'}
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

              {/* File URL Card */}
              {objThesis.ths_file_url && (
                <div className="rounded-xl border-2 border-gray-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                    📄 Thesis Document
                  </h3>
                  <a
                    href={objThesis.ths_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                  >
                    View/Download Thesis →
                  </a>
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
