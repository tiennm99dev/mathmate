/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số trung bình cộng: muốn tìm số trung bình cộng của nhiều số, ta tính tổng của các số đó rồi chia tổng đó cho số các số hạng; đó là số có được khi san đều.',
  intro:
    'Can thứ nhất có 6 l nước, can thứ hai có 4 l nước. Nếu rót đều số nước ấy vào hai can thì mỗi can có bao nhiêu lít? Em cùng san đều nhé!',
  objectives: [
    'Hiểu số trung bình cộng là số có được khi san đều.',
    'Tìm số trung bình cộng của hai, ba, bốn hay nhiều số.',
    'Giải bài toán về số trung bình cộng.',
  ],
  sections: [
    {
      heading: 'San đều',
      blocks: [
        {
          type: 'p',
          text: 'Can thứ nhất có 6 l, can thứ hai có 4 l. Cả hai can có 6 + 4 = 10 (l).',
        },
        { type: 'p', text: 'Rót đều vào hai can: mỗi can có 10 : 2 = 5 (l).' },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Ta gọi 5 là số trung bình cộng của 6 và 4. Ta viết: (6 + 4) : 2 = 5.',
        },
      ],
    },
    {
      heading: 'Cách tìm số trung bình cộng',
      blocks: [
        { type: 'p', text: 'Ba lớp có 25 học sinh, 27 học sinh và 32 học sinh.' },
        { type: 'p', text: 'Tổng số học sinh: 25 + 27 + 32 = 84. Có 3 số hạng.' },
        { type: 'p', text: 'Trung bình mỗi lớp có: 84 : 3 = 28 (học sinh).' },
        { type: 'p', text: 'Số trung bình cộng của 25, 27 và 32 là 28.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tìm số trung bình cộng của nhiều số, ta tính tổng của các số đó, rồi chia tổng đó cho số các số hạng.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Chia cho số các số hạng: ba số thì chia cho 3, bốn số thì chia cho 4.',
        },
      ],
    },
  ],
  explore: {
    title: 'San đều các cột khối',
    instruction:
      'Chạm một cột để lấy khối, rồi chạm cột khác để đặt khối vào. San cho các cột cao bằng nhau. Chiều cao mỗi cột lúc đó là số trung bình cộng.',
  },
  examples: [
    {
      problem: 'Tìm số trung bình cộng của 36, 42 và 57.',
      steps: ['Tổng: 36 + 42 + 57 = 135.', 'Có 3 số hạng: 135 : 3 = 45.'],
      answer: 'Số trung bình cộng là 45.',
    },
    {
      problem:
        'Bốn em Mai, Hoa, Hưng, Thịnh cân nặng lần lượt 36 kg, 38 kg, 40 kg, 34 kg. Hỏi trung bình mỗi em cân nặng bao nhiêu ki-lô-gam?',
      steps: [
        'Cả bốn em cân nặng: 36 + 38 + 40 + 34 = 148 (kg).',
        'Trung bình mỗi em cân nặng: 148 : 4 = 37 (kg).',
      ],
      answer: 'Trung bình mỗi em cân nặng 37 kg.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm số trung bình cộng của 42 và 52.',
      answer: 47,
      hints: ['Em tính tổng 42 + 52 rồi chia cho 2.'],
      solution: '(42 + 52) : 2 = 94 : 2 = 47.',
    },
    {
      type: 'number',
      prompt: 'Tìm số trung bình cộng của 34, 43, 52 và 39.',
      answer: 42,
      hints: ['Có bốn số, nên chia tổng cho 4.'],
      solution: '(34 + 43 + 52 + 39) : 4 = 168 : 4 = 42.',
    },
    {
      type: 'number',
      prompt: 'Tìm số trung bình cộng của 20, 35, 37, 65 và 73.',
      answer: 46,
      hints: ['Có năm số, nên chia tổng cho 5.'],
      solution: '(20 + 35 + 37 + 65 + 73) : 5 = 230 : 5 = 46.',
    },
    {
      type: 'choice',
      prompt: 'Muốn tìm số trung bình cộng của ba số, em làm thế nào?',
      options: [
        'Tính tổng ba số rồi chia cho 3',
        'Tính tổng ba số rồi chia cho 2',
        'Lấy số lớn nhất trừ số bé nhất',
        'Nhân ba số rồi chia cho 3',
      ],
      answer: 0,
      hints: ['Chia tổng cho số các số hạng.'],
      solution: 'Tính tổng của ba số rồi chia tổng đó cho 3, vì có 3 số hạng.',
    },
    {
      type: 'choice',
      prompt: 'Ba bạn có 4 cái kẹo, 7 cái kẹo và 10 cái kẹo. Nếu chia đều thì mỗi bạn có mấy cái?',
      options: ['7', '21', '10', '6'],
      answer: 0,
      hints: ['Tổng số kẹo là 4 + 7 + 10.'],
      solution: '(4 + 7 + 10) : 3 = 21 : 3 = 7. Mỗi bạn có 7 cái kẹo.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô giờ đầu đi được 40 km, giờ thứ hai đi được 48 km, giờ thứ ba đi được 53 km. Hỏi trung bình mỗi giờ ô tô đi được bao nhiêu ki-lô-mét?',
      answer: 47,
      unit: 'km',
      hints: ['Tính quãng đường ô tô đi trong ba giờ.', 'Chia cho 3 giờ.'],
      solution: '(40 + 48 + 53) : 3 = 141 : 3 = 47 (km).',
    },
    {
      type: 'number',
      prompt: 'Số trung bình cộng của hai số là 15. Một số là 12. Tìm số kia.',
      answer: 18,
      hints: ['Tổng hai số bằng số trung bình cộng nhân với 2.'],
      solution: 'Tổng hai số: 15 × 2 = 30. Số kia: 30 − 12 = 18.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi nhóm số với số trung bình cộng của chúng.',
      left: ['6 và 4', '25, 27 và 32', '10, 20, 30 và 40', '9 và 15'],
      right: ['5', '28', '25', '12', '10'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Tính tổng rồi chia cho số các số hạng.'],
      solution:
        '(6 + 4) : 2 = 5. (25 + 27 + 32) : 3 = 28. (10 + 20 + 30 + 40) : 4 = 25. (9 + 15) : 2 = 12.',
    },
  ],
  takeaways: [
    'Số trung bình cộng là số có được khi san đều.',
    'Muốn tìm số trung bình cộng của nhiều số, ta tính tổng các số đó rồi chia cho số các số hạng.',
  ],
};
