/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề tỉ số: tỉ số phần trăm, tỉ lệ bản đồ, tìm hai số khi biết tổng hoặc hiệu và tỉ số, tìm tỉ số phần trăm của hai số, tìm giá trị phần trăm của một số và giải bài toán thực tế.',
  intro:
    'Hôm nay em ôn lại cả chủ đề Tỉ số và các bài toán liên quan. Em làm bộ bài tập trộn, rồi giải các bài toán về bản đồ, giảm giá và chia phần nhé!',
  objectives: [
    'Củng cố tỉ số, tỉ số phần trăm và tỉ lệ bản đồ.',
    'Giải được bài toán tìm hai số khi biết tổng hoặc hiệu và tỉ số của hai số đó.',
    'Tìm được tỉ số phần trăm của hai số và giá trị phần trăm của một số trong bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại cách làm',
      blocks: [
        {
          type: 'table',
          head: ['Dạng bài', 'Cách làm'],
          rows: [
            ['Tỉ lệ bản đồ 1 : k', 'Độ dài thật = độ dài trên bản đồ × k'],
            ['Tổng và tỉ số', 'Tìm tổng số phần bằng nhau, giá trị một phần, rồi hai số'],
            ['Hiệu và tỉ số', 'Tìm hiệu số phần bằng nhau, giá trị một phần, rồi hai số'],
            ['Tỉ số phần trăm của a và b', 'a : b, nhân thương với 100, viết thêm %'],
            ['a% của B', 'B × a : 100'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Với bài toán giảm giá, em tìm số tiền được giảm trước, rồi lấy giá bán trừ đi số tiền được giảm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Mỗi bộ có 8 câu lấy từ các bài trong chủ đề. Chọn đáp án đúng; nếu sai, em đọc gợi ý và chọn lại. Hết bộ, em xem phần cần ôn và bấm làm bộ bài khác.',
  },
  examples: [
    {
      problem:
        'Thỏ và rùa hái được 84 cây nấm. Số nấm của thỏ bằng 2/5 số nấm của rùa. Mỗi bạn hái được bao nhiêu cây nấm?',
      steps: [
        'Coi số nấm của thỏ là 2 phần thì số nấm của rùa là 5 phần như thế.',
        'Tổng số phần bằng nhau: 2 + 5 = 7 (phần).',
        'Thỏ hái: 84 : 7 × 2 = 24 (cây). Rùa hái: 84 − 24 = 60 (cây).',
      ],
      answer: 'Thỏ hái 24 cây nấm, rùa hái 60 cây nấm.',
    },
    {
      problem:
        'Một thùng táo nặng 30 kg có 1,5 kg táo bị hỏng. a) Số táo hỏng chiếm bao nhiêu phần trăm? b) Một thùng táo khác nặng 80 kg có tỉ lệ táo hỏng như vậy. Thùng đó có bao nhiêu ki-lô-gam táo không hỏng?',
      steps: [
        'a) 1,5 : 30 = 0,05 = 5%.',
        'b) Táo hỏng: 80 × 5 : 100 = 4 (kg).',
        'Táo không hỏng: 80 − 4 = 76 (kg).',
      ],
      answer: 'a) 5%; b) 76 kg táo không hỏng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tỉ số của 1 và 4 viết dưới dạng tỉ số phần trăm là:',
      options: ['25%', '14%', '4%', '40%'],
      answer: 0,
      hints: ['1 : 4 = 0,25. Nhân với 100 rồi viết thêm %.'],
      solution: '1 : 4 = 0,25 = 25%.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi độ dài trên bản đồ với độ dài thật.',
      left: ['2 cm, tỉ lệ 1 : 2 000', '80 cm, tỉ lệ 1 : 2 000', '1,5 cm, tỉ lệ 1 : 500 000'],
      right: ['0,04 km', '1,6 km', '7,5 km', '16 km'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Nhân độ dài trên bản đồ với số sau dấu hai chấm, được độ dài thật theo xăng-ti-mét.',
        '100 000 cm = 1 km.',
      ],
      solution:
        '2 × 2 000 = 4 000 (cm) = 0,04 km; 80 × 2 000 = 160 000 (cm) = 1,6 km; 1,5 × 500 000 = 750 000 (cm) = 7,5 km.',
    },
    {
      type: 'number',
      prompt:
        'Quãng đường thật dài 10 km. Trên bản đồ tỉ lệ 1 : 500 000, quãng đường đó dài bao nhiêu xăng-ti-mét?',
      answer: 2,
      unit: 'cm',
      hints: ['Đổi 10 km ra xăng-ti-mét.', 'Chia cho 500 000.'],
      solution: '10 km = 1 000 000 cm. 1 000 000 : 500 000 = 2 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Thỏ và rùa hái được 84 cây nấm. Số nấm của thỏ bằng 2/5 số nấm của rùa. Rùa hái được bao nhiêu cây nấm?',
      answer: 60,
      unit: 'cây',
      hints: ['Tổng số phần bằng nhau là 2 + 5.', 'Tìm giá trị một phần rồi nhân với 5.'],
      solution: 'Tổng số phần: 2 + 5 = 7. Rùa hái: 84 : 7 × 5 = 60 (cây).',
    },
    {
      type: 'number',
      prompt:
        'Số kẹo của Mi bằng 5/2 số kẹo của Mai. Mi có nhiều hơn Mai 6 cái kẹo. Mai có bao nhiêu cái kẹo?',
      answer: 4,
      unit: 'cái',
      hints: [
        'Mi 5 phần, Mai 2 phần. Hiệu số phần bằng nhau là 5 − 2.',
        'Tìm giá trị một phần rồi nhân với 2.',
      ],
      solution: 'Hiệu số phần: 5 − 2 = 3. Mai có: 6 : 3 × 2 = 4 (cái). Mi có: 4 + 6 = 10 (cái).',
    },
    {
      type: 'number',
      prompt: 'Tìm tỉ số phần trăm của 49 và 70.',
      answer: 70,
      unit: '%',
      hints: ['Tính 49 : 70.'],
      solution: '49 : 70 = 0,7 = 70%.',
    },
    {
      type: 'number',
      prompt: 'Tìm tỉ số phần trăm của 37,8 và 45.',
      answer: 84,
      unit: '%',
      hints: ['Tính 37,8 : 45.'],
      solution: '37,8 : 45 = 0,84 = 84%.',
    },
    {
      type: 'choice',
      prompt: '2% của 250 là:',
      options: ['5', '50', '125', '0,5'],
      answer: 0,
      hints: ['Lấy 250 nhân với 2 rồi chia cho 100.'],
      solution: '250 × 2 : 100 = 500 : 100 = 5.',
    },
    {
      type: 'number',
      prompt: 'Tìm 11% của 200.',
      answer: 22,
      hints: ['Lấy 200 nhân với 11 rồi chia cho 100.'],
      solution: '200 × 11 : 100 = 22.',
    },
    {
      type: 'number',
      prompt:
        'Chiếc ti vi giá 15 000 000 đồng, được giảm giá 8%. Chiếc ti vi được giảm bao nhiêu tiền?',
      answer: 1200000,
      unit: 'đồng',
      hints: ['Tìm 8% của 15 000 000 đồng.'],
      solution: '15 000 000 × 8 : 100 = 1 200 000 (đồng).',
    },
    {
      type: 'number',
      prompt:
        'Chiếc ti vi giá 15 000 000 đồng, được giảm giá 8%. Giá chiếc ti vi sau khi giảm là bao nhiêu?',
      answer: 13800000,
      unit: 'đồng',
      hints: ['Tìm số tiền được giảm trước.', 'Lấy giá bán trừ đi số tiền được giảm.'],
      solution:
        'Được giảm: 15 000 000 × 8 : 100 = 1 200 000 (đồng). Giá sau khi giảm: 15 000 000 − 1 200 000 = 13 800 000 (đồng).',
    },
    {
      type: 'number',
      prompt:
        'Thùng táo 30 kg có 1,5 kg táo hỏng. Thùng táo 80 kg có tỉ lệ táo hỏng như vậy. Thùng 80 kg có bao nhiêu ki-lô-gam táo không hỏng?',
      answer: 76,
      unit: 'kg',
      hints: [
        'Tìm tỉ số phần trăm của táo hỏng: 1,5 : 30.',
        'Tìm số táo hỏng của thùng 80 kg, rồi lấy 80 trừ đi.',
      ],
      solution:
        'Tỉ lệ táo hỏng: 1,5 : 30 = 0,05 = 5%. Táo hỏng: 80 × 5 : 100 = 4 (kg). Táo không hỏng: 80 − 4 = 76 (kg).',
    },
  ],
  takeaways: [
    'Tỉ lệ bản đồ 1 : k: độ dài thật bằng độ dài trên bản đồ nhân với k.',
    'Tổng (hoặc hiệu) và tỉ số: tìm tổng (hoặc hiệu) số phần bằng nhau, rồi giá trị một phần.',
    'Tỉ số phần trăm của a và b: a : b × 100%. Tìm a% của B: B × a : 100.',
  ],
};
