/**
 * These are the array of routes that do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/app",
  "/auth/new-verification",
  "/api/cron",
  "/api/webhooks/stripe",
  "/api/webhooks/stripePaymentIntent",
  "/pricing",
  "/docs",
  "/feedback",
  "/privacy",
  "/features",
  "/tos",
  "/link-google-doc",
  "/link-notion-page",
  "/tutorials",
  "/userDetails",
  "/api/og"
];

/**
 * These are the array of routes that are used for authentication.
 * Redirects logged in users to settings.
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error", "/auth/reset", "/auth/new-password"];


export const embedPrefix = "/embed";

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after loggin in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dash";
