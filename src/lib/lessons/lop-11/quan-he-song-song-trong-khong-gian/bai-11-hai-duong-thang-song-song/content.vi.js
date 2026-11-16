/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vị trí tương đối của hai đường thẳng trong không gian: trùng nhau, song song, cắt nhau, chéo nhau; tính chất của hai đường thẳng song song và định lí về giao tuyến của ba mặt phẳng.',
  intro:
    'Trên mặt phẳng, hai đường thẳng không có điểm chung thì song song. Trong không gian thì chưa chắc: một đường ray chạy dưới chân cầu vượt và con đường trên cầu không gặp nhau, nhưng cũng không song song. Ta gọi chúng là hai đường thẳng chéo nhau.',
  objectives: [
    'Phân biệt bốn vị trí tương đối của hai đường thẳng trong không gian.',
    'Nhận biết hai đường thẳng chéo nhau.',
    'Vận dụng tính chất của hai đường thẳng song song và định lí về giao tuyến của ba mặt phẳng.',
    'Tìm giao tuyến của hai mặt phẳng lần lượt chứa hai đường thẳng song song.',
  ],
  sections: [
    {
      heading: 'Vị trí tương đối của hai đường thẳng',
      blocks: [
        { type: 'p', text: 'Cho hai đường thẳng $a$ và $b$ trong không gian. Có hai khả năng:' },
        {
          type: 'list',
          items: [
            'Có một mặt phẳng chứa cả $a$ và $b$ (ta nói $a$, $b$ đồng phẳng). Khi đó, theo hình học phẳng, $a$ và $b$ trùng nhau, song song hoặc cắt nhau.',
            'Không có mặt phẳng nào chứa cả $a$ và $b$ (không đồng phẳng). Khi đó ta nói $a$ và $b$ chéo nhau, hay $a$ chéo với $b$.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai đường thẳng song song',
          text: 'Hai đường thẳng gọi là song song nếu chúng cùng nằm trong một mặt phẳng và không có điểm chung. Kí hiệu $a \\parallel b$.',
        },
        {
          type: 'table',
          caption: 'Bốn vị trí tương đối của hai đường thẳng',
          head: ['Vị trí', 'Cùng nằm trong một mặt phẳng?', 'Số điểm chung'],
          rows: [
            ['Trùng nhau', 'Có', 'Vô số'],
            ['Cắt nhau', 'Có', '$1$'],
            ['Song song', 'Có', '$0$'],
            ['Chéo nhau', 'Không', '$0$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hai đường thẳng không có điểm chung thì song song hoặc chéo nhau. Muốn khẳng định song song, phải chỉ ra chúng cùng nằm trong một mặt phẳng.',
        },
      ],
    },
    {
      heading: 'Tính chất của hai đường thẳng song song',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 1',
          text: 'Trong không gian, qua một điểm nằm ngoài một đường thẳng, có một và chỉ một đường thẳng song song với đường thẳng đó.',
        },
        {
          type: 'p',
          text: 'Hai đường thẳng song song $a$, $b$ xác định một mặt phẳng, kí hiệu $\\mathrm{mp}(a, b)$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 2 (về giao tuyến của ba mặt phẳng)',
          text: 'Nếu ba mặt phẳng phân biệt đôi một cắt nhau theo ba giao tuyến phân biệt thì ba giao tuyến ấy hoặc đồng quy hoặc đôi một song song với nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hệ quả',
          text: 'Nếu hai mặt phẳng phân biệt lần lượt chứa hai đường thẳng song song thì giao tuyến của chúng (nếu có) cũng song song với hai đường thẳng đó hoặc trùng với một trong hai đường thẳng đó.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 3',
          text: 'Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì song song với nhau: $a \\parallel c$ và $b \\parallel c$ thì $a \\parallel b$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tìm giao tuyến nhờ hai đường thẳng song song',
          text: 'Nếu $(P)$ chứa $a$, $(Q)$ chứa $b$ với $a \\parallel b$ và $M$ là một điểm chung của $(P)$, $(Q)$ thì giao tuyến của $(P)$ và $(Q)$ là đường thẳng qua $M$ song song với $a$ và $b$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Song song, cắt nhau hay chéo nhau?',
    instruction:
      'Hình hộp chữ nhật có một đường thẳng đỏ và một đường thẳng xanh đi qua các đỉnh. Xoay hình để quan sát, rồi chọn vị trí tương đối của chúng. Nếu hai đường thẳng đồng phẳng, mặt phẳng chứa chúng được tô xanh lá; nếu chéo nhau, em sẽ thấy lí do không có mặt phẳng nào chứa cả hai.',
  },
  examples: [
    {
      problem:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành. Tìm giao tuyến của hai mặt phẳng $(SAB)$ và $(SCD)$.',
      steps: [
        '$S$ là một điểm chung của $(SAB)$ và $(SCD)$.',
        '$(SAB)$ chứa $AB$, $(SCD)$ chứa $CD$, mà $AB \\parallel CD$ (cạnh đối của hình bình hành).',
        'Theo hệ quả của Định lí 2, giao tuyến song song với $AB$ và $CD$.',
      ],
      answer:
        'Giao tuyến là đường thẳng $d$ đi qua $S$ và song song với $AB$ (cũng song song với $CD$).',
    },
    {
      problem:
        'Cho tứ diện $ABCD$. Gọi $M$, $N$, $P$, $Q$ lần lượt là trung điểm của $AB$, $BC$, $CD$, $DA$. Chứng minh $MNPQ$ là hình bình hành.',
      steps: [
        '$MN$ là đường trung bình của tam giác $ABC$ nên $MN \\parallel AC$ và $MN = \\dfrac{1}{2}AC$.',
        '$QP$ là đường trung bình của tam giác $ACD$ nên $QP \\parallel AC$ và $QP = \\dfrac{1}{2}AC$.',
        'Theo Định lí 3, $MN \\parallel QP$; lại có $MN = QP$.',
        'Tứ giác $MNPQ$ có một cặp cạnh đối song song và bằng nhau.',
      ],
      answer: '$MNPQ$ là hình bình hành.',
    },
    {
      problem:
        "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$. Xét vị trí tương đối của các cặp đường thẳng: $AB$ và $C'D'$; $AB$ và $CC'$.",
      steps: [
        "$ABC'D'$ là hình chữ nhật (vì $AB \\parallel CD \\parallel C'D'$ và $AB = C'D'$), nên $AB$ và $C'D'$ cùng nằm trong $(ABC'D')$ và không có điểm chung: $AB \\parallel C'D'$.",
        "$AB \\subset (ABCD)$, còn $CC'$ cắt $(ABCD)$ tại $C \\notin AB$.",
        "Nếu có mặt phẳng chứa cả $AB$ và $CC'$ thì nó chứa $AB$ và $C$, nên là $(ABCD)$; nhưng $CC'$ không nằm trong $(ABCD)$.",
      ],
      answer: "$AB \\parallel C'D'$; $AB$ và $CC'$ chéo nhau.",
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong không gian, hai đường thẳng không có điểm chung thì',
      options: ['song song hoặc chéo nhau', 'song song', 'chéo nhau', 'cắt nhau'],
      answer: 0,
      hints: ['Song song cũng không có điểm chung. Còn vị trí nào khác?'],
      solution:
        'Hai đường thẳng không có điểm chung, nếu cùng nằm trong một mặt phẳng thì song song, nếu không thì chéo nhau.',
    },
    {
      type: 'multi',
      prompt:
        "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$. Những đường thẳng nào dưới đây chéo nhau với $AB$?",
      options: ["$CC'$", "$A'D'$", "$C'D'$", '$BC$', "$A'B'$"],
      answers: [0, 1],
      hints: [
        'Loại các đường thẳng cắt $AB$ hoặc song song với $AB$.',
        "$C'D' \\parallel CD \\parallel AB$; $BC$ cắt $AB$ tại $B$.",
      ],
      solution:
        "$C'D'$ và $A'B'$ song song với $AB$, $BC$ cắt $AB$ tại $B$. $CC'$ cắt $(ABCD)$ tại $C \\notin AB$ và $A'D'$ cắt $(ABB'A')$ tại $A' \\notin AB$, nên $CC'$, $A'D'$ chéo nhau với $AB$.",
    },
    {
      type: 'number',
      prompt:
        "Hình hộp chữ nhật $ABCD.A'B'C'D'$ có bao nhiêu cạnh (khác $AB$) song song với cạnh $AB$?",
      answer: 3,
      hints: [
        'Các cạnh song song với $AB$ đều có cùng phương với $AB$: một cạnh ở đáy dưới, hai cạnh ở đáy trên.',
      ],
      solution: "Đó là $CD$, $A'B'$ và $C'D'$: có $3$ cạnh.",
    },
    {
      type: 'number',
      prompt: "Hình hộp chữ nhật $ABCD.A'B'C'D'$ có bao nhiêu cạnh chéo nhau với cạnh $AB$?",
      answer: 4,
      hints: [
        'Hình hộp có $12$ cạnh. Bỏ $AB$, các cạnh song song và các cạnh cắt $AB$.',
        "Các cạnh cắt $AB$ là $AD$, $AA'$, $BC$, $BB'$.",
      ],
      solution:
        "Trong $12$ cạnh: $AB$; $3$ cạnh song song ($CD$, $A'B'$, $C'D'$); $4$ cạnh cắt $AB$ ($AD$, $AA'$, $BC$, $BB'$). Còn lại $12 - 1 - 3 - 4 = 4$ cạnh chéo nhau với $AB$: $CC'$, $DD'$, $A'D'$, $B'C'$.",
    },
    {
      type: 'choice',
      prompt: 'Cho tứ diện $ABCD$. Hai đường thẳng $AB$ và $CD$',
      options: ['chéo nhau', 'song song', 'cắt nhau', 'trùng nhau'],
      answer: 0,
      hints: [
        'Nếu $AB$ và $CD$ cùng nằm trong một mặt phẳng thì bốn điểm $A$, $B$, $C$, $D$ thế nào?',
      ],
      solution:
        'Nếu có mặt phẳng chứa $AB$ và $CD$ thì $A$, $B$, $C$, $D$ đồng phẳng, trái với giả thiết $ABCD$ là tứ diện. Vậy $AB$ và $CD$ chéo nhau.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình thang $ABCD$ với $AD \\parallel BC$. Giao tuyến của $(SAD)$ và $(SBC)$ là',
      options: [
        'đường thẳng qua $S$ song song với $AD$',
        'đường thẳng $SO$ với $O$ là giao điểm của $AC$ và $BD$',
        'đường thẳng qua $S$ song song với $AB$',
        'đường thẳng $SA$',
      ],
      answer: 0,
      hints: ['$S$ là điểm chung. Hai mặt phẳng lần lượt chứa hai đường thẳng song song nào?'],
      solution:
        '$S$ là điểm chung; $(SAD)$ chứa $AD$, $(SBC)$ chứa $BC$ và $AD \\parallel BC$. Theo hệ quả, giao tuyến là đường thẳng qua $S$ song song với $AD$ và $BC$.',
    },
    {
      type: 'choice',
      prompt:
        'Ba mặt phẳng phân biệt đôi một cắt nhau theo ba giao tuyến phân biệt. Khi đó ba giao tuyến',
      options: [
        'hoặc đồng quy hoặc đôi một song song',
        'luôn đồng quy',
        'luôn đôi một song song',
        'có thể đôi một chéo nhau',
      ],
      answer: 0,
      hints: ['Hai giao tuyến bất kì cùng nằm trong một mặt phẳng, nên chúng không thể chéo nhau.'],
      solution:
        'Theo Định lí 2 (về giao tuyến của ba mặt phẳng), ba giao tuyến hoặc đồng quy hoặc đôi một song song. Chẳng hạn ba mặt bên của một hình chóp tam giác cắt nhau theo ba cạnh bên đồng quy tại đỉnh, còn ba mặt bên của một hình lăng trụ tam giác cắt nhau theo ba cạnh bên song song.',
    },
    {
      type: 'number',
      prompt:
        'Cho tứ diện $ABCD$ có $AC = 10$ cm, $BD = 6$ cm. Gọi $M$, $N$, $P$, $Q$ lần lượt là trung điểm của $AB$, $BC$, $CD$, $DA$. Tính chu vi tứ giác $MNPQ$.',
      answer: 16,
      unit: 'cm',
      hints: [
        '$MN$ và $PQ$ là đường trung bình ứng với cạnh $AC$; $NP$ và $QM$ ứng với cạnh $BD$.',
        '$MN = PQ = \\dfrac{1}{2}AC$, $NP = QM = \\dfrac{1}{2}BD$.',
      ],
      solution:
        '$MN = PQ = \\dfrac{10}{2} = 5$ cm, $NP = QM = \\dfrac{6}{2} = 3$ cm. Chu vi $MNPQ$ là $2(5 + 3) = 16$ cm.',
    },
  ],
  takeaways: [
    'Hai đường thẳng đồng phẳng thì trùng nhau, cắt nhau hoặc song song; không đồng phẳng thì chéo nhau.',
    'Song song nghĩa là cùng nằm trong một mặt phẳng và không có điểm chung.',
    'Qua một điểm ngoài đường thẳng $a$ có đúng một đường thẳng song song với $a$; hai đường thẳng cùng song song với đường thứ ba thì song song với nhau.',
    'Hai mặt phẳng lần lượt chứa hai đường thẳng song song thì giao tuyến của chúng song song với hai đường thẳng đó (hoặc trùng với một trong hai).',
  ],
};
