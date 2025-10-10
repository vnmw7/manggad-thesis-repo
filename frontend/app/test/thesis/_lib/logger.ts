/*
System: Thesis Repository
Module: Test Logger Utility
File URL: Frontend/app/test/thesis/_lib/logger.ts
Purpose: Robust logging utility for debugging thesis fetching approaches
*/

export interface LogEntry {
  timestamp: string;
  duration: number;
  type: string;
  message: string;
  data?: any;
}

export class ThesisTestLogger {
  private strApproach: string;
  private arrLogs: LogEntry[];
  private intStartTime: number;

  constructor(strApproach: string) {
    this.strApproach = strApproach;
    this.arrLogs = [];
    this.intStartTime = Date.now();
    this.log('INIT', `🚀 Logger started for approach: ${strApproach}`);
  }

  log(strType: string, strMessage: string, objData?: any): void {
    const dtmTimestamp = new Date().toISOString();
    const intDuration = Date.now() - this.intStartTime;

    const objLogEntry: LogEntry = {
      timestamp: dtmTimestamp,
      duration: intDuration,
      type: strType,
      message: strMessage,
      data: objData
    };

    this.arrLogs.push(objLogEntry);

    // Console logging with emoji and formatting
    const strPrefix = `[${this.strApproach}][${strType}][${intDuration}ms]`;
    console.log(`${strPrefix} ${strMessage}`);

    if (objData !== undefined) {
      console.log(`  └─ Data:`, objData);
    }
  }

  logQuery(strQuery: string, objParams?: any): void {
    this.log('QUERY', `📡 Executing: ${strQuery}`, objParams);
  }

  logSuccess(strMessage: string, objData?: any): void {
    this.log('SUCCESS', `✅ ${strMessage}`, objData);
  }

  logError(strMessage: string, objError?: any): void {
    this.log('ERROR', `❌ ${strMessage}`, objError);
    console.error(`🔥 [${this.strApproach}] Error Details:`, objError);
  }

  logWarning(strMessage: string, objData?: any): void {
    this.log('WARNING', `⚠️ ${strMessage}`, objData);
  }

  logData(strLabel: string, objData: any): void {
    this.log('DATA', `📊 ${strLabel}`, {
      type: typeof objData,
      isNull: objData === null,
      isUndefined: objData === undefined,
      keys: objData && typeof objData === 'object' ? Object.keys(objData) : [],
      length: Array.isArray(objData) ? objData.length : undefined
    });
  }

  logEnvironment(): void {
    const objEnvCheck = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrlPreview: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      nodeEnv: process.env.NODE_ENV
    };
    this.log('ENV', '🌍 Environment Check', objEnvCheck);
  }

  getAllLogs(): LogEntry[] {
    return this.arrLogs;
  }

  getTotalDuration(): number {
    return Date.now() - this.intStartTime;
  }

  getLogSummary(): string {
    const intTotalLogs = this.arrLogs.length;
    const intErrors = this.arrLogs.filter(log => log.type === 'ERROR').length;
    const intWarnings = this.arrLogs.filter(log => log.type === 'WARNING').length;
    const intSuccesses = this.arrLogs.filter(log => log.type === 'SUCCESS').length;

    return `Total: ${intTotalLogs} logs | ✅ ${intSuccesses} | ❌ ${intErrors} | ⚠️ ${intWarnings} | Duration: ${this.getTotalDuration()}ms`;
  }

  printSummary(): void {
    console.log('='.repeat(80));
    console.log(`📋 [${this.strApproach}] SUMMARY`);
    console.log('='.repeat(80));
    console.log(this.getLogSummary());
    console.log('='.repeat(80));
  }
}
