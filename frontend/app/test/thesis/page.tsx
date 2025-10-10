/*
System: Thesis Repository
Module: Test Hub Page
File URL: Frontend/app/test/thesis/page.tsx
Purpose: Central hub for accessing all thesis fetching test approaches
*/

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';

const SAMPLE_THESIS_ID = '04f5a664-7558-4020-a29d-f1c499fd1e9f';

interface TestApproach {
  strName: string;
  strPath: string;
  strDescription: string;
  strMethod: string;
  strIcon: string;
  blnRequiresId: boolean;
}

export default function ThesisTestHubPage() {
  const [strCustomId, setStrCustomId] = useState(SAMPLE_THESIS_ID);

  const arrTestApproaches: TestApproach[] = [
    {
      strName: 'Server Component - Direct',
      strPath: '/test/thesis/server-direct',
      strDescription: 'Async Server Component with direct Supabase query using .maybeSingle()',
      strMethod: 'Server-Side Rendering (SSR)',
      strIcon: '🖥️',
      blnRequiresId: true
    },
    {
      strName: 'Client Component - useEffect',
      strPath: '/test/thesis/client-effect',
      strDescription: 'Client-side fetching with useState + useEffect pattern',
      strMethod: 'Client-Side Rendering (CSR)',
      strIcon: '🌐',
      blnRequiresId: true
    },
    {
      strName: 'Simple Hardcoded Test',
      strPath: '/test/thesis/simple',
      strDescription: 'Simplest possible implementation with hardcoded ID (no routing)',
      strMethod: 'Server-Side with Fixed ID',
      strIcon: '🧪',
      blnRequiresId: false
    },
    {
      strName: 'Server Component - .single()',
      strPath: '/test/thesis/server-single',
      strDescription: 'Server Component using .single() method instead of .maybeSingle()',
      strMethod: 'Server-Side with .single()',
      strIcon: '📌',
      blnRequiresId: true
    },
    {
      strName: 'Server Component - Minimal',
      strPath: '/test/thesis/server-minimal',
      strDescription: 'Minimal query selecting only essential fields (no joins)',
      strMethod: 'Server-Side Minimal Query',
      strIcon: '⚡',
      blnRequiresId: true
    }
  ];

  console.log('🧪 [TEST-HUB] Test hub loaded');
  console.log('📋 [TEST-HUB] Available approaches:', arrTestApproaches.length);
  console.log('🆔 [TEST-HUB] Sample ID:', SAMPLE_THESIS_ID);

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
          {/* Page Title */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-blue-700 dark:text-blue-300">
              🧪 Thesis Fetching Test Hub
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Test different approaches for fetching thesis data from Supabase
            </p>
          </div>

          {/* Sample ID Display */}
          <div className="mb-8 rounded-xl border-2 border-blue-500/30 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-blue-400/30 dark:bg-gray-800/90">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
              🆔 Test Thesis ID
            </h2>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Thesis ID (UUID):
              </label>
              <input
                type="text"
                value={strCustomId}
                onChange={(e) => setStrCustomId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 font-mono text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Enter thesis ID..."
              />
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Sample ID:</span>
              <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                {SAMPLE_THESIS_ID}
              </code>
              <button
                onClick={() => setStrCustomId(SAMPLE_THESIS_ID)}
                className="rounded bg-blue-500 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-600"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Test Approaches Grid */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {arrTestApproaches.map((objApproach, intIndex) => {
              const strFullPath = objApproach.blnRequiresId
                ? `${objApproach.strPath}/${strCustomId}`
                : objApproach.strPath;

              return (
                <div
                  key={intIndex}
                  className="group rounded-xl border-2 border-gray-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all hover:border-blue-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/90 dark:hover:border-blue-400"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="text-4xl">{objApproach.strIcon}</div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {objApproach.strMethod}
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                    {objApproach.strName}
                  </h3>

                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {objApproach.strDescription}
                  </p>

                  <Link
                    href={strFullPath}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Test This Approach →
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Comparison Table */}
          <div className="mb-8 rounded-xl border-2 border-gray-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
              📊 Comparison Table
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-gray-600">
                    <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      Approach
                    </th>
                    <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      Rendering
                    </th>
                    <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      SEO
                    </th>
                    <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      Best For
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 text-gray-800 dark:text-gray-200">Server Direct</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">Server</td>
                    <td className="p-3 text-green-600 dark:text-green-400">✅ Excellent</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">Production</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 text-gray-800 dark:text-gray-200">Client Effect</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">Client</td>
                    <td className="p-3 text-red-600 dark:text-red-400">❌ Poor</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">Debugging</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 text-gray-800 dark:text-gray-200">Simple</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">Server</td>
                    <td className="p-3 text-green-600 dark:text-green-400">✅ Excellent</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">Quick Test</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 text-gray-800 dark:text-gray-200">Server Single</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">Server</td>
                    <td className="p-3 text-green-600 dark:text-green-400">✅ Excellent</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">Alternative</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-800 dark:text-gray-200">Server Minimal</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">Server</td>
                    <td className="p-3 text-green-600 dark:text-green-400">✅ Excellent</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">Performance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Debug Notes */}
          <div className="rounded-xl border-2 border-yellow-500/30 bg-yellow-50/90 p-6 shadow-xl backdrop-blur-sm dark:border-yellow-400/30 dark:bg-yellow-900/20">
            <h3 className="mb-3 flex items-center text-xl font-semibold text-yellow-800 dark:text-yellow-300">
              💡 Debugging Tips
            </h3>
            <ul className="list-inside list-disc space-y-2 text-sm text-yellow-900 dark:text-yellow-200">
              <li>Check the browser console (F12) for detailed logs</li>
              <li>Each test page shows a visual debug panel with query details</li>
              <li>Compare results across different approaches to identify issues</li>
              <li>The &quot;Simple&quot; approach is best for isolating problems</li>
              <li>Server approaches are recommended for production use</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
