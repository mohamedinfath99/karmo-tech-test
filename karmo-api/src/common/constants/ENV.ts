export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT ?? 3000,
  timeZone: process.env.TZ,
} as const;
