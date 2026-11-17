/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Parabol y² = 2px: trục đối xứng, đỉnh, tiêu điểm F(p/2; 0), đường chuẩn x = −p/2, tâm sai bằng 1, bán kính qua tiêu MF = x + p/2 và tính chất phản xạ dùng trong ăng-ten chảo, đèn pha.',
  intro:
    'Chảo ăng-ten vệ tinh, gương của đèn pha ô tô hay bếp năng lượng mặt trời đều có mặt cắt là một parabol. Vì sao đầu thu của ăng-ten phải đặt đúng một điểm, và bóng đèn pha phải đặt ở đâu để chùm sáng đi thẳng? Câu trả lời nằm ở tiêu điểm của parabol.',
  objectives: [
    'Nêu được trục đối xứng, đỉnh, tiêu điểm, đường chuẩn và tham số tiêu của parabol $y^2 = 2px$.',
    'Tính được bán kính qua tiêu $MF = x + \\dfrac{p}{2}$ của một điểm trên parabol.',
    'Hiểu tính chất phản xạ của parabol và vận dụng vào bài toán ăng-ten, đèn pha.',
  ],
  sections: [
    {
      heading: 'Hình dạng của parabol',
      blocks: [
        {
          type: 'p',
          text: 'Nhắc lại: cho điểm $F$ và đường thẳng $\\Delta$ không đi qua $F$. Parabol là tập hợp các điểm $M$ cách đều $F$ và $\\Delta$. $F$ là tiêu điểm, $\\Delta$ là đường chuẩn, $p = d(F, \\Delta)$ là tham số tiêu. Với $F\\left(\\dfrac{p}{2}; 0\\right)$ và $\\Delta: x = -\\dfrac{p}{2}$, parabol có phương trình chính tắc',
        },
        { type: 'tex', tex: 'y^2 = 2px, \\qquad p > 0.' },
        {
          type: 'list',
          items: [
            'Parabol nhận trục $Ox$ làm trục đối xứng (gọi là trục của parabol): nếu $M(x_0; y_0)$ thuộc parabol thì $(x_0; -y_0)$ cũng vậy.',
            'Parabol cắt trục của nó tại gốc $O$, gọi là đỉnh của parabol.',
            'Mọi điểm của parabol có $x = \\dfrac{y^2}{2p} \\ge 0$: parabol nằm bên phải trục $Oy$, và $|y|$ tăng mãi khi $x$ tăng mãi.',
            'Parabol không có tâm đối xứng và không có đường tiệm cận.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tâm sai của parabol',
          text: 'Với mọi điểm $M$ của parabol, $\\dfrac{MF}{d(M, \\Delta)} = 1$. Ta nói parabol có tâm sai $e = 1$.',
        },
      ],
    },
    {
      heading: 'Bán kính qua tiêu',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Bán kính qua tiêu',
          text: 'Với $M(x; y)$ thuộc parabol $y^2 = 2px$, đoạn $MF$ gọi là bán kính qua tiêu của $M$ và $$MF = x + \\dfrac{p}{2}.$$',
        },
        {
          type: 'p',
          text: 'Thật vậy, $MF = d(M, \\Delta) = \\left|x + \\dfrac{p}{2}\\right| = x + \\dfrac{p}{2}$ vì $x \\ge 0$. Do đó đỉnh $O$ là điểm của parabol gần tiêu điểm nhất, cách $F$ một khoảng $\\dfrac{p}{2}$.',
        },
        {
          type: 'p',
          text: 'Đường thẳng qua $F$ vuông góc với trục cắt parabol tại hai điểm $\\left(\\dfrac{p}{2}; \\pm p\\right)$; dây cung này dài $2p$, giúp ta phác nhanh độ "mở" của parabol.',
        },
      ],
    },
    {
      heading: 'Tính chất phản xạ và ứng dụng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất phản xạ',
          text: 'Một tia sáng song song với trục của parabol, chiếu vào mặt trong của parabol, sẽ phản xạ đi qua tiêu điểm $F$. Ngược lại, tia sáng phát ra từ $F$ gặp parabol sẽ phản xạ thành tia song song với trục.',
        },
        {
          type: 'p',
          text: 'Theo định luật phản xạ, góc giữa tia tới và tiếp tuyến tại $M$ bằng góc giữa tia phản xạ và tiếp tuyến đó. Với parabol, tiếp tuyến tại $M$ là đường phân giác của góc tạo bởi $MF$ và đường vuông góc hạ từ $M$ xuống $\\Delta$, vì $MF = d(M, \\Delta)$; từ đó tia phản xạ luôn đi qua $F$.',
        },
        {
          type: 'list',
          items: [
            'Ăng-ten chảo (ăng-ten parabol): sóng từ vệ tinh ở rất xa đến gần như song song, phản xạ trên mặt chảo và hội tụ ở đầu thu đặt tại tiêu điểm.',
            'Đèn pha, đèn pin: bóng đèn đặt tại tiêu điểm, ánh sáng phản xạ đi ra thành chùm song song, chiếu được xa.',
            'Bếp, lò năng lượng mặt trời: ánh nắng hội tụ ở tiêu điểm, nơi đặt nồi nấu.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính vị trí tiêu điểm của một chảo',
          text: 'Chảo có đường kính $D$, độ sâu $h$. Đặt đỉnh chảo ở $O$, trục là $Ox$: mép chảo là điểm $\\left(h; \\dfrac{D}{2}\\right)$ thuộc $y^2 = 2px$, nên $\\dfrac{D^2}{4} = 2ph$ và tiêu điểm cách đỉnh $\\dfrac{p}{2} = \\dfrac{D^2}{16h}$.',
        },
      ],
    },
    {
      heading: 'Dự án: Gấp giấy ra parabol',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tạo một parabol chỉ bằng cách gấp giấy, rồi kiểm chứng tiêu điểm và đường chuẩn của nó bằng phép đo.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: vài tờ giấy nến hoặc giấy A4 mỏng, bút chì, thước kẻ chia mi-li-mét, ê ke.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Coi mép dưới tờ giấy là đường chuẩn $\\Delta$. Đánh dấu điểm $F$ cách mép dưới $3$ cm, ở giữa tờ giấy.',
            'Gấp tờ giấy sao cho một điểm trên mép dưới chạm đúng $F$ rồi miết nếp gấp. Lặp lại khoảng $30$ lần với các điểm khác nhau trên mép dưới.',
            'Các nếp gấp bao quanh một đường cong: tô đậm đường cong đó. Giải thích vì sao mỗi nếp gấp là một tiếp tuyến của parabol có tiêu điểm $F$, đường chuẩn $\\Delta$.',
            'Dựng hệ trục với đỉnh làm gốc, chọn ba điểm trên đường cong, đo toạ độ của chúng và kiểm tra $y^2 \\approx 2px$ với $p = 3$ cm, cũng như $MF \\approx x + \\dfrac{p}{2}$.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: tờ giấy đã gấp, bảng số đo và sai số, lời giải thích về nếp gấp, và một ví dụ thực tế dùng tính chất phản xạ của parabol.',
        },
      ],
    },
  ],
  explore: {
    title: 'Gương parabol hội tụ ánh sáng',
    instruction:
      'Kéo nút ở mép phải (hoặc chọn nó rồi dùng phím mũi tên lên, xuống) để đổi độ cao của tia sáng, đổi tham số tiêu $p$ và bật chùm tia. Ở chế độ ăng-ten, mọi tia song song với trục đều phản xạ qua $F$; ở chế độ đèn pha, tia từ $F$ phản xạ thành tia song song. Quan sát hai góc với tiếp tuyến luôn bằng nhau và $MF = d(M, \\Delta)$.',
  },
  examples: [
    {
      problem: 'Tìm toạ độ tiêu điểm và phương trình đường chuẩn của parabol $y^2 = 12x$.',
      steps: [
        'So sánh với $y^2 = 2px$: $2p = 12$ nên $p = 6$.',
        'Tiêu điểm $F\\left(\\dfrac{p}{2}; 0\\right) = F(3; 0)$.',
        'Đường chuẩn $\\Delta: x = -\\dfrac{p}{2}$, tức là $x = -3$.',
      ],
      answer: '$F(3; 0)$ và $\\Delta: x + 3 = 0$.',
    },
    {
      problem:
        'Parabol $(P)$ có phương trình chính tắc và đi qua điểm $M(3; 3\\sqrt{2})$. Tính bán kính qua tiêu của $M$ và khoảng cách từ tiêu điểm đến đường chuẩn của $(P)$.',
      steps: [
        'Thay toạ độ $M$ vào $y^2 = 2px$: $18 = 2p \\cdot 3$, nên $p = 3$ và $(P): y^2 = 6x$.',
        'Bán kính qua tiêu: $MF = x_M + \\dfrac{p}{2} = 3 + \\dfrac{3}{2} = \\dfrac{9}{2}$.',
        'Khoảng cách từ tiêu điểm đến đường chuẩn là tham số tiêu $p = 3$.',
      ],
      answer: '$MF = \\dfrac{9}{2}$; $d(F, \\Delta) = 3$.',
    },
    {
      problem:
        'Một chảo ăng-ten parabol có đường kính $120$ cm và độ sâu $20$ cm. Đầu thu phải đặt cách đỉnh chảo bao nhiêu xăng-ti-mét?',
      steps: [
        'Chọn hệ trục với đỉnh chảo là gốc $O$, trục chảo là $Ox$; mặt cắt chảo là parabol $y^2 = 2px$.',
        'Mép chảo là điểm $(20; 60)$, nên $60^2 = 2p \\cdot 20$, tức là $p = 90$.',
        'Đầu thu đặt ở tiêu điểm $F\\left(\\dfrac{p}{2}; 0\\right) = F(45; 0)$.',
      ],
      answer: 'Đầu thu đặt cách đỉnh chảo $45$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tiêu điểm của parabol $y^2 = 8x$ là',
      options: ['$F(2; 0)$', '$F(4; 0)$', '$F(8; 0)$', '$F(0; 2)$'],
      answer: 0,
      hints: ['$2p = 8$; tiêu điểm là $\\left(\\dfrac{p}{2}; 0\\right)$.'],
      solution: '$p = 4$ nên tiêu điểm là $F(2; 0)$.',
    },
    {
      type: 'number',
      prompt:
        'Đường chuẩn của parabol $y^2 = 10x$ có phương trình $x = m$. Tìm $m$ (viết dạng số thập phân).',
      answer: -2.5,
      hints: ['$2p = 10$; đường chuẩn là $x = -\\dfrac{p}{2}$.'],
      solution: '$p = 5$ nên đường chuẩn là $x = -\\dfrac{5}{2} = -2{,}5$.',
    },
    {
      type: 'number',
      prompt: 'Điểm $M$ thuộc parabol $y^2 = 6x$ có hoành độ bằng $4$. Tính $MF$.',
      answer: 5.5,
      hints: ['$MF = x + \\dfrac{p}{2}$ với $2p = 6$.'],
      solution: '$p = 3$, nên $MF = 4 + \\dfrac{3}{2} = 5{,}5$.',
    },
    {
      type: 'number',
      prompt: 'Parabol có phương trình chính tắc $y^2 = kx$ đi qua điểm $A(2; 4)$. Tìm $k$.',
      answer: 8,
      hints: ['Thay toạ độ của $A$ vào phương trình.'],
      solution: '$4^2 = k \\cdot 2$, nên $k = 8$; parabol là $y^2 = 8x$ (với $p = 4$).',
    },
    {
      type: 'number',
      prompt:
        'Điểm $M$ thuộc parabol $y^2 = 4x$ có bán kính qua tiêu $MF = 5$. Tìm hoành độ của $M$.',
      answer: 4,
      hints: ['$p = 2$, nên $MF = x + 1$.'],
      solution: '$x + 1 = 5$, nên $x = 4$ (khi đó $y = \\pm 4$).',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng qua tiêu điểm và vuông góc với trục của parabol $y^2 = 12x$ cắt parabol tại $A$, $B$. Tính $AB$.',
      answer: 12,
      hints: ['Đường thẳng đó là $x = \\dfrac{p}{2}$; thay vào phương trình parabol.'],
      solution: '$p = 6$, đường thẳng $x = 3$; $y^2 = 36$, $y = \\pm 6$. Vậy $AB = 12 = 2p$.',
    },
    {
      type: 'number',
      prompt:
        'Chao đèn pha có mặt cắt là parabol, đường kính miệng chao $20$ cm, độ sâu $10$ cm. Bóng đèn phải đặt cách đỉnh chao bao nhiêu xăng-ti-mét để chùm sáng đi ra song song?',
      answer: 2.5,
      unit: 'cm',
      hints: [
        'Đỉnh chao ở gốc toạ độ, mép chao là điểm $(10; 10)$ thuộc $y^2 = 2px$.',
        'Bóng đèn đặt ở tiêu điểm, cách đỉnh $\\dfrac{p}{2}$.',
      ],
      solution:
        '$10^2 = 2p \\cdot 10$ nên $p = 5$. Bóng đèn đặt cách đỉnh $\\dfrac{p}{2} = 2{,}5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một chảo ăng-ten parabol đường kính $240$ cm có đầu thu đặt ở tiêu điểm, cách đỉnh chảo $60$ cm. Tính độ sâu của chảo.',
      answer: 60,
      unit: 'cm',
      hints: ['$\\dfrac{p}{2} = 60$, nên parabol là $y^2 = 240x$.', 'Mép chảo có tung độ $120$.'],
      solution:
        '$p = 120$, $y^2 = 240x$. Với $y = 120$: $x = \\dfrac{14\\,400}{240} = 60$. Chảo sâu $60$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Một tia sáng song song với trục của parabol chiếu vào mặt trong của parabol. Tia phản xạ',
      options: [
        'đi qua tiêu điểm',
        'song song với trục',
        'vuông góc với đường chuẩn',
        'đi qua đỉnh',
      ],
      answer: 0,
      hints: ['Đây là nguyên lí của ăng-ten chảo.'],
      solution:
        'Theo tính chất phản xạ, mọi tia song song với trục đều phản xạ đi qua tiêu điểm của parabol.',
    },
  ],
  takeaways: [
    'Parabol $y^2 = 2px$: trục $Ox$, đỉnh $O$, tiêu điểm $F\\left(\\dfrac{p}{2}; 0\\right)$, đường chuẩn $x = -\\dfrac{p}{2}$, tham số tiêu $p = d(F, \\Delta)$.',
    'Tâm sai của parabol bằng $1$: $MF = d(M, \\Delta)$.',
    'Bán kính qua tiêu: $MF = x + \\dfrac{p}{2}$.',
    'Tia song song với trục phản xạ qua tiêu điểm, tia từ tiêu điểm phản xạ thành tia song song: chảo có đường kính $D$, sâu $h$ có tiêu điểm cách đỉnh $\\dfrac{D^2}{16h}$.',
  ],
};
