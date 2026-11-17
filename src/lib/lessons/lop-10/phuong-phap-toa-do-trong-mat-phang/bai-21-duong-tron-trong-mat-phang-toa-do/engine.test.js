import { describe, expect, it } from 'vitest';
import { latticeOnCircle } from '../_shared/coords.js';
import { R2_CHOICES, clampCentre, fits, panelTex } from './engine.js';

describe('the circle board', () => {
  it('offers only radii whose circles pass through at least four grid points', () => {
    const few = R2_CHOICES.filter((r2) => latticeOnCircle({ x: 0, y: 0 }, r2).length < 4);
    expect(few).toEqual([]);
  });

  it('keeps the circle on the board', () => {
    expect(fits({ x: 2, y: 1 }, 25)).toBe(true);
    expect(fits({ x: 3, y: 0 }, 25)).toBe(false);
    expect(clampCentre({ x: 5, y: -4 }, 25)).toEqual({ x: 2, y: -1 });
    expect(clampCentre({ x: 1, y: 1 }, 4)).toEqual({ x: 1, y: 1 });
  });

  it('writes the equation, the expanded form and the tangent', () => {
    const t = panelTex({ x: 1, y: 2 }, 25, { x: 4, y: 6 });
    expect(t.equation).toBe('(C): (x - 1)^2 + (y - 2)^2 = 25');
    expect(t.expanded).toBe('\\Leftrightarrow x^2 + y^2 - 2x - 4y - 20 = 0');
    expect(t.coefs).toBe('a = 1,\\ b = 2,\\ c = -20');
    expect(t.tangent).toEqual([
      '(1 - 4)(x - 4) + (2 - 6)(y - 6) = 0',
      '\\Leftrightarrow 3x + 4y - 36 = 0',
    ]);
    expect(panelTex({ x: 0, y: 0 }, 8, { x: 2, y: 2 }).centre).toBe(
      'I(0;\\ 0),\\quad R = 2\\sqrt{2}',
    );
  });
});
