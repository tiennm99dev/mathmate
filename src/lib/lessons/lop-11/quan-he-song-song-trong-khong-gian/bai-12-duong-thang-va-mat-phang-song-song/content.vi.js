/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vị trí tương đối của đường thẳng và mặt phẳng, điều kiện để đường thẳng song song với mặt phẳng và tính chất giao tuyến của mặt phẳng chứa đường thẳng song song.',
  intro:
    'Thanh xà ngang của khung thành song song với mặt sân, còn cột dọc thì cắt mặt sân. Làm sao khẳng định một đường thẳng song song với một mặt phẳng mà không phải kiểm tra từng điểm? Chỉ cần tìm trong mặt phẳng một đường thẳng song song với nó.',
  objectives: [
    'Nhận biết ba vị trí tương đối của đường thẳng và mặt phẳng.',
    'Chứng minh đường thẳng song song với mặt phẳng bằng điều kiện của Định lí 1.',
    'Dùng Định lí 2 và hệ quả để tìm giao tuyến song song, dựng thiết diện.',
  ],
  sections: [
    {
      heading: 'Vị trí tương đối của đường thẳng và mặt phẳng',
      blocks: [
        { type: 'p', text: 'Cho đường thẳng $d$ và mặt phẳng $(P)$. Xét số điểm chung của chúng:' },
        {
          type: 'table',
          head: ['Số điểm chung', 'Vị trí', 'Kí hiệu'],
          rows: [
            ['Từ hai điểm trở lên (vô số)', '$d$ nằm trong $(P)$', '$d \\subset (P)$'],
            ['Đúng một điểm $M$', '$d$ cắt $(P)$ tại $M$', '$d \\cap (P) = \\{M\\}$'],
            ['Không có', '$d$ song song với $(P)$', '$d \\parallel (P)$'],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường thẳng song song với mặt phẳng',
          text: 'Đường thẳng $d$ và mặt phẳng $(P)$ gọi là song song với nhau nếu chúng không có điểm chung. Kí hiệu $d \\parallel (P)$ hoặc $(P) \\parallel d$.',
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
          text: "Nếu đường thẳng $a$ không nằm trong mặt phẳng $(P)$ và song song với một đường thẳng $a'$ nằm trong $(P)$ thì $a$ song song với $(P)$.",
        },
        {
          type: 'tex',
          tex: "a \\not\\subset (P),\\ a \\parallel a',\\ a' \\subset (P) \\Rightarrow a \\parallel (P)",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 2 (tính chất giao tuyến)',
          text: 'Cho đường thẳng $a$ song song với mặt phẳng $(P)$. Nếu mặt phẳng $(Q)$ chứa $a$ và cắt $(P)$ theo giao tuyến $b$ thì $b$ song song với $a$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hệ quả',
          text: 'Nếu hai mặt phẳng cắt nhau cùng song song với một đường thẳng thì giao tuyến của chúng cũng song song với đường thẳng đó.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dùng Định lí 2 để tìm giao tuyến',
          text: 'Khi $a \\parallel (P)$, mặt phẳng $(Q)$ chứa $a$ và có điểm chung $M$ với $(P)$ thì giao tuyến của $(Q)$ và $(P)$ là đường thẳng qua $M$ song song với $a$. Đây là cách thường dùng để dựng thiết diện (phần chung của một hình chóp với một mặt phẳng cắt nó).',
        },
      ],
    },
  ],
  explore: {
    title: 'Khi nào đường thẳng song song với mặt phẳng?',
    instruction:
      'Chỉnh độ cao của hai điểm $A$, $B$ và hướng của đường thẳng $a$. Mặt phẳng $(P)$ chuyển sang màu xanh lá khi $a \\parallel (P)$. Khi đó, hãy xoay mặt phẳng $(Q)$ quanh $a$ và quan sát giao tuyến $b$. Kéo hoặc dùng phím mũi tên để xoay hình.',
  },
  examples: [
    {
      problem:
        'Cho tứ diện $ABCD$. Gọi $M$, $N$ lần lượt là trung điểm của $AB$, $AC$. Chứng minh $MN \\parallel (BCD)$.',
      steps: [
        '$MN$ là đường trung bình của tam giác $ABC$ nên $MN \\parallel BC$.',
        '$BC \\subset (BCD)$.',
        '$MN$ không nằm trong $(BCD)$ vì $M \\notin (BCD)$.',
        'Theo Định lí 1, $MN \\parallel (BCD)$.',
      ],
      answer: '$MN \\parallel (BCD)$.',
    },
    {
      problem:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành tâm $O$, $M$ là trung điểm của $SC$. Chứng minh $SA \\parallel (MBD)$.',
      steps: [
        '$O$ là trung điểm $AC$, $M$ là trung điểm $SC$, nên $OM$ là đường trung bình của tam giác $SAC$: $OM \\parallel SA$.',
        '$OM \\subset (MBD)$ vì $O \\in BD$.',
        '$SA$ không nằm trong $(MBD)$ vì $S \\notin (MBD)$.',
      ],
      answer: 'Theo Định lí 1, $SA \\parallel (MBD)$.',
    },
    {
      problem:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành, $M$ là một điểm trên cạnh $SA$ ($M$ khác $S$, $A$). Tìm giao tuyến của $(MCD)$ và $(SAB)$, từ đó xác định thiết diện của hình chóp cắt bởi $(MCD)$.',
      steps: [
        '$CD \\parallel AB$ và $AB \\subset (SAB)$, nên $CD \\parallel (SAB)$.',
        '$(MCD)$ chứa $CD$ và có điểm chung $M$ với $(SAB)$.',
        'Theo Định lí 2, giao tuyến là đường thẳng qua $M$ song song với $CD$ (và $AB$); nó cắt $SB$ tại $N$.',
        'Thiết diện là tứ giác $MNCD$ có $MN \\parallel CD$.',
      ],
      answer:
        '$(MCD) \\cap (SAB) = MN$ với $MN \\parallel AB$, $N \\in SB$; thiết diện là hình thang $MNCD$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đường thẳng $d$ song song với mặt phẳng $(P)$ khi và chỉ khi',
      options: [
        '$d$ và $(P)$ không có điểm chung',
        '$d$ song song với một đường thẳng nằm trong $(P)$',
        '$d$ và $(P)$ có đúng một điểm chung',
        '$d$ không nằm trong $(P)$',
      ],
      answer: 0,
      hints: ['Đọc lại định nghĩa. Điều kiện của Định lí 1 còn cần thêm $d \\not\\subset (P)$.'],
      solution:
        'Theo định nghĩa, $d \\parallel (P)$ khi chúng không có điểm chung. Song song với một đường thẳng trong $(P)$ thì $d$ vẫn có thể nằm trong $(P)$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $a \\parallel (P)$ và đường thẳng $b \\subset (P)$. Khi đó $a$ và $b$',
      options: ['song song hoặc chéo nhau', 'luôn song song', 'luôn chéo nhau', 'có thể cắt nhau'],
      answer: 0,
      hints: ['$a$ không có điểm chung với $(P)$, nên không có điểm chung với $b$.'],
      solution:
        '$a$ và $b$ không có điểm chung nên chúng song song hoặc chéo nhau; cả hai trường hợp đều xảy ra, tuỳ theo hướng của $b$ trong $(P)$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho tứ diện $ABCD$, $M$ và $N$ lần lượt là trung điểm của $AB$ và $AC$. Đường thẳng $MN$ song song với mặt phẳng nào?',
      options: ['$(BCD)$', '$(ABD)$', '$(ACD)$', '$(ABC)$'],
      answer: 0,
      hints: ['$MN$ song song với cạnh nào của tam giác $ABC$?'],
      solution:
        '$MN \\parallel BC \\subset (BCD)$ và $MN \\not\\subset (BCD)$ nên $MN \\parallel (BCD)$. $MN$ cắt $(ABD)$ tại $M$, cắt $(ACD)$ tại $N$ và nằm trong $(ABC)$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành. Đường thẳng $AB$ song song với mặt phẳng nào?',
      options: ['$(SCD)$', '$(SAD)$', '$(SBC)$', '$(SAC)$'],
      answer: 0,
      hints: ['Tìm một mặt phẳng chứa đường thẳng song song với $AB$ mà không chứa $AB$.'],
      solution:
        '$AB \\parallel CD$, $CD \\subset (SCD)$ và $AB \\not\\subset (SCD)$, nên $AB \\parallel (SCD)$. Ba mặt phẳng còn lại đều có điểm chung với $AB$ ($A$ hoặc $B$).',
    },
    {
      type: 'number',
      prompt: "Hình hộp chữ nhật $ABCD.A'B'C'D'$ có bao nhiêu mặt song song với đường thẳng $AB$?",
      answer: 2,
      hints: [
        'Loại các mặt chứa $AB$ và các mặt có điểm chung với $AB$.',
        "Mặt $(ABCD)$ và $(ABB'A')$ chứa $AB$; mặt $(BCC'B')$ và $(ADD'A')$ cắt $AB$.",
      ],
      solution:
        "Hai mặt $(A'B'C'D')$ và $(CDD'C')$ đều chứa $C'D' \\parallel AB$ và không chứa $AB$, nên song song với $AB$. Có $2$ mặt.",
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành, $M$ là điểm trên cạnh $SA$ ($M \\neq S$, $M \\neq A$). Thiết diện của hình chóp cắt bởi mặt phẳng $(MCD)$ là',
      options: ['một hình thang', 'một tam giác', 'một ngũ giác', 'một hình chữ nhật'],
      answer: 0,
      hints: [
        '$CD \\parallel (SAB)$: giao tuyến của $(MCD)$ với $(SAB)$ đi qua $M$ và song song với đường nào?',
      ],
      solution:
        '$(MCD) \\cap (SAB)$ là đường thẳng qua $M$ song song với $CD$, cắt $SB$ tại $N$. Thiết diện $MNCD$ có $MN \\parallel CD$ và $MN < AB = CD$, nên là hình thang.',
    },
    {
      type: 'number',
      prompt:
        'Cho tứ diện $ABCD$ có $BC = 12$ cm. Mặt phẳng $(\\alpha)$ đi qua trung điểm $M$ của $AB$ và song song với $BC$, cắt $AC$ tại $N$. Tính $MN$.',
      answer: 6,
      unit: 'cm',
      hints: [
        '$(\\alpha) \\cap (ABC) = MN$ và $BC \\parallel (\\alpha)$, $BC \\subset (ABC)$: dùng Định lí 2.',
        '$MN \\parallel BC$ với $M$ là trung điểm $AB$.',
      ],
      solution:
        'Theo Định lí 2, $MN \\parallel BC$. Trong tam giác $ABC$, $M$ là trung điểm $AB$ và $MN \\parallel BC$ nên $N$ là trung điểm $AC$, $MN = \\dfrac{1}{2}BC = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Cho tứ diện $ABCD$ có $CD = 9$ cm. Gọi $G_1$, $G_2$ lần lượt là trọng tâm các tam giác $ABC$ và $ABD$. Tính $G_1G_2$.',
      answer: 3,
      unit: 'cm',
      hints: [
        'Gọi $I$ là trung điểm $AB$. Khi đó $G_1 \\in IC$, $G_2 \\in ID$ với $\\dfrac{IG_1}{IC} = \\dfrac{IG_2}{ID} = \\dfrac{1}{3}$.',
        'Áp dụng định lí Thalès đảo trong tam giác $ICD$.',
      ],
      solution:
        'Với $I$ là trung điểm $AB$: $\\dfrac{IG_1}{IC} = \\dfrac{IG_2}{ID} = \\dfrac{1}{3}$ nên $G_1G_2 \\parallel CD$ (do đó $G_1G_2 \\parallel (BCD)$) và $G_1G_2 = \\dfrac{1}{3}CD = 3$ cm.',
    },
  ],
  takeaways: [
    'Đường thẳng và mặt phẳng: nằm trong, cắt nhau (một điểm chung) hoặc song song (không có điểm chung).',
    'Để chứng minh $a \\parallel (P)$: chỉ ra $a \\not\\subset (P)$ và $a$ song song với một đường thẳng nằm trong $(P)$.',
    'Nếu $a \\parallel (P)$ thì mọi mặt phẳng chứa $a$ cắt $(P)$ theo giao tuyến song song với $a$.',
    'Hai mặt phẳng cắt nhau cùng song song với một đường thẳng thì giao tuyến của chúng song song với đường thẳng đó.',
  ],
};
