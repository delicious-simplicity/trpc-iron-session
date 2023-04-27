import { env } from '~/env.mjs';

const LOCALHOST_URL = `http://localhost:${process.env.PORT ?? 3000}`;

function serverSiteURL() {
  if (process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview') {
    return env.URL || env.NEXT_PUBLIC_URL || 'https://' + process.env.VERCEL_URL;
  }

  return LOCALHOST_URL;
}

function browserSiteURL() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
    return env.NEXT_PUBLIC_URL || 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL;
  }

  return LOCALHOST_URL;
}

export const siteURL = () => {
  return typeof window === 'undefined' ? serverSiteURL() : browserSiteURL();
};
