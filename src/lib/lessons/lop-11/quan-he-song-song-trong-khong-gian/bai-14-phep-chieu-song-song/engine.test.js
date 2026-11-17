import { describe, expect, it } from 'vitest';
import { rayDirection } from '#lib/geom-engine/space.js';
import { SHAPES, facts, figure, flattens, project } from './engine.js';

const DIRECTIONS = [
  [0, 90],
  [30, 60],
  [135, 45],
  [270, 35],
  [345, 75],
];

describe('parallel projection of flat figures', () => {
  it('puts every image on the ground', () => {
    const wrong = [];
    for (const { id } of SHAPES) {
      for (const [a, e] of DIRECTIONS) {
        const img = project(figure(id).points, rayDirection(a, e));
        if (Object.values(img).some((p) => Math.abs(p.z) > 1e-9)) wrong.push(`${id} ${a} ${e}`);
      }
    }
    expect(wrong).toEqual([]);
  });

  it('keeps parallel lines, midpoints and ratios on parallel segments', () => {
    const wrong = [];
    for (const { id } of SHAPES) {
      for (const [a, e] of DIRECTIONS) {
        const f = figure(id);
        const list = facts(id, f.points, project(f.points, rayDirection(a, e)));
        const kept = list.filter((x) => x.kept).length;
        // The kept facts come first and always hold.
        if (list.slice(0, id === 'vuong' ? 3 : 1).some((x) => !x.kept))
          wrong.push(`${id} ${a} ${e}`);
        if (list.some((x) => x.text.includes('NaN'))) wrong.push(`NaN ${id}`);
        if (kept === 0) wrong.push(`none ${id}`);
      }
    }
    expect(wrong).toEqual([]);
    const f = figure('vuong');
    const ratio = facts('vuong', f.points, project(f.points, rayDirection(30, 60)))[1].text;
    expect(ratio).toContain('= 1$');
  });

  it('changes the right angle of the square for a slanted direction', () => {
    const f = figure('vuong');
    const list = facts('vuong', f.points, project(f.points, rayDirection(30, 50)));
    expect(list[3].kept).toBe(false);
    // Straight down, the horizontal side and the tilted side stay at right angles.
    const down = facts('vuong', f.points, project(f.points, rayDirection(0, 90)));
    expect(down[3].kept).toBe(true);
  });

  it('flattens the image when l runs along the figure plane', () => {
    expect(flattens(rayDirection(270, 50))).toBe(true);
    expect(flattens(rayDirection(0, 90))).toBe(false);
  });
});
