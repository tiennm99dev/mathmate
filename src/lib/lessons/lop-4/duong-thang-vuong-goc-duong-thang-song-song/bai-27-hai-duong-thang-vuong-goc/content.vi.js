/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hai đường thẳng vuông góc với nhau tạo thành bốn góc vuông có chung đỉnh. Em dùng ê ke để kiểm tra hai đường thẳng có vuông góc với nhau hay không.',
  intro:
    'Hai mép cạnh nhau của quyển vở gặp nhau thành một góc vuông. Hôm nay em học hai đường thẳng vuông góc và dùng ê ke để kiểm tra nhé!',
  objectives: [
    'Nhận biết hai đường thẳng vuông góc với nhau.',
    'Dùng ê ke để kiểm tra hai đường thẳng có vuông góc với nhau hay không.',
    'Tìm được hình ảnh hai đường thẳng vuông góc quanh em.',
  ],
  sections: [
    {
      heading: 'Hai đường thẳng vuông góc',
      blocks: [
        {
          type: 'p',
          text: 'Em vẽ hình chữ nhật ABCD. Kéo dài cạnh DC và cạnh BC, ta được hai đường thẳng DC và BC.',
        },
        {
          type: 'p',
          text: 'Hai đường thẳng DC và BC cắt nhau tại C. Chúng tạo thành bốn góc, đều là góc vuông.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai đường thẳng vuông góc',
          text: 'Hai đường thẳng BC và DC vuông góc với nhau. Chúng tạo thành bốn góc vuông có chung đỉnh C.',
        },
        {
          type: 'p',
          text: 'Nếu hai đường thẳng cắt nhau mà góc tạo thành không phải góc vuông, thì hai đường thẳng đó không vuông góc với nhau.',
        },
      ],
    },
    {
      heading: 'Kiểm tra bằng ê ke',
      blocks: [
        {
          type: 'p',
          text: 'Ê ke có một góc vuông. Em dùng góc vuông đó để kiểm tra.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt đỉnh góc vuông của ê ke trùng với chỗ hai đường thẳng cắt nhau.',
            'Đặt một cạnh góc vuông của ê ke nằm trên một đường thẳng.',
            'Nhìn đường thẳng kia: nếu nó nằm trùng cạnh góc vuông còn lại của ê ke, hai đường thẳng vuông góc với nhau.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đường thẳng kia nằm trùng cạnh ê ke: vuông góc. Nằm trong hoặc nằm ngoài góc vuông của ê ke: không vuông góc.',
        },
      ],
    },
    {
      heading: 'Quanh em',
      blocks: [
        {
          type: 'p',
          text: 'Hai mép cạnh nhau của quyển vở, của mặt bàn, của bảng lớp học đều vuông góc với nhau.',
        },
        {
          type: 'p',
          text: 'Không có ê ke, em gấp đôi tờ giấy sao cho hai phần của mép giấy trùng nhau. Nếp gấp vuông góc với mép giấy.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xoay đường thẳng CD',
    instruction:
      'Em kéo điểm D (hoặc bấm phím mũi tên) để xoay đường thẳng CD quanh O. Khi góc đỉnh O là 90°, hai đường thẳng vuông góc. Bấm "Đặt ê ke" để kiểm tra. Sau đó em chọn "Xếp hình vào nhóm".',
  },
  examples: [
    {
      problem:
        'Hình chữ nhật ABCD. Kéo dài cạnh DC và cạnh BC. Hai đường thẳng DC và BC có vuông góc với nhau không?',
      steps: [
        'Hình chữ nhật có bốn góc vuông, nên góc đỉnh C là góc vuông.',
        'Hai đường thẳng DC và BC cắt nhau tại C, tạo thành góc vuông.',
        'Kéo dài ra, chúng tạo thành bốn góc vuông chung đỉnh C.',
      ],
      answer: 'Hai đường thẳng DC và BC vuông góc với nhau.',
    },
    {
      problem: 'Hai đường thẳng HA và HC cắt nhau tại H. Em kiểm tra xem chúng có vuông góc không.',
      steps: [
        'Em đặt đỉnh góc vuông của ê ke trùng với điểm H.',
        'Em đặt một cạnh góc vuông của ê ke nằm trên đường thẳng HA.',
        'Đường thẳng HC nằm trong góc vuông của ê ke, không trùng cạnh ê ke.',
      ],
      answer: 'Hai đường thẳng HA và HC không vuông góc với nhau.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hai đường thẳng vuông góc với nhau tạo thành mấy góc vuông?',
      options: ['4 góc vuông', '2 góc vuông', '1 góc vuông', '3 góc vuông'],
      answer: 0,
      hints: ['Em nhìn chỗ hai đường thẳng cắt nhau. Đếm các góc ở đó.'],
      solution: 'Hai đường thẳng vuông góc tạo thành 4 góc vuông có chung đỉnh.',
    },
    {
      type: 'choice',
      prompt: 'Em dùng dụng cụ nào để kiểm tra hai đường thẳng có vuông góc với nhau không?',
      options: ['Ê ke', 'Compa', 'Bút chì', 'Cục tẩy'],
      answer: 0,
      hints: ['Dụng cụ đó có một góc vuông.'],
      solution: 'Ê ke có một góc vuông, nên em dùng ê ke để kiểm tra.',
    },
    {
      type: 'multi',
      prompt: 'Hình chữ nhật ABCD. Em chọn tất cả các cặp cạnh vuông góc với nhau.',
      options: ['AB và AD', 'AB và BC', 'BC và CD', 'CD và DA', 'AB và CD', 'AD và BC'],
      answers: [0, 1, 2, 3],
      hints: [
        'Hình chữ nhật có bốn góc vuông. Hai cạnh gặp nhau ở một góc vuông thì vuông góc với nhau.',
      ],
      solution:
        'Bốn góc A, B, C, D đều vuông, nên AB và AD, AB và BC, BC và CD, CD và DA vuông góc với nhau. AB và CD, AD và BC là hai cạnh đối diện, không gặp nhau.',
    },
    {
      type: 'choice',
      prompt:
        'Tứ giác ABCD có góc đỉnh A và góc đỉnh D là góc vuông, góc đỉnh B và góc đỉnh C không vuông. Cặp cạnh nào vuông góc với nhau?',
      options: ['AB và AD', 'AB và BC', 'BC và CD', 'AB và CD'],
      answer: 0,
      hints: ['Em tìm hai cạnh gặp nhau ở góc vuông đỉnh A hoặc đỉnh D.'],
      solution:
        'Góc đỉnh A vuông, nên AB và AD vuông góc với nhau. (DA và DC cũng vuông góc vì góc đỉnh D vuông.)',
    },
    {
      type: 'choice',
      prompt: 'Hai đường thẳng cắt nhau, một góc tạo thành là 60°. Hai đường thẳng đó thế nào?',
      options: ['Không vuông góc với nhau', 'Vuông góc với nhau'],
      answer: 0,
      hints: ['Góc vuông là 90°. Em so sánh 60° với 90°.'],
      solution:
        '60° bé hơn 90°, góc đó là góc nhọn, không phải góc vuông. Hai đường thẳng không vuông góc với nhau.',
    },
    {
      type: 'multi',
      prompt: 'Em chọn tất cả các hình ảnh có hai đường thẳng vuông góc với nhau.',
      options: [
        'Hai mép cạnh nhau của quyển vở',
        'Hai mép cạnh nhau của mặt bàn hình chữ nhật',
        'Hai kim đồng hồ lúc 3 giờ',
        'Hai kim đồng hồ lúc 2 giờ',
        'Hai lưỡi kéo đang mở hẹp',
      ],
      answers: [0, 1, 2],
      hints: ['Em tìm chỗ có góc vuông. Lúc 3 giờ, hai kim đồng hồ tạo thành góc 90°.'],
      solution:
        'Mép vở, mép bàn và hai kim lúc 3 giờ tạo thành góc vuông. Lúc 2 giờ hai kim tạo góc 60°, kéo mở hẹp tạo góc nhọn: không vuông góc.',
    },
    {
      type: 'choice',
      prompt: 'Đồng hồ chỉ mấy giờ thì hai kim đồng hồ vuông góc với nhau?',
      options: ['3 giờ', '6 giờ', '12 giờ', '1 giờ'],
      answer: 0,
      hints: ['Hai kim phải tạo thành góc vuông, 90°.'],
      solution:
        'Lúc 3 giờ hai kim tạo thành góc vuông. Lúc 6 giờ là góc bẹt, lúc 12 giờ hai kim trùng nhau, lúc 1 giờ là góc nhọn.',
    },
    {
      type: 'match',
      prompt:
        'Em đặt ê ke lên một đường thẳng, đỉnh góc vuông ở chỗ hai đường thẳng cắt nhau. Em nối điều em thấy với kết luận.',
      left: [
        'Đường thẳng kia trùng cạnh ê ke',
        'Đường thẳng kia nằm trong góc vuông của ê ke',
        'Đường thẳng kia nằm ngoài góc vuông của ê ke',
      ],
      right: [
        'Góc vuông: hai đường thẳng vuông góc',
        'Góc nhọn: không vuông góc',
        'Góc tù: không vuông góc',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Trùng cạnh ê ke là đúng góc vuông. Trong góc vuông là bé hơn, ngoài là lớn hơn.'],
      solution:
        'Trùng cạnh ê ke: góc vuông, hai đường thẳng vuông góc. Nằm trong: góc nhọn. Nằm ngoài: góc tù. Cả hai trường hợp sau đều không vuông góc.',
    },
  ],
  takeaways: [
    'Hai đường thẳng vuông góc với nhau tạo thành bốn góc vuông có chung đỉnh.',
    'Em dùng ê ke để kiểm tra hai đường thẳng có vuông góc với nhau hay không.',
  ],
};
