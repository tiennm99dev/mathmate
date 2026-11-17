/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thể tích hình hộp chữ nhật bằng chiều dài nhân với chiều rộng rồi nhân với chiều cao (cùng một đơn vị đo): V = a × b × c.',
  intro:
    'Rô-bốt xếp các hình lập phương 1 cm³ vào một cái hộp cho đầy. Xếp được bao nhiêu hình thì thể tích hộp là bấy nhiêu xăng-ti-mét khối. Có cách nào tính nhanh không?',
  objectives: ['Biết cách tính thể tích hình hộp chữ nhật.', 'Vận dụng để giải bài toán thực tế.'],
  sections: [
    {
      heading: 'Xếp hình lập phương 1 cm³ vào hộp',
      blocks: [
        {
          type: 'p',
          text: 'Hình hộp chữ nhật dài 20 cm, rộng 16 cm, cao 10 cm. Em xếp các hình lập phương 1 cm³ vào cho đầy hộp.',
        },
        {
          type: 'p',
          text: 'Mỗi lớp có 20 × 16 = 320 hình lập phương 1 cm³.',
        },
        {
          type: 'p',
          text: 'Hộp cao 10 cm, nên xếp được 10 lớp. Số hình lập phương là 320 × 10 = 3 200 (hình).',
        },
        {
          type: 'p',
          text: 'Vậy thể tích hình hộp chữ nhật là 20 × 16 × 10 = 3 200 (cm³).',
        },
      ],
    },
    {
      heading: 'Cách tính thể tích hình hộp chữ nhật',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính thể tích hình hộp chữ nhật, ta lấy chiều dài nhân với chiều rộng rồi nhân với chiều cao (cùng một đơn vị đo).',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hình hộp chữ nhật có chiều dài a, chiều rộng b, chiều cao c thì thể tích V là: V = a × b × c.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Các kích thước khác đơn vị đo thì em đổi về cùng một đơn vị trước khi tính.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp đầy hộp',
    instruction:
      'Em chỉnh chiều dài, chiều rộng, chiều cao của hộp. Xếp từng hàng, từng lớp hình lập phương 1 cm³ cho đầy hộp rồi đếm.',
  },
  examples: [
    {
      problem:
        'Tính thể tích hình hộp chữ nhật có chiều dài 5 cm, chiều rộng 4 cm, chiều cao 9 cm.',
      steps: ['Thể tích hình hộp chữ nhật là: 5 × 4 × 9 = 180 (cm³).'],
      answer: '180 cm³.',
    },
    {
      problem:
        'Một bể cá dạng hình hộp chữ nhật dài 1 m, rộng 50 cm, cao 60 cm. Tính thể tích của bể theo đề-xi-mét khối.',
      steps: [
        'Đổi về đề-xi-mét: 1 m = 10 dm; 50 cm = 5 dm; 60 cm = 6 dm.',
        'Thể tích của bể là: 10 × 5 × 6 = 300 (dm³).',
      ],
      answer: 'Thể tích của bể là 300 dm³.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt:
        'Một hình hộp chữ nhật xếp đầy 2 lớp hình lập phương 1 cm³, mỗi lớp như nhau. Em đếm xem hộp có bao nhiêu hình lập phương 1 cm³.',
      picture: 'cube',
      answer: 12,
      groups: 2,
      choices: [6, 10, 12],
      hints: ['Em đếm số hình lập phương ở một lớp.', 'Có 2 lớp như nhau.'],
      solution: 'Mỗi lớp có 6 hình lập phương, 2 lớp có 6 × 2 = 12 hình. Thể tích hộp là 12 cm³.',
    },
    {
      type: 'choice',
      prompt: 'Muốn tính thể tích hình hộp chữ nhật, ta làm thế nào?',
      options: [
        'Lấy chiều dài nhân với chiều rộng rồi nhân với chiều cao',
        'Lấy chiều dài cộng chiều rộng rồi nhân với chiều cao',
        'Lấy chu vi mặt đáy nhân với chiều cao',
      ],
      answer: 0,
      hints: ['Một lớp có chiều dài × chiều rộng hình lập phương.', 'Số lớp bằng chiều cao.'],
      solution:
        'Mỗi lớp có (chiều dài × chiều rộng) hình lập phương 1 đơn vị, có (chiều cao) lớp. Vậy thể tích = chiều dài × chiều rộng × chiều cao.',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích hình hộp chữ nhật có chiều dài 8 cm, chiều rộng 5 cm, chiều cao 3 cm.',
      answer: 120,
      unit: 'cm³',
      hints: ['V = chiều dài × chiều rộng × chiều cao.'],
      solution: 'Thể tích hình hộp chữ nhật là: 8 × 5 × 3 = 120 (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Tính thể tích hình hộp chữ nhật có chiều dài 1,5 m, chiều rộng 1,1 m, chiều cao 0,5 m.',
      answer: 0.825,
      unit: 'm³',
      hints: ['Tính 1,5 × 1,1 trước.', '1,5 × 1,1 = 1,65. Nhân tiếp với 0,5.'],
      solution: 'Thể tích hình hộp chữ nhật là: 1,5 × 1,1 × 0,5 = 0,825 (m³).',
    },
    {
      type: 'number',
      prompt:
        'Hình hộp chữ nhật có chiều dài 0,9 m, chiều rộng 8 dm, chiều cao 6 dm. Tính thể tích theo đề-xi-mét khối.',
      answer: 432,
      unit: 'dm³',
      hints: ['Đổi 0,9 m ra đề-xi-mét.', '0,9 m = 9 dm.'],
      solution: '0,9 m = 9 dm. Thể tích hình hộp chữ nhật là: 9 × 8 × 6 = 432 (dm³).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình hộp chữ nhật (dài, rộng, cao) với thể tích của nó.',
      left: ['2 cm, 3 cm, 4 cm', '5 cm, 2 cm, 1 cm', '3 cm, 3 cm, 3 cm'],
      right: ['24 cm³', '10 cm³', '27 cm³', '18 cm³'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Nhân ba kích thước với nhau.'],
      solution: '2 × 3 × 4 = 24 (cm³); 5 × 2 × 1 = 10 (cm³); 3 × 3 × 3 = 27 (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Một hình hộp chữ nhật có thể tích 60 cm³, chiều dài 5 cm, chiều rộng 3 cm. Chiều cao của hình hộp là bao nhiêu xăng-ti-mét?',
      answer: 4,
      unit: 'cm',
      hints: [
        'Một lớp có 5 × 3 = 15 hình lập phương 1 cm³.',
        'Có bao nhiêu lớp 15 khối để được 60 khối?',
      ],
      solution: 'Một lớp có 5 × 3 = 15 (cm³). Chiều cao là: 60 : 15 = 4 (cm).',
    },
    {
      type: 'choice',
      prompt:
        'Hộp A dài 4 cm, rộng 3 cm, cao 2 cm. Hộp B dài 6 cm, rộng 2 cm, cao 2 cm. So sánh thể tích hai hộp.',
      options: ['Thể tích hai hộp bằng nhau', 'Thể tích hộp A lớn hơn', 'Thể tích hộp B lớn hơn'],
      answer: 0,
      hints: ['Tính thể tích từng hộp rồi so sánh.'],
      solution:
        'Hộp A: 4 × 3 × 2 = 24 (cm³). Hộp B: 6 × 2 × 2 = 24 (cm³). Thể tích hai hộp bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Một bể nước dạng hình hộp chữ nhật dài 2 m, rộng 1,5 m, cao 1 m. Bể chứa được nhiều nhất bao nhiêu mét khối nước?',
      answer: 3,
      unit: 'm³',
      hints: ['Lượng nước nhiều nhất bằng thể tích của bể.'],
      solution: 'Thể tích của bể là: 2 × 1,5 × 1 = 3 (m³). Bể chứa được nhiều nhất 3 m³ nước.',
    },
  ],
  takeaways: [
    'Thể tích hình hộp chữ nhật = chiều dài × chiều rộng × chiều cao.',
    'V = a × b × c, các kích thước cùng một đơn vị đo.',
    'Đo bằng cm thì thể tích là cm³, đo bằng dm thì là dm³, đo bằng m thì là m³.',
  ],
};
