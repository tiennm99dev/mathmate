/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary: 'Thể tích hình lập phương bằng cạnh nhân với cạnh rồi nhân với cạnh: V = a × a × a.',
  intro:
    'Hình lập phương là hình hộp chữ nhật có chiều dài, chiều rộng, chiều cao bằng nhau. Vậy tính thể tích hình lập phương thế nào? Cùng xếp hình để tìm hiểu nhé!',
  objectives: ['Biết cách tính thể tích hình lập phương.', 'Vận dụng để giải bài toán thực tế.'],
  sections: [
    {
      heading: 'Xếp hình lập phương cạnh 3 cm',
      blocks: [
        {
          type: 'p',
          text: 'Hình lập phương cạnh 3 cm xếp được từ các hình lập phương 1 cm³.',
        },
        {
          type: 'p',
          text: 'Mỗi lớp có 3 × 3 = 9 hình lập phương 1 cm³. Có 3 lớp.',
        },
        {
          type: 'p',
          text: 'Số hình lập phương 1 cm³ là 9 × 3 = 27 (hình). Vậy thể tích là 3 × 3 × 3 = 27 (cm³).',
        },
      ],
    },
    {
      heading: 'Cách tính thể tích hình lập phương',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính thể tích hình lập phương, ta lấy cạnh nhân với cạnh rồi nhân với cạnh.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hình lập phương có cạnh a thì thể tích V là: V = a × a × a.',
        },
        {
          type: 'table',
          head: ['Cạnh', 'Thể tích'],
          rows: [
            ['1 cm', '1 × 1 × 1 = 1 (cm³)'],
            ['2 cm', '2 × 2 × 2 = 8 (cm³)'],
            ['4 cm', '4 × 4 × 4 = 64 (cm³)'],
            ['10 cm', '10 × 10 × 10 = 1 000 (cm³) = 1 dm³'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Cạnh gấp lên 2 lần thì thể tích gấp lên 2 × 2 × 2 = 8 lần.',
        },
      ],
    },
  ],
  explore: {
    title: 'Phóng to hình lập phương',
    instruction:
      'Em kéo thanh trượt để đổi cạnh hình lập phương. Xếp lại từng lớp hình lập phương 1 cm³ và xem thể tích thay đổi.',
  },
  examples: [
    {
      problem: 'Tính thể tích hình lập phương có cạnh 4 cm.',
      steps: ['Thể tích hình lập phương là: 4 × 4 × 4 = 64 (cm³).'],
      answer: '64 cm³.',
    },
    {
      problem:
        'Một hình hộp chữ nhật dài 8 cm, rộng 7 cm, cao 9 cm. Một hình lập phương có cạnh bằng trung bình cộng ba kích thước của hình hộp đó. Tính thể tích hình lập phương.',
      steps: [
        'Cạnh hình lập phương là: (8 + 7 + 9) : 3 = 8 (cm).',
        'Thể tích hình lập phương là: 8 × 8 × 8 = 512 (cm³).',
      ],
      answer: '512 cm³.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt:
        'Một hình lập phương cạnh 2 cm được xếp từ 2 lớp hình lập phương 1 cm³, hai lớp như nhau. Em đếm xem có bao nhiêu hình lập phương 1 cm³.',
      picture: 'cube',
      answer: 8,
      groups: 2,
      choices: [4, 6, 8],
      hints: ['Mỗi lớp có 2 × 2 hình.', 'Có 2 lớp.'],
      solution: 'Mỗi lớp có 2 × 2 = 4 hình, 2 lớp có 4 × 2 = 8 hình. Thể tích là 8 cm³.',
    },
    {
      type: 'choice',
      prompt: 'Muốn tính thể tích hình lập phương, ta làm thế nào?',
      options: [
        'Lấy cạnh nhân với cạnh rồi nhân với cạnh',
        'Lấy cạnh nhân với cạnh rồi nhân với 6',
        'Lấy cạnh nhân với 3',
      ],
      answer: 0,
      hints: ['Hình lập phương là hình hộp chữ nhật có ba kích thước bằng nhau.'],
      solution:
        'Thể tích hình hộp chữ nhật = dài × rộng × cao. Với hình lập phương, ba kích thước đều bằng cạnh, nên V = cạnh × cạnh × cạnh.',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích hình lập phương có cạnh 6 dm.',
      answer: 216,
      unit: 'dm³',
      hints: ['V = cạnh × cạnh × cạnh.', '6 × 6 = 36.'],
      solution: 'Thể tích hình lập phương là: 6 × 6 × 6 = 216 (dm³).',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích hình lập phương có cạnh 1,5 m.',
      answer: 3.375,
      unit: 'm³',
      hints: ['1,5 × 1,5 = 2,25.', 'Nhân tiếp 2,25 với 1,5.'],
      solution: 'Thể tích hình lập phương là: 1,5 × 1,5 × 1,5 = 3,375 (m³).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình lập phương với thể tích của nó.',
      left: ['Cạnh 1 cm', 'Cạnh 2 cm', 'Cạnh 5 cm'],
      right: ['1 cm³', '8 cm³', '125 cm³', '10 cm³'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Nhân cạnh với cạnh rồi nhân với cạnh.', 'Cạnh 5 cm: 5 × 5 × 5.'],
      solution: '1 × 1 × 1 = 1 (cm³); 2 × 2 × 2 = 8 (cm³); 5 × 5 × 5 = 125 (cm³).',
    },
    {
      type: 'choice',
      prompt: 'Cạnh của một hình lập phương gấp lên 2 lần thì thể tích gấp lên mấy lần?',
      options: ['8 lần', '2 lần', '4 lần'],
      answer: 0,
      hints: ['Thử với cạnh 1 cm và cạnh 2 cm.'],
      solution:
        'Cạnh 1 cm: thể tích 1 cm³. Cạnh 2 cm: thể tích 2 × 2 × 2 = 8 (cm³). Thể tích gấp lên 8 lần.',
    },
    {
      type: 'number',
      prompt:
        'Một khối gỗ hình lập phương cạnh 10 cm. Thể tích khối gỗ là bao nhiêu đề-xi-mét khối?',
      answer: 1,
      unit: 'dm³',
      hints: ['Tính thể tích theo xăng-ti-mét khối trước.', '1 000 cm³ = 1 dm³.'],
      solution: 'Thể tích khối gỗ: 10 × 10 × 10 = 1 000 (cm³) = 1 dm³.',
    },
    {
      type: 'number',
      prompt:
        'Một hình hộp chữ nhật dài 7 cm, rộng 5 cm, cao 6 cm. Một hình lập phương có cạnh bằng trung bình cộng ba kích thước của hình hộp. Tính thể tích hình lập phương.',
      answer: 216,
      unit: 'cm³',
      hints: ['Cạnh hình lập phương: (7 + 5 + 6) : 3.', 'Cạnh dài 6 cm.'],
      solution: 'Cạnh hình lập phương: (7 + 5 + 6) : 3 = 6 (cm). Thể tích: 6 × 6 × 6 = 216 (cm³).',
    },
    {
      type: 'choice',
      prompt:
        'Hình lập phương A cạnh 3 cm. Hình hộp chữ nhật B dài 4 cm, rộng 3 cm, cao 2 cm. Hình nào có thể tích lớn hơn?',
      options: ['Hình A', 'Hình B', 'Hai hình bằng nhau'],
      answer: 0,
      hints: ['Tính thể tích từng hình rồi so sánh.'],
      solution:
        'A: 3 × 3 × 3 = 27 (cm³). B: 4 × 3 × 2 = 24 (cm³). 27 > 24, nên hình A có thể tích lớn hơn.',
    },
  ],
  takeaways: [
    'Thể tích hình lập phương = cạnh × cạnh × cạnh.',
    'V = a × a × a.',
    'Cạnh gấp lên 2 lần thì thể tích gấp lên 8 lần.',
  ],
};
