// src/utils/date.js

// Robust parser for "May 2024", "Dec 2024", "December 2024", etc.
const MONTHS = {
    january: 1, jan: 1,
    february: 2, feb: 2,
    march: 3, mar: 3,
    april: 4, apr: 4,
    may: 5,
    june: 6, jun: 6,
    july: 7, jul: 7,
    august: 8, aug: 8,
    september: 9, sep: 9, sept: 9,
    october: 10, oct: 10,
    november: 11, nov: 11,
    december: 12, dec: 12,
};

/**
 * Parse "May 2024" -> timestamp at the start of that month (local time).
 * Returns NaN if it can't parse.
 */
export function parseMonthYear(str) {
    if (!str) return NaN;
    const m = String(str).trim().toLowerCase().match(/^([a-z]+)\s+(\d{4})$/i);
    if (!m) return NaN;
    const monthName = m[1].toLowerCase();
    const year = parseInt(m[2], 10);
    const month = MONTHS[monthName];
    if (!month || !year) return NaN;
    return new Date(year, month - 1, 1).getTime(); // JS month is 0-based
}

/** Convert "YYYY-MM" from the MonthPicker to [startTS, endTS] (inclusive). */
export function monthInputRange(value /* 'YYYY-MM' or '' */) {
    if (!value) return [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY];
    const [y, m] = value.split("-").map(Number);
    if (!y || !m) return [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY];
    const start = new Date(y, m - 1, 1).getTime();
    const end = new Date(y, m, 0, 23, 59, 59, 999).getTime(); // last ms of month
    return [start, end];
}
