/**
 * Problems solved by going back to one unit: `units` equal groups hold
 * `total` things; step 1 divides to find one group (rút về đơn vị), step 2
 * multiplies to find `ask` groups. Each step asks for its number among
 * options built from the slips a child makes. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { slipOptions } from '#lib/core/kid/quiz.js';

/**
 * A story: the group word, the verb that puts the things in a group ("đĩa
 * đựng cam", "lọ cắm hoa"), the thing word and its picture.
 * @typedef {{ group: string, verb: string, thing: string, picture: import('#lib/core/kid/pictures/index.js').PictureName }} Story
 */

/** @typedef {{ story: Story, units: number, per: number, ask: number }} Task */

/** @type {Story[]} */
export const STORIES = [
  { group: 'đĩa', verb: 'đựng', thing: 'quả cam', picture: 'orange' },
  { group: 'lọ', verb: 'cắm', thing: 'bông hoa', picture: 'flower' },
  { group: 'hộp', verb: 'đựng', thing: 'cái bút chì', picture: 'pencil' },
  { group: 'bể', verb: 'nuôi', thing: 'con cá', picture: 'fish' },
  { group: 'hộp', verb: 'đựng', thing: 'quả dâu tây', picture: 'strawberry' },
  { group: 'chùm', verb: 'gồm', thing: 'quả bóng bay', picture: 'balloon' },
];

/** The first task: 3 plates hold 24 oranges; how many do 5 plates hold? */
export const FIRST = /** @type {Task} */ ({ story: STORIES[0], units: 3, per: 8, ask: 5 });

/**
 * A random task: 2 to 6 groups of 3 to 9 things, asking for 2 to 8 groups,
 * a different number of groups.
 * @param {() => number} rand
 * @param {Task} [not] a task not to repeat
 * @returns {Task}
 */
export function drawTask(rand, not) {
  for (let i = 0; i < 100; i++) {
    const units = int(rand, 2, 6);
    const ask = int(rand, 2, 8);
    const task = { story: pick(rand, STORIES), units, per: int(rand, 3, 9), ask };
    const same = not && not.units === units && not.per === task.per && not.ask === ask;
    if (ask !== units && !same) return task;
  }
  return FIRST;
}

/** @param {Task} task */
export const totalOf = ({ units, per }) => units * per;

/** @param {Task} task */
export const answerOf = ({ per, ask }) => per * ask;

/**
 * The problem in words.
 * @param {Task} task
 */
export function problemText(task) {
  const { story, units, ask } = task;
  return `Có ${units} ${story.group} như nhau ${story.verb} ${totalOf(task)} ${story.thing}. Hỏi ${ask} ${story.group} như thế có bao nhiêu ${story.thing}?`;
}

/**
 * The question of a step: 0 finds one group, 1 finds the asked groups.
 * @param {Task} task
 * @param {0 | 1} step
 */
export function stepQuestion(task, step) {
  const { story, units, per, ask } = task;
  if (step === 0) {
    const total = totalOf(task);
    const slips = [total - units, units + per, per * 2];
    return {
      prompt: `Bước 1: Mỗi ${story.group} có mấy ${story.thing}? (${total} : ${units})`,
      ...slipOptions(per, slips, { near: [1, -1, 2], min: 1 }),
      sentence: `${total} : ${units} = ${per} (${story.thing})`,
    };
  }
  const right = answerOf(task);
  const slips = [per * (ask + 1), per * (ask - 1), totalOf(task) + per, per + ask];
  return {
    prompt: `Bước 2: ${ask} ${story.group} có bao nhiêu ${story.thing}? (${per} × ${ask})`,
    ...slipOptions(right, slips, { min: 1 }),
    sentence: `${per} × ${ask} = ${right} (${story.thing})`,
  };
}

/**
 * The hint after a wrong pick.
 * @param {Task} task
 * @param {0 | 1} step
 */
export function stepHint(task, step) {
  const { story, units, ask } = task;
  return step === 0
    ? `Chia đều ${totalOf(task)} ${story.thing} vào ${units} ${story.group}: em tính ${totalOf(task)} : ${units}.`
    : `Một ${story.group} có ${task.per} ${story.thing}. ${ask} ${story.group} thì em nhân với ${ask}.`;
}

/**
 * The rows of the two-step table: groups, things, and how the number was found.
 * The last row's method names one group's number only once step 1 has found
 * it, so the table never gives that answer away.
 * @param {Task} task
 * @param {number} found how many steps are done
 * @returns {string[][]}
 */
export function tableRows(task, found) {
  const { units, per, ask } = task;
  const total = totalOf(task);
  return [
    [String(units), String(total), 'Đề bài cho'],
    ['1', found >= 1 ? String(per) : '?', `${total} : ${units}`],
    [String(ask), found >= 2 ? String(answerOf(task)) : '?', `${found >= 1 ? per : '?'} × ${ask}`],
  ];
}

/**
 * The closing sentence.
 * @param {Task} task
 */
export function doneText(task) {
  const { story, ask } = task;
  return `Đáp số: ${answerOf(task)} ${story.thing}. Em chia để tìm một ${story.group} (rút về đơn vị), rồi nhân để tìm ${ask} ${story.group}.`;
}
