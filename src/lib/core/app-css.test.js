import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync(new URL('../../app.css', import.meta.url), 'utf8');

/** @param {string} selector */
function block(selector) {
  const at = css.indexOf(`${selector} {`);
  return at === -1 ? '' : css.slice(at, css.indexOf('}', at));
}

describe('app.css', () => {
  it('lets a wide display formula scroll inside its own box, never widening the page', () => {
    const rule = block('.katex-display');
    expect(rule).toContain('max-width: 100%');
    expect(rule).toContain('overflow-x: auto');
    expect(rule).toContain('overflow-y: hidden');
  });
});
