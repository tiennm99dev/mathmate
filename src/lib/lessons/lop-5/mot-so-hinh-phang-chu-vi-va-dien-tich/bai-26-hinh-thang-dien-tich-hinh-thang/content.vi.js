/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình thang có hai cạnh đáy song song và hai cạnh bên; hình thang vuông; diện tích hình thang bằng tổng hai đáy nhân chiều cao rồi chia cho 2.',
  intro:
    'Chiếc túi xách, cái thang, mặt cắt con đê thường có dạng hình thang. Em tìm hiểu hình thang và ghép hai hình thang để tìm cách tính diện tích nhé.',
  objectives: [
    'Nhận biết hình thang, hai đáy, hai cạnh bên, đường cao và hình thang vuông.',
    'Tính được diện tích hình thang: S = (a + b) × h : 2.',
    'Giải được bài toán thực tế có liên quan đến diện tích hình thang.',
  ],
  sections: [
    {
      heading: 'Hình thang',
      blocks: [
        {
          type: 'p',
          text: 'Hình thang ABCD có: cạnh đáy AB và cạnh đáy DC; cạnh bên AD và cạnh bên BC.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hình thang có hai cạnh đáy song song với nhau. Cạnh đáy dài hơn gọi là đáy lớn, cạnh đáy ngắn hơn gọi là đáy bé.',
        },
        {
          type: 'p',
          text: 'Từ đỉnh A, kẻ AH vuông góc với đáy DC. AH là đường cao, độ dài AH là chiều cao của hình thang.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình thang vuông',
          text: 'Hình thang có một cạnh bên vuông góc với hai đáy gọi là hình thang vuông. Cạnh bên đó cũng là chiều cao.',
        },
      ],
    },
    {
      heading: 'Diện tích hình thang',
      blocks: [
        {
          type: 'p',
          text: 'Ghép hai hình thang giống hệt nhau, một hình xoay ngược lại, ta được một hình bình hành.',
        },
        {
          type: 'p',
          text: 'Hình bình hành có đáy bằng đáy lớn cộng đáy bé, chiều cao bằng chiều cao hình thang. Mỗi hình thang bằng một nửa hình bình hành.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính diện tích hình thang, ta lấy tổng độ dài hai đáy nhân với chiều cao (cùng một đơn vị đo) rồi chia cho 2.',
        },
        {
          type: 'p',
          text: 'S = (a + b) × h : 2. Trong đó S là diện tích, a và b là độ dài hai đáy, h là chiều cao.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ghép hai hình thang',
    instruction:
      'Em kéo các đỉnh A, B, C để đổi hai đáy và chiều cao. Bấm "Ghép thêm một hình thang" để xem hai hình thang giống nhau ghép thành hình bình hành.',
  },
  examples: [
    {
      problem: 'Tính diện tích hình thang có đáy lớn 12 cm, đáy bé 8 cm và chiều cao 5 cm.',
      steps: [
        'Tổng hai đáy: 12 + 8 = 20 (cm).',
        'Nhân với chiều cao: 20 × 5 = 100.',
        'Chia cho 2: 100 : 2 = 50.',
      ],
      answer: 'Diện tích hình thang là 50 cm².',
    },
    {
      problem:
        'Một thửa ruộng hình thang có đáy lớn 120 m, đáy bé 80 m, chiều cao 50 m. Cứ 100 m² thu hoạch được 60 kg thóc. Thửa ruộng đó thu hoạch được bao nhiêu ki-lô-gam thóc?',
      steps: [
        'Diện tích thửa ruộng: (120 + 80) × 50 : 2 = 5 000 (m²).',
        'Số lần 100 m²: 5 000 : 100 = 50.',
        'Số thóc thu được: 60 × 50 = 3 000 (kg).',
      ],
      answer: 'Thửa ruộng thu hoạch được 3 000 kg thóc.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình thang ABCD có hai đáy AB và DC. Hai cạnh nào song song với nhau?',
      options: ['AB và DC', 'AD và BC', 'AB và AD', 'AD và DC'],
      answer: 0,
      hints: ['Hai cạnh đáy của hình thang song song với nhau.'],
      solution: 'Hai cạnh đáy AB và DC song song với nhau.',
    },
    {
      type: 'match',
      prompt: 'Hình thang ABCD có đường cao AH. Nối mỗi đoạn thẳng với tên gọi của nó.',
      left: ['AB và DC', 'AD và BC', 'AH'],
      right: ['Hai cạnh đáy', 'Hai cạnh bên', 'Đường cao', 'Hai đường chéo'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Hai cạnh song song là hai đáy. Đoạn vuông góc với đáy là đường cao.'],
      solution: 'AB và DC là hai cạnh đáy, AD và BC là hai cạnh bên, AH là đường cao.',
    },
    {
      type: 'choice',
      prompt: 'Hình thang nào là hình thang vuông?',
      options: [
        'Hình thang có một cạnh bên vuông góc với hai đáy',
        'Hình thang có hai cạnh bên bằng nhau',
        'Hình thang có hai đáy bằng nhau',
      ],
      answer: 0,
      hints: ['Tên "vuông" nói về một góc vuông giữa cạnh bên và đáy.'],
      solution: 'Hình thang vuông có một cạnh bên vuông góc với hai đáy.',
    },
    {
      type: 'number',
      prompt: 'Hình thang có đáy lớn 9 m, đáy bé 6 m, chiều cao 4 m. Diện tích là bao nhiêu?',
      answer: 30,
      unit: 'm²',
      hints: ['Cộng hai đáy trước, rồi nhân với chiều cao.', 'Đừng quên chia cho 2.'],
      solution: '(9 + 6) × 4 : 2 = 15 × 4 : 2 = 30. Diện tích là 30 m².',
    },
    {
      type: 'number',
      prompt: 'Hình thang có hai đáy 7 cm và 4 cm, chiều cao 5 cm. Diện tích là bao nhiêu?',
      answer: 27.5,
      unit: 'cm²',
      hints: ['(7 + 4) × 5 = 55. Kết quả chia 2 có thể là số thập phân.'],
      solution: '(7 + 4) × 5 : 2 = 55 : 2 = 27,5. Diện tích là 27,5 cm².',
    },
    {
      type: 'number',
      prompt: 'Hình thang có hai đáy 2,5 dm và 1,5 dm, chiều cao 2 dm. Diện tích là bao nhiêu?',
      answer: 4,
      unit: 'dm²',
      hints: ['2,5 + 1,5 = 4.'],
      solution: '(2,5 + 1,5) × 2 : 2 = 4 × 2 : 2 = 4. Diện tích là 4 dm².',
    },
    {
      type: 'number',
      prompt:
        'Hình thang vuông ABCD có đáy lớn 10 cm, đáy bé 6 cm. Cạnh bên AD vuông góc với hai đáy và dài 4 cm. Diện tích là bao nhiêu?',
      answer: 32,
      unit: 'cm²',
      hints: ['Ở hình thang vuông, cạnh bên vuông góc với hai đáy chính là chiều cao.'],
      solution: 'Chiều cao là AD = 4 cm. (10 + 6) × 4 : 2 = 32. Diện tích là 32 cm².',
    },
    {
      type: 'number',
      prompt:
        'Hình thang có đáy lớn 1 m, đáy bé 60 cm, chiều cao 50 cm. Diện tích là bao nhiêu xăng-ti-mét vuông?',
      answer: 4000,
      unit: 'cm²',
      hints: ['Đổi đáy lớn ra xăng-ti-mét: 1 m = 100 cm.'],
      solution: '1 m = 100 cm. (100 + 60) × 50 : 2 = 4 000. Diện tích là 4 000 cm².',
    },
    {
      type: 'number',
      prompt:
        'Mảnh vườn hình thang có hai đáy 30 m và 20 m, chiều cao 16 m. Người ta trồng rau, cứ 1 m² thu được 2 kg rau. Cả mảnh vườn thu được bao nhiêu ki-lô-gam rau?',
      answer: 800,
      unit: 'kg',
      hints: ['Tính diện tích mảnh vườn trước.', 'Rồi nhân diện tích với 2.'],
      solution: 'Diện tích: (30 + 20) × 16 : 2 = 400 (m²). Số rau: 400 × 2 = 800 (kg).',
    },
  ],
  takeaways: [
    'Hình thang có hai cạnh đáy song song; hình thang vuông có một cạnh bên vuông góc với hai đáy.',
    'Hai hình thang giống nhau ghép thành hình bình hành có đáy a + b, cùng chiều cao.',
    'S = (a + b) × h : 2, hai đáy và chiều cao cùng một đơn vị đo.',
  ],
};
