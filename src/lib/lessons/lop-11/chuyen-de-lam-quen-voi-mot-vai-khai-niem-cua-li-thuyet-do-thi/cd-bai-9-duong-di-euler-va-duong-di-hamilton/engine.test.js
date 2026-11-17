import { describe, expect, it } from 'vitest';
import { BOARDS, fresh, move, status, theoryNote, undo, walkEdges } from './engine.js';

/**
 * Plays a list of vertex names; fails on a refused move.
 * @param {import('./engine.js').Board} board @param {'euler' | 'hamilton'} mode @param {string} names
 */
function play(board, mode, names) {
  let t = fresh();
  for (const ch of names) {
    const next = move(board, mode, t, ch.charCodeAt(0) - 65);
    if (typeof next === 'string') throw new Error(next);
    t = next;
  }
  return t;
}

describe('one-stroke board', () => {
  it('traces an Euler path on the envelope', () => {
    const t = play(BOARDS.envelope, 'euler', 'DBACBECDE');
    expect(t.used).toHaveLength(8);
    const s = status(BOARDS.envelope, 'euler', t);
    expect(s.tone).toBe('ok');
    expect(s.text).toContain('Đường đi Euler');
  });

  it('uses each parallel bridge once and gets stuck in Königsberg', () => {
    const t = play(BOARDS.konigsberg, 'euler', 'ABAC');
    expect(t.used).toEqual([0, 1, 2]);
    expect(move(BOARDS.konigsberg, 'euler', t, 0)).toEqual({
      walk: [0, 1, 0, 2, 0],
      used: [0, 1, 2, 3],
    });
    expect(move(BOARDS.konigsberg, 'euler', play(BOARDS.konigsberg, 'euler', 'ABA'), 1)).toContain(
      'đều đã đi qua',
    );
    expect(
      status(BOARDS.konigsberg, 'euler', play(BOARDS.konigsberg, 'euler', 'ABACAD')).tone,
    ).toBe('info');
    const stuck = status(BOARDS.konigsberg, 'euler', play(BOARDS.konigsberg, 'euler', 'ABACADB'));
    expect(stuck.tone).toBe('warn');
    expect(stuck.text).toContain('còn 1 cạnh');
  });

  it('refuses moves that break the rules', () => {
    const t = play(BOARDS.bowtie, 'hamilton', 'BA');
    expect(move(BOARDS.bowtie, 'hamilton', t, 1)).toContain('đã đi qua');
    expect(move(BOARDS.bowtie, 'euler', play(BOARDS.bowtie, 'euler', 'B'), 3)).toContain(
      'không kề',
    );
    const stuck = play(BOARDS.bowtie, 'hamilton', 'BCAD');
    expect(
      status(BOARDS.bowtie, 'hamilton', play(BOARDS.bowtie, 'hamilton', 'BCADE')).text,
    ).toContain('không khép');
    expect(status(BOARDS.bowtie, 'hamilton', stuck).tone).toBe('info');
    expect(undo(stuck).walk).toEqual([1, 2, 0]);
  });

  it('closes a Hamilton cycle on the cube', () => {
    const t = play(BOARDS.cube, 'hamilton', 'ABCDHGFEA');
    expect(status(BOARDS.cube, 'hamilton', t).text).toContain('Chu trình Hamilton');
    expect(walkEdges(BOARDS.cube.edges, t.walk)).not.toContain(-1);
  });

  it('states what the theorems say', () => {
    expect(theoryNote(BOARDS.konigsberg, 'euler')).toContain('4 đỉnh bậc lẻ');
    expect(theoryNote(BOARDS.envelope, 'euler')).toContain('D hoặc E');
    expect(theoryNote(BOARDS.bowtie, 'euler')).toContain('chu trình Euler');
    expect(theoryNote(BOARDS.bowtie, 'hamilton')).toContain('không có chu trình Hamilton');
    expect(theoryNote(BOARDS.cube, 'hamilton')).toContain('Dirac');
    expect(theoryNote(BOARDS.envelope, 'hamilton')).toContain('chu trình Hamilton');
    expect(theoryNote(BOARDS.konigsberg, 'hamilton')).toContain('không dùng được định lí Dirac');
  });
});
