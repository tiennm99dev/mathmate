/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhân, chia số đo thời gian với một số: nhân hoặc chia từng loại đơn vị; tích có số phút, số giây từ 60 trở lên thì đổi sang đơn vị lớn hơn; khi chia còn dư ở đơn vị lớn thì đổi số dư sang đơn vị bé, cộng thêm rồi chia tiếp.',
  intro:
    'Mỗi vòng đu quay hết 3 phút 15 giây. Đu quay chạy 4 vòng hết bao lâu? Em cùng học nhân, chia số đo thời gian với một số nhé.',
  objectives: [
    'Đặt tính và nhân được số đo thời gian với một số tự nhiên.',
    'Đặt tính và chia được số đo thời gian cho một số tự nhiên.',
    'Biết đổi đơn vị trong tích và trong phép chia có dư.',
  ],
  sections: [
    {
      heading: 'Nhân số đo thời gian với một số',
      blocks: [
        {
          type: 'p',
          text: 'Tính 1 giờ 10 phút × 3. Em nhân từng đơn vị: 10 phút × 3 = 30 phút, 1 giờ × 3 = 3 giờ.',
        },
        {
          type: 'table',
          head: ['Bước', 'Giờ', 'Phút'],
          rows: [
            ['Số đo', '1 giờ', '10 phút'],
            ['Nhân với 3', '1 × 3 = 3', '10 × 3 = 30'],
            ['Tích', '3 giờ', '30 phút'],
          ],
        },
        {
          type: 'p',
          text: 'Tính 3 giờ 15 phút × 5. Nhân từng đơn vị được 15 giờ 75 phút. 75 phút = 1 giờ 15 phút, nên kết quả là 16 giờ 15 phút.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân số đo thời gian với một số: em nhân từng số đo theo từng loại đơn vị với số đó. Nếu số phút, số giây từ 60 trở lên thì em đổi sang đơn vị lớn hơn liền kề.',
        },
      ],
    },
    {
      heading: 'Chia số đo thời gian cho một số',
      blocks: [
        {
          type: 'p',
          text: 'Tính 42 phút 30 giây : 3. 42 phút : 3 = 14 phút, 30 giây : 3 = 10 giây. Kết quả 14 phút 10 giây.',
        },
        {
          type: 'p',
          text: 'Tính 7 giờ 40 phút : 4. 7 giờ : 4 = 1 giờ, dư 3 giờ.',
        },
        {
          type: 'p',
          text: 'Đổi 3 giờ = 180 phút. 180 phút + 40 phút = 220 phút. 220 phút : 4 = 55 phút. Kết quả 1 giờ 55 phút.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chia số đo thời gian cho một số: em chia từng số đo theo từng loại đơn vị, bắt đầu từ đơn vị lớn. Nếu còn dư thì em đổi số dư sang đơn vị bé hơn liền kề, cộng với số đo ở đơn vị đó rồi chia tiếp.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đặt tính nhân, chia số đo thời gian',
    instruction:
      'Em làm từng bước: nhân hoặc chia từng đơn vị, đổi đơn vị khi cần. Hàng kết quả hiện dần khi em chọn đúng.',
  },
  examples: [
    {
      problem:
        'Mỗi vòng đu quay hết 3 phút 15 giây. Hỏi đu quay chạy 4 vòng hết bao nhiêu thời gian?',
      steps: [
        'Em tính 3 phút 15 giây × 4.',
        '15 giây × 4 = 60 giây; 3 phút × 4 = 12 phút. Được 12 phút 60 giây.',
        '60 giây = 1 phút, nên 12 phút 60 giây = 13 phút.',
      ],
      answer: 'Đu quay chạy 4 vòng hết 13 phút.',
    },
    {
      problem:
        'Một người thợ làm 3 sản phẩm hết 7 giờ 30 phút. Hỏi trung bình người đó làm một sản phẩm hết bao nhiêu thời gian?',
      steps: [
        'Em tính 7 giờ 30 phút : 3.',
        '7 giờ : 3 = 2 giờ, dư 1 giờ. Đổi 1 giờ = 60 phút; 60 phút + 30 phút = 90 phút.',
        '90 phút : 3 = 30 phút.',
      ],
      answer: 'Trung bình mỗi sản phẩm hết 2 giờ 30 phút.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '2 giờ 12 phút × 4 = ?',
      options: ['8 giờ 48 phút', '8 giờ 12 phút', '6 giờ 16 phút', '9 giờ 48 phút'],
      answer: 0,
      hints: ['Em nhân giờ với 4, nhân phút với 4.'],
      solution: '12 phút × 4 = 48 phút; 2 giờ × 4 = 8 giờ. Kết quả 8 giờ 48 phút.',
    },
    {
      type: 'choice',
      prompt: '4 phút 25 giây × 3 = ?',
      options: ['13 phút 15 giây', '12 phút 75 giây', '12 phút 15 giây', '13 phút 75 giây'],
      answer: 0,
      hints: ['Nhân từng đơn vị được 12 phút 75 giây.', '75 giây = 1 phút 15 giây.'],
      solution: '4 phút 25 giây × 3 = 12 phút 75 giây = 13 phút 15 giây.',
    },
    {
      type: 'choice',
      prompt: '24 phút 36 giây : 4 = ?',
      options: ['6 phút 9 giây', '6 phút 36 giây', '20 phút 9 giây', '96 phút 144 giây'],
      answer: 0,
      hints: ['24 phút chia hết cho 4, 36 giây cũng chia hết cho 4.'],
      solution: '24 phút : 4 = 6 phút; 36 giây : 4 = 9 giây. Kết quả 6 phút 9 giây.',
    },
    {
      type: 'number',
      prompt: '5 giờ 15 phút : 3 = 1 giờ ? phút',
      answer: 45,
      unit: 'phút',
      hints: ['5 giờ : 3 = 1 giờ, dư 2 giờ.', 'Đổi 2 giờ = 120 phút, rồi cộng thêm 15 phút.'],
      solution:
        '5 giờ : 3 = 1 giờ, dư 2 giờ. 2 giờ = 120 phút; 120 + 15 = 135 phút; 135 : 3 = 45 phút. Kết quả 1 giờ 45 phút.',
    },
    {
      type: 'number',
      prompt: '1 giờ 35 phút × 2 = 3 giờ ? phút',
      answer: 10,
      unit: 'phút',
      hints: ['Nhân từng đơn vị được 2 giờ 70 phút.'],
      solution: '1 giờ 35 phút × 2 = 2 giờ 70 phút = 3 giờ 10 phút.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước tính 7 giờ 40 phút : 4.',
      items: [
        'Đổi 3 giờ = 180 phút',
        '7 giờ : 4 = 1 giờ, dư 3 giờ',
        '220 phút : 4 = 55 phút. Kết quả 1 giờ 55 phút',
        '180 phút + 40 phút = 220 phút',
      ],
      answer: [1, 0, 3, 2],
      hints: ['Em chia đơn vị lớn trước.'],
      solution:
        '7 giờ : 4 = 1 giờ, dư 3 giờ; 3 giờ = 180 phút; 180 + 40 = 220 phút; 220 : 4 = 55 phút.',
    },
    {
      type: 'choice',
      prompt:
        'Mỗi tiết học kéo dài 35 phút. Buổi sáng có 4 tiết học. Thời gian học các tiết buổi sáng là bao nhiêu?',
      options: ['2 giờ 20 phút', '1 giờ 40 phút', '2 giờ 40 phút', '140 giờ'],
      answer: 0,
      hints: ['Em tính 35 phút × 4 = 140 phút.', '140 phút = 2 giờ ? phút.'],
      solution: '35 phút × 4 = 140 phút = 2 giờ 20 phút.',
    },
    {
      type: 'choice',
      prompt:
        'Một máy làm 6 chiếc bánh hết 1 giờ 12 phút. Trung bình máy làm mỗi chiếc bánh hết bao lâu?',
      options: ['12 phút', '2 phút', '20 phút', '1 giờ 2 phút'],
      answer: 0,
      hints: ['Em tính 1 giờ 12 phút : 6.', '1 giờ 12 phút = 72 phút.'],
      solution: '1 giờ 12 phút = 72 phút; 72 phút : 6 = 12 phút.',
    },
  ],
  takeaways: [
    'Nhân, chia số đo thời gian với một số: em tính theo từng loại đơn vị.',
    'Tích có số phút, số giây từ 60 trở lên thì đổi sang đơn vị lớn hơn liền kề.',
    'Khi chia còn dư ở đơn vị lớn, em đổi số dư sang đơn vị bé, cộng thêm rồi chia tiếp.',
  ],
};
