/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành bấm giờ để tính vận tốc chạy, đi bộ của bạn bè; ước lượng độ dài một vòng sân từ vận tốc và thời gian; giải bài toán thực tế về tàu thuỷ và cơn bão.',
  intro:
    'Em chạy nhanh bao nhiêu mét mỗi giây? Một vòng sân trường dài bao nhiêu mét? Chỉ cần một chiếc đồng hồ bấm giờ, em tính được ngay. Cùng thực hành nhé!',
  objectives: [
    'Bấm giờ rồi tính vận tốc của một người chạy, đi bộ: v = s : t.',
    'Ước lượng quãng đường từ vận tốc và thời gian: s = v × t.',
    'Vận dụng tính vận tốc, quãng đường, thời gian trong bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Bấm giờ, tính và ước lượng',
      blocks: [
        {
          type: 'p',
          text: 'Biết quãng đường và bấm giờ được thời gian, em tính được vận tốc: lấy quãng đường chia cho thời gian.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'v = s : t, s = v × t, t = s : v. Quãng đường tính bằng mét, thời gian tính bằng giây thì vận tốc tính bằng m/giây.',
        },
        {
          type: 'p',
          text: 'Bấm giờ bằng tay luôn lệch một chút, nên kết quả là số gần đúng. Em thường làm tròn đến hàng phần mười.',
        },
        {
          type: 'p',
          text: 'Biết vận tốc chạy của em và bấm giờ một vòng sân, em ước lượng được một vòng sân dài bao nhiêu mét.',
        },
        {
          type: 'table',
          head: ['Ai, cái gì', 'Vận tốc khoảng'],
          rows: [
            ['Người đi bộ', '5 km/giờ (hơn 1 m/giây)'],
            ['Học sinh chạy', '5 m/giây'],
            ['Xe đạp', '15 km/giờ'],
            ['Ô tô', '60 km/giờ'],
            ['Máy bay', '800 km/giờ'],
          ],
          caption: 'Một vài vận tốc để em ước lượng',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Trước khi tính, em kiểm tra các số đo có khớp đơn vị không: km với giờ, m với giây hoặc m với phút.',
        },
      ],
    },
    {
      heading: 'Dự án: Đo vận tốc chạy của em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi bạn trong nhóm chạy 50 m, nhóm bấm giờ rồi tính vận tốc của từng bạn. Sau đó em chạy một vòng sân và ước lượng một vòng sân dài bao nhiêu mét.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: đồng hồ bấm giờ (hoặc đồng hồ có kim giây), thước dây, phấn để kẻ vạch, giấy và bút.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dùng thước dây đo 50 m trên sân. Kẻ vạch xuất phát và vạch đích.',
            'Một bạn hô "Chạy!" và bấm giờ. Bạn ấy bấm dừng khi người chạy chạm vạch đích.',
            'Ghi thời gian vào bảng. Tính vận tốc: 50 : thời gian, làm tròn đến hàng phần mười.',
            'Em chạy một vòng sân với sức chạy như lúc trước. Nhóm bấm giờ một vòng.',
            'Ước lượng một vòng sân: vận tốc của em × thời gian chạy một vòng.',
          ],
        },
        {
          type: 'table',
          head: ['Tên', 'Thời gian chạy 50 m', 'Vận tốc', 'Thời gian một vòng', 'Một vòng sân'],
          rows: [
            ['…', '… giây', '… m/giây', '… giây', '… m'],
            ['…', '… giây', '… m/giây', '… giây', '… m'],
          ],
          caption: 'Bảng ghi kết quả của nhóm',
        },
        {
          type: 'p',
          text: 'Báo cáo với cả lớp: bạn nào chạy nhanh nhất? Các bạn ước lượng một vòng sân có gần nhau không? Vì sao kết quả mỗi bạn hơi khác nhau?',
        },
      ],
    },
  ],
  explore: {
    title: 'Đồng hồ bấm giờ',
    instruction:
      'Em bấm "Bắt đầu" khi bạn xuất phát và bấm "Dừng" khi bạn chạm vạch đích. Rồi em chọn vận tốc hoặc độ dài một vòng tính từ thời gian đo được.',
  },
  examples: [
    {
      problem: 'An chạy 50 m hết 10,2 giây. Tính vận tốc chạy của An, làm tròn đến hàng phần mười.',
      steps: ['Vận tốc chạy của An là: 50 : 10,2 = 4,90… (m/giây).', 'Làm tròn: 4,9 m/giây.'],
      answer: 'Vận tốc chạy của An khoảng 4,9 m/giây.',
    },
    {
      problem:
        'Hiệp chạy với vận tốc 9,1 m/giây, chạy một vòng sân vận động hết 29 giây. Ước lượng một vòng sân dài bao nhiêu mét?',
      steps: ['Quãng đường Hiệp chạy là: 9,1 × 29 = 263,9 (m).'],
      answer: 'Một vòng sân dài khoảng 263,9 m (gần 264 m).',
    },
    {
      problem:
        'Một con tàu đi từ cảng Rotterdam (Hà Lan) đến cảng Ulsan (Hàn Quốc). Đường phía bắc dài 5 600 km, tàu đi với vận tốc 16 km/giờ. Đường phía nam dài 23 400 km, tàu đi với vận tốc 36 km/giờ. Đi đường nào nhanh hơn?',
      steps: [
        'Thời gian đi đường phía bắc là: 5 600 : 16 = 350 (giờ).',
        'Thời gian đi đường phía nam là: 23 400 : 36 = 650 (giờ).',
        '350 giờ < 650 giờ, nhanh hơn 650 − 350 = 300 (giờ).',
      ],
      answer: 'Đi đường phía bắc nhanh hơn 300 giờ.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Bình chạy 60 m hết 12 giây. Vận tốc chạy của Bình là bao nhiêu mét trên giây (m/giây)?',
      answer: 5,
      unit: 'm/giây',
      hints: ['Vận tốc = quãng đường : thời gian.', 'Em tính 60 : 12.'],
      solution: 'Vận tốc chạy của Bình là: 60 : 12 = 5 (m/giây).',
    },
    {
      type: 'number',
      prompt:
        'Đông chạy 100 m với vận tốc 7,5 m/giây. Đông chạy hết bao nhiêu giây? (Làm tròn đến hàng phần mười.)',
      answer: 13.3,
      tolerance: 0.05,
      unit: 'giây',
      hints: ['Thời gian = quãng đường : vận tốc.', 'Em tính 100 : 7,5 rồi làm tròn.'],
      solution: 'Thời gian Đông chạy là: 100 : 7,5 = 13,33… (giây). Làm tròn: 13,3 giây.',
    },
    {
      type: 'number',
      prompt:
        'An chạy với vận tốc 8,5 m/giây, chạy một vòng sân hết 31 giây. Ước lượng một vòng sân dài bao nhiêu mét?',
      answer: 263.5,
      tolerance: 0.05,
      unit: 'm',
      hints: ['Quãng đường = vận tốc × thời gian.', 'Em tính 8,5 × 31.'],
      solution: 'Một vòng sân dài khoảng: 8,5 × 31 = 263,5 (m).',
    },
    {
      type: 'choice',
      prompt: 'Một bạn học sinh đi bộ đến trường. Vận tốc của bạn ấy khoảng bao nhiêu?',
      options: ['1 m/giây', '10 m/giây', '100 m/giây', '1 km/giây'],
      answer: 0,
      hints: ['Mỗi giây em đi được mấy bước chân?', 'Một bước chân dài khoảng nửa mét.'],
      solution:
        'Mỗi giây em đi khoảng 2 bước, mỗi bước khoảng nửa mét, tức là khoảng 1 m. Vận tốc đi bộ khoảng 1 m/giây.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi người, mỗi xe với vận tốc gần đúng của nó.',
      left: ['Người đi bộ', 'Xe đạp', 'Ô tô', 'Máy bay'],
      right: ['5 km/giờ', '15 km/giờ', '60 km/giờ', '800 km/giờ', '8 000 km/giờ'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Đi càng nhanh thì vận tốc càng lớn.', 'Máy bay bay nhanh hơn ô tô nhiều lần.'],
      solution:
        'Người đi bộ khoảng 5 km/giờ, xe đạp 15 km/giờ, ô tô 60 km/giờ, máy bay 800 km/giờ.',
    },
    {
      type: 'number',
      prompt:
        'Con tàu đi đường phía nam dài 23 400 km với vận tốc 36 km/giờ. Con tàu đi hết bao nhiêu giờ?',
      answer: 650,
      unit: 'giờ',
      hints: ['Thời gian = quãng đường : vận tốc.', 'Em tính 23 400 : 36.'],
      solution: 'Thời gian con tàu đi là: 23 400 : 36 = 650 (giờ).',
    },
    {
      type: 'number',
      prompt:
        'Con tàu đi với vận tốc 36 km/giờ. Sau 410 giờ, con tàu cách nơi xuất phát bao nhiêu ki-lô-mét?',
      answer: 14760,
      unit: 'km',
      hints: ['Quãng đường = vận tốc × thời gian.', 'Em tính 36 × 410.'],
      solution: 'Quãng đường con tàu đi được là: 36 × 410 = 14 760 (km).',
    },
    {
      type: 'choice',
      prompt: 'Một cơn bão di chuyển với vận tốc 350 m/phút. Đổi ra ki-lô-mét trên giờ (km/giờ)?',
      options: ['21 km/giờ', '35 km/giờ', '5,8 km/giờ', '210 km/giờ'],
      answer: 0,
      hints: ['Mỗi giờ có 60 phút: em tính 350 × 60 (m).', 'Đổi số mét được ra ki-lô-mét.'],
      solution:
        'Mỗi giờ cơn bão đi được: 350 × 60 = 21 000 (m) = 21 km. Vậy 350 m/phút = 21 km/giờ.',
    },
    {
      type: 'number',
      prompt:
        'Tâm bão cách thành phố 10,5 km và di chuyển với vận tốc 21 km/giờ. Sau bao nhiêu phút tâm bão đến thành phố?',
      answer: 30,
      unit: 'phút',
      hints: ['Thời gian = 10,5 : 21 (giờ).', 'Đổi số giờ được ra phút: 1 giờ = 60 phút.'],
      solution: 'Thời gian là: 10,5 : 21 = 0,5 (giờ). 0,5 giờ = 30 phút.',
    },
  ],
  takeaways: [
    'Bấm giờ rồi tính vận tốc: v = s : t; kết quả là số gần đúng, thường làm tròn đến hàng phần mười.',
    'Biết vận tốc và thời gian, em ước lượng được quãng đường: s = v × t.',
    'Luôn đổi các số đo cho khớp đơn vị trước khi tính.',
  ],
};
