/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập diện tích hình tam giác, hình thang, chu vi và diện tích hình tròn, diện tích hình ghép và các bài toán thực tế.',
  intro:
    'Em đã học hình tam giác, hình thang và hình tròn. Hôm nay em luyện tập tính chu vi, diện tích và giải các bài toán về mảnh đất, hàng rào, bánh xe nhé.',
  objectives: [
    'Tính được diện tích hình tam giác, hình thang, hình tròn và chu vi hình tròn.',
    'Tính được diện tích hình ghép từ các hình đã học.',
    'Vận dụng giải các bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Các công thức đã học',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Công thức'],
          rows: [
            ['Hình tam giác', 'S = a × h : 2'],
            ['Hình thang', 'S = (a + b) × h : 2'],
            ['Chu vi hình tròn', 'C = d × 3,14 = r × 2 × 3,14'],
            ['Diện tích hình tròn', 'S = r × r × 3,14'],
          ],
          caption: 'Ghi nhớ các công thức của chủ đề',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Với hình ghép, em chia thành các hình đã học, tính diện tích từng hình rồi cộng lại.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Các số đo phải cùng một đơn vị. Đề cho đường kính mà cần bán kính thì em lấy đường kính chia cho 2.',
        },
      ],
    },
  ],
  explore: {
    title: 'Luyện tập trộn',
    instruction:
      'Mỗi lượt có một câu của từng dạng bài. Em nhìn hình, chọn đáp án đúng. Sai lần đầu, em được gợi ý và làm lại. Hết lượt, bấm "Làm bộ bài khác" để luyện tiếp.',
  },
  examples: [
    {
      problem:
        'Mảnh đất gồm hình thang ABCK có hai đáy 24 m và 8 m, chiều cao 24 m, và hình tam giác DEK có đáy 12 m, chiều cao 12 m. Tính diện tích mảnh đất.',
      steps: [
        'Diện tích hình thang: (24 + 8) × 24 : 2 = 384 (m²).',
        'Diện tích hình tam giác: 12 × 12 : 2 = 72 (m²).',
        'Diện tích mảnh đất: 384 + 72 = 456 (m²).',
      ],
      answer: 'Mảnh đất có diện tích 456 m².',
    },
    {
      problem:
        'Mảnh vườn có dạng một phần tư hình tròn bán kính 10 m. Tính độ dài hàng rào bao quanh mảnh vườn.',
      steps: [
        'Chu vi hình tròn bán kính 10 m: 10 × 2 × 3,14 = 62,8 (m).',
        'Một phần tư đường tròn: 62,8 : 4 = 15,7 (m).',
        'Hàng rào gồm một phần tư đường tròn và hai bán kính: 15,7 + 10 + 10 = 35,7 (m).',
      ],
      answer: 'Hàng rào dài 35,7 m.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi hình với cách tính diện tích của nó.',
      left: ['Hình tam giác', 'Hình thang', 'Hình tròn'],
      right: ['a × h : 2', '(a + b) × h : 2', 'r × r × 3,14', 'd × 3,14'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['d × 3,14 là chu vi hình tròn, không phải diện tích.'],
      solution:
        'Tam giác: a × h : 2. Hình thang: (a + b) × h : 2. Hình tròn: r × r × 3,14. Còn d × 3,14 là chu vi hình tròn.',
    },
    {
      type: 'number',
      prompt: 'Hình tròn lớn có đường kính 16 dm. Tính chu vi hình tròn lớn.',
      answer: 50.24,
      unit: 'dm',
      hints: ['C = d × 3,14.'],
      solution: '16 × 3,14 = 50,24. Chu vi hình tròn lớn là 50,24 dm.',
    },
    {
      type: 'choice',
      prompt:
        'Hình tròn lớn có đường kính gấp 2 lần đường kính hình tròn nhỏ. Chu vi hình tròn lớn so với chu vi hình tròn nhỏ thế nào?',
      options: ['Gấp 2 lần', 'Gấp 4 lần', 'Bằng nhau', 'Gấp 3,14 lần'],
      answer: 0,
      hints: ['Chu vi bằng đường kính nhân với cùng một số 3,14.'],
      solution:
        'Chu vi = d × 3,14. Đường kính gấp 2 lần thì chu vi cũng gấp 2 lần. Ví dụ: 8 × 3,14 = 25,12 và 16 × 3,14 = 50,24 = 25,12 × 2.',
    },
    {
      type: 'number',
      prompt:
        'Mảnh vườn có dạng một phần tư hình tròn bán kính 10 m. Hàng rào bao quanh mảnh vườn dài bao nhiêu mét?',
      answer: 35.7,
      unit: 'm',
      hints: [
        'Hàng rào gồm một phần tư đường tròn và hai bán kính.',
        'Chu vi cả hình tròn: 10 × 2 × 3,14.',
      ],
      solution: '10 × 2 × 3,14 = 62,8 (m). 62,8 : 4 = 15,7 (m). 15,7 + 10 + 10 = 35,7 (m).',
    },
    {
      type: 'number',
      prompt:
        'Mảnh đất ABCD gồm hình thang có hai đáy 10 m và 14 m, chiều cao 10 m, và hình tam giác có đáy 14 m, chiều cao 4 m. Tính diện tích mảnh đất.',
      answer: 148,
      unit: 'm²',
      hints: ['Tính diện tích hình thang và hình tam giác rồi cộng lại.'],
      solution:
        'Hình thang: (10 + 14) × 10 : 2 = 120 (m²). Hình tam giác: 14 × 4 : 2 = 28 (m²). Mảnh đất: 120 + 28 = 148 (m²).',
    },
    {
      type: 'number',
      prompt:
        'Tấm bìa hình tam giác vuông có hai cạnh góc vuông 3 cm và 4 cm. Người ta khoét đi một hình tròn bán kính 1 cm. Diện tích phần bìa còn lại là bao nhiêu?',
      answer: 2.86,
      unit: 'cm²',
      hints: [
        'Diện tích tam giác: 3 × 4 : 2.',
        'Diện tích hình tròn: 1 × 1 × 3,14. Lấy tam giác trừ hình tròn.',
      ],
      solution:
        'Tam giác: 3 × 4 : 2 = 6 (cm²). Hình tròn: 1 × 1 × 3,14 = 3,14 (cm²). Còn lại: 6 − 3,14 = 2,86 (cm²).',
    },
    {
      type: 'choice',
      prompt:
        'Ba hình nặn từ cùng một loại đất, dày như nhau: hình tròn bán kính 6 cm; hình tam giác đáy 5 cm, chiều cao 8 cm; hình thang hai đáy 4 cm và 6 cm, chiều cao 5 cm. Hình nào nặng nhất?',
      options: ['Hình tròn', 'Hình tam giác', 'Hình thang'],
      answer: 0,
      hints: ['Hình nào có diện tích lớn nhất thì nặng nhất.'],
      solution:
        'Hình tròn: 6 × 6 × 3,14 = 113,04 (cm²). Hình tam giác: 5 × 8 : 2 = 20 (cm²). Hình thang: (4 + 6) × 5 : 2 = 25 (cm²). Hình tròn nặng nhất.',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật ABCD có AD = 3 cm. Cạnh DC được chia thành 7 đoạn bằng nhau, mỗi đoạn 1,3 cm; DH là đoạn đầu tiên. Tính diện tích hình tam giác ADH.',
      answer: 1.95,
      unit: 'cm²',
      hints: ['Tam giác ADH vuông tại D: đáy DH = 1,3 cm, chiều cao AD = 3 cm.'],
      solution: '3 × 1,3 : 2 = 3,9 : 2 = 1,95. Diện tích hình tam giác ADH là 1,95 cm².',
    },
    {
      type: 'number',
      prompt:
        'Cũng hình chữ nhật đó, hình thang ABCH có đáy lớn AB = 9,1 cm, đáy bé HC = 7,8 cm, chiều cao 3 cm. Tính diện tích hình thang ABCH.',
      answer: 25.35,
      unit: 'cm²',
      hints: ['Cộng hai đáy: 9,1 + 7,8.', 'Nhân với 3 rồi chia cho 2.'],
      solution: '(9,1 + 7,8) × 3 : 2 = 16,9 × 3 : 2 = 50,7 : 2 = 25,35. Diện tích là 25,35 cm².',
    },
    {
      type: 'number',
      prompt:
        'Bánh xe có đường kính 0,7 m lăn trên mặt đất được 100 vòng. Bánh xe đi được bao nhiêu mét?',
      answer: 219.8,
      unit: 'm',
      hints: ['Một vòng bánh xe đi được quãng đường bằng chu vi bánh xe.'],
      solution: 'Chu vi: 0,7 × 3,14 = 2,198 (m). 100 vòng: 2,198 × 100 = 219,8 (m).',
    },
  ],
  takeaways: [
    'Tam giác: S = a × h : 2. Hình thang: S = (a + b) × h : 2.',
    'Hình tròn: C = d × 3,14; S = r × r × 3,14.',
    'Hình ghép: chia thành các hình đã học, tính từng phần rồi cộng (hoặc trừ phần bị khoét).',
  ],
};
