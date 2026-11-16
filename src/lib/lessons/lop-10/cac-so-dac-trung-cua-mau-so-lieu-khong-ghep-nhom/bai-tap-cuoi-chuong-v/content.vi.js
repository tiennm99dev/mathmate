/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương Các số đặc trưng của mẫu số liệu không ghép nhóm: số gần đúng và sai số, số trung bình, trung vị, tứ phân vị, mốt, khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn, giá trị bất thường và so sánh hai mẫu số liệu.',
  intro:
    'Hai lớp cùng làm một bài kiểm tra. Lớp nào học tốt hơn, lớp nào học đều hơn? Chỉ nhìn điểm trung bình là chưa đủ. Bài ôn tập này hệ thống lại các số đặc trưng của chương và dùng chúng, cùng với biểu đồ hộp, để so sánh hai mẫu số liệu một cách có căn cứ.',
  objectives: [
    'Đánh giá sai số và quy tròn số gần đúng.',
    'Tính và giải thích ý nghĩa các số đặc trưng đo xu thế trung tâm và đo độ phân tán.',
    'Phát hiện giá trị bất thường và chọn số đặc trưng phù hợp để so sánh hai mẫu số liệu.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'list',
          items: [
            'Số gần đúng $a$ của số đúng $\\overline{a}$: sai số tuyệt đối $\\Delta_a = |\\overline{a} - a|$; viết $\\overline{a} = a \\pm d$ khi $\\Delta_a \\le d$; sai số tương đối $\\delta_a = \\dfrac{\\Delta_a}{|a|} \\le \\dfrac{d}{|a|}$.',
            'Quy tròn số gần đúng với độ chính xác $d$: quy tròn đến hàng thấp nhất mà $d$ nhỏ hơn một đơn vị của hàng đó.',
            'Xu thế trung tâm: số trung bình $\\overline{x}$, trung vị $M_e$, tứ phân vị $Q_1, Q_2 = M_e, Q_3$, mốt $M_o$.',
            'Độ phân tán: khoảng biến thiên $R$, khoảng tứ phân vị $\\Delta_Q = Q_3 - Q_1$, phương sai $s^2 = \\dfrac{1}{n}\\sum (x_i - \\overline{x})^2$, độ lệch chuẩn $s = \\sqrt{s^2}$.',
            'Giá trị bất thường: lớn hơn $Q_3 + 1{,}5\\Delta_Q$ hoặc nhỏ hơn $Q_1 - 1{,}5\\Delta_Q$.',
          ],
        },
      ],
    },
    {
      heading: 'So sánh hai mẫu số liệu',
      blocks: [
        {
          type: 'table',
          head: ['Câu hỏi', 'Mẫu không có giá trị bất thường', 'Mẫu có giá trị bất thường'],
          rows: [
            ['Mẫu nào có mức trung tâm cao hơn?', 'So sánh $\\overline{x}$', 'So sánh $M_e$'],
            [
              'Mẫu nào đồng đều hơn (ít phân tán hơn)?',
              'So sánh $s$ (hoặc $s^2$)',
              'So sánh $\\Delta_Q$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hai mẫu cần cùng đơn vị đo. Mẫu có độ lệch chuẩn (hay khoảng tứ phân vị) nhỏ hơn thì các số liệu tập trung quanh trung tâm hơn, tức là đồng đều hơn. Đặt hai biểu đồ hộp trên cùng một trục giúp nhìn thấy ngay cả hai điều đó.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai biểu đồ hộp cạnh nhau',
    instruction:
      'Chọn một cặp mẫu, quan sát hai biểu đồ hộp trên cùng một trục và bảng số đặc trưng. Lớp nào có trung tâm cao hơn? Lớp nào đồng đều hơn? Sửa số liệu của một lớp (ví dụ thêm một giá trị rất lớn) để xem kết luận và cách so sánh thay đổi ra sao.',
  },
  examples: [
    {
      problem:
        'Thời gian (phút) chạy $1\\,500$ m của $5$ bạn nhóm I: $7;\\ 8;\\ 8;\\ 9;\\ 8$ và nhóm II: $6;\\ 10;\\ 7;\\ 9;\\ 8$. Nhóm nào chạy đều hơn?',
      steps: [
        '$\\overline{x}_I = \\dfrac{40}{5} = 8$, $\\overline{x}_{II} = \\dfrac{40}{5} = 8$.',
        '$s_I^2 = \\dfrac{1 + 0 + 0 + 1 + 0}{5} = 0{,}4$.',
        '$s_{II}^2 = \\dfrac{4 + 4 + 1 + 1 + 0}{5} = 2$.',
      ],
      answer: '$s_I^2 < s_{II}^2$ nên nhóm I chạy đều hơn (thời gian ít phân tán hơn).',
    },
    {
      problem:
        'Số giờ tự học mỗi tuần của $9$ bạn lớp 10C: $5$; $6$; $6$; $7$; $8$; $8$; $9$; $10$; $24$. Tìm giá trị bất thường và cho biết nên dùng số đặc trưng nào để đại diện cho mẫu.',
      steps: [
        '$n = 9$, $Q_2 = M_e = 8$; nửa trái $5;\\ 6;\\ 6;\\ 7$ cho $Q_1 = 6$; nửa phải $8;\\ 9;\\ 10;\\ 24$ cho $Q_3 = 9{,}5$.',
        '$\\Delta_Q = 3{,}5$; $Q_3 + 1{,}5\\Delta_Q = 9{,}5 + 5{,}25 = 14{,}75$ và $Q_1 - 1{,}5\\Delta_Q = 0{,}75$.',
        '$24 > 14{,}75$ nên $24$ là giá trị bất thường.',
      ],
      answer:
        'Giá trị bất thường là $24$. Nên dùng trung vị $M_e = 8$ (giờ) đại diện cho mẫu và $\\Delta_Q = 3{,}5$ để đo độ phân tán.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Viết số quy tròn của số gần đúng $a = 173{,}4592 \\pm 0{,}01$.',
      answer: 173.5,
      hints: [
        'Chữ số khác $0$ đầu tiên của $d = 0{,}01$ ở hàng phần trăm.',
        'Quy tròn $a$ đến hàng phần mười.',
      ],
      solution:
        'Hàng cao nhất của $d$ là hàng phần trăm, nên quy tròn $a$ đến hàng phần mười. Chữ số ngay sau là $5 \\ge 5$, nên $a \\approx 173{,}5$.',
    },
    {
      type: 'number',
      prompt:
        'Một vật nặng $m = 2{,}5 \\pm 0{,}02$ (kg). Sai số tương đối của phép cân không vượt quá bao nhiêu phần trăm?',
      answer: 0.8,
      unit: '%',
      hints: ['$\\delta_m \\le \\dfrac{d}{|m|}$.'],
      solution: '$\\delta_m \\le \\dfrac{0{,}02}{2{,}5} = 0{,}008 = 0{,}8\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Tính số trung bình của mẫu số liệu $3$; $5$; $6$; $6$; $7$; $9$; $10$ (làm tròn đến hàng phần trăm).',
      answer: 6.57,
      tolerance: 0.005,
      hints: ['Tổng các giá trị là $46$.'],
      solution: '$\\overline{x} = \\dfrac{46}{7} \\approx 6{,}57$.',
    },
    {
      type: 'number',
      prompt: 'Tìm trung vị của mẫu số liệu $12$; $15$; $11$; $18$; $20$; $14$; $16$; $13$.',
      answer: 14.5,
      hints: ['Sắp xếp mẫu trước; $n = 8$ chẵn.'],
      solution:
        'Sắp xếp: $11$; $12$; $13$; $14$; $15$; $16$; $18$; $20$. $M_e = \\dfrac{14 + 15}{2} = 14{,}5$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm tứ phân vị thứ ba $Q_3$ của mẫu số liệu $12$; $15$; $11$; $18$; $20$; $14$; $16$; $13$.',
      answer: 17,
      hints: ['Sau khi sắp xếp, nửa bên phải gồm $4$ giá trị lớn nhất.'],
      solution:
        'Mẫu đã sắp xếp: $11$; $12$; $13$; $14$; $15$; $16$; $18$; $20$. Nửa bên phải $15;\\ 16;\\ 18;\\ 20$ cho $Q_3 = \\dfrac{16 + 18}{2} = 17$.',
    },
    {
      type: 'number',
      prompt: 'Tìm mốt của mẫu số liệu $2$; $3$; $3$; $4$; $4$; $4$; $5$; $6$.',
      answer: 4,
      hints: ['Đếm số lần xuất hiện của mỗi giá trị.'],
      solution: 'Giá trị $4$ xuất hiện $3$ lần, nhiều nhất, nên $M_o = 4$.',
    },
    {
      type: 'number',
      prompt: 'Tính phương sai của mẫu số liệu $1;\\ 3;\\ 5;\\ 7;\\ 9$.',
      answer: 8,
      hints: ['$\\overline{x} = 5$.', 'Các độ lệch là $-4, -2, 0, 2, 4$.'],
      solution: '$s^2 = \\dfrac{16 + 4 + 0 + 4 + 16}{5} = \\dfrac{40}{5} = 8$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm khoảng tứ phân vị của mẫu số liệu $2$; $4$; $4$; $5$; $7$; $8$; $9$; $12$; $15$.',
      answer: 6.5,
      hints: [
        '$n = 9$ lẻ, $Q_2 = 7$; hai nửa không chứa $Q_2$.',
        'Nửa trái $2;\\ 4;\\ 4;\\ 5$, nửa phải $8;\\ 9;\\ 12;\\ 15$.',
      ],
      solution:
        '$Q_1 = \\dfrac{4 + 4}{2} = 4$, $Q_3 = \\dfrac{9 + 12}{2} = 10{,}5$, nên $\\Delta_Q = 10{,}5 - 4 = 6{,}5$.',
    },
    {
      type: 'multi',
      prompt:
        'Cho mẫu số liệu $3$; $20$; $21$; $22$; $23$; $24$; $25$; $26$; $45$. Chọn tất cả các giá trị bất thường.',
      options: ['$3$', '$20$', '$26$', '$45$'],
      answers: [0, 3],
      hints: [
        'Tìm $Q_1$, $Q_3$ từ hai nửa $3;\\ 20;\\ 21;\\ 22$ và $24;\\ 25;\\ 26;\\ 45$.',
        'Tính $Q_1 - 1{,}5\\Delta_Q$ và $Q_3 + 1{,}5\\Delta_Q$.',
      ],
      solution:
        '$Q_1 = 20{,}5$, $Q_3 = 25{,}5$, $\\Delta_Q = 5$. Hai giới hạn là $20{,}5 - 7{,}5 = 13$ và $25{,}5 + 7{,}5 = 33$. Vì $3 < 13$ và $45 > 33$ nên $3$ và $45$ là giá trị bất thường.',
    },
    {
      type: 'choice',
      prompt:
        'Điểm thi của lớp 10A có $\\overline{x} = 7{,}2$, $s = 0{,}8$; của lớp 10B có $\\overline{x} = 7{,}2$, $s = 1{,}5$ (hai mẫu không có giá trị bất thường). Kết luận nào đúng?',
      options: [
        'Hai lớp có điểm trung bình như nhau, lớp 10A học đều hơn.',
        'Hai lớp có điểm trung bình như nhau, lớp 10B học đều hơn.',
        'Lớp 10B học tốt hơn vì độ lệch chuẩn lớn hơn.',
        'Không so sánh được vì hai số trung bình bằng nhau.',
      ],
      answer: 0,
      hints: ['Độ lệch chuẩn nhỏ hơn nghĩa là số liệu tập trung quanh số trung bình hơn.'],
      solution:
        'Số trung bình bằng nhau nên mức điểm trung tâm như nhau. $s_{10A} = 0{,}8 < s_{10B} = 1{,}5$: điểm lớp 10A ít phân tán hơn, nên lớp 10A học đều hơn.',
    },
    {
      type: 'choice',
      prompt:
        'Một mẫu số liệu có giá trị bất thường. Cặp số đặc trưng nào nên dùng để mô tả trung tâm và độ phân tán của mẫu?',
      options: [
        'Trung vị và khoảng tứ phân vị',
        'Số trung bình và độ lệch chuẩn',
        'Số trung bình và khoảng biến thiên',
        'Mốt và phương sai',
      ],
      answer: 0,
      hints: ['Số đặc trưng nào không bị ảnh hưởng bởi giá trị quá lớn hoặc quá nhỏ?'],
      solution:
        'Trung vị và khoảng tứ phân vị chỉ phụ thuộc vào các giá trị ở giữa mẫu, nên không bị giá trị bất thường làm sai lệch; số trung bình, khoảng biến thiên, phương sai và độ lệch chuẩn thì bị ảnh hưởng.',
    },
    {
      type: 'number',
      prompt:
        'Tuổi thọ (năm) của $10$ chiếc bóng đèn cho trong bảng: giá trị $2$, $3$, $4$, $5$ có tần số lần lượt $1$, $3$, $4$, $2$. Tính độ lệch chuẩn.',
      answer: 0.9,
      hints: [
        '$\\overline{x} = \\dfrac{1 \\cdot 2 + 3 \\cdot 3 + 4 \\cdot 4 + 2 \\cdot 5}{10} = 3{,}7$.',
        '$s^2 = \\dfrac{1 \\cdot 4 + 3 \\cdot 9 + 4 \\cdot 16 + 2 \\cdot 25}{10} - 3{,}7^2$.',
      ],
      solution:
        '$\\overline{x} = \\dfrac{37}{10} = 3{,}7$. $s^2 = \\dfrac{4 + 27 + 64 + 50}{10} - 3{,}7^2 = 14{,}5 - 13{,}69 = 0{,}81$. $s = \\sqrt{0{,}81} = 0{,}9$.',
    },
  ],
  takeaways: [
    'Viết số gần đúng dạng $a \\pm d$; so sánh độ chính xác bằng sai số tương đối $\\dfrac{d}{|a|}$.',
    'Không có giá trị bất thường: dùng $\\overline{x}$ và $s$; có giá trị bất thường: dùng $M_e$ và $\\Delta_Q$.',
    'Mẫu có độ phân tán nhỏ hơn thì đồng đều hơn; hai biểu đồ hộp trên cùng một trục cho thấy cả trung tâm lẫn độ phân tán.',
  ],
};
