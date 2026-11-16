import { describe, expect, it } from 'vitest';
import { QUESTIONS, optionOrder } from './engine.js';

describe('chapter review quiz', () => {
  it('has distinct options and a valid answer in every question', () => {
    const bad = QUESTIONS.filter(
      (q) =>
        new Set(q.options).size !== q.options.length ||
        q.answer < 0 ||
        q.answer >= q.options.length,
    ).map((q) => q.id);
    expect(bad).toEqual([]);
  });

  it('writes the interval answers the book way', () => {
    const byId = Object.fromEntries(QUESTIONS.map((q) => [q.id, q.options[q.answer]]));
    expect(byId.giao).toBe('$(1;\\ 3]$');
    expect(byId.hop).toBe('$(-\\infty;\\ 4)$');
    expect(byId.hieu).toBe('$[0;\\ 2)$');
    expect(byId['phan-bu']).toBe('$(-\\infty;\\ -3] \\cup (2;\\ +\\infty)$');
  });

  it('shows the options in a fixed order that does not always put the answer first', () => {
    const orders = QUESTIONS.map((q, i) => optionOrder(q, i));
    const broken = orders.filter(
      (o, i) => [...o].sort().join() !== QUESTIONS[i].options.map((_, j) => j).join(),
    );
    expect(broken).toEqual([]);
    expect(orders.filter((o, i) => o[0] === QUESTIONS[i].answer).length).toBeLessThan(
      QUESTIONS.length / 2,
    );
    expect(optionOrder(QUESTIONS[0], 0)).toEqual(orders[0]);
  });
});
