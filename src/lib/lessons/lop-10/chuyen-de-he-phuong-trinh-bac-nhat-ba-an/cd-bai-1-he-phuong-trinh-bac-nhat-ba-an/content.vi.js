/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hệ phương trình bậc nhất ba ẩn và nghiệm của hệ; giải hệ dạng tam giác; phương pháp Gauss đưa hệ về dạng tam giác bằng các phép biến đổi tương đương; nhận biết hệ có nghiệm duy nhất, vô nghiệm hoặc vô số nghiệm; tìm nghiệm bằng máy tính cầm tay.',
  intro:
    'Ba bạn Hà, Lan và Minh đi mua đồ dùng học tập. Biết số bút, số vở, số thước mỗi bạn mua và số tiền mỗi bạn trả, làm sao tìm được giá của mỗi món? Gọi giá ba món là $x$, $y$, $z$, ta được ba phương trình bậc nhất với ba ẩn. Bài này cho em một cách giải có hệ thống cho mọi hệ như vậy: phương pháp Gauss.',
  objectives: [
    'Nhận biết hệ phương trình bậc nhất ba ẩn và kiểm tra một bộ ba số có là nghiệm của hệ hay không.',
    'Giải hệ phương trình dạng tam giác bằng cách giải ngược từ phương trình cuối lên.',
    'Dùng phương pháp Gauss đưa hệ về dạng tam giác, từ đó kết luận hệ có nghiệm duy nhất, vô nghiệm hoặc vô số nghiệm.',
    'Tìm nghiệm của hệ bằng máy tính cầm tay.',
  ],
  sections: [
    {
      heading: 'Hệ phương trình bậc nhất ba ẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Hệ phương trình bậc nhất ba ẩn là hệ gồm ba phương trình, mỗi phương trình là một phương trình bậc nhất ba ẩn $x$, $y$, $z$. Dạng tổng quát: $$\\begin{cases} a_1x + b_1y + c_1z = d_1 \\\\ a_2x + b_2y + c_2z = d_2 \\\\ a_3x + b_3y + c_3z = d_3 \\end{cases}$$ trong đó $a_i, b_i, c_i, d_i$ là các số thực cho trước và $a_i, b_i, c_i$ không đồng thời bằng $0$ ($i = 1, 2, 3$).',
        },
        {
          type: 'p',
          text: 'Mỗi bộ ba số $(x_0; y_0; z_0)$ nghiệm đúng cả ba phương trình của hệ được gọi là một nghiệm của hệ. Giải hệ là tìm tất cả các nghiệm của nó. Để kiểm tra một bộ ba số có là nghiệm hay không, em thay vào từng phương trình: chỉ cần một phương trình sai là bộ số đó không phải nghiệm.',
        },
        {
          type: 'p',
          text: 'Một phương trình có thể vắng một hay hai ẩn, khi đó hệ số của ẩn vắng bằng $0$. Chẳng hạn $x - 2z = 5$ là phương trình bậc nhất ba ẩn với $a = 1$, $b = 0$, $c = -2$, $d = 5$. Ngược lại, hệ có số hạng $xy$, $z^2$ hay $\\dfrac{1}{x}$ không phải là hệ bậc nhất.',
        },
      ],
    },
    {
      heading: 'Hệ dạng tam giác',
      blocks: [
        {
          type: 'p',
          text: 'Hệ dạng tam giác là hệ mà phương trình thứ hai không có ẩn $x$, phương trình thứ ba không có ẩn $x$ và $y$, chẳng hạn',
        },
        {
          type: 'tex',
          tex: '\\begin{cases} x + y - 2z = 3 \\\\ y + z = 7 \\\\ 2z = 4. \\end{cases}',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách giải',
          text: 'Giải ngược từ dưới lên: từ phương trình thứ ba tìm $z$, thay $z$ vào phương trình thứ hai tìm $y$, rồi thay $y$, $z$ vào phương trình thứ nhất tìm $x$. Ở hệ trên: $z = 2$, $y = 7 - 2 = 5$, $x = 3 - 5 + 2 \\cdot 2 = 2$; nghiệm là $(2; 5; 2)$.',
        },
      ],
    },
    {
      heading: 'Phương pháp Gauss',
      blocks: [
        {
          type: 'p',
          text: 'Mọi hệ phương trình bậc nhất ba ẩn đều có thể đưa về dạng tam giác bằng các phép biến đổi sau. Mỗi phép biến đổi cho một hệ mới tương đương với hệ cũ (có cùng tập nghiệm).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Nhân hai vế của một phương trình với một số khác $0$.',
            'Đổi vị trí hai phương trình của hệ.',
            'Cộng mỗi vế của một phương trình (sau khi nhân với một số khác $0$) với vế tương ứng của một phương trình khác.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương pháp Gauss',
          text: 'Dùng phương trình có ẩn $x$ (đặt lên đầu) để khử $x$ khỏi hai phương trình còn lại; sau đó dùng phương trình thứ hai để khử $y$ khỏi phương trình thứ ba. Hệ nhận được có dạng tam giác; giải ngược từ dưới lên.',
        },
      ],
    },
    {
      heading: 'Hệ vô nghiệm, hệ vô số nghiệm',
      blocks: [
        {
          type: 'p',
          text: 'Khi khử ẩn, có thể cả ba hệ số của một phương trình đều bằng $0$, tức là được phương trình dạng $0z = d$.',
        },
        {
          type: 'list',
          items: [
            'Nếu $d \\ne 0$ thì phương trình $0z = d$ vô nghiệm, do đó hệ vô nghiệm.',
            'Nếu $d = 0$ thì phương trình $0z = 0$ đúng với mọi $z$. Khi đó hệ thường có vô số nghiệm: coi $z$ là tuỳ ý rồi biểu diễn $y$ và $x$ theo $z$.',
            'Nếu sau khi đưa về dạng tam giác, hệ số của $z$ ở phương trình cuối khác $0$ (và hệ số của $x$, $y$ ở hai phương trình đầu khác $0$) thì hệ có nghiệm duy nhất.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đừng dừng lại khi mới tìm được một nghiệm của hệ vô số nghiệm: phải viết nghiệm tổng quát, chẳng hạn $(z - 1; 3 - 2z; z)$ với $z \\in \\mathbb{R}$.',
        },
      ],
    },
    {
      heading: 'Tìm nghiệm bằng máy tính cầm tay',
      blocks: [
        {
          type: 'p',
          text: 'Nhiều loại máy tính cầm tay có chương trình giải hệ ba phương trình bậc nhất ba ẩn. Trước hết viết mỗi phương trình về dạng $ax + by + cz = d$ (ẩn vắng có hệ số $0$), rồi:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn chương trình giải hệ phương trình bậc nhất ba ẩn. Với máy Casio fx-570VN PLUS: bấm MODE 5 (EQN), rồi chọn 2 (dạng $a_nX + b_nY + c_nZ = d_n$).',
            'Nhập lần lượt bốn số $a$, $b$, $c$, $d$ của từng phương trình, mỗi số bấm =.',
            'Bấm = để máy hiện lần lượt giá trị của $x$, $y$, $z$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Khi hệ vô nghiệm hoặc có vô số nghiệm, máy chỉ báo như vậy mà không cho nghiệm tổng quát; khi đó em giải bằng phương pháp Gauss. Máy tính rất tiện để kiểm tra lại kết quả giải tay.',
        },
      ],
    },
    {
      heading: 'Dự án: Ba cách giải một hệ phương trình',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm $3$ – $4$ học sinh tự lập ba hệ phương trình bậc nhất ba ẩn (một hệ có nghiệm duy nhất, một hệ vô nghiệm, một hệ vô số nghiệm), giải mỗi hệ bằng phương pháp Gauss và kiểm tra bằng máy tính cầm tay.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: giấy nháp, máy tính cầm tay, có thể dùng phần mềm bảng tính hoặc GeoGebra.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn trước một bộ ba số nguyên, chẳng hạn $(2; -1; 3)$, rồi viết ba phương trình nhận bộ số này làm nghiệm: đó là hệ có nghiệm duy nhất (kiểm tra bằng máy tính).',
            'Lấy phương trình thứ ba bằng tổng hai phương trình đầu: được hệ vô số nghiệm. Đổi vế phải của phương trình thứ ba đi một đơn vị: được hệ vô nghiệm.',
            'Đổi hệ với nhóm bạn. Giải ba hệ của nhóm bạn bằng phương pháp Gauss, ghi rõ từng phép biến đổi.',
            'Dùng máy tính cầm tay giải lại ba hệ đó và so sánh với kết quả giải tay.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng ghi ba hệ, các bước khử Gauss, kết luận về nghiệm, kết quả của máy tính và nhận xét: vì sao máy tính không cho nghiệm tổng quát của hệ vô số nghiệm?',
        },
      ],
    },
  ],
  explore: {
    title: 'Khử Gauss từng bước',
    instruction:
      'Chọn một hệ, chọn phép biến đổi (cộng với bội của phương trình khác, nhân hai vế với một số, đổi chỗ hai phương trình) rồi bấm "Thực hiện". Hãy đưa hệ về dạng tam giác: $x$ vắng ở phương trình (2) và (3), $y$ vắng ở phương trình (3). Bí thì bấm "Gợi ý bước tiếp". Hệ 3 và Hệ 4 có điều gì đặc biệt?',
  },
  examples: [
    {
      problem:
        'Giải hệ phương trình $\\begin{cases} x + y - 2z = 3 \\\\ y + z = 7 \\\\ 2z = 4. \\end{cases}$',
      steps: [
        'Hệ có dạng tam giác. Từ phương trình thứ ba: $z = 2$.',
        'Thay $z = 2$ vào phương trình thứ hai: $y + 2 = 7$, nên $y = 5$.',
        'Thay $y = 5$, $z = 2$ vào phương trình thứ nhất: $x + 5 - 4 = 3$, nên $x = 2$.',
      ],
      answer: 'Hệ có nghiệm duy nhất $(x; y; z) = (2; 5; 2)$.',
    },
    {
      problem:
        'Giải hệ phương trình bằng phương pháp Gauss: $\\begin{cases} x + y - 2z = 3 & (1) \\\\ -x + y + 6z = 13 & (2) \\\\ 2x + y - 9z = -5 & (3) \\end{cases}$',
      steps: [
        'Khử $x$ ở (2): cộng (2) với (1), được $2y + 4z = 16$, tức $y + 2z = 8$.',
        'Khử $x$ ở (3): cộng (3) với $(-2)$ lần (1), được $-y - 5z = -11$.',
        'Khử $y$ ở phương trình cuối: cộng $-y - 5z = -11$ với $y + 2z = 8$, được $-3z = -3$.',
        'Hệ dạng tam giác $\\begin{cases} x + y - 2z = 3 \\\\ y + 2z = 8 \\\\ -3z = -3 \\end{cases}$ cho $z = 1$, $y = 8 - 2 = 6$, $x = 3 - 6 + 2 = -1$.',
        'Thử lại ở (3): $2 \\cdot (-1) + 6 - 9 \\cdot 1 = -5$, đúng.',
      ],
      answer: 'Hệ có nghiệm duy nhất $(-1; 6; 1)$.',
    },
    {
      problem:
        'Giải hệ phương trình $\\begin{cases} x + y + z = 1 \\\\ 2x + 3y + z = 4 \\\\ 3x + 4y + 2z = 7. \\end{cases}$',
      steps: [
        'Cộng phương trình thứ hai với $(-2)$ lần phương trình thứ nhất: $y - z = 2$.',
        'Cộng phương trình thứ ba với $(-3)$ lần phương trình thứ nhất: $y - z = 4$.',
        'Cộng phương trình mới thứ ba với $(-1)$ lần phương trình mới thứ hai: $0z = 2$.',
        'Phương trình $0z = 2$ vô nghiệm.',
      ],
      answer: 'Hệ vô nghiệm.',
    },
    {
      problem:
        'Giải hệ phương trình $\\begin{cases} x + y + z = 2 \\\\ x + 2y + 3z = 5 \\\\ 2x + 3y + 4z = 7. \\end{cases}$',
      steps: [
        'Cộng phương trình thứ hai với $(-1)$ lần phương trình thứ nhất: $y + 2z = 3$.',
        'Cộng phương trình thứ ba với $(-2)$ lần phương trình thứ nhất: $y + 2z = 3$.',
        'Trừ hai phương trình mới: $0z = 0$, đúng với mọi $z$. Hệ tương đương với $\\begin{cases} x + y + z = 2 \\\\ y + 2z = 3. \\end{cases}$',
        'Coi $z$ tuỳ ý: $y = 3 - 2z$ và $x = 2 - y - z = 2 - (3 - 2z) - z = z - 1$.',
      ],
      answer: 'Hệ có vô số nghiệm $(z - 1; 3 - 2z; z)$ với $z \\in \\mathbb{R}$.',
    },
    {
      problem:
        'Dùng máy tính cầm tay tìm nghiệm của hệ $\\begin{cases} -2x - 3y + z = 5 \\\\ 2x + y + 2z = -3 \\\\ -x + 2y - 3z = 2. \\end{cases}$',
      steps: [
        'Chọn chương trình giải hệ ba ẩn (fx-570VN PLUS: MODE 5 2).',
        'Nhập các hệ số: $-2, -3, 1, 5$; $2, 1, 2, -3$; $-1, 2, -3, 2$.',
        'Bấm = được $x = -4$, $y = \\dfrac{11}{7}$, $z = \\dfrac{12}{7}$.',
        'Thử lại ở phương trình thứ nhất: $8 - \\dfrac{33}{7} + \\dfrac{12}{7} = 8 - 3 = 5$, đúng.',
      ],
      answer: 'Nghiệm của hệ là $\\left(-4; \\dfrac{11}{7}; \\dfrac{12}{7}\\right)$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hệ nào dưới đây là hệ phương trình bậc nhất ba ẩn?',
      options: [
        '$\\begin{cases} x + y - z = 1 \\\\ 2x - 3z = 0 \\\\ y + z = 4 \\end{cases}$',
        '$\\begin{cases} x + y - z = 1 \\\\ xy + z = 2 \\\\ y + z = 4 \\end{cases}$',
        '$\\begin{cases} x + y - z = 1 \\\\ 2x - 3z^2 = 0 \\\\ y + z = 4 \\end{cases}$',
        '$\\begin{cases} x + y - z = 1 \\\\ 2x - \\dfrac{3}{z} = 0 \\\\ y + z = 4 \\end{cases}$',
      ],
      answer: 0,
      hints: [
        'Một phương trình bậc nhất chỉ chứa các ẩn với số mũ $1$, không có tích hai ẩn hay ẩn ở mẫu.',
      ],
      solution:
        'Hệ có $2x - 3z = 0$ là hệ bậc nhất ba ẩn (phương trình này vắng $y$, hệ số của $y$ bằng $0$). Các hệ còn lại có $xy$, $z^2$ hoặc $\\dfrac{3}{z}$ nên không phải hệ bậc nhất.',
    },
    {
      type: 'choice',
      prompt:
        'Bộ ba số nào là nghiệm của hệ $\\begin{cases} x + y + z = -2 \\\\ 2x - y + z = -9 \\\\ x + 2y - z = 2? \\end{cases}$',
      options: ['$(-3; 2; -1)$', '$(3; -2; 1)$', '$(-3; 2; 1)$', '$(-2; 1; -1)$'],
      answer: 0,
      hints: ['Thay từng bộ số vào cả ba phương trình; chỉ cần một phương trình sai là loại.'],
      solution:
        'Với $(-3; 2; -1)$: $-3 + 2 - 1 = -2$, $-6 - 2 - 1 = -9$, $-3 + 4 + 1 = 2$, cả ba đúng. Bộ $(3; -2; 1)$ cho $3 - 2 + 1 = 2 \\ne -2$; bộ $(-3; 2; 1)$ cho $-3 + 2 + 1 = 0 \\ne -2$; bộ $(-2; 1; -1)$ cho $-4 - 1 - 1 = -6 \\ne -9$.',
    },
    {
      type: 'number',
      prompt:
        'Giải hệ $\\begin{cases} 2x - y - z = 20 \\\\ x + y = -5 \\\\ x = 10. \\end{cases}$ Giá trị của $z$ là bao nhiêu?',
      answer: 15,
      hints: ['Hệ có dạng tam giác "ngược": tìm $x$ trước, rồi $y$, rồi $z$.'],
      solution:
        '$x = 10$; $y = -5 - 10 = -15$; $z = 2x - y - 20 = 20 + 15 - 20 = 15$. Nghiệm $(10; -15; 15)$.',
    },
    {
      type: 'fraction',
      prompt:
        'Giải hệ $\\begin{cases} 2x = 3 \\\\ x + y = 2 \\\\ 2x - 2y + z = -1. \\end{cases}$ Giá trị của $y$ là bao nhiêu? (Viết dạng phân số $a/b$.)',
      answer: [1, 2],
      hints: ['Từ phương trình đầu tìm $x$, rồi thay vào phương trình thứ hai.'],
      solution:
        '$x = \\dfrac{3}{2}$; $y = 2 - \\dfrac{3}{2} = \\dfrac{1}{2}$; $z = -1 - 2x + 2y = -1 - 3 + 1 = -3$. Nghiệm $\\left(\\dfrac{3}{2}; \\dfrac{1}{2}; -3\\right)$.',
    },
    {
      type: 'number',
      prompt:
        'Giải hệ bằng phương pháp Gauss: $\\begin{cases} 2x + y - 3z = 3 \\\\ x + y + 3z = 2 \\\\ 3x - 2y + z = 1. \\end{cases}$ Giá trị của $x$ là bao nhiêu?',
      answer: 1,
      hints: [
        'Đưa phương trình $x + y + 3z = 2$ lên đầu rồi khử $x$ ở hai phương trình còn lại.',
        'Được $-y - 9z = -1$ và $-5y - 8z = -5$; khử $y$ ở phương trình sau.',
      ],
      solution:
        'Đổi chỗ: (1) $x + y + 3z = 2$, (2) $2x + y - 3z = 3$, (3) $3x - 2y + z = 1$. (2) $- 2\\cdot$(1): $-y - 9z = -1$. (3) $- 3\\cdot$(1): $-5y - 8z = -5$. Lấy phương trình sau trừ $5$ lần phương trình trước: $37z = 0$, nên $z = 0$, $y = 1$, $x = 2 - 1 - 0 = 1$. Nghiệm $(1; 1; 0)$.',
    },
    {
      type: 'text',
      prompt:
        'Giải hệ $\\begin{cases} 2x - y - z = 2 \\\\ x + y = 3 \\\\ x - y + z = 2 \\end{cases}$ và viết nghiệm dạng $(x; y; z)$.',
      accept: ['(2;1;1)', '(2; 1; 1)', '2;1;1', '2; 1; 1', '(2,1,1)', '(2, 1, 1)'],
      hints: [
        'Đưa $x + y = 3$ lên đầu và khử $x$ ở hai phương trình kia.',
        'Được $-3y - z = -4$ và $-2y + z = -1$; cộng hai phương trình này.',
      ],
      solution:
        'Hệ tương đương $\\begin{cases} x + y = 3 \\\\ -3y - z = -4 \\\\ -2y + z = -1. \\end{cases}$ Cộng hai phương trình cuối: $-5y = -5$, nên $y = 1$, $z = 4 - 3 = 1$, $x = 3 - 1 = 2$. Nghiệm $(2; 1; 1)$.',
    },
    {
      type: 'choice',
      prompt:
        'Hệ $\\begin{cases} x + 2y - z = 3 \\\\ 2x - y + z = 1 \\\\ 3x + y = 5 \\end{cases}$ có bao nhiêu nghiệm?',
      options: ['Vô nghiệm', 'Nghiệm duy nhất', 'Vô số nghiệm'],
      answer: 0,
      hints: ['Cộng hai phương trình đầu rồi so sánh với phương trình thứ ba.'],
      solution:
        'Cộng hai phương trình đầu: $3x + y = 4$. Kết hợp với $3x + y = 5$ được $0z = 1$ (vô lí). Vậy hệ vô nghiệm.',
    },
    {
      type: 'choice',
      prompt:
        'Nghiệm của hệ $\\begin{cases} x - y + z = 1 \\\\ 2x + y - z = 2 \\\\ 4x - y + z = 4 \\end{cases}$ là',
      options: [
        '$(1; z; z)$ với $z \\in \\mathbb{R}$',
        '$(1; -z; z)$ với $z \\in \\mathbb{R}$',
        '$(1; 0; 0)$',
        'Hệ vô nghiệm',
      ],
      answer: 0,
      hints: [
        'Khử $x$: cộng phương trình thứ hai với $(-2)$ lần phương trình thứ nhất, phương trình thứ ba với $(-4)$ lần phương trình thứ nhất.',
        'Hai phương trình mới giống nhau: được $0z = 0$.',
      ],
      solution:
        'Khử $x$ được $3y - 3z = 0$ và $3y - 3z = 0$, nên phương trình cuối thành $0z = 0$. Từ $y - z = 0$: $y = z$; thay vào phương trình đầu: $x = 1 + y - z = 1$. Hệ có vô số nghiệm $(1; z; z)$, $z \\in \\mathbb{R}$. Bộ $(1; 0; 0)$ chỉ là một trong vô số nghiệm đó.',
    },
    {
      type: 'number',
      prompt:
        'An mua $2$ bút, $3$ vở, $1$ thước hết $46$ nghìn đồng; Bình mua $1$ bút, $2$ vở, $2$ thước hết $34$ nghìn đồng; Chi mua $3$ bút, $1$ vở, $2$ thước hết $36$ nghìn đồng. Giá một quyển vở là bao nhiêu nghìn đồng?',
      answer: 10,
      unit: 'nghìn đồng',
      hints: [
        'Gọi giá một bút, một vở, một thước là $x$, $y$, $z$ (nghìn đồng) và lập hệ ba phương trình.',
        'Hệ $\\begin{cases} 2x + 3y + z = 46 \\\\ x + 2y + 2z = 34 \\\\ 3x + y + 2z = 36 \\end{cases}$: đưa phương trình thứ hai lên đầu rồi khử $x$.',
      ],
      solution:
        'Đổi chỗ để $x + 2y + 2z = 34$ đứng đầu. Khử $x$: $-y - 3z = -22$ và $-5y - 4z = -66$. Khử $y$: $11z = 44$, $z = 4$; $y = 22 - 12 = 10$; $x = 34 - 20 - 8 = 6$. Bút $6$ nghìn, vở $10$ nghìn, thước $4$ nghìn đồng.',
    },
    {
      type: 'choice',
      prompt:
        'Khi giải hệ bằng máy tính cầm tay, phương trình $x - 2z = 5$ được nhập bằng bốn số $a, b, c, d$ nào?',
      options: ['$1, 0, -2, 5$', '$1, -2, 5, 0$', '$1, -2, 0, 5$', '$0, 1, -2, 5$'],
      answer: 0,
      hints: ['Viết đủ ba ẩn: $x + 0y - 2z = 5$.'],
      solution:
        '$x - 2z = 5$ là $1x + 0y + (-2)z = 5$, nên nhập $a = 1$, $b = 0$, $c = -2$, $d = 5$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước giải một hệ có nghiệm duy nhất bằng phương pháp Gauss.',
      items: [
        'Khử $x$ khỏi phương trình thứ hai và thứ ba.',
        'Khử $y$ khỏi phương trình thứ ba để được hệ dạng tam giác.',
        'Từ phương trình thứ ba tìm $z$.',
        'Thay ngược lên tìm $y$, rồi tìm $x$.',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Phương pháp Gauss khử dần ẩn từ trên xuống, rồi giải ngược từ dưới lên.'],
      solution:
        'Khử $x$ ở hai phương trình dưới, khử $y$ ở phương trình cuối (được dạng tam giác), tìm $z$, rồi lần lượt tìm $y$ và $x$.',
    },
  ],
  takeaways: [
    'Nghiệm của hệ ba ẩn là bộ ba số $(x_0; y_0; z_0)$ nghiệm đúng cả ba phương trình.',
    'Hệ dạng tam giác giải ngược từ dưới lên: tìm $z$, rồi $y$, rồi $x$.',
    'Phương pháp Gauss: nhân một phương trình với số khác $0$, đổi chỗ hai phương trình, cộng một phương trình với bội của phương trình khác, để đưa hệ về dạng tam giác.',
    'Gặp $0z = d$ với $d \\ne 0$: hệ vô nghiệm; gặp $0z = 0$: hệ có thể có vô số nghiệm, biểu diễn $x$, $y$ theo $z$.',
    'Máy tính cầm tay cho nhanh nghiệm duy nhất; luôn viết đủ hệ số, kể cả hệ số $0$ của ẩn vắng.',
  ],
};
