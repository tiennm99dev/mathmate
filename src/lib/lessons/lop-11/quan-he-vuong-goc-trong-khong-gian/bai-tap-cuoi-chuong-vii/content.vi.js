/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương VII: hai đường thẳng vuông góc, đường thẳng vuông góc với mặt phẳng, phép chiếu vuông góc, hai mặt phẳng vuông góc; cách tính góc, khoảng cách và thể tích khối chóp, khối lăng trụ, khối chóp cụt đều.',
  intro:
    'Chương VII đưa quan hệ vuông góc vào không gian: từ góc giữa hai đường thẳng đến góc nhị diện, từ khoảng cách điểm đến mặt phẳng đến khoảng cách giữa hai đường thẳng chéo nhau, rồi dùng chiều cao để tính thể tích. Bài ôn tập này hệ thống lại các cách xác định góc, khoảng cách, thể tích và luyện tập trên những hình quen thuộc.',
  objectives: [
    'Hệ thống hoá các định nghĩa, điều kiện vuông góc và định lí ba đường vuông góc.',
    'Xác định và tính góc giữa hai đường thẳng, giữa đường thẳng và mặt phẳng, góc nhị diện.',
    'Xác định và tính khoảng cách từ điểm đến mặt phẳng, giữa hai đường thẳng chéo nhau.',
    'Tính thể tích khối chóp, khối lăng trụ, khối chóp cụt đều.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Quan hệ', 'Điều kiện thường dùng'],
          rows: [
            [
              '$a \\perp b$',
              'Góc giữa $a$ và $b$ bằng $90^\\circ$; hoặc $a$ vuông góc với một mặt phẳng chứa $b$',
            ],
            ['$a \\perp (P)$', '$a$ vuông góc với hai đường thẳng cắt nhau nằm trong $(P)$'],
            ['$(P) \\perp (Q)$', '$(P)$ chứa một đường thẳng vuông góc với $(Q)$'],
            [
              'Định lí ba đường vuông góc',
              "$a \\subset (P)$, $b$ không vuông góc với $(P)$, $b'$ là hình chiếu của $b$ trên $(P)$: $a \\perp b \\Leftrightarrow a \\perp b'$",
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì song song; hai mặt phẳng phân biệt cùng vuông góc với một đường thẳng thì song song.',
            'Hai mặt phẳng cắt nhau cùng vuông góc với mặt phẳng thứ ba thì giao tuyến của chúng vuông góc với mặt phẳng thứ ba.',
            'Hình lăng trụ đứng có cạnh bên vuông góc với đáy; hình chóp đều có đáy là đa giác đều và chân đường cao trùng với tâm của đáy.',
          ],
        },
      ],
    },
    {
      heading: 'Cách tính góc, khoảng cách, thể tích',
      blocks: [
        {
          type: 'table',
          head: ['Đại lượng', 'Cách xác định'],
          rows: [
            [
              'Góc giữa hai đường thẳng $a$, $b$',
              "Lấy $a' \\parallel a$, $b' \\parallel b$ cắt nhau; góc giữa $a'$, $b'$ (từ $0^\\circ$ đến $90^\\circ$)",
            ],
            [
              'Góc giữa $d$ và $(P)$',
              "Góc giữa $d$ và hình chiếu $d'$ của nó trên $(P)$; bằng $90^\\circ$ khi $d \\perp (P)$",
            ],
            [
              'Góc nhị diện $[P, c, Q]$',
              'Góc giữa hai tia trong hai nửa mặt phẳng, cùng vuông góc với cạnh $c$ tại một điểm',
            ],
            ['$d(M, (P))$', 'Độ dài $MH$, $H$ là hình chiếu của $M$ trên $(P)$'],
            [
              '$d(a, b)$, $a$ và $b$ chéo nhau',
              'Độ dài đoạn vuông góc chung; hoặc $d(a, (Q))$ với $(Q) \\supset b$, $(Q) \\parallel a$',
            ],
            [
              'Thể tích',
              "Khối chóp $\\dfrac{1}{3}Sh$; khối lăng trụ $Sh$; khối chóp cụt đều $\\dfrac{1}{3}h\\left(S + \\sqrt{SS'} + S'\\right)$",
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Khoảng cách từ chân đường cao đến một mặt bên',
          text: 'Hình chóp có $SA \\perp (ABC)$: muốn tính $d(A, (SBC))$, kẻ $AK \\perp BC$ tại $K$, rồi $AH \\perp SK$ tại $H$. Khi đó $BC \\perp (SAK)$ nên $AH \\perp (SBC)$, và $\\dfrac{1}{AH^2} = \\dfrac{1}{SA^2} + \\dfrac{1}{AK^2}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Lấy góc giữa đường thẳng và mặt phẳng là góc với một đường bất kì trong mặt phẳng thay vì với hình chiếu; đo góc nhị diện bằng hai tia không vuông góc với cạnh; nhầm chiều cao của khối chóp với cạnh bên khi cạnh bên không vuông góc với đáy; quên hệ số $\\dfrac{1}{3}$ trong thể tích khối chóp.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ câu hỏi trên hình chóp xoay được',
    instruction:
      'Hình chóp $S.ABCD$ có đáy là hình vuông và $SA \\perp (ABCD)$. Chọn một câu hỏi, xoay hình để nhìn rõ, nhập đáp số và kiểm tra. Bấm "Hiện hình gợi ý" để thấy góc, đoạn thẳng hoặc mặt phẳng cần dùng; bấm "Đổi số liệu" để luyện với hình chóp khác.',
  },
  examples: [
    {
      problem:
        'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy $a$, góc giữa mặt bên và mặt đáy bằng $60^\\circ$. Gọi $O$ là tâm của đáy. Tính $SO$, khoảng cách từ $O$ đến mặt phẳng $(SCD)$ và thể tích khối chóp.',
      steps: [
        'Gọi $M$ là trung điểm $CD$. Ta có $OM \\perp CD$ và $SM \\perp CD$, nên góc giữa $(SCD)$ và $(ABCD)$ là $\\widehat{SMO} = 60^\\circ$.',
        '$OM = \\dfrac{a}{2}$, $SO = OM \\tan 60^\\circ = \\dfrac{a\\sqrt{3}}{2}$, $SM = \\dfrac{OM}{\\cos 60^\\circ} = a$.',
        'Kẻ $OH \\perp SM$. Vì $CD \\perp (SOM)$ nên $CD \\perp OH$, do đó $OH \\perp (SCD)$ và $OH = \\dfrac{SO \\cdot OM}{SM} = \\dfrac{a\\sqrt{3}}{4}$.',
        '$V = \\dfrac{1}{3} \\cdot a^2 \\cdot \\dfrac{a\\sqrt{3}}{2} = \\dfrac{a^3\\sqrt{3}}{6}$.',
      ],
      answer:
        '$SO = \\dfrac{a\\sqrt{3}}{2}$, $d(O, (SCD)) = \\dfrac{a\\sqrt{3}}{4}$, $V = \\dfrac{a^3\\sqrt{3}}{6}$.',
    },
    {
      problem:
        "Cho hình lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác vuông cân tại $A$, $AB = AC = AA' = a$. Tính góc giữa đường thẳng $B'C$ và mặt phẳng $(ABB'A')$ và thể tích khối lăng trụ.",
      steps: [
        "$CA \\perp AB$ và $CA \\perp AA'$ nên $CA \\perp (ABB'A')$: hình chiếu của $B'C$ trên $(ABB'A')$ là $B'A$.",
        "Góc cần tìm là $\\widehat{CB'A}$; tam giác $CAB'$ vuông tại $A$ có $AB' = a\\sqrt{2}$, nên $\\tan\\widehat{CB'A} = \\dfrac{a}{a\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$, $\\widehat{CB'A} \\approx 35{,}3^\\circ$.",
        "$V = S_{ABC} \\cdot AA' = \\dfrac{a^2}{2} \\cdot a = \\dfrac{a^3}{2}$.",
      ],
      answer:
        'Góc $\\approx 35{,}3^\\circ$ (với $\\tan = \\dfrac{\\sqrt{2}}{2}$); $V = \\dfrac{a^3}{2}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong không gian, khẳng định nào sau đây đúng?',
      options: [
        'Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì song song với nhau.',
        'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau.',
        'Đường thẳng vuông góc với một đường thẳng nằm trong $(P)$ thì vuông góc với $(P)$.',
        'Hai mặt phẳng phân biệt cùng vuông góc với một mặt phẳng thì song song với nhau.',
      ],
      answer: 0,
      hints: ['Thử với các cạnh của hình lập phương: ba cạnh chung một đỉnh đôi một vuông góc.'],
      solution:
        "Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì song song. Các khẳng định còn lại sai: trong hình lập phương, $AB$ và $AD$ cùng vuông góc với $AA'$ nhưng cắt nhau; $AB \\perp BC$ với $BC \\subset (ABCD)$ nhưng $AB$ nằm trong $(ABCD)$, không vuông góc với nó; mặt $(ABB'A')$ và $(ADD'A')$ cùng vuông góc với $(ABCD)$ nhưng cắt nhau.",
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$. Tính góc giữa hai đường thẳng $AC$ và $A'D$ (theo độ).",
      answer: 60,
      unit: '°',
      hints: [
        "$A'D \\parallel B'C$, nên góc cần tìm bằng góc giữa $AC$ và $B'C$.",
        "Tam giác $AB'C$ có ba cạnh là ba đường chéo của ba mặt hình lập phương.",
      ],
      solution:
        "$A'B'CD$ là hình bình hành nên $A'D \\parallel B'C$. Tam giác $AB'C$ đều (ba cạnh bằng $a\\sqrt{2}$), nên góc giữa $AC$ và $A'D$ bằng $\\widehat{ACB'} = 60^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$. Tính góc giữa đường thẳng $A'C$ và mặt phẳng $(ABCD)$ (làm tròn đến độ).",
      answer: 35,
      tolerance: 0.5,
      unit: '°',
      hints: [
        "Hình chiếu của $A'C$ trên $(ABCD)$ là $AC$; góc cần tìm là $\\widehat{A'CA}$.",
        "$\\tan\\widehat{A'CA} = \\dfrac{AA'}{AC}$.",
      ],
      solution:
        "$AA' \\perp (ABCD)$ nên góc cần tìm là $\\widehat{A'CA}$, với $\\tan\\widehat{A'CA} = \\dfrac{a}{a\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$, nên $\\widehat{A'CA} \\approx 35^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy $2$ cm và chiều cao $SO = 1$ cm. Tính góc giữa mặt phẳng $(SCD)$ và mặt phẳng đáy (theo độ).',
      answer: 45,
      unit: '°',
      hints: [
        'Gọi $M$ là trung điểm $CD$: $OM \\perp CD$ và $SM \\perp CD$.',
        'Góc cần tìm là $\\widehat{SMO}$, với $OM = 1$ cm.',
      ],
      solution:
        'Gọi $M$ là trung điểm $CD$. $OM \\perp CD$, $SM \\perp CD$ nên góc giữa $(SCD)$ và đáy là $\\widehat{SMO}$. $\\tan\\widehat{SMO} = \\dfrac{SO}{OM} = \\dfrac{1}{1} = 1$, nên góc bằng $45^\\circ$.',
    },
    {
      type: 'multi',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình vuông và $SA \\perp (ABCD)$. Những mặt phẳng nào vuông góc với mặt phẳng $(SAB)$?',
      options: ['$(SBC)$', '$(SAD)$', '$(ABCD)$', '$(SAC)$', '$(SCD)$'],
      answers: [0, 1, 2],
      hints: [
        'Một mặt phẳng vuông góc với $(SAB)$ khi nó chứa một đường thẳng vuông góc với $(SAB)$.',
        'Xét các đường thẳng $BC$, $AD$, $SA$.',
      ],
      solution:
        '$BC \\perp AB$, $BC \\perp SA$ nên $BC \\perp (SAB)$, suy ra $(SBC) \\perp (SAB)$. Tương tự $AD \\perp (SAB)$ nên $(SAD) \\perp (SAB)$. $SA \\perp (ABCD)$ và $SA \\subset (SAB)$ nên $(ABCD) \\perp (SAB)$. Góc nhị diện giữa $(SAC)$ và $(SAB)$ là $\\widehat{BAC} = 45^\\circ$; góc giữa $(SCD)$ và $(SAB)$ là $\\widehat{ASD} < 90^\\circ$: hai mặt này không vuông góc với $(SAB)$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ vuông tại $B$, $SA = 6$ cm, $AB = 8$ cm. Tính khoảng cách từ $A$ đến mặt phẳng $(SBC)$.',
      answer: 4.8,
      tolerance: 0.001,
      unit: 'cm',
      hints: ['$BC \\perp (SAB)$. Kẻ $AH \\perp SB$.', '$AH = \\dfrac{SA \\cdot AB}{SB}$.'],
      solution:
        '$BC \\perp AB$, $BC \\perp SA$ nên $BC \\perp (SAB)$; kẻ $AH \\perp SB$ thì $AH \\perp (SBC)$. $SB = \\sqrt{36 + 64} = 10$ cm, $AH = \\dfrac{6 \\cdot 8}{10} = 4{,}8$ cm.',
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$ cạnh $3$ cm. Tính khoảng cách từ $A$ đến mặt phẳng $(A'BD)$ (làm tròn đến hàng phần trăm).",
      answer: 1.73,
      tolerance: 0.006,
      unit: 'cm',
      hints: [
        "Gọi $O$ là tâm $ABCD$: $BD \\perp (AA'O)$. Kẻ $AH \\perp A'O$ thì $AH \\perp (A'BD)$.",
        "$\\dfrac{1}{AH^2} = \\dfrac{1}{AA'^2} + \\dfrac{1}{AO^2}$.",
      ],
      solution:
        "$BD \\perp AO$, $BD \\perp AA'$ nên $BD \\perp (AA'O)$; kẻ $AH \\perp A'O$ thì $AH \\perp (A'BD)$. $AO = \\dfrac{3\\sqrt{2}}{2}$, $\\dfrac{1}{AH^2} = \\dfrac{1}{9} + \\dfrac{2}{9} = \\dfrac{1}{3}$, nên $AH = \\sqrt{3} \\approx 1{,}73$ cm.",
    },
    {
      type: 'number',
      prompt:
        "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có $AB = 3$ cm, $AD = 4$ cm, $AA' = 12$ cm. Tính khoảng cách giữa hai đường thẳng chéo nhau $BD$ và $A'C'$.",
      answer: 12,
      unit: 'cm',
      hints: [
        "$BD$ nằm trong $(ABCD)$, $A'C'$ nằm trong $(A'B'C'D')$; hai mặt phẳng này song song.",
      ],
      solution:
        "Gọi $O$, $O'$ là tâm hai đáy. $OO' \\parallel AA'$ nên $OO'$ vuông góc với hai đáy, do đó $OO' \\perp BD$, $OO' \\perp A'C'$: $OO'$ là đoạn vuông góc chung. $d(BD, A'C') = OO' = AA' = 12$ cm.",
    },
    {
      type: 'number',
      prompt: 'Tính thể tích khối chóp tứ giác đều có cạnh đáy $2$ cm và chiều cao $3$ cm.',
      answer: 4,
      unit: 'cm³',
      hints: ['$V = \\dfrac{1}{3}Sh$ với $S$ là diện tích hình vuông đáy.'],
      solution: '$V = \\dfrac{1}{3} \\cdot 2^2 \\cdot 3 = 4$ cm³.',
    },
    {
      type: 'number',
      prompt:
        "Cho hình lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác đều cạnh $2$ cm và $AA' = 3$ cm. Tính thể tích khối lăng trụ (làm tròn đến hàng phần trăm).",
      answer: 5.2,
      tolerance: 0.006,
      unit: 'cm³',
      hints: ['Diện tích tam giác đều cạnh $2$ là $\\sqrt{3}$; chiều cao là cạnh bên.'],
      solution:
        '$S = \\dfrac{2^2\\sqrt{3}}{4} = \\sqrt{3}$ cm², $V = \\sqrt{3} \\cdot 3 = 3\\sqrt{3} \\approx 5{,}20$ cm³.',
    },
    {
      type: 'number',
      prompt:
        'Một chậu cây có dạng khối chóp cụt tứ giác đều, hai đáy là hình vuông cạnh $5$ dm và $2$ dm, chiều cao $3$ dm. Tính thể tích của chậu (theo dm³).',
      answer: 39,
      unit: 'dm³',
      hints: ["$S = 25$, $S' = 4$, $\\sqrt{SS'} = 10$."],
      solution: '$V = \\dfrac{1}{3} \\cdot 3 \\cdot (25 + 10 + 4) = 39$ dm³.',
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh $3$ cm, $SA \\perp (ABCD)$, góc giữa mặt phẳng $(SBC)$ và mặt phẳng đáy bằng $60^\\circ$. Tính thể tích khối chóp (làm tròn đến hàng phần trăm).',
      answer: 15.59,
      tolerance: 0.006,
      unit: 'cm³',
      hints: [
        '$BC \\perp (SAB)$ nên góc giữa $(SBC)$ và đáy là $\\widehat{SBA}$.',
        '$SA = AB \\tan 60^\\circ$.',
      ],
      solution:
        '$BC \\perp AB$, $BC \\perp SB$ nên góc giữa $(SBC)$ và đáy là $\\widehat{SBA} = 60^\\circ$; $SA = 3\\tan 60^\\circ = 3\\sqrt{3}$ cm. $V = \\dfrac{1}{3} \\cdot 9 \\cdot 3\\sqrt{3} = 9\\sqrt{3} \\approx 15{,}59$ cm³.',
    },
  ],
  takeaways: [
    'Muốn chứng minh $a \\perp (P)$: chỉ ra $a$ vuông góc với hai đường thẳng cắt nhau trong $(P)$.',
    'Góc giữa đường thẳng và mặt phẳng đo qua hình chiếu; góc nhị diện đo bằng hai tia vuông góc với cạnh.',
    'Khoảng cách từ chân đường cao đến mặt bên: kẻ hai lần vuông góc, rồi dùng hệ thức trong tam giác vuông.',
    "Thể tích: khối chóp $\\dfrac{1}{3}Sh$, khối lăng trụ $Sh$, khối chóp cụt đều $\\dfrac{1}{3}h\\left(S + \\sqrt{SS'} + S'\\right)$.",
  ],
};
