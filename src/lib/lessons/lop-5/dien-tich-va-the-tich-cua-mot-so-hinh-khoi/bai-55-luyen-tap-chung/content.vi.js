/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về diện tích xung quanh, diện tích toàn phần và thể tích của hình hộp chữ nhật, hình lập phương; giải bài toán thực tế về bể bơi, thùng xe, hộp và khối gỗ.',
  intro:
    'Em ôn lại cách tính diện tích xung quanh, diện tích toàn phần và thể tích của hình hộp chữ nhật, hình lập phương. Rồi em giải các bài toán về bể bơi, thùng xe và hộp nhé!',
  objectives: [
    'Tính diện tích xung quanh, diện tích toàn phần của hình hộp chữ nhật và hình lập phương.',
    'Tính thể tích của hình hộp chữ nhật và hình lập phương.',
    'Vận dụng để giải các bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Cách tính', 'Hình hộp chữ nhật', 'Hình lập phương'],
          rows: [
            ['Diện tích xung quanh', 'Chu vi đáy × chiều cao', 'Một mặt × 4'],
            ['Diện tích toàn phần', 'Xung quanh + hai đáy', 'Một mặt × 6'],
            ['Thể tích', 'Dài × rộng × cao', 'Cạnh × cạnh × cạnh'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Các kích thước phải cùng một đơn vị đo. Diện tích tính bằng cm², dm², m²; thể tích tính bằng cm³, dm³, m³.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đọc kĩ đề',
          text: 'Hộp không có nắp thì chỉ có một đáy. Lát gạch đáy và xung quanh bể thì cộng diện tích xung quanh với một đáy.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ câu hỏi trộn',
    instruction:
      'Mỗi câu một dạng bài của chủ đề. Sai lần đầu, em có gợi ý và được thử lại. Làm xong, em xem phần nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Một bể bơi dạng hình hộp chữ nhật dài 25 m, rộng 8 m, sâu 1,4 m. Người ta lát gạch ở đáy và xung quanh bể. Tính diện tích lát gạch.',
      steps: [
        'Diện tích xung quanh bể là: (25 + 8) × 2 × 1,4 = 92,4 (m²).',
        'Diện tích đáy bể là: 25 × 8 = 200 (m²).',
        'Diện tích lát gạch là: 92,4 + 200 = 292,4 (m²).',
      ],
      answer: 'Diện tích lát gạch là 292,4 m².',
    },
    {
      problem:
        'Thùng xe tải dài 2 m, rộng 1,2 m, cao 1,5 m. Mỗi hộp loa dài 0,5 m, rộng 0,4 m, cao 0,3 m. Chú Tư có xếp được 64 hộp loa lên thùng xe không?',
      steps: [
        'Thể tích thùng xe là: 2 × 1,2 × 1,5 = 3,6 (m³).',
        'Thể tích một hộp loa là: 0,5 × 0,4 × 0,3 = 0,06 (m³).',
        'Thùng xe chứa được nhiều nhất: 3,6 : 0,06 = 60 (hộp).',
        '60 < 64.',
      ],
      answer: 'Chú Tư không xếp được 64 hộp loa lên thùng xe.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi đại lượng với cách tính của nó.',
      left: [
        'Diện tích xung quanh hình lập phương',
        'Diện tích toàn phần hình lập phương',
        'Thể tích hình lập phương',
        'Thể tích hình hộp chữ nhật',
      ],
      right: [
        'Diện tích một mặt × 4',
        'Diện tích một mặt × 6',
        'Cạnh × cạnh × cạnh',
        'Chiều dài × chiều rộng × chiều cao',
        'Chu vi đáy × 2',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hình lập phương có 6 mặt bằng nhau, 4 mặt xung quanh.'],
      solution:
        'Diện tích xung quanh hình lập phương = một mặt × 4. Diện tích toàn phần = một mặt × 6. Thể tích hình lập phương = cạnh × cạnh × cạnh. Thể tích hình hộp chữ nhật = dài × rộng × cao.',
    },
    {
      type: 'number',
      prompt: 'Hình lập phương cạnh 8 dm. Tính diện tích xung quanh.',
      answer: 256,
      unit: 'dm²',
      hints: ['Tính diện tích một mặt: 8 × 8.', 'Nhân diện tích một mặt với 4.'],
      solution: 'Diện tích một mặt: 8 × 8 = 64 (dm²). Diện tích xung quanh: 64 × 4 = 256 (dm²).',
    },
    {
      type: 'number',
      prompt: 'Hình lập phương cạnh 8 dm. Tính diện tích toàn phần.',
      answer: 384,
      unit: 'dm²',
      hints: ['Diện tích một mặt là 8 × 8 = 64 (dm²).', 'Nhân diện tích một mặt với 6.'],
      solution: 'Diện tích toàn phần: 8 × 8 × 6 = 384 (dm²).',
    },
    {
      type: 'number',
      prompt: 'Hình lập phương cạnh 0,5 m. Tính diện tích toàn phần.',
      answer: 1.5,
      unit: 'm²',
      hints: ['0,5 × 0,5 = 0,25.', 'Nhân 0,25 với 6.'],
      solution:
        'Diện tích một mặt: 0,5 × 0,5 = 0,25 (m²). Diện tích toàn phần: 0,25 × 6 = 1,5 (m²).',
    },
    {
      type: 'number',
      prompt:
        'Nam gấp một chiếc hộp hình hộp chữ nhật dài 6 cm, rộng 3 cm, cao 3 cm. Tính thể tích chiếc hộp.',
      answer: 54,
      unit: 'cm³',
      hints: ['Thể tích = chiều dài × chiều rộng × chiều cao.'],
      solution: 'Thể tích chiếc hộp là: 6 × 3 × 3 = 54 (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Hộp gỗ dài 25 cm, rộng 20 cm, cao 10 cm. Việt sơn màu nâu các mặt xung quanh. Tính diện tích phần sơn màu nâu.',
      answer: 900,
      unit: 'cm²',
      hints: ['Phần sơn nâu là diện tích xung quanh.', 'Chu vi đáy: (25 + 20) × 2.'],
      solution: 'Diện tích phần sơn màu nâu là: (25 + 20) × 2 × 10 = 900 (cm²).',
    },
    {
      type: 'number',
      prompt: 'Hình hộp chữ nhật dài 2 dm, rộng 1 dm, cao 1,5 dm. Tính thể tích.',
      answer: 3,
      unit: 'dm³',
      hints: ['Nhân ba kích thước với nhau.'],
      solution: 'Thể tích hình hộp chữ nhật là: 2 × 1 × 1,5 = 3 (dm³).',
    },
    {
      type: 'number',
      prompt: 'Hình lập phương cạnh 15 cm. Tính thể tích.',
      answer: 3375,
      unit: 'cm³',
      hints: ['15 × 15 = 225.', 'Nhân 225 với 15.'],
      solution: 'Thể tích hình lập phương là: 15 × 15 × 15 = 3 375 (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Bể bơi dài 25 m, rộng 8 m, sâu 1,4 m. Người ta lát gạch ở đáy và xung quanh bể. Tính diện tích lát gạch.',
      answer: 292.4,
      unit: 'm²',
      hints: [
        'Bể bơi không có nắp: chỉ lát xung quanh và một đáy.',
        'Diện tích xung quanh: (25 + 8) × 2 × 1,4.',
      ],
      solution:
        'Diện tích xung quanh: (25 + 8) × 2 × 1,4 = 92,4 (m²). Diện tích đáy: 25 × 8 = 200 (m²). Diện tích lát gạch: 92,4 + 200 = 292,4 (m²).',
    },
    {
      type: 'choice',
      prompt:
        'Thùng xe dài 2 m, rộng 1,2 m, cao 1,5 m. Mỗi hộp loa dài 0,5 m, rộng 0,4 m, cao 0,3 m. Chú Tư có xếp được 64 hộp loa lên thùng xe không?',
      options: [
        'Không, thùng xe chứa nhiều nhất 60 hộp',
        'Được, thùng xe chứa vừa đúng 64 hộp',
        'Được, còn thừa chỗ cho 6 hộp nữa',
      ],
      answer: 0,
      hints: [
        'Tính thể tích thùng xe và thể tích một hộp loa.',
        'Thể tích thùng xe chia cho thể tích một hộp.',
      ],
      solution:
        'Thùng xe: 2 × 1,2 × 1,5 = 3,6 (m³). Một hộp: 0,5 × 0,4 × 0,3 = 0,06 (m³). Thùng chứa nhiều nhất 3,6 : 0,06 = 60 (hộp). Vậy không xếp được 64 hộp.',
    },
    {
      type: 'number',
      prompt:
        'Chú Nhân làm một chiếc hộp hình lập phương bằng nhựa cứng, cạnh 2,5 dm. Cần bao nhiêu đề-xi-mét vuông nhựa?',
      answer: 37.5,
      unit: 'dm²',
      hints: ['Hộp có đủ 6 mặt: tính diện tích toàn phần.', '2,5 × 2,5 = 6,25.'],
      solution: 'Diện tích nhựa cần dùng là: 2,5 × 2,5 × 6 = 37,5 (dm²).',
    },
    {
      type: 'number',
      prompt:
        'Khối gỗ dài 5 dm, rộng 3 dm, cao 3 dm. Bác thợ cắt đi một khối lập phương cạnh 2 dm, phần còn lại làm ghế. Tính thể tích phần làm ghế.',
      answer: 37,
      unit: 'dm³',
      hints: ['Tính thể tích khối gỗ ban đầu.', 'Trừ đi thể tích khối lập phương cạnh 2 dm.'],
      solution:
        'Khối gỗ: 5 × 3 × 3 = 45 (dm³). Khối cắt đi: 2 × 2 × 2 = 8 (dm³). Phần làm ghế: 45 − 8 = 37 (dm³).',
    },
    {
      type: 'number',
      prompt:
        'Hộp dài 16 cm, rộng 8 cm, cao 8 cm. Đặt hộp đứng trên mặt 8 cm × 8 cm thì nước cao 8 cm. Đặt hộp nằm trên mặt 16 cm × 8 cm thì nước cao bao nhiêu xăng-ti-mét?',
      answer: 4,
      unit: 'cm',
      hints: [
        'Thể tích nước không đổi: 8 × 8 × 8.',
        'Lấy thể tích nước chia cho diện tích đáy mới 16 × 8.',
      ],
      solution:
        'Thể tích nước: 8 × 8 × 8 = 512 (cm³). Đáy mới: 16 × 8 = 128 (cm²). Nước cao: 512 : 128 = 4 (cm).',
    },
  ],
  takeaways: [
    'Hình hộp chữ nhật: xung quanh = chu vi đáy × cao; toàn phần = xung quanh + hai đáy; thể tích = dài × rộng × cao.',
    'Hình lập phương: xung quanh = một mặt × 4; toàn phần = một mặt × 6; thể tích = cạnh × cạnh × cạnh.',
    'Đổi các kích thước về cùng một đơn vị trước khi tính.',
  ],
};
