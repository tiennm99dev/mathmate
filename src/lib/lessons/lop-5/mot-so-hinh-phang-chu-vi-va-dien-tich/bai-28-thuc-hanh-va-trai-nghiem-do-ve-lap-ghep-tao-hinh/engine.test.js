import { describe, expect, it } from 'vitest';
import {
  PIECE_SHAPES,
  TANGRAM_BOARD,
  boardStatus,
  boardTarget,
  sizeOf,
  solve,
  startPoses,
  turned,
} from '#lib/core/kid/tangram.js';
import { polygonArea } from '#lib/geom-engine/plane.js';
import {
  COLS,
  GROUND,
  PARTS,
  PUZZLES,
  START,
  SUN,
  TASKS,
  areasOf,
  layout,
  setMeasure,
  taskNote,
  totalWork,
  workOf,
} from './engine.js';

describe('the house picture', () => {
  it('adds up the areas of the parts', () => {
    const a = areasOf(START);
    expect(a).toEqual({ roof: 21, wall: 48, hill: 15, sun: 3.14, total: 87.14 });
    expect(totalWork(START)).toBe('21 + 48 + 15 + 3,14 = 87,14 (cm²)');
    expect(workOf(START).wall).toContain('chu vi (8 + 6) × 2 = 28 (cm)');
    expect(workOf(START).sun).toContain('2 × 3,14 = 6,28');
  });

  it('keeps every measure in range and the wall under the roof', () => {
    let h = setMeasure(START, 'roofA', 2);
    expect(h.roofA).toBe(START.wallW);
    h = setMeasure(START, 'roofB', 40);
    expect(h.roofB).toBe(START.roofA - 1);
    h = setMeasure(START, 'sunR', 0);
    expect(h.sunR).toBe(1);
  });

  it('keeps the largest picture on the paper with the sun clear of the roof', () => {
    /** @type {import('./engine.js').House} */
    const big = { ...START };
    for (const part of Object.values(PARTS)) {
      for (const m of part.measures) big[m.key] = m.max({ ...big, roofA: 14 });
    }
    const p = layout(big);
    const xs = [...p.roof, ...p.hill].map((q) => q.x);
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...xs)).toBeLessThanOrEqual(COLS);
    expect(Math.min(...p.roof.map((q) => q.y))).toBeGreaterThanOrEqual(0);
    expect(SUN.x + big.sunR).toBeLessThan(Math.min(...p.roof.map((q) => q.x)));
    expect(p.wall.y + p.wall.h).toBe(GROUND);
  });

  it('starts every challenge unsolved and each can be solved', () => {
    const solutions = [
      { roofA: 12, roofB: 6, roofH: 3 },
      { roofA: 12, roofB: 8, roofH: 2 },
      { wallW: 8, wallH: 4 },
      { hillA: 6, hillH: 4 },
      { sunR: 2 },
    ];
    /** @type {string[]} */
    const bad = [];
    TASKS.forEach((task, i) => {
      if (task.done(START)) bad.push(`${i} starts done`);
      const h = { ...START, ...solutions[i] };
      if (!task.done(h)) bad.push(`${i} not done`);
      if (taskNote(task, h).tone !== 'ok') bad.push(`${i} note`);
    });
    expect(bad).toEqual([]);
  });
});

describe('the shape puzzles', () => {
  it('fit the board, can be solved and say the right area', () => {
    /** @type {string[]} */
    const bad = [];
    const { w, h, tray } = TANGRAM_BOARD;
    for (const puzzle of PUZZLES) {
      startPoses(puzzle).forEach((pose, i) => {
        const size = sizeOf(turned(PIECE_SHAPES[puzzle.pieces[i].shape].corners, pose.rot));
        if (pose.x + size.w > w || pose.y + size.h > h || pose.y < tray)
          bad.push(`${puzzle.id} piece ${i}`);
      });
      for (const p of boardTarget(puzzle).flat()) {
        if (p.x < 0 || p.x > w || p.y < 0 || p.y > tray) bad.push(`${puzzle.id} target`);
      }
      const answer = solve(puzzle);
      if (!answer || boardStatus(puzzle, answer).state !== 'done')
        bad.push(`${puzzle.id} no solution`);
      if (boardStatus(puzzle, startPoses(puzzle)).state === 'done')
        bad.push(`${puzzle.id} starts done`);
      const area = Math.abs(polygonArea(puzzle.target[0]));
      const pieces = puzzle.pieces.reduce(
        (s, p) => s + Math.abs(polygonArea(PIECE_SHAPES[p.shape].corners)),
        0,
      );
      if (area !== pieces) bad.push(`${puzzle.id} area ${area} vs ${pieces}`);
      if (!puzzle.done.includes(`= ${area} (cm²)`)) bad.push(`${puzzle.id} done text`);
    }
    expect(bad).toEqual([]);
  });
});
