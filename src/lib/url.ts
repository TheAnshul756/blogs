const RAW_BASE = import.meta.env.BASE_URL || '/';

function normalizeBase(base: string): string {
  if (!base || base === '/') return '';
  return base.endsWith('/') ? base.slice(0, -1) : base;
}

const BASE = normalizeBase(RAW_BASE);

export function withBase(path: string): string {
  if (!path) return BASE || '/';
  if (/^([a-z][a-z0-9+.-]*:|\/\/|mailto:|tel:|#)/i.test(path)) return path;
  const p = path.startsWith('/') ? path : '/' + path;
  return (BASE + p) || '/';
}

export function stripBase(pathname: string): string {
  if (!BASE) return pathname;
  if (pathname === BASE) return '/';
  if (pathname.startsWith(BASE + '/')) return pathname.slice(BASE.length);
  return pathname;
}
