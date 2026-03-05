/**
 * Shared utilities for the booking flow.
 */

/** @param {Date | null} d */
export function formatDate(d, opts = {}) {
  if (!d) return '—';
  const defaults = { day: 'numeric', month: 'long', year: 'numeric' };
  return d.toLocaleDateString('en-AE', { ...defaults, ...opts });
}

/** @param {string | number} id */
export function formatWarehouseId(id) {
  return `WH - ${String(id).padStart(3, '0')}`;
}

/** @param {number} n */
/** @param {{ lower?: boolean }} [opts] */
export function pluralizeMonths(n, opts = {}) {
  const word = n === 1 ? 'Month' : 'Months';
  return opts.lower ? word.toLowerCase() : word;
}
