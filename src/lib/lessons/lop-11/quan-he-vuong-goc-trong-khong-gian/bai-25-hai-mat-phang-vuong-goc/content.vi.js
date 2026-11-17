/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Góc giữa hai mặt phẳng, hai mặt phẳng vuông góc và điều kiện để hai mặt phẳng vuông góc, góc nhị diện và góc phẳng nhị diện, hình lăng trụ đứng và hình chóp đều.',
  intro:
    'Mở một cuốn sách đặt trên bàn: hai trang sách có chung gáy và tạo thành một "góc" trong không gian. Mở rộng dần, đến lúc trang sách dựng đứng thì nó vuông góc với mặt bàn. Bài học này cho biết cách đo góc ấy.',
  objectives: [
    'Nhận biết góc giữa hai mặt phẳng và hai mặt phẳng vuông góc.',
    'Vận dụng điều kiện và tính chất của hai mặt phẳng vuông góc.',
    'Xác định góc phẳng nhị diện và tính số đo góc nhị diện.',
    'Nhận biết hình lăng trụ đứng, lăng trụ đều, hình hộp đứng, hình chóp đều và hình chóp cụt đều.',
  ],
  sections: [
    {
      heading: 'Góc giữa hai mặt phẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Góc giữa hai mặt phẳng $(P)$ và $(Q)$ bằng góc giữa hai đường thẳng $a$ và $b$ lần lượt vuông góc với $(P)$ và $(Q)$. Kí hiệu $((P), (Q))$.',
        },
        {
          type: 'list',
          items: [
            '$0^\\circ \\le ((P), (Q)) \\le 90^\\circ$; hai mặt phẳng song song hoặc trùng nhau tạo góc $0^\\circ$.',
            'Khi $(P)$ và $(Q)$ cắt nhau theo giao tuyến $c$: lấy một điểm $O$ trên $c$, kẻ đường thẳng $m \\subset (P)$ và $n \\subset (Q)$ cùng vuông góc với $c$ tại $O$. Khi đó $((P), (Q)) = (m, n)$.',
          ],
        },
      ],
    },
    {
      heading: 'Hai mặt phẳng vuông góc',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Hai mặt phẳng $(P)$ và $(Q)$ được gọi là vuông góc với nhau nếu góc giữa chúng bằng $90^\\circ$. Kí hiệu $(P) \\perp (Q)$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điều kiện để hai mặt phẳng vuông góc',
          text: 'Hai mặt phẳng vuông góc với nhau nếu mặt phẳng này chứa một đường thẳng vuông góc với mặt phẳng kia.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Nếu hai mặt phẳng vuông góc với nhau thì bất kì đường thẳng nào nằm trong mặt phẳng này mà vuông góc với giao tuyến cũng vuông góc với mặt phẳng kia.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hệ quả',
          text: 'Nếu hai mặt phẳng cắt nhau và cùng vuông góc với mặt phẳng thứ ba thì giao tuyến của chúng vuông góc với mặt phẳng thứ ba.',
        },
      ],
    },
    {
      heading: 'Góc nhị diện',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc nhị diện',
          text: 'Hình gồm hai nửa mặt phẳng $(P)$, $(Q)$ có chung bờ $a$ được gọi là một góc nhị diện, kí hiệu $[P, a, Q]$. Đường thẳng $a$ là cạnh, các nửa mặt phẳng $(P)$, $(Q)$ là các mặt của góc nhị diện.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc phẳng nhị diện',
          text: 'Từ một điểm $O$ bất kì thuộc cạnh $a$, vẽ các tia $Ox$, $Oy$ lần lượt thuộc $(P)$, $(Q)$ và vuông góc với $a$. Góc $xOy$ gọi là một góc phẳng của góc nhị diện. Số đo của góc nhị diện là số đo của góc phẳng nhị diện; nó không phụ thuộc vào vị trí của $O$.',
        },
        {
          type: 'list',
          items: [
            'Số đo góc nhị diện nằm trong khoảng từ $0^\\circ$ đến $180^\\circ$.',
            'Góc nhị diện vuông, nhọn, tù khi số đo của nó bằng, nhỏ hơn, lớn hơn $90^\\circ$.',
            'Với các điểm $S$, $A$ nằm ngoài đường thẳng $BC$, góc nhị diện có cạnh $BC$ và hai mặt chứa $S$, $A$ được kí hiệu $[S, BC, A]$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách xác định góc phẳng nhị diện $[S, BC, A]$ khi $SA \\perp (ABC)$',
          text: 'Kẻ $AH \\perp BC$ tại $H$. Theo định lí ba đường vuông góc, $SH \\perp BC$. Khi đó $\\widehat{SHA}$ là góc phẳng nhị diện $[S, BC, A]$.',
        },
      ],
    },
    {
      heading: 'Hình lăng trụ đứng, hình chóp đều',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Đặc điểm'],
          rows: [
            [
              'Hình lăng trụ đứng',
              'Hình lăng trụ có các cạnh bên vuông góc với mặt đáy; các mặt bên là hình chữ nhật và vuông góc với mặt đáy.',
            ],
            [
              'Hình lăng trụ đều',
              'Hình lăng trụ đứng có đáy là đa giác đều; các mặt bên là những hình chữ nhật bằng nhau.',
            ],
            ['Hình hộp đứng', 'Hình lăng trụ đứng có đáy là hình bình hành.'],
            ['Hình hộp chữ nhật', 'Hình hộp đứng có đáy là hình chữ nhật.'],
            ['Hình lập phương', 'Hình hộp chữ nhật có tất cả các cạnh bằng nhau.'],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình chóp đều',
          text: 'Hình chóp đều là hình chóp có đáy là đa giác đều và các cạnh bên bằng nhau. Hình chiếu của đỉnh trên mặt đáy là tâm $O$ của đáy; các mặt bên là những tam giác cân bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình chóp cụt đều',
          text: 'Cắt hình chóp đều bởi một mặt phẳng song song với đáy, phần nằm giữa mặt phẳng đó và đáy là một hình chóp cụt đều. Hai đáy là hai đa giác đều đồng dạng, các mặt bên là những hình thang cân bằng nhau; đoạn nối tâm hai đáy là đường cao.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mở cuốn sách',
    instruction:
      'Hai trang sách là hai mặt của góc nhị diện, gáy sách là cạnh $a$. Mở sách và đọc số đo góc nhị diện. Thử đổi góc giữa hai tia $Ox$, $Oy$ và gáy: khi hai tia không vuông góc với gáy, góc $xOy$ không còn là góc phẳng nhị diện. Dời điểm $O$ dọc gáy để thấy số đo không đổi.',
  },
  examples: [
    {
      problem:
        'Cho hình chóp $S.ABCD$ có đáy là hình vuông và $SA \\perp (ABCD)$. Chứng minh $(SBC) \\perp (SAB)$ và $(SBD) \\perp (SAC)$.',
      steps: [
        '$BC \\perp AB$ và $BC \\perp SA$ nên $BC \\perp (SAB)$.',
        'Mặt phẳng $(SBC)$ chứa $BC$ vuông góc với $(SAB)$ nên $(SBC) \\perp (SAB)$.',
        '$BD \\perp AC$ và $BD \\perp SA$ nên $BD \\perp (SAC)$; $(SBD)$ chứa $BD$ nên $(SBD) \\perp (SAC)$.',
      ],
      answer: '$(SBC) \\perp (SAB)$ và $(SBD) \\perp (SAC)$.',
    },
    {
      problem:
        'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ đều cạnh $a$ và $SA = \\dfrac{a}{2}$. Tính số đo góc nhị diện $[S, BC, A]$.',
      steps: [
        'Gọi $M$ là trung điểm của $BC$. Tam giác $ABC$ đều nên $AM \\perp BC$ và $AM = \\dfrac{a\\sqrt{3}}{2}$.',
        '$AM$ là hình chiếu của $SM$ trên $(ABC)$, nên theo định lí ba đường vuông góc $SM \\perp BC$.',
        'Vậy $\\widehat{SMA}$ là góc phẳng nhị diện $[S, BC, A]$.',
        'Tam giác $SAM$ vuông tại $A$: $\\tan\\widehat{SMA} = \\dfrac{SA}{AM} = \\dfrac{a}{2} : \\dfrac{a\\sqrt{3}}{2} = \\dfrac{1}{\\sqrt{3}}$.',
      ],
      answer: 'Góc nhị diện $[S, BC, A]$ bằng $30^\\circ$.',
    },
    {
      problem:
        'Cho hình chóp tứ giác đều $S.ABCD$ có tất cả các cạnh bằng $a$, $O$ là tâm của đáy. Tính số đo góc nhị diện $[S, CD, A]$ (làm tròn đến hàng phần mười của độ).',
      steps: [
        'Hình chóp đều nên $SO \\perp (ABCD)$. $OA = \\dfrac{a\\sqrt{2}}{2}$, $SO = \\sqrt{SA^2 - OA^2} = \\sqrt{a^2 - \\dfrac{a^2}{2}} = \\dfrac{a\\sqrt{2}}{2}$.',
        'Gọi $M$ là trung điểm của $CD$: $OM \\perp CD$, $OM = \\dfrac{a}{2}$, và $SM \\perp CD$ (tam giác $SCD$ cân tại $S$).',
        'Do đó $\\widehat{SMO}$ là góc phẳng nhị diện $[S, CD, A]$, với $\\tan\\widehat{SMO} = \\dfrac{SO}{OM} = \\sqrt{2}$.',
      ],
      answer: 'Góc nhị diện $[S, CD, A]$ có số đo khoảng $54{,}7^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hai mặt phẳng $(P)$ và $(Q)$ vuông góc với nhau nếu',
      options: [
        '$(P)$ chứa một đường thẳng vuông góc với $(Q)$',
        '$(P)$ chứa một đường thẳng song song với $(Q)$',
        '$(P)$ chứa một đường thẳng vuông góc với một đường thẳng của $(Q)$',
        '$(P)$ và $(Q)$ cùng chứa một đường thẳng',
      ],
      answer: 0,
      hints: ['Nhớ lại điều kiện để hai mặt phẳng vuông góc.'],
      solution:
        'Theo điều kiện để hai mặt phẳng vuông góc: nếu $(P)$ chứa một đường thẳng vuông góc với $(Q)$ thì $(P) \\perp (Q)$. Vuông góc với chỉ một đường thẳng của $(Q)$ thì chưa đủ.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình vuông và $SA \\perp (ABCD)$. Mặt phẳng nào vuông góc với mặt phẳng $(SAC)$?',
      options: ['$(SBD)$', '$(SAB)$', '$(SCD)$', '$(SBC)$'],
      answer: 0,
      hints: [
        'Tìm một đường thẳng vuông góc với $(SAC)$: đường chéo nào của đáy vuông góc với $AC$?',
      ],
      solution:
        '$BD \\perp AC$, $BD \\perp SA$ nên $BD \\perp (SAC)$. Mặt phẳng $(SBD)$ chứa $BD$ nên $(SBD) \\perp (SAC)$.',
    },
    {
      type: 'choice',
      prompt: 'Số đo của một góc nhị diện có thể nhận giá trị trong khoảng nào?',
      options: [
        'Từ $0^\\circ$ đến $180^\\circ$',
        'Từ $0^\\circ$ đến $90^\\circ$',
        'Từ $0^\\circ$ đến $360^\\circ$',
        'Từ $90^\\circ$ đến $180^\\circ$',
      ],
      answer: 0,
      hints: ['Góc phẳng nhị diện $xOy$ là một góc thông thường tạo bởi hai tia.'],
      solution:
        'Số đo góc nhị diện là số đo góc phẳng $xOy$, nằm trong khoảng từ $0^\\circ$ đến $180^\\circ$ (khác với góc giữa hai mặt phẳng, chỉ từ $0^\\circ$ đến $90^\\circ$).',
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ vuông tại $B$ và $SA = AB = 3$ cm. Tính số đo góc nhị diện $[S, BC, A]$ (theo độ).',
      answer: 45,
      unit: '°',
      hints: [
        '$AB \\perp BC$; hãy chứng minh $SB \\perp BC$.',
        'Góc phẳng nhị diện là $\\widehat{SBA}$.',
      ],
      solution:
        '$AB \\perp BC$ và $SB \\perp BC$ (định lí ba đường vuông góc), nên $\\widehat{SBA}$ là góc phẳng nhị diện $[S, BC, A]$. $\\tan\\widehat{SBA} = \\dfrac{SA}{AB} = 1$, do đó góc bằng $45^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $2$ cm, $O$ là tâm của đáy và chiều cao $SO = \\sqrt{3}$ cm. Tính số đo góc nhị diện $[S, CD, A]$ (theo độ).',
      answer: 60,
      unit: '°',
      hints: [
        'Gọi $M$ là trung điểm của $CD$: $OM \\perp CD$ và $SM \\perp CD$.',
        '$OM$ bằng nửa cạnh đáy.',
      ],
      solution:
        '$\\widehat{SMO}$ là góc phẳng nhị diện $[S, CD, A]$; $OM = 1$ cm, $\\tan\\widehat{SMO} = \\dfrac{SO}{OM} = \\sqrt{3}$, nên góc bằng $60^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$. Tính số đo góc nhị diện $[B, AA', C]$ (theo độ).",
      answer: 45,
      unit: '°',
      hints: [
        "$AB$ và $AC$ có vuông góc với cạnh $AA'$ không?",
        'Góc phẳng nhị diện là góc nào trong mặt đáy?',
      ],
      solution:
        "$AB \\perp AA'$, $AC \\perp AA'$ với $AB \\subset (ABB'A')$, $AC \\subset (ACC'A')$, nên $\\widehat{BAC}$ là góc phẳng nhị diện $[B, AA', C]$. $\\widehat{BAC} = 45^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        'Góc nhị diện $[P, a, Q]$ có số đo $120^\\circ$. Tính góc giữa hai mặt phẳng chứa hai mặt $(P)$ và $(Q)$ của nó (theo độ).',
      answer: 60,
      unit: '°',
      hints: ['Góc giữa hai mặt phẳng không vượt quá $90^\\circ$.'],
      solution:
        'Hai đường thẳng chứa hai tia của góc phẳng nhị diện tạo với nhau góc $180^\\circ - 120^\\circ = 60^\\circ$, nên góc giữa hai mặt phẳng là $60^\\circ$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng về hình lăng trụ đứng.',
      options: [
        'Các cạnh bên vuông góc với mặt đáy.',
        'Các mặt bên là hình chữ nhật.',
        'Các mặt bên vuông góc với mặt đáy.',
        'Đáy là đa giác đều.',
        'Các cạnh bên bằng cạnh đáy.',
      ],
      answers: [0, 1, 2],
      hints: [
        'Đáy là đa giác đều là đặc điểm của hình lăng trụ đều, không phải mọi lăng trụ đứng.',
      ],
      solution:
        'Lăng trụ đứng có cạnh bên vuông góc với đáy, nên các mặt bên là hình chữ nhật và vuông góc với đáy. Đáy chỉ là đa giác đều khi đó là lăng trụ đều; cạnh bên không nhất thiết bằng cạnh đáy.',
    },
    {
      type: 'choice',
      prompt:
        'Hai mặt phẳng $(P)$ và $(Q)$ cắt nhau theo giao tuyến $d$ và cùng vuông góc với mặt phẳng $(R)$. Khi đó',
      options: ['$d \\perp (R)$', '$d \\parallel (R)$', '$d \\subset (R)$', '$(P) \\parallel (Q)$'],
      answer: 0,
      hints: [
        'Hãy nghĩ tới hai bức tường cạnh nhau cùng vuông góc với mặt sàn: góc tường thế nào với sàn?',
      ],
      solution:
        'Theo hệ quả, hai mặt phẳng cắt nhau cùng vuông góc với mặt phẳng thứ ba thì giao tuyến của chúng vuông góc với mặt phẳng thứ ba: $d \\perp (R)$.',
    },
  ],
  takeaways: [
    'Góc giữa hai mặt phẳng cắt nhau: góc giữa hai đường thẳng nằm trong hai mặt phẳng và cùng vuông góc với giao tuyến tại một điểm; từ $0^\\circ$ đến $90^\\circ$.',
    'Mặt phẳng này chứa một đường thẳng vuông góc với mặt phẳng kia thì hai mặt phẳng vuông góc.',
    'Góc phẳng nhị diện $xOy$ có $Ox$, $Oy$ vuông góc với cạnh; số đo góc nhị diện từ $0^\\circ$ đến $180^\\circ$.',
    'Khi $SA \\perp (ABC)$, kẻ $AH \\perp BC$ thì $\\widehat{SHA}$ là góc phẳng nhị diện $[S, BC, A]$.',
    'Hình chóp đều: đáy là đa giác đều, các cạnh bên bằng nhau, chân đường cao là tâm của đáy.',
  ],
};
