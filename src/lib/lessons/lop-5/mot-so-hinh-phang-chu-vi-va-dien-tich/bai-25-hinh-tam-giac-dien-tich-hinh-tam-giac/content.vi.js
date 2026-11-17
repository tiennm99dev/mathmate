/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình tam giác có ba cạnh, ba đỉnh, ba góc; tam giác nhọn, vuông, tù; đáy và chiều cao; diện tích hình tam giác bằng độ dài đáy nhân chiều cao rồi chia cho 2.',
  intro:
    'Mái nhà, lá cờ đuôi nheo, miếng bánh sandwich đều có dạng hình tam giác. Hôm nay em tìm hiểu đáy, chiều cao và cách tính diện tích hình tam giác.',
  objectives: [
    'Nhận biết hình tam giác nhọn, tam giác vuông, tam giác tù.',
    'Xác định được đáy và đường cao tương ứng của hình tam giác.',
    'Tính được diện tích hình tam giác: S = a × h : 2.',
  ],
  sections: [
    {
      heading: 'Hình tam giác',
      blocks: [
        {
          type: 'p',
          text: 'Hình tam giác ABC có ba cạnh AB, BC, CA; ba đỉnh A, B, C và ba góc: góc đỉnh A, góc đỉnh B, góc đỉnh C.',
        },
        {
          type: 'table',
          head: ['Tên gọi', 'Đặc điểm'],
          rows: [
            ['Tam giác nhọn', 'Có ba góc nhọn'],
            ['Tam giác vuông', 'Có một góc vuông và hai góc nhọn'],
            ['Tam giác tù', 'Có một góc tù và hai góc nhọn'],
          ],
          caption: 'Ba loại hình tam giác theo góc',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tam giác có ba cạnh bằng nhau gọi là tam giác đều. Ba góc của tam giác đều là ba góc nhọn bằng nhau.',
        },
      ],
    },
    {
      heading: 'Đáy và chiều cao',
      blocks: [
        {
          type: 'p',
          text: 'Trong hình tam giác ABC, em chọn cạnh BC làm đáy. Từ đỉnh A, kẻ đoạn thẳng AH vuông góc với đáy BC.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'AH là đường cao ứng với đáy BC. Độ dài AH là chiều cao của hình tam giác.',
        },
        {
          type: 'p',
          text: 'Ở tam giác tù, chân đường cao H có thể nằm trên phần kéo dài của đáy. Ở tam giác vuông, một cạnh góc vuông chính là đường cao ứng với cạnh góc vuông kia.',
        },
      ],
    },
    {
      heading: 'Diện tích hình tam giác',
      blocks: [
        {
          type: 'p',
          text: 'Vẽ hình chữ nhật có cùng đáy và cùng chiều cao với hình tam giác. Hình tam giác chỉ bằng một nửa hình chữ nhật đó.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính diện tích hình tam giác, ta lấy độ dài đáy nhân với chiều cao (cùng một đơn vị đo) rồi chia cho 2.',
        },
        {
          type: 'p',
          text: 'S = a × h : 2. Trong đó S là diện tích, a là độ dài đáy, h là chiều cao.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đáy và chiều cao phải cùng một đơn vị đo. Nếu khác đơn vị, em đổi về cùng đơn vị trước khi tính.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo đỉnh tam giác',
    instruction:
      'Em kéo đỉnh A và đỉnh C trên lưới ô vuông 1 cm. Quan sát đáy, chiều cao, loại tam giác và diện tích. Khi A chạy trên đường kẻ đứt song song với đáy, diện tích có đổi không?',
  },
  examples: [
    {
      problem: 'Tính diện tích hình tam giác có độ dài đáy 8 cm và chiều cao 6 cm.',
      steps: ['Lấy đáy nhân chiều cao: 8 × 6 = 48.', 'Chia cho 2: 48 : 2 = 24.'],
      answer: 'Diện tích hình tam giác là 24 cm².',
    },
    {
      problem: 'Tính diện tích hình tam giác có độ dài đáy 5 m và chiều cao 24 dm.',
      steps: [
        'Đổi về cùng đơn vị: 5 m = 50 dm.',
        'Diện tích: 50 × 24 : 2 = 600 (dm²).',
        'Đổi ra mét vuông: 600 dm² = 6 m².',
      ],
      answer: 'Diện tích hình tam giác là 600 dm², tức là 6 m².',
    },
    {
      problem: 'Hình tam giác vuông có hai cạnh góc vuông dài 3 cm và 4 cm. Tính diện tích.',
      steps: ['Lấy một cạnh góc vuông làm đáy, cạnh góc vuông kia là chiều cao.', '3 × 4 : 2 = 6.'],
      answer: 'Diện tích hình tam giác vuông là 6 cm².',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi loại tam giác với đặc điểm của nó.',
      left: ['Tam giác nhọn', 'Tam giác vuông', 'Tam giác tù'],
      right: ['Có ba góc nhọn', 'Có một góc vuông', 'Có một góc tù', 'Có hai góc vuông'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Tên của tam giác nói về góc đặc biệt của nó.'],
      solution:
        'Tam giác nhọn có ba góc nhọn. Tam giác vuông có một góc vuông. Tam giác tù có một góc tù. Không tam giác nào có hai góc vuông.',
    },
    {
      type: 'choice',
      prompt: 'Tam giác ABC có đường cao AH. Đoạn AH vuông góc với cạnh nào?',
      options: ['BC', 'AB', 'AC'],
      answer: 0,
      hints: ['Đường cao kẻ từ một đỉnh xuống cạnh đối diện với đỉnh đó.'],
      solution:
        'AH kẻ từ đỉnh A, vuông góc với cạnh đối diện là BC. AH là đường cao ứng với đáy BC.',
    },
    {
      type: 'number',
      prompt: 'Hình tam giác có đáy 8 cm, chiều cao 5 cm. Diện tích là bao nhiêu?',
      answer: 20,
      unit: 'cm²',
      hints: ['Lấy đáy nhân chiều cao rồi chia cho 2.'],
      solution: '8 × 5 : 2 = 20. Diện tích là 20 cm².',
    },
    {
      type: 'number',
      prompt: 'Hình tam giác có đáy 7 m, chiều cao 3 m. Diện tích là bao nhiêu?',
      answer: 10.5,
      unit: 'm²',
      hints: ['Lấy đáy nhân chiều cao rồi chia cho 2. Kết quả có thể là số thập phân.'],
      solution: '7 × 3 : 2 = 10,5. Diện tích là 10,5 m².',
    },
    {
      type: 'number',
      prompt: 'Hình tam giác có đáy 2,5 dm, chiều cao 1,2 dm. Diện tích là bao nhiêu?',
      answer: 1.5,
      unit: 'dm²',
      hints: ['Nhân hai số thập phân: 2,5 × 1,2.', 'Rồi chia kết quả cho 2.'],
      solution: '2,5 × 1,2 = 3. 3 : 2 = 1,5. Diện tích là 1,5 dm².',
    },
    {
      type: 'number',
      prompt:
        'Hình tam giác có đáy 3 dm, chiều cao 16 cm. Diện tích là bao nhiêu xăng-ti-mét vuông?',
      answer: 240,
      unit: 'cm²',
      hints: ['Đổi đáy ra xăng-ti-mét trước: 3 dm = ? cm.'],
      solution: '3 dm = 30 cm. 30 × 16 : 2 = 240. Diện tích là 240 cm².',
    },
    {
      type: 'number',
      prompt: 'Hình tam giác vuông có hai cạnh góc vuông dài 6 cm và 9 cm. Diện tích là bao nhiêu?',
      answer: 27,
      unit: 'cm²',
      hints: ['Một cạnh góc vuông là đáy, cạnh góc vuông kia là chiều cao.'],
      solution: '6 × 9 : 2 = 27. Diện tích là 27 cm².',
    },
    {
      type: 'choice',
      prompt:
        'Hai tam giác ABC và DBC có chung đáy BC. Đỉnh A và đỉnh D nằm trên cùng một đường thẳng song song với BC. Diện tích hai tam giác thế nào?',
      options: ['Bằng nhau', 'Tam giác ABC lớn hơn', 'Tam giác DBC lớn hơn'],
      answer: 0,
      hints: ['Hai tam giác có chung đáy. Chiều cao của chúng có bằng nhau không?'],
      solution:
        'Hai tam giác chung đáy BC. A và D cách BC bằng nhau nên hai chiều cao bằng nhau. Vậy diện tích hai tam giác bằng nhau.',
    },
    {
      type: 'choice',
      prompt: 'Lá cờ hình tam giác có đáy 40 cm, chiều cao 30 cm. Diện tích lá cờ là bao nhiêu?',
      options: ['600 cm²', '1 200 cm²', '70 cm²', '35 cm²'],
      answer: 0,
      hints: ['Nhân đáy với chiều cao, đừng quên chia cho 2.'],
      solution: '40 × 30 : 2 = 600. Diện tích lá cờ là 600 cm².',
    },
  ],
  takeaways: [
    'Tam giác nhọn có ba góc nhọn, tam giác vuông có một góc vuông, tam giác tù có một góc tù.',
    'Đường cao kẻ từ một đỉnh, vuông góc với đáy; độ dài của nó là chiều cao.',
    'S = a × h : 2, đáy và chiều cao cùng một đơn vị đo.',
  ],
};
