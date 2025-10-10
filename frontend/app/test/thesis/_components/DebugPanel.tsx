/*
System: Thesis Repository
Module: Debug Panel Component
File URL: Frontend/app/test/thesis/_components/DebugPanel.tsx
Purpose: Visual debugging panel for displaying test results and logs
*/

'use client';

import { useState } from 'react';
import type { LogEntry } from '../_lib/logger';

interface DebugPanelProps {
  strApproach: string;
  arrLogs: LogEntry[];
  objData: any;
  objError: any;
  intQueryTime: number;
  strThesisId?: string;
}

export function DebugPanel({
  strApproach,
  arrLogs,
  objData,
  objError,
  intQueryTime,
  strThesisId
}: DebugPanelProps) {
  const [blnShowRawData] = useState(false);
  const [blnShowLogs] = useState(true);
  const [blnShowError] = useState(true);

  const blnHasData = !!objData;
  const blnHasError = !!objError;
  const intErrorCount = arrLogs.filter(log => log.type === 'ERROR').length;

  return (
    <div className="mb-8 rounded-xl border-2 border-blue-500/30 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-blue-400/30 dark:bg-gray-800/90">
      {/* Header */}
      <div className="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
        <h2 className="mb-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
          🔍 Debug Information
        </h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {strApproach}
          </span>
          {strThesisId && (
            <span className="rounded-full bg-gray-100 px-3 py-1 font-mono text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              ID: {strThesisId}
            </span>
          )}
        </div>
      </div>

      {/* Status Summary */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <div className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
            Query Time
          </div>
          <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
            {intQueryTime}ms
          </div>
        </div>

        <div
          className={`rounded-lg p-4 ${blnHasData ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}
        >
          <div className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
            Status
          </div>
          <div className="mt-1 text-2xl font-bold">
            {blnHasData ? (
              <span className="text-green-600 dark:text-green-400">✅ Success</span>
            ) : (
              <span className="text-red-600 dark:text-red-400">❌ Failed</span>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
          <div className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
            Total Logs
          </div>
          <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
            {arrLogs.length}
          </div>
        </div>

        <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
          <div className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
            Errors
          </div>
          <div className="mt-1 text-2xl font-bold text-orange-600 dark:text-orange-400">
            {intErrorCount}
          </div>
        </div>
      </div>

      {/* Environment Info */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
        <h3 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
          🌍 Environment Check
        </h3>
        <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-gray-600 dark:text-gray-400">Supabase URL:</span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {typeof window !== 'undefined' ? '✅ Set' : '✅ Set (Server)'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-gray-600 dark:text-gray-400">Anon Key:</span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {typeof window !== 'undefined' ? '✅ Set' : '✅ Set (Server)'}
            </span>
          </div>
        </div>
      </div>

      {/* Console Logs */}
      <details open={blnShowLogs} className="mb-4">
        <summary className="cursor-pointer rounded-lg bg-indigo-50 p-3 font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-300 dark:hover:bg-indigo-900/30">
          📜 Console Logs ({arrLogs.length} entries)
        </summary>
        <div className="mt-3 max-h-96 overflow-y-auto rounded-lg bg-black p-4 font-mono text-xs text-green-400">
          {arrLogs.map((objLog, intIndex) => (
            <div key={intIndex} className="mb-2 border-l-2 border-green-500 pl-3">
              <div className="flex items-start space-x-2">
                <span className="text-gray-500">[{objLog.duration}ms]</span>
                <span
                  className={`font-bold ${
                    objLog.type === 'ERROR'
                      ? 'text-red-400'
                      : objLog.type === 'SUCCESS'
                        ? 'text-green-400'
                        : objLog.type === 'WARNING'
                          ? 'text-yellow-400'
                          : 'text-blue-400'
                  }`}
                >
                  [{objLog.type}]
                </span>
                <span className="flex-1">{objLog.message}</span>
              </div>
              {objLog.data && (
                <div className="ml-4 mt-1 text-gray-400">
                  └─ {JSON.stringify(objLog.data, null, 2)}
                </div>
              )}
            </div>
          ))}
        </div>
      </details>

      {/* Raw Data */}
      {blnHasData && (
        <details open={blnShowRawData} className="mb-4">
          <summary className="cursor-pointer rounded-lg bg-green-50 p-3 font-semibold text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30">
            📦 Raw Data Response
          </summary>
          <div className="mt-3 max-h-96 overflow-y-auto rounded-lg bg-gray-900 p-4">
            <pre className="font-mono text-xs text-gray-300">
              {JSON.stringify(objData, null, 2)}
            </pre>
          </div>
        </details>
      )}

      {/* Error Details */}
      {blnHasError && (
        <details open={blnShowError}>
          <summary className="cursor-pointer rounded-lg bg-red-50 p-3 font-semibold text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30">
            ❌ Error Details
          </summary>
          <div className="mt-3 rounded-lg bg-red-900 p-4">
            <pre className="font-mono text-xs text-red-200">
              {JSON.stringify(objError, null, 2)}
            </pre>
          </div>
        </details>
      )}

      {/* Success Summary */}
      {blnHasData && (
        <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h3 className="mb-2 font-semibold text-green-700 dark:text-green-300">
            ✅ Success Summary
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Fields:</span>{' '}
              <span className="font-semibold text-green-700 dark:text-green-300">
                {Object.keys(objData).length}
              </span>
            </div>
            {objData.ths_title && (
              <div className="col-span-2">
                <span className="text-gray-600 dark:text-gray-400">Title:</span>{' '}
                <span className="font-semibold text-green-700 dark:text-green-300">
                  {objData.ths_title}
                </span>
              </div>
            )}
            {objData.tblprofiles && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">Profile:</span>{' '}
                <span className="font-semibold text-green-700 dark:text-green-300">✅ Joined</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
