import { describe, expect, it } from 'vitest';
import { holdsText } from './strip.js';

describe('numbers on strip pieces', () => {
  it('prints a number only on a piece wide enough for it', () => {
    expect(holdsText(3, 30)).toBe(true);
    expect(holdsText(2, 60)).toBe(false);
  });
});
