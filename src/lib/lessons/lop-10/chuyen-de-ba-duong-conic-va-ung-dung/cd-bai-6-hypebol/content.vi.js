/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hypebol x²/a² − y²/b² = 1: tính đối xứng, đỉnh, trục thực, trục ảo, hình chữ nhật cơ sở, hai đường tiệm cận y = ±(b/a)x, tâm sai e = c/a > 1, bán kính qua tiêu MF₁ = |a + ex|, MF₂ = |a − ex| và hai đường chuẩn x = ±a/e.',
  intro:
    'Tháp làm mát của nhà máy điện, bóng đèn hắt lên tường, quỹ đạo của một vật bay qua Mặt Trời mà không quay lại: đâu đâu cũng thấy hypebol. Khác với elip, hypebol có hai nhánh chạy mãi ra xa và càng ngày càng sát hai đường thẳng. Bài này tìm hiểu hình dạng ấy qua phương trình chính tắc.',
  objectives: [
    'Nêu được tính đối xứng, các đỉnh, trục thực, trục ảo và hình chữ nhật cơ sở của hypebol có phương trình chính tắc.',
    'Viết được phương trình hai đường tiệm cận $y = \\pm\\dfrac{b}{a}x$.',
    'Tính được tâm sai $e = \\dfrac{c}{a} > 1$ và các bán kính qua tiêu $MF_1 = |a + ex|$, $MF_2 = |a - ex|$.',
    'Viết được phương trình hai đường chuẩn và dùng tính chất $\\dfrac{MF}{d(M, \\Delta)} = e$.',
  ],
  sections: [
    {
      heading: 'Hình dạng của hypebol',
      blocks: [
        {
          type: 'p',
          text: 'Nhắc lại: hypebol là tập hợp các điểm $M$ sao cho $|MF_1 - MF_2| = 2a$, trong đó $F_1F_2 = 2c$ và $0 < a < c$. Với $F_1(-c; 0)$, $F_2(c; 0)$, hypebol có phương trình chính tắc',
        },
        {
          type: 'tex',
          tex: '\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1, \\qquad a > 0,\\ b > 0,\\ b^2 = c^2 - a^2.',
        },
        {
          type: 'list',
          items: [
            'Hypebol nhận hai trục toạ độ làm trục đối xứng và gốc $O$ làm tâm đối xứng (tâm của hypebol).',
            'Hypebol cắt $Ox$ tại hai đỉnh $A_1(-a; 0)$, $A_2(a; 0)$ và không cắt $Oy$. Đoạn $A_1A_2$ dài $2a$ gọi là trục thực; đoạn $B_1B_2$ với $B_1(0; -b)$, $B_2(0; b)$, dài $2b$, gọi là trục ảo.',
            'Mọi điểm $M(x; y)$ của hypebol có $x^2 \\ge a^2$, tức là $x \\le -a$ (nhánh trái) hoặc $x \\ge a$ (nhánh phải): hypebol gồm hai nhánh nằm ngoài dải $-a < x < a$.',
            'Hình chữ nhật có các cạnh nằm trên các đường thẳng $x = \\pm a$, $y = \\pm b$ gọi là hình chữ nhật cơ sở.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đường tiệm cận',
          text: 'Hai đường thẳng $y = \\dfrac{b}{a}x$ và $y = -\\dfrac{b}{a}x$, chứa hai đường chéo của hình chữ nhật cơ sở, là hai đường tiệm cận của hypebol: khi điểm $M$ trên hypebol chạy ra xa vô tận, khoảng cách từ $M$ đến một trong hai đường thẳng đó dần tới $0$.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn, với $M(x; y)$ ở góc phần tư thứ nhất, $y = \\dfrac{b}{a}\\sqrt{x^2 - a^2}$ và $\\dfrac{b}{a}x - y = \\dfrac{b}{a} \\cdot \\dfrac{a^2}{x + \\sqrt{x^2 - a^2}}$, số này dần tới $0$ khi $x$ tăng mãi. Để vẽ hypebol, ta vẽ hình chữ nhật cơ sở, hai đường tiệm cận rồi vẽ hai nhánh đi qua hai đỉnh và sát dần các tiệm cận.',
        },
      ],
    },
    {
      heading: 'Tâm sai',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tâm sai của hypebol',
          text: 'Tỉ số $e = \\dfrac{c}{a}$ gọi là tâm sai của hypebol. Vì $c > a$ nên $e > 1$.',
        },
        {
          type: 'p',
          text: 'Từ $b^2 = c^2 - a^2$ ta có $\\dfrac{b}{a} = \\sqrt{e^2 - 1}$: tâm sai càng lớn thì hệ số góc của tiệm cận càng lớn, hai nhánh hypebol càng "mở rộng"; tâm sai càng gần $1$ thì hai nhánh càng "khép" sát trục thực.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hypebol vuông',
          text: 'Hypebol có trục thực bằng trục ảo ($a = b$) gọi là hypebol vuông. Khi đó $c = a\\sqrt{2}$, tâm sai $e = \\sqrt{2}$ và hai tiệm cận $y = \\pm x$ vuông góc với nhau.',
        },
      ],
    },
    {
      heading: 'Bán kính qua tiêu và đường chuẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Bán kính qua tiêu',
          text: 'Với $M(x; y)$ thuộc hypebol $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$ có hai tiêu điểm $F_1(-c; 0)$, $F_2(c; 0)$: $$MF_1 = |a + ex|, \\qquad MF_2 = |a - ex|.$$',
        },
        {
          type: 'list',
          items: [
            'Nếu $M$ thuộc nhánh phải ($x \\ge a$): $MF_1 = a + ex$, $MF_2 = ex - a$, nên $MF_1 - MF_2 = 2a$.',
            'Nếu $M$ thuộc nhánh trái ($x \\le -a$): $MF_1 = -a - ex$, $MF_2 = a - ex$, nên $MF_2 - MF_1 = 2a$.',
          ],
        },
        {
          type: 'p',
          text: 'Chứng minh: $MF_1^2 - MF_2^2 = 4cx$ và $MF_1^2 = (x + c)^2 + y^2 = x^2 + 2cx + c^2 + \\dfrac{b^2}{a^2}x^2 - b^2 = \\left(a + \\dfrac{c}{a}x\\right)^2$, nên $MF_1 = \\left|a + ex\\right|$; tương tự cho $MF_2$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường chuẩn',
          text: 'Hai đường thẳng $\\Delta_1: x = -\\dfrac{a}{e}$ và $\\Delta_2: x = \\dfrac{a}{e}$ gọi là hai đường chuẩn của hypebol, ứng với $F_1$ và $F_2$. Với mọi điểm $M$ thuộc hypebol: $$\\dfrac{MF_1}{d(M, \\Delta_1)} = \\dfrac{MF_2}{d(M, \\Delta_2)} = e.$$',
        },
        {
          type: 'p',
          text: 'Thật vậy, $d(M, \\Delta_2) = \\left|x - \\dfrac{a}{e}\\right| = \\dfrac{|ex - a|}{e} = \\dfrac{MF_2}{e}$. Vì $e > 1$ nên $\\dfrac{a}{e} < a$: hai đường chuẩn nằm trong dải giữa hai nhánh.',
        },
      ],
    },
    {
      heading: 'Dự án: Định vị bằng hiệu thời gian',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: hiểu vì sao hệ thống định vị vô tuyến (như LORAN) dùng hypebol, bằng một thí nghiệm âm thanh trên sân trường.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: thước dây, phấn, hai bạn làm "trạm thu" có đồng hồ bấm giây hoặc điện thoại ghi âm, một bạn phát tiếng động (vỗ hai thanh gỗ).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đánh dấu hai trạm $A$, $B$ cách nhau $40$ m trên sân và dựng hệ trục: gốc ở trung điểm $AB$, trục $Ox$ theo hướng $AB$, đơn vị $1$ m.',
            'Bạn phát âm đứng ở một điểm bí mật $M$. Hai trạm ghi thời điểm nghe thấy tiếng động; tính hiệu thời gian $\\Delta t$ rồi hiệu khoảng cách $|MA - MB| = v \\cdot \\Delta t$ với $v \\approx 340$ m/s.',
            'Viết phương trình hypebol chứa $M$ với $2a = |MA - MB|$, $2c = 40$. Cho biết $M$ ở nhánh nào (gần trạm nào hơn).',
            'Thêm trạm thứ ba $C$ để có hypebol thứ hai, rồi ước lượng vị trí $M$ là giao của hai hypebol. So với vị trí thật và bàn về nguyên nhân sai số.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: sơ đồ sân, bảng số đo, các phương trình hypebol, vị trí ước lượng và sai số; nêu một ứng dụng thực tế của việc định vị bằng hiệu khoảng cách.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hiệu khoảng cách và đường tiệm cận',
    instruction:
      'Chọn $a$, $b$ và kéo điểm $M$ trên hai nhánh (hoặc chọn $M$ rồi dùng phím mũi tên). Quan sát: $|MF_1 - MF_2|$ luôn bằng $2a$; khi $M$ chạy ra xa, nhánh hypebol tiến sát đường tiệm cận, còn tích hai khoảng cách từ $M$ đến hai tiệm cận không đổi.',
  },
  examples: [
    {
      problem:
        'Cho hypebol $(H): \\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1$. Tìm các đỉnh, độ dài hai trục, tâm sai, phương trình các đường tiệm cận và các đường chuẩn.',
      steps: [
        '$a = 3$, $b = 4$, $c = \\sqrt{9 + 16} = 5$.',
        'Đỉnh $A_1(-3; 0)$, $A_2(3; 0)$; trục thực dài $6$, trục ảo dài $8$.',
        'Tâm sai $e = \\dfrac{5}{3}$; tiệm cận $y = \\pm\\dfrac{4}{3}x$.',
        'Đường chuẩn $x = \\pm\\dfrac{a}{e} = \\pm\\dfrac{3}{5/3} = \\pm\\dfrac{9}{5}$.',
      ],
      answer:
        '$e = \\dfrac{5}{3}$, tiệm cận $y = \\pm\\dfrac{4}{3}x$, đường chuẩn $x = \\pm\\dfrac{9}{5}$.',
    },
    {
      problem:
        'Điểm $M$ thuộc hypebol $\\dfrac{x^2}{9} - \\dfrac{y^2}{7} = 1$ có hoành độ $x = 6$. Tính các bán kính qua tiêu của $M$.',
      steps: [
        '$a = 3$, $c = \\sqrt{9 + 7} = 4$, $e = \\dfrac{4}{3}$.',
        '$MF_1 = \\left|3 + \\dfrac{4}{3} \\cdot 6\\right| = 11$, $MF_2 = \\left|3 - \\dfrac{4}{3} \\cdot 6\\right| = 5$.',
        'Kiểm tra: $MF_1 - MF_2 = 6 = 2a$, đúng với $M$ thuộc nhánh phải.',
      ],
      answer: '$MF_1 = 11$, $MF_2 = 5$.',
    },
    {
      problem:
        'Viết phương trình chính tắc của hypebol có tiêu cự bằng $10$ và một đường tiệm cận là $y = \\dfrac{3}{4}x$.',
      steps: [
        '$2c = 10$ nên $c = 5$, $a^2 + b^2 = 25$.',
        '$\\dfrac{b}{a} = \\dfrac{3}{4}$ nên $b = \\dfrac{3}{4}a$; thay vào: $a^2 + \\dfrac{9}{16}a^2 = 25 \\Rightarrow a^2 = 16$, $b^2 = 9$.',
      ],
      answer: '$\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1$.',
    },
    {
      problem:
        'Chứng minh rằng tích các khoảng cách từ một điểm bất kì trên hypebol $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$ đến hai đường tiệm cận là một số không đổi.',
      steps: [
        'Hai tiệm cận: $bx - ay = 0$ và $bx + ay = 0$.',
        'Với $M(x; y)$ trên hypebol, tích hai khoảng cách là $\\dfrac{|bx - ay| \\cdot |bx + ay|}{a^2 + b^2} = \\dfrac{|b^2x^2 - a^2y^2|}{a^2 + b^2}$.',
        'Từ phương trình hypebol, $b^2x^2 - a^2y^2 = a^2b^2$.',
      ],
      answer: 'Tích luôn bằng $\\dfrac{a^2b^2}{a^2 + b^2}$, không phụ thuộc vào $M$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Tìm tâm sai của hypebol $\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1$.',
      answer: [5, 4],
      hints: ['Với hypebol, $c^2 = a^2 + b^2$.'],
      solution: '$c = \\sqrt{16 + 9} = 5$, $a = 4$, nên $e = \\dfrac{5}{4}$.',
    },
    {
      type: 'choice',
      prompt: 'Hai đường tiệm cận của hypebol $\\dfrac{x^2}{4} - \\dfrac{y^2}{9} = 1$ là',
      options: [
        '$y = \\pm\\dfrac{3}{2}x$',
        '$y = \\pm\\dfrac{2}{3}x$',
        '$y = \\pm\\dfrac{9}{4}x$',
        '$y = \\pm 3x$',
      ],
      answer: 0,
      hints: ['Tiệm cận là $y = \\pm\\dfrac{b}{a}x$, với $a$, $b$ (không phải $a^2$, $b^2$).'],
      solution: '$a = 2$, $b = 3$, nên tiệm cận là $y = \\pm\\dfrac{3}{2}x$.',
    },
    {
      type: 'number',
      prompt:
        'Điểm $M$ thuộc hypebol $\\dfrac{x^2}{9} - \\dfrac{y^2}{7} = 1$ có hoành độ $x = -6$. Tính $MF_2$, với $F_2$ là tiêu điểm có hoành độ dương.',
      answer: 11,
      hints: ['$MF_2 = |a - ex|$ với $a = 3$, $e = \\dfrac{4}{3}$.'],
      solution:
        '$MF_2 = \\left|3 - \\dfrac{4}{3} \\cdot (-6)\\right| = |3 + 8| = 11$ (còn $MF_1 = |3 - 8| = 5$, và $MF_2 - MF_1 = 6 = 2a$).',
    },
    {
      type: 'number',
      prompt:
        'Đường chuẩn $\\Delta_2$ của hypebol $\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1$ có phương trình $x = m$. Tìm $m$ (viết dạng số thập phân).',
      answer: 3.2,
      hints: ['$\\Delta_2: x = \\dfrac{a}{e}$, với $e = \\dfrac{5}{4}$.'],
      solution: '$m = \\dfrac{a}{e} = \\dfrac{4}{5/4} = \\dfrac{16}{5} = 3{,}2$.',
    },
    {
      type: 'number',
      prompt:
        'Hypebol có độ dài trục thực bằng $8$ và tâm sai bằng $\\dfrac{5}{4}$ có phương trình chính tắc $\\dfrac{x^2}{16} - \\dfrac{y^2}{b^2} = 1$. Tìm $b^2$.',
      answer: 9,
      hints: ['$a = 4$ và $c = ea$.', '$b^2 = c^2 - a^2$.'],
      solution: '$c = \\dfrac{5}{4} \\cdot 4 = 5$, nên $b^2 = 25 - 16 = 9$.',
    },
    {
      type: 'choice',
      prompt: 'Hypebol vuông (trục thực bằng trục ảo) có tâm sai bằng',
      options: ['$\\sqrt{2}$', '$1$', '$2$', '$\\dfrac{\\sqrt{2}}{2}$'],
      answer: 0,
      hints: ['Với $a = b$ thì $c^2 = 2a^2$.'],
      solution:
        '$c = a\\sqrt{2}$, nên $e = \\dfrac{c}{a} = \\sqrt{2}$. Tâm sai của hypebol luôn lớn hơn $1$.',
    },
    {
      type: 'number',
      prompt:
        'Hai trạm thu đặt tại $A(-5; 0)$ và $B(5; 0)$ (đơn vị: km). Từ hiệu thời gian nhận tín hiệu, người ta biết một con tàu ở vị trí $M$ với $MA - MB = 6$ km, và tàu đang ở trên đường thẳng $x = 6$, phía trên trục $Ox$. Tính tung độ của $M$ (làm tròn đến hàng phần trăm).',
      answer: 6.93,
      tolerance: 0.01,
      unit: 'km',
      hints: [
        '$M$ thuộc nhánh phải của hypebol có $2a = 6$, $c = 5$.',
        'Hypebol: $\\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1$; thay $x = 6$.',
      ],
      solution:
        '$a = 3$, $b^2 = 25 - 9 = 16$. Với $x = 6$: $y^2 = 16\\left(\\dfrac{36}{9} - 1\\right) = 48$, $y = 4\\sqrt{3} \\approx 6{,}93$ (km).',
    },
    {
      type: 'fraction',
      prompt:
        'Tính tích các khoảng cách từ một điểm bất kì trên hypebol $\\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1$ đến hai đường tiệm cận.',
      answer: [144, 25],
      hints: ['Tích không đổi và bằng $\\dfrac{a^2b^2}{a^2 + b^2}$.'],
      solution:
        'Tích bằng $\\dfrac{9 \\cdot 16}{9 + 16} = \\dfrac{144}{25}$. Thử lại với đỉnh $(3; 0)$: hai khoảng cách đều bằng $\\dfrac{|4 \\cdot 3|}{5} = \\dfrac{12}{5}$, tích $\\dfrac{144}{25}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các khẳng định đúng về hypebol $\\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1$.',
      options: [
        'Hình chữ nhật cơ sở có kích thước $6 \\times 8$.',
        'Hypebol cắt trục $Oy$ tại hai điểm $(0; \\pm 4)$.',
        'Mọi điểm $M(x; y)$ thuộc hypebol đều có $|x| \\ge 3$.',
        'Tiêu cự bằng $10$.',
        'Tâm sai bằng $\\dfrac{3}{5}$.',
      ],
      answers: [0, 2, 3],
      hints: ['$a = 3$, $b = 4$, $c = 5$. Thử thay $x = 0$ vào phương trình.'],
      solution:
        'Hình chữ nhật cơ sở $2a \\times 2b = 6 \\times 8$; $x^2 \\ge 9$ nên $|x| \\ge 3$; tiêu cự $2c = 10$. Với $x = 0$ thì $-\\dfrac{y^2}{16} = 1$, vô nghiệm, nên hypebol không cắt $Oy$; tâm sai là $\\dfrac{5}{3} > 1$.',
    },
  ],
  takeaways: [
    'Hypebol $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$ ($c^2 = a^2 + b^2$) có hai nhánh, đỉnh $(\\pm a; 0)$, trục thực $2a$, trục ảo $2b$.',
    'Hai tiệm cận $y = \\pm\\dfrac{b}{a}x$ chứa hai đường chéo của hình chữ nhật cơ sở.',
    'Tâm sai $e = \\dfrac{c}{a} > 1$; hypebol vuông có $e = \\sqrt{2}$.',
    'Bán kính qua tiêu $MF_1 = |a + ex|$, $MF_2 = |a - ex|$; đường chuẩn $x = \\pm\\dfrac{a}{e}$ và $\\dfrac{MF}{d(M, \\Delta)} = e$.',
  ],
};
