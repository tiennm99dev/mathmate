/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tìm phân số của một số: lấy số đó chia cho mẫu số rồi nhân với tử số, tức là lấy số đó nhân với phân số.',
  intro:
    'Lớp 4A có 35 học sinh. Số học sinh nữ bằng $\\dfrac{4}{7}$ số học sinh cả lớp. Lớp 4A có bao nhiêu học sinh nữ? Em cùng tìm hiểu nhé!',
  objectives: ['Tìm được phân số của một số.', 'Vận dụng để giải bài toán thực tế.'],
  sections: [
    {
      heading: 'Chia đều rồi lấy số phần',
      blocks: [
        {
          type: 'p',
          text: 'Mẫu số 7: chia 35 học sinh thành 7 phần bằng nhau. Mỗi phần có 35 : 7 = 5 học sinh.',
        },
        {
          type: 'p',
          text: 'Tử số 4: lấy 4 phần. 4 phần có 5 × 4 = 20 học sinh.',
        },
        {
          type: 'p',
          text: 'Hai bước đó chính là $35 \\times \\dfrac{4}{7} = \\dfrac{35 \\times 4}{7} = 20$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tìm phân số của một số, ta lấy số đó nhân với phân số.',
        },
        {
          type: 'p',
          text: 'Lớp 4A có 20 học sinh nữ.',
        },
      ],
    },
    {
      heading: 'Phân số lớn hơn 1',
      blocks: [
        {
          type: 'p',
          text: 'Cốc thứ nhất có 150 ml nước. Cốc thứ hai có lượng nước bằng $\\dfrac{8}{5}$ cốc thứ nhất.',
        },
        {
          type: 'tex',
          tex: '150 \\times \\dfrac{8}{5} = \\dfrac{150 \\times 8}{5} = 240',
        },
        {
          type: 'p',
          text: 'Cốc thứ hai có 240 ml nước, nhiều hơn cốc thứ nhất, vì $\\dfrac{8}{5}$ lớn hơn 1.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Em có thể chia trước cho dễ tính: 150 : 5 = 30, rồi 30 × 8 = 240.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chia nhóm rồi tô màu',
    instruction:
      'Em bấm + hoặc − để chia đồ vật thành số nhóm bằng mẫu số. Rồi em chạm vào số nhóm bằng tử số để tô màu.',
  },
  examples: [
    {
      problem:
        'Một nhà máy sản xuất được 4 500 đôi giày trong tháng Một. Số đôi giày tháng Hai bằng $\\dfrac{3}{5}$ số đôi giày tháng Một. Tháng Hai nhà máy sản xuất được bao nhiêu đôi giày?',
      steps: [
        'Ta tìm $\\dfrac{3}{5}$ của 4 500.',
        '4 500 : 5 = 900; 900 × 3 = 2 700.',
        'Hay $4\\,500 \\times \\dfrac{3}{5} = 2\\,700$.',
      ],
      answer: 'Tháng Hai nhà máy sản xuất được 2 700 đôi giày.',
    },
    {
      problem:
        'Một con tàu hoạt động 50 năm. Tàu đi trên Đại Tây Dương $\\dfrac{1}{2}$ thời gian, trên Thái Bình Dương $\\dfrac{2}{5}$ thời gian, thời gian còn lại đi trên Ấn Độ Dương. Tàu đi trên Ấn Độ Dương bao nhiêu năm?',
      steps: [
        'Trên Đại Tây Dương: $50 \\times \\dfrac{1}{2} = 25$ (năm).',
        'Trên Thái Bình Dương: $50 \\times \\dfrac{2}{5} = 20$ (năm).',
        'Trên Ấn Độ Dương: 50 − 25 − 20 = 5 (năm).',
      ],
      answer: 'Tàu đi trên Ấn Độ Dương 5 năm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Trên dây điện có 20 con chim. Số chim sẻ bằng $\\dfrac{3}{5}$ số chim trên dây. Có bao nhiêu con chim sẻ?',
      answer: 12,
      hints: ['Chia 20 con chim thành 5 phần bằng nhau.', 'Mỗi phần có 4 con. Lấy 3 phần.'],
      solution:
        '$20 \\times \\dfrac{3}{5} = 12$ (con), vì 20 : 5 = 4 và 4 × 3 = 12. Có 12 con chim sẻ.',
    },
    {
      type: 'choice',
      prompt: 'Muốn tìm $\\dfrac{3}{5}$ của 15, em làm thế nào?',
      options: [
        'Lấy 15 : 5 rồi nhân với 3',
        'Lấy 15 : 3 rồi nhân với 5',
        'Lấy 15 + 3 + 5',
        'Lấy 15 × 5 rồi chia cho 3',
      ],
      answer: 0,
      hints: ['Mẫu số cho biết chia thành mấy phần. Tử số cho biết lấy mấy phần.'],
      solution:
        'Chia 15 thành 5 phần: 15 : 5 = 3. Lấy 3 phần: 3 × 3 = 9. Đó cũng là $15 \\times \\dfrac{3}{5} = 9$.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi câu với kết quả của nó.',
      left: ['$\\dfrac{1}{2}$ của 10', '$\\dfrac{3}{4}$ của 8', '$\\dfrac{2}{5}$ của 25'],
      right: ['5', '6', '10', '4'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Chia cho mẫu số rồi nhân với tử số.', '8 : 4 = 2, 25 : 5 = 5.'],
      solution: '10 : 2 × 1 = 5; 8 : 4 × 3 = 6; 25 : 5 × 2 = 10.',
    },
    {
      type: 'number',
      prompt:
        'Cốc thứ nhất có 150 ml nước. Cốc thứ hai có lượng nước bằng $\\dfrac{8}{5}$ cốc thứ nhất. Cốc thứ hai có bao nhiêu mi-li-lít nước?',
      answer: 240,
      unit: 'ml',
      hints: ['Tìm $\\dfrac{8}{5}$ của 150.', '150 : 5 = 30.'],
      solution: '$150 \\times \\dfrac{8}{5} = 240$ (ml), vì 150 : 5 = 30 và 30 × 8 = 240.',
    },
    {
      type: 'choice',
      prompt:
        'Có 16 quả hồng trên cây. Chim ăn $\\dfrac{1}{4}$ số quả hồng. Trên cây còn lại bao nhiêu quả hồng?',
      options: ['12 quả', '4 quả', '15 quả', '64 quả'],
      answer: 0,
      hints: [
        'Trước hết tìm số quả chim ăn: $\\dfrac{1}{4}$ của 16.',
        'Lấy 16 trừ đi số quả chim ăn.',
      ],
      solution: 'Chim ăn $16 \\times \\dfrac{1}{4} = 4$ (quả). Còn lại 16 − 4 = 12 (quả hồng).',
    },
    {
      type: 'number',
      prompt:
        'Một con báo chạy được 198 m trong $\\dfrac{1}{10}$ phút. Biết 1 phút = 60 giây. $\\dfrac{1}{10}$ phút là bao nhiêu giây?',
      answer: 6,
      unit: 'giây',
      hints: ['Tìm $\\dfrac{1}{10}$ của 60 giây.'],
      solution: '$60 \\times \\dfrac{1}{10} = 6$ (giây).',
    },
    {
      type: 'number',
      prompt:
        'Quãng đường dài 45 km. Một người đã đi được $\\dfrac{2}{3}$ quãng đường. Người đó còn phải đi bao nhiêu ki-lô-mét nữa?',
      answer: 15,
      unit: 'km',
      hints: ['Tìm $\\dfrac{2}{3}$ của 45 km.', 'Lấy 45 trừ đi quãng đường đã đi.'],
      solution: 'Đã đi $45 \\times \\dfrac{2}{3} = 30$ (km). Còn phải đi 45 − 30 = 15 (km).',
    },
    {
      type: 'number',
      prompt:
        'Một con tàu hoạt động 50 năm, đi trên Thái Bình Dương $\\dfrac{2}{5}$ thời gian đó. Tàu đi trên Thái Bình Dương bao nhiêu năm?',
      answer: 20,
      unit: 'năm',
      hints: ['50 : 5 = 10.', 'Lấy 2 phần.'],
      solution: '$50 \\times \\dfrac{2}{5} = 20$ (năm).',
    },
  ],
  takeaways: [
    'Tìm phân số của một số: chia số đó cho mẫu số, rồi nhân với tử số.',
    'Đó cũng là lấy số đó nhân với phân số.',
  ],
};
