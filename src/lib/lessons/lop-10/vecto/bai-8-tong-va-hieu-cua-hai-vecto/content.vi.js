/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tổng hai vectơ theo quy tắc ba điểm và quy tắc hình bình hành, tính chất của phép cộng, vectơ đối, hiệu hai vectơ và hợp lực.',
  intro:
    'Một chiếc phà rời bến, máy đẩy phà đi thẳng sang bờ bên kia, nhưng dòng nước lại đẩy phà trôi xuôi. Phà thực sự đi theo hướng nào? Câu trả lời là "cộng" hai vectơ vận tốc. Bài này cho em cách cộng và trừ hai vectơ.',
  objectives: [
    'Xác định tổng hai vectơ theo quy tắc ba điểm và quy tắc hình bình hành.',
    'Nắm các tính chất của phép cộng vectơ.',
    'Xác định vectơ đối và hiệu hai vectơ, dùng quy tắc hiệu.',
    'Dùng tổng vectơ để tìm hợp lực.',
  ],
  sections: [
    {
      heading: 'Tổng của hai vectơ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tổng hai vectơ',
          text: 'Cho hai vectơ $\\vec a$ và $\\vec b$. Lấy một điểm $A$ tuỳ ý, vẽ $\\overrightarrow{AB} = \\vec a$ và $\\overrightarrow{BC} = \\vec b$. Vectơ $\\overrightarrow{AC}$ được gọi là tổng của hai vectơ $\\vec a$ và $\\vec b$, kí hiệu $\\vec a + \\vec b$. Phép lấy tổng hai vectơ gọi là phép cộng vectơ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc ba điểm',
          text: 'Với ba điểm bất kì $A$, $B$, $C$, ta có $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$.',
        },
        {
          type: 'p',
          text: 'Mẹo nhớ: điểm cuối của vectơ thứ nhất là điểm đầu của vectơ thứ hai, thì tổng "nối" điểm đầu của vectơ thứ nhất với điểm cuối của vectơ thứ hai. Quy tắc mở rộng cho nhiều điểm: $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD} = \\overrightarrow{AD}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc hình bình hành',
          text: 'Nếu $ABCD$ là hình bình hành thì $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$.',
        },
        {
          type: 'p',
          text: 'Thật vậy, $\\overrightarrow{AD} = \\overrightarrow{BC}$ nên $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$. Quy tắc hình bình hành dùng khi hai vectơ có chung điểm đầu: tổng là đường chéo xuất phát từ điểm đầu chung đó.',
        },
      ],
    },
    {
      heading: 'Tính chất của phép cộng vectơ',
      blocks: [
        {
          type: 'p',
          text: 'Với ba vectơ $\\vec a$, $\\vec b$, $\\vec c$ tuỳ ý:',
        },
        {
          type: 'table',
          head: ['Tính chất', 'Biểu thức'],
          rows: [
            ['Giao hoán', '$\\vec a + \\vec b = \\vec b + \\vec a$'],
            ['Kết hợp', '$(\\vec a + \\vec b) + \\vec c = \\vec a + (\\vec b + \\vec c)$'],
            ['Cộng với vectơ-không', '$\\vec a + \\vec 0 = \\vec 0 + \\vec a = \\vec a$'],
          ],
        },
        {
          type: 'p',
          text: 'Nhờ tính chất kết hợp, ta viết gọn $\\vec a + \\vec b + \\vec c$ mà không cần dấu ngoặc.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hợp lực',
          text: 'Hai lực $\\vec F_1$, $\\vec F_2$ cùng tác dụng vào một vật có tác dụng như một lực duy nhất $\\vec F = \\vec F_1 + \\vec F_2$, gọi là hợp lực. Khi hai lực có chung điểm đặt, hợp lực là đường chéo của hình bình hành dựng trên hai lực đó.',
        },
      ],
    },
    {
      heading: 'Vectơ đối và hiệu của hai vectơ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vectơ đối',
          text: 'Vectơ có cùng độ dài và ngược hướng với vectơ $\\vec a$ được gọi là vectơ đối của $\\vec a$, kí hiệu $-\\vec a$. Vectơ đối của $\\vec 0$ là $\\vec 0$.',
        },
        {
          type: 'list',
          items: [
            'Vectơ đối của $\\overrightarrow{AB}$ là $\\overrightarrow{BA}$: $-\\overrightarrow{AB} = \\overrightarrow{BA}$.',
            '$\\vec a + (-\\vec a) = (-\\vec a) + \\vec a = \\vec 0$.',
            'Điểm $I$ là trung điểm của đoạn thẳng $AB$ khi và chỉ khi $\\overrightarrow{IA} + \\overrightarrow{IB} = \\vec 0$.',
            'Điểm $G$ là trọng tâm của tam giác $ABC$ khi và chỉ khi $\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = \\vec 0$.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hiệu hai vectơ',
          text: 'Hiệu của hai vectơ $\\vec a$ và $\\vec b$, kí hiệu $\\vec a - \\vec b$, là tổng của $\\vec a$ với vectơ đối của $\\vec b$: $\\vec a - \\vec b = \\vec a + (-\\vec b)$. Phép lấy hiệu hai vectơ gọi là phép trừ vectơ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc hiệu',
          text: 'Với ba điểm bất kì $O$, $A$, $B$, ta có $\\overrightarrow{OA} - \\overrightarrow{OB} = \\overrightarrow{BA}$.',
        },
        {
          type: 'p',
          text: 'Hai vectơ có chung điểm đầu $O$ thì hiệu của chúng là vectơ nối điểm cuối của vectơ trừ ($B$) đến điểm cuối của vectơ bị trừ ($A$). Chứng minh: $\\overrightarrow{OA} - \\overrightarrow{OB} = \\overrightarrow{OA} + \\overrightarrow{BO} = \\overrightarrow{BO} + \\overrightarrow{OA} = \\overrightarrow{BA}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cộng, trừ vectơ trên lưới',
    instruction:
      'Chọn một quy tắc rồi kéo các điểm (hoặc chọn một điểm và dùng phím mũi tên). Ở quy tắc ba điểm, thử kéo $B$ đi nơi khác: $\\overrightarrow{AC}$ không đổi. Ở chế độ hợp lực, mỗi ô lưới ứng với $10$ N.',
  },
  examples: [
    {
      problem:
        'Cho bốn điểm $A$, $B$, $C$, $D$ bất kì. Chứng minh rằng $\\overrightarrow{AB} + \\overrightarrow{CD} = \\overrightarrow{AD} + \\overrightarrow{CB}$.',
      steps: [
        'Theo quy tắc ba điểm, chèn điểm $D$ vào $\\overrightarrow{AB}$: $\\overrightarrow{AB} = \\overrightarrow{AD} + \\overrightarrow{DB}$.',
        'Khi đó $\\overrightarrow{AB} + \\overrightarrow{CD} = \\overrightarrow{AD} + \\overrightarrow{DB} + \\overrightarrow{CD} = \\overrightarrow{AD} + (\\overrightarrow{CD} + \\overrightarrow{DB})$ (giao hoán và kết hợp).',
        'Lại theo quy tắc ba điểm, $\\overrightarrow{CD} + \\overrightarrow{DB} = \\overrightarrow{CB}$.',
      ],
      answer:
        '$\\overrightarrow{AB} + \\overrightarrow{CD} = \\overrightarrow{AD} + \\overrightarrow{CB}$.',
    },
    {
      problem:
        'Cho tam giác đều $ABC$ cạnh $a$. Tính độ dài của các vectơ $\\overrightarrow{AB} + \\overrightarrow{AC}$ và $\\overrightarrow{AB} - \\overrightarrow{AC}$.',
      steps: [
        'Vẽ điểm $D$ sao cho $ABDC$ là hình bình hành (ở đây là hình thoi vì $AB = AC$). Theo quy tắc hình bình hành, $\\overrightarrow{AB} + \\overrightarrow{AC} = \\overrightarrow{AD}$.',
        'Hai đường chéo của hình thoi cắt nhau tại trung điểm $M$ của $BC$ và $AD = 2AM$. Trong tam giác đều, $AM = \\dfrac{a\\sqrt{3}}{2}$, nên $AD = a\\sqrt{3}$.',
        'Theo quy tắc hiệu, $\\overrightarrow{AB} - \\overrightarrow{AC} = \\overrightarrow{CB}$, nên độ dài là $CB = a$.',
      ],
      answer:
        '$|\\overrightarrow{AB} + \\overrightarrow{AC}| = a\\sqrt{3}$, $|\\overrightarrow{AB} - \\overrightarrow{AC}| = a$.',
    },
    {
      problem:
        'Hai lực $\\vec F_1$, $\\vec F_2$ cùng tác dụng vào một vật tại điểm $O$, có độ lớn $30$ N và $40$ N và vuông góc với nhau. Tính độ lớn của hợp lực.',
      steps: [
        'Vẽ $\\overrightarrow{OA} = \\vec F_1$, $\\overrightarrow{OB} = \\vec F_2$ và dựng hình bình hành $OACB$; vì $OA \\perp OB$ nên đó là hình chữ nhật.',
        'Hợp lực $\\vec F = \\vec F_1 + \\vec F_2 = \\overrightarrow{OC}$.',
        '$OC = \\sqrt{OA^2 + AC^2} = \\sqrt{30^2 + 40^2} = \\sqrt{2\\,500} = 50$.',
      ],
      answer: 'Hợp lực có độ lớn $50$ N.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Với ba điểm bất kì $M$, $N$, $P$, vectơ $\\overrightarrow{MN} + \\overrightarrow{NP}$ bằng',
      options: [
        '$\\overrightarrow{MP}$',
        '$\\overrightarrow{PM}$',
        '$\\overrightarrow{NM}$',
        '$\\vec 0$',
      ],
      answer: 0,
      hints: [
        'Điểm cuối của vectơ thứ nhất trùng điểm đầu của vectơ thứ hai: dùng quy tắc ba điểm.',
      ],
      solution:
        'Theo quy tắc ba điểm, $\\overrightarrow{MN} + \\overrightarrow{NP} = \\overrightarrow{MP}$.',
    },
    {
      type: 'choice',
      prompt: 'Cho hình bình hành $ABCD$. Vectơ $\\overrightarrow{AB} + \\overrightarrow{AD}$ bằng',
      options: [
        '$\\overrightarrow{AC}$',
        '$\\overrightarrow{BD}$',
        '$\\overrightarrow{DB}$',
        '$\\overrightarrow{CA}$',
      ],
      answer: 0,
      hints: ['Hai vectơ có chung điểm đầu $A$: dùng quy tắc hình bình hành.'],
      solution:
        'Theo quy tắc hình bình hành, tổng là đường chéo xuất phát từ $A$: $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$.',
    },
    {
      type: 'choice',
      prompt:
        'Với ba điểm bất kì $O$, $A$, $B$, vectơ $\\overrightarrow{OA} - \\overrightarrow{OB}$ bằng',
      options: [
        '$\\overrightarrow{BA}$',
        '$\\overrightarrow{AB}$',
        '$\\overrightarrow{OB}$',
        '$\\overrightarrow{BO}$',
      ],
      answer: 0,
      hints: [
        'Quy tắc hiệu: hai vectơ chung điểm đầu, hiệu nối điểm cuối của vectơ trừ đến điểm cuối của vectơ bị trừ.',
      ],
      solution:
        '$\\overrightarrow{OA} - \\overrightarrow{OB} = \\overrightarrow{OA} + \\overrightarrow{BO} = \\overrightarrow{BO} + \\overrightarrow{OA} = \\overrightarrow{BA}$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tổng (hiệu) với vectơ bằng nó.',
      left: [
        '$\\overrightarrow{AB} + \\overrightarrow{BC}$',
        '$\\overrightarrow{AB} - \\overrightarrow{AC}$',
        '$\\overrightarrow{AB} + \\overrightarrow{BA}$',
        '$\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD}$',
      ],
      right: [
        '$\\overrightarrow{AC}$',
        '$\\overrightarrow{CB}$',
        '$\\vec 0$',
        '$\\overrightarrow{AD}$',
        '$\\overrightarrow{BC}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Tổng: dùng quy tắc ba điểm (nối liên tiếp). Hiệu của hai vectơ chung điểm đầu: dùng quy tắc hiệu.',
      ],
      solution:
        '$\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$; $\\overrightarrow{AB} - \\overrightarrow{AC} = \\overrightarrow{CB}$; $\\overrightarrow{AB} + \\overrightarrow{BA} = \\overrightarrow{AA} = \\vec 0$; $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD} = \\overrightarrow{AC} + \\overrightarrow{CD} = \\overrightarrow{AD}$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hình vuông $ABCD$ cạnh $1$. Tính $|\\overrightarrow{AB} + \\overrightarrow{AD}|$ (làm tròn đến hàng phần trăm).',
      answer: 1.41,
      tolerance: 0.01,
      hints: [
        'Dùng quy tắc hình bình hành để đưa tổng về một vectơ.',
        'Tổng bằng $\\overrightarrow{AC}$; tính đường chéo của hình vuông.',
      ],
      solution:
        '$\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$, nên $|\\overrightarrow{AB} + \\overrightarrow{AD}| = AC = \\sqrt{1^2 + 1^2} = \\sqrt{2} \\approx 1{,}41$.',
    },
    {
      type: 'number',
      prompt:
        'Cho tam giác $ABC$ vuông tại $A$ có $AB = 6$, $AC = 8$. Tính $|\\overrightarrow{AB} - \\overrightarrow{AC}|$.',
      answer: 10,
      hints: [
        'Dùng quy tắc hiệu cho hai vectơ chung điểm đầu $A$.',
        'Hiệu bằng $\\overrightarrow{CB}$.',
      ],
      solution:
        '$\\overrightarrow{AB} - \\overrightarrow{AC} = \\overrightarrow{CB}$, nên độ dài cần tìm là $BC = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $I$ là trung điểm của đoạn thẳng $AB$. Đẳng thức nào đúng?',
      options: [
        '$\\overrightarrow{IA} + \\overrightarrow{IB} = \\vec 0$',
        '$\\overrightarrow{IA} = \\overrightarrow{IB}$',
        '$\\overrightarrow{IA} - \\overrightarrow{IB} = \\vec 0$',
        '$\\overrightarrow{AI} + \\overrightarrow{IB} = \\vec 0$',
      ],
      answer: 0,
      hints: [
        '$\\overrightarrow{IA}$ và $\\overrightarrow{IB}$ có cùng độ dài; chúng cùng hướng hay ngược hướng?',
      ],
      solution:
        '$IA = IB$ và $\\overrightarrow{IA}$, $\\overrightarrow{IB}$ ngược hướng, nên $\\overrightarrow{IB} = -\\overrightarrow{IA}$, tức là $\\overrightarrow{IA} + \\overrightarrow{IB} = \\vec 0$. Hai vectơ đó không bằng nhau, nên $\\overrightarrow{IA} = \\overrightarrow{IB}$ và $\\overrightarrow{IA} - \\overrightarrow{IB} = \\vec 0$ đều sai; còn $\\overrightarrow{AI} + \\overrightarrow{IB} = \\overrightarrow{AB} \\ne \\vec 0$.',
    },
    {
      type: 'number',
      prompt:
        'Hai lực $\\vec F_1$, $\\vec F_2$ cùng đặt tại một điểm, vuông góc với nhau, có độ lớn $5$ N và $12$ N. Tính độ lớn của hợp lực (theo N).',
      answer: 13,
      unit: 'N',
      hints: [
        'Hợp lực là đường chéo của hình bình hành dựng trên hai lực; ở đây là hình chữ nhật.',
      ],
      solution: '$|\\vec F| = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$ (N).',
    },
    {
      type: 'number',
      prompt:
        'Hai lực cùng phương nhưng ngược hướng, có độ lớn $7$ N và $3$ N, cùng tác dụng vào một vật. Hợp lực có độ lớn bao nhiêu niutơn?',
      answer: 4,
      unit: 'N',
      hints: ['Vẽ hai vectơ ngược hướng nối tiếp nhau theo quy tắc ba điểm.'],
      solution:
        'Đặt $\\overrightarrow{AB} = \\vec F_1$ ($AB = 7$) rồi $\\overrightarrow{BC} = \\vec F_2$ đi ngược lại $3$ đơn vị: $C$ nằm trên đoạn $AB$, $AC = 7 - 3 = 4$. Hợp lực có độ lớn $4$ N, cùng hướng với lực $7$ N.',
    },
    {
      type: 'choice',
      prompt:
        'Cho tam giác $ABC$ có trọng tâm $G$. Vectơ $\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC}$ bằng',
      options: [
        '$\\vec 0$',
        '$\\overrightarrow{AG}$',
        '$3\\overrightarrow{GA}$',
        '$\\overrightarrow{BC}$',
      ],
      answer: 0,
      hints: [
        'Gọi $M$ là trung điểm $BC$; $\\overrightarrow{GB} + \\overrightarrow{GC}$ là đường chéo của hình bình hành dựng trên $GB$, $GC$.',
      ],
      solution:
        'Gọi $D$ là điểm đối xứng với $G$ qua trung điểm $M$ của $BC$, thì $GBDC$ là hình bình hành và $\\overrightarrow{GB} + \\overrightarrow{GC} = \\overrightarrow{GD}$, $GD = 2GM = AG$. Vectơ $\\overrightarrow{GD}$ ngược hướng với $\\overrightarrow{GA}$ và cùng độ dài, nên $\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = \\overrightarrow{GA} + \\overrightarrow{GD} = \\vec 0$.',
    },
  ],
  takeaways: [
    'Quy tắc ba điểm: $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$.',
    'Quy tắc hình bình hành: $ABCD$ là hình bình hành thì $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$.',
    'Phép cộng vectơ có tính giao hoán, kết hợp và $\\vec a + \\vec 0 = \\vec a$.',
    'Vectơ đối: $-\\overrightarrow{AB} = \\overrightarrow{BA}$; $\\vec a - \\vec b = \\vec a + (-\\vec b)$.',
    'Quy tắc hiệu: $\\overrightarrow{OA} - \\overrightarrow{OB} = \\overrightarrow{BA}$.',
    '$I$ trung điểm $AB$: $\\overrightarrow{IA} + \\overrightarrow{IB} = \\vec 0$; $G$ trọng tâm tam giác $ABC$: $\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = \\vec 0$.',
  ],
};
