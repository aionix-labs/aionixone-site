export const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.aionixone.com';

export function docsUrl(path: string = ''): string {
  const base = DOCS_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return path ? `${base}${cleanPath}` : base;
}
