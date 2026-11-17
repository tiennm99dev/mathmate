/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoán vị, chỉnh hợp và tổ hợp: các công thức P_n = n!, chỉnh hợp chập k của n và tổ hợp chập k của n, phân biệt cách đếm có xét thứ tự và không xét thứ tự.',
  intro:
    'Chọn $2$ bạn trong $5$ bạn làm lớp trưởng và lớp phó khác với chọn $2$ bạn trong $5$ bạn đi trực nhật: ở việc thứ nhất, đổi vai hai bạn cho nhau là một cách khác; ở việc thứ hai thì không. Hoán vị, chỉnh hợp và tổ hợp là ba công cụ đếm nhanh cho đúng những tình huống như thế.',
  objectives: [
    'Nhận biết hoán vị, chỉnh hợp, tổ hợp và tính $P_n$, $A_n^k$, $C_n^k$.',
    'Phân biệt bài toán có xét thứ tự (chỉnh hợp, hoán vị) với bài toán không xét thứ tự (tổ hợp).',
    'Vận dụng hoán vị, chỉnh hợp, tổ hợp cùng quy tắc cộng, quy tắc nhân để giải bài toán đếm.',
  ],
  sections: [
    {
      heading: 'Hoán vị',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hoán vị',
          text: 'Một hoán vị của một tập hợp có $n$ phần tử là một cách sắp xếp có thứ tự $n$ phần tử đó (với $n$ là số tự nhiên, $n \\ge 1$).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Số các hoán vị',
          text: 'Số các hoán vị của tập hợp có $n$ phần tử, kí hiệu là $P_n$, được tính bằng công thức $$P_n = n \\cdot (n - 1) \\cdot (n - 2) \\cdots 2 \\cdot 1.$$',
        },
        {
          type: 'p',
          text: 'Kí hiệu $n \\cdot (n - 1) \\cdots 2 \\cdot 1$ là $n!$ (đọc là "$n$ giai thừa"), do đó $P_n = n!$. Chẳng hạn $3! = 6$, $4! = 24$, $5! = 120$. Quy ước $0! = 1$.',
        },
        {
          type: 'p',
          text: 'Công thức có được từ quy tắc nhân: vị trí thứ nhất có $n$ cách chọn phần tử, vị trí thứ hai còn $n - 1$ cách, …, vị trí cuối cùng còn $1$ cách.',
        },
      ],
    },
    {
      heading: 'Chỉnh hợp',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chỉnh hợp',
          text: 'Một chỉnh hợp chập $k$ của $n$ là một cách sắp xếp có thứ tự $k$ phần tử từ một tập hợp $n$ phần tử (với $k$, $n$ là các số tự nhiên, $1 \\le k \\le n$).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Số các chỉnh hợp',
          text: 'Số các chỉnh hợp chập $k$ của một tập hợp có $n$ phần tử, kí hiệu là $A_n^k$, được tính bằng công thức $$A_n^k = n \\cdot (n - 1) \\cdots (n - k + 1)$$ hay $$A_n^k = \\dfrac{n!}{(n - k)!}.$$',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hoán vị của tập hợp có $n$ phần tử chính là chỉnh hợp chập $n$ của $n$. Vì vậy $A_n^n = P_n = n!$.',
        },
      ],
    },
    {
      heading: 'Tổ hợp',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tổ hợp',
          text: 'Một tổ hợp chập $k$ của $n$ là một cách chọn $k$ phần tử từ một tập hợp $n$ phần tử, không tính thứ tự (với $k$, $n$ là các số tự nhiên, $1 \\le k \\le n$). Mỗi tổ hợp chập $k$ của $n$ là một tập con có $k$ phần tử.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Số các tổ hợp',
          text: 'Số các tổ hợp chập $k$ của một tập hợp có $n$ phần tử, kí hiệu là $C_n^k$, được tính bằng công thức $$C_n^k = \\dfrac{n!}{(n - k)!\\,k!} = \\dfrac{A_n^k}{k!}.$$',
        },
        {
          type: 'p',
          text: 'Vì sao chia cho $k!$? Mỗi tổ hợp chập $k$ (một nhóm $k$ phần tử) xếp theo thứ tự được $k!$ chỉnh hợp khác nhau, nên $A_n^k = C_n^k \\cdot k!$.',
        },
        {
          type: 'list',
          items: [
            'Quy ước $C_n^0 = 1$ (có đúng một cách chọn không phần tử nào); công thức trên vẫn đúng với $k = 0$.',
            'Tính chất: $C_n^k = C_n^{n - k}$ với $0 \\le k \\le n$, vì chọn $k$ phần tử để lấy cũng là chọn $n - k$ phần tử để bỏ lại.',
          ],
        },
        {
          type: 'table',
          caption: 'Chọn công cụ đếm',
          head: ['Tình huống', 'Có xét thứ tự?', 'Công thức'],
          rows: [
            ['Xếp cả $n$ phần tử', 'Có', '$P_n = n!$'],
            ['Chọn $k$ phần tử rồi xếp (vai trò khác nhau)', 'Có', '$A_n^k$'],
            ['Chọn $k$ phần tử thành một nhóm', 'Không', '$C_n^k$'],
          ],
        },
        {
          type: 'p',
          text: 'Trên máy tính cầm tay, $n!$ tính bằng phím $x!$, còn $A_n^k$ và $C_n^k$ tính bằng các phím $\\mathrm{nPr}$ và $\\mathrm{nCr}$ (chẳng hạn bấm $5\\ \\mathrm{nCr}\\ 2$ được $10$).',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp thẻ học sinh vào ghế',
    instruction:
      'Chạm vào thẻ để đưa từng bạn vào chỗ. Ở chế độ "Xếp vào ghế", đổi chỗ hai bạn là một cách mới; ở chế độ "Chọn nhóm", cùng các bạn đó theo thứ tự khác bị báo trùng. Đếm xem tìm được bao nhiêu cách rồi bấm "Liệt kê hết" để so với $P_n$, $A_n^k$, $C_n^k$.',
  },
  examples: [
    {
      problem: 'Có bao nhiêu cách xếp $6$ bạn học sinh ngồi vào một dãy $6$ ghế?',
      steps: [
        'Mỗi cách xếp là một cách sắp thứ tự cả $6$ bạn, tức là một hoán vị của $6$ phần tử.',
        'Số cách xếp là $P_6 = 6! = 6 \\cdot 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 720$.',
      ],
      answer: '$720$ cách.',
    },
    {
      problem:
        'Một cuộc thi chạy có $10$ vận động viên. Có bao nhiêu kết quả có thể về ba vị trí nhất, nhì, ba (không có hai người về đích cùng lúc)?',
      steps: [
        'Mỗi kết quả là một cách chọn $3$ trong $10$ vận động viên và xếp thứ tự nhất, nhì, ba.',
        'Đổi vị trí hai người là một kết quả khác, nên mỗi kết quả là một chỉnh hợp chập $3$ của $10$.',
        'Số kết quả là $A_{10}^3 = 10 \\cdot 9 \\cdot 8 = 720$.',
      ],
      answer: '$720$ kết quả.',
    },
    {
      problem:
        'Một tổ có $6$ bạn nam và $4$ bạn nữ. Có bao nhiêu cách chọn $3$ bạn đi lao động, trong đó có đúng $2$ bạn nam?',
      steps: [
        'Nhóm $3$ bạn không phân biệt vai trò nên dùng tổ hợp.',
        'Chọn $2$ bạn nam trong $6$ bạn nam: $C_6^2 = \\dfrac{6 \\cdot 5}{2} = 15$ cách.',
        'Chọn $1$ bạn nữ trong $4$ bạn nữ: $C_4^1 = 4$ cách.',
        'Theo quy tắc nhân, có $15 \\cdot 4 = 60$ cách.',
      ],
      answer: '$60$ cách.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Có bao nhiêu cách xếp $4$ quyển sách khác nhau thành một hàng trên giá?',
      answer: 24,
      unit: 'cách',
      hints: ['Mỗi cách xếp là một hoán vị của $4$ quyển sách.'],
      solution: '$P_4 = 4! = 4 \\cdot 3 \\cdot 2 \\cdot 1 = 24$ cách.',
    },
    {
      type: 'number',
      prompt: 'Lớp có $30$ học sinh. Có bao nhiêu cách chọn một lớp trưởng và một lớp phó?',
      answer: 870,
      unit: 'cách',
      hints: [
        'Lớp trưởng và lớp phó là hai vai khác nhau: đổi vai là một cách khác.',
        'Đó là chỉnh hợp chập $2$ của $30$.',
      ],
      solution: '$A_{30}^2 = 30 \\cdot 29 = 870$ cách.',
    },
    {
      type: 'number',
      prompt: 'Lớp có $30$ học sinh. Có bao nhiêu cách chọn $2$ bạn đi trực nhật?',
      answer: 435,
      unit: 'cách',
      hints: [
        'Hai bạn trực nhật có cùng một việc, nên không xét thứ tự.',
        'Tính $C_{30}^2 = \\dfrac{A_{30}^2}{2!}$.',
      ],
      solution:
        '$C_{30}^2 = \\dfrac{30 \\cdot 29}{2} = 435$ cách, đúng bằng một nửa số cách chọn lớp trưởng và lớp phó.',
    },
    {
      type: 'choice',
      prompt: 'Số cách chọn $3$ bạn trong $10$ bạn để cùng đi dự một hội nghị là',
      options: ['$C_{10}^3$', '$A_{10}^3$', '$P_3$', '$10^3$'],
      answer: 0,
      hints: ['Ba bạn được chọn có vai trò như nhau không?', 'Không xét thứ tự thì dùng tổ hợp.'],
      solution:
        'Ba bạn cùng đi dự hội nghị, đổi thứ tự không tạo ra nhóm mới, nên số cách là $C_{10}^3 = 120$. $A_{10}^3$ chỉ đúng khi ba bạn giữ ba vai khác nhau.',
    },
    {
      type: 'multi',
      prompt: 'Những số nào dưới đây bằng $120$?',
      options: ['$5!$', '$A_6^3$', '$C_{10}^3$', '$C_6^3$', '$A_5^2$'],
      answers: [0, 1, 2],
      hints: ['Tính từng số: $A_n^k$ là tích $k$ thừa số giảm dần bắt đầu từ $n$.'],
      solution:
        '$5! = 120$; $A_6^3 = 6 \\cdot 5 \\cdot 4 = 120$; $C_{10}^3 = \\dfrac{10 \\cdot 9 \\cdot 8}{6} = 120$; còn $C_6^3 = 20$ và $A_5^2 = 20$.',
    },
    {
      type: 'number',
      prompt:
        'Từ các chữ số $1, 2, 3, 4, 5, 6, 7$ lập được bao nhiêu số tự nhiên có bốn chữ số khác nhau?',
      answer: 840,
      unit: 'số',
      hints: ['Mỗi số là một cách chọn $4$ chữ số và xếp thứ tự.', 'Tính $A_7^4$.'],
      solution:
        'Mỗi số là một chỉnh hợp chập $4$ của $7$: $A_7^4 = 7 \\cdot 6 \\cdot 5 \\cdot 4 = 840$ số.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\dfrac{A_6^3}{C_6^3}$.',
      answer: 6,
      hints: ['Nhớ hệ thức $A_n^k = C_n^k \\cdot k!$.'],
      solution: '$A_6^3 = 120$, $C_6^3 = 20$, nên thương bằng $6 = 3!$.',
    },
    {
      type: 'number',
      prompt: 'Một đa giác lồi có $10$ cạnh. Đa giác đó có bao nhiêu đường chéo?',
      answer: 35,
      unit: 'đường chéo',
      hints: [
        'Mỗi đoạn thẳng nối hai đỉnh ứng với một tổ hợp chập $2$ của $10$ đỉnh.',
        'Bỏ đi những đoạn là cạnh của đa giác.',
      ],
      solution:
        'Số đoạn nối hai đỉnh là $C_{10}^2 = 45$, trong đó $10$ đoạn là cạnh. Có $45 - 10 = 35$ đường chéo.',
    },
    {
      type: 'number',
      prompt:
        'Đề kiểm tra có $10$ câu hỏi, học sinh được chọn làm $8$ câu. Có bao nhiêu cách chọn?',
      answer: 45,
      unit: 'cách',
      hints: ['Chọn $8$ câu để làm cũng là chọn $2$ câu để bỏ.', 'Dùng $C_n^k = C_n^{n-k}$.'],
      solution: '$C_{10}^8 = C_{10}^2 = \\dfrac{10 \\cdot 9}{2} = 45$ cách.',
    },
    {
      type: 'number',
      prompt:
        'Một nhóm có $5$ bạn nam và $4$ bạn nữ. Có bao nhiêu cách chọn $4$ bạn gồm $2$ nam và $2$ nữ?',
      answer: 60,
      unit: 'cách',
      hints: ['Chọn nam và chọn nữ là hai công đoạn.', 'Tính $C_5^2$ và $C_4^2$ rồi nhân.'],
      solution: '$C_5^2 \\cdot C_4^2 = 10 \\cdot 6 = 60$ cách.',
    },
  ],
  takeaways: [
    'Hoán vị: sắp thứ tự cả $n$ phần tử, $P_n = n!$ (quy ước $0! = 1$).',
    'Chỉnh hợp chập $k$ của $n$: chọn $k$ phần tử có xét thứ tự, $A_n^k = \\dfrac{n!}{(n-k)!}$.',
    'Tổ hợp chập $k$ của $n$: chọn $k$ phần tử không xét thứ tự, $C_n^k = \\dfrac{n!}{(n-k)!\\,k!}$, và $C_n^k = C_n^{n-k}$.',
    'Đổi chỗ hai phần tử mà được cách mới thì dùng chỉnh hợp; không được cách mới thì dùng tổ hợp.',
  ],
};
