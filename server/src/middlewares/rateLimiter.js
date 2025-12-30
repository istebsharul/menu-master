import rateLimit from 'express-rate-limit';

// --------------------
// PUBLIC APIs (Customer Menu)
// --------------------
export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: Number(process.env.PUBLIC_RATE_LIMIT) || 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
});

// --------------------
// AUTH APIs (Login / Register)
// --------------------
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.AUTH_RATE_LIMIT) || 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts.',
  },
});

// --------------------
// ADMIN / DASHBOARD APIs
// --------------------
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.ADMIN_RATE_LIMIT) || 1000,
  standardHeaders: true,
  legacyHeaders: false,
});