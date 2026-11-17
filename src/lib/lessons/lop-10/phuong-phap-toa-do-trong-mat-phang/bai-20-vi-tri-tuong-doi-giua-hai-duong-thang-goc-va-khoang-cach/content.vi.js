/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vị trí tương đối của hai đường thẳng trong mặt phẳng toạ độ, góc giữa hai đường thẳng tính qua vectơ pháp tuyến và công thức khoảng cách từ một điểm đến một đường thẳng.',
  intro:
    'Hai con đường thẳng trên bản đồ có thể cắt nhau ở một ngã tư, chạy song song hay trùng nhau. Khi chúng cắt nhau, chúng tạo với nhau một góc; và từ một ngôi nhà, quãng đường ngắn nhất ra con đường là đoạn vuông góc. Với phương trình đường thẳng, cả ba điều đó đều tính được bằng các con số.',
  objectives: [
    'Xét vị trí tương đối của hai đường thẳng bằng hệ phương trình hoặc bằng vectơ pháp tuyến.',
    'Tính góc giữa hai đường thẳng; nhận biết hai đường thẳng vuông góc.',
    'Tính khoảng cách từ một điểm đến một đường thẳng.',
  ],
  sections: [
    {
      heading: 'Vị trí tương đối giữa hai đường thẳng',
      blocks: [
        {
          type: 'p',
          text: 'Cho $\\Delta_1: a_1x + b_1y + c_1 = 0$ và $\\Delta_2: a_2x + b_2y + c_2 = 0$. Toạ độ giao điểm của chúng là nghiệm của hệ',
        },
        {
          type: 'tex',
          tex: '\\begin{cases} a_1x + b_1y + c_1 = 0 \\\\ a_2x + b_2y + c_2 = 0. \\end{cases}',
        },
        {
          type: 'table',
          head: ['Hệ phương trình', 'Vị trí của $\\Delta_1$ và $\\Delta_2$'],
          rows: [
            ['Có nghiệm duy nhất $(x_0; y_0)$', 'Cắt nhau tại $M_0(x_0; y_0)$'],
            ['Vô nghiệm', 'Song song'],
            ['Có vô số nghiệm', 'Trùng nhau'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dùng vectơ pháp tuyến',
          text: 'Gọi $\\vec n_1$, $\\vec n_2$ là vectơ pháp tuyến của $\\Delta_1$, $\\Delta_2$. Nếu $\\vec n_1$, $\\vec n_2$ không cùng phương thì $\\Delta_1$, $\\Delta_2$ cắt nhau. Nếu chúng cùng phương thì $\\Delta_1$, $\\Delta_2$ song song hoặc trùng nhau: lấy một điểm của $\\Delta_1$, nếu điểm đó thuộc $\\Delta_2$ thì hai đường thẳng trùng nhau, nếu không thì song song.',
        },
      ],
    },
    {
      heading: 'Góc giữa hai đường thẳng',
      blocks: [
        {
          type: 'p',
          text: 'Hai đường thẳng cắt nhau tạo thành bốn góc. Nếu chúng không vuông góc thì góc nhọn trong bốn góc đó được gọi là góc giữa hai đường thẳng; nếu chúng vuông góc thì góc giữa chúng bằng $90^\\circ$. Hai đường thẳng song song hoặc trùng nhau có góc bằng $0^\\circ$. Như vậy góc $\\varphi$ giữa hai đường thẳng luôn thoả mãn $0^\\circ \\le \\varphi \\le 90^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức tính góc',
          text: 'Với $\\vec n_1 = (a_1; b_1)$, $\\vec n_2 = (a_2; b_2)$ là vectơ pháp tuyến của $\\Delta_1$, $\\Delta_2$ và $\\varphi$ là góc giữa hai đường thẳng: $$\\cos\\varphi = |\\cos(\\vec n_1, \\vec n_2)| = \\dfrac{|a_1a_2 + b_1b_2|}{\\sqrt{a_1^2 + b_1^2} \\cdot \\sqrt{a_2^2 + b_2^2}}.$$',
        },
        {
          type: 'list',
          items: [
            '$\\Delta_1 \\perp \\Delta_2 \\Leftrightarrow \\vec n_1 \\perp \\vec n_2 \\Leftrightarrow a_1a_2 + b_1b_2 = 0$.',
            'Nếu $\\Delta_1$, $\\Delta_2$ có vectơ chỉ phương $\\vec u_1$, $\\vec u_2$ thì $\\cos\\varphi = |\\cos(\\vec u_1, \\vec u_2)|$.',
            'Nếu $\\Delta_1: y = k_1x + m_1$ và $\\Delta_2: y = k_2x + m_2$ thì $\\Delta_1 \\perp \\Delta_2 \\Leftrightarrow k_1k_2 = -1$.',
          ],
        },
      ],
    },
    {
      heading: 'Khoảng cách từ một điểm đến một đường thẳng',
      blocks: [
        {
          type: 'p',
          text: 'Khoảng cách từ điểm $M$ đến đường thẳng $\\Delta$, kí hiệu $d(M, \\Delta)$, là độ dài đoạn $MH$ với $H$ là hình chiếu vuông góc của $M$ trên $\\Delta$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức khoảng cách',
          text: 'Khoảng cách từ $M_0(x_0; y_0)$ đến $\\Delta: ax + by + c = 0$ là $$d(M_0, \\Delta) = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}.$$',
        },
        {
          type: 'p',
          text: 'Biểu thức $ax_0 + by_0 + c$ bằng $0$ đúng khi $M_0$ nằm trên $\\Delta$. Khoảng cách giữa hai đường thẳng song song bằng khoảng cách từ một điểm bất kì của đường này đến đường kia.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai đường thẳng trên lưới',
    instruction:
      'Ở chế độ "Vị trí và góc", kéo $A$, $B$ (đường $\\Delta_1$) và $C$, $D$ (đường $\\Delta_2$): xem hai đường thẳng cắt nhau, song song hay trùng nhau, và góc $\\varphi$ giữa chúng. Ở chế độ "Khoảng cách", kéo $M$ hoặc đường $\\Delta$ để xem đoạn vuông góc $MH$ và công thức tính $d(M, \\Delta)$.',
  },
  examples: [
    {
      problem:
        'Xét vị trí tương đối của $\\Delta_1: x - 2y + 3 = 0$ với mỗi đường thẳng $\\Delta_2: 3x - y - 1 = 0$ và $\\Delta_3: 2x - 4y + 1 = 0$.',
      steps: [
        '$\\vec n_1 = (1; -2)$, $\\vec n_2 = (3; -1)$ không cùng phương ($1 \\cdot (-1) - 3 \\cdot (-2) = 5 \\ne 0$), nên $\\Delta_1$ cắt $\\Delta_2$.',
        'Giải hệ: từ $x = 2y - 3$ thay vào $3x - y - 1 = 0$ được $5y - 10 = 0$, nên $y = 2$, $x = 1$. Giao điểm là $(1; 2)$.',
        '$\\vec n_3 = (2; -4) = 2\\vec n_1$, nên $\\Delta_1$, $\\Delta_3$ song song hoặc trùng nhau. Điểm $(-3; 0) \\in \\Delta_1$ nhưng $2 \\cdot (-3) - 0 + 1 = -5 \\ne 0$, nên nó không thuộc $\\Delta_3$.',
      ],
      answer: '$\\Delta_1$ cắt $\\Delta_2$ tại $(1; 2)$; $\\Delta_1 \\parallel \\Delta_3$.',
    },
    {
      problem:
        'Tính góc giữa hai đường thẳng $\\Delta_1: 2x - y + 1 = 0$ và $\\Delta_2: x - 3y + 5 = 0$.',
      steps: [
        '$\\vec n_1 = (2; -1)$, $\\vec n_2 = (1; -3)$.',
        '$\\cos\\varphi = \\dfrac{|2 \\cdot 1 + (-1)(-3)|}{\\sqrt{5} \\cdot \\sqrt{10}} = \\dfrac{5}{\\sqrt{50}} = \\dfrac{1}{\\sqrt{2}}$.',
        'Vậy $\\varphi = 45^\\circ$.',
      ],
      answer: '$\\varphi = 45^\\circ$.',
    },
    {
      problem: 'Tính khoảng cách từ $M(2; -1)$ đến đường thẳng $\\Delta: 3x + 4y - 7 = 0$.',
      steps: [
        '$d(M, \\Delta) = \\dfrac{|3 \\cdot 2 + 4 \\cdot (-1) - 7|}{\\sqrt{3^2 + 4^2}}$.',
        '$= \\dfrac{|-5|}{5} = 1$.',
      ],
      answer: '$d(M, \\Delta) = 1$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Vị trí tương đối của $d_1: x + 2y - 1 = 0$ và $d_2: 2x + 4y + 3 = 0$ là',
      options: ['song song', 'trùng nhau', 'cắt nhau nhưng không vuông góc', 'vuông góc'],
      answer: 0,
      hints: [
        'So sánh hai vectơ pháp tuyến $(1; 2)$ và $(2; 4)$.',
        'Hai pháp tuyến cùng phương: kiểm tra một điểm của $d_1$ có thuộc $d_2$ không.',
      ],
      solution:
        '$(2; 4) = 2(1; 2)$ nên $d_1$, $d_2$ song song hoặc trùng nhau. Điểm $(1; 0) \\in d_1$ nhưng $2 + 0 + 3 = 5 \\ne 0$, nên $d_1 \\parallel d_2$.',
    },
    {
      type: 'choice',
      prompt: 'Vị trí tương đối của $d_1: 2x - y + 3 = 0$ và $d_2: x + 2y - 1 = 0$ là',
      options: ['vuông góc', 'song song', 'trùng nhau', 'cắt nhau nhưng không vuông góc'],
      answer: 0,
      hints: ['Tính tích vô hướng của hai vectơ pháp tuyến.'],
      solution:
        '$\\vec n_1 \\cdot \\vec n_2 = 2 \\cdot 1 + (-1) \\cdot 2 = 0$, nên $d_1 \\perp d_2$.',
    },
    {
      type: 'number',
      prompt:
        'Hai đường thẳng $x + y - 3 = 0$ và $2x - y = 0$ cắt nhau tại $I$. Tìm tung độ của $I$.',
      answer: 2,
      hints: ['Giải hệ gồm hai phương trình.', 'Cộng hai phương trình để khử $y$.'],
      solution:
        'Cộng vế: $3x - 3 = 0 \\Rightarrow x = 1$, rồi $y = 2x = 2$. Vậy $I(1; 2)$, tung độ bằng $2$.',
    },
    {
      type: 'number',
      prompt: 'Tính góc (theo độ) giữa hai đường thẳng $x - y + 1 = 0$ và $x - 3 = 0$.',
      answer: 45,
      hints: [
        'Hai vectơ pháp tuyến là $(1; -1)$ và $(1; 0)$.',
        '$\\cos\\varphi = \\dfrac{|a_1a_2 + b_1b_2|}{\\sqrt{a_1^2 + b_1^2} \\cdot \\sqrt{a_2^2 + b_2^2}}$.',
      ],
      solution:
        '$\\cos\\varphi = \\dfrac{|1 \\cdot 1 + (-1) \\cdot 0|}{\\sqrt{2} \\cdot 1} = \\dfrac{1}{\\sqrt{2}}$, nên $\\varphi = 45^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $m$ để hai đường thẳng $mx + y - 1 = 0$ và $x - 2y + 3 = 0$ vuông góc với nhau.',
      answer: 2,
      hints: ['Hai đường thẳng vuông góc khi $a_1a_2 + b_1b_2 = 0$.'],
      solution: '$m \\cdot 1 + 1 \\cdot (-2) = 0 \\Rightarrow m = 2$.',
    },
    {
      type: 'number',
      prompt: 'Tính khoảng cách từ gốc toạ độ $O$ đến đường thẳng $3x - 4y + 10 = 0$.',
      answer: 2,
      hints: ['Thay $x_0 = 0$, $y_0 = 0$ vào công thức khoảng cách.'],
      solution: '$d(O, \\Delta) = \\dfrac{|0 - 0 + 10|}{\\sqrt{9 + 16}} = \\dfrac{10}{5} = 2$.',
    },
    {
      type: 'number',
      prompt: 'Tính khoảng cách từ $A(1; -2)$ đến đường thẳng $4x + 3y + 8 = 0$.',
      answer: 1.2,
      hints: ['$d = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$.'],
      solution:
        '$d = \\dfrac{|4 \\cdot 1 + 3 \\cdot (-2) + 8|}{\\sqrt{16 + 9}} = \\dfrac{6}{5} = 1{,}2$.',
    },
    {
      type: 'number',
      prompt:
        'Tính khoảng cách giữa hai đường thẳng song song $d_1: 3x + 4y - 2 = 0$ và $d_2: 3x + 4y + 8 = 0$.',
      answer: 2,
      hints: [
        'Chọn một điểm dễ tìm trên $d_1$, chẳng hạn có hoành độ $2$.',
        'Tính khoảng cách từ điểm đó đến $d_2$.',
      ],
      solution:
        '$M(2; -1) \\in d_1$ vì $6 - 4 - 2 = 0$. $d(d_1, d_2) = d(M, d_2) = \\dfrac{|6 - 4 + 8|}{5} = 2$.',
    },
    {
      type: 'number',
      prompt:
        'Một con tàu đi thẳng theo đường $\\Delta: \\begin{cases} x = 1 + 3t \\\\ y = 2 - 4t \\end{cases}$ (đơn vị trên các trục là km). Một hòn đảo ở vị trí $M(5; 5)$. Khi đi trên $\\Delta$, tàu đến gần đảo nhất là bao nhiêu kilômét?',
      answer: 5,
      unit: 'km',
      hints: [
        'Khoảng cách ngắn nhất từ đảo đến đường đi của tàu là $d(M, \\Delta)$.',
        'Viết phương trình tổng quát của $\\Delta$: vectơ chỉ phương $(3; -4)$ cho vectơ pháp tuyến $(4; 3)$.',
      ],
      solution:
        '$\\Delta: 4(x - 1) + 3(y - 2) = 0 \\Leftrightarrow 4x + 3y - 10 = 0$. $d(M, \\Delta) = \\dfrac{|20 + 15 - 10|}{5} = 5$ (km).',
    },
  ],
  takeaways: [
    'Hai pháp tuyến không cùng phương: hai đường thẳng cắt nhau; cùng phương: song song hoặc trùng nhau.',
    '$\\cos\\varphi = \\dfrac{|a_1a_2 + b_1b_2|}{\\sqrt{a_1^2 + b_1^2} \\cdot \\sqrt{a_2^2 + b_2^2}}$, với $0^\\circ \\le \\varphi \\le 90^\\circ$.',
    '$\\Delta_1 \\perp \\Delta_2 \\Leftrightarrow a_1a_2 + b_1b_2 = 0$.',
    '$d(M_0, \\Delta) = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$.',
  ],
};
