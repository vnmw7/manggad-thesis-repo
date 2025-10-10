/*
System: Thesis Repository
Module: Test - Simple Hardcoded Approach
File URL: Frontend/app/test/thesis/simple/page.tsx
Purpose: Simplest possible test with hardcoded ID - no dynamic routing
*/

import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { DebugPanel } from '../_components/DebugPanel';
import { ThesisTestLogger } from '../_lib/logger';

export const revalidate = 60;

const HARDCODED_THESIS_ID = '04f5a664-7558-4020-a29d-f1c499fd1e9f';

export default async function SimpleTestPage() {
  const objLogger = new ThesisTestLogger('SIMPLE-HARDCODED');

  console.log('🧪'.repeat(40));
  console.log('🧪 [SIMPLE-TEST] Starting SIMPLEST test approach...');
  console.log('🧪 [SIMPLE-TEST] This is the most basic implementation possible');
  console.log('🧪'.repeat(40));

  objLogger.log('INIT', '🧪 Simple hardcoded test initialized');
  objLogger.log('ID', `📌 Using hardcoded ID: ${HARDCODED_THESIS_ID}`);
  objLogger.logEnvironment();

  console.log('🔧 [SIMPLE-TEST] Environment Check:');
  console.log('  - NODE_ENV:', process.env.NODE_ENV);
  console.log('  - Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...');
  console.log('  - Has Anon Key:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  console.log('🔍 [SIMPLE-TEST-1] Checking Supabase client...');
  console.log('  - Client exists:', !!supabase);
  console.log('  - Client type:', typeof supabase);
  objLogger.log('CLIENT-CHECK', 'Supabase client verified', {
    exists: !!supabase,
    type: typeof supabase
  });

  const intStartTime = Date.now();
  let objThesis: any = null;
  let objError: any = null;

  try {
    console.log('🔍 [SIMPLE-TEST-2] Attempting basic query...');
    objLogger.logQuery('Basic Supabase Query', {
      table: 'tblthesis',
      select: 'ths_id, ths_title, ths_abstract',
      filter: { ths_id: HARDCODED_THESIS_ID },
      method: 'maybeSingle'
    });

    const objResult = await supabase
      .from('tblthesis')
      .select('ths_id, ths_title, ths_abstract, ths_department, ths_keywords, ths_publication_date')
      .eq('ths_id', HARDCODED_THESIS_ID)
      .maybeSingle();

    console.log('🔍 [SIMPLE-TEST-3] Raw result inspection:');
    console.log('  - Result type:', typeof objResult);
    console.log('  - Has data prop:', 'data' in objResult);
    console.log('  - Has error prop:', 'error' in objResult);
    console.log('  - Result keys:', Object.keys(objResult));
    objLogger.log('RAW-RESULT', 'Raw Supabase result', objResult);

    console.log('🔍 [SIMPLE-TEST-4] Full response dump:');
    console.log(JSON.stringify(objResult, null, 2));

    const { data, error } = objResult;

    const intDuration = Date.now() - intStartTime;
    objLogger.log('TIMING', `Query completed in ${intDuration}ms`);

    if (error) {
      objError = error;
      objLogger.logError('Supabase error', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      console.error('❌ [SIMPLE-TEST] Error object:', error);
    }

    if (data) {
      objThesis = data;
      objLogger.logSuccess('Data retrieved', {
        id: data.ths_id,
        title: data.ths_title,
        hasAbstract: !!data.ths_abstract,
        fields: Object.keys(data)
      });
      console.log('✅ [SIMPLE-TEST] SUCCESS! Data received:');
      console.log('  - ID:', data.ths_id);
      console.log('  - Title:', data.ths_title);
      console.log('  - Field count:', Object.keys(data).length);
      console.log('  - All fields:', Object.keys(data).join(', '));
      console.log('📄 [SIMPLE-TEST] Full thesis data:', JSON.stringify(data, null, 2));
    } else if (!error) {
      objLogger.logWarning('No data and no error - thesis might not exist');
      console.log('⚠️ [SIMPLE-TEST] No data returned and no error');
    }

    // Try with full join query
    if (data) {
      console.log('🔍 [SIMPLE-TEST-5] Now trying WITH profile join...');
      objLogger.log('JOIN-QUERY', 'Attempting query with profile join');

      const objJoinResult = await supabase
        .from('tblthesis')
        .select(`
          ths_id,
          ths_title,
          ths_abstract,
          ths_department,
          ths_keywords,
          ths_publication_date,
          tblprofiles (
            prf_id,
            prf_name,
            prf_email,
            prf_affiliation,
            prf_image_url
          )
        `)
        .eq('ths_id', HARDCODED_THESIS_ID)
        .maybeSingle();

      if (objJoinResult.data) {
        objThesis = objJoinResult.data;
        objLogger.logSuccess('Join query successful', {
          hasProfile: !!objJoinResult.data.tblprofiles
        });
        console.log('✅ [SIMPLE-TEST] Join query success!');
        console.log('👤 [SIMPLE-TEST] Profile data:', objJoinResult.data.tblprofiles);
      }

      if (objJoinResult.error) {
        objLogger.logError('Join query failed', objJoinResult.error);
        console.error('❌ [SIMPLE-TEST] Join error:', objJoinResult.error);
      }
    }
  } catch (exception: any) {
    objError = exception;
    objLogger.logError('Exception thrown', {
      name: exception.name,
      message: exception.message,
      stack: exception.stack
    });
    console.error('💥 [SIMPLE-TEST] Exception caught:', exception);
  }

  const intTotalDuration = Date.now() - intStartTime;
  objLogger.log('COMPLETE', `Total test duration: ${intTotalDuration}ms`);
  objLogger.printSummary();

  console.log('🧪'.repeat(40));
  console.log('✅ [SIMPLE-TEST] Test complete');
  console.log('🧪'.repeat(40));

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
              🧪 Simple Hardcoded Test
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Simplest implementation - No dynamic routing
            </p>
            <p className="mt-2 font-mono text-sm text-gray-500 dark:text-gray-500">
              ID: {HARDCODED_THESIS_ID}
            </p>
          </div>

          {/* Debug Panel */}
          <DebugPanel
            strApproach="Simple Hardcoded Test (No Routing)"
            arrLogs={objLogger.getAllLogs()}
            objData={objThesis}
            objError={objError}
            intQueryTime={intTotalDuration}
            strThesisId={HARDCODED_THESIS_ID}
          />

          {/* Thesis Content */}
          {objThesis && (
            <>
              {/* Success Banner */}
              <div className="mb-8 rounded-xl border-2 border-green-500/30 bg-green-50/90 p-4 text-center shadow-xl backdrop-blur-sm dark:border-green-400/30 dark:bg-green-900/20">
                <p className="text-xl font-bold text-green-700 dark:text-green-300">
                  ✅ SUCCESS! Thesis data fetched successfully
                </p>
              </div>

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
                <div className="rounded-xl border-2 border-gray-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90">
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

          {/* No Data Message */}
          {!objThesis && !objError && (
            <div className="rounded-xl border-2 border-yellow-500/30 bg-yellow-50/90 p-6 text-center shadow-xl backdrop-blur-sm dark:border-yellow-400/30 dark:bg-yellow-900/20">
              <h3 className="mb-2 text-xl font-semibold text-yellow-700 dark:text-yellow-300">
                ⚠️ No Data Found
              </h3>
              <p className="text-yellow-600 dark:text-yellow-400">
                Check the debug panel above for details.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
