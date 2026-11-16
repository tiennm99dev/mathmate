/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số trung bình, trung vị, tứ phân vị và mốt của mẫu số liệu ghép nhóm: giá trị đại diện, nhóm chứa trung vị, công thức nội suy và nhóm chứa mốt.',
  intro:
    'Bảng thời gian tự học của 40 bạn chỉ cho biết có bao nhiêu bạn trong mỗi khoảng $[0; 20)$, $[20; 40)$, … phút, không còn từng con số. Vậy làm sao ước lượng thời gian tự học trung bình, trung vị hay mốt? Bài này cho cách tính các số đặc trưng đó từ bảng tần số ghép nhóm, với giả thiết các giá trị trong mỗi nhóm rải đều trên nhóm.',
  objectives: [
    'Tính số trung bình của mẫu số liệu ghép nhóm bằng giá trị đại diện của các nhóm.',
    'Xác định nhóm chứa trung vị, tứ phân vị và tính chúng bằng công thức.',
    'Xác định nhóm chứa mốt và tính mốt của mẫu số liệu ghép nhóm.',
    'Giải thích ý nghĩa của các số đặc trưng trong bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Số trung bình',
      blocks: [
        {
          type: 'p',
          text: 'Từ bảng ghép nhóm ta không biết từng giá trị, nên thay mọi giá trị của nhóm $[a_i; a_{i+1})$ bằng điểm giữa của nhóm, $x_i = \\dfrac{a_i + a_{i+1}}{2}$, gọi là giá trị đại diện của nhóm.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số trung bình của mẫu số liệu ghép nhóm',
          text: 'Cho mẫu số liệu ghép nhóm có $k$ nhóm, nhóm thứ $i$ có giá trị đại diện $x_i$ và tần số $m_i$, cỡ mẫu $n = m_1 + m_2 + \\cdots + m_k$. Số trung bình của mẫu là $\\overline{x} = \\dfrac{m_1x_1 + m_2x_2 + \\cdots + m_kx_k}{n}$.',
        },
        {
          type: 'p',
          text: 'Số trung bình của mẫu ghép nhóm xấp xỉ số trung bình của mẫu số liệu gốc. Nó cho biết vị trí trung tâm của mẫu và có thể dùng để đại diện cho mẫu số liệu.',
        },
      ],
    },
    {
      heading: 'Trung vị và tứ phân vị',
      blocks: [
        {
          type: 'p',
          text: 'Sắp xếp $n$ số liệu gốc theo thứ tự không giảm $x_1 \\le x_2 \\le \\cdots \\le x_n$. Trung vị là số đứng giữa: $x_{\\frac{n+1}{2}}$ khi $n$ lẻ, $\\dfrac{1}{2}\\left(x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}\\right)$ khi $n$ chẵn. Từ bảng ghép nhóm ta biết số đó nằm trong nhóm nào, rồi ước lượng vị trí của nó trong nhóm bằng cách coi các giá trị của nhóm rải đều trên nhóm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Trung vị của mẫu số liệu ghép nhóm',
          text: 'Gọi $n$ là cỡ mẫu. Giả sử nhóm $[a_p; a_{p+1})$ chứa trung vị, $m_p$ là tần số của nhóm đó và $C = m_1 + m_2 + \\cdots + m_{p-1}$ là tổng tần số các nhóm đứng trước. Khi đó $M_e = a_p + \\dfrac{\\frac{n}{2} - C}{m_p} \\cdot (a_{p+1} - a_p)$.',
        },
        {
          type: 'p',
          text: 'Nhóm chứa trung vị là nhóm đầu tiên mà tần số tích luỹ (tổng tần số từ nhóm đầu đến hết nhóm đó) lớn hơn hoặc bằng $\\dfrac{n}{2}$. Phân số $\\dfrac{\\frac{n}{2} - C}{m_p}$ cho biết cần đi bao nhiêu phần độ dài nhóm để gặp đủ $\\dfrac{n}{2}$ số liệu.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tứ phân vị',
          text: 'Tứ phân vị thứ hai $Q_2$ chính là trung vị $M_e$. Nếu nhóm $[a_p; a_{p+1})$ chứa tứ phân vị thứ nhất thì $Q_1 = a_p + \\dfrac{\\frac{n}{4} - (m_1 + \\cdots + m_{p-1})}{m_p} \\cdot (a_{p+1} - a_p)$. Nếu nhóm $[a_q; a_{q+1})$ chứa tứ phân vị thứ ba thì $Q_3 = a_q + \\dfrac{\\frac{3n}{4} - (m_1 + \\cdots + m_{q-1})}{m_q} \\cdot (a_{q+1} - a_q)$.',
        },
        {
          type: 'p',
          text: 'Ba số $Q_1$, $Q_2$, $Q_3$ chia mẫu số liệu thành bốn phần, mỗi phần chứa khoảng $25\\%$ số liệu. Trung vị không bị ảnh hưởng bởi vài giá trị quá lớn hay quá nhỏ, nên thường dùng khi mẫu có giá trị bất thường.',
        },
      ],
    },
    {
      heading: 'Mốt',
      blocks: [
        {
          type: 'p',
          text: 'Mốt là giá trị xuất hiện nhiều nhất. Ở mẫu ghép nhóm, mốt nằm trong nhóm có tần số lớn nhất, gọi là nhóm chứa mốt. Mốt thường không nằm ở giữa nhóm mà lệch về phía nhóm kề có tần số lớn hơn; nó nằm đúng giữa nhóm khi hai nhóm kề có tần số bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Mốt của mẫu số liệu ghép nhóm',
          text: 'Giả sử nhóm chứa mốt là $[a_j; a_{j+1})$, có tần số $m_j$; $m_{j-1}$ và $m_{j+1}$ là tần số của nhóm liền trước và liền sau, $h$ là độ dài nhóm. Khi đó $M_O = a_j + \\dfrac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})} \\cdot h$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Nếu nhóm chứa mốt là nhóm đầu tiên thì lấy $m_{j-1} = 0$; nếu là nhóm cuối cùng thì lấy $m_{j+1} = 0$. Một mẫu có thể có nhiều nhóm cùng tần số lớn nhất, khi đó có thể có nhiều mốt.',
        },
        {
          type: 'p',
          text: 'Trên biểu đồ, nối đỉnh trái của cột cao nhất với đỉnh cột liền sau và đỉnh phải của nó với đỉnh cột liền trước: hai đoạn thẳng cắt nhau tại điểm có hoành độ đúng bằng $M_O$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Các số đặc trưng chỉ là xấp xỉ',
          text: 'Số trung bình, trung vị, tứ phân vị và mốt tính từ mẫu ghép nhóm chỉ xấp xỉ các số tương ứng của mẫu số liệu gốc, vì khi ghép nhóm ta đã mất thông tin về từng giá trị.',
        },
      ],
    },
  ],
  explore: {
    title: 'Số đặc trưng trên biểu đồ',
    instruction:
      'Chọn một số đặc trưng. Nhóm chứa nó được tô vàng; với trung vị và tứ phân vị, phần tô đậm trong cột là phần số liệu cần lấy thêm trong nhóm; với mốt, hai đoạn thẳng đỏ cắt nhau tại mốt. Bấm − và + để đổi tần số từng nhóm và quan sát số đặc trưng dịch chuyển.',
  },
  examples: [
    {
      problem:
        'Thời gian tự học mỗi ngày (phút) của $40$ học sinh: $[0; 20)$: $5$; $[20; 40)$: $9$; $[40; 60)$: $12$; $[60; 80)$: $10$; $[80; 100)$: $4$. Tính thời gian tự học trung bình.',
      steps: [
        'Giá trị đại diện của các nhóm: $x_1 = 10$, $x_2 = 30$, $x_3 = 50$, $x_4 = 70$, $x_5 = 90$.',
        '$m_1x_1 + \\cdots + m_5x_5 = 5 \\cdot 10 + 9 \\cdot 30 + 12 \\cdot 50 + 10 \\cdot 70 + 4 \\cdot 90 = 50 + 270 + 600 + 700 + 360 = 1\\,980$.',
        '$\\overline{x} = \\dfrac{1\\,980}{40} = 49{,}5$.',
      ],
      answer: 'Thời gian tự học trung bình khoảng $49{,}5$ phút.',
    },
    {
      problem: 'Với bảng thời gian tự học ở trên, tính trung vị và các tứ phân vị $Q_1$, $Q_3$.',
      steps: [
        'Tần số tích luỹ: $5$; $14$; $26$; $36$; $40$. Cỡ mẫu $n = 40$.',
        'Trung vị: $\\dfrac{n}{2} = 20$, nhóm đầu tiên có tần số tích luỹ $\\ge 20$ là $[40; 60)$, với $C = 14$, $m_3 = 12$. Vậy $M_e = 40 + \\dfrac{20 - 14}{12} \\cdot 20 = 50$.',
        '$Q_1$: $\\dfrac{n}{4} = 10$, nhóm chứa $Q_1$ là $[20; 40)$, với $C = 5$, $m_2 = 9$. Vậy $Q_1 = 20 + \\dfrac{10 - 5}{9} \\cdot 20 = \\dfrac{280}{9} \\approx 31{,}11$.',
        '$Q_3$: $\\dfrac{3n}{4} = 30$, nhóm chứa $Q_3$ là $[60; 80)$, với $C = 26$, $m_4 = 10$. Vậy $Q_3 = 60 + \\dfrac{30 - 26}{10} \\cdot 20 = 68$.',
      ],
      answer: '$M_e = 50$ phút, $Q_1 \\approx 31{,}11$ phút, $Q_3 = 68$ phút.',
    },
    {
      problem: 'Với bảng thời gian tự học ở trên, tìm mốt và giải thích ý nghĩa của nó.',
      steps: [
        'Nhóm có tần số lớn nhất là $[40; 60)$ với $m_3 = 12$; nhóm liền trước có $m_2 = 9$, nhóm liền sau có $m_4 = 10$, độ dài nhóm $h = 20$.',
        '$M_O = 40 + \\dfrac{12 - 9}{(12 - 9) + (12 - 10)} \\cdot 20 = 40 + \\dfrac{3}{5} \\cdot 20 = 52$.',
        'Mốt lệch khỏi điểm giữa $50$ của nhóm về phía nhóm $[60; 80)$, vì nhóm đó đông hơn nhóm $[20; 40)$.',
      ],
      answer:
        '$M_O = 52$: thời gian tự học khoảng $52$ phút mỗi ngày là phổ biến nhất trong nhóm học sinh này.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Cân nặng (kg) của $50$ học sinh: $[40; 45)$: $4$; $[45; 50)$: $10$; $[50; 55)$: $16$; $[55; 60)$: $12$; $[60; 65)$: $8$. Tính cân nặng trung bình $\\overline{x}$ (kg).',
      answer: 53.5,
      tolerance: 0.005,
      unit: 'kg',
      hints: [
        'Giá trị đại diện của nhóm $[40; 45)$ là $42{,}5$.',
        'Tính $\\dfrac{4 \\cdot 42{,}5 + 10 \\cdot 47{,}5 + 16 \\cdot 52{,}5 + 12 \\cdot 57{,}5 + 8 \\cdot 62{,}5}{50}$.',
      ],
      solution:
        '$\\overline{x} = \\dfrac{170 + 475 + 840 + 690 + 500}{50} = \\dfrac{2\\,675}{50} = 53{,}5$ (kg).',
    },
    {
      type: 'choice',
      prompt: 'Với bảng cân nặng ở câu trên, nhóm nào chứa trung vị?',
      options: ['$[50; 55)$', '$[45; 50)$', '$[55; 60)$', '$[60; 65)$'],
      answer: 0,
      hints: [
        'Tính tần số tích luỹ và tìm nhóm đầu tiên có tần số tích luỹ không nhỏ hơn $\\dfrac{n}{2} = 25$.',
      ],
      solution:
        'Tần số tích luỹ: $4$; $14$; $30$; $42$; $50$. Nhóm đầu tiên có tần số tích luỹ $\\ge 25$ là $[50; 55)$.',
    },
    {
      type: 'number',
      prompt: 'Với bảng cân nặng ở trên, tính trung vị $M_e$ (kg, làm tròn đến hàng phần trăm).',
      answer: 53.44,
      tolerance: 0.006,
      unit: 'kg',
      hints: [
        'Nhóm chứa trung vị là $[50; 55)$ với $C = 4 + 10 = 14$ và $m_p = 16$.',
        '$M_e = 50 + \\dfrac{25 - 14}{16} \\cdot 5$.',
      ],
      solution:
        '$M_e = 50 + \\dfrac{25 - 14}{16} \\cdot 5 = 50 + \\dfrac{55}{16} = 53{,}4375 \\approx 53{,}44$ (kg).',
    },
    {
      type: 'number',
      prompt: 'Với bảng cân nặng ở trên, tính tứ phân vị thứ nhất $Q_1$ (kg).',
      answer: 49.25,
      tolerance: 0.005,
      unit: 'kg',
      hints: [
        '$\\dfrac{n}{4} = 12{,}5$; nhóm đầu tiên có tần số tích luỹ $\\ge 12{,}5$ chứa $Q_1$.',
        'Đó là nhóm $[45; 50)$ với $C = 4$, $m_p = 10$.',
      ],
      solution: '$Q_1 = 45 + \\dfrac{12{,}5 - 4}{10} \\cdot 5 = 45 + 4{,}25 = 49{,}25$ (kg).',
    },
    {
      type: 'number',
      prompt:
        'Với bảng cân nặng ở trên, tính tứ phân vị thứ ba $Q_3$ (kg, làm tròn đến hàng phần trăm).',
      answer: 58.13,
      tolerance: 0.006,
      unit: 'kg',
      hints: [
        '$\\dfrac{3n}{4} = 37{,}5$; tần số tích luỹ đến hết nhóm $[50; 55)$ mới là $30$.',
        'Nhóm chứa $Q_3$ là $[55; 60)$ với $C = 30$, $m_q = 12$.',
      ],
      solution:
        '$Q_3 = 55 + \\dfrac{37{,}5 - 30}{12} \\cdot 5 = 55 + 3{,}125 = 58{,}125 \\approx 58{,}13$ (kg).',
    },
    {
      type: 'number',
      prompt: 'Với bảng cân nặng ở trên, tính mốt $M_O$ (kg).',
      answer: 53,
      tolerance: 0.005,
      unit: 'kg',
      hints: [
        'Nhóm chứa mốt là nhóm có tần số lớn nhất, $[50; 55)$ với $m_j = 16$.',
        '$m_{j-1} = 10$, $m_{j+1} = 12$, $h = 5$.',
      ],
      solution:
        '$M_O = 50 + \\dfrac{16 - 10}{(16 - 10) + (16 - 12)} \\cdot 5 = 50 + \\dfrac{6}{10} \\cdot 5 = 53$ (kg).',
    },
    {
      type: 'number',
      prompt:
        'Số lỗi chính tả trong bài của một lớp được ghép nhóm: $[0; 10)$: $15$; $[10; 20)$: $10$; $[20; 30)$: $5$. Tính mốt $M_O$.',
      answer: 7.5,
      tolerance: 0.005,
      hints: ['Nhóm chứa mốt là nhóm đầu tiên, không có nhóm liền trước.', 'Lấy $m_{j-1} = 0$.'],
      solution:
        '$M_O = 0 + \\dfrac{15 - 0}{(15 - 0) + (15 - 10)} \\cdot 10 = \\dfrac{15}{20} \\cdot 10 = 7{,}5$.',
    },
    {
      type: 'choice',
      prompt: 'Giá trị đại diện của nhóm $[45; 50)$ là',
      options: ['$47{,}5$', '$45$', '$50$', '$5$'],
      answer: 0,
      hints: ['Giá trị đại diện là điểm giữa của nhóm.'],
      solution: '$x = \\dfrac{45 + 50}{2} = 47{,}5$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây là đúng?',
      options: [
        'Số trung bình, trung vị và mốt tính từ mẫu ghép nhóm là giá trị xấp xỉ của các số tương ứng của mẫu gốc.',
        'Mốt của mẫu ghép nhóm luôn là điểm giữa của nhóm có tần số lớn nhất.',
        'Trung vị luôn thuộc nhóm có tần số lớn nhất.',
        'Tứ phân vị thứ hai $Q_2$ bằng số trung bình $\\overline{x}$.',
      ],
      answer: 0,
      hints: ['Nhớ lại ví dụ thời gian tự học: mốt $52$ không phải điểm giữa $50$ của nhóm.'],
      solution:
        'Khi ghép nhóm ta mất thông tin về từng giá trị nên mọi số đặc trưng chỉ là xấp xỉ. Mốt lệch khỏi điểm giữa về phía nhóm kề lớn hơn; trung vị là số đứng giữa, không nhất thiết ở nhóm đông nhất; $Q_2$ là trung vị chứ không phải số trung bình.',
    },
  ],
  takeaways: [
    'Giá trị đại diện của nhóm $[a_i; a_{i+1})$ là $x_i = \\dfrac{a_i + a_{i+1}}{2}$; số trung bình $\\overline{x} = \\dfrac{m_1x_1 + \\cdots + m_kx_k}{n}$.',
    'Nhóm chứa trung vị là nhóm đầu tiên có tần số tích luỹ $\\ge \\dfrac{n}{2}$; $M_e = a_p + \\dfrac{\\frac{n}{2} - C}{m_p}(a_{p+1} - a_p)$.',
    '$Q_1$, $Q_3$ tính như trung vị với $\\dfrac{n}{4}$ và $\\dfrac{3n}{4}$ thay cho $\\dfrac{n}{2}$; $Q_2 = M_e$.',
    'Nhóm chứa mốt có tần số lớn nhất; $M_O = a_j + \\dfrac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})} \\cdot h$.',
    'Các số đặc trưng của mẫu ghép nhóm chỉ xấp xỉ các số tương ứng của mẫu gốc.',
  ],
};
