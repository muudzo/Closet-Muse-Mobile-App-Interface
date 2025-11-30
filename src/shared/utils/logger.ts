/**
 * Centralized logging utility with environment-aware behavior
 */

import { env } from '../../config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  private shouldLog(level: LogLevel): boolean {
    if (env.isProduction && !env.enableDebug) {
      return level === 'error' || level === 'warn';
    }
    return true;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    data?: unknown
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
  }

  private storeLog(entry: LogEntry): void {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  debug(message: string, data?: unknown): void {
    if (!this.shouldLog('debug')) return;

    const entry = this.createLogEntry('debug', message, data);
    this.storeLog(entry);

    console.log(`[DEBUG] ${message}`, data || '');
  }

  info(message: string, data?: unknown): void {
    if (!this.shouldLog('info')) return;

    const entry = this.createLogEntry('info', message, data);
    this.storeLog(entry);

    console.info(`[INFO] ${message}`, data || '');
  }

  warn(message: string, data?: unknown): void {
    if (!this.shouldLog('warn')) return;

    const entry = this.createLogEntry('warn', message, data);
    this.storeLog(entry);

    console.warn(`[WARN] ${message}`, data || '');
  }

  error(message: string, error?: unknown): void {
    if (!this.shouldLog('error')) return;

    const entry = this.createLogEntry('error', message, error);
    this.storeLog(entry);

    console.error(`[ERROR] ${message}`, error || '');

    // In production, send to error tracking service (e.g., Sentry)
    if (env.isProduction && env.sentryDsn) {
      // TODO: Integrate with Sentry or other error tracking
      this.sendToErrorTracking(entry);
    }
  }

  private sendToErrorTracking(entry: LogEntry): void {
    // Placeholder for error tracking integration
    // This would send errors to Sentry, LogRocket, etc.
    if (env.enableDebug) {
      console.log('Would send to error tracking:', entry);
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience methods
export const { debug, info, warn, error } = logger;
