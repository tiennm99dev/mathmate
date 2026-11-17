import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { lineRelation } from '#lib/geom-engine/space.js';
import { BOX, PAIRS, classify, commonPlane, explain, makePair, segName } from './engine.js';

describe('pairs of lines in the box', () => {
  it('has pairs of each kind and none on one line', () => {
    expect(PAIRS.cat.length).toBeGreaterThan(10);
    expect(PAIRS['song-song'].length).toBeGreaterThan(10);
    expect(PAIRS.cheo.length).toBeGreaterThan(10);
  });

  it('names a plane holding both lines exactly when they are coplanar', () => {
    const wrong = [];
    for (const [kind, pairs] of Object.entries(PAIRS)) {
      for (const [s, t] of pairs) {
        const plane = commonPlane(s, t);
        if ((plane === null) !== (kind === 'cheo')) wrong.push(`${segName(s)} ${segName(t)}`);
        if (plane && plane.length === 4) {
          // Every such plane cuts the box in a rectangle: opposite sides parallel.
          const [p, q, r, u] = plane.map((k) => BOX[k]);
          if (lineRelation(p, q, r, u) !== 'song-song' || lineRelation(q, r, u, p) !== 'song-song')
            wrong.push(`order ${plane.join('')}`);
        }
      }
    }
    expect(wrong).toEqual([]);
  });

  it('explains every pair with the right word', () => {
    const wrong = [];
    const words = { cat: 'cắt nhau', 'song-song': '\\parallel', cheo: 'chéo nhau' };
    for (const [kind, pairs] of Object.entries(PAIRS)) {
      for (const [s, t] of pairs) {
        const text = explain(s, t);
        if (
          !text.includes(words[/** @type {keyof typeof words} */ (kind)]) ||
          text.includes('undefined')
        )
          wrong.push(text);
      }
    }
    expect(wrong).toEqual([]);
    expect(explain(['A', 'B'], ['C', "C'"])).toContain('cắt $(ABCD)$ tại $C \\notin AB$');
  });

  it('draws questions of all three kinds', () => {
    const rand = rng(7);
    const kinds = new Set();
    for (let i = 0; i < 30; i++) {
      const [s, t] = makePair(rand);
      kinds.add(classify(s, t));
    }
    expect([...kinds].sort()).toEqual(['cat', 'cheo', 'song-song']);
  });
});
