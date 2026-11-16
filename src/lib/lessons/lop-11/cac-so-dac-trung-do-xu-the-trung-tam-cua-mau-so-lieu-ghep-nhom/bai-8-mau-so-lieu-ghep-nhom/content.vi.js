/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mẫu số liệu ghép nhóm và bảng tần số ghép nhóm: nhóm, đầu mút, độ dài nhóm, tần số, cỡ mẫu, và cách ghép nhóm một mẫu số liệu.',
  intro:
    'Đo chiều cao của 40 bạn trong lớp, ta được 40 số khác nhau đôi chút: $152$, $155$, $157$, … Liệt kê hết thì dài và khó nhìn ra số liệu tập trung ở đâu. Nếu chia chiều cao thành các khoảng như $[150; 155)$, $[155; 160)$, … rồi đếm xem mỗi khoảng có bao nhiêu bạn, ta được một bảng ngắn gọn mà vẫn thấy rõ phân bố. Bảng đó là một mẫu số liệu ghép nhóm.',
  objectives: [
    'Đọc và giải thích bảng tần số ghép nhóm: nhóm, đầu mút, độ dài nhóm, tần số, cỡ mẫu.',
    'Ghép nhóm một mẫu số liệu và lập bảng tần số ghép nhóm.',
    'Hiểu ý nghĩa của việc ghép nhóm và ảnh hưởng của cách chọn nhóm.',
  ],
  sections: [
    {
      heading: 'Mẫu số liệu ghép nhóm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mẫu số liệu ghép nhóm',
          text: 'Mẫu số liệu ghép nhóm là mẫu số liệu cho dưới dạng bảng tần số ghép nhóm.',
        },
        {
          type: 'table',
          head: ['Nhóm', '$[a_1; a_2)$', '$[a_2; a_3)$', '$\\ldots$', '$[a_k; a_{k+1})$'],
          rows: [['Tần số', '$m_1$', '$m_2$', '$\\ldots$', '$m_k$']],
          caption: 'Dạng chung của bảng tần số ghép nhóm',
        },
        {
          type: 'list',
          items: [
            'Mỗi nhóm số liệu gồm các giá trị được cho dưới dạng $[a; b)$, trong đó $a$ là đầu mút trái, $b$ là đầu mút phải. Độ dài của nhóm là $b - a$.',
            'Tần số của một nhóm là số số liệu trong mẫu thuộc nhóm đó. Tần số của nhóm $[a_i; a_{i+1})$ kí hiệu là $m_i$.',
            'Cỡ mẫu là $n = m_1 + m_2 + \\cdots + m_k$, tổng các tần số.',
          ],
        },
        {
          type: 'p',
          text: 'Nhóm $[a; b)$ chứa các giá trị $x$ với $a \\le x < b$: một giá trị đúng bằng đầu mút phải $b$ không thuộc nhóm này mà thuộc nhóm ngay sau. Nhờ vậy mỗi số liệu được đếm vào đúng một nhóm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mất thông tin khi ghép nhóm',
          text: 'Bảng tần số ghép nhóm cho biết có bao nhiêu số liệu trong mỗi nhóm nhưng không còn cho biết từng giá trị cụ thể. Bù lại, bảng gọn hơn và giúp thấy ngay số liệu tập trung ở khoảng nào. Vì vậy các số đặc trưng tính từ mẫu ghép nhóm (ở Bài 9) chỉ là giá trị xấp xỉ cho mẫu số liệu gốc.',
        },
      ],
    },
    {
      heading: 'Ghép nhóm mẫu số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Mẫu số liệu ghép nhóm thường dùng khi mẫu có nhiều số liệu, hoặc khi số liệu nhận rất nhiều giá trị khác nhau, chẳng hạn chiều cao, cân nặng, thời gian. Để chuyển một mẫu số liệu không ghép nhóm thành mẫu số liệu ghép nhóm, ta làm như sau:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chia miền giá trị của mẫu số liệu thành một số nhóm theo tiêu chí cho trước: nhóm đầu chứa giá trị nhỏ nhất, nhóm cuối chứa giá trị lớn nhất.',
            'Đếm số giá trị của mẫu số liệu thuộc mỗi nhóm (tần số của nhóm) và lập bảng tần số ghép nhóm.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Khi ghép nhóm số liệu, ta thường chia các nhóm có độ dài bằng nhau. Đầu mút của các nhóm có thể không phải là giá trị của mẫu số liệu. Nhóm cuối cùng có thể lấy cả đầu mút phải, tức là có dạng $[a_k; a_{k+1}]$.',
        },
        {
          type: 'p',
          text: 'Không có một cách ghép nhóm duy nhất. Nhóm quá rộng thì bảng gộp gần hết số liệu lại, không còn thấy hình dạng phân bố; nhóm quá hẹp thì bảng dài, mỗi nhóm chỉ có vài số liệu. Cần chọn số nhóm vừa phải, thường là các nhóm có độ dài là số tròn như $2$, $5$, $10$ để bảng dễ đọc.',
        },
        {
          type: 'p',
          text: 'Có thể vẽ bảng tần số ghép nhóm thành biểu đồ: mỗi nhóm là một cột đặt sát nhau trên trục số, đáy cột trùng với nhóm, chiều cao cột bằng tần số. Biểu đồ cho thấy ngay nhóm nào có nhiều số liệu nhất.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chia nhóm và đếm',
    instruction:
      'Mỗi chấm là chiều cao (hoặc điểm thi) của một bạn. Kéo thanh trượt để đổi đầu mút trái của nhóm đầu và độ dài nhóm $h$: các dải màu, bảng tần số và biểu đồ thay đổi theo. Bấm vào một nhóm trong bảng để xem những giá trị nào được đếm vào nhóm đó. Thử $h$ thật nhỏ và thật lớn để thấy vì sao cần chọn số nhóm vừa phải.',
  },
  examples: [
    {
      problem:
        'Thời gian (phút) đi từ nhà đến trường của $20$ học sinh như sau: $12$; $7$; $15$; $22$; $9$; $18$; $25$; $11$; $14$; $6$; $20$; $16$; $8$; $13$; $27$; $19$; $10$; $17$; $23$; $15$. Hãy ghép nhóm mẫu số liệu thành các nhóm có độ dài bằng $5$, nhóm đầu tiên là $[5; 10)$, rồi lập bảng tần số ghép nhóm.',
      steps: [
        'Giá trị nhỏ nhất là $6$, lớn nhất là $27$. Các nhóm độ dài $5$ bắt đầu từ $5$ là $[5; 10)$, $[10; 15)$, $[15; 20)$, $[20; 25)$, $[25; 30)$; nhóm cuối chứa $27$.',
        'Nhóm $[5; 10)$ gồm $7$; $9$; $6$; $8$: tần số $4$. Nhóm $[10; 15)$ gồm $12$; $11$; $14$; $13$; $10$: tần số $5$.',
        'Nhóm $[15; 20)$ gồm $15$; $18$; $16$; $19$; $17$; $15$: tần số $6$ (giá trị $15$ thuộc nhóm này chứ không thuộc nhóm $[10; 15)$).',
        'Nhóm $[20; 25)$ gồm $22$; $20$; $23$: tần số $3$. Nhóm $[25; 30)$ gồm $25$; $27$: tần số $2$.',
        'Kiểm tra: $4 + 5 + 6 + 3 + 2 = 20$, đúng bằng cỡ mẫu.',
      ],
      answer:
        'Bảng tần số ghép nhóm: $[5; 10)$: $4$; $[10; 15)$: $5$; $[15; 20)$: $6$; $[20; 25)$: $3$; $[25; 30)$: $2$.',
    },
    {
      problem:
        'Cân nặng (kg) của học sinh một lớp cho bởi bảng: $[40; 45)$: $5$; $[45; 50)$: $12$; $[50; 55)$: $15$; $[55; 60)$: $6$; $[60; 65)$: $2$. Lớp có bao nhiêu học sinh? Có bao nhiêu bạn nặng dưới $50$ kg, và bao nhiêu phần trăm số bạn nặng từ $55$ kg trở lên?',
      steps: [
        'Cỡ mẫu: $n = 5 + 12 + 15 + 6 + 2 = 40$.',
        'Các bạn nặng dưới $50$ kg thuộc hai nhóm $[40; 45)$ và $[45; 50)$: $5 + 12 = 17$ bạn.',
        'Các bạn nặng từ $55$ kg trở lên thuộc hai nhóm $[55; 60)$ và $[60; 65)$: $6 + 2 = 8$ bạn, chiếm $\\dfrac{8}{40} = 20\\%$.',
      ],
      answer:
        'Lớp có $40$ học sinh; $17$ bạn nặng dưới $50$ kg; $20\\%$ số bạn nặng từ $55$ kg trở lên.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Chiều cao (cm) của một số cây giống: $[10; 15)$: $3$ cây; $[15; 20)$: $8$ cây; $[20; 25)$: $12$ cây; $[25; 30)$: $7$ cây. Cỡ mẫu là bao nhiêu?',
      answer: 30,
      hints: ['Cỡ mẫu là tổng các tần số.'],
      solution: '$n = 3 + 8 + 12 + 7 = 30$.',
    },
    {
      type: 'number',
      prompt: 'Trong bảng chiều cao cây giống ở trên, độ dài của mỗi nhóm bằng bao nhiêu xentimét?',
      answer: 5,
      unit: 'cm',
      hints: ['Độ dài của nhóm $[a; b)$ là $b - a$.'],
      solution: 'Nhóm $[10; 15)$ có độ dài $15 - 10 = 5$ (cm); các nhóm khác cũng vậy.',
    },
    {
      type: 'choice',
      prompt: 'Một cây giống cao đúng $20$ cm được đếm vào nhóm nào trong bảng trên?',
      options: [
        '$[20; 25)$',
        '$[15; 20)$',
        'Cả hai nhóm $[15; 20)$ và $[20; 25)$',
        'Không thuộc nhóm nào',
      ],
      answer: 0,
      hints: ['Nhóm $[a; b)$ chứa các giá trị $x$ với $a \\le x < b$.'],
      solution:
        'Nhóm $[15; 20)$ chỉ chứa các giá trị nhỏ hơn $20$; giá trị $20$ thoả mãn $20 \\le 20 < 25$ nên thuộc nhóm $[20; 25)$. Mỗi giá trị thuộc đúng một nhóm.',
    },
    {
      type: 'number',
      prompt: 'Trong bảng chiều cao cây giống ở trên, có bao nhiêu cây cao dưới $20$ cm?',
      answer: 11,
      hints: ['Cây cao dưới $20$ cm nằm trong những nhóm có đầu mút phải không vượt quá $20$.'],
      solution: 'Đó là các cây thuộc nhóm $[10; 15)$ và $[15; 20)$: $3 + 8 = 11$ cây.',
    },
    {
      type: 'number',
      prompt:
        'Trong bảng chiều cao cây giống ở trên, số cây cao từ $25$ cm trở lên chiếm bao nhiêu phần trăm? (Làm tròn đến hàng phần mười.)',
      answer: 23.3,
      tolerance: 0.05,
      unit: '%',
      hints: [
        'Các cây cao từ $25$ cm trở lên nằm ở nhóm $[25; 30)$.',
        'Lấy tần số của nhóm đó chia cho cỡ mẫu $30$.',
      ],
      solution: 'Nhóm $[25; 30)$ có $7$ cây: $\\dfrac{7}{30} \\approx 0{,}2333 = 23{,}3\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Thời gian chạy $100$ m (giây) của $12$ bạn: $13{,}2$; $14{,}5$; $12{,}8$; $15{,}1$; $13{,}9$; $14{,}0$; $13{,}5$; $12{,}6$; $14{,}8$; $13{,}0$; $15{,}4$; $14{,}2$. Ghép thành các nhóm $[12; 13)$, $[13; 14)$, $[14; 15)$, $[15; 16)$. Tần số của nhóm $[14; 15)$ là bao nhiêu?',
      answer: 4,
      hints: ['Đếm các giá trị $x$ với $14 \\le x < 15$, nhớ tính cả $14{,}0$.'],
      solution:
        'Các giá trị thuộc nhóm $[14; 15)$ là $14{,}5$; $14{,}0$; $14{,}8$; $14{,}2$, nên tần số là $4$.',
    },
    {
      type: 'number',
      prompt:
        'Với mẫu thời gian chạy $100$ m ở câu trên, có bao nhiêu bạn chạy hết dưới $14$ giây?',
      answer: 6,
      hints: ['Đó là các bạn thuộc nhóm $[12; 13)$ và $[13; 14)$.'],
      solution:
        'Nhóm $[12; 13)$ có $12{,}8$; $12{,}6$ (tần số $2$); nhóm $[13; 14)$ có $13{,}2$; $13{,}9$; $13{,}5$; $13{,}0$ (tần số $4$). Vậy có $2 + 4 = 6$ bạn.',
    },
    {
      type: 'multi',
      prompt:
        'Một mẫu số liệu gồm các số nguyên, giá trị nhỏ nhất là $3$ và lớn nhất là $27$. Những cách chia nhóm nào dưới đây dùng được để ghép nhóm mẫu số liệu này?',
      options: [
        '$[0; 10)$, $[10; 20)$, $[20; 30)$',
        '$[0; 7)$, $[7; 14)$, $[14; 21)$, $[21; 28)$',
        '$[5; 10)$, $[10; 20)$, $[20; 30)$',
        '$[0; 10]$, $[10; 20]$, $[20; 30]$',
      ],
      answers: [0, 1],
      hints: [
        'Mỗi số liệu phải thuộc đúng một nhóm: các nhóm phải phủ hết từ $3$ đến $27$ và không được chồng lên nhau.',
      ],
      solution:
        'Cách chia $[0; 10)$, $[10; 20)$, $[20; 30)$ và cách chia $[0; 7)$, … , $[21; 28)$ đều phủ hết các giá trị từ $3$ đến $27$, mỗi giá trị thuộc đúng một nhóm. Cách chia bắt đầu từ $[5; 10)$ bỏ sót các giá trị $3$, $4$. Cách chia $[0; 10]$, $[10; 20]$, $[20; 30]$ làm giá trị $10$ và $20$ thuộc hai nhóm cùng lúc.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây về mẫu số liệu ghép nhóm là đúng?',
      options: [
        'Đầu mút của các nhóm có thể không phải là giá trị của mẫu số liệu.',
        'Từ bảng tần số ghép nhóm luôn khôi phục lại được mẫu số liệu gốc.',
        'Các nhóm bắt buộc phải có độ dài khác nhau.',
        'Tổng các tần số lớn hơn cỡ mẫu.',
      ],
      answer: 0,
      hints: ['Nhớ lại phần Chú ý về cách ghép nhóm và nhận xét về việc mất thông tin.'],
      solution:
        'Đầu mút nhóm do ta chọn, không cần là một giá trị của mẫu. Bảng ghép nhóm không còn cho biết từng giá trị nên không khôi phục được mẫu gốc; các nhóm thường có độ dài bằng nhau; tổng các tần số đúng bằng cỡ mẫu.',
    },
  ],
  takeaways: [
    'Mẫu số liệu ghép nhóm cho dưới dạng bảng tần số ghép nhóm: các nhóm $[a_i; a_{i+1})$ và tần số $m_i$ của chúng.',
    'Nhóm $[a; b)$ có đầu mút trái $a$, đầu mút phải $b$, độ dài $b - a$; nó chứa $a$ nhưng không chứa $b$ (trừ nhóm cuối có thể lấy cả $b$).',
    'Cỡ mẫu $n = m_1 + m_2 + \\cdots + m_k$.',
    'Ghép nhóm: chia miền giá trị thành các nhóm (thường cùng độ dài), đếm tần số từng nhóm rồi lập bảng.',
    'Ghép nhóm làm mất thông tin về từng giá trị, nên các số đặc trưng tính từ mẫu ghép nhóm chỉ là xấp xỉ.',
  ],
};
