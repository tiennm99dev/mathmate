/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép chiếu song song lên một mặt phẳng theo một phương, các tính chất được giữ nguyên và cách vẽ hình biểu diễn của một hình không gian.',
  intro:
    'Dưới nắng, bóng của khung cửa sổ hình chữ nhật in trên sàn thành một hình bình hành: các tia nắng gần như song song với nhau. Cái bóng giữ lại điều gì của khung cửa và làm mất điều gì? Câu trả lời giải thích vì sao ta vẽ hình không gian trên trang giấy như trong sách.',
  objectives: [
    'Nêu khái niệm phép chiếu song song, mặt phẳng chiếu, phương chiếu, hình chiếu.',
    'Vận dụng các tính chất của phép chiếu song song.',
    'Vẽ hình biểu diễn của các hình phẳng và hình không gian đơn giản.',
  ],
  sections: [
    {
      heading: 'Khái niệm phép chiếu song song',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép chiếu song song',
          text: "Cho mặt phẳng $(P)$ và đường thẳng $l$ cắt $(P)$. Với mỗi điểm $M$ trong không gian, đường thẳng đi qua $M$ và song song hoặc trùng với $l$ cắt $(P)$ tại điểm $M'$. Điểm $M'$ gọi là hình chiếu song song (hay ảnh) của $M$ trên $(P)$ theo phương $l$. Phép đặt tương ứng mỗi điểm $M$ với ảnh $M'$ của nó gọi là phép chiếu song song lên $(P)$ theo phương $l$.",
        },
        {
          type: 'list',
          items: [
            '$(P)$ gọi là mặt phẳng chiếu, $l$ gọi là phương chiếu.',
            "Nếu $M \\in (P)$ thì $M' = M$.",
            'Hình chiếu song song của một hình $\\mathcal{H}$ là tập hợp hình chiếu của tất cả các điểm thuộc $\\mathcal{H}$.',
            'Một đường thẳng song song hoặc trùng với $l$ có hình chiếu là một điểm.',
          ],
        },
      ],
    },
    {
      heading: 'Tính chất của phép chiếu song song',
      blocks: [
        {
          type: 'p',
          text: 'Xét các đoạn thẳng và đường thẳng không song song hoặc trùng với phương chiếu. Phép chiếu song song:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Biến ba điểm thẳng hàng thành ba điểm thẳng hàng và không làm thay đổi thứ tự của chúng; biến đường thẳng thành đường thẳng, tia thành tia, đoạn thẳng thành đoạn thẳng.',
            'Biến hai đường thẳng song song thành hai đường thẳng song song hoặc trùng nhau.',
            'Không làm thay đổi tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song hoặc cùng nằm trên một đường thẳng.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Phép chiếu song song nói chung không giữ độ dài, độ lớn góc, và tỉ số của hai đoạn thẳng không song song. Chẳng hạn ảnh của một góc vuông có thể là góc nhọn hoặc góc tù.',
        },
        {
          type: 'p',
          text: "Hệ quả: trung điểm của đoạn thẳng có ảnh là trung điểm của đoạn thẳng ảnh; trọng tâm $G$ của tam giác $ABC$ có ảnh là trọng tâm $G'$ của tam giác ảnh $A'B'C'$.",
        },
      ],
    },
    {
      heading: 'Hình biểu diễn của một hình không gian',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình biểu diễn',
          text: 'Hình biểu diễn của một hình $\\mathcal{H}$ trong không gian là hình chiếu song song của $\\mathcal{H}$ trên một mặt phẳng theo một phương chiếu nào đó, hoặc hình đồng dạng với hình chiếu đó.',
        },
        {
          type: 'table',
          caption: 'Hình biểu diễn của một số hình phẳng',
          head: ['Hình trong thực tế', 'Hình biểu diễn'],
          rows: [
            ['Tam giác (đều, cân, vuông, …)', 'Một tam giác bất kì'],
            ['Hình bình hành, hình chữ nhật, hình thoi, hình vuông', 'Một hình bình hành'],
            ['Hình thang có hai đáy tỉ lệ $k$', 'Một hình thang có hai đáy tỉ lệ $k$'],
            ['Đường tròn', 'Một đường elip (hoặc một đường tròn)'],
          ],
        },
        {
          type: 'p',
          text: 'Khi vẽ hình biểu diễn, phải giữ các quan hệ mà phép chiếu song song giữ: song song, thẳng hàng, trung điểm, tỉ số trên cùng một đường thẳng hoặc trên hai đường thẳng song song. Đường bị che khuất vẽ bằng nét đứt.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đèn chiếu và bóng của hình',
    instruction:
      'Chọn một hình, rồi đổi hướng và độ nghiêng của phương chiếu $l$ để thấy hình chiếu (màu cam) trên mặt phẳng $(P)$ thay đổi. Các dòng xanh lá là điều luôn được giữ nguyên, các dòng vàng là điều thay đổi. Kéo hoặc dùng phím mũi tên để xoay hình.',
  },
  examples: [
    {
      problem:
        "Tam giác $ABC$ có $M$ là trung điểm của $BC$ và $G$ là trọng tâm. Qua phép chiếu song song, $A$, $B$, $C$, $M$, $G$ có ảnh lần lượt là $A'$, $B'$, $C'$, $M'$, $G'$. Chứng minh $G'$ là trọng tâm tam giác $A'B'C'$.",
      steps: [
        "$B$, $M$, $C$ thẳng hàng và $\\dfrac{BM}{MC} = 1$, nên $B'$, $M'$, $C'$ thẳng hàng và $\\dfrac{B'M'}{M'C'} = 1$: $M'$ là trung điểm $B'C'$.",
        "$A$, $G$, $M$ thẳng hàng với $\\dfrac{AG}{GM} = 2$, nên $G' \\in A'M'$ và $\\dfrac{A'G'}{G'M'} = 2$.",
        "$A'M'$ là trung tuyến của tam giác $A'B'C'$ và $G'$ chia nó theo tỉ số $2$.",
      ],
      answer: "$G'$ là trọng tâm của tam giác $A'B'C'$.",
    },
    {
      problem: 'Vẽ hình biểu diễn của hình thang $ABCD$ có $AB \\parallel CD$ và $AB = 2CD$.',
      steps: [
        "Vẽ đoạn thẳng $A'B'$ bất kì.",
        "Vẽ đoạn $D'C'$ song song với $A'B'$ (cùng chiều) với $D'C' = \\dfrac{1}{2}A'B'$, không nằm trên đường thẳng $A'B'$.",
        'Phép chiếu song song giữ song song và tỉ số hai đoạn thẳng song song, nên tỉ số hai đáy vẫn là $2$.',
      ],
      answer: "Hình thang $A'B'C'D'$ có $A'B' \\parallel D'C'$ và $A'B' = 2D'C'$.",
    },
    {
      problem: 'Vẽ hình biểu diễn của lục giác đều $ABCDEF$.',
      steps: [
        'Gọi $O$ là tâm lục giác đều. Tứ giác $OABC$ là hình thoi, và $D$, $E$, $F$ lần lượt đối xứng với $A$, $B$, $C$ qua $O$.',
        "Vẽ hình bình hành $O'A'B'C'$ bất kì để biểu diễn hình thoi $OABC$.",
        "Lấy $D'$, $E'$, $F'$ lần lượt đối xứng với $A'$, $B'$, $C'$ qua $O'$ (phép chiếu giữ trung điểm).",
      ],
      answer: "Lục giác $A'B'C'D'E'F'$ dựng như trên là hình biểu diễn của lục giác đều.",
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Qua phép chiếu song song (phương chiếu không song song với chúng), hai đường thẳng song song có hình chiếu là',
      options: [
        'hai đường thẳng song song hoặc trùng nhau',
        'luôn là hai đường thẳng song song',
        'hai đường thẳng có thể cắt nhau',
        'hai đường thẳng chéo nhau',
      ],
      answer: 0,
      hints: [
        'Hình chiếu nằm trong cùng một mặt phẳng chiếu. Hai đường thẳng song song có thể có cùng một hình chiếu không?',
      ],
      solution:
        'Theo tính chất 2, ảnh là hai đường thẳng song song hoặc trùng nhau (trùng nhau khi mặt phẳng chứa chúng song song với phương chiếu). Chúng không thể cắt nhau, và hai đường thẳng trong cùng một mặt phẳng không thể chéo nhau.',
    },
    {
      type: 'multi',
      prompt: 'Phép chiếu song song luôn giữ nguyên những gì dưới đây?',
      options: [
        'Tỉ số độ dài hai đoạn thẳng cùng nằm trên một đường thẳng',
        'Trung điểm của một đoạn thẳng',
        'Tính thẳng hàng và thứ tự của ba điểm thẳng hàng',
        'Độ lớn của góc',
        'Độ dài đoạn thẳng',
      ],
      answers: [0, 1, 2],
      hints: [
        'Một góc vuông có thể có ảnh là góc nhọn. Bóng của một chiếc gậy có thể dài hơn chiếc gậy.',
      ],
      solution:
        'Phép chiếu song song giữ tính thẳng hàng, thứ tự, tỉ số độ dài trên một đường thẳng (nên giữ trung điểm). Nó không giữ góc và độ dài.',
    },
    {
      type: 'choice',
      prompt:
        'Hình chiếu song song của một tam giác đều (mặt phẳng chứa tam giác không song song với phương chiếu) có thể là',
      options: [
        'một tam giác bất kì',
        'chỉ một tam giác đều',
        'chỉ một tam giác cân',
        'một hình bình hành',
      ],
      answer: 0,
      hints: ['Phép chiếu song song không giữ góc và độ dài.'],
      solution:
        'Mọi tam giác đều có thể là hình biểu diễn của một tam giác đều, nên hình chiếu của tam giác đều có thể là một tam giác bất kì.',
    },
    {
      type: 'number',
      prompt:
        "Điểm $M$ nằm trên đoạn $AB$ với $AM = 2$ cm, $MB = 3$ cm. Qua một phép chiếu song song, $A$, $M$, $B$ có ảnh $A'$, $M'$, $B'$ với $A'M' = 3$ cm. Tính $M'B'$.",
      answer: 4.5,
      unit: 'cm',
      hints: ['Tỉ số $\\dfrac{AM}{MB}$ được giữ nguyên.'],
      solution:
        "$\\dfrac{A'M'}{M'B'} = \\dfrac{AM}{MB} = \\dfrac{2}{3}$, nên $M'B' = \\dfrac{3 \\cdot 3}{2} = 4{,}5$ cm.",
    },
    {
      type: 'choice',
      prompt: 'Hình biểu diễn của một hình vuông là',
      options: [
        'một hình bình hành',
        'chỉ có thể là hình vuông',
        'một hình thang không là hình bình hành',
        'chỉ có thể là hình thoi',
      ],
      answer: 0,
      hints: ['Hai cặp cạnh đối song song có ảnh thế nào? Góc vuông có được giữ không?'],
      solution:
        'Các cặp cạnh đối song song có ảnh song song, nhưng góc và tỉ số hai cạnh kề không được giữ, nên hình biểu diễn của hình vuông là một hình bình hành.',
    },
    {
      type: 'number',
      prompt:
        "Hình thang $ABCD$ có $AB \\parallel CD$, $AB = 6$ cm, $CD = 4$ cm. Trong một hình biểu diễn $A'B'C'D'$ của nó, $A'B' = 9$ cm. Tính $C'D'$.",
      answer: 6,
      unit: 'cm',
      hints: ['$AB$ và $CD$ nằm trên hai đường thẳng song song: tỉ số độ dài được giữ.'],
      solution:
        "$\\dfrac{C'D'}{A'B'} = \\dfrac{CD}{AB} = \\dfrac{4}{6}$, nên $C'D' = \\dfrac{2}{3} \\cdot 9 = 6$ cm.",
    },
    {
      type: 'number',
      prompt:
        "Tam giác $ABC$ có trọng tâm $G$, $M$ là trung điểm $BC$. Qua một phép chiếu song song, đoạn $AM$ có ảnh $A'M'$ dài $6$ cm. Tính $A'G'$.",
      answer: 4,
      unit: 'cm',
      hints: [
        '$G$ nằm trên $AM$ với $AG = \\dfrac{2}{3}AM$.',
        'Tỉ số trên một đường thẳng được giữ.',
      ],
      solution:
        "$\\dfrac{A'G'}{A'M'} = \\dfrac{AG}{AM} = \\dfrac{2}{3}$, nên $A'G' = \\dfrac{2}{3} \\cdot 6 = 4$ cm.",
    },
    {
      type: 'choice',
      prompt: 'Người ta thường dùng hình nào để biểu diễn một đường tròn?',
      options: ['Đường elip', 'Hình vuông', 'Hình bình hành', 'Đoạn thẳng'],
      answer: 0,
      hints: ['Hãy xem ảnh của đường tròn trong phần Khám phá.'],
      solution:
        'Khi mặt phẳng chứa đường tròn không song song với phương chiếu, hình chiếu song song của đường tròn là một đường elip (hoặc một đường tròn), nên ta dùng đường elip để biểu diễn đường tròn.',
    },
  ],
  takeaways: [
    "Phép chiếu song song lên $(P)$ theo phương $l$ biến điểm $M$ thành giao điểm $M'$ của $(P)$ với đường thẳng qua $M$ song song (hoặc trùng) với $l$.",
    'Nó giữ thẳng hàng và thứ tự, biến hai đường thẳng song song thành song song hoặc trùng nhau, giữ tỉ số hai đoạn thẳng trên một đường thẳng hoặc trên hai đường thẳng song song.',
    'Nó không giữ độ dài và góc; vì vậy tam giác bất kì biểu diễn tam giác đều, hình bình hành biểu diễn hình vuông, elip biểu diễn đường tròn.',
  ],
};
