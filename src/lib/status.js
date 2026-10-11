/**
 * Research and open-source entries carry one `status` string. Settled work is
 * drawn with a filled dot, work still under review with a hollow ring.
 */
const settled = new Set(['accepted', 'published', 'preprint', 'merged', 'released']);

/** @param {string} status */
export const isSettled = (status) => settled.has(status);

/** @param {string} status */
export const statusLabel = (status) => status.charAt(0).toUpperCase() + status.slice(1);
