/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập một số hình phẳng: hình tam giác (nhọn, vuông, tù, đều), đáy và chiều cao; hình thang, hình thang vuông; hình bình hành, hình thoi, hình chữ nhật, hình vuông; hình tròn, tâm, bán kính, đường kính.',
  intro:
    'Em đã học hình tam giác, hình thang và hình tròn. Hôm nay em ôn lại đặc điểm của các hình phẳng đã học. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Nhận biết các hình phẳng đã học.',
    'Nhận biết tam giác nhọn, tam giác vuông, tam giác tù, tam giác đều.',
    'Chỉ ra đáy và chiều cao tương ứng của hình tam giác.',
    'Nhận biết hai đáy, hai cạnh bên của hình thang; hình thang vuông.',
    'Nêu được tâm, bán kính, đường kính của hình tròn.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Hình tam giác',
      blocks: [
        {
          type: 'table',
          head: ['Tam giác có', 'Gọi là'],
          rows: [
            ['ba góc nhọn', 'tam giác nhọn'],
            ['một góc vuông', 'tam giác vuông'],
            ['một góc tù', 'tam giác tù'],
            ['ba cạnh bằng nhau', 'tam giác đều'],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Từ một đỉnh, em kẻ đoạn thẳng vuông góc với cạnh đối diện. Đoạn thẳng đó là chiều cao, cạnh đối diện là đáy tương ứng.',
        },
        {
          type: 'p',
          text: 'Tam giác vuông: mỗi cạnh góc vuông là chiều cao ứng với cạnh góc vuông kia.',
        },
      ],
    },
    {
      heading: 'Hình tứ giác',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Đặc điểm'],
          rows: [
            ['Hình thang', 'có một cặp cạnh đối diện song song: hai đáy'],
            ['Hình thang vuông', 'có một cạnh bên vuông góc với hai đáy'],
            ['Hình bình hành', 'có hai cặp cạnh đối diện song song và bằng nhau'],
            ['Hình thoi', 'có hai cặp cạnh đối diện song song, bốn cạnh bằng nhau'],
            ['Hình chữ nhật', 'có bốn góc vuông'],
            ['Hình vuông', 'có bốn góc vuông và bốn cạnh bằng nhau'],
          ],
        },
        {
          type: 'p',
          text: 'Hình thang ABCD có AB song song với DC: AB và DC là hai đáy, AD và BC là hai cạnh bên.',
        },
      ],
    },
    {
      heading: 'Hình tròn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hình tròn tâm O: đoạn thẳng nối tâm O với một điểm trên đường tròn là bán kính. Đoạn thẳng nối hai điểm trên đường tròn và đi qua tâm là đường kính.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Trong một hình tròn, các bán kính bằng nhau. Đường kính dài gấp 2 lần bán kính.',
        },
        {
          type: 'p',
          text: 'Một điểm cách tâm ít hơn bán kính thì nằm trong hình tròn. Cách tâm nhiều hơn bán kính thì nằm ngoài hình tròn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Mỗi phần của bài được hỏi một lần, nhiều câu có hình vẽ. Sau đó, phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem:
        'Tam giác MNP có NQ vuông góc với MP (Q nằm trên MP). Nêu đáy và chiều cao tương ứng.',
      steps: ['NQ đi từ đỉnh N.', 'NQ vuông góc với cạnh MP, là cạnh đối diện với đỉnh N.'],
      answer: 'NQ là chiều cao ứng với đáy MP.',
    },
    {
      problem:
        'Trạm phát sóng A phủ sóng một hình tròn tâm A bán kính 30 m. Rô-bốt đứng ở E, cách A 40 m. Rô-bốt có nhận được sóng của trạm A không?',
      steps: [
        'Điểm cách tâm nhiều hơn bán kính thì nằm ngoài hình tròn.',
        'AE = 40 m, mà 40 m > 30 m.',
        'Vậy E nằm ngoài hình tròn tâm A.',
      ],
      answer: 'Rô-bốt không nhận được sóng của trạm A.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình tứ giác có đúng một cặp cạnh đối diện song song là hình gì?',
      options: ['Hình thang', 'Hình bình hành', 'Hình thoi', 'Hình chữ nhật'],
      answer: 0,
      hints: ['Hình bình hành, hình thoi, hình chữ nhật đều có hai cặp cạnh đối diện song song.'],
      solution: 'Hình thang có một cặp cạnh đối diện song song, đó là hai đáy.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với đặc điểm của nó.',
      left: ['Hình chữ nhật', 'Hình vuông', 'Hình thoi', 'Hình thang'],
      right: [
        'Có bốn góc vuông, chiều dài và chiều rộng khác nhau',
        'Có bốn góc vuông và bốn cạnh bằng nhau',
        'Có bốn cạnh bằng nhau, không có góc vuông',
        'Có đúng một cặp cạnh đối diện song song',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhìn hai điều: hình có góc vuông không, và các cạnh có bằng nhau không.'],
      solution:
        'Hình chữ nhật có bốn góc vuông, chiều dài khác chiều rộng. Hình vuông có bốn góc vuông và bốn cạnh bằng nhau. Hình thoi có bốn cạnh bằng nhau, không có góc vuông. Hình thang có đúng một cặp cạnh đối diện song song.',
    },
    {
      type: 'choice',
      prompt: 'Tam giác có một góc tù gọi là tam giác gì?',
      options: ['Tam giác tù', 'Tam giác nhọn', 'Tam giác vuông', 'Tam giác đều'],
      answer: 0,
      hints: ['Tên của tam giác lấy theo góc đặc biệt của nó.'],
      solution: 'Tam giác có một góc tù là tam giác tù.',
    },
    {
      type: 'choice',
      prompt: 'Tam giác có ba cạnh bằng nhau gọi là tam giác gì?',
      options: ['Tam giác đều', 'Tam giác vuông', 'Tam giác tù'],
      answer: 0,
      hints: ['Ba cạnh "đều" nhau.'],
      solution: 'Tam giác có ba cạnh bằng nhau là tam giác đều.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác ABC có AH vuông góc với BC (H nằm trên BC). AH là chiều cao ứng với đáy nào?',
      options: ['BC', 'AB', 'AC', 'BH'],
      answer: 0,
      hints: ['Chiều cao đi từ một đỉnh và vuông góc với cạnh đối diện đỉnh đó.'],
      solution: 'AH đi từ đỉnh A và vuông góc với cạnh BC. Vậy AH là chiều cao ứng với đáy BC.',
    },
    {
      type: 'choice',
      prompt: 'Tam giác GDE vuông tại G. Chiều cao ứng với đáy GE là đoạn thẳng nào?',
      options: ['DG', 'DE', 'GE'],
      answer: 0,
      hints: ['Chiều cao ứng với đáy GE đi từ đỉnh D và vuông góc với GE.'],
      solution:
        'Cạnh DG đi từ đỉnh D và vuông góc với GE tại G. Vậy DG là chiều cao ứng với đáy GE.',
    },
    {
      type: 'choice',
      prompt:
        'Hình thang ABCD có AB song song với DC, cạnh bên AD vuông góc với hai đáy. ABCD là hình gì?',
      options: ['Hình thang vuông', 'Hình chữ nhật', 'Hình vuông', 'Hình bình hành'],
      answer: 0,
      hints: ['Hình thang có một cạnh bên vuông góc với hai đáy có tên riêng.'],
      solution: 'Hình thang có một cạnh bên vuông góc với hai đáy là hình thang vuông.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hình có hai cặp cạnh đối diện song song.',
      options: ['Hình thang', 'Hình bình hành', 'Hình thoi', 'Hình chữ nhật', 'Hình vuông'],
      answers: [1, 2, 3, 4],
      hints: ['Chỉ có một hình trong số này có đúng một cặp cạnh đối diện song song.'],
      solution:
        'Hình bình hành, hình thoi, hình chữ nhật và hình vuông đều có hai cặp cạnh đối diện song song. Hình thang chỉ có một cặp.',
    },
    {
      type: 'number',
      prompt: 'Hình tròn có bán kính 6 cm. Đường kính của hình tròn dài bao nhiêu xăng-ti-mét?',
      answer: 12,
      unit: 'cm',
      hints: ['Đường kính dài gấp 2 lần bán kính.'],
      solution: 'Đường kính: 6 × 2 = 12 (cm).',
    },
    {
      type: 'number',
      prompt: 'Hình tròn có đường kính 9 dm. Bán kính của hình tròn dài bao nhiêu đề-xi-mét?',
      answer: 4.5,
      unit: 'dm',
      hints: ['Bán kính bằng một nửa đường kính.'],
      solution: 'Bán kính: 9 : 2 = 4,5 (dm).',
    },
    {
      type: 'choice',
      prompt: 'Đoạn thẳng nối hai điểm trên đường tròn và đi qua tâm gọi là gì?',
      options: ['Đường kính', 'Bán kính', 'Chiều cao'],
      answer: 0,
      hints: ['Bán kính chỉ đi từ tâm ra đến đường tròn.'],
      solution: 'Đoạn thẳng nối hai điểm trên đường tròn và đi qua tâm là đường kính.',
    },
    {
      type: 'choice',
      prompt:
        'Trạm B phủ sóng hình tròn tâm B bán kính 20 m. Rô-bốt đứng ở E, cách B 15 m. Rô-bốt có nhận được sóng của trạm B không?',
      options: ['Có', 'Không'],
      answer: 0,
      hints: ['Em so sánh khoảng cách BE với bán kính.'],
      solution:
        'BE = 15 m < 20 m, nên E nằm trong hình tròn tâm B. Rô-bốt nhận được sóng của trạm B.',
    },
  ],
  takeaways: [
    'Tam giác nhọn, vuông, tù gọi theo góc; tam giác đều có ba cạnh bằng nhau.',
    'Chiều cao đi từ một đỉnh và vuông góc với đáy là cạnh đối diện.',
    'Hình thang có một cặp cạnh đối diện song song; hình thang vuông có một cạnh bên vuông góc với hai đáy.',
    'Đường kính dài gấp 2 lần bán kính.',
  ],
};
