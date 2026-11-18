import { describe, it, expect } from 'vitest';
import { snapX } from './snap.js';

describe('snapping a handle', () => {
  it('snaps to the grid, to special values and to the ends', () => {
    const opts = { lo: -2, hi: 2, step: 0.1, snaps: [2 / 3] };
    expect(snapX(0.34, opts)).toBe(0.3);
    expect(snapX(0.68, opts)).toBe(2 / 3);
    expect(snapX(5, opts)).toBe(2);
  });
});
