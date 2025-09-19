export const DISPLAY_NAME_KEY = 'displayName';

export function getStoredName(): string | null {
  if (typeof window === 'undefined') return null;
  try { return localStorage.getItem(DISPLAY_NAME_KEY); } catch { return null; }
}

export function setStoredName(name: string) {
  try { localStorage.setItem(DISPLAY_NAME_KEY, name); } catch {}
}

export function possessive(name: string) {
  const n = name.trim();
  return n ? (/[sS]$/.test(n) ? `${n}'` : `${n}'s`) : '';
}