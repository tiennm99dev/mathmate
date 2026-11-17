/**
 * Six-square drawings to sort into nets of a cube and shapes that do not
 * fold into one, each with why, in a child's words.
 */

/**
 * @typedef {object} CubeNet
 * @property {string} id
 * @property {string} name what the child calls it
 * @property {import('./fold.js').Cell[]} cells
 * @property {boolean} folds whether it folds into a cube
 * @property {string} why
 */

/** @type {CubeNet[]} */
export const CUBE_NETS = [
  {
    id: 'chu-thap',
    name: 'Hình A',
    cells: [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [1, 2],
    ],
    folds: true,
    why: 'Bốn hình vuông một hàng gấp thành bốn mặt xung quanh, hai hình vuông còn lại thành hai mặt đáy.',
  },
  {
    id: 'hai-hang-ba',
    name: 'Hình B',
    cells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    folds: false,
    why: 'Bốn hình vuông xếp thành một hình vuông to thì không gấp được: có hai mặt chồng lên nhau.',
  },
  {
    id: 'lech',
    name: 'Hình C',
    cells: [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
    ],
    folds: true,
    why: 'Bốn hình vuông một hàng làm thành bốn mặt xung quanh, một hình vuông ở trên và một ở dưới thành hai mặt đáy.',
  },
  {
    id: 'nam-mot-hang',
    name: 'Hình D',
    cells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [0, 1],
    ],
    folds: false,
    why: 'Năm hình vuông một hàng: gấp lại thì hình vuông thứ năm chồng lên hình vuông thứ nhất.',
  },
  {
    id: 'bac-thang',
    name: 'Hình E',
    cells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [3, 1],
      [4, 1],
    ],
    folds: true,
    why: 'Hai hàng, mỗi hàng ba hình vuông, xếp so le như bậc thang: gấp vừa khít sáu mặt.',
  },
  {
    id: 'cung-phia',
    name: 'Hình G',
    cells: [
      [0, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    folds: false,
    why: 'Hai hình vuông ở cùng một phía của hàng bốn hình vuông gấp vào cùng một mặt đáy, chồng lên nhau, còn mặt đáy kia bị hở.',
  },
];
