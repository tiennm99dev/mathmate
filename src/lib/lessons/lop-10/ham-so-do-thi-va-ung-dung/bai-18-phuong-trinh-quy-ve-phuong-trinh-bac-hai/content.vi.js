/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giải phương trình dạng √(ax² + bx + c) = √(dx² + ex + f) và √(ax² + bx + c) = dx + e bằng cách bình phương hai vế, giải phương trình bậc hai nhận được rồi thử lại để loại nghiệm ngoại lai.',
  intro:
    'Một người chèo thuyền từ hải đăng vào bờ, một người kéo xe dọc bờ biển; họ muốn tới điểm hẹn cùng một lúc. Thời gian chèo thuyền chứa một căn bậc hai (theo định lí Pythagore), nên điều kiện "cùng lúc" là một phương trình chứa căn. Bình phương hai vế đưa nó về phương trình bậc hai quen thuộc, nhưng phép bình phương có thể sinh ra những "nghiệm" không thật. Bài này học cách giải và cách loại các nghiệm đó.',
  objectives: [
    'Giải phương trình dạng $\\sqrt{ax^2 + bx + c} = \\sqrt{dx^2 + ex + f}$.',
    'Giải phương trình dạng $\\sqrt{ax^2 + bx + c} = dx + e$.',
    'Hiểu vì sao phải thử lại và loại nghiệm ngoại lai sau khi bình phương hai vế.',
  ],
  sections: [
    {
      heading: 'Phương trình dạng √(ax² + bx + c) = √(dx² + ex + f)',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách giải',
          text: 'Để giải phương trình $\\sqrt{ax^2 + bx + c} = \\sqrt{dx^2 + ex + f}$, ta bình phương hai vế để được phương trình $ax^2 + bx + c = dx^2 + ex + f$ rồi giải phương trình nhận được. Sau đó thử lại xem các giá trị $x$ tìm được có thoả mãn phương trình đã cho hay không và kết luận nghiệm.',
        },
        {
          type: 'p',
          text: 'Phương trình sau khi bình phương chỉ đòi hỏi hai biểu thức dưới dấu căn bằng nhau. Nếu tại một giá trị $x$ chúng bằng nhau nhưng cùng âm, thì căn bậc hai không xác định: giá trị đó không phải nghiệm của phương trình đã cho.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $\\sqrt{2x^2 - 4x - 2} = \\sqrt{x^2 - x - 2}$. Bình phương hai vế: $2x^2 - 4x - 2 = x^2 - x - 2$, tức là $x^2 - 3x = 0$, nên $x = 0$ hoặc $x = 3$. Thay $x = 0$: $\\sqrt{-2}$ không xác định, loại. Thay $x = 3$: hai vế cùng bằng $\\sqrt{4} = 2$, nhận. Phương trình có nghiệm $x = 3$.',
        },
      ],
    },
    {
      heading: 'Phương trình dạng √(ax² + bx + c) = dx + e',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách giải',
          text: 'Để giải phương trình $\\sqrt{ax^2 + bx + c} = dx + e$, ta bình phương hai vế để được phương trình $ax^2 + bx + c = (dx + e)^2$ rồi giải phương trình nhận được. Sau đó thử lại xem các giá trị $x$ tìm được có thoả mãn phương trình đã cho hay không và kết luận nghiệm.',
        },
        {
          type: 'p',
          text: 'Vế trái là một căn bậc hai nên luôn không âm. Phép bình phương xoá mất dấu của vế phải: một giá trị $x$ làm $\\sqrt{ax^2 + bx + c} = -(dx + e)$ cũng thoả mãn phương trình sau khi bình phương. Những giá trị làm $dx + e < 0$ là nghiệm ngoại lai và phải loại.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Với dạng này, ta có thể thay bước thử lại bằng việc kiểm tra điều kiện $dx + e \\ge 0$: khi đó $ax^2 + bx + c = (dx + e)^2 \\ge 0$ nên căn xác định và hai vế bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Sai lầm thường gặp',
          text: 'Bình phương hai vế rồi kết luận ngay mọi nghiệm của phương trình bậc hai là nghiệm. Hãy luôn thử lại: với $\\sqrt{2x^2 - 5x - 9} = x - 1$, phương trình bình phương có nghiệm $x = 5$ và $x = -2$, nhưng $x = -2$ làm vế trái bằng $3$ còn vế phải bằng $-3$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bình phương rồi thử lại',
    instruction:
      'Chọn một phương trình. Bước 1 vẽ đồ thị hai vế: nghiệm là hoành độ giao điểm. Bước 2 bình phương hai vế và đánh dấu các nghiệm của phương trình bậc hai nhận được. Bước 3 thử lại từng giá trị: giá trị nào không làm hai vế bằng nhau bị loại. Quan sát vì sao nó xuất hiện: hai biểu thức dưới căn bằng nhau nhưng cùng âm, hoặc vế trái gặp đường $y = -(\\text{vế phải})$.',
  },
  examples: [
    {
      problem: 'Giải phương trình $\\sqrt{2x^2 - 5x - 9} = x - 1$.',
      steps: [
        'Bình phương hai vế: $2x^2 - 5x - 9 = x^2 - 2x + 1$.',
        'Thu gọn: $x^2 - 3x - 10 = 0$, nên $x = 5$ hoặc $x = -2$.',
        'Thử lại $x = 5$: vế trái $\\sqrt{50 - 25 - 9} = \\sqrt{16} = 4$, vế phải $5 - 1 = 4$. Nhận.',
        'Thử lại $x = -2$: vế trái $\\sqrt{8 + 10 - 9} = \\sqrt{9} = 3$, vế phải $-2 - 1 = -3$. Loại.',
      ],
      answer: 'Phương trình có nghiệm $x = 5$.',
    },
    {
      problem: 'Giải phương trình $\\sqrt{3x^2 - 6x + 1} = \\sqrt{-2x^2 - 9x + 1}$.',
      steps: [
        'Bình phương hai vế: $3x^2 - 6x + 1 = -2x^2 - 9x + 1$, tức là $5x^2 + 3x = 0$.',
        'Do đó $x(5x + 3) = 0$, nên $x = 0$ hoặc $x = -\\dfrac{3}{5}$.',
        'Thử lại $x = 0$: hai vế cùng bằng $\\sqrt{1} = 1$. Nhận.',
        'Thử lại $x = -\\dfrac{3}{5}$: $3 \\cdot \\dfrac{9}{25} + \\dfrac{18}{5} + 1 = \\dfrac{142}{25} > 0$, hai vế cùng bằng $\\sqrt{\\dfrac{142}{25}}$. Nhận.',
      ],
      answer: 'Phương trình có hai nghiệm $x = 0$ và $x = -\\dfrac{3}{5}$.',
    },
    {
      problem:
        'Bác Việt ở trạm hải đăng cách bờ biển $4$ km; điểm gần trạm nhất trên bờ là bến $B$. Anh Nam ở thôn $H$ trên bờ biển, cách $B$ $9{,}25$ km. Bác Việt chèo thuyền với vận tốc $4$ km/h, anh Nam kéo xe dọc bờ biển về phía $B$ với vận tốc $5$ km/h. Hai người cùng xuất phát và muốn gặp nhau tại điểm $M$ trên bờ, giữa $B$ và $H$, cùng một lúc. Tính $BM$.',
      steps: [
        'Gọi $BM = x$ (km), $0 < x < 9{,}25$. Quãng đường chèo thuyền là $\\sqrt{16 + x^2}$, quãng đường kéo xe là $9{,}25 - x$.',
        'Hai người tới cùng lúc: $\\dfrac{\\sqrt{16 + x^2}}{4} = \\dfrac{9{,}25 - x}{5}$, tức là $5\\sqrt{16 + x^2} = 37 - 4x$.',
        'Bình phương hai vế: $25(16 + x^2) = (37 - 4x)^2 \\Leftrightarrow 9x^2 + 296x - 969 = 0$, nên $x = 3$ hoặc $x = -\\dfrac{323}{9}$.',
        'Thử lại $x = 3$: $5\\sqrt{25} = 25 = 37 - 12$. Nhận. Giá trị $x = -\\dfrac{323}{9}$ không thoả mãn $x > 0$. Loại.',
      ],
      answer: 'Điểm hẹn $M$ cách bến $B$ là $3$ km.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tính tổng các nghiệm của phương trình $\\sqrt{x^2 - 2x + 4} = \\sqrt{2x^2 - 5x + 6}$.',
      answer: 3,
      hints: [
        'Bình phương hai vế rồi thu gọn về một phương trình bậc hai.',
        '$x^2 - 3x + 2 = 0$; nhớ thử lại từng nghiệm trước khi cộng.',
      ],
      solution:
        'Bình phương: $x^2 - 2x + 4 = 2x^2 - 5x + 6 \\Leftrightarrow x^2 - 3x + 2 = 0 \\Leftrightarrow x = 1$ hoặc $x = 2$. Thử lại: $x = 1$ cho hai vế cùng bằng $\\sqrt{3}$; $x = 2$ cho hai vế cùng bằng $\\sqrt{4} = 2$. Cả hai đều là nghiệm, tổng bằng $3$.',
    },
    {
      type: 'choice',
      prompt: 'Tập nghiệm của phương trình $\\sqrt{x^2 - 5} = \\sqrt{2x^2 - 4x - 2}$ là',
      options: ['$\\{3\\}$', '$\\{1; 3\\}$', '$\\{1\\}$', '$\\varnothing$'],
      answer: 0,
      hints: ['Sau khi bình phương được $x^2 - 4x + 3 = 0$.', 'Thay từng nghiệm vào $x^2 - 5$.'],
      solution:
        'Bình phương: $x^2 - 5 = 2x^2 - 4x - 2 \\Leftrightarrow x^2 - 4x + 3 = 0 \\Leftrightarrow x = 1$ hoặc $x = 3$. Với $x = 1$: $x^2 - 5 = -4 < 0$, căn không xác định, loại. Với $x = 3$: hai vế cùng bằng $\\sqrt{4} = 2$, nhận. Tập nghiệm $\\{3\\}$.',
    },
    {
      type: 'choice',
      prompt: 'Phương trình $\\sqrt{2x^2 - 3x - 5} = \\sqrt{x^2 - 7}$',
      options: [
        'vô nghiệm',
        'có hai nghiệm $x = 1$ và $x = 2$',
        'có một nghiệm $x = 2$',
        'có một nghiệm $x = 1$',
      ],
      answer: 0,
      hints: ['Bình phương được $x^2 - 3x + 2 = 0$.', 'Thử lại: $x^2 - 7$ tại $x = 1$ và $x = 2$.'],
      solution:
        'Bình phương: $x^2 - 3x + 2 = 0 \\Leftrightarrow x = 1$ hoặc $x = 2$. Tại $x = 1$: $x^2 - 7 = -6 < 0$; tại $x = 2$: $x^2 - 7 = -3 < 0$. Cả hai đều làm căn không xác định, nên phương trình vô nghiệm.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $\\sqrt{2x^2 - 7x} = x - 2$.',
      answer: 4,
      hints: [
        'Bình phương hai vế: $2x^2 - 7x = x^2 - 4x + 4$.',
        'Thử lại: nghiệm nào làm vế phải âm?',
      ],
      solution:
        'Bình phương: $x^2 - 3x - 4 = 0 \\Leftrightarrow x = 4$ hoặc $x = -1$. Với $x = 4$: $\\sqrt{32 - 28} = 2 = 4 - 2$, nhận. Với $x = -1$: vế trái $\\sqrt{9} = 3$, vế phải $-3$, loại. Nghiệm $x = 4$.',
    },
    {
      type: 'number',
      prompt: 'Phương trình $\\sqrt{2x^2 + 5x + 3} = -3 - x$ có bao nhiêu nghiệm?',
      answer: 0,
      hints: ['Bình phương được $x^2 - x - 6 = 0$.', 'Tính vế phải $-3 - x$ tại từng nghiệm.'],
      solution:
        'Bình phương: $2x^2 + 5x + 3 = x^2 + 6x + 9 \\Leftrightarrow x^2 - x - 6 = 0 \\Leftrightarrow x = 3$ hoặc $x = -2$. Tại $x = 3$ vế phải bằng $-6 < 0$, tại $x = -2$ vế phải bằng $-1 < 0$: cả hai bị loại. Phương trình có $0$ nghiệm.',
    },
    {
      type: 'fraction',
      prompt:
        'Phương trình $\\sqrt{3x^2 - 6x + 1} = \\sqrt{-2x^2 - 9x + 1}$ có một nghiệm âm. Tìm nghiệm đó (nhập dưới dạng phân số).',
      answer: [-3, 5],
      hints: ['Bình phương được $5x^2 + 3x = 0$.'],
      solution:
        '$5x^2 + 3x = 0 \\Leftrightarrow x = 0$ hoặc $x = -\\dfrac{3}{5}$. Tại $x = -\\dfrac{3}{5}$, $3x^2 - 6x + 1 = \\dfrac{142}{25} > 0$ nên hai vế bằng nhau và xác định. Nghiệm âm là $-\\dfrac{3}{5}$.',
    },
    {
      type: 'choice',
      prompt:
        'Khi giải $\\sqrt{ax^2 + bx + c} = dx + e$ bằng cách bình phương hai vế, vì sao phải thử lại các nghiệm tìm được?',
      options: [
        'Vì phương trình sau khi bình phương còn có cả nghiệm của $\\sqrt{ax^2 + bx + c} = -(dx + e)$',
        'Vì phương trình bậc hai luôn có hai nghiệm',
        'Vì bình phương có thể làm mất nghiệm của phương trình đã cho',
        'Vì nghiệm của phương trình bậc hai thường là số vô tỉ',
      ],
      answer: 0,
      hints: ['Bình phương $A = B$ và bình phương $A = -B$ cho cùng một kết quả.'],
      solution:
        'Từ $A = B$ suy ra $A^2 = B^2$, nhưng từ $A^2 = B^2$ chỉ suy ra $A = B$ hoặc $A = -B$. Các giá trị làm $\\sqrt{ax^2 + bx + c} = -(dx + e)$ với $dx + e < 0$ là nghiệm ngoại lai. Phép bình phương không làm mất nghiệm nào, chỉ có thể thêm nghiệm.',
    },
    {
      type: 'number',
      prompt:
        'Một tam giác vuông có một cạnh góc vuông dài $3$ cm; cạnh huyền dài hơn cạnh góc vuông còn lại $1$ cm. Gọi $x$ (cm) là độ dài cạnh góc vuông còn lại, ta có $\\sqrt{x^2 + 9} = x + 1$. Tìm $x$.',
      answer: 4,
      unit: 'cm',
      hints: ['Bình phương hai vế, các hạng tử $x^2$ triệt tiêu.'],
      solution:
        '$x^2 + 9 = x^2 + 2x + 1 \\Leftrightarrow 2x = 8 \\Leftrightarrow x = 4$. Thử lại: $\\sqrt{16 + 9} = 5 = 4 + 1$. Vậy $x = 4$ cm (tam giác có ba cạnh $3$, $4$, $5$ cm).',
    },
    {
      type: 'number',
      prompt:
        'Phương trình $\\sqrt{6x^2 + 13x + 13} = 2x + 4$ có hai nghiệm. Tìm nghiệm lớn hơn (làm tròn đến hàng phần trăm).',
      answer: 2.19,
      tolerance: 0.01,
      hints: [
        'Bình phương hai vế rồi thu gọn: $2x^2 - 3x - 3 = 0$.',
        'Tính $x = \\dfrac{3 \\pm \\sqrt{33}}{4}$ và kiểm tra $2x + 4 \\ge 0$.',
      ],
      solution:
        'Bình phương: $6x^2 + 13x + 13 = 4x^2 + 16x + 16 \\Leftrightarrow 2x^2 - 3x - 3 = 0 \\Leftrightarrow x = \\dfrac{3 \\pm \\sqrt{33}}{4}$. Cả hai giá trị ($\\approx -0{,}69$ và $\\approx 2{,}19$) đều làm $2x + 4 > 0$ nên đều là nghiệm. Nghiệm lớn hơn là $\\dfrac{3 + \\sqrt{33}}{4} \\approx 2{,}19$.',
    },
  ],
  takeaways: [
    '$\\sqrt{ax^2 + bx + c} = \\sqrt{dx^2 + ex + f}$: bình phương được $ax^2 + bx + c = dx^2 + ex + f$, giải rồi thử lại (loại giá trị làm biểu thức dưới căn âm).',
    '$\\sqrt{ax^2 + bx + c} = dx + e$: bình phương được $ax^2 + bx + c = (dx + e)^2$, giải rồi thử lại (loại giá trị làm $dx + e < 0$).',
    'Bình phương hai vế không làm mất nghiệm nhưng có thể sinh nghiệm ngoại lai, nên bước thử lại là bắt buộc.',
  ],
};
