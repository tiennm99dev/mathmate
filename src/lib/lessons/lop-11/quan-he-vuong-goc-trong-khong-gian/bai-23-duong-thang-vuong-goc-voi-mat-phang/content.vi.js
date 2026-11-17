/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đường thẳng vuông góc với mặt phẳng khi nó vuông góc với mọi đường thẳng của mặt phẳng; chỉ cần nó vuông góc với hai đường thẳng cắt nhau trong mặt phẳng. Liên hệ giữa quan hệ song song và quan hệ vuông góc.',
  intro:
    'Khi dựng một cột cờ, làm sao biết cột đã đứng thẳng trên mặt sân? Ta không thể đo góc giữa cột với mọi đường thẳng trên sân. Bài học này cho thấy chỉ cần kiểm tra với hai đường thẳng cắt nhau là đủ.',
  objectives: [
    'Nhận biết đường thẳng vuông góc với mặt phẳng.',
    'Vận dụng điều kiện để đường thẳng vuông góc với mặt phẳng.',
    'Nhận biết mặt phẳng trung trực của một đoạn thẳng.',
    'Vận dụng mối liên hệ giữa quan hệ song song và quan hệ vuông góc.',
  ],
  sections: [
    {
      heading: 'Đường thẳng vuông góc với mặt phẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Đường thẳng $d$ được gọi là vuông góc với mặt phẳng $(P)$ nếu $d$ vuông góc với mọi đường thẳng nằm trong $(P)$. Kí hiệu $d \\perp (P)$ hoặc $(P) \\perp d$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điều kiện để đường thẳng vuông góc với mặt phẳng',
          text: 'Nếu đường thẳng $d$ vuông góc với hai đường thẳng cắt nhau $a$ và $b$ cùng nằm trong mặt phẳng $(P)$ thì $d \\perp (P)$.',
        },
        {
          type: 'tex',
          tex: 'd \\perp a,\\ d \\perp b,\\ a, b \\subset (P),\\ a \\cap b = \\{O\\} \\ \\Rightarrow\\ d \\perp (P)',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hệ quả',
          text: 'Nếu một đường thẳng vuông góc với hai cạnh của một tam giác thì nó cũng vuông góc với cạnh còn lại của tam giác đó.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hai đường thẳng $a$, $b$ phải cắt nhau. Nếu $a \\parallel b$ (hoặc trùng nhau), một đường thẳng nghiêng vẫn có thể vuông góc với cả $a$ và $b$ mà không vuông góc với mặt phẳng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Có duy nhất một mặt phẳng đi qua một điểm cho trước và vuông góc với một đường thẳng cho trước. Có duy nhất một đường thẳng đi qua một điểm cho trước và vuông góc với một mặt phẳng cho trước.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mặt phẳng trung trực',
          text: 'Mặt phẳng đi qua trung điểm của đoạn thẳng $AB$ và vuông góc với $AB$ gọi là mặt phẳng trung trực của đoạn thẳng $AB$. Đó là tập hợp các điểm cách đều $A$ và $B$.',
        },
      ],
    },
    {
      heading: 'Liên hệ giữa quan hệ song song và quan hệ vuông góc',
      blocks: [
        {
          type: 'table',
          caption: 'Ba cặp tính chất (a, b là đường thẳng; (P), (Q) là mặt phẳng)',
          head: ['Tính chất', 'Nói cách khác'],
          rows: [
            [
              'Mặt phẳng nào vuông góc với một trong hai đường thẳng song song thì vuông góc với đường thẳng còn lại.',
              'Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì song song với nhau.',
            ],
            [
              'Đường thẳng nào vuông góc với một trong hai mặt phẳng song song thì vuông góc với mặt phẳng còn lại.',
              'Hai mặt phẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau.',
            ],
            [
              'Cho $a \\parallel (P)$. Đường thẳng nào vuông góc với $(P)$ thì vuông góc với $a$.',
              'Nếu $a$ và $(P)$ (với $a \\not\\subset (P)$) cùng vuông góc với một đường thẳng thì $a \\parallel (P)$.',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Ví dụ: các cột nhà đều dựng vuông góc với mặt sàn nên chúng song song với nhau; mặt sàn và trần nhà cùng vuông góc với một cột nên song song với nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dựng cột cờ trên sân',
    instruction:
      'Nghiêng cột cờ $d$ và xoay đường thẳng $b$ trên sân. Đọc góc giữa $d$ với hai đường thẳng $a$, $b$ và với đường thẳng kiểm tra $c$. Thử đặt $b$ trùng $a$ (góc $0^\\circ$), nghiêng cột về hướng $90^\\circ$: cột vuông góc với $a$, $b$ nhưng vẫn nghiêng. Khi nào thì cột thật sự vuông góc với sân?',
  },
  examples: [
    {
      problem:
        'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông và $SA \\perp (ABCD)$. Chứng minh $BC \\perp (SAB)$ và $BD \\perp (SAC)$.',
      steps: [
        '$SA \\perp (ABCD)$ nên $SA$ vuông góc với mọi đường thẳng trong $(ABCD)$, đặc biệt $SA \\perp BC$ và $SA \\perp BD$.',
        '$BC \\perp AB$ (hai cạnh kề của hình vuông). $BC$ vuông góc với hai đường thẳng cắt nhau $AB$ và $SA$ của $(SAB)$, nên $BC \\perp (SAB)$.',
        '$BD \\perp AC$ (hai đường chéo của hình vuông). $BD$ vuông góc với hai đường thẳng cắt nhau $AC$ và $SA$ của $(SAC)$, nên $BD \\perp (SAC)$.',
      ],
      answer: '$BC \\perp (SAB)$ và $BD \\perp (SAC)$.',
    },
    {
      problem: 'Cho tứ diện $ABCD$ có $AB = AC$ và $DB = DC$. Chứng minh $BC \\perp AD$.',
      steps: [
        'Gọi $M$ là trung điểm của $BC$.',
        'Tam giác $ABC$ cân tại $A$ nên đường trung tuyến $AM$ cũng là đường cao: $BC \\perp AM$.',
        'Tương tự, tam giác $DBC$ cân tại $D$ nên $BC \\perp DM$.',
        '$BC$ vuông góc với hai đường thẳng cắt nhau $AM$, $DM$ của $(ADM)$, nên $BC \\perp (ADM)$; mà $AD \\subset (ADM)$.',
      ],
      answer: '$BC \\perp AD$.',
    },
    {
      problem:
        'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$ và tam giác $ABC$ vuông tại $B$. Chứng minh tam giác $SBC$ vuông. Tính $SC$ biết $SA = AB = BC = a$.',
      steps: [
        '$BC \\perp AB$ và $BC \\perp SA$ (vì $SA \\perp (ABC)$), hai đường thẳng $AB$, $SA$ cắt nhau tại $A$, nên $BC \\perp (SAB)$.',
        'Suy ra $BC \\perp SB$: tam giác $SBC$ vuông tại $B$.',
        '$SB^2 = SA^2 + AB^2 = 2a^2$; $SC^2 = SB^2 + BC^2 = 3a^2$.',
      ],
      answer: 'Tam giác $SBC$ vuông tại $B$ và $SC = a\\sqrt{3}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đường thẳng $d$ vuông góc với mặt phẳng $(P)$ nếu $d$ vuông góc với',
      options: [
        'hai đường thẳng cắt nhau nằm trong $(P)$',
        'hai đường thẳng song song nằm trong $(P)$',
        'một đường thẳng nằm trong $(P)$',
        'vô số đường thẳng song song nằm trong $(P)$',
      ],
      answer: 0,
      hints: [
        'Hãy nhớ lại phản ví dụ: một cột nghiêng vẫn vuông góc với mọi đường thẳng của sân song song với một đường cho trước.',
      ],
      solution:
        'Theo điều kiện để đường thẳng vuông góc với mặt phẳng, $d$ cần vuông góc với hai đường thẳng cắt nhau trong $(P)$. Hai đường song song (hay vô số đường song song) là chưa đủ.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình vuông và $SA \\perp (ABCD)$. Đường thẳng $BD$ vuông góc với mặt phẳng nào?',
      options: ['$(SAC)$', '$(SAB)$', '$(SCD)$', '$(SBC)$'],
      answer: 0,
      hints: [
        '$BD$ vuông góc với đường chéo nào của hình vuông? Và $BD$ có vuông góc với $SA$ không?',
      ],
      solution:
        '$BD \\perp AC$ và $BD \\perp SA$, hai đường thẳng $AC$, $SA$ cắt nhau tại $A$ và nằm trong $(SAC)$, nên $BD \\perp (SAC)$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng (các đường thẳng, mặt phẳng nói đến là phân biệt).',
      options: [
        'Hai đường thẳng cùng vuông góc với một mặt phẳng thì song song với nhau.',
        'Hai mặt phẳng cùng vuông góc với một đường thẳng thì song song với nhau.',
        'Nếu $a \\parallel b$ và $(P) \\perp a$ thì $(P) \\perp b$.',
        'Hai đường thẳng cùng vuông góc với một đường thẳng thì song song với nhau.',
        'Nếu $a \\parallel (P)$ và $b \\perp (P)$ thì $a \\parallel b$.',
      ],
      answers: [0, 1, 2],
      hints: [
        'Đối chiếu với bảng liên hệ giữa quan hệ song song và quan hệ vuông góc.',
        "Trên hình lập phương: $AB$ và $AD$ cùng vuông góc với $AA'$. Còn $AB \\parallel (A'B'C'D')$ và $AA' \\perp (A'B'C'D')$ thì $AB$ và $AA'$ thế nào?",
      ],
      solution:
        "Ba khẳng định đầu là các tính chất liên hệ giữa song song và vuông góc. Hai đường thẳng cùng vuông góc với một đường thẳng có thể cắt nhau ($AB$, $AD$ cùng vuông góc với $AA'$). Nếu $a \\parallel (P)$ và $b \\perp (P)$ thì $b \\perp a$, không song song.",
    },
    {
      type: 'number',
      prompt: "Hình lập phương $ABCD.A'B'C'D'$ có bao nhiêu cạnh vuông góc với mặt phẳng $(ABCD)$?",
      answer: 4,
      hints: [
        "$AA'$ vuông góc với hai cạnh $AB$, $AD$ cắt nhau tại $A$. Các cạnh nào song song với $AA'$?",
      ],
      solution:
        "$AA' \\perp AB$, $AA' \\perp AD$ nên $AA' \\perp (ABCD)$. Các cạnh $BB'$, $CC'$, $DD'$ song song với $AA'$ nên cũng vuông góc với $(ABCD)$. Có $4$ cạnh.",
    },
    {
      type: 'choice',
      prompt:
        'Cho tứ diện $OABC$ có $OA$, $OB$, $OC$ đôi một vuông góc. Khẳng định nào sau đây đúng?',
      options: [
        '$OA \\perp BC$',
        '$OA \\perp AB$',
        '$OB \\perp AC$ và $OB \\perp AB$',
        '$BC \\perp (OAB)$',
      ],
      answer: 0,
      hints: [
        '$OA$ vuông góc với hai đường thẳng cắt nhau nào? Từ đó $OA$ vuông góc với mặt phẳng nào?',
      ],
      solution:
        '$OA \\perp OB$, $OA \\perp OC$ nên $OA \\perp (OBC)$, suy ra $OA \\perp BC$. Tam giác $OAB$ vuông tại $O$ nên $OA$ không vuông góc với $AB$; tương tự $OB$ không vuông góc với $AB$; còn $BC$ không vuông góc với $OB \\subset (OAB)$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ vuông tại $B$, $SA = 3$ cm, $AB = 4$ cm, $BC = 12$ cm. Tính $SC$.',
      answer: 13,
      unit: 'cm',
      hints: [
        'Chứng minh $BC \\perp (SAB)$, từ đó tam giác $SBC$ vuông tại đâu?',
        'Tính $SB$ trước.',
      ],
      solution:
        '$BC \\perp AB$, $BC \\perp SA$ nên $BC \\perp (SAB)$, do đó $BC \\perp SB$. $SB = \\sqrt{3^2 + 4^2} = 5$ cm, $SC = \\sqrt{5^2 + 12^2} = 13$ cm.',
    },
    {
      type: 'choice',
      prompt: 'Tập hợp các điểm $M$ trong không gian cách đều hai điểm phân biệt $A$, $B$ là',
      options: [
        'mặt phẳng trung trực của đoạn thẳng $AB$',
        'đường trung trực của đoạn thẳng $AB$',
        'mặt phẳng chứa $AB$',
        'trung điểm của đoạn thẳng $AB$',
      ],
      answer: 0,
      hints: ['Trong không gian, tập hợp này không chỉ là một đường thẳng.'],
      solution:
        'Tập hợp các điểm cách đều $A$ và $B$ là mặt phẳng đi qua trung điểm của $AB$ và vuông góc với $AB$, tức là mặt phẳng trung trực của đoạn thẳng $AB$.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn thẳng $AB$ dài $8$ cm có trung điểm $I$. Điểm $M$ nằm trên mặt phẳng trung trực của $AB$ và $MI = 3$ cm. Tính $MA$.',
      answer: 5,
      unit: 'cm',
      hints: [
        '$AB$ vuông góc với mặt phẳng trung trực nên vuông góc với $MI$.',
        'Tam giác $MIA$ vuông tại $I$ với $IA = 4$ cm.',
      ],
      solution:
        '$AB \\perp (P)$ và $MI \\subset (P)$ nên $AI \\perp MI$. $MA = \\sqrt{IA^2 + MI^2} = \\sqrt{4^2 + 3^2} = 5$ cm.',
    },
    {
      type: 'choice',
      prompt: 'Đường thẳng $d$ vuông góc với hai cạnh $AB$ và $AC$ của tam giác $ABC$. Khi đó',
      options: [
        '$d \\perp BC$',
        '$d \\parallel BC$',
        '$d$ cắt $BC$',
        'chưa kết luận được về $d$ và $BC$',
      ],
      answer: 0,
      hints: ['$AB$ và $AC$ là hai đường thẳng cắt nhau của mặt phẳng nào?'],
      solution:
        '$d \\perp AB$, $d \\perp AC$ với $AB$, $AC$ cắt nhau nên $d \\perp (ABC)$, do đó $d \\perp BC$ (hệ quả).',
    },
  ],
  takeaways: [
    '$d \\perp (P)$ khi $d$ vuông góc với mọi đường thẳng của $(P)$.',
    'Để chứng minh $d \\perp (P)$, chỉ cần chỉ ra $d$ vuông góc với hai đường thẳng cắt nhau nằm trong $(P)$.',
    'Muốn chứng minh hai đường thẳng vuông góc, ta thường chứng minh đường này vuông góc với một mặt phẳng chứa đường kia.',
    'Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì song song; hai mặt phẳng phân biệt cùng vuông góc với một đường thẳng thì song song.',
  ],
};
