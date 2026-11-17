/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Xăng-ti-mét khối (cm³) là thể tích hình lập phương cạnh 1 cm, đề-xi-mét khối (dm³) là thể tích hình lập phương cạnh 1 dm; 1 dm³ = 1 000 cm³.',
  intro:
    'Muốn đo thể tích, em cần một đơn vị đo. Hôm nay em làm quen với xăng-ti-mét khối và đề-xi-mét khối. Em xếp đầy một khối 1 dm³ bằng các khối 1 cm³ nhé!',
  objectives: [
    'Biết xăng-ti-mét khối, đề-xi-mét khối; đọc và viết được cm³, dm³.',
    'Biết 1 dm³ = 1 000 cm³.',
    'Đổi được số đo thể tích giữa dm³ và cm³, kể cả số thập phân.',
  ],
  sections: [
    {
      heading: 'Xăng-ti-mét khối và đề-xi-mét khối',
      blocks: [
        {
          type: 'p',
          text: 'Để đo thể tích, người ta có thể dùng đơn vị xăng-ti-mét khối, đề-xi-mét khối.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Xăng-ti-mét khối là thể tích của hình lập phương có cạnh dài 1 cm. Xăng-ti-mét khối viết tắt là cm³.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Đề-xi-mét khối là thể tích của hình lập phương có cạnh dài 1 dm. Đề-xi-mét khối viết tắt là dm³.',
        },
        {
          type: 'table',
          head: ['Viết', 'Đọc'],
          rows: [
            ['15 cm³', 'mười lăm xăng-ti-mét khối'],
            ['12,5 cm³', 'mười hai phẩy năm xăng-ti-mét khối'],
            ['208 dm³', 'hai trăm linh tám đề-xi-mét khối'],
          ],
        },
      ],
    },
    {
      heading: '1 dm³ = 1 000 cm³',
      blocks: [
        {
          type: 'p',
          text: 'Hình lập phương cạnh 1 dm = 10 cm. Một hàng có 10 khối 1 cm³. Một lớp có 10 hàng, tức là 100 khối. Có 10 lớp như thế.',
        },
        {
          type: 'p',
          text: '10 × 10 × 10 = 1 000. Hình lập phương cạnh 1 dm gồm 1 000 hình lập phương cạnh 1 cm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 dm³ = 1 000 cm³. Ngược lại, 1 000 cm³ = 1 dm³ và 1 cm³ = $\\dfrac{1}{1\\,000}$ dm³ = 0,001 dm³.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: '1 l = 1 dm³ = 1 000 cm³. Chai nước 1 l chứa vừa đủ 1 dm³ nước.',
        },
      ],
    },
    {
      heading: 'Đổi đơn vị',
      blocks: [
        {
          type: 'p',
          text: 'Đổi dm³ ra cm³: nhân với 1 000. Ví dụ: 2 dm³ = 2 000 cm³; 3,9 dm³ = 3 900 cm³.',
        },
        {
          type: 'p',
          text: 'Đổi cm³ ra dm³: chia cho 1 000. Ví dụ: 5 000 cm³ = 5 dm³; 250 cm³ = 0,25 dm³.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hai đơn vị đo thể tích liền nhau gấp nhau 1 000 lần, không phải 10 lần hay 100 lần.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp đầy khối 1 dm³',
    instruction:
      'Em thêm từng khối, từng hàng hoặc từng lớp khối 1 cm³ vào khối 1 dm³. Đếm xem cần bao nhiêu khối thì đầy.',
  },
  examples: [
    {
      problem: '5 dm³ 6 cm³ = ? cm³',
      steps: ['5 dm³ = 5 × 1 000 cm³ = 5 000 cm³.', '5 000 cm³ + 6 cm³ = 5 006 cm³.'],
      answer: '5 dm³ 6 cm³ = 5 006 cm³.',
    },
    {
      problem: '8 700 cm³ = ? dm³',
      steps: ['Cứ 1 000 cm³ là 1 dm³.', '8 700 : 1 000 = 8,7.'],
      answer: '8 700 cm³ = 8,7 dm³.',
    },
    {
      problem:
        'Rô-bốt có 2 chai nước, mỗi chai 0,5 l. Rô-bốt rót nước vào khay làm đá, mỗi ô chứa 8 cm³ nước. Rô-bốt rót được nhiều nhất bao nhiêu ô?',
      steps: ['Hai chai có 0,5 × 2 = 1 (l) nước.', '1 l = 1 dm³ = 1 000 cm³.', '1 000 : 8 = 125.'],
      answer: 'Rô-bốt rót được nhiều nhất 125 ô.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt:
        'Việt xếp các khối 1 cm³ thành một hình như dưới đây. Hình đó có thể tích bao nhiêu xăng-ti-mét khối?',
      picture: 'cube',
      answer: 9,
      groups: 3,
      choices: [6, 9, 12],
      hints: ['Mỗi khối là 1 cm³. Em đếm số khối.', 'Có 3 lớp, mỗi lớp 3 khối.'],
      solution: '3 × 3 = 9 khối. Thể tích hình là 9 cm³.',
    },
    {
      type: 'number',
      prompt: '2 dm³ = ? cm³',
      answer: 2000,
      unit: 'cm³',
      hints: ['1 dm³ = 1 000 cm³.'],
      solution: '2 dm³ = 2 × 1 000 cm³ = 2 000 cm³.',
    },
    {
      type: 'number',
      prompt: '5 000 cm³ = ? dm³',
      answer: 5,
      unit: 'dm³',
      hints: ['Cứ 1 000 cm³ là 1 dm³.'],
      solution: '5 000 : 1 000 = 5. Vậy 5 000 cm³ = 5 dm³.',
    },
    {
      type: 'number',
      prompt: '3,9 dm³ = ? cm³',
      answer: 3900,
      unit: 'cm³',
      hints: ['Nhân 3,9 với 1 000: dời dấu phẩy sang phải ba chữ số.'],
      solution: '3,9 × 1 000 = 3 900. Vậy 3,9 dm³ = 3 900 cm³.',
    },
    {
      type: 'number',
      prompt: '250 cm³ = ? dm³',
      answer: 0.25,
      unit: 'dm³',
      hints: ['Chia 250 cho 1 000: dời dấu phẩy sang trái ba chữ số.'],
      solution: '250 : 1 000 = 0,25. Vậy 250 cm³ = 0,25 dm³.',
    },
    {
      type: 'number',
      prompt: '12,5 cm³ + 7,5 cm³ = ?',
      answer: 20,
      unit: 'cm³',
      hints: ['Cộng như cộng hai số thập phân, rồi viết đơn vị cm³.'],
      solution: '12,5 + 7,5 = 20. Vậy 12,5 cm³ + 7,5 cm³ = 20 cm³.',
    },
    {
      type: 'number',
      prompt: '16 dm³ × 4 = ?',
      answer: 64,
      unit: 'dm³',
      hints: ['Em tính 16 × 4 rồi viết đơn vị dm³.'],
      solution: '16 × 4 = 64. Vậy 16 dm³ × 4 = 64 dm³.',
    },
    {
      type: 'choice',
      prompt: 'Một chai nước chứa 0,5 l. Thể tích nước trong chai là bao nhiêu?',
      options: ['500 cm³', '50 cm³', '5 000 cm³', '5 cm³'],
      answer: 0,
      hints: ['1 l = 1 dm³ = 1 000 cm³.'],
      solution: '0,5 l = 0,5 dm³ = 0,5 × 1 000 cm³ = 500 cm³.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi vật với thể tích phù hợp.',
      left: ['Con xúc xắc nhỏ', 'Hộp sữa 1 l', 'Bình nước 20 l'],
      right: ['1 cm³', '1 dm³', '20 dm³', '20 cm³'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['1 l = 1 dm³.', 'Con xúc xắc nhỏ có cạnh khoảng 1 cm.'],
      solution: 'Con xúc xắc nhỏ khoảng 1 cm³. Hộp sữa 1 l là 1 dm³. Bình nước 20 l là 20 dm³.',
    },
  ],
  takeaways: [
    'cm³ là thể tích hình lập phương cạnh 1 cm; dm³ là thể tích hình lập phương cạnh 1 dm.',
    '1 dm³ = 1 000 cm³; 1 cm³ = 0,001 dm³.',
    'Đổi dm³ ra cm³ thì nhân với 1 000, đổi cm³ ra dm³ thì chia cho 1 000.',
  ],
};
