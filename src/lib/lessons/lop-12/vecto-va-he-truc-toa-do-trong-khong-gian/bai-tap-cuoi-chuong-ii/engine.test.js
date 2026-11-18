import { describe, it, expect } from 'vitest';
import { P } from '#lib/geom-engine/space.js';
import {
  DESK_HIGH,
  OBJECTS,
  ROOM,
  ROOM_EDGES,
  boxLines,
  distanceFromO,
  wrongNames,
} from './engine.js';

describe('classroom in Oxyz', () => {
  it('keeps every object inside the room with distinct places', () => {
    const inside = OBJECTS.every(
      ({ at }) =>
        at.x >= 0 &&
        at.x <= ROOM.length &&
        at.y >= 0 &&
        at.y <= ROOM.width &&
        at.z >= 0 &&
        at.z <= ROOM.height,
    );
    expect(inside).toBe(true);
    expect(new Set(OBJECTS.map((o) => `${o.at.x},${o.at.y},${o.at.z}`)).size).toBe(OBJECTS.length);
  });

  it('places the desk corner and room centre where the words say', () => {
    const desk = OBJECTS.find((o) => o.id === 'ban');
    expect(desk?.at).toEqual(DESK_HIGH);
    expect(OBJECTS.find((o) => o.id === 'den')?.at).toEqual(
      P(ROOM.length / 2, ROOM.width / 2, ROOM.height),
    );
  });

  it('draws boxes with twelve edges and measures distances from O', () => {
    expect(ROOM_EDGES).toHaveLength(12);
    expect(boxLines(P(), P(1, 1, 1))).toHaveLength(12);
    expect(distanceFromO(P(4, 3, 0))).toEqual({
      tex: 'OM = \\sqrt{4^2 + 3^2 + 0^2} = \\sqrt{25} = 5',
      value: 5,
    });
    expect(distanceFromO(P(8, 6, 4)).tex).toBe(
      'OM = \\sqrt{8^2 + 6^2 + 4^2} = \\sqrt{116} = 2\\sqrt{29}',
    );
    expect(wrongNames(P(1, 2, 3), P(1, 2, 0))).toEqual(['cao độ']);
  });
});
