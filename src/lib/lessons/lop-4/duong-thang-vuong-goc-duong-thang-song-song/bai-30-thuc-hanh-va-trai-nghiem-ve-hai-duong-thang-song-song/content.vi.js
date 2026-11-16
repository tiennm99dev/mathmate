/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vẽ đường thẳng đi qua một điểm và song song với một đường thẳng cho trước bằng ê ke và thước: vẽ đường thẳng MN qua điểm và vuông góc với AB, rồi vẽ đường thẳng CD qua điểm và vuông góc với MN. Làm bộ xếp hình và thiết kế đường chạy.',
  intro:
    'Các làn của đường chạy song song với nhau. Hôm nay em dùng ê ke và thước vẽ hai đường thẳng song song, rồi làm bộ xếp hình và thiết kế đường chạy nhé!',
  objectives: [
    'Vẽ được đường thẳng đi qua một điểm và song song với một đường thẳng cho trước bằng ê ke và thước.',
    'Hiểu vì sao cách vẽ đó cho hai đường thẳng song song.',
    'Dùng hai đường thẳng song song để làm bộ xếp hình, thiết kế đường chạy.',
  ],
  sections: [
    {
      heading: 'Vẽ đường thẳng song song bằng ê ke',
      blocks: [
        {
          type: 'p',
          text: 'Cho đường thẳng AB và điểm H nằm ngoài AB. Em vẽ đường thẳng CD đi qua H và song song với AB.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đường thẳng MN đi qua điểm H và vuông góc với đường thẳng AB.',
            'Vẽ đường thẳng CD đi qua điểm H và vuông góc với đường thẳng MN.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đường thẳng CD đi qua H và song song với đường thẳng AB.',
        },
        {
          type: 'p',
          text: 'Mỗi bước, em vẽ đường vuông góc như bài trước: đặt một cạnh góc vuông của ê ke trên đường thẳng, trượt ê ke cho cạnh kia gặp điểm H, rồi vẽ theo cạnh đó.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao song song?',
          text: 'AB và CD cùng vuông góc với MN. Kéo dài mãi, chúng không bao giờ cắt nhau, giống hai cạnh đối diện của hình chữ nhật.',
        },
      ],
    },
    {
      heading: 'Làm bộ xếp hình bằng bìa',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: làm một bộ xếp hình bằng bìa, các mảnh có cạnh song song và vuông góc.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: một tấm bìa hình vuông, thước kẻ, ê ke, bút chì, kéo (nhờ người lớn giúp khi cắt).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Trên tấm bìa, vẽ các đường thẳng song song với một cạnh của tấm bìa, dùng ê ke và thước.',
            'Vẽ thêm vài đường thẳng vuông góc với các đường vừa vẽ, chia tấm bìa thành nhiều mảnh.',
            'Tô màu các mảnh, rồi cắt rời theo các đường đã vẽ.',
            'Dùng các mảnh ghép thành đồ vật, con vật theo ý thích.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: em cho cả lớp xem hình đã ghép và chỉ ra hai cạnh song song, hai cạnh vuông góc trên các mảnh.',
        },
      ],
    },
    {
      heading: 'Thiết kế đường chạy',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: cùng nhóm vẽ bản thiết kế một đường chạy có các làn song song, rồi kẻ đường chạy ở sân trường.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: giấy, thước kẻ, ê ke, bút chì; ở sân trường: phấn, dây dài, thước dây.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Trên giấy, vẽ một đường thẳng làm mép đường chạy.',
            'Vẽ các đường thẳng song song với nó, cách đều nhau, để chia thành các làn chạy.',
            'Vẽ một vạch xuất phát và một vạch đích vuông góc với các làn.',
            'Cùng thầy cô kẻ đường chạy ở sân trường theo bản thiết kế, dùng dây căng thẳng để kẻ.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: nhóm em làm những việc gì, dùng những dụng cụ nào? Các làn chạy có song song với nhau không?',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai bước vẽ đường song song',
    instruction:
      'Bước 1: em trượt ê ke dọc AB (kéo nút màu nâu hoặc bấm phím mũi tên) cho cạnh kia gặp H, rồi bấm "Vẽ theo cạnh ê ke" để có MN. Bước 2: em trượt ê ke dọc MN đến điểm H, rồi vẽ CD.',
  },
  examples: [
    {
      problem:
        'Cho đường thẳng AB và điểm H nằm ngoài AB. Vẽ đường thẳng CD đi qua H và song song với AB.',
      steps: [
        'Đặt một cạnh góc vuông của ê ke trên AB, trượt ê ke cho cạnh kia gặp H. Vẽ đường thẳng MN qua H, vuông góc với AB.',
        'Đặt một cạnh góc vuông của ê ke trên MN, trượt ê ke cho đỉnh góc vuông trùng với H. Vẽ đường thẳng CD qua H, vuông góc với MN.',
      ],
      answer: 'Đường thẳng CD đi qua H và song song với AB.',
    },
    {
      problem: 'Vì sao đường thẳng CD vừa vẽ song song với AB?',
      steps: [
        'AB vuông góc với MN, CD cũng vuông góc với MN.',
        'Giống hai cạnh đối diện của hình chữ nhật, AB và CD kéo dài mãi cũng không cắt nhau.',
      ],
      answer: 'CD song song với AB.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Em xếp các bước vẽ đường thẳng CD đi qua H và song song với AB cho đúng thứ tự.',
      items: [
        'Vẽ đường thẳng CD đi qua H và vuông góc với MN.',
        'Vẽ đường thẳng MN đi qua H và vuông góc với AB.',
      ],
      answer: [1, 0],
      hints: ['Em cần có đường thẳng MN trước rồi mới vẽ CD vuông góc với MN.'],
      solution: 'Bước 1: vẽ MN qua H, vuông góc với AB. Bước 2: vẽ CD qua H, vuông góc với MN.',
    },
    {
      type: 'choice',
      prompt: 'Để vẽ đường thẳng song song với AB, em cần những dụng cụ nào?',
      options: ['Ê ke và thước kẻ', 'Compa và cục tẩy', 'Chỉ cần bút chì'],
      answer: 0,
      hints: ['Em phải vẽ hai lần đường vuông góc.'],
      solution: 'Em dùng ê ke để vẽ các đường vuông góc và thước kẻ để kẻ thẳng.',
    },
    {
      type: 'choice',
      prompt:
        'Đường thẳng MN vuông góc với AB. Đường thẳng CD vuông góc với MN. Hai đường thẳng AB và CD thế nào?',
      options: ['Song song với nhau', 'Vuông góc với nhau', 'Cắt nhau'],
      answer: 0,
      hints: ['AB và CD cùng vuông góc với MN, giống hai cạnh đối diện của hình chữ nhật.'],
      solution: 'AB và CD cùng vuông góc với MN, nên AB song song với CD.',
    },
    {
      type: 'choice',
      prompt: 'Ở bước 2, em đặt cạnh góc vuông của ê ke lên đường thẳng nào?',
      options: ['Đường thẳng MN', 'Đường thẳng AB', 'Không cần đặt lên đường nào'],
      answer: 0,
      hints: ['Ở bước 2, em vẽ CD vuông góc với đường thẳng nào?'],
      solution: 'Ở bước 2, CD vuông góc với MN, nên em đặt một cạnh góc vuông của ê ke lên MN.',
    },
    {
      type: 'multi',
      prompt: 'Trên đường chạy, em chọn các cặp vạch song song với nhau.',
      options: [
        'Hai vạch chia làn số 1 và làn số 2',
        'Hai vạch chia làn số 3 và làn số 4',
        'Vạch xuất phát và vạch chia làn',
        'Vạch xuất phát và vạch đích',
      ],
      answers: [0, 1, 3],
      hints: [
        'Các vạch chia làn song song với nhau. Vạch xuất phát và vạch đích vuông góc với các làn.',
      ],
      solution:
        'Các vạch chia làn song song với nhau. Vạch xuất phát và vạch đích cùng vuông góc với các làn, nên chúng song song với nhau. Vạch xuất phát vuông góc với vạch chia làn.',
    },
  ],
  takeaways: [
    'Muốn vẽ đường thẳng CD qua H song song với AB: vẽ MN qua H vuông góc với AB, rồi vẽ CD qua H vuông góc với MN.',
    'Mỗi bước là một lần vẽ đường vuông góc bằng ê ke: đặt ê ke, trượt cho cạnh kia gặp H, rồi vẽ.',
  ],
};
