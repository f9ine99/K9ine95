import { describe, it, expect } from 'vitest';
import { sanitizeRichText } from './sanitizeRichText';

describe('sanitizeRichText', () => {
  it('returns an empty string for empty input', () => {
    expect(sanitizeRichText('')).toBe('');
  });

  it('escapes plain angle brackets and unknown tags', () => {
    expect(sanitizeRichText('a <div>b</div> c')).toBe('a &lt;div&gt;b&lt;/div&gt; c');
  });

  it('strips script tags entirely', () => {
    expect(sanitizeRichText('hi<script>alert(1)</script>there')).toBe('hithere');
  });

  it('strips style tags entirely', () => {
    expect(sanitizeRichText('a<style>body{}</style>b')).toBe('ab');
  });

  it('preserves allowed formatting tags', () => {
    expect(sanitizeRichText('<strong>bold</strong> and <em>italic</em>')).toBe(
      '<strong>bold</strong> and <em>italic</em>'
    );
  });

  it('preserves line breaks', () => {
    expect(sanitizeRichText('a<br>b')).toBe('a<br>b');
  });

  it('keeps safe https anchors and adds rel attributes', () => {
    expect(sanitizeRichText('<a href="https://example.com">link</a>')).toBe(
      '<a href="https://example.com" target="_blank" rel="noopener noreferrer">link</a>'
    );
  });

  it('keeps relative anchors without target', () => {
    expect(sanitizeRichText('<a href="/about">about</a>')).toBe('<a href="/about">about</a>');
  });

  it('allows mailto links', () => {
    expect(sanitizeRichText('<a href="mailto:a@b.com">mail</a>')).toBe(
      '<a href="mailto:a@b.com">mail</a>'
    );
  });

  it('drops javascript: hrefs but keeps the text', () => {
    expect(sanitizeRichText('<a href="javascript:alert(1)">x</a>')).toBe('x');
  });

  it('escapes quotes and ampersands in plain text', () => {
    expect(sanitizeRichText(`Tom & "Jerry"`)).toBe('Tom &amp; &quot;Jerry&quot;');
  });

  it('does not leave a usable script when nested inside text', () => {
    const out = sanitizeRichText('<b>x</b><script>evil()</script>');
    expect(out).not.toContain('<script>');
    expect(out).not.toContain('evil()');
  });
});
