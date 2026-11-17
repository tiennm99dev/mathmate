import { describe, expect, it } from 'vitest';
import {
  START,
  boardNote,
  completeEdges,
  handshakeTex,
  keepVertices,
  toggleEdge,
} from './engine.js';

describe('graph drawing board', () => {
  it('adds and removes an edge, never a loop', () => {
    const added = toggleEdge(START, 4, 5);
    expect(added).toHaveLength(5);
    expect(toggleEdge(added, 5, 4)).toEqual(START);
    expect(toggleEdge(START, 2, 2)).toBe(START);
    expect(keepVertices(START, 4)).toHaveLength(3);
  });

  it('writes the handshake sum', () => {
    expect(handshakeTex(6, START)).toBe(
      '\\deg(A) + \\deg(B) + \\deg(C) + \\deg(D) + \\deg(E) + \\deg(F) = 2 + 2 + 2 + 1 + 1 + 0 = 8 = 2 \\cdot 4',
    );
    expect(completeEdges(5)).toHaveLength(10);
  });

  it('describes components, odd vertices and cycles', () => {
    const start = boardNote(6, START).text;
    expect(start).toContain('3 thành phần liên thông');
    expect(start).toContain('2 đỉnh bậc lẻ (D, E)');
    expect(start).toContain('chu trình sơ cấp');
    const k4 = boardNote(4, completeEdges(4));
    expect(k4.tone).toBe('ok');
    expect(k4.text).toContain('$K_4$');
    const path = boardNote(3, [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
    ]).text;
    expect(path).toContain('liên thông');
    expect(path).toContain('không có chu trình');
  });
});
