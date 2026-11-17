/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép chiếu vuông góc lên một mặt phẳng, định lí ba đường vuông góc và góc giữa đường thẳng và mặt phẳng: góc giữa đường thẳng và hình chiếu của nó trên mặt phẳng.',
  intro:
    'Buổi trưa, Mặt Trời gần như ở ngay trên đỉnh đầu, bóng của một chiếc gậy cắm xiên xuống đất gần với hình chiếu vuông góc của gậy trên mặt đất. Góc giữa chiếc gậy và mặt đất được đo bằng góc giữa gậy và cái bóng ấy.',
  objectives: [
    'Xác định được hình chiếu vuông góc của một điểm, một đường thẳng trên một mặt phẳng.',
    'Phát biểu và vận dụng định lí ba đường vuông góc.',
    'Xác định và tính góc giữa đường thẳng và mặt phẳng.',
  ],
  sections: [
    {
      heading: 'Phép chiếu vuông góc',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho mặt phẳng $(P)$. Phép chiếu song song lên $(P)$ theo phương của một đường thẳng vuông góc với $(P)$ được gọi là phép chiếu vuông góc lên mặt phẳng $(P)$.',
        },
        {
          type: 'list',
          items: [
            'Hình chiếu vuông góc của điểm $M$ trên $(P)$ là giao điểm $H$ của $(P)$ với đường thẳng qua $M$ vuông góc với $(P)$; nếu $M \\in (P)$ thì $H$ trùng $M$.',
            'Phép chiếu vuông góc có đầy đủ các tính chất của phép chiếu song song.',
            "Nếu đường thẳng $a$ vuông góc với $(P)$ thì hình chiếu của $a$ là một điểm; nếu không, hình chiếu của $a$ là một đường thẳng $a'$.",
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đường xiên và hình chiếu',
          text: 'Cho điểm $S$ nằm ngoài $(P)$, $H$ là hình chiếu của $S$ trên $(P)$ và $A \\in (P)$, $A \\ne H$. Khi đó $SA$ gọi là đường xiên, $AH$ là hình chiếu của đường xiên $SA$ trên $(P)$, và $SH < SA$.',
        },
      ],
    },
    {
      heading: 'Định lí ba đường vuông góc',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí ba đường vuông góc',
          text: "Cho đường thẳng $a$ không vuông góc với mặt phẳng $(P)$ và đường thẳng $b$ nằm trong $(P)$. Khi đó, $b$ vuông góc với $a$ khi và chỉ khi $b$ vuông góc với hình chiếu $a'$ của $a$ trên $(P)$.",
        },
        {
          type: 'tex',
          tex: "b \\subset (P):\\quad b \\perp a \\iff b \\perp a'",
        },
        {
          type: 'p',
          text: 'Định lí cho phép chứng minh hai đường thẳng vuông góc trong không gian bằng cách xét quan hệ vuông góc trong mặt phẳng $(P)$, nơi ta dùng được kiến thức hình học phẳng.',
        },
      ],
    },
    {
      heading: 'Góc giữa đường thẳng và mặt phẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Nếu đường thẳng $a$ vuông góc với mặt phẳng $(P)$ thì ta nói góc giữa $a$ và $(P)$ bằng $90^\\circ$. Nếu $a$ không vuông góc với $(P)$ thì góc giữa $a$ và $(P)$ là góc giữa $a$ và hình chiếu $a'$ của $a$ trên $(P)$. Kí hiệu $(a, (P))$.",
        },
        {
          type: 'list',
          items: [
            '$0^\\circ \\le (a, (P)) \\le 90^\\circ$.',
            'Nếu $a \\parallel (P)$ hoặc $a \\subset (P)$ thì $(a, (P)) = 0^\\circ$.',
            'Với đường xiên $SA$ có hình chiếu $AH$: $(SA, (P)) = \\widehat{SAH}$ và $\\tan\\widehat{SAH} = \\dfrac{SH}{AH}$.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Xoay đường xiên quanh chân',
    instruction:
      'Đường xiên $SA$ (đỏ) có chân $A$ trên mặt phẳng $(P)$; $AH$ (cam) là hình chiếu của nó. Thay đổi độ cao $SH$ và độ dài $AH$ để xem góc $\\widehat{SAH}$ giữa $SA$ và $(P)$ thay đổi theo $\\tan\\widehat{SAH} = \\dfrac{SH}{AH}$. Xoay đường thẳng $d$ (xanh) trong $(P)$: khi nào $d$ vuông góc với $SA$?',
  },
  examples: [
    {
      problem:
        'Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$, $SA \\perp (ABCD)$ và $SA = a\\sqrt{2}$. Tính góc giữa đường thẳng $SC$ và mặt phẳng $(ABCD)$.',
      steps: [
        '$SA \\perp (ABCD)$ nên $A$ là hình chiếu của $S$ trên $(ABCD)$; hình chiếu của $SC$ trên $(ABCD)$ là $AC$.',
        'Do đó $(SC, (ABCD)) = (SC, AC) = \\widehat{SCA}$.',
        '$AC = a\\sqrt{2}$ (đường chéo hình vuông), tam giác $SAC$ vuông tại $A$: $\\tan\\widehat{SCA} = \\dfrac{SA}{AC} = \\dfrac{a\\sqrt{2}}{a\\sqrt{2}} = 1$.',
      ],
      answer: '$(SC, (ABCD)) = 45^\\circ$.',
    },
    {
      problem:
        'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$ và tam giác $ABC$ vuông tại $B$. Chứng minh $BC \\perp SB$.',
      steps: [
        '$SA \\perp (ABC)$ nên hình chiếu của $SB$ trên $(ABC)$ là $AB$.',
        '$BC \\subset (ABC)$ và $BC \\perp AB$.',
        'Theo định lí ba đường vuông góc, $BC \\perp SB$.',
      ],
      answer: '$BC \\perp SB$, tức là tam giác $SBC$ vuông tại $B$.',
    },
    {
      problem:
        'Cho hình chóp $S.ABC$ có $SA = SB = SC$. Gọi $H$ là hình chiếu vuông góc của $S$ trên mặt phẳng $(ABC)$. Chứng minh $H$ là tâm đường tròn ngoại tiếp tam giác $ABC$.',
      steps: [
        '$SH \\perp (ABC)$ nên $SH \\perp HA$, $SH \\perp HB$, $SH \\perp HC$: các tam giác $SHA$, $SHB$, $SHC$ vuông tại $H$.',
        'Theo định lí Pythagore: $HA^2 = SA^2 - SH^2$, $HB^2 = SB^2 - SH^2$, $HC^2 = SC^2 - SH^2$.',
        'Vì $SA = SB = SC$ nên $HA = HB = HC$.',
      ],
      answer: '$H$ cách đều $A$, $B$, $C$ nên là tâm đường tròn ngoại tiếp tam giác $ABC$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Đường thẳng $a$ không vuông góc với mặt phẳng $(P)$. Hình chiếu vuông góc của $a$ trên $(P)$ là',
      options: ['một đường thẳng', 'một điểm', 'một đoạn thẳng', 'một nửa mặt phẳng'],
      answer: 0,
      hints: [
        'Chiếu từng điểm của $a$ theo phương vuông góc với $(P)$. Khi nào mọi điểm có chung một hình chiếu?',
      ],
      solution:
        "Khi $a$ vuông góc với $(P)$, mọi điểm của $a$ có chung hình chiếu là một điểm. Khi $a$ không vuông góc với $(P)$, hình chiếu của $a$ là một đường thẳng $a'$.",
    },
    {
      type: 'choice',
      prompt:
        "Cho đường thẳng $a$ không vuông góc với $(P)$, có hình chiếu trên $(P)$ là $a'$, và đường thẳng $b \\subset (P)$. Khẳng định nào đúng?",
      options: [
        "$b \\perp a$ khi và chỉ khi $b \\perp a'$",
        "$b \\perp a$ khi và chỉ khi $b \\parallel a'$",
        '$b$ luôn vuông góc với $a$',
        "$b \\perp a'$ thì $b \\parallel a$",
      ],
      answer: 0,
      hints: ['Đây là nội dung của định lí ba đường vuông góc.'],
      solution:
        "Theo định lí ba đường vuông góc, với $b \\subset (P)$: $b \\perp a \\iff b \\perp a'$.",
    },
    {
      type: 'number',
      prompt:
        'Đoạn thẳng $AB$ dài $10$ cm có điểm $A$ nằm trên mặt phẳng $(P)$, hình chiếu vuông góc của $AB$ trên $(P)$ dài $5$ cm. Tính góc giữa đường thẳng $AB$ và $(P)$ (theo độ).',
      answer: 60,
      unit: '°',
      hints: [
        'Gọi $H$ là hình chiếu của $B$: tam giác $ABH$ vuông tại $H$.',
        'Tính $\\cos\\widehat{BAH} = \\dfrac{AH}{AB}$.',
      ],
      solution:
        '$(AB, (P)) = \\widehat{BAH}$ với $\\cos\\widehat{BAH} = \\dfrac{AH}{AB} = \\dfrac{5}{10} = \\dfrac{1}{2}$, nên góc bằng $60^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$, $SA \\perp (ABCD)$ và $SA = a\\sqrt{6}$. Tính góc giữa $SC$ và mặt phẳng $(ABCD)$ (theo độ).',
      answer: 60,
      unit: '°',
      hints: [
        'Hình chiếu của $SC$ trên $(ABCD)$ là $AC$.',
        '$AC = a\\sqrt{2}$; tính $\\tan\\widehat{SCA}$.',
      ],
      solution:
        '$(SC, (ABCD)) = \\widehat{SCA}$, $\\tan\\widehat{SCA} = \\dfrac{SA}{AC} = \\dfrac{a\\sqrt{6}}{a\\sqrt{2}} = \\sqrt{3}$, nên $\\widehat{SCA} = 60^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$, $SA \\perp (ABCD)$ và $SA = a\\sqrt{2}$. Tính góc giữa $SB$ và mặt phẳng $(ABCD)$ (theo độ, làm tròn đến hàng phần mười).',
      answer: 54.7,
      tolerance: 0.05,
      unit: '°',
      hints: [
        'Hình chiếu của $SB$ trên $(ABCD)$ là $AB$.',
        '$\\tan\\widehat{SBA} = \\dfrac{SA}{AB}$.',
      ],
      solution:
        '$(SB, (ABCD)) = \\widehat{SBA}$, $\\tan\\widehat{SBA} = \\dfrac{a\\sqrt{2}}{a} = \\sqrt{2}$, nên $\\widehat{SBA} \\approx 54{,}7^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$. Tính góc giữa đường thẳng $A'C$ và mặt phẳng $(ABCD)$ (theo độ, làm tròn đến hàng phần mười).",
      answer: 35.3,
      tolerance: 0.05,
      unit: '°',
      hints: [
        "$A$ là hình chiếu của $A'$ trên $(ABCD)$. Hình chiếu của $A'C$ là đoạn nào?",
        "Gọi cạnh là $a$: $AA' = a$, $AC = a\\sqrt{2}$.",
      ],
      solution:
        "Hình chiếu của $A'C$ trên $(ABCD)$ là $AC$, nên góc cần tìm là $\\widehat{A'CA}$ với $\\tan\\widehat{A'CA} = \\dfrac{AA'}{AC} = \\dfrac{1}{\\sqrt{2}}$, do đó $\\widehat{A'CA} \\approx 35{,}3^\\circ$.",
    },
    {
      type: 'choice',
      prompt: 'Đường thẳng $a$ song song với mặt phẳng $(P)$. Góc giữa $a$ và $(P)$ bằng',
      options: ['$0^\\circ$', '$90^\\circ$', '$45^\\circ$', 'không xác định'],
      answer: 0,
      hints: ['Hình chiếu của $a$ trên $(P)$ có song song với $a$ không?'],
      solution: "Hình chiếu $a'$ của $a$ song song với $a$, nên $(a, (P)) = (a, a') = 0^\\circ$.",
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình vuông và $SA \\perp (ABCD)$. Đường thẳng nào của mặt đáy vuông góc với $SC$?',
      options: ['$BD$', '$AB$', '$AC$', '$AD$'],
      answer: 0,
      hints: ['Hình chiếu của $SC$ trên đáy là $AC$. Đường thẳng nào của đáy vuông góc với $AC$?'],
      solution:
        'Hình chiếu của $SC$ trên $(ABCD)$ là $AC$, mà $BD \\perp AC$. Theo định lí ba đường vuông góc, $BD \\perp SC$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABC$ có $SA = SB = SC$ và $H$ là hình chiếu vuông góc của $S$ trên $(ABC)$. Điểm $H$ là',
      options: [
        'tâm đường tròn ngoại tiếp tam giác $ABC$',
        'trọng tâm tam giác $ABC$',
        'trực tâm tam giác $ABC$',
        'tâm đường tròn nội tiếp tam giác $ABC$',
      ],
      answer: 0,
      hints: ['Ba tam giác $SHA$, $SHB$, $SHC$ vuông tại $H$ và có chung cạnh $SH$.'],
      solution:
        '$HA = \\sqrt{SA^2 - SH^2} = HB = HC$, nên $H$ cách đều ba đỉnh: $H$ là tâm đường tròn ngoại tiếp tam giác $ABC$.',
    },
  ],
  takeaways: [
    'Hình chiếu vuông góc của $M$ trên $(P)$ là chân đường vuông góc hạ từ $M$ xuống $(P)$.',
    "Định lí ba đường vuông góc: với $b \\subset (P)$ và $a$ không vuông góc với $(P)$, $b \\perp a \\iff b \\perp a'$.",
    "Góc giữa $a$ và $(P)$ là góc giữa $a$ và hình chiếu $a'$ của nó (bằng $90^\\circ$ khi $a \\perp (P)$).",
    'Đường xiên $SA$ có hình chiếu $AH$: $(SA, (P)) = \\widehat{SAH}$, $\\tan\\widehat{SAH} = \\dfrac{SH}{AH}$.',
  ],
};
