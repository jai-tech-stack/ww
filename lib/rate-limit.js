// Lightweight in-memory sliding-window rate limiter.
// Note: state is per serverless instance, so limits are approximate under heavy
// horizontal scaling. For strict global limits, back this with Upstash Redis.

const buckets = new Map();
let lastSweep = Date.now();

function sweep(windowMs) {
  const now = Date.now();
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [k, arr] of buckets) {
    const fresh = arr.filter((t) => now - t < windowMs);
    if (fresh.length) buckets.set(k, fresh);
    else buckets.delete(k);
  }
}

/**
 * @returns {{ ok: boolean, remaining: number, retryAfter: number }}
 */
export function rateLimit({ key, limit, windowMs }) {
  const now = Date.now();
  sweep(windowMs);
  const arr = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) {
    buckets.set(key, arr);
    return { ok: false, remaining: 0, retryAfter: Math.ceil((windowMs - (now - arr[0])) / 1000) };
  }
  arr.push(now);
  buckets.set(key, arr);
  return { ok: true, remaining: limit - arr.length, retryAfter: 0 };
}

export function clientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return String(xff).split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}
