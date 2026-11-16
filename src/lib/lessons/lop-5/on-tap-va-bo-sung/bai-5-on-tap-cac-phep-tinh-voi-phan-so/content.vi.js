/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cộng, trừ, nhân, chia phân số; cộng, trừ phân số với số tự nhiên; tính giá trị biểu thức, tính thuận tiện và giải toán có phân số.',
  intro:
    'Trong một phút, Nam chạy được $\\dfrac{3}{5}$ đoạn đường, Việt chạy được $\\dfrac{7}{10}$ đoạn đường. Ai chạy nhiều hơn và nhiều hơn bao nhiêu? Cùng ôn lại các phép tính với phân số nhé!',
  objectives: [
    'Cộng, trừ được hai phân số cùng mẫu số, hoặc có mẫu số này chia hết cho mẫu số kia.',
    'Nhân, chia được hai phân số; nhân, chia phân số với số tự nhiên.',
    'Tính được giá trị biểu thức và giải được bài toán có phân số.',
  ],
  sections: [
    {
      heading: 'Cộng, trừ phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cộng (trừ) hai phân số cùng mẫu số: cộng (trừ) hai tử số, giữ nguyên mẫu số.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cộng (trừ) hai phân số khác mẫu số: quy đồng mẫu số rồi cộng (trừ) hai phân số đã quy đồng.',
        },
        {
          type: 'p',
          text: '$\\dfrac{6}{5} + \\dfrac{7}{15} = \\dfrac{18}{15} + \\dfrac{7}{15} = \\dfrac{25}{15} = \\dfrac{5}{3}$',
        },
        {
          type: 'p',
          text: 'Với số tự nhiên, em viết số đó thành phân số: $\\dfrac{3}{8} + 4 = \\dfrac{3}{8} + \\dfrac{32}{8} = \\dfrac{35}{8}$.',
        },
      ],
    },
    {
      heading: 'Nhân, chia phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân hai phân số: lấy tử số nhân tử số, mẫu số nhân mẫu số.',
        },
        {
          type: 'p',
          text: '$\\dfrac{5}{8} \\times \\dfrac{8}{15} = \\dfrac{5 \\times 8}{8 \\times 15} = \\dfrac{40}{120} = \\dfrac{1}{3}$',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chia hai phân số: lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược.',
        },
        {
          type: 'p',
          text: '$\\dfrac{12}{7} : \\dfrac{8}{7} = \\dfrac{12}{7} \\times \\dfrac{7}{8} = \\dfrac{84}{56} = \\dfrac{3}{2}$',
        },
        {
          type: 'p',
          text: 'Chia phân số cho số tự nhiên: giữ nguyên tử số, nhân mẫu số với số đó. $\\dfrac{24}{5} : 4 = \\dfrac{24}{20} = \\dfrac{6}{5}$.',
        },
      ],
    },
    {
      heading: 'Biểu thức và tính thuận tiện',
      blocks: [
        {
          type: 'p',
          text: 'Thứ tự thực hiện phép tính với phân số giống như với số tự nhiên: trong ngoặc trước; nhân, chia trước, cộng, trừ sau.',
        },
        {
          type: 'p',
          text: '$\\dfrac{5}{6} \\times \\dfrac{3}{7} + \\dfrac{3}{7} \\times \\dfrac{7}{6} = \\dfrac{3}{7} \\times \\left(\\dfrac{5}{6} + \\dfrac{7}{6}\\right) = \\dfrac{3}{7} \\times 2 = \\dfrac{6}{7}$',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tìm phân số của một số: muốn tìm $\\dfrac{3}{4}$ của 40, em lấy 40 × $\\dfrac{3}{4}$ = 30.',
        },
      ],
    },
  ],
  explore: {
    title: 'Băng phân số cho từng phép tính',
    instruction:
      'Em bấm "Bước tiếp theo" để xem các băng giấy quy đồng, chia nhỏ hoặc ghép lại. Rồi em chọn kết quả, băng xanh sẽ hiện kết quả.',
  },
  examples: [
    {
      problem:
        'Thư viện có $\\dfrac{2}{3}$ số sách là sách giáo khoa, $\\dfrac{2}{9}$ số sách là sách tham khảo, còn lại là truyện và tạp chí. Truyện và tạp chí chiếm mấy phần số sách?',
      steps: [
        'Cả thư viện là 1, tức $\\dfrac{9}{9}$ số sách.',
        '$\\dfrac{2}{3} = \\dfrac{6}{9}$.',
        '$1 - \\dfrac{6}{9} - \\dfrac{2}{9} = \\dfrac{9}{9} - \\dfrac{6}{9} - \\dfrac{2}{9} = \\dfrac{1}{9}$.',
      ],
      answer: 'Truyện và tạp chí chiếm $\\dfrac{1}{9}$ số sách.',
    },
    {
      problem:
        'Tấm kính hình chữ nhật dài $\\dfrac{5}{2}$ m, rộng $\\dfrac{4}{3}$ m, chia thành 3 phần bằng nhau. Tính diện tích mỗi phần.',
      steps: [
        'Diện tích tấm kính: $\\dfrac{5}{2} \\times \\dfrac{4}{3} = \\dfrac{20}{6} = \\dfrac{10}{3}$ (m²).',
        'Diện tích mỗi phần: $\\dfrac{10}{3} : 3 = \\dfrac{10}{9}$ (m²).',
      ],
      answer: 'Mỗi phần có diện tích $\\dfrac{10}{9}$ m².',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{2}{3} + \\dfrac{5}{12}$ (viết kết quả là phân số tối giản)',
      answer: [13, 12],
      simplest: true,
      hints: ['12 : 3 = 4, quy đồng $\\dfrac{2}{3}$ thành phân số có mẫu số 12.'],
      solution:
        '$\\dfrac{2}{3} + \\dfrac{5}{12} = \\dfrac{8}{12} + \\dfrac{5}{12} = \\dfrac{13}{12}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{15}{16} - \\dfrac{3}{4}$',
      answer: [3, 16],
      simplest: true,
      hints: ['16 : 4 = 4, nên $\\dfrac{3}{4} = \\dfrac{12}{16}$.'],
      solution:
        '$\\dfrac{15}{16} - \\dfrac{3}{4} = \\dfrac{15}{16} - \\dfrac{12}{16} = \\dfrac{3}{16}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: 3 − $\\dfrac{16}{7}$',
      answer: [5, 7],
      simplest: true,
      hints: ['Viết 3 thành phân số có mẫu số 7: 3 = $\\dfrac{21}{7}$.'],
      solution: '3 − $\\dfrac{16}{7}$ = $\\dfrac{21}{7} - \\dfrac{16}{7} = \\dfrac{5}{7}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính giá trị biểu thức: $\\dfrac{4}{7} + \\dfrac{9}{14} - \\dfrac{5}{7}$',
      answer: [1, 2],
      simplest: true,
      hints: ['Quy đồng các phân số với mẫu số 14.'],
      solution:
        '$\\dfrac{8}{14} + \\dfrac{9}{14} - \\dfrac{10}{14} = \\dfrac{7}{14} = \\dfrac{1}{2}$.',
    },
    {
      type: 'choice',
      prompt:
        'Trong một phút, Nam chạy được $\\dfrac{3}{5}$ đoạn đường, Việt chạy được $\\dfrac{7}{10}$ đoạn đường. Câu nào đúng?',
      options: [
        'Việt chạy nhiều hơn Nam $\\dfrac{1}{10}$ đoạn đường.',
        'Nam chạy nhiều hơn Việt $\\dfrac{1}{10}$ đoạn đường.',
        'Việt chạy nhiều hơn Nam $\\dfrac{4}{5}$ đoạn đường.',
        'Hai bạn chạy bằng nhau.',
      ],
      answer: 0,
      hints: ['Quy đồng: $\\dfrac{3}{5} = \\dfrac{?}{10}$.'],
      solution:
        '$\\dfrac{3}{5} = \\dfrac{6}{10} < \\dfrac{7}{10}$. Việt chạy nhiều hơn: $\\dfrac{7}{10} - \\dfrac{6}{10} = \\dfrac{1}{10}$ đoạn đường.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{4}{9} \\times \\dfrac{3}{8}$',
      answer: [1, 6],
      simplest: true,
      hints: ['Tử số nhân tử số, mẫu số nhân mẫu số, rồi rút gọn.'],
      solution: '$\\dfrac{4}{9} \\times \\dfrac{3}{8} = \\dfrac{12}{72} = \\dfrac{1}{6}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{10}{9} : \\dfrac{5}{6}$',
      answer: [4, 3],
      simplest: true,
      hints: ['Nhân với phân số đảo ngược của $\\dfrac{5}{6}$.'],
      solution:
        '$\\dfrac{10}{9} : \\dfrac{5}{6} = \\dfrac{10}{9} \\times \\dfrac{6}{5} = \\dfrac{60}{45} = \\dfrac{4}{3}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính giá trị biểu thức: $\\dfrac{9}{10} \\times \\dfrac{5}{6} : 3$',
      answer: [1, 4],
      simplest: true,
      hints: ['Tính lần lượt từ trái sang phải.'],
      solution:
        '$\\dfrac{9}{10} \\times \\dfrac{5}{6} = \\dfrac{45}{60} = \\dfrac{3}{4}$; $\\dfrac{3}{4} : 3 = \\dfrac{3}{12} = \\dfrac{1}{4}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tấm biển hình vuông được viền bằng dây đèn dài 18 m vừa đủ một vòng. Diện tích tấm biển là bao nhiêu mét vuông? (viết dạng phân số)',
      answer: [81, 4],
      simplest: true,
      hints: [
        'Cạnh hình vuông: 18 : 4 = $\\dfrac{18}{4} = \\dfrac{9}{2}$ (m).',
        'Diện tích = cạnh × cạnh.',
      ],
      solution:
        'Cạnh: 18 : 4 = $\\dfrac{9}{2}$ m. Diện tích: $\\dfrac{9}{2} \\times \\dfrac{9}{2} = \\dfrac{81}{4}$ (m²).',
    },
    {
      type: 'multi',
      prompt: 'Em chọn tất cả các phép tính đúng.',
      options: [
        '$\\dfrac{5}{9} + \\dfrac{4}{3} = \\dfrac{17}{9}$',
        '$\\dfrac{3}{10} \\times \\dfrac{5}{6} = \\dfrac{1}{4}$',
        '$\\dfrac{15}{8} : \\dfrac{3}{4} = \\dfrac{5}{2}$',
        '$\\dfrac{11}{12} - \\dfrac{1}{4} = \\dfrac{3}{4}$',
      ],
      answers: [0, 1, 2],
      hints: ['Em tự tính từng phép tính rồi rút gọn.'],
      solution:
        '$\\dfrac{5}{9} + \\dfrac{12}{9} = \\dfrac{17}{9}$ đúng. $\\dfrac{15}{60} = \\dfrac{1}{4}$ đúng. $\\dfrac{15}{8} \\times \\dfrac{4}{3} = \\dfrac{60}{24} = \\dfrac{5}{2}$ đúng. Còn $\\dfrac{11}{12} - \\dfrac{3}{12} = \\dfrac{8}{12} = \\dfrac{2}{3}$, không phải $\\dfrac{3}{4}$.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 5A quyên góp được 96 quyển sách. Lớp 5B quyên góp được $\\dfrac{7}{8}$ số sách của lớp 5A. Cả hai lớp quyên góp được bao nhiêu quyển sách?',
      answer: 180,
      unit: 'quyển',
      hints: ['Số sách lớp 5B: 96 × $\\dfrac{7}{8}$.', 'Rồi cộng với số sách lớp 5A.'],
      solution: 'Lớp 5B: 96 × $\\dfrac{7}{8}$ = 84 (quyển). Cả hai lớp: 96 + 84 = 180 (quyển).',
    },
    {
      type: 'fraction',
      prompt:
        'Tính bằng cách thuận tiện: $\\dfrac{10}{11} \\times \\dfrac{9}{16} \\times \\dfrac{11}{10} \\times \\dfrac{8}{9}$',
      answer: [1, 2],
      simplest: true,
      hints: [
        'Đổi chỗ để nhân $\\dfrac{10}{11} \\times \\dfrac{11}{10}$ trước.',
        'Tích của một phân số với phân số đảo ngược của nó bằng 1.',
      ],
      solution:
        '$\\left(\\dfrac{10}{11} \\times \\dfrac{11}{10}\\right) \\times \\left(\\dfrac{9}{16} \\times \\dfrac{8}{9}\\right) = 1 \\times \\dfrac{8}{16} = \\dfrac{1}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'Mai có băng giấy dài $\\dfrac{2}{3}$ m. Mai gấp đôi băng giấy hai lần được 4 đoạn bằng nhau. Mai cần lấy bao nhiêu đoạn để được $\\dfrac{1}{2}$ m?',
      answer: 3,
      unit: 'đoạn',
      hints: [
        'Mỗi đoạn dài $\\dfrac{2}{3} : 4$ m.',
        'Rồi tính $\\dfrac{1}{2}$ chia cho độ dài mỗi đoạn.',
      ],
      solution:
        'Mỗi đoạn dài $\\dfrac{2}{3} : 4 = \\dfrac{2}{12} = \\dfrac{1}{6}$ (m). Số đoạn: $\\dfrac{1}{2} : \\dfrac{1}{6} = \\dfrac{1}{2} \\times 6 = 3$ (đoạn).',
    },
  ],
  takeaways: [
    'Cộng, trừ: quy đồng mẫu số (nếu cần), rồi cộng, trừ tử số, giữ nguyên mẫu số.',
    'Nhân: tử số nhân tử số, mẫu số nhân mẫu số.',
    'Chia: nhân với phân số thứ hai đảo ngược.',
    'Rút gọn kết quả đến phân số tối giản.',
  ],
};
