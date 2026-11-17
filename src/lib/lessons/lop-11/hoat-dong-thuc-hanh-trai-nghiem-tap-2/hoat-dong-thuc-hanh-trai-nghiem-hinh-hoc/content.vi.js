/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: cắt, gấp tờ bìa thành hình hộp, hình lăng trụ, hình chóp, hình chóp cụt và tứ diện đều; đo góc của tia nắng với mặt đất, đo góc nhị diện, tính thể tích các khối đã làm và vẽ hình lăng trụ bằng GeoGebra.',
  intro:
    'Chỉ với một tờ bìa hình vuông, thước, ê ke, compa, kéo và băng dính, em có thể làm được hộp không nắp, hình chóp tứ giác đều hay tứ diện đều. Làm xong, em đo các cạnh và tính được góc giữa mặt bên và đáy, chiều cao và thể tích của chúng.',
  objectives: [
    'Vẽ lưới phẳng (hình khai triển) của một số hình không gian rồi cắt, gấp, dán thành mô hình.',
    'Đo góc giữa tia nắng và mặt đất, đo góc nhị diện ngoài thực tế bằng tỉ số lượng giác.',
    'Tính chiều cao, thể tích các khối lăng trụ, khối chóp, khối chóp cụt đều đã làm từ các số đo.',
    'Vẽ hình lăng trụ bằng phần mềm GeoGebra.',
  ],
  sections: [
    {
      heading: 'Gấp giấy tạo hình không gian',
      blocks: [
        {
          type: 'p',
          text: 'Từ một tờ bìa hình vuông, hãy cắt, gấp và dán băng dính (các mép dán chỉ nằm trên các cạnh của hình) để tạo thành: hình hộp chữ nhật không nắp; hình lập phương không nắp; hình lăng trụ đều không có đáy (chỉ dán một cạnh bên); hình lăng trụ lục giác đều không nắp; hình chóp tứ giác đều; hình chóp cụt tứ giác đều không nắp; hình tứ diện đều (chỉ dán ba cạnh chung một đỉnh).',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lưới phẳng của một hình',
          text: 'Trải các mặt của hình ra trên mặt phẳng, mỗi mặt bên nối với đáy theo một cạnh đáy, ta được lưới phẳng (hình khai triển) của hình. Gấp các mặt bên quanh cạnh đáy cho đến khi các mép kề nhau trùng khít thì được hình ban đầu.',
        },
        {
          type: 'p',
          text: 'Hộp không nắp: từ tờ bìa hình vuông cạnh $a$, cắt bỏ ở bốn góc bốn hình vuông bằng nhau cạnh $x$ $\\left(0 < x < \\dfrac{a}{2}\\right)$ rồi gấp bốn phần còn lại lên. Hộp có đáy là hình vuông cạnh $a - 2x$, chiều cao $x$ và thể tích $$V = x(a - 2x)^2.$$',
        },
        {
          type: 'table',
          head: ['$x$ (cm)', '$1$', '$1{,}5$', '$2$', '$2{,}5$', '$3$', '$4$'],
          rows: [['$V$ (cm³)', '$100$', '$121{,}5$', '$128$', '$122{,}5$', '$108$', '$64$']],
          caption: 'Thể tích hộp không nắp cắt từ tờ bìa cạnh $a = 12$ cm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo gấp',
          text: 'Hình chóp tứ giác đều: đáy hình vuông cạnh $b$, bốn mặt bên là tam giác cân có đường cao (trung đoạn) $d > \\dfrac{b}{2}$. Hình chóp cụt tứ giác đều không nắp: mặt bên là hình thang cân, cách làm giống hộp không nắp. Tứ diện đều: một tam giác đều chia thành bốn tam giác đều nhỏ bởi ba đường trung bình, gấp ba tam giác ở góc lên.',
        },
      ],
    },
    {
      heading: 'Đo đạc và tính toán',
      blocks: [
        {
          type: 'p',
          text: 'Đo góc giữa tia nắng và mặt đất. Dựng một chiếc cọc dài $1$ m thẳng đứng trên mặt đất phẳng, đánh dấu đầu bóng của cọc rồi đo độ dài bóng. Góc $\\alpha$ giữa tia nắng và mặt đất thoả mãn $$\\tan\\alpha = \\dfrac{\\text{chiều cao cọc}}{\\text{độ dài bóng}}.$$',
        },
        { type: 'widget', name: 'shadow' },
        {
          type: 'p',
          text: 'Đo góc nhị diện. Kẻ đường thẳng $a$ trên mặt đất, dựng cọc $AB$ thẳng đứng tại điểm $A$ không thuộc $a$ (đầu cọc là $B$), gọi $H$ là hình chiếu của $A$ trên $a$. Vì $AB$ vuông góc với mặt đất và $AH \\perp a$ nên $BH \\perp a$, góc $\\widehat{BHA}$ là góc phẳng của góc nhị diện tạo bởi mặt đất và mặt phẳng $(B, a)$, với $\\tan\\widehat{BHA} = \\dfrac{AB}{AH}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đo $AH$ khi khó xác định $H$',
          text: 'Lấy hai điểm $M$, $N$ trên $a$, đo $AM$, $AN$, $MN$ rồi tính diện tích tam giác $AMN$ bằng công thức Heron $S = \\sqrt{p(p - AM)(p - AN)(p - MN)}$ ($p$ là nửa chu vi). Khi đó $AH = \\dfrac{2S}{MN}$.',
        },
        {
          type: 'p',
          text: "Tính thể tích. Đo các cạnh của mô hình đã làm, tính chiều cao và diện tích đáy rồi tính thể tích. Với hình chóp đều hoặc chóp cụt đều, chiều cao $h$ tính từ trung đoạn $d$: $h = \\sqrt{d^2 - (r - r')^2}$, trong đó $r$, $r'$ là bán kính đường tròn nội tiếp đáy lớn, đáy nhỏ (với hình chóp, $r' = 0$).",
        },
        {
          type: 'table',
          head: ['Khối', 'Thể tích'],
          rows: [
            ['Khối lăng trụ (khối hộp)', '$V = S \\cdot h$'],
            ['Khối chóp', '$V = \\dfrac{1}{3}S \\cdot h$'],
            ['Khối chóp cụt đều', "$V = \\dfrac{1}{3}h\\left(S + \\sqrt{SS'} + S'\\right)$"],
          ],
          caption: "$S$, $S'$ là diện tích hai đáy, $h$ là chiều cao.",
        },
      ],
    },
    {
      heading: 'Vẽ hình bằng phần mềm GeoGebra',
      blocks: [
        {
          type: 'p',
          text: "Mở GeoGebra (chế độ Hình học 3D) và vẽ hình lăng trụ tam giác $ABC.A'B'C'$:",
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dùng công cụ Đa giác vẽ tam giác $ABC$ làm một đáy.',
            "Sao chép tam giác đó rồi tịnh tiến bản sao đến vị trí mới, được tam giác $A'B'C'$.",
            "Nối các cặp đỉnh tương ứng: $AA'$, $BB'$, $CC'$.",
            'Chuyển các cạnh bị khuất từ nét liền sang nét đứt.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Lăng trụ đứng',
          text: 'Để được hình lăng trụ đứng, tịnh tiến bản sao theo phương thẳng đứng, khi đó các cạnh bên vuông góc với đáy.',
        },
      ],
    },
    {
      heading: 'Dự án: Bộ mô hình khối đa diện của nhóm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm $4$ đến $6$ học sinh làm một bộ mô hình từ bìa, đo đạc và tính toán trên các mô hình và ngoài sân trường, rồi trình bày kết quả.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: bìa cứng hình vuông, thước kẻ, ê ke, compa, bút, kéo, băng dính; một chiếc cọc dài $1$ m, thước dây; máy tính cầm tay; máy tính có cài GeoGebra.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ lưới phẳng của ít nhất bốn hình trong phần gấp giấy (có thể dùng khung tương tác để chọn kích thước), cắt, gấp và dán thành mô hình.',
            'Với hộp không nắp, mỗi bạn cắt từ tờ bìa cạnh $12$ cm với một giá trị $x$ khác nhau; đổ gạo hoặc cát vào để so sánh thể tích, rồi đối chiếu với công thức $V = x(12 - 2x)^2$.',
            'Đo các cạnh của các mô hình, tính chiều cao, góc giữa mặt bên và đáy, diện tích đáy và thể tích.',
            'Ra sân trường đo góc giữa tia nắng và mặt đất ở ba thời điểm khác nhau trong buổi sáng, và đo một góc nhị diện theo cách đã hướng dẫn.',
            'Vẽ lại một mô hình bằng GeoGebra.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: ảnh chụp các mô hình kèm lưới phẳng, bảng số đo và phép tính (thể tích, chiều cao, các góc), bảng góc của tia nắng theo thời điểm đo, hình vẽ GeoGebra và nhận xét về sai số giữa số đo thực tế và kết quả tính.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lưới phẳng và gấp hình',
    instruction:
      'Chọn khối cần gấp và kích thước. Bên trái là lưới phẳng để vẽ lên bìa; kéo thanh "Gấp" để các mặt bên quay quanh cạnh đáy, xoay hình bên phải bằng cách kéo hoặc phím mũi tên. Đọc góc giữa mặt bên và đáy, chiều cao và thể tích của khối đã gấp. Với hộp không nắp, tìm $x$ để hộp có thể tích lớn nhất.',
  },
  examples: [
    {
      problem:
        'Từ tờ bìa hình vuông cạnh $12$ cm, cắt bỏ bốn hình vuông cạnh $x$ cm ở bốn góc rồi gấp thành hộp không nắp. Tính thể tích hộp khi $x = 2$ và khi $x = 3$.',
      steps: [
        'Đáy hộp là hình vuông cạnh $12 - 2x$, chiều cao $x$, nên $V = x(12 - 2x)^2$.',
        '$x = 2$: $V = 2 \\cdot 8^2 = 128$ (cm³).',
        '$x = 3$: $V = 3 \\cdot 6^2 = 108$ (cm³).',
      ],
      answer:
        'Khi $x = 2$ thì $V = 128$ cm³; khi $x = 3$ thì $V = 108$ cm³. Cắt nhiều hơn chưa chắc được hộp lớn hơn.',
    },
    {
      problem:
        'Một mô hình hình chóp tứ giác đều $S.ABCD$ có cạnh đáy $6$ cm, trung đoạn (đường cao của mặt bên) $5$ cm. Tính chiều cao, thể tích của khối chóp và góc giữa mặt bên với mặt đáy.',
      steps: [
        'Gọi $O$ là tâm đáy, $M$ là trung điểm $CD$. Khi đó $OM = 3$ cm, $SM = 5$ cm và $SO \\perp OM$.',
        '$SO = \\sqrt{SM^2 - OM^2} = \\sqrt{25 - 9} = 4$ (cm).',
        '$V = \\dfrac{1}{3} \\cdot 6^2 \\cdot 4 = 48$ (cm³).',
        '$SM \\perp CD$ và $OM \\perp CD$ nên góc giữa mặt bên $(SCD)$ và đáy là $\\widehat{SMO}$, với $\\cos\\widehat{SMO} = \\dfrac{OM}{SM} = \\dfrac{3}{5}$, do đó $\\widehat{SMO} \\approx 53{,}13^\\circ$.',
      ],
      answer:
        'Chiều cao $4$ cm, thể tích $48$ cm³, góc giữa mặt bên và đáy khoảng $53{,}13^\\circ$.',
    },
    {
      problem:
        'Cọc dài $1$ m dựng thẳng đứng trên mặt đất phẳng có bóng dài $1{,}6$ m. Tính góc giữa tia nắng và mặt đất.',
      steps: [
        'Cọc, bóng và tia nắng đi qua đầu cọc tạo thành tam giác vuông tại chân cọc.',
        '$\\tan\\alpha = \\dfrac{1}{1{,}6} = 0{,}625$.',
        '$\\alpha \\approx 32^\\circ$.',
      ],
      answer: 'Tia nắng tạo với mặt đất góc khoảng $32^\\circ$.',
    },
    {
      problem:
        'Dựng cọc $AB = 1$ m thẳng đứng tại $A$, kẻ đường thẳng $a$ trên mặt đất. Lấy $M$, $N$ trên $a$ và đo được $AM = AN = 2{,}5$ m, $MN = 3$ m. Tính số đo góc nhị diện tạo bởi mặt đất và mặt phẳng chứa $a$ và $B$.',
      steps: [
        'Nửa chu vi tam giác $AMN$: $p = \\dfrac{2{,}5 + 2{,}5 + 3}{2} = 4$.',
        '$S = \\sqrt{4 \\cdot 1{,}5 \\cdot 1{,}5 \\cdot 1} = 3$ (m²), nên $AH = \\dfrac{2S}{MN} = \\dfrac{6}{3} = 2$ (m).',
        '$\\tan\\widehat{BHA} = \\dfrac{AB}{AH} = \\dfrac{1}{2}$, nên $\\widehat{BHA} \\approx 26{,}57^\\circ$.',
      ],
      answer: 'Góc nhị diện có số đo khoảng $26{,}57^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Từ tờ bìa hình vuông cạnh $20$ cm, cắt bỏ bốn hình vuông cạnh $3$ cm ở bốn góc rồi gấp thành hộp không nắp. Tính thể tích hộp.',
      answer: 588,
      unit: 'cm³',
      hints: ['Đáy hộp là hình vuông cạnh $20 - 2 \\cdot 3$; chiều cao là $3$ cm.'],
      solution: 'Đáy là hình vuông cạnh $14$ cm, chiều cao $3$ cm: $V = 3 \\cdot 14^2 = 588$ cm³.',
    },
    {
      type: 'choice',
      prompt:
        'Từ tờ bìa hình vuông cạnh $12$ cm, cắt bỏ bốn hình vuông cạnh $x$ cm ở bốn góc để gấp hộp không nắp. Với giá trị nào của $x$ dưới đây thì hộp có thể tích lớn nhất?',
      options: ['$x = 2$', '$x = 1$', '$x = 3$', '$x = 4$'],
      answer: 0,
      hints: ['Tính $V = x(12 - 2x)^2$ với từng giá trị của $x$.'],
      solution:
        '$V(1) = 100$, $V(2) = 128$, $V(3) = 108$, $V(4) = 64$ (cm³). Thể tích lớn nhất khi $x = 2$.',
    },
    {
      type: 'number',
      prompt:
        'Mô hình hình chóp tứ giác đều có cạnh đáy $8$ cm, trung đoạn $5$ cm. Tính thể tích khối chóp.',
      answer: 64,
      unit: 'cm³',
      hints: [
        'Khoảng cách từ tâm đáy đến một cạnh đáy là $4$ cm.',
        'Chiều cao $h = \\sqrt{5^2 - 4^2}$.',
      ],
      solution: '$h = \\sqrt{25 - 16} = 3$ cm, $V = \\dfrac{1}{3} \\cdot 8^2 \\cdot 3 = 64$ cm³.',
    },
    {
      type: 'number',
      prompt:
        'Với hình chóp tứ giác đều cạnh đáy $8$ cm, trung đoạn $5$ cm ở trên, tính góc giữa mặt bên và mặt đáy (làm tròn đến hàng phần mười của độ).',
      answer: 36.9,
      tolerance: 0.05,
      unit: '°',
      hints: [
        'Góc cần tìm là góc giữa trung đoạn $SM$ và đoạn $OM$ nối tâm đáy với trung điểm cạnh đáy.',
        '$\\cos\\widehat{SMO} = \\dfrac{OM}{SM}$.',
      ],
      solution:
        '$\\cos\\widehat{SMO} = \\dfrac{4}{5} = 0{,}8$, nên $\\widehat{SMO} \\approx 36{,}9^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Gấp được một tứ diện đều cạnh $6$ cm. Tính thể tích khối tứ diện đó (làm tròn đến hàng phần trăm).',
      answer: 25.46,
      tolerance: 0.006,
      unit: 'cm³',
      hints: [
        'Đáy là tam giác đều cạnh $6$ có diện tích $\\dfrac{6^2\\sqrt{3}}{4}$; hình chiếu của đỉnh là tâm đáy, cách mỗi đỉnh đáy $\\dfrac{6\\sqrt{3}}{3}$.',
        'Chiều cao $h = \\sqrt{6^2 - \\left(2\\sqrt{3}\\right)^2}$.',
      ],
      solution:
        '$S = 9\\sqrt{3}$, $h = \\sqrt{36 - 12} = 2\\sqrt{6}$, $V = \\dfrac{1}{3} \\cdot 9\\sqrt{3} \\cdot 2\\sqrt{6} = 18\\sqrt{2} \\approx 25{,}46$ cm³.',
    },
    {
      type: 'number',
      prompt:
        'Một khối chóp cụt tứ giác đều có đáy lớn là hình vuông cạnh $8$ cm, đáy nhỏ là hình vuông cạnh $4$ cm và chiều cao $3$ cm. Tính thể tích của nó.',
      answer: 112,
      unit: 'cm³',
      hints: ["$V = \\dfrac{1}{3}h\\left(S + \\sqrt{SS'} + S'\\right)$ với $S = 64$, $S' = 16$."],
      solution:
        '$V = \\dfrac{1}{3} \\cdot 3 \\cdot (64 + \\sqrt{64 \\cdot 16} + 16) = 64 + 32 + 16 = 112$ cm³.',
    },
    {
      type: 'number',
      prompt:
        'Cọc dài $1$ m dựng thẳng đứng trên mặt đất phẳng có bóng dài $1{,}19$ m. Góc giữa tia nắng và mặt đất khoảng bao nhiêu độ (làm tròn đến hàng đơn vị)?',
      answer: 40,
      tolerance: 0.5,
      unit: '°',
      hints: ['$\\tan\\alpha = \\dfrac{\\text{chiều cao cọc}}{\\text{độ dài bóng}}$.'],
      solution:
        '$\\tan\\alpha = \\dfrac{1}{1{,}19} \\approx 0{,}8403$, nên $\\alpha \\approx 40^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Cùng một thời điểm, cọc dài $1$ m dựng thẳng đứng có bóng dài $0{,}8$ m, còn một cây mọc thẳng đứng gần đó có bóng dài $12$ m. Cây cao bao nhiêu mét?',
      answer: 15,
      unit: 'm',
      hints: [
        'Tia nắng tạo với mặt đất cùng một góc $\\alpha$, nên tỉ số chiều cao : bóng như nhau.',
      ],
      solution:
        '$\\tan\\alpha = \\dfrac{1}{0{,}8} = \\dfrac{h}{12}$, nên $h = \\dfrac{12}{0{,}8} = 15$ m.',
    },
    {
      type: 'number',
      prompt:
        'Để đo góc nhị diện, bạn Nam lấy hai điểm $M$, $N$ trên đường thẳng $a$ và đo được $AM = 1{,}3$ m, $AN = 1{,}5$ m, $MN = 1{,}4$ m. Tính khoảng cách $AH$ từ $A$ đến đường thẳng $a$.',
      answer: 1.2,
      tolerance: 0.001,
      unit: 'm',
      hints: [
        'Tính diện tích tam giác $AMN$ bằng công thức Heron, nửa chu vi $p = 2{,}1$.',
        '$AH = \\dfrac{2S}{MN}$.',
      ],
      solution:
        '$S = \\sqrt{2{,}1 \\cdot 0{,}8 \\cdot 0{,}6 \\cdot 0{,}7} = \\sqrt{0{,}7056} = 0{,}84$ m², nên $AH = \\dfrac{2 \\cdot 0{,}84}{1{,}4} = 1{,}2$ m.',
    },
    {
      type: 'number',
      prompt:
        'Mô hình lăng trụ lục giác đều không nắp có cạnh đáy $3$ cm, chiều cao $5$ cm. Tính thể tích của khối lăng trụ (làm tròn đến hàng phần mười).',
      answer: 116.9,
      tolerance: 0.05,
      unit: 'cm³',
      hints: [
        'Lục giác đều cạnh $3$ gồm $6$ tam giác đều cạnh $3$.',
        '$S = 6 \\cdot \\dfrac{3^2\\sqrt{3}}{4}$, rồi $V = S \\cdot h$.',
      ],
      solution:
        '$S = \\dfrac{27\\sqrt{3}}{2} \\approx 23{,}383$ cm², $V = S \\cdot 5 = \\dfrac{135\\sqrt{3}}{2} \\approx 116{,}9$ cm³.',
    },
    {
      type: 'order',
      prompt: "Sắp xếp các bước vẽ hình lăng trụ tam giác $ABC.A'B'C'$ bằng GeoGebra.",
      items: [
        'Vẽ tam giác $ABC$ bằng công cụ Đa giác.',
        "Sao chép tam giác rồi tịnh tiến bản sao, được tam giác $A'B'C'$.",
        "Nối $AA'$, $BB'$, $CC'$.",
        'Chuyển các cạnh bị khuất sang nét đứt.',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Cần có đủ hai đáy trước khi nối các cạnh bên.'],
      solution:
        'Vẽ một đáy, tạo đáy thứ hai bằng phép tịnh tiến, nối các cạnh bên rồi mới xác định cạnh khuất để vẽ nét đứt.',
    },
  ],
  takeaways: [
    'Lưới phẳng của một hình gồm đáy và các mặt bên nối với đáy theo cạnh đáy; gấp các mặt bên quanh cạnh đáy được hình.',
    'Hộp không nắp cắt từ tờ bìa vuông cạnh $a$: $V = x(a - 2x)^2$, không phải cắt càng nhiều càng tốt.',
    'Góc giữa tia nắng và mặt đất: $\\tan\\alpha = \\dfrac{\\text{chiều cao cọc}}{\\text{độ dài bóng}}$; góc nhị diện: $\\tan\\widehat{BHA} = \\dfrac{AB}{AH}$, $AH = \\dfrac{2S}{MN}$.',
    "Thể tích: lăng trụ $Sh$, chóp $\\dfrac{1}{3}Sh$, chóp cụt đều $\\dfrac{1}{3}h\\left(S + \\sqrt{SS'} + S'\\right)$.",
  ],
};
