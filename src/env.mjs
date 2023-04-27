import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    IRON_SESSION_PASSWORD: z.string().min(32),
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
    POSTMARK_FROM_EMAIL: z.string().email(),
    POSTMARK_SERVER_TOKEN: z.string(),
    URL: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_URL: z.string().optional(),
    NEXT_PUBLIC_WAITLIST_ENABLED: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    IRON_SESSION_PASSWORD: process.env.IRON_SESSION_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    POSTMARK_FROM_EMAIL: process.env.POSTMARK_FROM_EMAIL,
    POSTMARK_SERVER_TOKEN: process.env.POSTMARK_SERVER_TOKEN,
    URL: process.env.URL,
    NEXT_PUBLIC_WAITLIST_ENABLED: process.env.NEXT_PUBLIC_WAITLIST_ENABLED,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
});
