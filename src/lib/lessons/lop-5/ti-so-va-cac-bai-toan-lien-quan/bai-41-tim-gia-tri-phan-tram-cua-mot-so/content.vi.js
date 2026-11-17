/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Muốn tìm a% của một số, ta lấy số đó nhân với a rồi chia cho 100, hoặc lấy số đó chia cho 100 rồi nhân với a. Cách này giúp tính số tiền giảm giá, tiền lãi tiết kiệm.',
  intro:
    'Siêu thị giảm giá 15% cho mọi món hàng. Chiếc ba lô giá 250 000 đồng thì được giảm bao nhiêu tiền? Hôm nay em học cách tìm giá trị phần trăm của một số.',
  objectives: [
    'Biết cách tìm a% của một số.',
    'Giải được bài toán về giảm giá, lãi suất tiết kiệm và các bài toán thực tế khác.',
  ],
  sections: [
    {
      heading: 'Cách tìm a% của một số',
      blocks: [
        {
          type: 'p',
          text: 'Một trường có 800 học sinh. Số học sinh nữ chiếm 52,5% số học sinh cả trường. Trường có bao nhiêu học sinh nữ?',
        },
        {
          type: 'p',
          text: 'Coi số học sinh cả trường là 100%. Ta cần tìm 52,5% của 800.',
        },
        {
          type: 'table',
          head: ['Bước', 'Làm'],
          rows: [
            ['1% số học sinh cả trường', '800 : 100 = 8 (học sinh)'],
            ['52,5% số học sinh cả trường', '8 × 52,5 = 420 (học sinh)'],
          ],
        },
        {
          type: 'p',
          text: 'Ta viết gọn: 800 × 52,5 : 100 = 420. Trường có 420 học sinh nữ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tìm a% của số B, ta lấy B nhân với a rồi chia cho 100, hoặc lấy B chia cho 100 rồi nhân với a.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Kết quả có cùng đơn vị với số B. Ví dụ: 24,5% của 2 kg là 2 × 24,5 : 100 = 0,49 (kg).',
        },
      ],
    },
    {
      heading: 'Giảm giá và lãi suất tiết kiệm',
      blocks: [
        {
          type: 'p',
          text: 'Giảm giá 15% nghĩa là số tiền được giảm bằng 15% giá bán. Số tiền phải trả bằng giá bán trừ đi số tiền được giảm.',
        },
        {
          type: 'table',
          head: ['Ba lô giá 250 000 đồng, giảm 15%', 'Phép tính'],
          rows: [
            ['Số tiền được giảm', '250 000 × 15 : 100 = 37 500 (đồng)'],
            ['Số tiền phải trả', '250 000 − 37 500 = 212 500 (đồng)'],
          ],
        },
        {
          type: 'p',
          text: 'Lãi suất tiết kiệm 0,5% một tháng nghĩa là: cứ gửi 100 đồng thì sau một tháng được thêm 0,5 đồng tiền lãi.',
        },
        {
          type: 'table',
          head: ['Gửi 5 000 000 đồng, lãi suất 0,5% một tháng', 'Phép tính'],
          rows: [
            ['Tiền lãi sau một tháng', '5 000 000 × 0,5 : 100 = 25 000 (đồng)'],
            ['Cả tiền gửi và tiền lãi', '5 000 000 + 25 000 = 5 025 000 (đồng)'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Cửa hàng giảm giá',
    instruction:
      'Chọn một món hàng rồi kéo thanh để giảm giá. Xem số tiền được giảm (màu hồng) và số tiền phải trả (màu xanh). Ở chế độ "Đố em", chọn đáp án đúng.',
  },
  examples: [
    {
      problem:
        'Một trường có 800 học sinh, số học sinh nữ chiếm 52,5% số học sinh cả trường. Tính số học sinh nữ của trường.',
      steps: ['Ta tìm 52,5% của 800.', '800 × 52,5 : 100 = 420.'],
      answer: 'Trường có 420 học sinh nữ.',
    },
    {
      problem:
        'Lãi suất tiết kiệm là 0,5% một tháng. Cô Lan gửi 5 000 000 đồng. Sau một tháng, cô có cả tiền gửi và tiền lãi là bao nhiêu?',
      steps: [
        'Tiền lãi sau một tháng: 5 000 000 × 0,5 : 100 = 25 000 (đồng).',
        'Cả tiền gửi và tiền lãi: 5 000 000 + 25 000 = 5 025 000 (đồng).',
      ],
      answer: 'Sau một tháng, cô Lan có 5 025 000 đồng.',
    },
    {
      problem:
        'Trong thịt lợn nạc, chất đạm chiếm 19%. Tính số gam chất đạm có trong 300 g thịt lợn nạc.',
      steps: ['Ta tìm 19% của 300 g.', '300 × 19 : 100 = 57 (g).'],
      answer: '300 g thịt lợn nạc có 57 g chất đạm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm 70% của 120 m².',
      answer: 84,
      unit: 'm²',
      hints: ['Lấy 120 nhân với 70 rồi chia cho 100.'],
      solution: '120 × 70 : 100 = 84 (m²).',
    },
    {
      type: 'number',
      prompt: 'Tìm 24,5% của 2 kg.',
      answer: 0.49,
      unit: 'kg',
      hints: ['Lấy 2 nhân với 24,5 rồi chia cho 100.', '2 × 24,5 = 49.'],
      solution: '2 × 24,5 : 100 = 49 : 100 = 0,49 (kg).',
    },
    {
      type: 'number',
      prompt: 'Tìm 0,8% của 15 000 000 đồng.',
      answer: 120000,
      unit: 'đồng',
      hints: ['Chia 15 000 000 cho 100 trước, rồi nhân với 0,8.'],
      solution: '15 000 000 : 100 = 150 000; 150 000 × 0,8 = 120 000 (đồng).',
    },
    {
      type: 'number',
      prompt:
        'Nhân dịp 1/6, siêu thị giảm giá 15% mọi món hàng. Đồ chơi của Mi giá 120 000 đồng. Đồ chơi được giảm bao nhiêu tiền?',
      answer: 18000,
      unit: 'đồng',
      hints: ['Số tiền được giảm là 15% của 120 000 đồng.'],
      solution: '120 000 × 15 : 100 = 18 000 (đồng).',
    },
    {
      type: 'choice',
      prompt: 'Trong thịt bò, chất đạm chiếm 18%. 250 g thịt bò có bao nhiêu gam chất đạm?',
      options: ['45 g', '450 g', '4,5 g', '205 g'],
      answer: 0,
      hints: ['Tìm 18% của 250 g: nhân rồi chia cho 100.'],
      solution: '250 × 18 : 100 = 4 500 : 100 = 45 (g).',
    },
    {
      type: 'number',
      prompt:
        'Đội đồng diễn có 300 bạn: 40% mặc áo đỏ, 25% mặc áo vàng, còn lại mặc áo xanh. Có bao nhiêu bạn mặc áo xanh?',
      answer: 105,
      unit: 'bạn',
      hints: [
        'Số bạn mặc áo xanh chiếm bao nhiêu phần trăm? Lấy 100% trừ đi 40% và 25%.',
        'Tìm 35% của 300.',
      ],
      solution:
        'Số bạn mặc áo xanh chiếm: 100% − 40% − 25% = 35%. Số bạn mặc áo xanh: 300 × 35 : 100 = 105 (bạn).',
    },
    {
      type: 'number',
      prompt:
        'Một ngân hàng có lãi suất tiết kiệm 7,4% một năm. Bác An gửi 35 000 000 đồng. Sau một năm, bác có cả tiền gửi và tiền lãi là bao nhiêu đồng?',
      answer: 37590000,
      unit: 'đồng',
      hints: ['Tính tiền lãi trước: 7,4% của 35 000 000 đồng.', 'Cộng tiền lãi với tiền gửi.'],
      solution:
        'Tiền lãi: 35 000 000 × 7,4 : 100 = 2 590 000 (đồng). Cả tiền gửi và tiền lãi: 35 000 000 + 2 590 000 = 37 590 000 (đồng).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tìm phần trăm với kết quả của nó.',
      left: ['10% của 60', '50% của 36', '2% của 250', '11% của 200'],
      right: ['6', '18', '5', '22', '60'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Nhân số đó với số phần trăm rồi chia cho 100.',
        '50% là một nửa, 10% là một phần mười.',
      ],
      solution: '60 × 10 : 100 = 6; 36 × 50 : 100 = 18; 250 × 2 : 100 = 5; 200 × 11 : 100 = 22.',
    },
    {
      type: 'choice',
      prompt: 'Chiếc ba lô giá 250 000 đồng, được giảm giá 15%. Mai phải trả bao nhiêu tiền?',
      options: ['212 500 đồng', '37 500 đồng', '235 000 đồng', '287 500 đồng'],
      answer: 0,
      hints: [
        'Tìm số tiền được giảm trước: 15% của 250 000 đồng.',
        'Lấy giá bán trừ đi số tiền được giảm.',
      ],
      solution:
        'Số tiền được giảm: 250 000 × 15 : 100 = 37 500 (đồng). Mai phải trả: 250 000 − 37 500 = 212 500 (đồng).',
    },
  ],
  takeaways: [
    'Tìm a% của B: lấy B × a : 100 (hoặc B : 100 × a).',
    'Giảm giá a%: số tiền được giảm là a% của giá bán; số tiền phải trả = giá bán − số tiền được giảm.',
    'Tiền lãi tiết kiệm là a% của số tiền gửi, với a là lãi suất.',
  ],
};
