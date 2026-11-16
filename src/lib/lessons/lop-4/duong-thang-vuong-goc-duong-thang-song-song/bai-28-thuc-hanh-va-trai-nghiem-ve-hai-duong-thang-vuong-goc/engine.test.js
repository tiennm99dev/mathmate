import { describe, expect, it } from 'vitest';
import { clipLine, lineAngle, paramsOf, setSquare } from '../_shared/lines.js';
import { STEP, TASKS, caseText, drawMessage, pointOf, sideOf, slideMessage } from './engine.js';

describe('drawing a perpendicular through M', () => {
  it('keeps every task on the board and reachable in whole steps', () => {
    const bad = [];
    for (const [i, t] of TASKS.entries()) {
      const m = pointOf(t);
      if (m.x < 20 || m.x > 380 || m.y < 20 || m.y > 280) bad.push([i, 'M off board']);
      if (t.target % STEP || t.start % STEP) bad.push([i, 'off step']);
      if (t.start === t.target) bad.push([i, 'starts solved']);
      if (!clipLine(t.base.o, t.base.deg, 400, 300)) bad.push([i, 'AB off board']);
    }
    expect(bad).toEqual([]);
  });

  it('draws through M exactly at the target, perpendicular to AB', () => {
    const bad = [];
    for (const t of TASKS) {
      const sq = setSquare(t.base, t.target, sideOf(t));
      if (lineAngle(sq.legDeg, t.base.deg) !== 90) bad.push('not perpendicular');
      const leg = paramsOf({ o: sq.corner, deg: sq.legDeg }, pointOf(t));
      if (Math.abs(leg.h) > 1e-6) bad.push('misses M');
      if (leg.s < 0) bad.push('M behind the leg');
    }
    expect(bad).toEqual([]);
  });

  it('tells the child which way to slide and when it is done', () => {
    const t = TASKS[1];
    expect(slideMessage(t, 50).text).toContain('về phía B');
    expect(slideMessage(t, 250).text).toContain('về phía A');
    expect(slideMessage(t, 200).ready).toBe(true);
    expect(drawMessage(t, 200).done).toBe(true);
    expect(drawMessage(t, 180).text).toContain('chưa đi qua M');
    expect(caseText(TASKS[0])).toContain('trên');
    expect(caseText(t)).toContain('ngoài');
  });
});
