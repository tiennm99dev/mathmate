/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về số đo thời gian và chuyển động đều: đổi đơn vị, cộng, trừ, nhân, chia số đo thời gian; tính vận tốc, quãng đường, thời gian; đổi đơn vị vận tốc và giải bài toán thực tế.',
  intro:
    'Em ôn lại cách tính với số đo thời gian và ba công thức của chuyển động đều. Rồi em giải các bài toán về xe đạp, đường đua và tiếng súng nhé!',
  objectives: [
    'Cộng, trừ, nhân, chia số đo thời gian; đổi đơn vị đo thời gian.',
    'Tính vận tốc, quãng đường, thời gian của một chuyển động đều.',
    'Đổi đơn vị đo vận tốc và vận dụng giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Đơn vị', 'Đổi'],
          rows: [
            ['1 giờ', '60 phút'],
            ['1 phút', '60 giây'],
            ['1 ngày', '24 giờ'],
            ['1 tuần', '7 ngày'],
            ['1 năm', '12 tháng'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cộng, trừ, nhân, chia số đo thời gian: em tính theo từng loại đơn vị. Kết quả có số phút, số giây từ 60 trở lên thì đổi sang đơn vị lớn hơn liền kề.',
        },
        {
          type: 'table',
          head: ['Cần tìm', 'Cách tính'],
          rows: [
            ['Vận tốc', 'v = s : t'],
            ['Quãng đường', 's = v × t'],
            ['Thời gian', 't = s : v'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Trước khi tính, em đổi các số đo cho khớp đơn vị: km với giờ, m với giây hoặc m với phút.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ câu hỏi trộn',
    instruction:
      'Mỗi câu một dạng bài của chủ đề. Sai lần đầu, em có gợi ý và được thử lại. Làm xong, em xem phần nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Thần Gió chạy trên đường đua dài 7 km với vận tốc 70 m/giây. Sau 1 phút, Thần Gió còn cách đích bao nhiêu mét?',
      steps: [
        'Đổi: 1 phút = 60 giây; 7 km = 7 000 m.',
        'Quãng đường Thần Gió chạy được là: 70 × 60 = 4 200 (m).',
        'Thần Gió còn cách đích: 7 000 − 4 200 = 2 800 (m).',
      ],
      answer: 'Thần Gió còn cách đích 2 800 m.',
    },
    {
      problem:
        'Một xe cứu hộ đi được 1,5 km trong 15 phút. Tính vận tốc của xe cứu hộ theo ki-lô-mét trên giờ.',
      steps: ['Đổi: 15 phút = 0,25 giờ.', 'Vận tốc của xe cứu hộ là: 1,5 : 0,25 = 6 (km/giờ).'],
      answer: 'Vận tốc của xe cứu hộ là 6 km/giờ.',
    },
    {
      problem:
        'Một nhà khoa học đứng cách nơi bắn súng 20,88 km. Ông nhìn thấy ánh lửa và 1 phút sau mới nghe tiếng súng. Tính vận tốc của âm thanh trong không khí theo mét trên giây.',
      steps: [
        'Đổi: 20,88 km = 20 880 m; 1 phút = 60 giây.',
        'Vận tốc của âm thanh là: 20 880 : 60 = 348 (m/giây).',
      ],
      answer: 'Vận tốc của âm thanh khoảng 348 m/giây.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '15 phút 20 giây + 5 phút 45 giây = ?',
      options: ['21 phút 5 giây', '20 phút 65 giây', '20 phút 5 giây', '21 phút 25 giây'],
      answer: 0,
      hints: ['Em cộng số phút với nhau, số giây với nhau.', '65 giây = 1 phút 5 giây.'],
      solution: '15 phút 20 giây + 5 phút 45 giây = 20 phút 65 giây = 21 phút 5 giây.',
    },
    {
      type: 'choice',
      prompt: '8 giờ 35 phút − 2 giờ 15 phút = ?',
      options: ['6 giờ 20 phút', '6 giờ 50 phút', '5 giờ 20 phút', '10 giờ 50 phút'],
      answer: 0,
      hints: ['Em trừ số phút với nhau, số giờ với nhau.'],
      solution: '35 phút − 15 phút = 20 phút; 8 giờ − 2 giờ = 6 giờ. Kết quả: 6 giờ 20 phút.',
    },
    {
      type: 'choice',
      prompt: '3 tuần 4 ngày × 5 = ?',
      options: ['17 tuần 6 ngày', '15 tuần 20 ngày', '17 tuần 3 ngày', '18 tuần 6 ngày'],
      answer: 0,
      hints: [
        'Em nhân số tuần, số ngày với 5.',
        '1 tuần = 7 ngày. 20 ngày bằng mấy tuần mấy ngày?',
      ],
      solution:
        '3 tuần 4 ngày × 5 = 15 tuần 20 ngày. 20 ngày = 2 tuần 6 ngày. Kết quả: 17 tuần 6 ngày.',
    },
    {
      type: 'choice',
      prompt: '10 năm 8 tháng : 2 = ?',
      options: ['5 năm 4 tháng', '5 năm 8 tháng', '5 năm 6 tháng', '4 năm 4 tháng'],
      answer: 0,
      hints: ['Em chia số năm cho 2, rồi chia số tháng cho 2.'],
      solution: '10 năm : 2 = 5 năm; 8 tháng : 2 = 4 tháng. Kết quả: 5 năm 4 tháng.',
    },
    {
      type: 'number',
      prompt:
        'Một con tàu vũ trụ bay với vận tốc 36 000 km/giờ. Mỗi giây con tàu bay được bao nhiêu ki-lô-mét?',
      answer: 10,
      unit: 'km',
      hints: ['1 giờ = 3 600 giây.', 'Em tính 36 000 : 3 600.'],
      solution:
        '1 giờ = 3 600 giây. 36 000 : 3 600 = 10. Mỗi giây con tàu bay được 10 km (36 000 km/giờ = 10 km/giây).',
    },
    {
      type: 'number',
      prompt:
        'Thần Gió chạy với vận tốc 70 m/giây trên đường đua dài 7 km. Sau 1 phút, Thần Gió còn cách đích bao nhiêu mét?',
      answer: 2800,
      unit: 'm',
      hints: ['Đổi 1 phút = 60 giây, 7 km = 7 000 m.', 'Tính quãng đường đã chạy: 70 × 60.'],
      solution:
        'Quãng đường đã chạy: 70 × 60 = 4 200 (m). Còn cách đích: 7 000 − 4 200 = 2 800 (m).',
    },
    {
      type: 'choice',
      prompt:
        'Một người đi xe đạp với vận tốc 17 km/giờ trên quãng đường dài 34 km. Người đó đi hết bao lâu?',
      options: ['2 giờ', '17 giờ', '51 giờ', '0,5 giờ'],
      answer: 0,
      hints: ['Thời gian = quãng đường : vận tốc.'],
      solution: 'Thời gian người đó đi là: 34 : 17 = 2 (giờ).',
    },
    {
      type: 'number',
      prompt:
        'Xe cứu hộ đi được 1,5 km trong 15 phút. Vận tốc của xe là bao nhiêu ki-lô-mét trên giờ?',
      answer: 6,
      unit: 'km/giờ',
      hints: ['Đổi 15 phút = 0,25 giờ.', 'Em tính 1,5 : 0,25.'],
      solution: '15 phút = 0,25 giờ. Vận tốc của xe là: 1,5 : 0,25 = 6 (km/giờ).',
    },
    {
      type: 'number',
      prompt:
        'Một phát súng được bắn ở nơi cách em 20,88 km. Em thấy ánh lửa ngay, 1 phút sau mới nghe tiếng súng. Vận tốc của âm thanh là bao nhiêu mét trên giây?',
      answer: 348,
      unit: 'm/giây',
      hints: ['Đổi 20,88 km = 20 880 m và 1 phút = 60 giây.', 'Em tính 20 880 : 60.'],
      solution:
        '20,88 km = 20 880 m; 1 phút = 60 giây. Vận tốc của âm thanh là: 20 880 : 60 = 348 (m/giây).',
    },
    {
      type: 'number',
      prompt:
        'Tiếng động từ máy bay đi 5 190 m trong không khí với vận tốc 346 m/giây, rồi đi tiếp 300 m trong nước biển với vận tốc 1 500 m/giây đến tàu ngầm. Tiếng động đi hết bao nhiêu giây?',
      answer: 15.2,
      tolerance: 0.001,
      unit: 'giây',
      hints: [
        'Tính thời gian đi trong không khí: 5 190 : 346.',
        'Tính thời gian đi trong nước biển: 300 : 1 500, rồi cộng hai thời gian.',
      ],
      solution:
        'Trong không khí: 5 190 : 346 = 15 (giây). Trong nước biển: 300 : 1 500 = 0,2 (giây). Tổng: 15 + 0,2 = 15,2 (giây).',
    },
    {
      type: 'choice',
      prompt:
        'Ngựa gỗ của vòng đu quay chạy trên đường tròn bán kính 20 m với vận tốc 3,1 m/giây. Ngựa gỗ đi hết một vòng trong bao lâu?',
      options: ['Hơn nửa phút', 'Đúng nửa phút', 'Gần nửa phút'],
      answer: 0,
      hints: [
        'Một vòng là chu vi đường tròn: C = d × 3,14.',
        'Tính thời gian một vòng rồi so với 30 giây.',
      ],
      solution:
        'Chu vi đường tròn: 20 × 2 × 3,14 = 125,6 (m). Thời gian một vòng: 125,6 : 3,1 ≈ 40,5 (giây). 40,5 giây > 30 giây, nên hơn nửa phút.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số đo với số đo bằng nó.',
      left: ['1,5 giờ', '2 giờ 15 phút', '72 km/giờ', '3 phút 20 giây'],
      right: ['90 phút', '135 phút', '20 m/giây', '200 giây', '150 phút'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['1 giờ = 60 phút, 1 phút = 60 giây.', '72 km/giờ: em tính 72 000 : 3 600.'],
      solution:
        '1,5 giờ = 90 phút; 2 giờ 15 phút = 135 phút; 72 km/giờ = 72 000 : 3 600 = 20 m/giây; 3 phút 20 giây = 200 giây.',
    },
  ],
  takeaways: [
    'Tính với số đo thời gian theo từng loại đơn vị, rồi đổi khi số phút, số giây từ 60 trở lên.',
    'v = s : t, s = v × t, t = s : v.',
    'Đổi các số đo cho khớp đơn vị trước khi tính.',
  ],
};
