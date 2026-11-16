/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giới hạn của dãy số: dãy có giới hạn 0, giới hạn hữu hạn, các định lí về giới hạn hữu hạn, tổng của cấp số nhân lùi vô hạn và giới hạn vô cực.',
  intro:
    'Nghịch lí Zeno: Achilles chạy nhanh gấp $10$ lần con rùa nhưng xuất phát sau rùa $100$ m. Khi Achilles chạy hết $100$ m thì rùa đã đi thêm $10$ m; Achilles chạy tiếp $10$ m thì rùa lại đi thêm $1$ m; … Cứ thế, dường như Achilles không bao giờ đuổi kịp rùa. Thế nhưng tổng $100 + 10 + 1 + \\dfrac{1}{10} + \\cdots$ của vô số quãng đường đó lại là một số hữu hạn. Bài này giải thích vì sao, nhờ khái niệm giới hạn của dãy số.',
  objectives: [
    'Nhận biết dãy số có giới hạn $0$, có giới hạn hữu hạn và có giới hạn vô cực.',
    'Vận dụng các định lí về giới hạn hữu hạn và các giới hạn cơ bản để tính giới hạn của dãy số.',
    'Tính tổng của một cấp số nhân lùi vô hạn và viết số thập phân vô hạn tuần hoàn dưới dạng phân số.',
  ],
  sections: [
    {
      heading: 'Giới hạn hữu hạn của dãy số',
      blocks: [
        {
          type: 'p',
          text: 'Xét dãy số $u_n = \\dfrac{1}{n}$: $1, \\dfrac{1}{2}, \\dfrac{1}{3}, \\ldots$ Khoảng cách $|u_n - 0| = \\dfrac{1}{n}$ nhỏ dần. Chẳng hạn $|u_n| < 0{,}01$ khi $n > 100$, tức là kể từ số hạng thứ $101$ trở đi; muốn $|u_n| < 0{,}001$ thì chỉ cần lấy từ số hạng thứ $1\\,001$ trở đi.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dãy số có giới hạn 0',
          text: 'Ta nói dãy số $(u_n)$ có giới hạn $0$ khi $n$ dần tới dương vô cực nếu $|u_n|$ có thể nhỏ hơn một số dương bé tuỳ ý, kể từ một số hạng nào đó trở đi. Kí hiệu $\\lim\\limits_{n \\to +\\infty} u_n = 0$, hay $u_n \\to 0$ khi $n \\to +\\infty$, hay gọn là $\\lim u_n = 0$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dãy số có giới hạn hữu hạn',
          text: 'Ta nói dãy số $(u_n)$ có giới hạn là số thực $a$ khi $n$ dần tới dương vô cực nếu $\\lim\\limits_{n \\to +\\infty} (u_n - a) = 0$. Kí hiệu $\\lim\\limits_{n \\to +\\infty} u_n = a$ hay $u_n \\to a$ khi $n \\to +\\infty$.',
        },
        {
          type: 'p',
          text: 'Nói cách khác, với mọi số $\\varepsilon > 0$ cho trước, kể từ một chỉ số $N$ nào đó trở đi, mọi số hạng $u_n$ đều nằm trong khoảng $(a - \\varepsilon; a + \\varepsilon)$. Dải này hẹp đến đâu cũng chỉ có hữu hạn số hạng nằm ngoài nó.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Một vài giới hạn đặc biệt',
          text: '$\\lim \\dfrac{1}{n^k} = 0$ với $k$ là số nguyên dương; $\\lim q^n = 0$ nếu $|q| < 1$; nếu $u_n = c$ ($c$ là hằng số) thì $\\lim u_n = c$. Ngoài ra, nếu $|u_n| \\le v_n$ với mọi $n$ và $\\lim v_n = 0$ thì $\\lim u_n = 0$.',
        },
      ],
    },
    {
      heading: 'Định lí về giới hạn hữu hạn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'a) Nếu $\\lim u_n = a$ và $\\lim v_n = b$ thì $\\lim (u_n \\pm v_n) = a \\pm b$, $\\lim (u_n \\cdot v_n) = a \\cdot b$, và $\\lim \\dfrac{u_n}{v_n} = \\dfrac{a}{b}$ nếu $b \\ne 0$. b) Nếu $u_n \\ge 0$ với mọi $n$ và $\\lim u_n = a$ thì $a \\ge 0$ và $\\lim \\sqrt{u_n} = \\sqrt{a}$.',
        },
        {
          type: 'p',
          text: 'Với một phân thức của $n$, ta thường chia cả tử và mẫu cho luỹ thừa cao nhất của $n$ ở mẫu, để đưa về các giới hạn $\\lim \\dfrac{1}{n^k} = 0$. Với biểu thức chứa căn dạng $\\sqrt{A} - \\sqrt{B}$, ta nhân và chia với biểu thức liên hợp $\\sqrt{A} + \\sqrt{B}$.',
        },
        {
          type: 'tex',
          tex: '\\lim \\frac{3n^2 - n}{n^2 + 2} = \\lim \\frac{3 - \\frac{1}{n}}{1 + \\frac{2}{n^2}} = \\frac{3 - 0}{1 + 0} = 3.',
        },
      ],
    },
    {
      heading: 'Tổng của cấp số nhân lùi vô hạn',
      blocks: [
        {
          type: 'p',
          text: 'Cấp số nhân vô hạn $(u_n)$ có công bội $q$ thoả mãn $|q| < 1$ được gọi là cấp số nhân lùi vô hạn. Tổng $n$ số hạng đầu của nó là $S_n = \\dfrac{u_1(1 - q^n)}{1 - q} = \\dfrac{u_1}{1 - q} - \\dfrac{u_1}{1 - q} \\cdot q^n$. Vì $|q| < 1$ nên $\\lim q^n = 0$, do đó $\\lim S_n = \\dfrac{u_1}{1 - q}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tổng của cấp số nhân lùi vô hạn',
          text: 'Cho cấp số nhân lùi vô hạn $(u_n)$ với công bội $q$, $|q| < 1$. Giới hạn $S = \\lim S_n$ được gọi là tổng của cấp số nhân đó, kí hiệu $S = u_1 + u_2 + \\cdots + u_n + \\cdots$, và $S = \\dfrac{u_1}{1 - q}$.',
        },
        {
          type: 'p',
          text: 'Trở lại nghịch lí Zeno: các quãng đường Achilles chạy là cấp số nhân lùi vô hạn với $u_1 = 100$, $q = \\dfrac{1}{10}$, nên tổng của chúng là $\\dfrac{100}{1 - \\frac{1}{10}} = \\dfrac{1\\,000}{9} \\approx 111{,}1$ m. Achilles đuổi kịp rùa sau khi chạy đúng $\\dfrac{1\\,000}{9}$ m.',
        },
      ],
    },
    {
      heading: 'Giới hạn vô cực',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giới hạn vô cực',
          text: 'Ta nói dãy số $(u_n)$ có giới hạn $+\\infty$ khi $n \\to +\\infty$ nếu $u_n$ có thể lớn hơn một số dương lớn tuỳ ý, kể từ một số hạng nào đó trở đi. Kí hiệu $\\lim u_n = +\\infty$ hay $u_n \\to +\\infty$ khi $n \\to +\\infty$. Dãy số $(u_n)$ có giới hạn $-\\infty$ khi $n \\to +\\infty$ nếu $\\lim (-u_n) = +\\infty$; kí hiệu $\\lim u_n = -\\infty$.',
        },
        {
          type: 'list',
          items: [
            '$\\lim n^k = +\\infty$ với $k$ nguyên dương; $\\lim q^n = +\\infty$ nếu $q > 1$.',
            'Nếu $\\lim u_n = a$ và $\\lim v_n = +\\infty$ (hoặc $\\lim v_n = -\\infty$) thì $\\lim \\dfrac{u_n}{v_n} = 0$.',
            'Nếu $\\lim u_n = a > 0$, $\\lim v_n = 0$ và $v_n > 0$ với mọi $n$ thì $\\lim \\dfrac{u_n}{v_n} = +\\infty$.',
            'Nếu $\\lim u_n = +\\infty$ và $\\lim v_n = a > 0$ thì $\\lim (u_n v_n) = +\\infty$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: '$+\\infty$ và $-\\infty$ không phải là số thực, nên không áp dụng được định lí về giới hạn hữu hạn cho chúng. Chẳng hạn $\\lim (n^2 - n)$ không tính bằng "$\\infty - \\infty$" mà viết $n^2 - n = n^2\\left(1 - \\dfrac{1}{n}\\right)$, trong đó $\\lim n^2 = +\\infty$ và $\\lim\\left(1 - \\dfrac{1}{n}\\right) = 1 > 0$, nên $\\lim (n^2 - n) = +\\infty$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dải ε quanh giới hạn',
    instruction:
      'Chọn một dãy số rồi kéo thanh trượt để thu hẹp dải xanh quanh giới hạn. Quan sát chỉ số $N$ mà từ đó mọi số hạng đều nằm trong dải: dải càng hẹp, $N$ càng lớn, nhưng luôn tìm được $N$. Với dãy $u_n = \\sqrt{n}$, thanh trượt nâng mức $M$ và dải xanh là phần nằm trên $M$.',
  },
  examples: [
    {
      problem: 'Tính $\\lim \\dfrac{2n^2 + 1}{n^2 + 3n}$.',
      steps: [
        'Chia cả tử và mẫu cho $n^2$: $\\dfrac{2n^2 + 1}{n^2 + 3n} = \\dfrac{2 + \\frac{1}{n^2}}{1 + \\frac{3}{n}}$.',
        'Vì $\\lim \\dfrac{1}{n^2} = 0$ và $\\lim \\dfrac{3}{n} = 0$ nên giới hạn của tử là $2$, của mẫu là $1$.',
        'Theo định lí về giới hạn của thương: $\\lim \\dfrac{2n^2 + 1}{n^2 + 3n} = \\dfrac{2}{1} = 2$.',
      ],
      answer: '$2$.',
    },
    {
      problem: 'Tính $\\lim \\left(\\sqrt{n^2 + n} - n\\right)$.',
      steps: [
        'Nhân và chia với biểu thức liên hợp: $\\sqrt{n^2 + n} - n = \\dfrac{(n^2 + n) - n^2}{\\sqrt{n^2 + n} + n} = \\dfrac{n}{\\sqrt{n^2 + n} + n}$.',
        'Chia tử và mẫu cho $n$: $\\dfrac{1}{\\sqrt{1 + \\frac{1}{n}} + 1}$.',
        'Vì $\\lim \\sqrt{1 + \\dfrac{1}{n}} = 1$ nên giới hạn bằng $\\dfrac{1}{1 + 1} = \\dfrac{1}{2}$.',
      ],
      answer: '$\\dfrac{1}{2}$.',
    },
    {
      problem:
        'Viết số thập phân vô hạn tuần hoàn $0{,}(27) = 0{,}272727\\ldots$ dưới dạng phân số.',
      steps: [
        '$0{,}(27) = \\dfrac{27}{100} + \\dfrac{27}{100^2} + \\dfrac{27}{100^3} + \\cdots$',
        'Đây là tổng của cấp số nhân lùi vô hạn với $u_1 = \\dfrac{27}{100}$, $q = \\dfrac{1}{100}$.',
        '$S = \\dfrac{\\frac{27}{100}}{1 - \\frac{1}{100}} = \\dfrac{27}{99} = \\dfrac{3}{11}$.',
      ],
      answer: '$0{,}(27) = \\dfrac{3}{11}$.',
    },
    {
      problem: 'Tính $\\lim \\dfrac{n^2 + 1}{2n - 1}$.',
      steps: [
        'Chia tử và mẫu cho $n$: $\\dfrac{n^2 + 1}{2n - 1} = \\dfrac{n + \\frac{1}{n}}{2 - \\frac{1}{n}}$.',
        'Tử có $\\lim \\left(n + \\dfrac{1}{n}\\right) = +\\infty$, mẫu có $\\lim \\left(2 - \\dfrac{1}{n}\\right) = 2 > 0$.',
        'Do đó $\\lim \\dfrac{n^2 + 1}{2n - 1} = +\\infty$.',
      ],
      answer: '$+\\infty$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Giới hạn $\\lim \\dfrac{3n - 1}{n + 2}$ bằng',
      options: ['$3$', '$-\\dfrac{1}{2}$', '$1$', '$+\\infty$'],
      answer: 0,
      hints: ['Chia cả tử và mẫu cho $n$.'],
      solution:
        '$\\lim \\dfrac{3n - 1}{n + 2} = \\lim \\dfrac{3 - \\frac{1}{n}}{1 + \\frac{2}{n}} = \\dfrac{3}{1} = 3$. Đáp án $-\\dfrac{1}{2}$ là giá trị khi thay nhầm $n = 0$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\lim \\dfrac{2n^2 - n + 1}{4n^2 + 5}$.',
      answer: [1, 2],
      hints: [
        'Chia cả tử và mẫu cho $n^2$.',
        'Các số hạng dạng $\\dfrac{c}{n}$, $\\dfrac{c}{n^2}$ dần tới $0$.',
      ],
      solution:
        '$\\dfrac{2n^2 - n + 1}{4n^2 + 5} = \\dfrac{2 - \\frac{1}{n} + \\frac{1}{n^2}}{4 + \\frac{5}{n^2}} \\to \\dfrac{2}{4} = \\dfrac{1}{2}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\lim \\dfrac{2 \\cdot 3^n - 4^n}{3 \\cdot 4^n + 2^n}$.',
      answer: [-1, 3],
      hints: [
        'Chia cả tử và mẫu cho $4^n$, luỹ thừa có cơ số lớn nhất.',
        'Dùng $\\lim q^n = 0$ khi $|q| < 1$.',
      ],
      solution:
        'Chia tử và mẫu cho $4^n$: $\\dfrac{2 \\left(\\frac{3}{4}\\right)^n - 1}{3 + \\left(\\frac{1}{2}\\right)^n}$. Vì $\\lim \\left(\\dfrac{3}{4}\\right)^n = \\lim \\left(\\dfrac{1}{2}\\right)^n = 0$ nên giới hạn bằng $\\dfrac{0 - 1}{3 + 0} = -\\dfrac{1}{3}$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\lim \\left(\\sqrt{n^2 + 4n} - n\\right)$.',
      answer: 2,
      hints: [
        'Nhân và chia với biểu thức liên hợp $\\sqrt{n^2 + 4n} + n$.',
        'Sau đó chia tử và mẫu cho $n$.',
      ],
      solution:
        '$\\sqrt{n^2 + 4n} - n = \\dfrac{4n}{\\sqrt{n^2 + 4n} + n} = \\dfrac{4}{\\sqrt{1 + \\frac{4}{n}} + 1} \\to \\dfrac{4}{1 + 1} = 2$.',
    },
    {
      type: 'number',
      prompt:
        'Tính tổng $2 + \\dfrac{2}{3} + \\dfrac{2}{9} + \\cdots + \\dfrac{2}{3^{n-1}} + \\cdots$',
      answer: 3,
      hints: [
        'Đây là cấp số nhân lùi vô hạn. Xác định $u_1$ và $q$.',
        'Dùng $S = \\dfrac{u_1}{1 - q}$.',
      ],
      solution:
        'Cấp số nhân lùi vô hạn có $u_1 = 2$, $q = \\dfrac{1}{3}$, nên $S = \\dfrac{2}{1 - \\frac{1}{3}} = \\dfrac{2}{\\frac{2}{3}} = 3$.',
    },
    {
      type: 'fraction',
      prompt: 'Viết số thập phân vô hạn tuần hoàn $0{,}(36)$ dưới dạng phân số tối giản.',
      answer: [4, 11],
      simplest: true,
      hints: [
        '$0{,}(36) = \\dfrac{36}{100} + \\dfrac{36}{100^2} + \\cdots$',
        'Đây là cấp số nhân lùi vô hạn với $q = \\dfrac{1}{100}$.',
      ],
      solution:
        '$0{,}(36) = \\dfrac{\\frac{36}{100}}{1 - \\frac{1}{100}} = \\dfrac{36}{99} = \\dfrac{4}{11}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các dãy số có giới hạn $0$.',
      options: [
        '$u_n = \\left(\\dfrac{2}{3}\\right)^n$',
        '$u_n = \\dfrac{(-1)^n}{n^2}$',
        '$u_n = \\dfrac{1}{\\sqrt{n}}$',
        '$u_n = \\left(\\dfrac{3}{2}\\right)^n$',
        '$u_n = \\dfrac{n + 1}{n}$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Nhớ lại: $\\lim q^n = 0$ khi $|q| < 1$, $\\lim \\dfrac{1}{n^k} = 0$.',
        'Với $\\dfrac{(-1)^n}{n^2}$, so sánh trị tuyệt đối với $\\dfrac{1}{n^2}$.',
      ],
      solution:
        '$\\left(\\dfrac{2}{3}\\right)^n \\to 0$ vì $\\left|\\dfrac{2}{3}\\right| < 1$; $\\left|\\dfrac{(-1)^n}{n^2}\\right| = \\dfrac{1}{n^2} \\to 0$; $\\dfrac{1}{\\sqrt{n}} \\to 0$. Còn $\\left(\\dfrac{3}{2}\\right)^n \\to +\\infty$ vì $\\dfrac{3}{2} > 1$, và $\\dfrac{n + 1}{n} = 1 + \\dfrac{1}{n} \\to 1$.',
    },
    {
      type: 'choice',
      prompt: 'Giới hạn $\\lim \\left(n^3 - 2n^2 + 5\\right)$ bằng',
      options: ['$+\\infty$', '$-\\infty$', '$1$', '$5$'],
      answer: 0,
      hints: ['Đặt $n^3$ làm nhân tử chung.'],
      solution:
        '$n^3 - 2n^2 + 5 = n^3\\left(1 - \\dfrac{2}{n} + \\dfrac{5}{n^3}\\right)$, với $\\lim n^3 = +\\infty$ và $\\lim\\left(1 - \\dfrac{2}{n} + \\dfrac{5}{n^3}\\right) = 1 > 0$. Vậy giới hạn bằng $+\\infty$.',
    },
    {
      type: 'choice',
      prompt: 'Giới hạn $\\lim \\dfrac{2n + 3}{n^2 + 1}$ bằng',
      options: ['$0$', '$2$', '$3$', '$+\\infty$'],
      answer: 0,
      hints: ['Chia cả tử và mẫu cho $n^2$, luỹ thừa cao nhất ở mẫu.'],
      solution:
        '$\\dfrac{2n + 3}{n^2 + 1} = \\dfrac{\\frac{2}{n} + \\frac{3}{n^2}}{1 + \\frac{1}{n^2}} \\to \\dfrac{0}{1} = 0$.',
    },
    {
      type: 'number',
      prompt:
        'Một quả bóng được thả rơi từ độ cao $10$ m. Mỗi lần chạm đất, bóng nảy lên đến độ cao bằng $\\dfrac{3}{4}$ độ cao lần rơi ngay trước đó. Giả sử bóng cứ nảy như vậy mãi, tính tổng quãng đường bóng đã đi (theo mét).',
      answer: 70,
      unit: 'm',
      hints: [
        'Mỗi lần nảy, bóng đi lên rồi rơi xuống cùng một độ cao.',
        'Các độ cao nảy lên $7{,}5$; $5{,}625$; … là một cấp số nhân lùi vô hạn.',
      ],
      solution:
        'Lần rơi đầu: $10$ m. Các độ cao nảy lên lập thành cấp số nhân lùi vô hạn với $u_1 = 10 \\cdot \\dfrac{3}{4} = 7{,}5$ và $q = \\dfrac{3}{4}$, tổng là $\\dfrac{7{,}5}{1 - \\frac{3}{4}} = 30$ m. Mỗi độ cao bóng đi hai lần (lên và xuống), nên tổng quãng đường là $10 + 2 \\cdot 30 = 70$ m.',
    },
  ],
  takeaways: [
    '$\\lim u_n = a$ nghĩa là $|u_n - a|$ nhỏ hơn một số dương bé tuỳ ý kể từ một số hạng nào đó trở đi.',
    '$\\lim \\dfrac{1}{n^k} = 0$; $\\lim q^n = 0$ khi $|q| < 1$; giới hạn của tổng, hiệu, tích, thương (mẫu khác $0$) bằng tổng, hiệu, tích, thương các giới hạn.',
    'Cấp số nhân lùi vô hạn ($|q| < 1$) có tổng $S = \\dfrac{u_1}{1 - q}$.',
    '$\\lim n^k = +\\infty$, $\\lim q^n = +\\infty$ khi $q > 1$; $\\dfrac{a}{\\pm\\infty} \\to 0$; $\\pm\\infty$ không phải là số thực.',
  ],
};
