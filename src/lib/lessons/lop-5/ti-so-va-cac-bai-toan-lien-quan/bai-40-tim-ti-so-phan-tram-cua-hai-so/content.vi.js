/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Muốn tìm tỉ số phần trăm của hai số, ta tìm thương của hai số đó, nhân thương với 100 rồi viết thêm kí hiệu % vào bên phải tích tìm được.',
  intro:
    'Trường em có 600 học sinh, trong đó có 315 học sinh nữ. Số học sinh nữ chiếm bao nhiêu phần trăm số học sinh cả trường? Em chia rồi nhân với 100 là biết.',
  objectives: [
    'Biết cách tìm tỉ số phần trăm của hai số.',
    'Viết được một số thập phân thành tỉ số phần trăm.',
    'Giải được bài toán thực tế về tìm tỉ số phần trăm.',
  ],
  sections: [
    {
      heading: 'Cách tìm tỉ số phần trăm của hai số',
      blocks: [
        {
          type: 'p',
          text: 'Tìm tỉ số phần trăm của số học sinh nữ (315) và số học sinh cả trường (600).',
        },
        {
          type: 'table',
          head: ['Bước', 'Làm'],
          rows: [
            ['Tìm thương', '315 : 600 = 0,525'],
            ['Nhân thương với 100', '0,525 × 100 = 52,5'],
            ['Viết thêm kí hiệu %', '52,5%'],
          ],
        },
        {
          type: 'p',
          text: 'Ta viết gọn: 315 : 600 = 0,525 = 52,5%.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tìm tỉ số phần trăm của hai số, ta làm như sau: tìm thương của hai số đó; nhân thương với 100 và viết thêm kí hiệu % vào bên phải tích tìm được.',
        },
      ],
    },
    {
      heading: 'Viết số thập phân thành tỉ số phần trăm',
      blocks: [
        {
          type: 'p',
          text: 'Nhân số thập phân với 100 rồi viết thêm kí hiệu %.',
        },
        {
          type: 'table',
          head: ['Số thập phân', 'Tỉ số phần trăm'],
          rows: [
            ['0,57', '57%'],
            ['0,3', '30%'],
            ['0,234', '23,4%'],
            ['1,35', '135%'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Đừng quên nhân với 100. Viết 0,57 = 0,57% là sai, phải là 0,57 = 57%.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy tính phần trăm',
    instruction:
      'Chọn số thứ hai (cả) và kéo thanh trượt để đổi số thứ nhất (phần). Thanh dài nhất là 100%; xem thanh màu hồng chiếm bao nhiêu phần trăm. Ở chế độ "Đố em", chọn tỉ số phần trăm đúng.',
  },
  examples: [
    {
      problem:
        'Một trường có 600 học sinh, trong đó có 315 học sinh nữ. Tìm tỉ số phần trăm của số học sinh nữ và số học sinh cả trường.',
      steps: [
        'Tìm thương: 315 : 600 = 0,525.',
        'Nhân với 100: 0,525 × 100 = 52,5. Viết thêm kí hiệu %: 52,5%.',
      ],
      answer: 'Tỉ số phần trăm là 52,5%.',
    },
    {
      problem:
        'Trong 80 kg nước biển có 2,8 kg muối. Tìm tỉ số phần trăm của lượng muối và lượng nước biển.',
      steps: ['Tìm thương: 2,8 : 80 = 0,035.', '0,035 = 3,5%.'],
      answer: 'Lượng muối chiếm 3,5% lượng nước biển.',
    },
    {
      problem:
        'Lớp 5A có 25 học sinh, trong đó có 13 học sinh nữ. Số học sinh nữ chiếm bao nhiêu phần trăm số học sinh cả lớp?',
      steps: ['Tìm thương: 13 : 25 = 0,52.', '0,52 = 52%.'],
      answer: 'Số học sinh nữ chiếm 52% số học sinh cả lớp.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm tỉ số phần trăm của 19 và 25.',
      answer: 76,
      unit: '%',
      hints: ['Tính 19 : 25 trước.', 'Nhân thương với 100.'],
      solution: '19 : 25 = 0,76 = 76%.',
    },
    {
      type: 'number',
      prompt: 'Tìm tỉ số phần trăm của 45 và 60.',
      answer: 75,
      unit: '%',
      hints: ['Tính 45 : 60.'],
      solution: '45 : 60 = 0,75 = 75%.',
    },
    {
      type: 'number',
      prompt: 'Tìm tỉ số phần trăm của 9 và 40.',
      answer: 22.5,
      unit: '%',
      hints: ['9 : 40 = 0,225.'],
      solution: '9 : 40 = 0,225 = 22,5%.',
    },
    {
      type: 'choice',
      prompt: 'Viết 0,37 thành tỉ số phần trăm.',
      options: ['37%', '0,37%', '3,7%', '370%'],
      answer: 0,
      hints: ['Nhân 0,37 với 100 rồi viết kí hiệu %.'],
      solution: '0,37 × 100 = 37. Vậy 0,37 = 37%.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số thập phân với tỉ số phần trăm bằng nó.',
      left: ['0,5', '0,08', '1,2', '0,125'],
      right: ['50%', '8%', '120%', '12,5%', '80%'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Nhân mỗi số với 100: dời dấu phẩy sang phải hai chữ số.'],
      solution: '0,5 = 50%; 0,08 = 8%; 1,2 = 120%; 0,125 = 12,5%.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 5B có 32 học sinh, trong đó 24 học sinh thích bóng đá. Số học sinh thích bóng đá chiếm bao nhiêu phần trăm số học sinh cả lớp?',
      answer: 75,
      unit: '%',
      hints: ['Tính 24 : 32.'],
      solution: '24 : 32 = 0,75 = 75%.',
    },
    {
      type: 'number',
      prompt:
        'Theo kế hoạch, một xã phải trồng 20 ha ngô. Đến nay xã đã trồng được 18 ha. Xã đã thực hiện được bao nhiêu phần trăm kế hoạch?',
      answer: 90,
      unit: '%',
      hints: ['Tỉ số phần trăm của 18 và 20.'],
      solution: '18 : 20 = 0,9 = 90%.',
    },
    {
      type: 'choice',
      prompt: 'Tỉ số phần trăm của 3 và 4 là:',
      options: ['75%', '0,75%', '7,5%', '750%'],
      answer: 0,
      hints: ['3 : 4 = 0,75. Nhân với 100.'],
      solution: '3 : 4 = 0,75 = 75%.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng mua vào một chiếc quạt giá 40 000 đồng và bán ra giá 50 000 đồng. Số tiền lãi bằng bao nhiêu phần trăm giá mua vào?',
      answer: 25,
      unit: '%',
      hints: ['Tiền lãi là 50 000 − 40 000.', 'Tìm tỉ số phần trăm của tiền lãi và giá mua vào.'],
      solution: 'Tiền lãi: 50 000 − 40 000 = 10 000 (đồng). 10 000 : 40 000 = 0,25 = 25%.',
    },
  ],
  takeaways: [
    'Tìm tỉ số phần trăm của hai số: chia, nhân thương với 100, viết thêm kí hiệu %.',
    'Viết gọn: 315 : 600 = 0,525 = 52,5%.',
    'Số thập phân thành tỉ số phần trăm: 0,35 = 35%.',
  ],
};
