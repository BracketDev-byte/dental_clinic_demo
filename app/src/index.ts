import { drizzle } from 'drizzle-orm/neon-http';

function cleanDbUrl(url?: string): string {
  if (!url) return '';
  let cleaned = url.trim();
  if (cleaned.startsWith('psql ')) {
    cleaned = cleaned.replace(/^psql\s+['\"]?/, '').replace(/['\"]?$/, '');
  }
  return cleaned;
}

const cleanedUrl = cleanDbUrl(process.env.DATABASE_URL);

export const db = cleanedUrl
  ? drizzle(cleanedUrl)
  : drizzle('postgresql://localhost/mock');

export { cleanDbUrl };
export * from './db/schemaExports';
