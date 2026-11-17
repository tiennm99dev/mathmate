/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Quy tắc cộng, quy tắc nhân và sơ đồ hình cây: đếm số cách thực hiện một công việc theo nhiều phương án hoặc qua nhiều công đoạn.',
  intro:
    'Bạn Phong có $4$ chiếc áo, $3$ chiếc quần và $2$ đôi giày. Bạn ấy có thể mặc bao nhiêu bộ trang phục khác nhau? Liệt kê từng bộ thì dễ sót, dễ trùng. Bài này cho ta hai quy tắc đếm cơ bản và một cách vẽ để không bỏ sót trường hợp nào: sơ đồ hình cây.',
  objectives: [
    'Vận dụng quy tắc cộng khi công việc được thực hiện theo một trong nhiều phương án.',
    'Vận dụng quy tắc nhân khi công việc gồm nhiều công đoạn liên tiếp.',
    'Vẽ sơ đồ hình cây để minh hoạ và kiểm tra cách đếm.',
    'Kết hợp quy tắc cộng và quy tắc nhân trong các bài toán đếm đơn giản.',
  ],
  sections: [
    {
      heading: 'Quy tắc cộng và sơ đồ hình cây',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc cộng',
          text: 'Giả sử một công việc nào đó có thể thực hiện theo một trong hai phương án khác nhau: phương án một có $n_1$ cách thực hiện, phương án hai có $n_2$ cách thực hiện (không trùng với bất kì cách nào của phương án một). Khi đó số cách thực hiện công việc là $n_1 + n_2$ cách.',
        },
        {
          type: 'p',
          text: 'Quy tắc cộng mở rộng được cho công việc có nhiều phương án: nếu có $k$ phương án đôi một không trùng nhau, với $n_1, n_2, \\ldots, n_k$ cách thì số cách thực hiện công việc là $n_1 + n_2 + \\cdots + n_k$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sơ đồ hình cây',
          text: 'Sơ đồ hình cây là sơ đồ bắt đầu tại một nút duy nhất, từ đó toả ra các nhánh tới các nút tiếp theo. Mỗi đường đi từ gốc tới một nút cuối ứng với đúng một cách thực hiện công việc, nên số nút cuối bằng số cách.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Quy tắc cộng chỉ đúng khi các phương án không có cách nào chung. Nếu hai phương án có cách trùng nhau, cộng thẳng sẽ đếm những cách đó hai lần.',
        },
      ],
    },
    {
      heading: 'Quy tắc nhân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc nhân',
          text: 'Giả sử một công việc nào đó được chia thành hai công đoạn. Công đoạn thứ nhất có $n_1$ cách thực hiện và ứng với mỗi cách đó có $n_2$ cách thực hiện công đoạn thứ hai. Khi đó số cách thực hiện công việc là $n_1 \\cdot n_2$.',
        },
        {
          type: 'p',
          text: 'Quy tắc nhân mở rộng được cho công việc gồm nhiều công đoạn liên tiếp: số cách là tích $n_1 \\cdot n_2 \\cdots n_k$ của số cách ở từng công đoạn. Trên sơ đồ hình cây, mỗi công đoạn làm mọi nhánh mọc thêm cùng một số nhánh con.',
        },
        {
          type: 'p',
          text: 'Áp dụng quy tắc nhân để đếm ước: số $72 = 2^3 \\cdot 3^2$ có ước nguyên dương dạng $2^a \\cdot 3^b$ với $a \\in \\{0; 1; 2; 3\\}$ và $b \\in \\{0; 1; 2\\}$. Chọn $a$ có $4$ cách, chọn $b$ có $3$ cách, nên $72$ có $4 \\cdot 3 = 12$ ước nguyên dương.',
        },
      ],
    },
    {
      heading: 'Kết hợp quy tắc cộng và quy tắc nhân',
      blocks: [
        {
          type: 'p',
          text: 'Nhiều bài toán cần cả hai quy tắc: ta chia các cách thành những trường hợp không trùng nhau (dùng quy tắc cộng), rồi trong mỗi trường hợp đếm theo từng công đoạn (dùng quy tắc nhân).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đọc kĩ công việc: làm theo một trong các phương án hay phải làm lần lượt nhiều công đoạn?',
            'Nếu có điều kiện đặc biệt (chữ số $0$ không đứng đầu, số chẵn, …) thì chia trường hợp theo điều kiện đó.',
            'Trong mỗi trường hợp, ưu tiên công đoạn bị ràng buộc nhiều nhất trước, rồi nhân số cách.',
            'Cộng kết quả các trường hợp.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Sơ đồ cây mọc nhánh',
    instruction:
      'Ở chế độ quy tắc nhân, đổi số áo, quần, giày và bật hoặc tắt công đoạn chọn giày: mỗi công đoạn nhân số nhánh cuối lên. Chọn từng món để thấy bộ đó là nhánh nào. Chuyển sang quy tắc cộng để thấy hai phương án đứng cạnh nhau và số cách được cộng lại.',
  },
  examples: [
    {
      problem:
        'Trên giá sách có $8$ cuốn truyện ngắn, $7$ cuốn tiểu thuyết và $5$ tập thơ (tất cả đều khác nhau). Bạn Phong có bao nhiêu cách chọn một cuốn để đọc vào ngày cuối tuần?',
      steps: [
        'Phong chọn theo một trong ba phương án: chọn truyện ngắn, chọn tiểu thuyết hoặc chọn thơ.',
        'Phương án một có $8$ cách, phương án hai có $7$ cách, phương án ba có $5$ cách; không cuốn nào thuộc hai loại.',
        'Theo quy tắc cộng, số cách chọn là $8 + 7 + 5 = 20$.',
      ],
      answer: '$20$ cách.',
    },
    {
      problem:
        'Bạn Phong có $4$ chiếc áo, $3$ chiếc quần và $2$ đôi giày. Mỗi bộ trang phục gồm một áo, một quần và một đôi giày. Có bao nhiêu bộ khác nhau?',
      steps: [
        'Chọn một bộ gồm ba công đoạn liên tiếp: chọn áo, chọn quần, chọn giày.',
        'Chọn áo có $4$ cách; ứng với mỗi áo có $3$ cách chọn quần; ứng với mỗi cặp áo, quần có $2$ cách chọn giày.',
        'Theo quy tắc nhân, số bộ là $4 \\cdot 3 \\cdot 2 = 24$. Trên sơ đồ hình cây có đúng $24$ nhánh cuối.',
      ],
      answer: '$24$ bộ.',
    },
    {
      problem:
        'Từ các chữ số $0, 1, 2, 3, 4$ lập được bao nhiêu số tự nhiên chẵn có ba chữ số khác nhau?',
      steps: [
        'Gọi số cần lập là $\\overline{abc}$ với $a \\ne 0$, các chữ số khác nhau và $c \\in \\{0; 2; 4\\}$.',
        'Trường hợp $c = 0$: chọn $a$ có $4$ cách, chọn $b$ có $3$ cách. Có $4 \\cdot 3 = 12$ số.',
        'Trường hợp $c \\in \\{2; 4\\}$: chọn $c$ có $2$ cách, chọn $a$ (khác $0$ và khác $c$) có $3$ cách, chọn $b$ (khác $a$ và $c$) có $3$ cách. Có $2 \\cdot 3 \\cdot 3 = 18$ số.',
        'Hai trường hợp không trùng nhau, theo quy tắc cộng có $12 + 18 = 30$ số.',
      ],
      answer: '$30$ số.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Lớp 10A có $18$ học sinh nam và $20$ học sinh nữ. Có bao nhiêu cách chọn một học sinh làm lớp trưởng?',
      answer: 38,
      unit: 'cách',
      hints: [
        'Lớp trưởng là một bạn nam hoặc một bạn nữ: đó là hai phương án.',
        'Dùng quy tắc cộng.',
      ],
      solution:
        'Chọn một bạn nam có $18$ cách, chọn một bạn nữ có $20$ cách. Có $18 + 20 = 38$ cách.',
    },
    {
      type: 'number',
      prompt:
        'Từ thành phố $A$ đến thành phố $B$ có $3$ con đường, từ $B$ đến $C$ có $4$ con đường. Có bao nhiêu cách đi từ $A$ đến $C$ phải qua $B$?',
      answer: 12,
      unit: 'cách',
      hints: [
        'Đi từ $A$ đến $C$ gồm hai công đoạn: $A \\to B$ rồi $B \\to C$.',
        'Ứng với mỗi đường từ $A$ đến $B$ có $4$ đường đi tiếp.',
      ],
      solution: 'Theo quy tắc nhân, có $3 \\cdot 4 = 12$ cách.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn An đến trường có thể đi xe buýt theo một trong $2$ tuyến, hoặc đi xe đạp theo một trong $3$ con đường. An có bao nhiêu cách đến trường?',
      options: ['$2 + 3 = 5$', '$2 \\cdot 3 = 6$', '$2^3 = 8$', '$3^2 = 9$'],
      answer: 0,
      hints: [
        'An làm cả hai việc hay chỉ chọn một phương án?',
        'Đi xe buýt và đi xe đạp là hai phương án không trùng nhau.',
      ],
      solution:
        'An chỉ chọn một trong hai phương án nên dùng quy tắc cộng: $2 + 3 = 5$ cách. Phép nhân $2 \\cdot 3$ chỉ đúng khi phải đi lần lượt cả hai chặng.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số tự nhiên có ba chữ số?',
      answer: 900,
      unit: 'số',
      hints: [
        'Số có dạng $\\overline{abc}$; chữ số hàng trăm $a$ phải khác $0$.',
        '$a$ có $9$ cách chọn, $b$ và $c$ mỗi chữ số có $10$ cách.',
      ],
      solution:
        'Chọn $a \\in \\{1; \\ldots; 9\\}$ có $9$ cách, chọn $b$ có $10$ cách, chọn $c$ có $10$ cách. Có $9 \\cdot 10 \\cdot 10 = 900$ số.',
    },
    {
      type: 'choice',
      prompt:
        'Tung một đồng xu ba lần liên tiếp và ghi lại mặt xuất hiện. Có bao nhiêu kết quả có thể?',
      options: ['$8$', '$6$', '$9$', '$3$'],
      answer: 0,
      hints: ['Mỗi lần tung có $2$ kết quả: sấp hoặc ngửa.', 'Ba lần tung là ba công đoạn.'],
      solution:
        'Theo quy tắc nhân, có $2 \\cdot 2 \\cdot 2 = 8$ kết quả. Sơ đồ hình cây có $8$ nhánh cuối: SSS, SSN, SNS, SNN, NSS, NSN, NNS, NNN.',
    },
    {
      type: 'number',
      prompt:
        'Mật khẩu mở khoá một chiếc vali là một dãy gồm $4$ chữ số, mỗi chữ số từ $0$ đến $9$. Có bao nhiêu mật khẩu khác nhau?',
      answer: 10000,
      hints: ['Mỗi vị trí có $10$ cách chọn và các chữ số được phép lặp lại.'],
      solution: 'Theo quy tắc nhân, có $10 \\cdot 10 \\cdot 10 \\cdot 10 = 10\\,000$ mật khẩu.',
    },
    {
      type: 'number',
      prompt: 'Số $360 = 2^3 \\cdot 3^2 \\cdot 5$ có bao nhiêu ước nguyên dương?',
      answer: 24,
      unit: 'ước',
      hints: [
        'Mỗi ước có dạng $2^a \\cdot 3^b \\cdot 5^c$.',
        '$a$ có $4$ cách chọn, $b$ có $3$ cách, $c$ có $2$ cách.',
      ],
      solution:
        'Ước nguyên dương của $360$ có dạng $2^a \\cdot 3^b \\cdot 5^c$ với $0 \\le a \\le 3$, $0 \\le b \\le 2$, $0 \\le c \\le 1$. Theo quy tắc nhân có $4 \\cdot 3 \\cdot 2 = 24$ ước.',
    },
    {
      type: 'number',
      prompt:
        'Từ các chữ số $1, 2, 3, 4, 5$ lập được bao nhiêu số tự nhiên có ba chữ số khác nhau?',
      answer: 60,
      unit: 'số',
      hints: [
        'Chọn lần lượt hàng trăm, hàng chục, hàng đơn vị.',
        'Mỗi chữ số đã dùng thì không được dùng lại, nên số cách giảm dần.',
      ],
      solution:
        'Hàng trăm có $5$ cách, hàng chục có $4$ cách, hàng đơn vị có $3$ cách: $5 \\cdot 4 \\cdot 3 = 60$ số.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số tự nhiên lẻ có hai chữ số khác nhau?',
      answer: 40,
      unit: 'số',
      hints: [
        'Chọn chữ số hàng đơn vị trước, vì nó phải lẻ.',
        'Chữ số hàng chục khác $0$ và khác chữ số hàng đơn vị.',
      ],
      solution:
        'Số có dạng $\\overline{ab}$. Chọn $b \\in \\{1; 3; 5; 7; 9\\}$ có $5$ cách; chọn $a \\in \\{1; \\ldots; 9\\}$, $a \\ne b$ có $8$ cách. Có $5 \\cdot 8 = 40$ số.',
    },
    {
      type: 'number',
      prompt:
        'Từ $A$ đến $D$ có thể đi qua $B$ hoặc qua $C$. Từ $A$ đến $B$ có $2$ đường, từ $B$ đến $D$ có $3$ đường; từ $A$ đến $C$ có $3$ đường, từ $C$ đến $D$ có $2$ đường. Có bao nhiêu cách đi từ $A$ đến $D$?',
      answer: 12,
      unit: 'cách',
      hints: [
        'Có hai phương án: qua $B$ hoặc qua $C$. Đếm từng phương án bằng quy tắc nhân.',
        'Rồi cộng hai kết quả.',
      ],
      solution:
        'Đi qua $B$: $2 \\cdot 3 = 6$ cách. Đi qua $C$: $3 \\cdot 2 = 6$ cách. Theo quy tắc cộng có $6 + 6 = 12$ cách.',
    },
  ],
  takeaways: [
    'Quy tắc cộng: làm theo một trong các phương án không trùng nhau, số cách là $n_1 + n_2 + \\cdots$.',
    'Quy tắc nhân: làm lần lượt các công đoạn, số cách là $n_1 \\cdot n_2 \\cdots$.',
    'Sơ đồ hình cây: mỗi nhánh cuối là một cách, giúp kiểm tra không sót, không trùng.',
    'Bài toán có điều kiện: chia trường hợp (cộng), trong mỗi trường hợp đếm theo công đoạn (nhân), ưu tiên vị trí bị ràng buộc.',
  ],
};
