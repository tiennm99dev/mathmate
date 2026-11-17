/**
 * The adaptive review of the whole grade 5 programme: one or two parts from
 * each review of this chapter (numbers, operations, ratios and percentages,
 * geometry, measures, uniform motion, statistics and chance), so the learner
 * sees at once which strand still needs work. Pure and DOM-free.
 */
import { circleAreaSkill, trapezoidSkill, volumeSkill } from './geometry-skills.js';
import { massSkill } from './measure-skills.js';
import { distanceSkill } from './motion-skills.js';
import { compareDecimalSkill } from './number-skills.js';
import { expressionSkill, fractionAddSkill } from './operation-skills.js';
import { sumRatioSkill, valueOfPercentSkill } from './ratio-skills.js';
import { chanceSkill, pieSkill } from './stats-skills.js';

/** @type {import('./visual.js').ReviewSkill[]} */
export const GENERAL_SKILLS = [
  compareDecimalSkill,
  fractionAddSkill,
  expressionSkill,
  sumRatioSkill,
  valueOfPercentSkill,
  trapezoidSkill,
  circleAreaSkill,
  volumeSkill,
  massSkill,
  distanceSkill,
  pieSkill,
  chanceSkill,
];
