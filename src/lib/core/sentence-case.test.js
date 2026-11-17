import { describe, expect, it } from 'vitest';
import { lowerFirst } from './sentence-case.js';

describe('lowerFirst', () => {
  it.each([
    ['Thiên địch', 'thiên địch'],
    ['DNA tái tổ hợp', 'DNA tái tổ hợp'],
    ['CO₂', 'CO₂'],
    ['Vi khuẩn Bt', 'vi khuẩn Bt'],
    ['', ''],
  ])('%j → %j', (text, out) => {
    expect(lowerFirst(text)).toBe(out);
  });
});
