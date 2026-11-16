/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hai mặt phẳng song song: định nghĩa, điều kiện, tính chất, định lí Thalès trong không gian, hình lăng trụ và hình hộp.',
  intro:
    'Các tầng của một toà nhà, các ngăn của một giá sách là hình ảnh của những mặt phẳng song song. Bài này cho biết khi nào hai mặt phẳng song song, một mặt phẳng thứ ba cắt chúng thế nào, và vì sao các mặt phẳng song song chia mọi đường thẳng cắt chúng theo cùng một tỉ lệ.',
  objectives: [
    'Nêu định nghĩa và điều kiện để hai mặt phẳng song song.',
    'Vận dụng các tính chất: mặt phẳng song song qua một điểm, giao tuyến với mặt phẳng thứ ba.',
    'Vận dụng định lí Thalès trong không gian để tính độ dài.',
    'Nhận biết hình lăng trụ, hình hộp và các tính chất của chúng.',
  ],
  sections: [
    {
      heading: 'Hai mặt phẳng song song',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Hai mặt phẳng $(P)$ và $(Q)$ gọi là song song với nhau nếu chúng không có điểm chung. Kí hiệu $(P) \\parallel (Q)$.',
        },
        {
          type: 'p',
          text: 'Nhận xét: nếu $(P) \\parallel (Q)$ thì mọi đường thẳng $d$ nằm trong $(P)$ đều song song với $(Q)$, vì $d$ không có điểm chung với $(Q)$.',
        },
      ],
    },
    {
      heading: 'Điều kiện và tính chất',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 1 (điều kiện song song)',
          text: 'Nếu mặt phẳng $(P)$ chứa hai đường thẳng cắt nhau $a$, $b$ và $a$, $b$ cùng song song với mặt phẳng $(Q)$ thì $(P)$ song song với $(Q)$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 2',
          text: 'Qua một điểm nằm ngoài một mặt phẳng, có một và chỉ một mặt phẳng song song với mặt phẳng đó.',
        },
        {
          type: 'list',
          items: [
            'Hệ quả: nếu đường thẳng $a$ song song với mặt phẳng $(Q)$ thì có duy nhất một mặt phẳng $(P)$ chứa $a$ và song song với $(Q)$.',
            'Hệ quả: hai mặt phẳng phân biệt cùng song song với mặt phẳng thứ ba thì song song với nhau.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 3',
          text: 'Cho hai mặt phẳng song song. Nếu một mặt phẳng cắt mặt phẳng này thì cũng cắt mặt phẳng kia, và hai giao tuyến song song với nhau.',
        },
      ],
    },
    {
      heading: 'Định lí Thalès trong không gian',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí Thalès',
          text: 'Ba mặt phẳng đôi một song song chắn trên hai cát tuyến phân biệt bất kì những đoạn thẳng tương ứng tỉ lệ.',
        },
        {
          type: 'p',
          text: "Nếu ba mặt phẳng song song $(P)$, $(Q)$, $(R)$ cắt cát tuyến $a$ lần lượt tại $A$, $B$, $C$ và cắt cát tuyến $a'$ lần lượt tại $A'$, $B'$, $C'$ thì",
        },
        { type: 'tex', tex: "\\dfrac{AB}{A'B'} = \\dfrac{BC}{B'C'} = \\dfrac{CA}{C'A'}" },
      ],
    },
    {
      heading: 'Hình lăng trụ và hình hộp',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình lăng trụ',
          text: "Cho hai mặt phẳng song song $(P)$, $(P')$ và đa giác lồi $A_1A_2\\ldots A_n$ nằm trong $(P)$. Qua các đỉnh $A_1, A_2, \\ldots, A_n$ vẽ các đường thẳng song song với nhau, cắt $(P')$ lần lượt tại $A_1', A_2', \\ldots, A_n'$. Hình gồm hai đa giác $A_1A_2\\ldots A_n$, $A_1'A_2'\\ldots A_n'$ và các hình bình hành $A_1A_2A_2'A_1'$, …, $A_nA_1A_1'A_n'$ gọi là hình lăng trụ, kí hiệu $A_1A_2\\ldots A_n.A_1'A_2'\\ldots A_n'$.",
        },
        {
          type: 'list',
          items: [
            "Hai đa giác $A_1\\ldots A_n$ và $A_1'\\ldots A_n'$ là hai mặt đáy; chúng bằng nhau và nằm trên hai mặt phẳng song song.",
            "Các cạnh bên $A_1A_1'$, …, $A_nA_n'$ song song và bằng nhau; các mặt bên là các hình bình hành.",
            'Gọi tên theo đáy: hình lăng trụ tam giác, hình lăng trụ tứ giác, … Hình lăng trụ $n$-giác có $n + 2$ mặt, $3n$ cạnh, $2n$ đỉnh.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình hộp',
          text: 'Hình lăng trụ có đáy là hình bình hành gọi là hình hộp.',
        },
        {
          type: 'list',
          items: [
            'Sáu mặt của hình hộp đều là hình bình hành; hai mặt không có đỉnh chung là hai mặt đối diện, chúng song song với nhau.',
            "Hai đỉnh không cùng thuộc một mặt là hai đỉnh đối diện; đoạn nối chúng là đường chéo. Hình hộp $ABCD.A'B'C'D'$ có bốn đường chéo $AC'$, $BD'$, $CA'$, $DB'$; chúng cắt nhau tại trung điểm của mỗi đường.",
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Mặt cắt song song trượt trong hình hộp',
    instruction:
      "Kéo thanh trượt để dời mặt phẳng $(\\alpha)$ song song với hai đáy dọc theo các cạnh bên. Quan sát thiết diện $MNPQ$ và hai tỉ số $\\dfrac{AM}{AA'}$, $\\dfrac{AK}{AC'}$. Kéo hoặc dùng phím mũi tên để xoay hình hộp.",
  },
  examples: [
    {
      problem: "Cho hình hộp $ABCD.A'B'C'D'$. Chứng minh $(BDC') \\parallel (B'D'A)$.",
      steps: [
        "$BB'D'D$ là hình bình hành ($BB' \\parallel DD'$, $BB' = DD'$) nên $BD \\parallel B'D'$; do đó $BD \\parallel (B'D'A)$.",
        "$ABC'D'$ là hình bình hành ($AB \\parallel C'D'$, $AB = C'D'$) nên $BC' \\parallel AD'$; do đó $BC' \\parallel (B'D'A)$.",
        "$BD$ và $BC'$ cắt nhau tại $B$ và cùng nằm trong $(BDC')$.",
        "Theo Định lí 1, $(BDC') \\parallel (B'D'A)$.",
      ],
      answer: "$(BDC') \\parallel (B'D'A)$.",
    },
    {
      problem:
        "Ba mặt phẳng đôi một song song $(P)$, $(Q)$, $(R)$ cắt đường thẳng $a$ tại $A$, $B$, $C$ và cắt đường thẳng $a'$ tại $A'$, $B'$, $C'$. Biết $AB = 2$ cm, $BC = 3$ cm, $A'B' = 4$ cm. Tính $B'C'$ và $A'C'$.",
      steps: [
        "Theo định lí Thalès: $\\dfrac{AB}{A'B'} = \\dfrac{BC}{B'C'}$, tức là $\\dfrac{2}{4} = \\dfrac{3}{B'C'}$.",
        "$B'C' = \\dfrac{3 \\cdot 4}{2} = 6$ cm.",
        "$A'C' = A'B' + B'C' = 4 + 6 = 10$ cm.",
      ],
      answer: "$B'C' = 6$ cm, $A'C' = 10$ cm.",
    },
    {
      problem:
        "Cho hình lăng trụ tam giác $ABC.A'B'C'$, $M$ là trung điểm của $AB$. Mặt phẳng $(MA'C')$ cắt cạnh $BC$ tại $N$. Chứng minh $N$ là trung điểm của $BC$.",
      steps: [
        "$(ABC) \\parallel (A'B'C')$ và mặt phẳng $(MA'C')$ cắt $(A'B'C')$ theo giao tuyến $A'C'$.",
        "Theo Định lí 3, $(MA'C')$ cắt $(ABC)$ theo giao tuyến qua $M$ song song với $A'C'$, tức là $MN \\parallel A'C' \\parallel AC$.",
        'Trong tam giác $ABC$, $M$ là trung điểm $AB$ và $MN \\parallel AC$.',
      ],
      answer: '$N$ là trung điểm của $BC$ (đường trung bình của tam giác $ABC$).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Điều kiện nào dưới đây đủ để mặt phẳng $(P)$ song song với mặt phẳng $(Q)$?',
      options: [
        '$(P)$ chứa hai đường thẳng cắt nhau cùng song song với $(Q)$',
        '$(P)$ chứa một đường thẳng song song với $(Q)$',
        '$(P)$ chứa hai đường thẳng song song cùng song song với $(Q)$',
        '$(P)$ và $(Q)$ cùng song song với một đường thẳng',
      ],
      answer: 0,
      hints: ['Hai đường thẳng trong $(P)$ phải cắt nhau thì mới đủ.'],
      solution:
        'Theo Định lí 1, $(P)$ chứa hai đường thẳng cắt nhau cùng song song với $(Q)$ thì $(P) \\parallel (Q)$. Các điều kiện còn lại vẫn có thể xảy ra khi $(P)$ cắt $(Q)$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho $(P) \\parallel (Q)$, đường thẳng $a \\subset (P)$ và đường thẳng $b \\subset (Q)$. Khi đó $a$ và $b$',
      options: ['song song hoặc chéo nhau', 'luôn song song', 'luôn chéo nhau', 'có thể cắt nhau'],
      answer: 0,
      hints: ['$(P)$ và $(Q)$ không có điểm chung, nên $a$ và $b$ có điểm chung không?'],
      solution:
        '$a$ và $b$ không có điểm chung nên chúng song song hoặc chéo nhau; cả hai trường hợp đều xảy ra.',
    },
    {
      type: 'number',
      prompt:
        "Ba mặt phẳng đôi một song song cắt đường thẳng $a$ tại $A$, $B$, $C$ và cắt đường thẳng $a'$ tại $A'$, $B'$, $C'$. Biết $AB = 3$ cm, $BC = 5$ cm, $A'B' = 4{,}5$ cm. Tính $B'C'$.",
      answer: 7.5,
      unit: 'cm',
      hints: ["Định lí Thalès: $\\dfrac{AB}{A'B'} = \\dfrac{BC}{B'C'}$."],
      solution: "$B'C' = \\dfrac{BC \\cdot A'B'}{AB} = \\dfrac{5 \\cdot 4{,}5}{3} = 7{,}5$ cm.",
    },
    {
      type: 'number',
      prompt:
        "Ba mặt phẳng đôi một song song cắt đường thẳng $a$ tại $A$, $B$, $C$ ($B$ nằm giữa $A$ và $C$) và cắt đường thẳng $a'$ tại $A'$, $B'$, $C'$. Biết $AB = 2$ cm, $AC = 5$ cm, $A'C' = 7{,}5$ cm. Tính $A'B'$.",
      answer: 3,
      unit: 'cm',
      hints: ["Dùng $\\dfrac{AB}{A'B'} = \\dfrac{CA}{C'A'}$."],
      solution: "$A'B' = \\dfrac{AB \\cdot A'C'}{AC} = \\dfrac{2 \\cdot 7{,}5}{5} = 3$ cm.",
    },
    {
      type: 'choice',
      prompt: 'Các mặt bên của một hình lăng trụ là',
      options: ['các hình bình hành', 'các hình chữ nhật', 'các hình thang cân', 'các tam giác'],
      answer: 0,
      hints: ['Mỗi mặt bên có hai cạnh bên song song và bằng nhau.'],
      solution:
        'Hai cạnh bên của một mặt bên song song và bằng nhau, nên mỗi mặt bên là hình bình hành. Chỉ ở hình lăng trụ đứng (học sau) các mặt bên mới là hình chữ nhật.',
    },
    {
      type: 'number',
      prompt: 'Một hình lăng trụ có $15$ cạnh. Hình lăng trụ đó có bao nhiêu mặt?',
      answer: 7,
      hints: [
        'Hình lăng trụ $n$-giác có $3n$ cạnh.',
        'Từ $3n = 15$ tìm $n$, rồi dùng số mặt $n + 2$.',
      ],
      solution:
        '$3n = 15$ nên $n = 5$: lăng trụ ngũ giác, có $5$ mặt bên và $2$ mặt đáy, tổng cộng $7$ mặt.',
    },
    {
      type: 'number',
      prompt:
        "Hình hộp $ABCD.A'B'C'D'$ có đường chéo $AC' = 10$ cm. Gọi $O$ là giao điểm của bốn đường chéo. Tính $AO$.",
      answer: 5,
      unit: 'cm',
      hints: ['Bốn đường chéo của hình hộp cắt nhau tại trung điểm của mỗi đường.'],
      solution: "$O$ là trung điểm của $AC'$ nên $AO = \\dfrac{AC'}{2} = 5$ cm.",
    },
    {
      type: 'choice',
      prompt:
        "Cho hình hộp $ABCD.A'B'C'D'$. Mặt phẳng $(ACC'A')$ cắt hai mặt đáy theo hai giao tuyến $AC$ và $A'C'$. Hai giao tuyến này",
      options: ['song song với nhau', 'cắt nhau', 'chéo nhau', 'trùng nhau'],
      answer: 0,
      hints: ['Hai mặt đáy của hình hộp song song. Áp dụng Định lí 3.'],
      solution:
        "$(ABCD) \\parallel (A'B'C'D')$; mặt phẳng $(ACC'A')$ cắt cả hai nên theo Định lí 3, hai giao tuyến $AC$ và $A'C'$ song song.",
    },
  ],
  takeaways: [
    'Hai mặt phẳng song song khi không có điểm chung; để chứng minh, chỉ ra một mặt phẳng chứa hai đường thẳng cắt nhau cùng song song với mặt phẳng kia.',
    'Qua một điểm ngoài $(Q)$ có đúng một mặt phẳng song song với $(Q)$.',
    'Một mặt phẳng cắt hai mặt phẳng song song theo hai giao tuyến song song.',
    'Định lí Thalès: ba mặt phẳng song song chắn trên hai cát tuyến các đoạn thẳng tương ứng tỉ lệ.',
    'Hình lăng trụ có các cạnh bên song song và bằng nhau, mặt bên là hình bình hành; hình hộp là lăng trụ có đáy là hình bình hành.',
  ],
};
