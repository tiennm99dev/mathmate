/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đường tròn, hình tròn, tâm, bán kính và đường kính (d = r × 2); chu vi hình tròn C = d × 3,14; diện tích hình tròn S = r × r × 3,14.',
  intro:
    'Bánh xe đạp, mặt đồng hồ, chiếc đĩa đều có dạng hình tròn. Bánh xe lăn một vòng thì đi được bao xa? Hôm nay em cùng tìm hiểu nhé.',
  objectives: [
    'Nhận biết đường tròn, hình tròn, tâm, bán kính, đường kính; vẽ được đường tròn bằng compa.',
    'Tính được chu vi hình tròn: C = d × 3,14 hoặc C = r × 2 × 3,14.',
    'Tính được diện tích hình tròn: S = r × r × 3,14.',
  ],
  sections: [
    {
      heading: 'Đường tròn, hình tròn',
      blocks: [
        {
          type: 'p',
          text: 'Em đặt đầu nhọn của compa ở điểm O rồi quay một vòng. Đầu bút chì vẽ nên một đường tròn tâm O.',
        },
        {
          type: 'p',
          text: 'Đường tròn và phần bên trong nó tạo thành hình tròn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Đoạn thẳng nối tâm O với một điểm trên đường tròn là bán kính. Đoạn thẳng nối hai điểm trên đường tròn và đi qua tâm là đường kính.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Trong một hình tròn, các bán kính đều bằng nhau. Đường kính dài gấp 2 lần bán kính: d = r × 2.',
        },
      ],
    },
    {
      heading: 'Chu vi hình tròn',
      blocks: [
        {
          type: 'p',
          text: 'Độ dài của đường tròn gọi là chu vi của hình tròn đó. Lăn bánh xe đúng một vòng, quãng đường bánh xe đi được bằng chu vi bánh xe.',
        },
        {
          type: 'p',
          text: 'Chu vi luôn dài hơn 3 lần đường kính một chút, khoảng 3,14 lần.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính chu vi hình tròn, ta lấy đường kính nhân với số 3,14. C = d × 3,14.',
        },
        {
          type: 'p',
          text: 'Nếu biết bán kính, em lấy bán kính nhân 2 rồi nhân với số 3,14: C = r × 2 × 3,14.',
        },
      ],
    },
    {
      heading: 'Diện tích hình tròn',
      blocks: [
        {
          type: 'p',
          text: 'Cắt hình tròn thành thật nhiều phần bằng nhau rồi ghép xen kẽ, ta được một hình gần giống hình chữ nhật.',
        },
        {
          type: 'p',
          text: 'Chiều dài hình đó bằng nửa chu vi, tức là r × 3,14. Chiều rộng bằng bán kính r.',
        },
        { type: 'widget', name: 'cat-ghep' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính diện tích hình tròn, ta lấy bán kính nhân với bán kính rồi nhân với số 3,14. S = r × r × 3,14.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Nếu đề bài cho đường kính, em tìm bán kính trước: r = d : 2.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lăn bánh xe một vòng',
    instruction:
      'Em chọn bán kính bánh xe, rồi kéo tâm bánh xe hoặc bấm "Lăn một vòng". Chấm đỏ để lại vết sơn trên thước. Khi chấm đỏ chạm đất lần nữa, vết sơn dài bằng chu vi bánh xe.',
  },
  examples: [
    {
      problem: 'Tính chu vi hình tròn có đường kính 6 cm.',
      steps: ['Lấy đường kính nhân với 3,14.', '6 × 3,14 = 18,84.'],
      answer: 'Chu vi hình tròn là 18,84 cm.',
    },
    {
      problem: 'Tính chu vi hình tròn có bán kính 5 dm.',
      steps: ['Đường kính: 5 × 2 = 10 (dm).', 'Chu vi: 10 × 3,14 = 31,4 (dm).'],
      answer: 'Chu vi hình tròn là 31,4 dm.',
    },
    {
      problem: 'Tính diện tích hình tròn có bán kính 2 dm.',
      steps: ['Lấy bán kính nhân với bán kính: 2 × 2 = 4.', 'Nhân với 3,14: 4 × 3,14 = 12,56.'],
      answer: 'Diện tích hình tròn là 12,56 dm².',
    },
    {
      problem: 'Mặt bàn hình tròn có đường kính 1,2 m. Tính diện tích mặt bàn.',
      steps: ['Bán kính: 1,2 : 2 = 0,6 (m).', 'Diện tích: 0,6 × 0,6 × 3,14 = 1,1304 (m²).'],
      answer: 'Diện tích mặt bàn là 1,1304 m².',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt:
        'Hình tròn tâm O có A, B, C nằm trên đường tròn, đoạn BC đi qua O. Nối mỗi đoạn thẳng với tên gọi của nó.',
      left: ['OA', 'BC', 'AB'],
      right: ['Bán kính', 'Đường kính', 'Không phải bán kính, không phải đường kính'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Bán kính nối tâm với một điểm trên đường tròn. Đường kính đi qua tâm.'],
      solution:
        'OA nối tâm O với điểm A trên đường tròn: bán kính. BC nối hai điểm trên đường tròn và đi qua tâm: đường kính. AB không đi qua tâm nên không phải đường kính.',
    },
    {
      type: 'number',
      prompt: 'Hình tròn có bán kính 7 cm. Đường kính dài bao nhiêu xăng-ti-mét?',
      answer: 14,
      unit: 'cm',
      hints: ['Đường kính dài gấp 2 lần bán kính.'],
      solution: 'd = 7 × 2 = 14. Đường kính dài 14 cm.',
    },
    {
      type: 'number',
      prompt: 'Tính chu vi hình tròn có đường kính 5 cm.',
      answer: 15.7,
      unit: 'cm',
      hints: ['C = d × 3,14.'],
      solution: '5 × 3,14 = 15,7. Chu vi là 15,7 cm.',
    },
    {
      type: 'number',
      prompt: 'Tính chu vi hình tròn có bán kính 2,5 dm.',
      answer: 15.7,
      unit: 'dm',
      hints: ['Tìm đường kính trước: 2,5 × 2.', 'Rồi nhân đường kính với 3,14.'],
      solution: 'd = 2,5 × 2 = 5 (dm). C = 5 × 3,14 = 15,7 (dm).',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích hình tròn có bán kính 3 cm.',
      answer: 28.26,
      unit: 'cm²',
      hints: ['S = r × r × 3,14.'],
      solution: '3 × 3 × 3,14 = 9 × 3,14 = 28,26. Diện tích là 28,26 cm².',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích hình tròn có đường kính 10 m.',
      answer: 78.5,
      unit: 'm²',
      hints: ['Đề cho đường kính. Em tìm bán kính trước: 10 : 2.'],
      solution: 'r = 10 : 2 = 5 (m). S = 5 × 5 × 3,14 = 78,5 (m²).',
    },
    {
      type: 'choice',
      prompt: 'Hình tròn có bán kính 4 cm. Diện tích hình tròn là bao nhiêu?',
      options: ['50,24 cm²', '25,12 cm²', '12,56 cm²', '200,96 cm²'],
      answer: 0,
      hints: ['Diện tích là bán kính nhân bán kính, không phải bán kính nhân 2.'],
      solution:
        'S = 4 × 4 × 3,14 = 50,24 (cm²). Số 25,12 là chu vi (4 × 2 × 3,14), không phải diện tích.',
    },
    {
      type: 'number',
      prompt:
        'Bánh xe đạp có đường kính 0,65 m. Bánh xe lăn trên mặt đất được 10 vòng. Xe đạp đi được bao nhiêu mét?',
      answer: 20.41,
      unit: 'm',
      hints: [
        'Lăn một vòng, bánh xe đi được quãng đường bằng chu vi bánh xe.',
        'Tính chu vi rồi nhân với 10.',
      ],
      solution: 'Chu vi bánh xe: 0,65 × 3,14 = 2,041 (m). Lăn 10 vòng: 2,041 × 10 = 20,41 (m).',
    },
  ],
  takeaways: [
    'Bán kính nối tâm với một điểm trên đường tròn; đường kính đi qua tâm, d = r × 2.',
    'Chu vi hình tròn: C = d × 3,14 = r × 2 × 3,14.',
    'Diện tích hình tròn: S = r × r × 3,14.',
  ],
};
