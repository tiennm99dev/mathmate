/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cộng, trừ số đo thời gian: đặt tính thẳng cột theo từng đơn vị, cộng hoặc trừ như số tự nhiên rồi ghi đơn vị; số phút, số giây từ 60 trở lên thì đổi sang đơn vị lớn hơn; khi số bị trừ ở một đơn vị bé hơn số trừ thì đổi 1 đơn vị lớn sang đơn vị bé rồi mới trừ.',
  intro:
    'Một ô tô đi từ Hà Nội đến Thanh Hoá hết 3 giờ 15 phút, rồi đi tiếp đến Vinh hết 2 giờ 35 phút. Ô tô đi cả quãng đường hết bao lâu? Em cùng học cộng, trừ số đo thời gian nhé.',
  objectives: [
    'Đặt tính và cộng được hai số đo thời gian.',
    'Đặt tính và trừ được hai số đo thời gian.',
    'Biết đổi khi số phút, số giây đạt 60 hoặc khi cần đổi 1 đơn vị lớn để trừ.',
  ],
  sections: [
    {
      heading: 'Cộng số đo thời gian',
      blocks: [
        {
          type: 'p',
          text: 'Tính 3 giờ 15 phút + 2 giờ 35 phút. Em đặt tính: giờ thẳng cột giờ, phút thẳng cột phút.',
        },
        {
          type: 'table',
          head: ['Thành phần', 'Giờ', 'Phút'],
          rows: [
            ['Số hạng', '3 giờ', '15 phút'],
            ['Số hạng', '2 giờ', '35 phút'],
            ['Tổng', '5 giờ', '50 phút'],
          ],
        },
        {
          type: 'p',
          text: 'Tính 22 phút 58 giây + 23 phút 25 giây. Cộng từng đơn vị được 45 phút 83 giây.',
        },
        {
          type: 'p',
          text: '83 giây = 1 phút 23 giây. Vậy 45 phút 83 giây = 46 phút 23 giây.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cộng số đo thời gian: em cộng các số đo theo từng loại đơn vị. Nếu số phút hoặc số giây từ 60 trở lên thì em đổi sang đơn vị lớn hơn liền kề.',
        },
      ],
    },
    {
      heading: 'Trừ số đo thời gian',
      blocks: [
        {
          type: 'table',
          head: ['Thành phần', 'Giờ', 'Phút'],
          rows: [
            ['Số bị trừ', '15 giờ', '55 phút'],
            ['Số trừ', '13 giờ', '10 phút'],
            ['Hiệu', '2 giờ', '45 phút'],
          ],
        },
        {
          type: 'p',
          text: 'Tính 3 phút 20 giây − 2 phút 45 giây. 20 giây không trừ được 45 giây.',
        },
        {
          type: 'p',
          text: 'Em đổi 1 phút = 60 giây: 3 phút 20 giây = 2 phút 80 giây. Rồi 2 phút 80 giây − 2 phút 45 giây = 35 giây.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Trừ số đo thời gian: em trừ theo từng loại đơn vị. Nếu số đo ở số bị trừ bé hơn số đo ở số trừ thì em đổi 1 đơn vị lớn hơn liền kề sang đơn vị bé rồi mới trừ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đặt tính cộng, trừ số đo thời gian',
    instruction:
      'Em làm từng bước của phép tính: chọn kết quả của mỗi cột, rồi quyết định có cần đổi đơn vị không. Hàng kết quả hiện dần khi em chọn đúng.',
  },
  examples: [
    {
      problem:
        'Ô tô đi từ Hà Nội đến Thanh Hoá hết 3 giờ 15 phút, rồi đi tiếp đến Vinh hết 2 giờ 35 phút. Hỏi ô tô đi cả quãng đường hết bao nhiêu thời gian?',
      steps: [
        'Em tính 3 giờ 15 phút + 2 giờ 35 phút.',
        'Cộng số phút: 15 + 35 = 50 phút. Cộng số giờ: 3 + 2 = 5 giờ.',
        '50 phút bé hơn 60 phút nên giữ nguyên.',
      ],
      answer: 'Ô tô đi cả quãng đường hết 5 giờ 50 phút.',
    },
    {
      problem: 'Tính 4 giờ 45 phút + 1 giờ 30 phút.',
      steps: [
        'Cộng từng đơn vị: 4 giờ 45 phút + 1 giờ 30 phút = 5 giờ 75 phút.',
        '75 phút = 1 giờ 15 phút.',
      ],
      answer: '4 giờ 45 phút + 1 giờ 30 phút = 6 giờ 15 phút.',
    },
    {
      problem:
        'Một bộ phim bắt đầu lúc 9 giờ 10 phút và kết thúc lúc 11 giờ 5 phút. Bộ phim dài bao lâu?',
      steps: [
        'Em tính 11 giờ 5 phút − 9 giờ 10 phút.',
        '5 phút không trừ được 10 phút. Đổi 1 giờ = 60 phút: 11 giờ 5 phút = 10 giờ 65 phút.',
        '10 giờ 65 phút − 9 giờ 10 phút = 1 giờ 55 phút.',
      ],
      answer: 'Bộ phim dài 1 giờ 55 phút.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '2 giờ 25 phút + 3 giờ 20 phút = ?',
      options: ['5 giờ 45 phút', '5 giờ 5 phút', '6 giờ 45 phút', '5 giờ 55 phút'],
      answer: 0,
      hints: ['Em cộng giờ với giờ, phút với phút.'],
      solution: '25 + 20 = 45 phút; 2 + 3 = 5 giờ. Kết quả 5 giờ 45 phút.',
    },
    {
      type: 'choice',
      prompt: '12 phút 43 giây + 5 phút 37 giây = ?',
      options: ['18 phút 20 giây', '17 phút 80 giây', '17 phút 20 giây', '18 phút 80 giây'],
      answer: 0,
      hints: ['Cộng từng đơn vị được 17 phút 80 giây.', '80 giây = 1 phút 20 giây.'],
      solution:
        '12 phút 43 giây + 5 phút 37 giây = 17 phút 80 giây. 80 giây = 1 phút 20 giây, nên kết quả là 18 phút 20 giây.',
    },
    {
      type: 'choice',
      prompt: '7 giờ 40 phút − 3 giờ 15 phút = ?',
      options: ['4 giờ 25 phút', '4 giờ 55 phút', '3 giờ 25 phút', '10 giờ 55 phút'],
      answer: 0,
      hints: ['40 phút trừ được 15 phút, em trừ luôn.'],
      solution: '40 − 15 = 25 phút; 7 − 3 = 4 giờ. Kết quả 4 giờ 25 phút.',
    },
    {
      type: 'choice',
      prompt: '6 phút 15 giây − 2 phút 50 giây = ?',
      options: ['3 phút 25 giây', '4 phút 35 giây', '4 phút 25 giây', '3 phút 35 giây'],
      answer: 0,
      hints: [
        '15 giây không trừ được 50 giây.',
        'Đổi 1 phút = 60 giây: 6 phút 15 giây = 5 phút 75 giây.',
      ],
      solution:
        '6 phút 15 giây = 5 phút 75 giây. 75 − 50 = 25 giây; 5 − 2 = 3 phút. Kết quả 3 phút 25 giây.',
    },
    {
      type: 'number',
      prompt: '3 giờ 45 phút + 2 giờ 30 phút = 6 giờ ? phút',
      answer: 15,
      unit: 'phút',
      hints: ['Cộng từng đơn vị được 5 giờ 75 phút.', '75 phút = 1 giờ ? phút.'],
      solution: '3 giờ 45 phút + 2 giờ 30 phút = 5 giờ 75 phút = 6 giờ 15 phút.',
    },
    {
      type: 'number',
      prompt: '5 năm 3 tháng − 2 năm 8 tháng = 2 năm ? tháng',
      answer: 7,
      unit: 'tháng',
      hints: [
        '3 tháng không trừ được 8 tháng.',
        'Đổi 1 năm = 12 tháng: 5 năm 3 tháng = 4 năm 15 tháng.',
      ],
      solution:
        '5 năm 3 tháng = 4 năm 15 tháng. 15 − 8 = 7 tháng; 4 − 2 = 2 năm. Kết quả 2 năm 7 tháng.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước tính 3 phút 20 giây − 2 phút 45 giây.',
      items: [
        'Trừ số giây: 80 giây − 45 giây = 35 giây',
        'Thấy 20 giây không trừ được 45 giây',
        'Đổi 1 phút = 60 giây: 3 phút 20 giây = 2 phút 80 giây',
        'Trừ số phút: 2 phút − 2 phút = 0 phút. Kết quả 35 giây',
      ],
      answer: [1, 2, 0, 3],
      hints: ['Em phải đổi trước rồi mới trừ.'],
      solution:
        '20 giây không trừ được 45 giây, nên đổi 3 phút 20 giây = 2 phút 80 giây. Rồi 80 − 45 = 35 giây, 2 − 2 = 0 phút. Kết quả 35 giây.',
    },
    {
      type: 'choice',
      prompt:
        'Mai bắt đầu làm bài lúc 7 giờ 50 phút và làm xong lúc 8 giờ 35 phút. Mai làm bài hết bao lâu?',
      options: ['45 phút', '1 giờ 15 phút', '55 phút', '15 phút'],
      answer: 0,
      hints: ['Em tính 8 giờ 35 phút − 7 giờ 50 phút.', 'Đổi 8 giờ 35 phút = 7 giờ 95 phút.'],
      solution: '8 giờ 35 phút − 7 giờ 50 phút = 7 giờ 95 phút − 7 giờ 50 phút = 45 phút.',
    },
    {
      type: 'number',
      prompt:
        'Một người đi bộ hết 1 giờ 25 phút, rồi đi xe buýt hết 45 phút. Người đó đi tất cả hết bao nhiêu phút?',
      answer: 130,
      unit: 'phút',
      hints: ['1 giờ 25 phút + 45 phút = 1 giờ 70 phút = 2 giờ 10 phút.', '2 giờ = 120 phút.'],
      solution:
        '1 giờ 25 phút + 45 phút = 1 giờ 70 phút = 2 giờ 10 phút. 2 giờ 10 phút = 120 phút + 10 phút = 130 phút.',
    },
  ],
  takeaways: [
    'Cộng, trừ số đo thời gian: em tính theo từng loại đơn vị, rồi ghi đơn vị sau mỗi kết quả.',
    'Số phút hoặc số giây từ 60 trở lên thì đổi sang đơn vị lớn hơn liền kề.',
    'Số đo ở số bị trừ bé hơn số đo ở số trừ thì đổi 1 đơn vị lớn sang đơn vị bé rồi mới trừ.',
  ],
};
