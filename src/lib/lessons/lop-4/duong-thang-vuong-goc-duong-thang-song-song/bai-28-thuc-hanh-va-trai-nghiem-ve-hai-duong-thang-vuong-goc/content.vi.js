/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vẽ đường thẳng đi qua một điểm và vuông góc với một đường thẳng cho trước bằng ê ke: đặt một cạnh góc vuông của ê ke trên đường thẳng, trượt ê ke cho cạnh kia gặp điểm, rồi vẽ theo cạnh đó. Làm khung ảnh và diều giấy.',
  intro:
    'Rô-bốt đặt hai que gỗ vuông góc để làm khung ảnh. Hôm nay em dùng ê ke vẽ hai đường thẳng vuông góc, rồi làm khung ảnh và diều giấy nhé!',
  objectives: [
    'Vẽ được đường thẳng đi qua một điểm và vuông góc với một đường thẳng cho trước bằng ê ke.',
    'Vẽ được khi điểm nằm trên đường thẳng và khi điểm nằm ngoài đường thẳng.',
    'Dùng hai đường thẳng vuông góc để làm khung ảnh, diều giấy.',
  ],
  sections: [
    {
      heading: 'Vẽ đường thẳng vuông góc bằng ê ke',
      blocks: [
        {
          type: 'p',
          text: 'Cho đường thẳng AB và điểm M. Em vẽ đường thẳng CD đi qua M và vuông góc với AB.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt một cạnh góc vuông của ê ke trùng với đường thẳng AB.',
            'Trượt ê ke dọc theo AB đến khi cạnh góc vuông thứ hai của ê ke gặp điểm M.',
            'Giữ yên ê ke, vẽ đường thẳng CD theo cạnh góc vuông thứ hai.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đường thẳng CD đi qua M và vuông góc với AB. Cách vẽ này dùng được khi M nằm trên AB và cả khi M nằm ngoài AB.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Vẽ xong, em đặt lại ê ke ở chỗ hai đường thẳng cắt nhau để kiểm tra góc vuông.',
        },
      ],
    },
    {
      heading: 'Làm khung ảnh',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: làm một khung ảnh hình chữ nhật có các cạnh vuông góc với nhau.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: 4 que gỗ (hoặc que kem), keo dán, dây buộc, tờ giấy, thước kẻ, ê ke, bút chì.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Trên tờ giấy, em vẽ một đường thẳng. Dùng ê ke vẽ hai đường thẳng vuông góc với nó.',
            'Vẽ thêm một đường thẳng vuông góc với hai đường vừa vẽ, ta được một hình chữ nhật.',
            'Đặt các que gỗ lên bốn cạnh của hình, dán hoặc buộc chặt bốn góc.',
            'Dùng ê ke kiểm tra bốn góc của khung. Trang trí khung theo ý thích.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: em cho cả lớp xem khung ảnh và chỉ ra các cặp que vuông góc với nhau.',
        },
      ],
    },
    {
      heading: 'Làm diều giấy',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: làm một chiếc diều có hai nan tre vuông góc với nhau.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: 2 nan tre dài ngắn khác nhau, giấy báo, dây, keo dán, kéo (nhờ người lớn giúp khi cắt).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ trên giấy báo hai đường thẳng vuông góc với nhau, dùng ê ke để vẽ.',
            'Đặt hai nan tre theo hai đường thẳng đó, buộc chặt chỗ hai nan gặp nhau.',
            'Nối bốn đầu nan bằng dây, dán giấy báo lên khung, cắt bỏ phần thừa.',
            'Buộc dây diều và trang trí diều theo ý thích.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: diều của em có hai nan vuông góc với nhau không? Em kiểm tra bằng ê ke.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trượt ê ke, vẽ đường vuông góc',
    instruction:
      'Em kéo nút màu nâu trên ê ke (hoặc bấm phím mũi tên) để trượt ê ke dọc đường thẳng AB. Khi cạnh góc vuông thứ hai gặp điểm M, em bấm "Vẽ theo cạnh ê ke".',
  },
  examples: [
    {
      problem: 'Điểm H nằm trên đường thẳng AB. Vẽ đường thẳng CD đi qua H và vuông góc với AB.',
      steps: [
        'Đặt một cạnh góc vuông của ê ke trùng với đường thẳng AB.',
        'Trượt ê ke dọc AB đến khi đỉnh góc vuông của ê ke trùng với điểm H.',
        'Vẽ đường thẳng CD theo cạnh góc vuông thứ hai của ê ke.',
      ],
      answer: 'Đường thẳng CD đi qua H và vuông góc với AB.',
    },
    {
      problem: 'Điểm M nằm ngoài đường thẳng CD. Vẽ đường thẳng HK đi qua M và vuông góc với CD.',
      steps: [
        'Đặt một cạnh góc vuông của ê ke trùng với đường thẳng CD.',
        'Trượt ê ke dọc CD đến khi cạnh góc vuông thứ hai của ê ke gặp điểm M.',
        'Giữ yên ê ke, vẽ đường thẳng HK theo cạnh đó.',
      ],
      answer: 'Đường thẳng HK đi qua M và vuông góc với CD.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Em xếp các bước vẽ đường thẳng CD đi qua M và vuông góc với AB cho đúng thứ tự.',
      items: [
        'Vẽ đường thẳng CD theo cạnh góc vuông thứ hai.',
        'Đặt một cạnh góc vuông của ê ke trùng với AB.',
        'Trượt ê ke đến khi cạnh góc vuông thứ hai gặp điểm M.',
      ],
      answer: [1, 2, 0],
      hints: ['Đầu tiên em đặt ê ke lên đường thẳng AB. Vẽ là bước cuối cùng.'],
      solution:
        'Đặt một cạnh góc vuông của ê ke trùng với AB, trượt ê ke đến khi cạnh kia gặp M, rồi vẽ CD theo cạnh đó.',
    },
    {
      type: 'choice',
      prompt: 'Khi vẽ đường thẳng vuông góc với AB, em đặt cạnh nào của ê ke trùng với AB?',
      options: ['Một cạnh góc vuông', 'Cạnh dài nhất, đối diện góc vuông', 'Cạnh nào cũng được'],
      answer: 0,
      hints: ['Đường cần vẽ phải tạo với AB một góc vuông.'],
      solution:
        'Em đặt một cạnh góc vuông trùng với AB. Cạnh góc vuông thứ hai sẽ vuông góc với AB, em vẽ theo cạnh đó.',
    },
    {
      type: 'choice',
      prompt:
        'Điểm M nằm ngoài đường thẳng AB. Có thể vẽ đường thẳng đi qua M và vuông góc với AB không?',
      options: ['Có, dùng ê ke như khi M nằm trên AB', 'Không vẽ được'],
      answer: 0,
      hints: ['Em trượt ê ke dọc AB. Cạnh góc vuông thứ hai có gặp được M không?'],
      solution:
        'Có. Em trượt ê ke dọc AB đến khi cạnh góc vuông thứ hai gặp M, rồi vẽ theo cạnh đó.',
    },
    {
      type: 'choice',
      prompt: 'Vẽ xong, em kiểm tra hai đường thẳng có vuông góc không bằng cách nào?',
      options: [
        'Đặt góc vuông của ê ke vào chỗ hai đường thẳng cắt nhau',
        'Đo độ dài hai đường thẳng',
        'Đếm số điểm trên hai đường thẳng',
      ],
      answer: 0,
      hints: ['Hai đường thẳng vuông góc tạo thành góc vuông.'],
      solution: 'Em đặt góc vuông của ê ke vào chỗ hai đường thẳng cắt nhau để kiểm tra góc vuông.',
    },
    {
      type: 'multi',
      prompt: 'Khi làm khung ảnh hình chữ nhật, em chọn các cặp que vuông góc với nhau.',
      options: [
        'Que trên và que bên trái',
        'Que bên trái và que dưới',
        'Que trên và que dưới',
        'Que bên trái và que bên phải',
      ],
      answers: [0, 1],
      hints: ['Hai que gặp nhau ở một góc của khung thì vuông góc với nhau.'],
      solution:
        'Que trên và que bên trái, que bên trái và que dưới gặp nhau ở góc vuông. Que trên và que dưới, que trái và que phải nằm đối diện nhau, không gặp nhau.',
    },
  ],
  takeaways: [
    'Muốn vẽ đường thẳng qua M vuông góc với AB: đặt một cạnh góc vuông của ê ke trên AB, trượt ê ke cho cạnh kia gặp M, rồi vẽ theo cạnh đó.',
    'Em vẽ được cả khi M nằm trên AB và khi M nằm ngoài AB.',
  ],
};
