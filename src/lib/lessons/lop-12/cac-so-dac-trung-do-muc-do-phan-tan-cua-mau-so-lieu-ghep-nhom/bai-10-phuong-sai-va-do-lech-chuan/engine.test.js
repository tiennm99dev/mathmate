import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { FIELDS, groupsOf, riskView, verdict } from './engine.js';

/** @param {string} text */
const texParts = (text) => [...text.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);

describe('what the risk widget shows', () => {
  const a = riskView(groupsOf(FIELDS[0].counts));
  const b = riskView(groupsOf(FIELDS[1].counts));

  it('gives both fields the same mean and different spreads', () => {
    expect([a.mean, a.variance, b.mean, b.variance]).toEqual([3, 6.4, 3, 2.8]);
    expect(a.shares).toEqual([48, 16, 0, 16, 48]);
    expect(a.band?.label).toBe('x̄ ± s, s ≈ 2,53');
    expect(b.band?.from).toBeCloseTo(3 - Math.sqrt(2.8), 12);
  });

  it('names the riskier field', () => {
    const v = verdict(a, b);
    expect(v.tone).toBe('ok');
    expect(v.text).toContain('cùng lợi nhuận trung bình');
    expect(v.text).toContain('đầu tư vào lĩnh vực A rủi ro hơn');
    expect(verdict(b, a).text).toContain('lĩnh vực B rủi ro hơn');
    expect(verdict(a, a).text).toContain('như nhau');
    expect(v.text).toContain('s_A \\approx 2{,}53');
    // midpoints −1 and 7 around the mean 3 give s = 4 exactly, written with '='
    expect(verdict(riskView(groupsOf([1, 0, 0, 0, 1])), b).text).toContain('s_A = 4');
  });

  it('calls two deviations equal to the hundredth nearly the same risk', () => {
    // s² = 3,2 and 3,2 + 1/400 give s ≈ 1,79 both
    const near = verdict(
      { ...a, mean: 3, std: Math.sqrt(3.2) },
      { ...b, mean: 3, std: Math.sqrt(3.2025) },
    );
    expect(near.tone).toBe('info');
    expect(near.text).toContain('gần như nhau');
  });

  it('keeps the strip on the chart and warns on an empty field', () => {
    expect(riskView(groupsOf([10, 0, 0, 0, 10])).band).toMatchObject({ from: -1, to: 7 });
    expect(riskView(groupsOf([20, 0, 0, 0, 1])).band?.from).toBe(-2);
    const empty = riskView(groupsOf([0, 0, 0, 0, 0]));
    expect(empty.empty).toBe(true);
    expect(verdict(empty, b).tone).toBe('warn');
    expect(riskView(groupsOf([0, 0, 5, 0, 0])).band).toBeNull();
  });

  it('renders every formula and verdict in KaTeX for many tables', () => {
    const bad = [];
    for (let shift = 0; shift < 8; shift++) {
      const ca = FIELDS[0].counts.map((c, i) => (c + shift * i) % 11);
      const cb = FIELDS[1].counts.map((c, i) => (c + shift * (4 - i)) % 13);
      const va = riskView(groupsOf(ca));
      const vb = riskView(groupsOf(cb));
      for (const t of [...va.tex, ...vb.tex, ...texParts(verdict(va, vb).text)]) {
        try {
          katex.renderToString(t, { strict: 'error', throwOnError: true });
        } catch {
          bad.push(t);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
