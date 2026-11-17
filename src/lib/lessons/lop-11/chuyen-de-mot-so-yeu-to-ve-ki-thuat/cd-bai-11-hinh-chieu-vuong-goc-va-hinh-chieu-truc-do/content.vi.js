/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép chiếu song song và phép chiếu vuông góc; hình chiếu đứng, hình chiếu bằng, hình chiếu cạnh và cách bố trí chúng trên bản vẽ; mối liên hệ giữa ba hình chiếu; hình chiếu trục đo, góc trục đo, hệ số biến dạng và hình chiếu trục đo vuông góc đều.',
  intro:
    'Muốn người thợ làm ra đúng một chi tiết máy, người thiết kế phải vẽ nó lên một tờ giấy phẳng sao cho đọc bản vẽ là biết chính xác hình dạng và kích thước. Bài này giới thiệu hai cách biểu diễn vật thể trong không gian lên mặt phẳng: ba hình chiếu vuông góc, cho kích thước thật, và hình chiếu trục đo, cho hình dung ba chiều.',
  objectives: [
    'Nhận biết phép chiếu song song, phép chiếu vuông góc và các tính chất của chúng.',
    'Nhận biết hình chiếu đứng, hình chiếu bằng, hình chiếu cạnh và vị trí của chúng trên bản vẽ theo phương pháp chiếu góc thứ nhất.',
    'Dùng mối liên hệ giữa ba hình chiếu: cùng chiều dài, cùng chiều cao, cùng chiều rộng.',
    'Hiểu hình chiếu trục đo, góc trục đo, hệ số biến dạng; tính các hệ số biến dạng và kích thước thật của vật thể.',
  ],
  sections: [
    {
      heading: 'Hình biểu diễn của một hình, khối',
      blocks: [
        {
          type: 'p',
          text: 'Để vẽ một vật thể trong không gian lên mặt phẳng, ta chiếu nó lên một mặt phẳng. Hình nhận được gọi là hình biểu diễn của vật thể; đặc điểm của hình biểu diễn phụ thuộc vào phép chiếu được dùng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép chiếu song song, phép chiếu vuông góc',
          text: "Cho mặt phẳng $(P)$ và đường thẳng $l$ cắt $(P)$. Qua mỗi điểm $M$, kẻ đường thẳng song song (hoặc trùng) với $l$, cắt $(P)$ tại $M'$. Phép đặt tương ứng $M$ với $M'$ là phép chiếu song song lên $(P)$ theo phương $l$; $M'$ là hình chiếu song song của $M$. Khi $l$ vuông góc với $(P)$, ta có phép chiếu vuông góc và hình chiếu vuông góc.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Phép chiếu song song (phương chiếu không song song với các đoạn thẳng được xét) biến đoạn thẳng thành đoạn thẳng, biến hai đường thẳng song song thành hai đường thẳng song song hoặc trùng nhau, và giữ nguyên tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song hoặc cùng nằm trên một đường thẳng. Đặc biệt, trung điểm của một đoạn thẳng có hình chiếu là trung điểm của hình chiếu đoạn thẳng đó.',
        },
        {
          type: 'list',
          items: [
            'Với phép chiếu vuông góc lên $(P)$: đoạn thẳng song song với $(P)$ có hình chiếu bằng chính nó.',
            'Đoạn thẳng vuông góc với $(P)$ có hình chiếu là một điểm.',
            'Đoạn thẳng xiên góc với $(P)$ có hình chiếu ngắn hơn nó.',
          ],
        },
      ],
    },
    {
      heading: 'Hình chiếu đứng, hình chiếu bằng và hình chiếu cạnh',
      blocks: [
        {
          type: 'p',
          text: 'Đặt vật thể trong góc tạo bởi ba mặt phẳng đôi một vuông góc: mặt phẳng hình chiếu đứng $(P_1)$ ở phía sau vật, mặt phẳng hình chiếu bằng $(P_2)$ ở phía dưới vật và mặt phẳng hình chiếu cạnh $(P_3)$ ở bên phải vật. Hai mặt phẳng $(P_1)$ và $(P_2)$ cắt nhau theo trục $Ox$, $(P_1)$ và $(P_3)$ cắt nhau theo trục $Oz$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ba hình chiếu vuông góc',
          text: 'Chiếu vuông góc vật thể lên $(P_1)$ theo hướng từ trước ra sau ta được hình chiếu đứng; lên $(P_2)$ theo hướng từ trên xuống ta được hình chiếu bằng; lên $(P_3)$ theo hướng từ trái sang phải ta được hình chiếu cạnh. Hình chiếu của điểm $A$ lên $(P_1)$, $(P_2)$, $(P_3)$ lần lượt kí hiệu là $A_1$, $A_2$, $A_3$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Vị trí các hình chiếu trên bản vẽ',
          text: 'Sau khi chiếu, xoay $(P_2)$ quanh $Ox$ xuống dưới và xoay $(P_3)$ quanh $Oz$ sang phải cho cùng nằm trên mặt phẳng $(P_1)$ (mặt phẳng bản vẽ). Khi đó hình chiếu bằng nằm ngay dưới hình chiếu đứng, hình chiếu cạnh nằm ngay bên phải hình chiếu đứng.',
        },
        {
          type: 'list',
          items: [
            'Cạnh và đường bao thấy được vẽ bằng nét liền đậm; cạnh và đường bao khuất (bị che) vẽ bằng nét đứt.',
            'Trên hình chiếu bằng, mặt trước của vật nằm ở phía dưới; trên hình chiếu cạnh, mặt trước của vật nằm ở bên phải.',
            'Cách đặt vật nằm giữa người quan sát và các mặt phẳng hình chiếu như trên gọi là phương pháp chiếu góc thứ nhất (dùng ở Việt Nam). Phương pháp chiếu góc thứ ba đặt các mặt phẳng hình chiếu nằm giữa người quan sát và vật thể; mỗi hình chiếu nhận được vẫn như nhau vì phương chiếu và mặt phẳng chiếu không đổi, chỉ khác vị trí đặt trên bản vẽ.',
          ],
        },
        {
          type: 'table',
          head: [
            'Khối (đặt đáy nằm ngang)',
            'Hình chiếu đứng',
            'Hình chiếu bằng',
            'Hình chiếu cạnh',
          ],
          rows: [
            ['Hình hộp chữ nhật', 'Hình chữ nhật', 'Hình chữ nhật', 'Hình chữ nhật'],
            ['Hình trụ', 'Hình chữ nhật', 'Hình tròn', 'Hình chữ nhật'],
            ['Hình nón', 'Tam giác cân', 'Hình tròn', 'Tam giác cân'],
            [
              'Hình chóp tứ giác đều',
              'Tam giác cân',
              'Hình vuông và hai đường chéo',
              'Tam giác cân',
            ],
            ['Hình cầu', 'Hình tròn', 'Hình tròn', 'Hình tròn'],
          ],
          caption: 'Hình chiếu vuông góc của một số khối cơ bản.',
        },
      ],
    },
    {
      heading: 'Mối liên hệ giữa ba hình chiếu vuông góc',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đường dóng',
          text: 'Với mọi điểm $A$: $A_1$ và $A_2$ nằm trên một đường thẳng vuông góc với $Ox$; $A_1$ và $A_3$ nằm trên một đường thẳng vuông góc với $Oz$; khoảng cách từ $A_2$ đến $Ox$ bằng khoảng cách từ $A_3$ đến $Oz$ (cùng bằng khoảng cách từ $A$ đến $(P_1)$). Các đường thẳng nối các hình chiếu của cùng một điểm gọi là đường dóng.',
        },
        {
          type: 'list',
          items: [
            'Hình chiếu đứng và hình chiếu bằng có cùng chiều dài.',
            'Hình chiếu đứng và hình chiếu cạnh có cùng chiều cao.',
            'Hình chiếu bằng và hình chiếu cạnh có cùng chiều rộng.',
          ],
        },
        {
          type: 'p',
          text: 'Nhờ mối liên hệ này, biết hai hình chiếu ta thường dựng được hình chiếu thứ ba. Ở mục Bàn chiếu vật thể bên dưới, chọn một vật thể, kéo để đổi hướng nhìn và bấm các nút để nhìn đúng theo ba hướng chiếu.',
        },
      ],
    },
    {
      heading: 'Hình chiếu trục đo',
      blocks: [
        {
          type: 'p',
          text: 'Ba hình chiếu vuông góc cho kích thước thật nhưng mỗi hình chỉ thể hiện hai chiều của vật, nên khó hình dung. Hình chiếu trục đo thể hiện đồng thời ba chiều trên một hình.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình chiếu trục đo',
          text: "Gắn vào vật thể hệ trục $Oxyz$ có ba trục theo ba chiều dài, rộng, cao. Chiếu vật thể cùng hệ trục lên mặt phẳng $(P)$ theo phương $l$ không song song với $(P)$ và với các trục toạ độ. Hình nhận được là hình chiếu trục đo của vật thể; $O'x'$, $O'y'$, $O'z'$ là các trục đo; các góc $\\widehat{x'O'y'}$, $\\widehat{y'O'z'}$, $\\widehat{z'O'x'}$ là các góc trục đo.",
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hệ số biến dạng',
          text: "Lấy $A$, $B$, $C$ lần lượt trên $Ox$, $Oy$, $Oz$ có hình chiếu $A'$, $B'$, $C'$. Các tỉ số $$p = \\frac{O'A'}{OA},\\quad q = \\frac{O'B'}{OB},\\quad r = \\frac{O'C'}{OC}$$ là hệ số biến dạng theo các trục $O'x'$, $O'y'$, $O'z'$. Chúng không phụ thuộc vào cách chọn $A$, $B$, $C$, vì phép chiếu song song giữ tỉ số độ dài trên một đường thẳng.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hình chiếu trục đo vuông góc đều',
          text: 'Khi $l$ vuông góc với $(P)$ và ba trục $Ox$, $Oy$, $Oz$ tạo với $(P)$ các góc bằng nhau, ta có hình chiếu trục đo vuông góc đều: ba góc trục đo bằng $120^\\circ$ và $p = q = r = \\dfrac{\\sqrt 6}{3} \\approx 0{,}82$. Trong thực hành, để dễ vẽ, người ta quy ước lấy $p = q = r = 1$ và thường vẽ trên giấy kẻ ô tam giác đều.',
        },
        {
          type: 'p',
          text: "Giải thích: lấy $OA = OB = OC$ trên ba trục. Tam giác $ABC$ đều và mặt phẳng $(ABC)$ song song với $(P)$; nếu $I$ là tâm tam giác $ABC$ thì $\\widehat{A'O'B'} = \\widehat{AIB} = 120^\\circ$, còn trong tam giác vuông $OIA$ ta có $\\dfrac{IA}{OA} = \\dfrac{\\sqrt 6}{3}$, mà $O'A' = IA$.",
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hình chiếu trục đo xiên góc cân',
          text: "Một loại hay gặp khác: mặt phẳng toạ độ $(xOz)$ đặt song song với $(P)$ và phương chiếu xiên. Khi đó $\\widehat{x'O'z'} = 90^\\circ$, $\\widehat{x'O'y'} = \\widehat{y'O'z'} = 135^\\circ$, $p = r = 1$, $q = 0{,}5$: mặt trước của vật giữ nguyên hình dạng và kích thước.",
        },
      ],
    },
    {
      heading: 'Dự án: Vẽ ba hình chiếu và hình chiếu trục đo của một đồ vật',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: chọn một đồ vật có dạng ghép từ các khối hộp (hộp bút, giá sách nhỏ, khối gỗ đồ chơi), vẽ ba hình chiếu vuông góc và một hình chiếu trục đo vuông góc đều của nó, rồi kiểm tra mối liên hệ giữa các hình chiếu.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: đồ vật, thước kẻ, bút chì, tẩy, giấy kẻ ô vuông và giấy kẻ ô tam giác đều cạnh $1$ cm.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đo chiều dài, chiều rộng, chiều cao của đồ vật và của từng phần (tính theo cm, làm tròn đến cm). Chọn mặt trước của vật.',
            'Trên giấy kẻ ô vuông, vẽ hình chiếu đứng; vẽ hình chiếu bằng ngay bên dưới và hình chiếu cạnh ngay bên phải, nối các đường dóng. Cạnh thấy vẽ nét liền đậm, cạnh khuất vẽ nét đứt.',
            'Trên giấy kẻ ô tam giác đều, vẽ hình chiếu trục đo vuông góc đều với $p = q = r = 1$: các cạnh song song với ba chiều của vật đi theo ba hướng của lưới.',
            'Đổi bài với bạn: bạn có hình dung đúng đồ vật từ ba hình chiếu không? Hình chiếu trục đo có giúp hình dung dễ hơn không?',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng số đo, ba hình chiếu và hình chiếu trục đo, chỉ ra hai hình chiếu nào có cùng chiều dài, cùng chiều cao, cùng chiều rộng, và nhận xét của bạn đọc bản vẽ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bàn chiếu vật thể',
    instruction:
      'Chọn một vật thể. Kéo hình vật thể (hoặc chọn nó rồi dùng phím mũi tên) để đổi phương nhìn và theo dõi các hệ số biến dạng, góc trục đo. Bấm "Nhìn từ trước", "Nhìn từ trên", "Nhìn từ trái" để thấy hình nhìn được trùng với từng hình chiếu vuông góc; bấm "Quay vật thể 90°" và xem ba hình chiếu thay đổi. Với khối có rãnh sau, tìm các nét đứt.',
  },
  examples: [
    {
      problem:
        'Một giá chữ U được làm từ một khối hộp chữ nhật dài $5$ cm, rộng $3$ cm, cao $4$ cm, khoét ở giữa phía trên một rãnh rộng $3$ cm, sâu $2$ cm, chạy suốt từ trước ra sau. Mô tả ba hình chiếu vuông góc của giá.',
      steps: [
        'Hình chiếu đứng (nhìn từ trước): hình chữ U, rộng $5$ cm, cao $4$ cm, rãnh rộng $3$ cm sâu $2$ cm; mọi cạnh đều thấy nên vẽ nét liền đậm.',
        'Hình chiếu bằng (nhìn từ trên): hình chữ nhật $5 \\times 3$ cm, có hai đoạn thẳng nét liền đậm cách hai đầu $1$ cm, là mép trên của hai thành rãnh. Nó đặt ngay dưới hình chiếu đứng và có cùng chiều dài $5$ cm.',
        'Hình chiếu cạnh (nhìn từ trái): hình chữ nhật $3 \\times 4$ cm; đáy rãnh ở độ cao $2$ cm bị thành bên trái che khuất nên vẽ một đoạn nét đứt. Nó đặt bên phải hình chiếu đứng, có cùng chiều cao $4$ cm, và có cùng chiều rộng $3$ cm với hình chiếu bằng.',
      ],
      answer:
        'Hình chiếu đứng hình chữ U; hình chiếu bằng hình chữ nhật có hai đường thành rãnh; hình chiếu cạnh hình chữ nhật có một nét đứt (đáy rãnh).',
    },
    {
      problem:
        "Hình tứ diện $OABC$ có $OA$, $OB$, $OC$ đôi một vuông góc, $OA = 2$ cm, $OB = 3$ cm, $OC = 6$ cm. Trên hình chiếu trục đo của nó, đo được $O'A' = 2$ cm, $O'B' = 1$ cm, $O'C' = 4$ cm. Tính các hệ số biến dạng.",
      steps: [
        "$p = \\dfrac{O'A'}{OA} = \\dfrac{2}{2} = 1$.",
        "$q = \\dfrac{O'B'}{OB} = \\dfrac{1}{3}$.",
        "$r = \\dfrac{O'C'}{OC} = \\dfrac{4}{6} = \\dfrac{2}{3}$.",
      ],
      answer: '$p = 1$, $q = \\dfrac{1}{3}$, $r = \\dfrac{2}{3}$.',
    },
    {
      problem:
        "Hình chiếu trục đo của một hình hộp chữ nhật có các hệ số biến dạng $p = 1$, $q = r = 0{,}5$. Ba cạnh xuất phát từ một đỉnh trên hình vẽ dài $O'A' = 5$ cm, $O'B' = 3$ cm, $O'C' = 2$ cm. Tìm kích thước thật của hình hộp.",
      steps: [
        "Từ $p = \\dfrac{O'A'}{OA}$ suy ra $OA = \\dfrac{O'A'}{p} = \\dfrac{5}{1} = 5$ cm.",
        "$OB = \\dfrac{O'B'}{q} = \\dfrac{3}{0{,}5} = 6$ cm.",
        "$OC = \\dfrac{O'C'}{r} = \\dfrac{2}{0{,}5} = 4$ cm.",
      ],
      answer: 'Hình hộp có kích thước $5$ cm, $6$ cm, $4$ cm.',
    },
    {
      problem:
        'Một khối lập phương cạnh $10$ cm. Tính độ dài hình chiếu của mỗi cạnh trong hình chiếu trục đo vuông góc đều (đúng theo phép chiếu) và trên hình vẽ quy ước.',
      steps: [
        'Theo phép chiếu, $p = q = r = \\dfrac{\\sqrt 6}{3}$, nên mỗi cạnh có hình chiếu dài $10 \\cdot \\dfrac{\\sqrt 6}{3} \\approx 8{,}16$ cm.',
        'Theo quy ước $p = q = r = 1$, mỗi cạnh được vẽ dài đúng $10$ cm: hình vẽ lớn hơn hình chiếu thật theo tỉ số $\\dfrac{3}{\\sqrt 6} \\approx 1{,}22$ nhưng có cùng hình dạng.',
      ],
      answer: 'Khoảng $8{,}16$ cm theo phép chiếu; $10$ cm trên hình vẽ quy ước.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trên bản vẽ theo phương pháp chiếu góc thứ nhất, hình chiếu bằng được đặt ở đâu?',
      options: [
        'Ngay dưới hình chiếu đứng',
        'Ngay trên hình chiếu đứng',
        'Bên phải hình chiếu đứng',
        'Bên trái hình chiếu đứng',
      ],
      answer: 0,
      hints: ['Mặt phẳng hình chiếu bằng nằm dưới vật và được xoay quanh $Ox$ xuống dưới.'],
      solution:
        'Mặt phẳng $(P_2)$ được xoay quanh $Ox$ xuống dưới nên hình chiếu bằng nằm ngay dưới hình chiếu đứng; hình chiếu cạnh nằm bên phải hình chiếu đứng.',
    },
    {
      type: 'choice',
      prompt: 'Hình chiếu cạnh nhận được khi chiếu vuông góc vật thể theo hướng nào?',
      options: ['Từ trái sang phải', 'Từ trước ra sau', 'Từ trên xuống', 'Từ phải sang trái'],
      answer: 0,
      hints: ['Mặt phẳng hình chiếu cạnh đặt ở bên phải vật.'],
      solution:
        'Hướng chiếu cạnh là từ trái sang phải (mặt phẳng $(P_3)$ ở bên phải vật); từ trước ra sau là hướng chiếu đứng, từ trên xuống là hướng chiếu bằng.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng về ba hình chiếu vuông góc của một vật thể.',
      options: [
        'Hình chiếu đứng và hình chiếu bằng có cùng chiều dài.',
        'Hình chiếu đứng và hình chiếu cạnh có cùng chiều cao.',
        'Hình chiếu bằng và hình chiếu cạnh có cùng chiều rộng.',
        'Cạnh khuất được vẽ bằng nét liền đậm.',
        'Hình chiếu đứng và hình chiếu cạnh có cùng chiều rộng.',
      ],
      answers: [0, 1, 2],
      hints: [
        'Hình chiếu đứng thể hiện chiều dài và chiều cao; hình chiếu bằng thể hiện chiều dài và chiều rộng.',
      ],
      solution:
        'Hình chiếu đứng có chiều dài và chiều cao, hình chiếu bằng có chiều dài và chiều rộng, hình chiếu cạnh có chiều rộng và chiều cao; từ đó ba khẳng định đầu đúng. Cạnh khuất vẽ nét đứt; hình chiếu đứng không thể hiện chiều rộng.',
    },
    {
      type: 'choice',
      prompt:
        'Vật thể nào có hình chiếu đứng và hình chiếu cạnh là hai hình chữ nhật bằng nhau, còn hình chiếu bằng là một hình tròn?',
      options: [
        'Hình trụ đặt đáy nằm ngang',
        'Hình hộp chữ nhật',
        'Hình nón đặt đáy nằm ngang',
        'Hình cầu',
      ],
      answer: 0,
      hints: [
        'Nhìn từ trên xuống, khối nào cho hình tròn? Trong các khối đó, khối nào nhìn ngang cho hình chữ nhật?',
      ],
      solution:
        'Hình trụ đặt đáy nằm ngang: nhìn từ trên thấy hình tròn (đáy), nhìn từ trước hoặc từ trái thấy hình chữ nhật. Hình nón cho tam giác cân, hình cầu cho hình tròn, hình hộp chữ nhật cho ba hình chữ nhật.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn thẳng $AB$ dài $7$ cm và song song với mặt phẳng hình chiếu đứng. Hình chiếu đứng $A_1B_1$ của nó dài bao nhiêu xentimét?',
      answer: 7,
      unit: 'cm',
      hints: ['Phép chiếu vuông góc lên một mặt phẳng song song với đoạn thẳng.'],
      solution:
        '$AB$ song song với $(P_1)$ nên $ABB_1A_1$ là hình chữ nhật (hoặc $A_1B_1$ trùng $AB$), do đó $A_1B_1 = AB = 7$ cm.',
    },
    {
      type: 'text',
      prompt:
        'Đoạn thẳng $AB$ vuông góc với mặt phẳng hình chiếu bằng. Hình chiếu bằng của $AB$ là hình gì?',
      accept: ['một điểm', 'điểm', 'là một điểm', '1 điểm'],
      hints: ['Phương chiếu bằng cũng vuông góc với $(P_2)$.'],
      solution:
        'Phương chiếu bằng vuông góc với $(P_2)$, cùng phương với $AB$, nên $A$ và $B$ có cùng hình chiếu: hình chiếu bằng của $AB$ là một điểm ($A_2 \\equiv B_2$).',
    },
    {
      type: 'number',
      prompt:
        "Hình chiếu trục đo của một hình hộp chữ nhật có $p = 1$, $q = r = 0{,}5$. Trên hình vẽ, $O'A' = 4$ cm, $O'B' = 2{,}5$ cm, $O'C' = 3$ cm (với $A$, $B$, $C$ là ba đỉnh kề $O$ trên các trục $Ox$, $Oy$, $Oz$). Chiều cao thật $OC$ của hình hộp là bao nhiêu xentimét?",
      answer: 6,
      unit: 'cm',
      hints: ["$r = \\dfrac{O'C'}{OC}$, nên $OC = \\dfrac{O'C'}{r}$."],
      solution:
        "$OC = \\dfrac{O'C'}{r} = \\dfrac{3}{0{,}5} = 6$ cm. (Tương tự $OA = 4$ cm, $OB = 5$ cm.)",
    },
    {
      type: 'fraction',
      prompt:
        "Tứ diện $OABC$ có $OA$, $OB$, $OC$ đôi một vuông góc, $OA = 3$ cm, $OB = 4$ cm, $OC = 5$ cm. Trên hình chiếu trục đo của nó, $O'A' = 3$ cm, $O'B' = 2$ cm, $O'C' = 4$ cm. Tính hệ số biến dạng $r$ theo trục $O'z'$ (viết dạng phân số).",
      answer: [4, 5],
      hints: ["$r = \\dfrac{O'C'}{OC}$."],
      solution: "$r = \\dfrac{O'C'}{OC} = \\dfrac{4}{5}$. (Ngoài ra $p = 1$, $q = \\dfrac{1}{2}$.)",
    },
    {
      type: 'number',
      prompt: 'Trong hình chiếu trục đo vuông góc đều, mỗi góc trục đo bằng bao nhiêu độ?',
      answer: 120,
      unit: '°',
      hints: ["Ba góc trục đo bằng nhau và có tổng bằng một vòng quanh $O'$."],
      solution: 'Ba góc bằng nhau, tổng $360^\\circ$, nên mỗi góc bằng $120^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Một khối lập phương cạnh $6$ cm được chiếu theo phép chiếu trục đo vuông góc đều (hệ số $\\dfrac{\\sqrt 6}{3}$, không dùng quy ước). Hình chiếu của mỗi cạnh dài bao nhiêu xentimét? (Làm tròn đến hàng phần trăm.)',
      answer: 4.9,
      tolerance: 0.01,
      unit: 'cm',
      hints: ['Nhân độ dài thật với hệ số biến dạng $\\dfrac{\\sqrt 6}{3} \\approx 0{,}816$.'],
      solution: '$6 \\cdot \\dfrac{\\sqrt 6}{3} = 2\\sqrt 6 \\approx 4{,}90$ cm.',
    },
  ],
  takeaways: [
    'Phép chiếu song song giữ song song và tỉ số độ dài trên một đường thẳng; đoạn thẳng song song với mặt phẳng chiếu vuông góc có hình chiếu bằng nó.',
    'Hình chiếu đứng (từ trước ra sau), hình chiếu bằng (từ trên xuống, đặt dưới hình chiếu đứng), hình chiếu cạnh (từ trái sang phải, đặt bên phải hình chiếu đứng).',
    'Cạnh thấy: nét liền đậm; cạnh khuất: nét đứt.',
    'Đứng và bằng cùng chiều dài; đứng và cạnh cùng chiều cao; bằng và cạnh cùng chiều rộng.',
    "Hệ số biến dạng $p = \\dfrac{O'A'}{OA}$, $q = \\dfrac{O'B'}{OB}$, $r = \\dfrac{O'C'}{OC}$.",
    'Trục đo vuông góc đều: ba góc trục đo $120^\\circ$, $p = q = r = \\dfrac{\\sqrt 6}{3} \\approx 0{,}82$, quy ước vẽ với $p = q = r = 1$.',
  ],
};
