/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Làm quen với máy tính cầm tay: các phím bật, tắt, xoá, phím số và phím phép tính; dùng máy để cộng, trừ, nhân, chia, tìm tỉ số phần trăm của hai số và tìm giá trị phần trăm của một số.',
  intro:
    'Máy tính cầm tay giúp em tính nhanh với những số lớn. Em cùng Rô-bốt tìm hiểu các phím và tập bấm máy để tính, kể cả tính phần trăm nhé!',
  objectives: [
    'Biết các phím cơ bản của máy tính cầm tay.',
    'Dùng máy tính cầm tay để cộng, trừ, nhân, chia số tự nhiên và số thập phân.',
    'Dùng máy tính cầm tay để tìm tỉ số phần trăm của hai số và tìm giá trị phần trăm của một số.',
  ],
  sections: [
    {
      heading: 'Làm quen với máy tính cầm tay',
      blocks: [
        {
          type: 'p',
          text: 'Máy tính cầm tay có màn hình và các phím. Màn hình hiện số em bấm và kết quả.',
        },
        {
          type: 'table',
          head: ['Phím', 'Dùng để'],
          rows: [
            ['ON/C', 'Bật máy, xoá hết để tính phép mới'],
            ['OFF', 'Tắt máy'],
            ['CE', 'Xoá số vừa nhập bị sai'],
            ['0, 1, 2, …, 9', 'Nhập số'],
            ['. (dấu chấm)', 'Nhập dấu phẩy của số thập phân'],
            ['+, −, ×, ÷', 'Cộng, trừ, nhân, chia'],
            ['=', 'Hiện kết quả'],
            ['%', 'Tính phần trăm'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Máy tính dùng dấu chấm thay cho dấu phẩy. Màn hình hiện 8.5 thì em đọc và viết là 8,5.',
        },
      ],
    },
    {
      heading: 'Tính bằng máy tính cầm tay',
      blocks: [
        {
          type: 'p',
          text: 'Muốn tính, em bấm lần lượt số thứ nhất, phím phép tính, số thứ hai rồi phím =.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Em bấm', 'Màn hình hiện'],
          rows: [
            ['1 975 + 2 025', '1975 + 2025 =', '4000'],
            ['3 871 − 189', '3871 − 189 =', '3682'],
            ['475 × 81', '475 × 81 =', '38475'],
            ['51 : 6', '51 ÷ 6 =', '8.5'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cẩn thận',
          text: 'Rô-bốt bấm 5 + 2 × 3 = và màn hình hiện 21. Máy tính lần lượt từ trái sang phải. Nhưng 5 + 2 × 3 = 5 + 6 = 11, vì phải nhân trước, cộng sau.',
        },
      ],
    },
    {
      heading: 'Tính phần trăm bằng máy tính cầm tay',
      blocks: [
        {
          type: 'table',
          head: ['Em cần tìm', 'Em bấm', 'Màn hình hiện', 'Kết quả'],
          rows: [
            ['Tỉ số phần trăm của 16 và 80', '16 ÷ 80 %', '20', '20%'],
            ['Tỉ số phần trăm của 38 và 125', '38 ÷ 125 %', '30.4', '30,4%'],
            ['8% của 35', '35 × 8 %', '2.8', '2,8'],
            ['32% của 4', '4 × 32 %', '1.28', '1,28'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Tìm tỉ số phần trăm của a và b: bấm a ÷ b %. Tìm a% của B: bấm B × a %.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Với một số loại máy, em bấm thêm phím = sau phím % để hiện kết quả.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bấm máy tính cầm tay',
    instruction:
      'Ở chế độ "Bấm theo hướng dẫn", em bấm đúng phím có viền vàng, từng phím một, rồi đọc kết quả. Ở chế độ "Bấm tự do", em tự bấm các phép tính em muốn.',
  },
  examples: [
    {
      problem: 'Dùng máy tính cầm tay để tính 51 : 6.',
      steps: [
        'Bấm ON/C để bật máy.',
        'Bấm 5, 1, phím ÷, 6, phím =.',
        'Màn hình hiện 8.5, em viết là 8,5.',
      ],
      answer: '51 : 6 = 8,5.',
    },
    {
      problem:
        'Chú Năm gửi tiết kiệm 250 000 000 đồng với lãi suất 8% một năm. Dùng máy tính cầm tay để tính tiền lãi sau một năm.',
      steps: [
        'Tiền lãi là 8% của 250 000 000 đồng.',
        'Bấm 250000000 × 8 %.',
        'Màn hình hiện 20000000.',
      ],
      answer: 'Tiền lãi sau một năm là 20 000 000 đồng.',
    },
    {
      problem: 'Dùng máy tính cầm tay để tìm tỉ số phần trăm của 16 và 80.',
      steps: ['Bấm 16 ÷ 80 %.', 'Màn hình hiện 20.'],
      answer: 'Tỉ số phần trăm của 16 và 80 là 20%.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Để tính 475 × 81 bằng máy tính cầm tay, em bấm:',
      options: ['475 × 81 =', '475 + 81 =', '475 ÷ 81 =', '81 − 475 ='],
      answer: 0,
      hints: ['Phép tính là phép nhân. Em tìm cách bấm có phím ×.'],
      solution: 'Bấm 475 × 81 =, màn hình hiện 38475. Vậy 475 × 81 = 38 475.',
    },
    {
      type: 'number',
      prompt: 'Em bấm 3871 − 189 =. Màn hình hiện số nào?',
      answer: 3682,
      hints: ['Em có thể tính 3 871 − 189 bằng cách đặt tính để kiểm tra.'],
      solution: '3 871 − 189 = 3 682. Màn hình hiện 3682.',
    },
    {
      type: 'choice',
      prompt: 'Màn hình máy tính hiện 30.4. Em viết kết quả là:',
      options: ['30,4', '304', '3,04', '30 004'],
      answer: 0,
      hints: ['Máy tính dùng dấu chấm thay cho dấu phẩy.'],
      solution: 'Dấu chấm trên màn hình là dấu phẩy. 30.4 viết là 30,4.',
    },
    {
      type: 'choice',
      prompt:
        'Rô-bốt bấm 5 + 2 × 3 = và màn hình hiện 21. Giá trị đúng của biểu thức 5 + 2 × 3 là bao nhiêu?',
      options: ['11', '21', '30', '13'],
      answer: 0,
      hints: ['Trong biểu thức có phép cộng và phép nhân, em làm phép nhân trước.'],
      solution:
        '5 + 2 × 3 = 5 + 6 = 11. Máy tính lần lượt từ trái sang phải nên ra (5 + 2) × 3 = 21.',
    },
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay, tìm 8% của 35.',
      answer: 2.8,
      hints: ['Bấm 35 × 8 %.'],
      solution: 'Bấm 35 × 8 %, màn hình hiện 2.8. Vậy 8% của 35 là 2,8.',
    },
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay, tìm 32% của 4.',
      answer: 1.28,
      hints: ['Bấm 4 × 32 %.'],
      solution: 'Bấm 4 × 32 %, màn hình hiện 1.28. Vậy 32% của 4 là 1,28.',
    },
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay, tìm tỉ số phần trăm của 38 và 125.',
      answer: 30.4,
      unit: '%',
      hints: ['Bấm 38 ÷ 125 %.'],
      solution: 'Bấm 38 ÷ 125 %, màn hình hiện 30.4. Tỉ số phần trăm là 30,4%.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các phím theo thứ tự em bấm để tìm tỉ số phần trăm của 16 và 80.',
      items: ['ON/C', '16', '÷', '80', '%'],
      answer: [0, 1, 2, 3, 4],
      hints: ['Bật máy trước. Bấm số thứ nhất, rồi phép chia, rồi số thứ hai.'],
      solution: 'Bấm ON/C, 16, ÷, 80, %. Màn hình hiện 20, tức là 20%.',
    },
    {
      type: 'number',
      prompt:
        'Cửa hàng hoàn lại 10% số tiền cho đơn hàng từ 1 000 000 đồng trở lên. Mẹ mua hai món giá 850 000 đồng và 250 000 đồng. Mẹ được hoàn lại bao nhiêu tiền?',
      answer: 110000,
      unit: 'đồng',
      hints: [
        'Tính tổng tiền hai món, xem có từ 1 000 000 đồng trở lên không.',
        'Tìm 10% của tổng tiền: bấm tổng × 10 %.',
      ],
      solution:
        'Tổng tiền: 850 000 + 250 000 = 1 100 000 (đồng), từ 1 000 000 đồng trở lên. Tiền hoàn lại: 1 100 000 × 10 : 100 = 110 000 (đồng).',
    },
  ],
  takeaways: [
    'ON/C: bật máy, xoá hết; CE: xoá số vừa nhập; OFF: tắt máy.',
    'Dấu chấm trên máy tính là dấu phẩy: 8.5 là 8,5.',
    'Máy tính lần lượt từ trái sang phải, nên với biểu thức có cả cộng và nhân em phải bấm phép nhân trước.',
    'Tỉ số phần trăm của a và b: bấm a ÷ b %. Tìm a% của B: bấm B × a %.',
  ],
};
