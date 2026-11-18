/**
 * Riemann sums for the integral lessons: the rectangles standing on the
 * x-axis and their signed sum.
 */

/** @typedef {'left' | 'mid' | 'right'} Rule */

/**
 * The n rectangles of a Riemann sum of f on [a, b]: each has width
 * (b − a)/n and height f at the left end, the midpoint or the right end of
 * its piece. Returns the rectangles and their signed sum.
 * @param {(x: number) => number} f @param {number} a @param {number} b @param {number} n
 * @param {Rule} [rule]
 */
export function riemann(f, a, b, n, rule = 'left') {
  const h = (b - a) / n;
  const shift = rule === 'left' ? 0 : rule === 'mid' ? 0.5 : 1;
  const rects = [];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const x0 = a + i * h;
    const y = f(x0 + shift * h);
    rects.push({ x0, x1: x0 + h, y });
    sum += y * h;
  }
  return { rects, sum };
}
