/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khoảng cách từ một điểm đến một đường thẳng, đến một mặt phẳng; khoảng cách giữa đường thẳng và mặt phẳng song song, giữa hai mặt phẳng song song; đoạn vuông góc chung và khoảng cách giữa hai đường thẳng chéo nhau.',
  intro:
    'Hai đường ống chạy chéo nhau dưới trần một nhà xưởng không bao giờ gặp nhau. Muốn nối chúng bằng một đoạn ống ngắn nhất, ta phải đặt đoạn nối ở đâu? Câu trả lời dẫn tới khoảng cách giữa hai đường thẳng chéo nhau.',
  objectives: [
    'Xác định và tính khoảng cách từ một điểm đến một đường thẳng, đến một mặt phẳng.',
    'Tính khoảng cách giữa đường thẳng và mặt phẳng song song, giữa hai mặt phẳng song song.',
    'Xác định đường vuông góc chung và tính khoảng cách giữa hai đường thẳng chéo nhau trong những trường hợp đơn giản.',
  ],
  sections: [
    {
      heading: 'Khoảng cách từ một điểm đến một đường thẳng, đến một mặt phẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Khoảng cách từ điểm $M$ đến đường thẳng $a$, kí hiệu $d(M, a)$, là khoảng cách giữa $M$ và hình chiếu $H$ của $M$ trên $a$. Khoảng cách từ điểm $M$ đến mặt phẳng $(P)$, kí hiệu $d(M, (P))$, là khoảng cách giữa $M$ và hình chiếu $H$ của $M$ trên $(P)$.',
        },
        {
          type: 'list',
          items: [
            'Nếu $M$ thuộc $a$ (hoặc thuộc $(P)$) thì khoảng cách bằng $0$.',
            'Với mọi điểm $N$ thuộc $(P)$: $MN \\ge MH = d(M, (P))$, nên $d(M, (P))$ là độ dài nhỏ nhất của đoạn nối $M$ với một điểm của $(P)$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tìm khoảng cách từ một điểm đến một mặt phẳng',
          text: 'Tìm một mặt phẳng $(Q)$ chứa $M$ và vuông góc với $(P)$ theo giao tuyến $c$; kẻ $MH \\perp c$ trong $(Q)$. Khi đó $MH \\perp (P)$ và $d(M, (P)) = MH$.',
        },
      ],
    },
    {
      heading: 'Khoảng cách giữa đường thẳng và mặt phẳng song song, giữa hai mặt phẳng song song',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Khoảng cách giữa đường thẳng $a$ và mặt phẳng $(P)$ song song với $a$, kí hiệu $d(a, (P))$, là khoảng cách từ một điểm bất kì của $a$ đến $(P)$. Khoảng cách giữa hai mặt phẳng song song $(P)$ và $(Q)$, kí hiệu $d((P), (Q))$, là khoảng cách từ một điểm bất kì của mặt phẳng này đến mặt phẳng kia.',
        },
        {
          type: 'p',
          text: 'Các khoảng cách này không phụ thuộc vào điểm được chọn, nên ta chọn điểm sao cho dễ tính nhất.',
        },
      ],
    },
    {
      heading: 'Khoảng cách giữa hai đường thẳng chéo nhau',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường vuông góc chung',
          text: 'Đường thẳng $\\Delta$ cắt hai đường thẳng chéo nhau $a$, $b$ và vuông góc với mỗi đường thẳng ấy được gọi là đường vuông góc chung của $a$ và $b$. Nếu $\\Delta$ cắt $a$, $b$ lần lượt tại $I$, $J$ thì đoạn $IJ$ gọi là đoạn vuông góc chung của $a$ và $b$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khoảng cách giữa hai đường thẳng chéo nhau',
          text: 'Khoảng cách giữa hai đường thẳng chéo nhau $a$ và $b$, kí hiệu $d(a, b)$, là độ dài đoạn vuông góc chung của $a$ và $b$. Đó là độ dài nhỏ nhất của các đoạn thẳng nối một điểm của $a$ với một điểm của $b$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Khoảng cách giữa hai đường thẳng chéo nhau bằng khoảng cách giữa một trong hai đường thẳng đó và mặt phẳng song song với nó, chứa đường thẳng còn lại; và bằng khoảng cách giữa hai mặt phẳng song song lần lượt chứa hai đường thẳng đó.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tìm đoạn nối ngắn nhất',
    instruction:
      'Chọn một cặp đường thẳng chéo nhau của hình lập phương cạnh $a$. Dời điểm $M$ trên đường đỏ và $N$ trên đường xanh để đoạn $MN$ ngắn nhất, quan sát góc giữa $MN$ và hai đường thẳng. Khi $MN$ ngắn nhất, nó vuông góc với cả hai: đó là đoạn vuông góc chung.',
  },
  examples: [
    {
      problem:
        'Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$, $SA \\perp (ABCD)$ và $SA = a$. Tính khoảng cách từ $A$ đến mặt phẳng $(SBC)$.',
      steps: [
        '$BC \\perp AB$, $BC \\perp SA$ nên $BC \\perp (SAB)$.',
        'Kẻ $AH \\perp SB$ tại $H$. Vì $AH \\subset (SAB)$ nên $AH \\perp BC$. Vậy $AH$ vuông góc với hai đường thẳng cắt nhau $SB$, $BC$ của $(SBC)$: $AH \\perp (SBC)$.',
        'Tam giác $SAB$ vuông cân tại $A$ có $SB = a\\sqrt{2}$, nên $AH = \\dfrac{SA \\cdot AB}{SB} = \\dfrac{a^2}{a\\sqrt{2}} = \\dfrac{a\\sqrt{2}}{2}$.',
      ],
      answer: '$d(A, (SBC)) = AH = \\dfrac{a\\sqrt{2}}{2}$.',
    },
    {
      problem:
        "Cho hình lập phương $ABCD.A'B'C'D'$ cạnh $a$. Xác định đoạn vuông góc chung và tính khoảng cách giữa hai đường thẳng $AA'$ và $BD$.",
      steps: [
        'Gọi $O$ là giao điểm của $AC$ và $BD$. Ta có $AO \\perp BD$ (hai đường chéo của hình vuông).',
        "$AA' \\perp (ABCD)$ nên $AA' \\perp AO$.",
        "Đoạn $AO$ cắt cả $AA'$ và $BD$, vuông góc với cả hai: $AO$ là đoạn vuông góc chung.",
      ],
      answer: "$d(AA', BD) = AO = \\dfrac{AC}{2} = \\dfrac{a\\sqrt{2}}{2}$.",
    },
    {
      problem:
        'Với hình chóp $S.ABCD$ ở Ví dụ 1, tính khoảng cách giữa hai đường thẳng chéo nhau $AD$ và $SB$.',
      steps: [
        '$AD \\parallel BC$ và $BC \\subset (SBC)$ nên $AD \\parallel (SBC)$; mặt phẳng $(SBC)$ chứa $SB$.',
        'Theo nhận xét, $d(AD, SB) = d(AD, (SBC)) = d(A, (SBC))$.',
        'Theo Ví dụ 1, $d(A, (SBC)) = \\dfrac{a\\sqrt{2}}{2}$.',
      ],
      answer: '$d(AD, SB) = \\dfrac{a\\sqrt{2}}{2}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khoảng cách giữa hai đường thẳng chéo nhau bằng',
      options: [
        'độ dài đoạn vuông góc chung của chúng',
        'khoảng cách từ một điểm bất kì của đường này đến một điểm bất kì của đường kia',
        'khoảng cách từ một điểm của đường này đến hình chiếu của nó trên đường kia',
        'độ dài của một đoạn thẳng bất kì vuông góc với một trong hai đường',
      ],
      answer: 0,
      hints: ['Đoạn nối phải vuông góc với cả hai đường thẳng và cắt cả hai.'],
      solution:
        'Theo định nghĩa, khoảng cách giữa hai đường thẳng chéo nhau là độ dài đoạn vuông góc chung, đoạn thẳng cắt và vuông góc với cả hai đường.',
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$ cạnh $4$ cm. Tính khoảng cách từ $A$ đến mặt phẳng $(CDD'C')$.",
      answer: 4,
      unit: 'cm',
      hints: ["$AD$ có vuông góc với hai đường thẳng cắt nhau nào của $(CDD'C')$?"],
      solution:
        "$AD \\perp DC$ và $AD \\perp DD'$ nên $AD \\perp (CDD'C')$, do đó $d(A, (CDD'C')) = AD = 4$ cm.",
    },
    {
      type: 'number',
      prompt:
        'Cho hình vuông $ABCD$ cạnh $2$ cm. Tính khoảng cách từ $A$ đến đường thẳng $BD$ (làm tròn đến hàng phần trăm).',
      answer: 1.41,
      tolerance: 0.005,
      unit: 'cm',
      hints: ['Hình chiếu của $A$ trên $BD$ là tâm $O$ của hình vuông.'],
      solution:
        '$d(A, BD) = AO = \\dfrac{AC}{2} = \\dfrac{2\\sqrt{2}}{2} = \\sqrt{2} \\approx 1{,}41$ cm.',
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$ cạnh $3$ cm. Tính khoảng cách giữa hai đường thẳng $AB$ và $CC'$.",
      answer: 3,
      unit: 'cm',
      hints: ["Tìm một cạnh của hình lập phương cắt và vuông góc với cả $AB$ và $CC'$."],
      solution:
        "$BC$ cắt $AB$ tại $B$, cắt $CC'$ tại $C$; $BC \\perp AB$ và $BC \\perp CC'$. Vậy $BC$ là đoạn vuông góc chung, $d(AB, CC') = BC = 3$ cm.",
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, tam giác $ABC$ vuông tại $B$, $SA = 3$ cm, $AB = 4$ cm. Tính khoảng cách từ $A$ đến mặt phẳng $(SBC)$.',
      answer: 2.4,
      tolerance: 0.001,
      unit: 'cm',
      hints: [
        'Chứng minh $BC \\perp (SAB)$, rồi kẻ $AH \\perp SB$.',
        'Trong tam giác $SAB$ vuông tại $A$: $\\dfrac{1}{AH^2} = \\dfrac{1}{SA^2} + \\dfrac{1}{AB^2}$.',
      ],
      solution:
        '$BC \\perp AB$, $BC \\perp SA$ nên $BC \\perp (SAB)$. Kẻ $AH \\perp SB$ thì $AH \\perp BC$, nên $AH \\perp (SBC)$. $SB = 5$ cm, $AH = \\dfrac{SA \\cdot AB}{SB} = \\dfrac{12}{5} = 2{,}4$ cm.',
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$ cạnh $6$ cm. Tính khoảng cách giữa hai mặt phẳng $(ABCD)$ và $(A'B'C'D')$.",
      answer: 6,
      unit: 'cm',
      hints: ["Lấy điểm $A'$ của mặt phẳng trên và tìm hình chiếu của nó trên mặt đáy."],
      solution:
        "Hai mặt phẳng song song; $A'A \\perp (ABCD)$ nên $d((ABCD), (A'B'C'D')) = d(A', (ABCD)) = A'A = 6$ cm.",
    },
    {
      type: 'number',
      prompt:
        "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có $AB = 6$ cm, $AD = 8$ cm, $AA' = 5$ cm. Tính khoảng cách giữa hai đường thẳng $AA'$ và $BD$.",
      answer: 4.8,
      tolerance: 0.001,
      unit: 'cm',
      hints: [
        "Kẻ $AH \\perp BD$ tại $H$. $AH$ có vuông góc với $AA'$ không?",
        'Trong tam giác $ABD$ vuông tại $A$: $AH = \\dfrac{AB \\cdot AD}{BD}$.',
      ],
      solution:
        "$AA' \\perp (ABCD)$ nên $AA' \\perp AH$; lại có $AH \\perp BD$, nên $AH$ là đoạn vuông góc chung. $BD = \\sqrt{6^2 + 8^2} = 10$ cm, $AH = \\dfrac{6 \\cdot 8}{10} = 4{,}8$ cm.",
    },
    {
      type: 'choice',
      prompt: 'Đường thẳng $a$ song song với mặt phẳng $(P)$. Khẳng định nào đúng về $d(a, (P))$?',
      options: [
        'Bằng khoảng cách từ một điểm bất kì của $a$ đến $(P)$.',
        'Bằng khoảng cách từ một điểm bất kì của $(P)$ đến $a$.',
        'Bằng $0$.',
        'Phụ thuộc vào điểm được chọn trên $a$.',
      ],
      answer: 0,
      hints: ['Mọi điểm của $a$ cách đều $(P)$.'],
      solution:
        'Theo định nghĩa, $d(a, (P))$ là khoảng cách từ một điểm bất kì của $a$ đến $(P)$; giá trị này như nhau với mọi điểm của $a$. Một điểm của $(P)$ thì không nhất thiết có khoảng cách đến $a$ bằng $d(a, (P))$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ có $SA \\perp (ABCD)$. Khoảng cách từ $S$ đến mặt phẳng $(ABCD)$ là',
      options: ['$SA$', '$SB$', '$SC$', '$SO$ với $O$ là tâm của đáy'],
      answer: 0,
      hints: ['Hình chiếu của $S$ trên $(ABCD)$ là điểm nào?'],
      solution:
        '$SA \\perp (ABCD)$ nên hình chiếu của $S$ trên $(ABCD)$ là $A$, do đó $d(S, (ABCD)) = SA$.',
    },
  ],
  takeaways: [
    '$d(M, (P)) = MH$ với $H$ là hình chiếu vuông góc của $M$ trên $(P)$; đó là đoạn ngắn nhất nối $M$ với $(P)$.',
    'Đường thẳng song song với mặt phẳng, hai mặt phẳng song song: lấy khoảng cách từ một điểm dễ tính.',
    'Khoảng cách giữa hai đường thẳng chéo nhau là độ dài đoạn vuông góc chung, đoạn ngắn nhất nối hai đường.',
    'Có thể tính $d(a, b) = d(a, (Q))$ với $(Q)$ chứa $b$ và song song với $a$.',
  ],
};
