/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng GeoGebra 3D để tạo ba vectơ trong không gian, vẽ vectơ tổng của chúng bằng cách đặt các vectơ nối tiếp nhau và bằng quy tắc hình hộp, rồi kiểm tra kết quả bằng toạ độ.',
  intro:
    'Trong mặt phẳng, ta vẽ tổng hai vectơ bằng quy tắc ba điểm hoặc quy tắc hình bình hành. Trong không gian, ba vectơ có thể không cùng nằm trên một mặt phẳng, nên vẽ tổng của chúng trên giấy khá khó. Phần mềm GeoGebra 3D cho phép dựng các vectơ, xoay hình để nhìn từ nhiều phía và thấy rõ vectơ tổng là đường chéo của một hình hộp.',
  objectives: [
    'Tạo điểm và vectơ trong không gian bằng GeoGebra 3D.',
    'Vẽ vectơ tổng của ba vectơ bằng cách đặt các vectơ nối tiếp nhau.',
    'Dựng hình hộp trên ba vectơ chung gốc và nhận ra quy tắc hình hộp.',
    'Kiểm tra vectơ tổng bằng toạ độ và tính độ dài của nó.',
  ],
  sections: [
    {
      heading: 'Nhắc lại: tổng của ba vectơ',
      blocks: [
        {
          type: 'p',
          text: 'Để cộng ba vectơ $\\vec{u}$, $\\vec{v}$, $\\vec{w}$, ta đặt chúng nối tiếp nhau: lấy điểm $O$, vẽ $\\overrightarrow{OA} = \\vec{u}$, $\\overrightarrow{AB} = \\vec{v}$, $\\overrightarrow{BC} = \\vec{w}$. Áp dụng quy tắc ba điểm hai lần:',
        },
        {
          type: 'tex',
          tex: '\\vec{u} + \\vec{v} + \\vec{w} = \\overrightarrow{OA} + \\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{OB} + \\overrightarrow{BC} = \\overrightarrow{OC}.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc hình hộp',
          text: "Cho hình hộp $ABCD.A'B'C'D'$. Khi đó $$\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} = \\overrightarrow{AC'}.$$ Tổng của ba vectơ chung gốc $A$ nằm trên ba cạnh của hình hộp là vectơ đường chéo xuất phát từ $A$.",
        },
        {
          type: 'p',
          text: "Thật vậy, $ABCD$ là hình bình hành nên $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$; $ACC'A'$ là hình bình hành nên $\\overrightarrow{AC} + \\overrightarrow{AA'} = \\overrightarrow{AC'}$.",
        },
        {
          type: 'p',
          text: 'Trong hệ toạ độ $Oxyz$, nếu $\\vec{u} = (x_1; y_1; z_1)$, $\\vec{v} = (x_2; y_2; z_2)$, $\\vec{w} = (x_3; y_3; z_3)$ thì $\\vec{u} + \\vec{v} + \\vec{w} = (x_1 + x_2 + x_3; y_1 + y_2 + y_3; z_1 + z_2 + z_3)$. Toạ độ cho ta cách kiểm tra hình vẽ của phần mềm.',
        },
      ],
    },
    {
      heading: 'Vẽ vectơ tổng bằng GeoGebra 3D',
      blocks: [
        {
          type: 'p',
          text: 'Mở GeoGebra 3D (trực tuyến tại geogebra.org/3d, hoặc trong GeoGebra Classic chọn Hiển thị, Đồ hoạ 3D). Cửa sổ Đồ hoạ 3D có sẵn ba trục $Ox$, $Oy$, $Oz$; kéo chuột trên nền để xoay hình.',
        },
        {
          type: 'table',
          head: ['Gõ vào ô Nhập lệnh', 'Kết quả'],
          rows: [
            ['O = (0, 0, 0)', 'Điểm $O(0; 0; 0)$'],
            ['u = Vector((1, 2, 0))', 'Vectơ $\\vec{u} = (1; 2; 0)$, vẽ từ gốc toạ độ'],
            ['u = Vector(A, B)', 'Vectơ $\\overrightarrow{AB}$ khi đã có hai điểm $A$, $B$'],
            [
              'Translate(v, O + u)',
              'Vectơ $\\vec{v}$ đặt tại ngọn của $\\vec{u}$ (điểm đầu là $O + \\vec{u}$)',
            ],
            ['s = u + v + w', 'Vectơ tổng $\\vec{s}$, kèm toạ độ trong cửa sổ Đại số'],
            [
              'Prism(A, B, C, D, E)',
              'Lăng trụ có đáy $ABCD$ và đỉnh $E$ ở đáy trên ứng với $A$; đáy là hình bình hành thì được hình hộp',
            ],
          ],
          caption: 'Một số lệnh GeoGebra 3D dùng trong hoạt động.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cách viết toạ độ trong phần mềm',
          text: 'Sách viết toạ độ bằng dấu chấm phẩy, như $(1; -2; 3)$. Trong GeoGebra, các toạ độ ngăn cách bằng dấu phẩy, gõ (1, -2, 3), và số thập phân viết bằng dấu chấm; dấu chấm phẩy trong GeoGebra dùng cho toạ độ cực, sẽ cho một điểm khác.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cách 1, nối tiếp: tạo ba vectơ $\\vec{u}$, $\\vec{v}$, $\\vec{w}$; dùng Translate đặt $\\vec{v}$ tại ngọn của $\\vec{u}$ và $\\vec{w}$ tại ngọn của $\\vec{v}$; vectơ từ $O$ đến ngọn của $\\vec{w}$ là vectơ tổng.',
            'Cách 2, hình hộp: dựng hình hộp Prism(O, O + u, O + u + v, O + v, O + w); đường chéo từ $O$ đến đỉnh $O + \\vec{u} + \\vec{v} + \\vec{w}$ là vectơ tổng.',
            'Nhập s = u + v + w để GeoGebra vẽ vectơ tổng: nó phải trùng với vectơ ở cách 1 và đường chéo ở cách 2.',
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Kiểm chứng quy tắc hình hộp bằng GeoGebra',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: dựng vectơ tổng của ba vectơ trong không gian bằng hai cách, kiểm chứng quy tắc hình hộp trên nhiều bộ vectơ và giải thích kết quả bằng toạ độ. Làm theo cặp hoặc nhóm nhỏ.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính hoặc điện thoại có GeoGebra 3D, vở ghi kết quả.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn ba vectơ $\\vec{u}$, $\\vec{v}$, $\\vec{w}$ có toạ độ nguyên, chẳng hạn $(1; 2; 0)$, $(0; 1; 3)$, $(2; -1; 1)$. Nhập chúng vào GeoGebra.',
            'Vẽ vectơ tổng bằng cách đặt nối tiếp (lệnh Translate). Xoay hình để thấy rõ ba vectơ không cùng nằm trên một mặt phẳng.',
            "Dựng hình hộp trên ba vectơ chung gốc $O$ bằng lệnh Prism. Đặt tên các đỉnh theo $ABCD.A'B'C'D'$ và quan sát đường chéo $AC'$.",
            'Nhập s = u + v + w; so sánh toạ độ của $\\vec{s}$ trong cửa sổ Đại số với tổng toạ độ tính tay, và đo độ dài bằng lệnh Length(s).',
            'Lặp lại với một bộ ba vectơ đồng phẳng, chẳng hạn $(1; 0; 0)$, $(0; 1; 0)$, $(1; 1; 0)$. Hình hộp lúc này trông thế nào? Quy tắc hình hộp còn đúng không?',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: ảnh chụp màn hình hai cách dựng cho mỗi bộ vectơ, bảng so sánh toạ độ vectơ tổng (phần mềm và tính tay) cùng độ dài của nó, và nhận xét về trường hợp ba vectơ đồng phẳng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dựng vectơ tổng trong không gian',
    instruction:
      'Chọn vectơ cần sửa rồi tăng giảm từng toạ độ. Chuyển giữa "Quy tắc hình hộp" và "Nối tiếp": vectơ tổng (màu tím) luôn là một. Kéo hoặc dùng phím mũi tên để xoay hình. Bấm "Thử thách" và chỉ sửa vectơ $\\vec{w}$ để vectơ tổng đi đến đúng điểm $T$.',
  },
  examples: [
    {
      problem:
        'Dùng GeoGebra vẽ vectơ tổng của $\\vec{u} = (1; 2; 0)$, $\\vec{v} = (0; 1; 3)$, $\\vec{w} = (2; -1; 1)$. Kiểm tra toạ độ và tính độ dài của vectơ tổng.',
      steps: [
        'Gõ lần lượt u = Vector((1, 2, 0)), v = Vector((0, 1, 3)), w = Vector((2, -1, 1)), rồi s = u + v + w.',
        'Cửa sổ Đại số cho $\\vec{s} = (3; 2; 4)$. Tính tay: $(1 + 0 + 2; 2 + 1 - 1; 0 + 3 + 1) = (3; 2; 4)$.',
        '$|\\vec{s}| = \\sqrt{3^2 + 2^2 + 4^2} = \\sqrt{29}$; lệnh Length(s) cho $5{,}39$.',
      ],
      answer:
        '$\\vec{u} + \\vec{v} + \\vec{w} = (3; 2; 4)$ và $|\\vec{u} + \\vec{v} + \\vec{w}| = \\sqrt{29} \\approx 5{,}39$.',
    },
    {
      problem:
        "Dựng hình hộp $ABCD.A'B'C'D'$ với $A(0; 0; 0)$, $\\overrightarrow{AB} = (2; 0; 0)$, $\\overrightarrow{AD} = (1; 3; 0)$, $\\overrightarrow{AA'} = (0; 1; 2)$. Tìm toạ độ đỉnh $C'$ và kiểm tra quy tắc hình hộp.",
      steps: [
        "$B(2; 0; 0)$, $D(1; 3; 0)$, $A'(0; 1; 2)$. Vì $ABCD$ là hình bình hành nên $\\overrightarrow{BC} = \\overrightarrow{AD}$, suy ra $C(3; 3; 0)$.",
        "$ACC'A'$ là hình bình hành nên $\\overrightarrow{CC'} = \\overrightarrow{AA'}$, suy ra $C'(3; 4; 2)$.",
        "$\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} = (2 + 1 + 0; 0 + 3 + 1; 0 + 0 + 2) = (3; 4; 2) = \\overrightarrow{AC'}$.",
        "Trong GeoGebra: Prism(A, B, C, D, A') vẽ hình hộp, và vectơ u + v + w trùng với đường chéo $AC'$.",
      ],
      answer:
        "$C'(3; 4; 2)$ và $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} = \\overrightarrow{AC'}$.",
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        "Cho hình hộp $ABCD.A'B'C'D'$. Vectơ $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'}$ bằng vectơ nào?",
      options: [
        "$\\overrightarrow{AC'}$",
        '$\\overrightarrow{AC}$',
        "$\\overrightarrow{AD'}$",
        "$\\overrightarrow{CA'}$",
      ],
      answer: 0,
      hints: ['Cộng hai vectơ đầu theo quy tắc hình bình hành trong mặt đáy.'],
      solution:
        "$\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$ và $\\overrightarrow{AC} + \\overrightarrow{AA'} = \\overrightarrow{AC'}$ (quy tắc hình hộp).",
    },
    {
      type: 'multi',
      prompt: "Cho hình hộp $ABCD.A'B'C'D'$. Những tổng nào bằng $\\overrightarrow{AC'}$?",
      options: [
        "$\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'}$",
        "$\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CC'}$",
        "$\\overrightarrow{AD'} + \\overrightarrow{AB}$",
        '$\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AC}$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Tổng các vectơ nối tiếp nhau dùng quy tắc ba điểm.',
        "$ADD'A'$ là hình bình hành nên $\\overrightarrow{AD'} = \\overrightarrow{AD} + \\overrightarrow{AA'}$.",
      ],
      solution:
        "Quy tắc hình hộp cho tổng thứ nhất. Quy tắc ba điểm: $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CC'} = \\overrightarrow{AC'}$. $\\overrightarrow{AD'} + \\overrightarrow{AB} = \\overrightarrow{AD} + \\overrightarrow{AA'} + \\overrightarrow{AB} = \\overrightarrow{AC'}$. Còn $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AC} = 2\\overrightarrow{AC}$, không bằng $\\overrightarrow{AC'}$.",
    },
    {
      type: 'choice',
      prompt:
        'Trong GeoGebra đã có vectơ v và điểm A. Lệnh nào vẽ vectơ bằng $\\vec{v}$ có điểm đầu là $A$?',
      options: ['Translate(v, A)', 'Vector(A, v)', 'Prism(A, v)', 'Length(v)'],
      answer: 0,
      hints: ['Ta cần "tịnh tiến" vectơ $\\vec{v}$ đến điểm đầu mới.'],
      solution:
        'Translate(v, A) đặt vectơ $\\vec{v}$ với điểm đầu $A$. Vector dùng để tạo vectơ từ hai điểm hoặc từ toạ độ, Prism dựng lăng trụ, Length tính độ dài.',
    },
    {
      type: 'choice',
      prompt: 'Muốn tạo điểm $A(1; -2; 3)$ trong GeoGebra, ta gõ dòng nào?',
      options: ['A = (1, -2, 3)', 'A = (1; -2; 3)', 'A = {1, -2, 3}', 'A = 1, -2, 3'],
      answer: 0,
      hints: ['Trong GeoGebra, toạ độ được ngăn cách bằng dấu phẩy và đặt trong ngoặc tròn.'],
      solution:
        'Gõ A = (1, -2, 3). Dấu chấm phẩy trong GeoGebra dùng cho toạ độ cực, ngoặc nhọn tạo một danh sách, không phải một điểm.',
    },
    {
      type: 'number',
      prompt:
        'Cho $\\vec{u} = (1; -2; 3)$, $\\vec{v} = (2; 0; 1)$, $\\vec{w} = (-1; 4; 0)$. Tính $|\\vec{u} + \\vec{v} + \\vec{w}|$ (làm tròn đến hàng phần trăm).',
      answer: 4.9,
      tolerance: 0.005,
      hints: [
        'Cộng từng toạ độ để được vectơ tổng.',
        'Độ dài của $(a; b; c)$ là $\\sqrt{a^2 + b^2 + c^2}$.',
      ],
      solution:
        '$\\vec{u} + \\vec{v} + \\vec{w} = (1 + 2 - 1; -2 + 0 + 4; 3 + 1 + 0) = (2; 2; 4)$, độ dài $\\sqrt{4 + 4 + 16} = \\sqrt{24} = 2\\sqrt{6} \\approx 4{,}90$.',
    },
    {
      type: 'number',
      prompt:
        "Hình hộp chữ nhật $ABCD.A'B'C'D'$ có $AB = 2$, $AD = 3$, $AA' = 6$. Tính $|\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'}|$.",
      answer: 7,
      hints: [
        "Theo quy tắc hình hộp, tổng là $\\overrightarrow{AC'}$.",
        "Đường chéo hình hộp chữ nhật: $AC'^2 = AB^2 + AD^2 + AA'^2$.",
      ],
      solution:
        "$|\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'}| = AC' = \\sqrt{2^2 + 3^2 + 6^2} = \\sqrt{49} = 7$.",
    },
    {
      type: 'number',
      prompt:
        'Cho điểm $A(1; 0; 2)$ và $\\vec{u} = (1; 2; 0)$, $\\vec{v} = (0; 1; 3)$, $\\vec{w} = (2; -1; 1)$. Điểm $M$ thoả mãn $\\overrightarrow{AM} = \\vec{u} + \\vec{v} + \\vec{w}$. Tìm cao độ của $M$.',
      answer: 6,
      hints: [
        'Tính vectơ tổng trước.',
        'Toạ độ của $M$ bằng toạ độ của $A$ cộng toạ độ của $\\overrightarrow{AM}$.',
      ],
      solution:
        '$\\vec{u} + \\vec{v} + \\vec{w} = (3; 2; 4)$ nên $M(1 + 3; 0 + 2; 2 + 4) = (4; 2; 6)$. Cao độ của $M$ là $6$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước vẽ vectơ tổng của ba vectơ bằng cách đặt nối tiếp trong GeoGebra.',
      items: [
        'Tạo ba vectơ u, v, w bằng lệnh Vector.',
        'Dùng Translate đặt v tại ngọn của u.',
        'Dùng Translate đặt w tại ngọn của vectơ v vừa đặt.',
        'Vẽ vectơ từ điểm đầu của u đến ngọn của w và so sánh với s = u + v + w.',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Mỗi vectơ chỉ đặt được nối tiếp khi vectơ trước nó đã có.'],
      solution:
        'Tạo ba vectơ, đặt $\\vec{v}$ nối tiếp $\\vec{u}$, đặt $\\vec{w}$ nối tiếp $\\vec{v}$, rồi vẽ vectơ từ điểm đầu của $\\vec{u}$ đến ngọn của $\\vec{w}$: đó là $\\vec{u} + \\vec{v} + \\vec{w}$ theo quy tắc ba điểm.',
    },
  ],
  takeaways: [
    'Tổng ba vectơ đặt nối tiếp $\\overrightarrow{OA} + \\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{OC}$.',
    "Quy tắc hình hộp: $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} = \\overrightarrow{AC'}$.",
    'Trong GeoGebra 3D: Vector tạo vectơ, Translate đặt vectơ tại điểm khác, Prism dựng hình hộp, u + v + w cho vectơ tổng; toạ độ ngăn cách bằng dấu phẩy.',
  ],
};
