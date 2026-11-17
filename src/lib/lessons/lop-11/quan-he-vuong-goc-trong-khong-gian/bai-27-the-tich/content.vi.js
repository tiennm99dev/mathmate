/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Công thức thể tích của khối chóp, khối chóp cụt đều, khối lăng trụ và khối hộp; tính chiều cao, diện tích đáy bằng quan hệ vuông góc rồi tính thể tích.',
  intro:
    'Một chiếc cốc hình chóp và một chiếc hộp hình lăng trụ có cùng đáy, cùng chiều cao. Phải đổ bao nhiêu cốc nước thì đầy hộp? Câu trả lời là con số $3$, và nó dẫn tới công thức thể tích khối chóp.',
  objectives: [
    'Nhận biết công thức thể tích của khối chóp, khối lăng trụ, khối hộp, khối chóp cụt đều.',
    'Xác định đường cao, tính diện tích đáy và tính thể tích các khối đó.',
    'Vận dụng công thức thể tích vào một số bài toán thực tế đơn giản.',
  ],
  sections: [
    {
      heading: 'Thể tích của khối chóp, khối chóp cụt đều',
      blocks: [
        {
          type: 'p',
          text: 'Khối chóp là phần không gian giới hạn bởi một hình chóp, kể cả hình chóp đó. Tương tự, ta có khối chóp cụt, khối lăng trụ, khối hộp. Đỉnh, cạnh, mặt, đáy, chiều cao của hình nào thì cũng gọi là đỉnh, cạnh, mặt, đáy, chiều cao của khối tương ứng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Thể tích khối chóp',
          text: 'Thể tích $V$ của khối chóp có diện tích đáy $S$ và chiều cao $h$ là $$V = \\dfrac{1}{3}Sh.$$',
        },
        {
          type: 'p',
          text: 'Chiều cao $h$ của khối chóp là khoảng cách từ đỉnh đến mặt phẳng đáy. Chẳng hạn, khối chóp $S.ABCD$ có $SA \\perp (ABCD)$ thì $h = SA$; khối chóp đều có $h = SO$ với $O$ là tâm của đáy.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình chóp cụt đều',
          text: 'Cắt hình chóp đều bởi một mặt phẳng song song với đáy, phần nằm giữa mặt phẳng đó và đáy là một hình chóp cụt đều. Hai đáy là hai đa giác đều đồng dạng nằm trên hai mặt phẳng song song; đoạn nối tâm hai đáy là đường cao, độ dài của nó là chiều cao của hình chóp cụt đều.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Thể tích khối chóp cụt đều',
          text: "Thể tích $V$ của khối chóp cụt đều có diện tích hai đáy $S$, $S'$ và chiều cao $h$ là $$V = \\dfrac{1}{3}h\\left(S + \\sqrt{SS'} + S'\\right).$$",
        },
        {
          type: 'p',
          text: "Công thức này có được bằng cách lấy thể tích khối chóp lớn trừ thể tích khối chóp nhỏ bị cắt đi. Khi $S' = 0$ (đáy nhỏ thu về một điểm), ta lại được $V = \\dfrac{1}{3}Sh$.",
        },
      ],
    },
    {
      heading: 'Thể tích của khối lăng trụ, khối hộp',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Thể tích khối lăng trụ',
          text: 'Thể tích $V$ của khối lăng trụ có diện tích đáy $S$ và chiều cao $h$ là $$V = Sh.$$',
        },
        {
          type: 'list',
          items: [
            'Chiều cao của khối lăng trụ là khoảng cách giữa hai mặt phẳng đáy; với khối lăng trụ đứng, chiều cao bằng độ dài cạnh bên.',
            'Khối hộp là khối lăng trụ có đáy là hình bình hành, nên cũng có $V = Sh$.',
            'Khối hộp chữ nhật có ba kích thước $a$, $b$, $c$: $V = abc$. Khối lập phương cạnh $a$: $V = a^3$.',
          ],
        },
        {
          type: 'table',
          head: ['Khối', 'Thể tích'],
          rows: [
            ['Khối chóp', '$V = \\dfrac{1}{3}Sh$'],
            ['Khối chóp cụt đều', "$V = \\dfrac{1}{3}h\\left(S + \\sqrt{SS'} + S'\\right)$"],
            ['Khối lăng trụ, khối hộp', '$V = Sh$'],
            ['Khối hộp chữ nhật', '$V = abc$'],
            ['Khối lập phương', '$V = a^3$'],
          ],
          caption: "$S$, $S'$ là diện tích đáy, $h$ là chiều cao.",
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Khối chóp và khối lăng trụ có cùng diện tích đáy và cùng chiều cao thì thể tích khối chóp bằng $\\dfrac{1}{3}$ thể tích khối lăng trụ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Rót nước từ khối chóp sang khối lăng trụ',
    instruction:
      'Khối chóp tứ giác đều được úp ngược thành một chiếc cốc đầy nước, bên cạnh là khối lăng trụ cùng đáy, cùng chiều cao. Hạ mực nước trong khối chóp để rót sang lăng trụ: phần nước đã rót là một khối chóp cụt đều. Rót hết, đổ đầy khối chóp rồi rót tiếp, và đếm xem bao nhiêu lần thì đầy lăng trụ.',
  },
  examples: [
    {
      problem:
        'Cho hình chóp tứ giác đều $S.ABCD$ có tất cả các cạnh bằng $a$. Tính thể tích khối chóp $S.ABCD$.',
      steps: [
        'Gọi $O$ là tâm hình vuông $ABCD$. Vì hình chóp đều nên $SO \\perp (ABCD)$, chiều cao $h = SO$.',
        '$OA = \\dfrac{AC}{2} = \\dfrac{a\\sqrt{2}}{2}$. Tam giác $SOA$ vuông tại $O$: $SO = \\sqrt{SA^2 - OA^2} = \\sqrt{a^2 - \\dfrac{a^2}{2}} = \\dfrac{a\\sqrt{2}}{2}$.',
        '$S_{ABCD} = a^2$, nên $V = \\dfrac{1}{3} \\cdot a^2 \\cdot \\dfrac{a\\sqrt{2}}{2}$.',
      ],
      answer: '$V = \\dfrac{a^3\\sqrt{2}}{6}$.',
    },
    {
      problem:
        "Cho hình lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác đều cạnh $a$ và $AA' = 2a$. Tính thể tích khối lăng trụ.",
      steps: [
        "Lăng trụ đứng nên chiều cao $h = AA' = 2a$.",
        'Diện tích tam giác đều cạnh $a$: $S = \\dfrac{a^2\\sqrt{3}}{4}$.',
        '$V = Sh = \\dfrac{a^2\\sqrt{3}}{4} \\cdot 2a$.',
      ],
      answer: '$V = \\dfrac{a^3\\sqrt{3}}{2}$.',
    },
    {
      problem:
        'Một thùng đựng nước có dạng khối chóp cụt tứ giác đều, đáy lớn là hình vuông cạnh $4$ dm, đáy nhỏ là hình vuông cạnh $2$ dm, chiều cao $3$ dm. Thùng chứa được nhiều nhất bao nhiêu lít nước?',
      steps: [
        "Diện tích hai đáy: $S = 4^2 = 16$ dm², $S' = 2^2 = 4$ dm²; $\\sqrt{SS'} = \\sqrt{64} = 8$ dm².",
        '$V = \\dfrac{1}{3} \\cdot 3 \\cdot (16 + 8 + 4) = 28$ dm³.',
        'Vì $1$ dm³ $= 1$ lít nên thùng chứa được $28$ lít.',
      ],
      answer: 'Nhiều nhất $28$ lít nước.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính thể tích khối chóp có đáy là hình vuông cạnh $3$ cm và chiều cao $4$ cm.',
      answer: 12,
      unit: 'cm³',
      hints: ['Diện tích đáy là $3^2$; dùng $V = \\dfrac{1}{3}Sh$.'],
      solution: '$V = \\dfrac{1}{3} \\cdot 9 \\cdot 4 = 12$ cm³.',
    },
    {
      type: 'fraction',
      prompt:
        'Một khối chóp và một khối lăng trụ có cùng diện tích đáy và cùng chiều cao. Tỉ số $\\dfrac{V_{\\text{chóp}}}{V_{\\text{lăng trụ}}}$ bằng bao nhiêu?',
      answer: [1, 3],
      simplest: true,
      hints: ['So sánh $\\dfrac{1}{3}Sh$ với $Sh$.'],
      solution:
        '$\\dfrac{V_{\\text{chóp}}}{V_{\\text{lăng trụ}}} = \\dfrac{\\frac{1}{3}Sh}{Sh} = \\dfrac{1}{3}$.',
    },
    {
      type: 'number',
      prompt:
        "Hình lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác $ABC$ vuông tại $A$, $AB = 3$ cm, $AC = 4$ cm và $AA' = 10$ cm. Tính thể tích khối lăng trụ.",
      answer: 60,
      unit: 'cm³',
      hints: ['Đáy là tam giác vuông: $S = \\dfrac{1}{2}AB \\cdot AC$. Chiều cao là cạnh bên.'],
      solution:
        "$S = \\dfrac{1}{2} \\cdot 3 \\cdot 4 = 6$ cm², $h = AA' = 10$ cm, $V = 6 \\cdot 10 = 60$ cm³.",
    },
    {
      type: 'number',
      prompt: 'Hình lập phương có đường chéo bằng $3\\sqrt{3}$ cm. Tính thể tích khối lập phương.',
      answer: 27,
      unit: 'cm³',
      hints: ['Đường chéo của hình lập phương cạnh $a$ bằng $a\\sqrt{3}$.'],
      solution: '$a\\sqrt{3} = 3\\sqrt{3}$ nên $a = 3$ cm, $V = 3^3 = 27$ cm³.',
    },
    {
      type: 'number',
      prompt:
        'Khối chóp cụt tứ giác đều có hai đáy là hình vuông cạnh $6$ cm và $3$ cm, chiều cao $4$ cm. Tính thể tích của nó.',
      answer: 84,
      unit: 'cm³',
      hints: [
        "Tính $S = 36$, $S' = 9$ và $\\sqrt{SS'}$.",
        "Dùng $V = \\dfrac{1}{3}h\\left(S + \\sqrt{SS'} + S'\\right)$.",
      ],
      solution:
        "$S = 36$ cm², $S' = 9$ cm², $\\sqrt{SS'} = 18$ cm². $V = \\dfrac{1}{3} \\cdot 4 \\cdot (36 + 18 + 9) = \\dfrac{4 \\cdot 63}{3} = 84$ cm³.",
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, $SA = 6$ cm, tam giác $ABC$ đều cạnh $4$ cm. Tính thể tích khối chóp (làm tròn đến hàng phần trăm).',
      answer: 13.86,
      tolerance: 0.006,
      unit: 'cm³',
      hints: [
        '$SA \\perp (ABC)$ nên chiều cao là $SA$.',
        'Diện tích tam giác đều cạnh $4$ là $\\dfrac{4^2\\sqrt{3}}{4} = 4\\sqrt{3}$.',
      ],
      solution: '$V = \\dfrac{1}{3} \\cdot 4\\sqrt{3} \\cdot 6 = 8\\sqrt{3} \\approx 13{,}86$ cm³.',
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp tam giác đều $S.ABC$ có cạnh đáy $6$ cm, cạnh bên tạo với mặt phẳng đáy góc $60^\\circ$. Tính thể tích khối chóp (làm tròn đến hàng phần trăm).',
      answer: 31.18,
      tolerance: 0.006,
      unit: 'cm³',
      hints: [
        'Gọi $O$ là tâm tam giác $ABC$; $SO \\perp (ABC)$ và góc giữa $SA$ với đáy là $\\widehat{SAO}$.',
        '$OA = \\dfrac{6}{\\sqrt{3}} = 2\\sqrt{3}$, $SO = OA \\cdot \\tan 60^\\circ$.',
      ],
      solution:
        '$OA = \\dfrac{2}{3} \\cdot \\dfrac{6\\sqrt{3}}{2} = 2\\sqrt{3}$ cm, $SO = 2\\sqrt{3} \\cdot \\sqrt{3} = 6$ cm. $S_{ABC} = \\dfrac{36\\sqrt{3}}{4} = 9\\sqrt{3}$ cm². $V = \\dfrac{1}{3} \\cdot 9\\sqrt{3} \\cdot 6 = 18\\sqrt{3} \\approx 31{,}18$ cm³.',
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh $2$ cm, $SA \\perp (ABCD)$ và góc giữa đường thẳng $SC$ với mặt phẳng $(ABCD)$ bằng $45^\\circ$. Tính thể tích khối chóp (làm tròn đến hàng phần trăm).',
      answer: 3.77,
      tolerance: 0.006,
      unit: 'cm³',
      hints: [
        'Hình chiếu của $SC$ trên $(ABCD)$ là $AC$, nên góc $45^\\circ$ là $\\widehat{SCA}$.',
        'Tam giác $SAC$ vuông cân tại $A$: $SA = AC$.',
      ],
      solution:
        '$AC = 2\\sqrt{2}$ cm. Góc giữa $SC$ và đáy là $\\widehat{SCA} = 45^\\circ$ nên $SA = AC = 2\\sqrt{2}$ cm. $V = \\dfrac{1}{3} \\cdot 4 \\cdot 2\\sqrt{2} = \\dfrac{8\\sqrt{2}}{3} \\approx 3{,}77$ cm³.',
    },
    {
      type: 'number',
      prompt:
        'Một khối lăng trụ có thể tích $60$ cm³ và diện tích đáy $12$ cm². Tính chiều cao của khối lăng trụ.',
      answer: 5,
      unit: 'cm',
      hints: ['Từ $V = Sh$ suy ra $h = \\dfrac{V}{S}$.'],
      solution: '$h = \\dfrac{V}{S} = \\dfrac{60}{12} = 5$ cm.',
    },
    {
      type: 'choice',
      prompt:
        "Khối chóp cụt đều có diện tích hai đáy $S$, $S'$ và chiều cao $h$. Thể tích của nó là",
      options: [
        "$V = \\dfrac{1}{3}h\\left(S + \\sqrt{SS'} + S'\\right)$",
        "$V = h\\left(S + \\sqrt{SS'} + S'\\right)$",
        "$V = \\dfrac{1}{3}h\\left(S + S'\\right)$",
        "$V = \\dfrac{1}{2}h\\left(S + S'\\right)$",
      ],
      answer: 0,
      hints: [
        "Khi $S' = 0$, công thức phải trở thành thể tích khối chóp $\\dfrac{1}{3}Sh$.",
        "Khi $S' = S$, hai đáy bằng nhau và công thức phải cho $Sh$ như khối lăng trụ.",
      ],
      solution:
        "$V = \\dfrac{1}{3}h\\left(S + \\sqrt{SS'} + S'\\right)$. Kiểm tra: với $S' = 0$ được $\\dfrac{1}{3}Sh$, đúng thể tích khối chóp; với $S' = S$ được $Sh$, đúng thể tích khối lăng trụ. Công thức $\\dfrac{1}{3}h(S + S')$ cho $\\dfrac{2}{3}Sh$ khi $S' = S$, nên sai.",
    },
  ],
  takeaways: [
    'Khối chóp: $V = \\dfrac{1}{3}Sh$, với $h$ là khoảng cách từ đỉnh đến mặt phẳng đáy.',
    "Khối chóp cụt đều: $V = \\dfrac{1}{3}h\\left(S + \\sqrt{SS'} + S'\\right)$.",
    'Khối lăng trụ, khối hộp: $V = Sh$; khối hộp chữ nhật $V = abc$; khối lập phương $V = a^3$.',
    'Khối chóp bằng một phần ba khối lăng trụ cùng đáy, cùng chiều cao.',
  ],
};
