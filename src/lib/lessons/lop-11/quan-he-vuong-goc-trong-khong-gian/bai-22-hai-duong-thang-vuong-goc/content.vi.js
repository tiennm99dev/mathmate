/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Góc giữa hai đường thẳng trong không gian là góc giữa hai đường thẳng cùng đi qua một điểm và lần lượt song song với chúng; hai đường thẳng vuông góc khi góc đó bằng 90 độ.',
  intro:
    'Trong một căn phòng hình hộp chữ nhật, mép trên của bức tường phía trước và mép chân của bức tường bên phải không cắt nhau, cũng không song song, nhưng ta vẫn cảm nhận được chúng "vuông góc" với nhau. Để nói được điều đó, ta cần định nghĩa góc giữa hai đường thẳng không cắt nhau.',
  objectives: [
    'Nhận biết và xác định góc giữa hai đường thẳng trong không gian.',
    'Nhận biết hai đường thẳng vuông góc trong không gian.',
    'Tính góc giữa hai đường thẳng chéo nhau bằng cách tịnh tiến một đường thẳng.',
  ],
  sections: [
    {
      heading: 'Góc giữa hai đường thẳng',
      blocks: [
        {
          type: 'p',
          text: 'Trong mặt phẳng, hai đường thẳng cắt nhau tạo thành bốn góc; góc giữa hai đường thẳng là góc nhỏ nhất trong bốn góc đó. Trong không gian, hai đường thẳng có thể chéo nhau, nên ta đưa về hai đường thẳng cắt nhau.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Góc giữa hai đường thẳng $m$ và $n$ trong không gian, kí hiệu $(m, n)$, là góc giữa hai đường thẳng $a$ và $b$ cùng đi qua một điểm và lần lượt song song (hoặc trùng) với $m$ và $n$.',
        },
        {
          type: 'list',
          items: [
            'Góc giữa hai đường thẳng không phụ thuộc vào việc chọn điểm chung của $a$ và $b$.',
            '$0^\\circ \\le (m, n) \\le 90^\\circ$.',
            'Nếu $m \\parallel n$ hoặc $m$ trùng $n$ thì $(m, n) = 0^\\circ$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách xác định góc giữa hai đường thẳng chéo nhau',
          text: "Để xác định góc giữa hai đường thẳng chéo nhau $a$ và $b$, ta lấy một điểm $O$ thuộc $a$ và qua $O$ kẻ đường thẳng $b'$ song song với $b$. Khi đó $(a, b) = (a, b')$. Thường ta chọn $O$ và $b'$ sao cho góc cần tìm là góc của một tam giác tính được.",
        },
      ],
    },
    {
      heading: 'Hai đường thẳng vuông góc',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Hai đường thẳng $a$, $b$ được gọi là vuông góc với nhau nếu góc giữa chúng bằng $90^\\circ$. Kí hiệu $a \\perp b$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Nếu $a \\perp b$ và $c \\parallel a$ thì $c \\perp b$. Hai đường thẳng vuông góc với nhau có thể cắt nhau hoặc chéo nhau.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: "Trong không gian, hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chưa chắc song song: chúng có thể cắt nhau hoặc chéo nhau (chẳng hạn hai cạnh $AB$ và $AD$ của hình lập phương cùng vuông góc với $AA'$).",
        },
        {
          type: 'table',
          caption: "Góc giữa một số cặp đường thẳng của hình lập phương ABCD.A'B'C'D'",
          head: ['Cặp đường thẳng', 'Đưa về', 'Góc'],
          rows: [
            ["$AB$ và $CC'$", "$(AB, BB')$, vì $CC' \\parallel BB'$", '$90^\\circ$'],
            ["$AB$ và $A'C'$", "$(AB, AC)$, vì $A'C' \\parallel AC$", '$45^\\circ$'],
            ["$AC$ và $BC'$", "$(AC, AD')$, vì $BC' \\parallel AD'$", '$60^\\circ$'],
            ["$AC$ và $B'D'$", "$(AC, BD)$, vì $B'D' \\parallel BD$", '$90^\\circ$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Tịnh tiến để đo góc',
    instruction:
      'Hình lập phương có một đường thẳng đỏ và một đường thẳng xanh, thường là chéo nhau. Bấm "Tịnh tiến về chung điểm" để thấy một đường thẳng của hình song song với một trong hai đường và cắt đường còn lại; góc tô màu chính là góc giữa hai đường thẳng. Xoay hình để quan sát rồi chọn số đo góc.',
  },
  examples: [
    {
      problem:
        "Cho hình lập phương $ABCD.A'B'C'D'$. Tính góc giữa các cặp đường thẳng: $AB$ và $B'C'$; $AC$ và $B'C'$; $A'C'$ và $B'C$.",
      steps: [
        "$B'C' \\parallel BC$ nên $(AB, B'C') = (AB, BC) = \\widehat{ABC} = 90^\\circ$.",
        "Tương tự $(AC, B'C') = (AC, BC) = \\widehat{ACB} = 45^\\circ$ vì $AC$ là đường chéo của hình vuông $ABCD$.",
        "$A'C' \\parallel AC$ nên $(A'C', B'C) = (AC, B'C)$. Tam giác $AB'C$ có ba cạnh là đường chéo của ba hình vuông bằng nhau nên là tam giác đều, do đó $\\widehat{ACB'} = 60^\\circ$.",
      ],
      answer: "$(AB, B'C') = 90^\\circ$, $(AC, B'C') = 45^\\circ$, $(A'C', B'C) = 60^\\circ$.",
    },
    {
      problem:
        'Cho tứ diện $ABCD$ có $AB = CD = 2a$. Gọi $M$, $N$ lần lượt là trung điểm của $BC$ và $AD$, biết $MN = a\\sqrt{3}$. Tính góc giữa hai đường thẳng $AB$ và $CD$.',
      steps: [
        'Gọi $P$ là trung điểm của $AC$. $PM$ là đường trung bình của tam giác $ABC$ nên $PM \\parallel AB$ và $PM = \\dfrac{AB}{2} = a$.',
        '$PN$ là đường trung bình của tam giác $ACD$ nên $PN \\parallel CD$ và $PN = \\dfrac{CD}{2} = a$.',
        'Do đó $(AB, CD) = (PM, PN)$.',
        'Trong tam giác $PMN$: $\\cos\\widehat{MPN} = \\dfrac{PM^2 + PN^2 - MN^2}{2 \\cdot PM \\cdot PN} = \\dfrac{a^2 + a^2 - 3a^2}{2a^2} = -\\dfrac{1}{2}$, nên $\\widehat{MPN} = 120^\\circ$.',
        'Góc giữa hai đường thẳng không vượt quá $90^\\circ$, nên $(PM, PN) = 180^\\circ - 120^\\circ = 60^\\circ$.',
      ],
      answer: '$(AB, CD) = 60^\\circ$.',
    },
    {
      problem:
        'Cho tứ diện $ABCD$ có $AB \\perp CD$. Gọi $M$, $N$, $P$, $Q$ lần lượt là trung điểm của $AC$, $BC$, $BD$, $AD$. Chứng minh $MNPQ$ là hình chữ nhật.',
      steps: [
        '$MN$ và $QP$ lần lượt là đường trung bình của tam giác $ABC$ và $ABD$, nên $MN \\parallel AB \\parallel QP$ và $MN = QP = \\dfrac{AB}{2}$. Vậy $MNPQ$ là hình bình hành.',
        '$NP$ là đường trung bình của tam giác $BCD$ nên $NP \\parallel CD$.',
        'Vì $AB \\perp CD$ và $MN \\parallel AB$ nên $MN \\perp CD$; lại có $NP \\parallel CD$ nên $MN \\perp NP$.',
      ],
      answer: 'Hình bình hành $MNPQ$ có một góc vuông nên là hình chữ nhật.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Góc giữa hai đường thẳng bất kì trong không gian có số đo nằm trong khoảng nào?',
      options: [
        '$0^\\circ \\le (m, n) \\le 90^\\circ$',
        '$0^\\circ \\le (m, n) \\le 180^\\circ$',
        '$0^\\circ < (m, n) < 90^\\circ$',
        '$0^\\circ < (m, n) \\le 180^\\circ$',
      ],
      answer: 0,
      hints: [
        'Hai đường thẳng song song tạo góc bao nhiêu độ? Góc giữa hai đường thẳng cắt nhau là góc lớn nhất hay nhỏ nhất trong bốn góc?',
      ],
      solution:
        'Hai đường thẳng song song hoặc trùng nhau tạo góc $0^\\circ$; hai đường thẳng cắt nhau tạo góc là góc nhỏ nhất trong bốn góc, không vượt quá $90^\\circ$. Vậy $0^\\circ \\le (m, n) \\le 90^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$. Tính góc giữa hai đường thẳng $BD$ và $A'C'$ (theo độ).",
      answer: 90,
      unit: '°',
      hints: [
        "Tịnh tiến $A'C'$ xuống mặt đáy: $A'C'$ song song với đường thẳng nào?",
        'Hai đường chéo của một hình vuông có vuông góc với nhau không?',
      ],
      solution:
        "$A'C' \\parallel AC$ nên $(BD, A'C') = (BD, AC) = 90^\\circ$, vì hai đường chéo của hình vuông $ABCD$ vuông góc với nhau.",
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$. Tính góc giữa hai đường thẳng $A'B$ và $B'D'$ (theo độ).",
      answer: 60,
      unit: '°',
      hints: [
        "$B'D'$ song song với đường chéo nào của mặt đáy?",
        "Xét tam giác $A'BD$: các cạnh của nó là gì?",
      ],
      solution:
        "$B'D' \\parallel BD$ nên $(A'B, B'D') = (A'B, BD) = \\widehat{A'BD}$. Tam giác $A'BD$ có ba cạnh là đường chéo của ba mặt nên là tam giác đều, vậy góc cần tìm bằng $60^\\circ$.",
    },
    {
      type: 'multi',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$. Những đường thẳng nào dưới đây vuông góc với $AA'$?",
      options: ['$BD$', "$A'C'$", '$CD$', "$BC'$", "$AB'$"],
      answers: [0, 1, 2],
      hints: [
        "Mỗi đường thẳng nằm trong mặt đáy $(ABCD)$ hoặc $(A'B'C'D')$ đều vuông góc với $AA'$ không? Thử tịnh tiến $AA'$ đến cắt đường thẳng đó.",
        "$BC'$ và $AB'$ là đường chéo của mặt bên: chúng tạo với cạnh bên góc $45^\\circ$.",
      ],
      solution:
        "$BD$, $CD$ nằm trong mặt đáy, $A'C'$ nằm trong mặt đáy trên; tịnh tiến $AA'$ thành cạnh bên đi qua một điểm của chúng thì được góc vuông của một hình vuông hoặc hình chữ nhật (ví dụ $(A'C', AA') = \\widehat{AA'C'} = 90^\\circ$ vì $AA'C'C$ là hình chữ nhật). Còn $(BC', AA') = (BC', BB') = 45^\\circ$ và $(AB', AA') = 45^\\circ$.",
    },
    {
      type: 'choice',
      prompt:
        'Cho ba đường thẳng $a$, $b$, $c$ với $a \\perp b$ và $c \\parallel a$. Khẳng định nào đúng?',
      options: ['$c \\perp b$', '$c \\parallel b$', '$c$ và $b$ cắt nhau', '$c$ và $b$ chéo nhau'],
      answer: 0,
      hints: [
        'Góc giữa hai đường thẳng không đổi khi thay một đường thẳng bằng đường thẳng song song với nó.',
      ],
      solution:
        'Vì $c \\parallel a$ nên $(c, b) = (a, b) = 90^\\circ$, tức là $c \\perp b$. Ta không biết $c$ và $b$ cắt nhau hay chéo nhau.',
    },
    {
      type: 'choice',
      prompt: 'Trong không gian, khẳng định nào sau đây đúng?',
      options: [
        'Nếu $a \\parallel b$ và $c \\perp a$ thì $c \\perp b$.',
        'Hai đường thẳng vuông góc với nhau thì cắt nhau.',
        'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau.',
        'Góc giữa hai đường thẳng có thể bằng $120^\\circ$.',
      ],
      answer: 0,
      hints: [
        "Thử các khẳng định trên hình lập phương: $AB$ và $CC'$ có cắt nhau không? $AB$ và $AD$ cùng vuông góc với $AA'$ thì sao?",
      ],
      solution:
        "Theo nhận xét, $a \\parallel b$ và $c \\perp a$ thì $c \\perp b$. Các khẳng định khác sai: $AB \\perp CC'$ nhưng chúng chéo nhau; $AB$ và $AD$ cùng vuông góc với $AA'$ nhưng cắt nhau; góc giữa hai đường thẳng không vượt quá $90^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        'Cho tứ diện $ABCD$ có $AB = CD = 4$ cm. Gọi $M$, $N$ lần lượt là trung điểm của $BC$ và $AD$, biết $MN = 2\\sqrt{2}$ cm. Tính góc giữa hai đường thẳng $AB$ và $CD$ (theo độ).',
      answer: 90,
      unit: '°',
      hints: [
        'Gọi $P$ là trung điểm của $AC$: $PM \\parallel AB$, $PN \\parallel CD$. Tính $PM$, $PN$.',
        'So sánh $PM^2 + PN^2$ với $MN^2$.',
      ],
      solution:
        '$PM = \\dfrac{AB}{2} = 2$, $PN = \\dfrac{CD}{2} = 2$, $MN^2 = 8 = PM^2 + PN^2$ nên tam giác $PMN$ vuông tại $P$. Vậy $(AB, CD) = (PM, PN) = 90^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hình chóp $S.ABCD$ có đáy là hình vuông và tất cả các cạnh bên đều bằng cạnh đáy. Tính góc giữa hai đường thẳng $SA$ và $CD$ (theo độ).',
      answer: 60,
      unit: '°',
      hints: [
        '$CD$ song song với cạnh nào của đáy đi qua $A$?',
        'Tam giác $SAB$ có ba cạnh thế nào?',
      ],
      solution:
        '$CD \\parallel AB$ nên $(SA, CD) = (SA, AB) = \\widehat{SAB}$. Tam giác $SAB$ có $SA = SB = AB$ nên đều, do đó $\\widehat{SAB} = 60^\\circ$.',
    },
    {
      type: 'choice',
      prompt: "Cho hình lập phương $ABCD.A'B'C'D'$. Góc giữa hai đường thẳng $AC$ và $DA'$ bằng",
      options: ['$60^\\circ$', '$45^\\circ$', '$90^\\circ$', '$30^\\circ$'],
      answer: 0,
      hints: ["$DA'$ song song với đường chéo nào của mặt $(BCC'B')$?", "Xét tam giác $ACB'$."],
      solution:
        "$DA' \\parallel CB'$ (vì $A'B'CD$ là hình chữ nhật) nên $(AC, DA') = (AC, CB') = \\widehat{ACB'}$. Tam giác $ACB'$ đều nên góc này bằng $60^\\circ$.",
    },
  ],
  takeaways: [
    'Góc giữa hai đường thẳng $m$, $n$ là góc giữa hai đường thẳng cắt nhau lần lượt song song (hoặc trùng) với $m$, $n$; $0^\\circ \\le (m, n) \\le 90^\\circ$.',
    "Với hai đường thẳng chéo nhau $a$, $b$: lấy $O \\in a$, kẻ $b' \\parallel b$ qua $O$, rồi tính $(a, b')$ trong một tam giác.",
    '$a \\perp b$ khi $(a, b) = 90^\\circ$; hai đường thẳng vuông góc có thể cắt nhau hoặc chéo nhau.',
    'Nếu $a \\perp b$ và $c \\parallel a$ thì $c \\perp b$.',
  ],
};
