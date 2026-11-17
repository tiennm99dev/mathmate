import { describe, expect, it } from 'vitest';
import { PROOFS, blanksOf, progressText } from './proofs.js';

describe('fill-in induction proofs', () => {
  it('prove true statements', () => {
    const bad = [];
    for (const p of PROOFS) {
      for (let n = p.start; n <= 30; n += 1) if (!p.holds(n)) bad.push(`${p.id} ${n}`);
    }
    expect(bad).toEqual([]);
  });

  it('start where the statement starts to hold', () => {
    const bad = PROOFS.filter((p) => p.start > 1 && p.holds(p.start - 1)).map((p) => p.id);
    expect(bad).toEqual([]);
  });

  it('have blanks with one valid answer among distinct options', () => {
    const bad = [];
    for (const p of PROOFS) {
      const blanks = blanksOf(p);
      if (blanks.length < 3) bad.push(`${p.id} has few blanks`);
      for (const b of blanks) {
        if (!(b.answer >= 0 && b.answer < b.options.length)) bad.push(`${p.id} answer`);
        if (new Set(b.options).size !== b.options.length) bad.push(`${p.id} options`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('reports progress', () => {
    expect(progressText(2, 5)).toBe('Đã điền đúng 2/5 chỗ trống.');
    expect(progressText(3, 3)).toContain('hoàn chỉnh');
  });
});
