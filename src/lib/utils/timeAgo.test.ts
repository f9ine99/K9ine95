import { describe, it, expect } from 'vitest';
import { timeAgo } from './timeAgo';

const NOW = new Date('2026-01-15T12:00:00Z').getTime();

describe('timeAgo', () => {
  it('formats minutes', () => {
    const then = new Date(NOW - 5 * 60_000).toISOString();
    expect(timeAgo(then, NOW)).toBe('5m ago');
  });

  it('formats hours', () => {
    const then = new Date(NOW - 3 * 3_600_000).toISOString();
    expect(timeAgo(then, NOW)).toBe('3h ago');
  });

  it('returns "Yesterday" for exactly one day', () => {
    const then = new Date(NOW - 24 * 3_600_000).toISOString();
    expect(timeAgo(then, NOW)).toBe('Yesterday');
  });

  it('formats days within a week', () => {
    const then = new Date(NOW - 3 * 86_400_000).toISOString();
    expect(timeAgo(then, NOW)).toBe('3d ago');
  });

  it('falls back to a locale date for older dates', () => {
    const then = new Date(NOW - 30 * 86_400_000).toISOString();
    const result = timeAgo(then, NOW);
    expect(result).not.toMatch(/ago|Yesterday/);
  });

  it('returns "Recently" for invalid input', () => {
    expect(timeAgo('not-a-date', NOW)).toBe('Recently');
  });
});
