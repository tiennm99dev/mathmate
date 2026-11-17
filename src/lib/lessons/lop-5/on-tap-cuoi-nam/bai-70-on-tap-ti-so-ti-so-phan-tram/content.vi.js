/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm về tỉ số và tỉ số phần trăm: tỉ số của hai số, tỉ lệ bản đồ, tìm hai số khi biết tổng hoặc hiệu và tỉ số, viết thành tỉ số phần trăm, tìm tỉ số phần trăm của hai số và tìm giá trị phần trăm của một số.',
  intro:
    'Tỉ số và tỉ số phần trăm có mặt khắp nơi: trên bản đồ, khi đi mua hàng giảm giá, khi gửi tiền tiết kiệm. Hôm nay em ôn lại các dạng bài này. Bài ôn tập sẽ cho em biết phần nào cần luyện thêm nhé!',
  objectives: [
    'Viết được tỉ số của hai số; dùng được tỉ lệ bản đồ.',
    'Tìm được hai số khi biết tổng hoặc hiệu và tỉ số của hai số đó.',
    'Viết được phân số, số thập phân dưới dạng tỉ số phần trăm.',
    'Tìm được tỉ số phần trăm của hai số và giá trị phần trăm của một số.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Tỉ số và tỉ lệ bản đồ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Tỉ số của a và b (b khác 0) là a : b hay a/b.',
        },
        {
          type: 'p',
          text: 'Ví dụ: lớp có 12 bạn nam và 20 bạn nữ. Tỉ số của số bạn nam và số bạn nữ là 12 : 20 hay 12/20 = 3/5.',
        },
        {
          type: 'p',
          text: 'Bản đồ tỉ lệ 1 : 1 000 có nghĩa là 1 cm trên bản đồ ứng với 1 000 cm ngoài thực tế.',
        },
      ],
    },
    {
      heading: 'Tìm hai số khi biết tổng hoặc hiệu và tỉ số',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ sơ đồ: mỗi số là mấy phần bằng nhau.',
            'Tìm tổng số phần (hoặc hiệu số phần).',
            'Tìm giá trị một phần: lấy tổng (hoặc hiệu) chia cho số phần đó.',
            'Tìm mỗi số: lấy giá trị một phần nhân với số phần của nó.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Em có thể thử lại: cộng (hoặc trừ) hai số vừa tìm phải được tổng (hoặc hiệu) đề bài cho.',
        },
      ],
    },
    {
      heading: 'Tỉ số phần trăm',
      blocks: [
        {
          type: 'p',
          text: 'Tỉ số phần trăm là tỉ số viết dưới dạng phân số có mẫu số 100: 25/100 = 25%.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Tìm tỉ số phần trăm của a và b: tìm thương a : b, nhân thương đó với 100, rồi viết thêm kí hiệu % vào bên phải.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Tìm a% của một số: lấy số đó chia cho 100 rồi nhân với a (hoặc nhân với a rồi chia cho 100).',
        },
        {
          type: 'table',
          head: ['Số', 'Tỉ số phần trăm'],
          rows: [
            ['1/2', '50%'],
            ['3/4', '75%'],
            ['0,08', '8%'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Mỗi phần của bài được hỏi một lần. Sau đó, phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem: 'Tổng của hai số là 72. Tỉ số của số bé và số lớn là 3/5. Tìm hai số đó.',
      steps: [
        'Số bé 3 phần, số lớn 5 phần bằng nhau.',
        'Tổng số phần bằng nhau: 3 + 5 = 8 (phần).',
        'Giá trị một phần: 72 : 8 = 9.',
        'Số bé: 9 × 3 = 27. Số lớn: 9 × 5 = 45.',
      ],
      answer: 'Số bé là 27, số lớn là 45.',
    },
    {
      problem:
        'Lớp 5A có 24 học sinh, trong đó có 18 học sinh thích đọc truyện. Tìm tỉ số phần trăm của số học sinh thích đọc truyện và số học sinh cả lớp.',
      steps: [
        'Tìm thương: 18 : 24 = 0,75.',
        'Nhân với 100: 0,75 × 100 = 75.',
        'Viết thêm kí hiệu %.',
      ],
      answer: 'Tỉ số phần trăm là 75%.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Tỉ số của 12 và 20 là bao nhiêu? (viết dưới dạng phân số tối giản)',
      answer: [3, 5],
      simplest: true,
      hints: ['Tỉ số của 12 và 20 là 12/20. Em rút gọn phân số đó.'],
      solution: 'Tỉ số của 12 và 20 là 12 : 20 = 12/20 = 3/5.',
    },
    {
      type: 'choice',
      prompt: 'Lớp 5C có 15 bạn nam và 18 bạn nữ. Tỉ số của số bạn nữ và số bạn nam là bao nhiêu?',
      options: ['6/5', '5/6', '6/11', '5/11'],
      answer: 0,
      hints: ['Đề hỏi số bạn nữ so với số bạn nam: số bạn nữ viết trước.'],
      solution: 'Tỉ số của số bạn nữ và số bạn nam là 18 : 15 = 18/15 = 6/5.',
    },
    {
      type: 'number',
      prompt:
        'Trên bản đồ tỉ lệ 1 : 1 000 000, quãng đường từ thành phố A đến thành phố B dài 5 cm. Quãng đường thật dài bao nhiêu ki-lô-mét?',
      answer: 50,
      unit: 'km',
      hints: [
        '1 cm trên bản đồ ứng với 1 000 000 cm ngoài thực tế. Nhớ đổi xăng-ti-mét ra ki-lô-mét.',
      ],
      solution: 'Quãng đường thật dài: 5 × 1 000 000 = 5 000 000 (cm). 5 000 000 cm = 50 km.',
    },
    {
      type: 'number',
      prompt: 'Tổng của hai số là 96. Tỉ số của số bé và số lớn là 3/5. Tìm số lớn.',
      answer: 60,
      hints: ['Số bé 3 phần, số lớn 5 phần. Tìm tổng số phần, rồi giá trị một phần.'],
      solution: 'Tổng số phần: 3 + 5 = 8 (phần). Một phần: 96 : 8 = 12. Số lớn: 12 × 5 = 60.',
    },
    {
      type: 'number',
      prompt: 'Hiệu của hai số là 28. Tỉ số của số bé và số lớn là 2/3. Tìm số bé.',
      answer: 56,
      hints: ['Số bé 2 phần, số lớn 3 phần. Tìm hiệu số phần, rồi giá trị một phần.'],
      solution: 'Hiệu số phần: 3 − 2 = 1 (phần). Một phần: 28 : 1 = 28. Số bé: 28 × 2 = 56.',
    },
    {
      type: 'number',
      prompt: 'Mẹ hơn con 27 tuổi. Tuổi con bằng 1/4 tuổi mẹ. Hỏi con bao nhiêu tuổi?',
      answer: 9,
      hints: ['Tuổi con 1 phần, tuổi mẹ 4 phần bằng nhau. Mẹ hơn con mấy phần?'],
      solution:
        'Hiệu số phần: 4 − 1 = 3 (phần). Tuổi con: 27 : 3 = 9 (tuổi). Tuổi mẹ: 9 × 4 = 36 (tuổi).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số với tỉ số phần trăm bằng nó.',
      left: ['0,25', '1/2', '0,08', '3/5'],
      right: ['25%', '50%', '8%', '60%', '80%'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em viết mỗi số thành phân số có mẫu số 100.'],
      solution: '0,25 = 25/100 = 25%. 1/2 = 50/100 = 50%. 0,08 = 8/100 = 8%. 3/5 = 60/100 = 60%.',
    },
    {
      type: 'number',
      prompt: 'Tìm tỉ số phần trăm của 21 và 35.',
      answer: 60,
      unit: '%',
      hints: ['Tìm thương 21 : 35, rồi nhân với 100.'],
      solution: '21 : 35 = 0,6. 0,6 × 100 = 60. Tỉ số phần trăm của 21 và 35 là 60%.',
    },
    {
      type: 'number',
      prompt: 'Tìm 15% của 240.',
      answer: 36,
      hints: ['Lấy 240 chia cho 100 rồi nhân với 15.'],
      solution: '240 : 100 × 15 = 36.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 5D có 40 học sinh, trong đó 35% số học sinh thích bóng đá. Hỏi lớp 5D có bao nhiêu học sinh thích bóng đá?',
      answer: 14,
      hints: ['Em tìm 35% của 40.'],
      solution: 'Số học sinh thích bóng đá: 40 : 100 × 35 = 14 (học sinh).',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc áo giá 180 000 đồng, nay được giảm giá 20%. Giá chiếc áo sau khi giảm là bao nhiêu đồng?',
      answer: 144000,
      unit: 'đồng',
      hints: ['Tìm số tiền được giảm (20% của 180 000 đồng), rồi lấy giá cũ trừ đi.'],
      solution:
        'Số tiền được giảm: 180 000 : 100 × 20 = 36 000 (đồng). Giá sau khi giảm: 180 000 − 36 000 = 144 000 (đồng).',
    },
    {
      type: 'number',
      prompt:
        'Bác Lan gửi tiết kiệm 5 000 000 đồng với lãi suất 0,5% một tháng. Sau một tháng, bác nhận được bao nhiêu đồng tiền lãi?',
      answer: 25000,
      unit: 'đồng',
      hints: ['Tiền lãi một tháng là 0,5% của số tiền gửi.'],
      solution: 'Tiền lãi một tháng: 5 000 000 : 100 × 0,5 = 25 000 (đồng).',
    },
  ],
  takeaways: [
    'Tỉ số của a và b là a : b hay a/b.',
    'Tổng (hiệu) và tỉ số: tìm số phần, giá trị một phần, rồi từng số.',
    'Tỉ số phần trăm của a và b: a : b, nhân với 100, viết thêm %.',
    'a% của một số: lấy số đó chia cho 100 rồi nhân với a.',
  ],
};
