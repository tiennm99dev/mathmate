/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành đo, tính và ước lượng thể tích những đồ vật dạng hình hộp chữ nhật, hình lập phương quen thuộc; tính số hộp xếp được vào một thùng.',
  intro:
    'Lớp 5A đóng mỗi chậu cây vào một hộp hình lập phương rồi xếp các hộp vào thùng. Một thùng xếp được bao nhiêu hộp? Em cùng đo, tính và ước lượng nhé!',
  objectives: [
    'Đo kích thước rồi tính thể tích đồ vật dạng hình hộp chữ nhật, hình lập phương.',
    'Ước lượng thể tích một số đồ vật và căn phòng quen thuộc.',
    'Tính số hộp xếp được vào một thùng.',
  ],
  sections: [
    {
      heading: 'Đo, tính và ước lượng thể tích',
      blocks: [
        {
          type: 'p',
          text: 'Muốn biết thể tích một đồ vật dạng hình hộp, em đo chiều dài, chiều rộng, chiều cao rồi nhân lại với nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hình hộp chữ nhật: V = a × b × c. Hình lập phương: V = a × a × a. Các kích thước phải cùng một đơn vị đo.',
        },
        {
          type: 'p',
          text: 'Khi không đo được, em ước lượng. Em so kích thước đồ vật với những thứ quen thuộc: thước kẻ 20 cm, một gang tay, một bước chân hay chiều cao của em.',
        },
        {
          type: 'table',
          head: ['Đồ vật', 'Đo bằng', 'Thể tích tính bằng'],
          rows: [
            ['Hộp bút, hộp sữa', 'cm', 'cm³'],
            ['Thùng các-tông', 'dm', 'dm³'],
            ['Phòng học, bể nước lớn', 'm', 'm³'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Xếp hộp vào thùng',
          text: 'Em xem chiều dài của thùng xếp được mấy hộp, chiều rộng xếp được mấy hộp, chiều cao xếp được mấy lớp. Rồi em nhân ba số đó với nhau.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi các hộp xếp vừa khít thùng, số hộp bằng thể tích thùng chia cho thể tích một hộp. Khi còn thừa chỗ, em phải tính theo từng chiều.',
        },
      ],
    },
    {
      heading: 'Dự án: Ước lượng thể tích phòng học',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em ước lượng rồi đo kích thước phòng học, tính thể tích phòng. Nếu có một phòng kho to bằng phòng học, kho xếp được nhiều nhất bao nhiêu thùng hình lập phương 1 m³?',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: thước dây hoặc thước mét, giấy, bút và bảng ghi kết quả.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Em nhìn phòng học và đoán chiều dài, chiều rộng, chiều cao theo mét. Ghi vào cột "Em ước lượng".',
            'Cùng các bạn đo chiều dài và chiều rộng bằng thước dây. Chiều cao em hỏi thầy cô hoặc đo dọc theo khung cửa rồi ước lượng phần còn lại.',
            'Làm tròn các số đo đến mét và ghi vào cột "Em đo được".',
            'Tính thể tích phòng theo số ước lượng và theo số đo được.',
            'So sánh hai kết quả. Tính xem phòng kho xếp được bao nhiêu thùng 1 m³.',
          ],
        },
        {
          type: 'table',
          head: ['Số đo', 'Em ước lượng', 'Em đo được'],
          rows: [
            ['Chiều dài', '… m', '… m'],
            ['Chiều rộng', '… m', '… m'],
            ['Chiều cao', '… m', '… m'],
            ['Thể tích', '… m³', '… m³'],
          ],
          caption: 'Bảng ghi kết quả đo phòng học',
        },
        {
          type: 'p',
          text: 'Báo cáo với cả lớp: em ước lượng thế nào, đo được bao nhiêu và ước lượng của em có gần với số đo không.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ước lượng rồi đo',
    instruction:
      'Em chọn một đồ vật và đoán thể tích của nó. Rồi em kéo thước đo chiều dài, chiều rộng, chiều cao để kiểm tra.',
  },
  examples: [
    {
      problem:
        'Mỗi chậu cây đựng trong một hộp hình lập phương cạnh 2 dm. Thùng hình hộp chữ nhật dài 6 dm, rộng 4 dm, cao 4 dm. a) Tính thể tích mỗi hộp. b) Một thùng xếp được bao nhiêu hộp?',
      steps: [
        'Thể tích mỗi hộp là: 2 × 2 × 2 = 8 (dm³).',
        'Thể tích thùng là: 6 × 4 × 4 = 96 (dm³).',
        'Các hộp xếp vừa khít thùng: chiều dài 3 hộp, chiều rộng 2 hộp, chiều cao 2 lớp.',
        'Một thùng xếp được: 96 : 8 = 12 (hộp). Kiểm tra: 3 × 2 × 2 = 12.',
      ],
      answer: 'a) 8 dm³. b) 12 hộp.',
    },
    {
      problem:
        'Em ước lượng phòng học dài khoảng 6 m, rộng khoảng 4 m, cao khoảng 4 m. Phòng kho cùng kích thước xếp được nhiều nhất bao nhiêu thùng hình lập phương 1 m³?',
      steps: [
        'Thể tích phòng kho khoảng: 6 × 4 × 4 = 96 (m³).',
        'Mỗi thùng có thể tích 1 m³, nên xếp được nhiều nhất 96 thùng.',
      ],
      answer: 'Khoảng 96 thùng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Một hộp hình lập phương cạnh 2 dm. Thể tích của hộp là bao nhiêu?',
      answer: 8,
      unit: 'dm³',
      hints: ['Thể tích hình lập phương = cạnh × cạnh × cạnh.'],
      solution: 'Thể tích của hộp là: 2 × 2 × 2 = 8 (dm³).',
    },
    {
      type: 'number',
      prompt:
        'Thùng dài 6 dm, rộng 4 dm, cao 4 dm. Xếp được bao nhiêu hộp hình lập phương cạnh 2 dm vào thùng?',
      answer: 12,
      unit: 'hộp',
      hints: [
        'Chiều dài 6 dm xếp được 6 : 2 = 3 hộp.',
        'Tính tương tự với chiều rộng và chiều cao rồi nhân lại.',
      ],
      solution:
        'Chiều dài xếp được 3 hộp, chiều rộng 2 hộp, chiều cao 2 lớp: 3 × 2 × 2 = 12 (hộp). Hoặc: 96 : 8 = 12 (hộp).',
    },
    {
      type: 'choice',
      prompt: 'Thể tích một phòng học khoảng bao nhiêu?',
      options: ['200 m³', '200 dm³', '200 cm³'],
      answer: 0,
      hints: ['Phòng học dài, rộng, cao mấy mét?', '1 dm³ chỉ to bằng một hộp sữa 1 l.'],
      solution:
        'Phòng học dài khoảng 8 m, rộng 6 m, cao 4 m: 8 × 6 × 4 = 192 (m³). Vậy thể tích phòng khoảng 200 m³.',
    },
    {
      type: 'number',
      prompt:
        'Quyển từ điển dạng hình hộp chữ nhật dài 18 cm, rộng 11 cm, dày 5 cm. Tính thể tích quyển từ điển.',
      answer: 990,
      unit: 'cm³',
      hints: ['Nhân chiều dài, chiều rộng và chiều dày.', '18 × 11 = 198.'],
      solution: 'Thể tích quyển từ điển là: 18 × 11 × 5 = 990 (cm³).',
    },
    {
      type: 'choice',
      prompt:
        'Hộp bánh dài 20 cm, rộng 5 cm, cao 5 cm. Hộp nào dưới đây có thể tích gần với hộp bánh nhất?',
      options: [
        'Hộp 10 cm × 9 cm × 6 cm',
        'Hộp lập phương cạnh 10 cm',
        'Hộp 8 cm × 5 cm × 10 cm',
        'Hộp 14 cm × 4 cm × 4 cm',
      ],
      answer: 0,
      hints: [
        'Hộp bánh có thể tích 20 × 5 × 5 = 500 (cm³).',
        'Tính thể tích từng hộp rồi so với 500 cm³.',
      ],
      solution:
        'Hộp bánh: 500 cm³. Hộp lập phương cạnh 10 cm: 1 000 cm³. Hộp 8 cm × 5 cm × 10 cm: 400 cm³. Hộp 14 cm × 4 cm × 4 cm: 224 cm³. Hộp 10 cm × 9 cm × 6 cm: 540 cm³, gần 500 cm³ nhất.',
    },
    {
      type: 'number',
      prompt:
        'Ngăn tủ dài 80 cm, rộng 30 cm, cao 50 cm. Rô-bốt xếp hộp quà hình lập phương cạnh 15 cm vào ngăn tủ. Xếp được nhiều nhất bao nhiêu hộp?',
      answer: 30,
      unit: 'hộp',
      hints: [
        'Chiều dài 80 cm: 80 : 15 = 5 (dư 5), xếp được 5 hộp.',
        'Tính số hộp theo chiều rộng và số lớp theo chiều cao, rồi nhân lại.',
      ],
      solution:
        'Chiều dài: 80 : 15 = 5 (dư 5), xếp 5 hộp. Chiều rộng: 30 : 15 = 2, xếp 2 hộp. Chiều cao: 50 : 15 = 3 (dư 5), xếp 3 lớp. Số hộp: 5 × 2 × 3 = 30 (hộp).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đồ vật với thể tích gần đúng của nó.',
      left: ['Con xúc xắc', 'Hộp sữa 1 l', 'Thùng nước 20 l', 'Phòng học'],
      right: ['1 cm³', '1 dm³', '20 dm³', '200 m³', '2 m³'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Nhớ: 1 l = 1 dm³.', 'Đồ vật càng to thì đơn vị đo càng lớn.'],
      solution:
        'Con xúc xắc khoảng 1 cm³. Hộp sữa 1 l là 1 dm³. Thùng nước 20 l là 20 dm³. Phòng học khoảng 200 m³.',
    },
    {
      type: 'number',
      prompt:
        'Phòng kho dài 6 m, rộng 4 m, cao 4 m. Kho xếp được nhiều nhất bao nhiêu thùng hình lập phương 1 m³?',
      answer: 96,
      unit: 'thùng',
      hints: ['Tính thể tích phòng kho theo mét khối.'],
      solution:
        'Thể tích phòng kho là: 6 × 4 × 4 = 96 (m³). Mỗi thùng 1 m³, nên kho xếp được nhiều nhất 96 thùng.',
    },
  ],
  takeaways: [
    'Đo chiều dài, chiều rộng, chiều cao (cùng đơn vị) rồi nhân để tính thể tích.',
    'Ước lượng: so đồ vật với thứ quen thuộc, đoán kích thước rồi tính.',
    'Xếp hộp vào thùng: đếm số hộp theo từng chiều rồi nhân lại.',
  ],
};
