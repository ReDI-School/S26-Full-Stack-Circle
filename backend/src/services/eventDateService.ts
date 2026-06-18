import { DateTime } from 'luxon';

export class EventDateService {
  private readonly DEFAULT_TIME_ZONE = 'Europe/Berlin';

  /**
   * Local (form input) → UTC Date (DB)
   */
  localToUtc(params: { date: string; time?: string; timezone: string }): Date {
    const { date, time = '00:00', timezone } = params;

    const dt = DateTime.fromFormat(`${date} ${time}`, 'yyyy-MM-dd HH:mm', { zone: timezone });

    if (!dt.isValid) {
      throw new Error(dt.invalidExplanation || 'Invalid local date/time input');
    }

    return dt.toUTC().toJSDate();
  }

  /**
   * UTC (DB) → local form format
   */
  utcToLocal(params: { date: Date; timezone: string }) {
    return DateTime.fromJSDate(params.date, {
      zone: 'utc',
    }).setZone(params.timezone);
  }

  /**
   * Resolve final updated date for partial updates
   * (core of edit event logic)
   */
  resolveUpdatedDate(params: {
    existingDate: Date;
    bodyDate?: string;
    bodyTime?: string;
    timezone: string;
  }): Date | undefined {
    const { existingDate, bodyDate, bodyTime, timezone } = params;

    const hasUpdate = bodyDate != null || bodyTime != null;

    if (!hasUpdate) {
      return undefined;
    }

    const currentLocal = this.utcToLocal({
      date: existingDate,
      timezone,
    });

    const date = bodyDate ?? currentLocal.toFormat('yyyy-MM-dd');
    const time = bodyTime ?? currentLocal.toFormat('HH:mm');

    return this.localToUtc({
      date,
      time,
      timezone,
    });
  }

  /**
   * Safe formatter for frontend forms
   */
  formatForForm(params: { date: Date; timezone: string }) {
    const local = this.utcToLocal(params);

    return {
      formDate: local.toFormat('yyyy-MM-dd'),
      formTime: local.toFormat('HH:mm'),
    };
  }

  /**
   * Optional fallback helper (only if needed)
   */
  getSafeTimezone(timezone?: string): string {
    return timezone || this.DEFAULT_TIME_ZONE;
  }
}
