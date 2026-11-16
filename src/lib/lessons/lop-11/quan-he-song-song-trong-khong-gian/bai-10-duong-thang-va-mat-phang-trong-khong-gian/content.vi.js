/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mặt phẳng và cách biểu diễn, các tính chất thừa nhận, ba cách xác định một mặt phẳng, giao tuyến của hai mặt phẳng, hình chóp và hình tứ diện.',
  intro:
    'Một chiếc bàn ba chân không bao giờ cập kênh, còn bàn bốn chân thì có thể. Vì sao vậy? Câu trả lời nằm ở một tính chất cơ bản của hình học không gian: qua ba điểm không thẳng hàng có đúng một mặt phẳng. Bài này mở đầu hình học không gian với điểm, đường thẳng, mặt phẳng và hai hình quen thuộc: hình chóp, hình tứ diện.',
  objectives: [
    'Biểu diễn mặt phẳng, dùng các kí hiệu $A \\in (P)$, $d \\subset (P)$.',
    'Phát biểu các tính chất thừa nhận của hình học không gian.',
    'Biết ba cách xác định một mặt phẳng.',
    'Tìm giao tuyến của hai mặt phẳng bằng cách tìm hai điểm chung.',
    'Nhận biết hình chóp, hình tứ diện và các yếu tố của chúng.',
  ],
  sections: [
    {
      heading: 'Mặt phẳng và cách biểu diễn',
      blocks: [
        {
          type: 'p',
          text: 'Mặt bảng, mặt bàn, mặt hồ yên lặng cho ta hình ảnh một phần của mặt phẳng. Mặt phẳng không có bề dày và không có giới hạn.',
        },
        {
          type: 'list',
          items: [
            'Để biểu diễn mặt phẳng, ta thường vẽ một hình bình hành và ghi tên mặt phẳng vào một góc của nó.',
            'Tên mặt phẳng là một chữ cái in hoa hoặc chữ Hy Lạp đặt trong dấu ngoặc: $(P)$, $(Q)$, $(\\alpha)$, $(\\beta)$; có thể viết $\\mathrm{mp}(P)$.',
            'Điểm $A$ thuộc mặt phẳng $(P)$ kí hiệu $A \\in (P)$; điểm $B$ không thuộc $(P)$ kí hiệu $B \\notin (P)$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quy tắc vẽ hình biểu diễn',
          text: 'Đường thẳng vẽ thành đường thẳng, đoạn thẳng vẽ thành đoạn thẳng; hai đường thẳng song song (cắt nhau) vẽ thành hai đường thẳng song song (cắt nhau); giữ nguyên quan hệ điểm thuộc đường thẳng. Đường nhìn thấy vẽ nét liền, đường bị che khuất vẽ nét đứt.',
        },
      ],
    },
    {
      heading: 'Các tính chất thừa nhận',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Có một và chỉ một đường thẳng đi qua hai điểm phân biệt.',
            'Có một và chỉ một mặt phẳng đi qua ba điểm không thẳng hàng. Mặt phẳng qua ba điểm $A$, $B$, $C$ kí hiệu là $(ABC)$.',
            'Tồn tại bốn điểm không cùng thuộc một mặt phẳng. Ta nói bốn điểm ấy không đồng phẳng.',
            'Nếu một đường thẳng có hai điểm phân biệt thuộc một mặt phẳng thì tất cả các điểm của đường thẳng đều thuộc mặt phẳng đó. Khi đó ta nói đường thẳng $d$ nằm trong $(P)$, kí hiệu $d \\subset (P)$.',
            'Nếu hai mặt phẳng phân biệt có một điểm chung thì chúng có một đường thẳng chung duy nhất chứa tất cả các điểm chung của hai mặt phẳng đó.',
            'Trên mỗi mặt phẳng, các kết quả đã biết của hình học phẳng đều đúng.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giao tuyến',
          text: 'Đường thẳng chung $d$ của hai mặt phẳng phân biệt $(P)$ và $(Q)$ gọi là giao tuyến của chúng, kí hiệu $d = (P) \\cap (Q)$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tìm giao tuyến',
          text: 'Tìm hai điểm chung phân biệt $M$, $N$ của hai mặt phẳng; giao tuyến là đường thẳng $MN$. Một điểm chung thường là giao điểm của hai đường thẳng cùng nằm trong một mặt phẳng, mỗi đường thuộc một trong hai mặt phẳng đã cho.',
        },
        {
          type: 'p',
          text: 'Để tìm giao điểm của đường thẳng $d$ với mặt phẳng $(P)$, ta chọn một mặt phẳng $(Q)$ chứa $d$, tìm giao tuyến $\\Delta = (P) \\cap (Q)$; giao điểm của $d$ và $\\Delta$ (nếu có) chính là giao điểm của $d$ và $(P)$.',
        },
      ],
    },
    {
      heading: 'Cách xác định một mặt phẳng',
      blocks: [
        {
          type: 'p',
          text: 'Một mặt phẳng được hoàn toàn xác định khi biết một trong ba điều sau:',
        },
        {
          type: 'list',
          items: [
            'Nó đi qua ba điểm không thẳng hàng $A$, $B$, $C$: mặt phẳng $(ABC)$.',
            'Nó đi qua một đường thẳng $a$ và một điểm $A$ không thuộc $a$: kí hiệu $\\mathrm{mp}(a, A)$.',
            'Nó chứa hai đường thẳng cắt nhau $a$, $b$: kí hiệu $\\mathrm{mp}(a, b)$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hai điểm, hay ba điểm thẳng hàng, không xác định được một mặt phẳng: có vô số mặt phẳng chứa chúng, như các trang sách quay quanh gáy sách.',
        },
      ],
    },
    {
      heading: 'Hình chóp và hình tứ diện',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình chóp',
          text: 'Cho đa giác lồi $A_1A_2\\ldots A_n$ và một điểm $S$ không thuộc mặt phẳng chứa đa giác. Nối $S$ với các đỉnh $A_1, A_2, \\ldots, A_n$ ta được $n$ tam giác $SA_1A_2, SA_2A_3, \\ldots, SA_nA_1$. Hình gồm đa giác $A_1A_2\\ldots A_n$ và $n$ tam giác đó gọi là hình chóp, kí hiệu $S.A_1A_2\\ldots A_n$.',
        },
        {
          type: 'list',
          items: [
            '$S$ là đỉnh, đa giác $A_1A_2\\ldots A_n$ là mặt đáy.',
            'Các tam giác $SA_1A_2, \\ldots, SA_nA_1$ là các mặt bên; $SA_1, \\ldots, SA_n$ là các cạnh bên; $A_1A_2, \\ldots, A_nA_1$ là các cạnh đáy.',
            'Gọi tên theo đáy: hình chóp tam giác, hình chóp tứ giác, hình chóp ngũ giác, … Hình chóp $n$-giác có $n + 1$ mặt và $2n$ cạnh.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình tứ diện',
          text: 'Cho bốn điểm $A$, $B$, $C$, $D$ không đồng phẳng. Hình gồm bốn tam giác $ABC$, $ACD$, $ABD$, $BCD$ gọi là hình tứ diện, kí hiệu $ABCD$. Tứ diện có $4$ đỉnh, $6$ cạnh, $4$ mặt.',
        },
        {
          type: 'list',
          items: [
            'Hai cạnh không có đỉnh chung gọi là hai cạnh đối diện: $AB$ và $CD$, $AC$ và $BD$, $AD$ và $BC$.',
            'Đỉnh không nằm trên một mặt gọi là đỉnh đối diện với mặt đó, chẳng hạn $D$ đối diện với mặt $(ABC)$.',
            'Tứ diện có sáu cạnh bằng nhau gọi là tứ diện đều.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Tìm giao tuyến trên hình chóp',
    instruction:
      'Chọn một cặp mặt phẳng, rồi chạm vào các điểm em cho là thuộc cả hai mặt phẳng. Mỗi lần chạm, hình cho biết lí do đúng hay sai; đủ hai điểm chung thì giao tuyến hiện ra màu đỏ. Kéo hoặc dùng phím mũi tên để xoay hình chóp.',
  },
  examples: [
    {
      problem:
        'Cho hình chóp $S.ABCD$ có đáy là tứ giác $ABCD$ với $AB$ cắt $CD$ tại $E$; $O$ là giao điểm của $AC$ và $BD$. Tìm giao tuyến của $(SAC)$ và $(SBD)$, của $(SAB)$ và $(SCD)$.',
      steps: [
        '$S$ là điểm chung thứ nhất của cả hai cặp mặt phẳng.',
        '$O \\in AC \\subset (SAC)$ và $O \\in BD \\subset (SBD)$, nên $O$ là điểm chung thứ hai của $(SAC)$ và $(SBD)$. Vậy $(SAC) \\cap (SBD) = SO$.',
        '$E \\in AB \\subset (SAB)$ và $E \\in CD \\subset (SCD)$, nên $E$ là điểm chung thứ hai của $(SAB)$ và $(SCD)$. Vậy $(SAB) \\cap (SCD) = SE$.',
      ],
      answer: '$(SAC) \\cap (SBD) = SO$ và $(SAB) \\cap (SCD) = SE$.',
    },
    {
      problem:
        'Cho tứ diện $ABCD$. Lấy $M$ trên cạnh $AB$, $N$ trên cạnh $AC$ sao cho $MN$ cắt đường thẳng $BC$ tại $K$. Tìm giao tuyến của $(DMN)$ và $(BCD)$.',
      steps: [
        '$D$ thuộc cả hai mặt phẳng: điểm chung thứ nhất.',
        '$MN$ và $BC$ cùng nằm trong $(ABC)$ và cắt nhau tại $K$.',
        '$K \\in MN \\subset (DMN)$ và $K \\in BC \\subset (BCD)$: điểm chung thứ hai.',
      ],
      answer: '$(DMN) \\cap (BCD) = DK$.',
    },
    {
      problem:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành tâm $O$, $M$ là trung điểm của $SC$. Tìm giao điểm của đường thẳng $AM$ với mặt phẳng $(SBD)$.',
      steps: [
        'Chọn mặt phẳng $(SAC)$ chứa $AM$.',
        'Giao tuyến của $(SAC)$ và $(SBD)$ là $SO$ (như Ví dụ 1).',
        'Trong $(SAC)$, $AM$ và $SO$ là hai trung tuyến của tam giác $SAC$ nên cắt nhau tại $I$, trọng tâm tam giác $SAC$.',
        '$I \\in AM$ và $I \\in SO \\subset (SBD)$.',
      ],
      answer: 'Giao điểm là $I = AM \\cap SO$, trọng tâm tam giác $SAC$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Có bao nhiêu mặt phẳng đi qua ba điểm không thẳng hàng cho trước?',
      options: ['Đúng một', 'Vô số', 'Hai', 'Không có mặt phẳng nào'],
      answer: 0,
      hints: ['Nhớ lại tính chất thừa nhận thứ hai.'],
      solution: 'Có một và chỉ một mặt phẳng đi qua ba điểm không thẳng hàng.',
    },
    {
      type: 'multi',
      prompt: 'Những điều kiện nào dưới đây xác định duy nhất một mặt phẳng?',
      options: [
        'Ba điểm không thẳng hàng',
        'Một đường thẳng và một điểm không thuộc đường thẳng đó',
        'Hai đường thẳng cắt nhau',
        'Hai điểm phân biệt',
        'Ba điểm thẳng hàng',
      ],
      answers: [0, 1, 2],
      hints: [
        'Có ba cách xác định một mặt phẳng.',
        'Qua hai điểm, hay qua một đường thẳng, có vô số mặt phẳng.',
      ],
      solution:
        'Mặt phẳng được xác định bởi ba điểm không thẳng hàng, hoặc một đường thẳng và một điểm nằm ngoài nó, hoặc hai đường thẳng cắt nhau. Hai điểm hay ba điểm thẳng hàng chỉ xác định một đường thẳng, có vô số mặt phẳng chứa nó.',
    },
    {
      type: 'number',
      prompt: 'Hình chóp $S.ABCDE$ (đáy là ngũ giác) có tất cả bao nhiêu cạnh?',
      answer: 10,
      hints: [
        'Đếm riêng cạnh bên và cạnh đáy.',
        'Có $5$ cạnh bên, mỗi cạnh nối $S$ với một đỉnh đáy.',
      ],
      solution: 'Hình chóp ngũ giác có $5$ cạnh bên và $5$ cạnh đáy, tổng cộng $10$ cạnh.',
    },
    {
      type: 'number',
      prompt: 'Một hình tứ diện có bao nhiêu cặp cạnh đối diện?',
      answer: 3,
      hints: [
        'Hai cạnh đối diện là hai cạnh không có đỉnh chung.',
        'Với tứ diện $ABCD$, cạnh đối diện của $AB$ là $CD$.',
      ],
      solution: 'Tứ diện $ABCD$ có ba cặp cạnh đối diện: $AB$ và $CD$, $AC$ và $BD$, $AD$ và $BC$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành tâm $O$. Giao tuyến của hai mặt phẳng $(SAC)$ và $(SBD)$ là',
      options: ['$SO$', '$SA$', '$AC$', '$BD$'],
      answer: 0,
      hints: [
        '$S$ là một điểm chung.',
        'Tìm điểm chung thứ hai trong mặt đáy: giao điểm của $AC$ và $BD$.',
      ],
      solution:
        '$S$ là điểm chung; $O \\in AC \\subset (SAC)$, $O \\in BD \\subset (SBD)$ nên $O$ là điểm chung thứ hai. Vậy giao tuyến là $SO$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là tứ giác $ABCD$ với $AD$ cắt $BC$ tại $F$. Giao tuyến của $(SAD)$ và $(SBC)$ là',
      options: ['$SF$', '$SO$ với $O = AC \\cap BD$', '$SD$', '$AB$'],
      answer: 0,
      hints: ['$AD$ nằm trong $(SAD)$, $BC$ nằm trong $(SBC)$.'],
      solution:
        '$S$ là điểm chung; $F \\in AD \\subset (SAD)$ và $F \\in BC \\subset (SBC)$ nên $F$ là điểm chung thứ hai. Vậy $(SAD) \\cap (SBC) = SF$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ đáy là hình bình hành tâm $O$, $N$ là trung điểm của $SA$. Giao điểm của đường thẳng $CN$ với mặt phẳng $(SBD)$ là',
      options: [
        'giao điểm của $CN$ và $SO$',
        'giao điểm của $CN$ và $BD$',
        'điểm $O$',
        'giao điểm của $CN$ và $SB$',
      ],
      answer: 0,
      hints: [
        'Chọn mặt phẳng chứa $CN$: đó là $(SAC)$.',
        'Tìm giao tuyến của $(SAC)$ với $(SBD)$.',
      ],
      solution:
        '$CN \\subset (SAC)$ và $(SAC) \\cap (SBD) = SO$. Trong $(SAC)$, $CN$ cắt $SO$ tại $I$ (trọng tâm tam giác $SAC$), nên $I = CN \\cap (SBD)$. $CN$ không cắt $BD$ hay $SB$ vì chúng không cùng nằm trong một mặt phẳng.',
    },
    {
      type: 'number',
      prompt:
        'Cho bốn điểm $A$, $B$, $C$, $D$ không đồng phẳng. Có bao nhiêu mặt phẳng đi qua ba trong bốn điểm đó?',
      answer: 4,
      hints: [
        'Mỗi bộ ba điểm (không thẳng hàng) cho đúng một mặt phẳng.',
        'Có bao nhiêu cách bỏ đi một điểm?',
      ],
      solution:
        'Bốn điểm không đồng phẳng thì ba điểm bất kì không thẳng hàng. Có $4$ bộ ba: $(ABC)$, $(ABD)$, $(ACD)$, $(BCD)$, chính là bốn mặt của tứ diện $ABCD$.',
    },
    {
      type: 'text',
      prompt:
        'Điền vào chỗ trống: Nếu hai mặt phẳng phân biệt có một điểm chung thì tập hợp các điểm chung của chúng là một …',
      accept: ['đường thẳng', 'một đường thẳng', 'giao tuyến', 'đường thẳng giao tuyến'],
      hints: ['Đó là tính chất thừa nhận thứ năm.'],
      solution:
        'Hai mặt phẳng phân biệt có một điểm chung thì có chung một đường thẳng chứa mọi điểm chung, gọi là giao tuyến của chúng.',
    },
  ],
  takeaways: [
    'Qua ba điểm không thẳng hàng có đúng một mặt phẳng; đường thẳng có hai điểm thuộc $(P)$ thì nằm trong $(P)$.',
    'Mặt phẳng được xác định bởi ba điểm không thẳng hàng, một đường thẳng và một điểm ngoài nó, hoặc hai đường thẳng cắt nhau.',
    'Giao tuyến của hai mặt phẳng là đường thẳng qua hai điểm chung phân biệt của chúng.',
    'Hình chóp $n$-giác có $n + 1$ mặt, $2n$ cạnh; tứ diện có $4$ mặt, $6$ cạnh, $3$ cặp cạnh đối diện.',
  ],
};
