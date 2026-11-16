import { describe, expect, it } from 'vitest';
import { lineAngle, paramsOf, pointAt } from '../_shared/lines.js';
import { STEP, TASKS, drawMessage, drawnLine, pointOf, slideMessage, stageOf } from './engine.js';

/** @param {{ x: number, y: number }} p */
const onBoard = (p) => p.x >= 10 && p.x <= 390 && p.y >= 10 && p.y <= 290;

describe('drawing a parallel through H in two steps', () => {
  it('keeps every task on the board, on whole steps and unsolved at the start', () => {
    const bad = [];
    for (const [i, t] of TASKS.entries()) {
      for (const step of /** @type {const} */ ([1, 2])) {
        const st = stageOf(t, step);
        if (st.target % STEP || st.start % STEP) bad.push([i, step, 'off step']);
        if (st.start === st.target) bad.push([i, step, 'starts solved']);
        if (!onBoard(pointAt(st.base, 0)) || !onBoard(pointAt(st.base, st.len)))
          bad.push([i, step, 'names off board']);
      }
      if (!onBoard(pointOf(t))) bad.push([i, 'H off board']);
    }
    expect(bad).toEqual([]);
  });

  it('draws MN through H perpendicular to AB, then CD through H parallel to AB', () => {
    const bad = [];
    for (const t of TASKS) {
      const H = pointOf(t);
      const s1 = stageOf(t, 1);
      const mn = drawnLine(s1, s1.target);
      if (lineAngle(mn.deg, t.base.deg) !== 90) bad.push('MN not perpendicular');
      if (Math.abs(paramsOf({ o: mn.p, deg: mn.deg }, H).h) > 1e-6) bad.push('MN misses H');
      const s2 = stageOf(t, 2);
      if (lineAngle(s2.base.deg, mn.deg) !== 0) bad.push('step 2 not on MN');
      if (Math.abs(paramsOf(s2.base, H).h) > 1e-6) bad.push('H not on MN');
      const cd = drawnLine(s2, s2.target);
      if (lineAngle(cd.deg, t.base.deg) !== 0) bad.push('CD not parallel');
      if (Math.hypot(cd.p.x - H.x, cd.p.y - H.y) > 1e-6) bad.push('CD misses H');
    }
    expect(bad).toEqual([]);
  });

  it('guides each step', () => {
    const t = TASKS[0];
    const s1 = stageOf(t, 1);
    const s2 = stageOf(t, 2);
    expect(slideMessage(1, s1, 60)).toContain('về phía B');
    expect(slideMessage(1, s1, 180)).toContain('vẽ đường thẳng MN');
    expect(slideMessage(2, s2, 40)).toContain('về phía N');
    expect(drawMessage(1, s1, 170).done).toBe(false);
    expect(drawMessage(1, s1, 180).done).toBe(true);
    expect(drawMessage(2, s2, s2.target).text).toContain('song song với AB');
    expect(drawMessage(2, s2, 40).text).toContain('chưa đi qua H');
  });
});
