/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chuyên đề hệ phương trình bậc nhất ba ẩn: giải hệ bằng phương pháp Gauss, tìm parabol và đường tròn đi qua ba điểm, đồng nhất hệ số, lập hệ cho các bài toán thực tiễn và tự kiểm tra nghiệm bằng cách thay số.',
  intro:
    'Một nghiệm tìm được chỉ đáng tin khi nó thoả mãn cả ba phương trình. Trong bài ôn tập này, em giải lại các dạng toán của chuyên đề, từ hệ số thuần tuý đến parabol, đường tròn, đoàn xe chở gạo hay phản ứng hoá học, và luôn thay số để tự kiểm tra kết quả.',
  objectives: [
    'Giải thành thạo hệ phương trình bậc nhất ba ẩn bằng phương pháp Gauss và kiểm tra bằng máy tính cầm tay.',
    'Lập hệ ba ẩn để tìm parabol $y = ax^2 + bx + c$ hoặc đường tròn đi qua ba điểm, và để đồng nhất hệ số.',
    'Lập và giải hệ cho các bài toán thực tiễn: vận tải, kinh doanh, nông nghiệp, pha trộn, mạch điện, phản ứng hoá học.',
    'Tự kiểm tra nghiệm bằng cách thay vào từng phương trình.',
  ],
  sections: [
    {
      heading: 'Tóm tắt chuyên đề',
      blocks: [
        {
          type: 'list',
          items: [
            'Hệ phương trình bậc nhất ba ẩn gồm ba phương trình dạng $ax + by + cz = d$; nghiệm là bộ ba số $(x_0; y_0; z_0)$ thoả mãn cả ba phương trình.',
            'Phương pháp Gauss: nhân một phương trình với số khác $0$, đổi chỗ hai phương trình, cộng một phương trình với bội của phương trình khác, để đưa hệ về dạng tam giác rồi giải ngược từ dưới lên.',
            'Gặp phương trình $0z = d$: hệ vô nghiệm nếu $d \\ne 0$; nếu $d = 0$ thì hệ có thể có vô số nghiệm.',
            'Giải bài toán bằng cách lập hệ: đặt ẩn và điều kiện, lập hệ, giải, đối chiếu điều kiện, kết luận.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ba điểm xác định một parabol, một đường tròn',
          text: 'Parabol $y = ax^2 + bx + c$ đi qua điểm $M(x_0; y_0)$ khi $ax_0^2 + bx_0 + c = y_0$: mỗi điểm cho một phương trình bậc nhất với ẩn $a$, $b$, $c$. Tương tự, đường tròn $x^2 + y^2 - 2ax - 2by + c = 0$ đi qua $M(x_0; y_0)$ khi $-2ax_0 - 2by_0 + c = -(x_0^2 + y_0^2)$; tâm là $I(a; b)$, bán kính $R = \\sqrt{a^2 + b^2 - c}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Sau khi giải, luôn thay nghiệm vào cả ba phương trình ban đầu (không phải các phương trình đã biến đổi): một lỗi dấu ở bước khử sẽ lộ ra ngay.',
        },
      ],
    },
    {
      heading: 'Dự án: Ngân hàng đề tự kiểm tra',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: cả lớp cùng xây dựng một ngân hàng bài tập về hệ phương trình bậc nhất ba ẩn, mỗi bài có đáp án đã được kiểm tra bằng hai cách.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mỗi nhóm soạn bốn bài: một hệ thuần tuý, một bài tìm parabol hoặc đường tròn qua ba điểm, một bài cân bằng phản ứng hoá học, một bài toán thực tiễn có số liệu thật.',
            'Chọn số liệu sao cho nghiệm "đẹp" (số nguyên hoặc phân số đơn giản) và thoả mãn điều kiện thực tế của ẩn.',
            'Giải mỗi bài bằng phương pháp Gauss, kiểm tra bằng máy tính cầm tay và bằng cách thay số vào đề bài.',
            'Đổi đề với nhóm khác để giải thử; ghi lại các lỗi hay gặp.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: tập đề có lời giải chi tiết, bảng các lỗi hay gặp khi khử Gauss và cách phát hiện chúng bằng phép thử lại.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tự kiểm tra nghiệm bằng thay số',
    instruction:
      'Chọn một hệ (lấy từ các bài tập bên dưới), giải trên giấy rồi nhập nghiệm em tìm được. Bấm "Thay số kiểm tra": mỗi phương trình hiện phép thay số, vế trái và cho biết đúng hay sai. Chỉ khi cả ba phương trình đều đúng, bộ số mới là nghiệm.',
  },
  examples: [
    {
      problem: 'Tìm parabol $y = ax^2 + bx + c$ đi qua ba điểm $A(1; 2)$, $B(-1; 6)$ và $C(2; 3)$.',
      steps: [
        'Thay toạ độ ba điểm: $\\begin{cases} a + b + c = 2 \\\\ a - b + c = 6 \\\\ 4a + 2b + c = 3. \\end{cases}$',
        'Trừ phương trình thứ hai khỏi phương trình thứ nhất: $2b = -4$, nên $b = -2$; khi đó $a + c = 4$.',
        'Thay $b = -2$ vào phương trình thứ ba: $4a + c = 7$. Trừ $a + c = 4$: $3a = 3$, nên $a = 1$, $c = 3$.',
        'Thử lại với $C(2; 3)$: $4 - 4 + 3 = 3$, đúng.',
      ],
      answer: 'Parabol cần tìm là $y = x^2 - 2x + 3$.',
    },
    {
      problem: 'Viết phương trình đường tròn đi qua ba điểm $A(-1; 2)$, $B(5; 2)$ và $C(2; 5)$.',
      steps: [
        'Gọi đường tròn $x^2 + y^2 - 2ax - 2by + c = 0$. Thay toạ độ ba điểm: $\\begin{cases} 2a - 4b + c = -5 \\\\ -10a - 4b + c = -29 \\\\ -4a - 10b + c = -29. \\end{cases}$',
        'Trừ phương trình thứ nhất khỏi phương trình thứ hai: $-12a = -24$, nên $a = 2$.',
        'Trừ phương trình thứ nhất khỏi phương trình thứ ba: $-6a - 6b = -24$, nên $b = 4 - a = 2$; $c = -5 - 2a + 4b = -1$.',
        'Tâm $I(2; 2)$, bán kính $R = \\sqrt{4 + 4 + 1} = 3$.',
      ],
      answer: 'Đường tròn $x^2 + y^2 - 4x - 4y - 1 = 0$, tức $(x - 2)^2 + (y - 2)^2 = 9$.',
    },
    {
      problem:
        'Cân bằng phương trình phản ứng $\\mathrm{NH_3} + \\mathrm{O_2} \\to \\mathrm{NO} + \\mathrm{H_2O}$.',
      steps: [
        'Chọn hệ số của $\\mathrm{NH_3}$ bằng $1$ và gọi $y$, $z$, $t$ là hệ số của $\\mathrm{O_2}$, $\\mathrm{NO}$, $\\mathrm{H_2O}$: $\\mathrm{NH_3} + y\\,\\mathrm{O_2} \\to z\\,\\mathrm{NO} + t\\,\\mathrm{H_2O}$.',
        'Bảo toàn N: $z = 1$; H: $2t = 3$; O: $2y = z + t$.',
        'Giải: $z = 1$, $t = \\dfrac{3}{2}$, $y = \\dfrac{5}{4}$. Nhân với $4$: $4$, $5$, $4$, $6$.',
      ],
      answer: '$4\\mathrm{NH_3} + 5\\mathrm{O_2} \\to 4\\mathrm{NO} + 6\\mathrm{H_2O}$.',
    },
  ],
  practice: [
    {
      type: 'text',
      prompt:
        'Giải hệ $\\begin{cases} x + y + z = 6 \\\\ x + 2y + 3z = 14 \\\\ 3x - 2y - z = -4 \\end{cases}$ và viết nghiệm dạng $(x; y; z)$.',
      accept: ['(1;2;3)', '(1; 2; 3)', '1;2;3', '1; 2; 3', '(1,2,3)', '(1, 2, 3)'],
      hints: [
        'Khử $x$: lấy phương trình thứ hai trừ phương trình thứ nhất; lấy phương trình thứ ba trừ $3$ lần phương trình thứ nhất.',
        'Được $y + 2z = 8$ và $-5y - 4z = -22$.',
      ],
      solution:
        'Khử $x$: $y + 2z = 8$ và $-5y - 4z = -22$. Cộng phương trình sau với $5$ lần phương trình trước: $6z = 18$, $z = 3$; $y = 8 - 6 = 2$; $x = 6 - 2 - 3 = 1$. Nghiệm $(1; 2; 3)$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tìm các số thực $A$, $B$, $C$ sao cho $\\dfrac{1}{x^3 + 1} = \\dfrac{A}{x + 1} + \\dfrac{Bx + C}{x^2 - x + 1}$ với mọi $x \\ne -1$. Giá trị của $A$ là bao nhiêu? (Viết dạng $a/b$.)',
      answer: [1, 3],
      hints: [
        'Quy đồng: $1 = A(x^2 - x + 1) + (Bx + C)(x + 1)$.',
        'Đồng nhất hệ số của $x^2$, $x$ và hệ số tự do: $A + B = 0$, $-A + B + C = 0$, $A + C = 1$.',
      ],
      solution:
        'Từ $A + B = 0$: $B = -A$. Thay vào: $-2A + C = 0$ và $A + C = 1$. Trừ: $3A = 1$, $A = \\dfrac{1}{3}$, $B = -\\dfrac{1}{3}$, $C = \\dfrac{2}{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Parabol $y = ax^2 + bx + c$ đi qua ba điểm $A(2; -1)$, $B(4; 3)$, $C(-1; 8)$ là',
      options: [
        '$y = x^2 - 4x + 3$',
        '$y = x^2 + 4x - 13$',
        '$y = -x^2 + 8x - 13$',
        '$y = 2x^2 - 8x + 7$',
      ],
      answer: 0,
      hints: [
        'Thử từng parabol với cả ba điểm, hoặc giải hệ $4a + 2b + c = -1$, $16a + 4b + c = 3$, $a - b + c = 8$.',
      ],
      solution:
        'Giải hệ được $a = 1$, $b = -4$, $c = 3$. Kiểm tra: $4 - 8 + 3 = -1$, $16 - 16 + 3 = 3$, $1 + 4 + 3 = 8$. Các parabol khác đều sai ít nhất một điểm, chẳng hạn $y = -x^2 + 8x - 13$ cho $y(-1) = -22 \\ne 8$.',
    },
    {
      type: 'number',
      prompt:
        'Đường tròn đi qua ba điểm $A(0; 1)$, $B(2; 3)$, $C(4; 1)$ có bán kính bằng bao nhiêu?',
      answer: 2,
      hints: [
        'Gọi đường tròn $x^2 + y^2 - 2ax - 2by + c = 0$ và thay toạ độ ba điểm.',
        'Tìm được tâm $I(a; b)$ rồi tính $R = \\sqrt{a^2 + b^2 - c}$.',
      ],
      solution:
        'Hệ $-2b + c = -1$, $-4a - 6b + c = -13$, $-8a - 2b + c = -17$ cho $a = 2$, $b = 1$, $c = 1$. $R = \\sqrt{4 + 1 - 1} = 2$.',
    },
    {
      type: 'number',
      prompt:
        'Một đoàn $36$ xe chở $255$ tấn gạo tiếp tế cho đồng bào vùng lũ, gồm ba loại xe chở $5$ tấn, $7$ tấn và $10$ tấn (mỗi xe chở đầy). Số xe loại $7$ tấn nhiều hơn số xe loại $5$ tấn là $3$ chiếc. Có bao nhiêu xe loại $10$ tấn?',
      answer: 9,
      unit: 'xe',
      hints: [
        'Hệ: $x + y + z = 36$, $5x + 7y + 10z = 255$, $y - x = 3$ với $x, y, z$ là số tự nhiên.',
        'Thay $y = x + 3$ vào hai phương trình đầu.',
      ],
      solution:
        'Thay $y = x + 3$: $2x + z = 33$ và $12x + 10z = 234$, tức $6x + 5z = 117$. Từ $z = 33 - 2x$: $6x + 165 - 10x = 117$, $x = 12$, $y = 15$, $z = 9$. Thử lại: $60 + 105 + 90 = 255$ tấn.',
    },
    {
      type: 'number',
      prompt:
        'Bác An trộn $10$ kg cà phê từ ba loại: Arabica giá $300$ nghìn đồng/kg, Robusta $200$ nghìn đồng/kg, Moka $250$ nghìn đồng/kg; tổng giá vốn là $2\\,500$ nghìn đồng. Lượng Moka nhiều hơn lượng Arabica $1$ kg. Bác dùng bao nhiêu ki-lô-gam Robusta?',
      answer: 3,
      unit: 'kg',
      hints: ['Hệ: $x + y + z = 10$, $300x + 200y + 250z = 2\\,500$, $z - x = 1$.'],
      solution:
        'Thay $z = x + 1$: $2x + y = 9$ và $550x + 200y = 2\\,250$, tức $11x + 4y = 45$. Từ $y = 9 - 2x$: $11x + 36 - 8x = 45$, $x = 3$, $y = 3$, $z = 4$. Bác dùng $3$ kg Robusta.',
    },
    {
      type: 'number',
      prompt:
        'Bác Việt trồng ngô, khoai tây và đậu tương trên $12$ ha đất. Chi phí mỗi ha lần lượt là $4$, $6$, $5$ triệu đồng, tổng chi phí $59$ triệu đồng; số ngày công mỗi ha lần lượt là $15$, $30$, $20$, tổng cộng $250$ ngày công. Bác trồng bao nhiêu hecta khoai tây?',
      answer: 3,
      unit: 'ha',
      hints: [
        'Hệ: $x + y + z = 12$, $4x + 6y + 5z = 59$, $15x + 30y + 20z = 250$ (chia $5$: $3x + 6y + 4z = 50$).',
        'Khử $x$ bằng phương trình thứ nhất.',
      ],
      solution:
        'Khử $x$: $2y + z = 11$ và $3y + z = 14$. Trừ: $y = 3$, $z = 5$, $x = 4$. Bác trồng $4$ ha ngô, $3$ ha khoai tây, $5$ ha đậu tương.',
    },
    {
      type: 'number',
      prompt:
        'Cân bằng phương trình $\\mathrm{FeS_2} + \\mathrm{O_2} \\to \\mathrm{Fe_2O_3} + \\mathrm{SO_2}$ với hệ số nguyên dương nhỏ nhất. Hệ số của $\\mathrm{O_2}$ là bao nhiêu?',
      answer: 11,
      hints: [
        'Chọn hệ số của $\\mathrm{Fe_2O_3}$ bằng $1$, bảo toàn Fe, S, O rồi nhân để được số nguyên.',
      ],
      solution:
        'Với hệ số $\\mathrm{Fe_2O_3}$ bằng $1$: $\\mathrm{FeS_2}$ có hệ số $2$, $\\mathrm{SO_2}$ có hệ số $4$, $\\mathrm{O_2}$ có hệ số $\\dfrac{3 + 8}{2} = \\dfrac{11}{2}$. Nhân với $2$: $4\\mathrm{FeS_2} + 11\\mathrm{O_2} \\to 2\\mathrm{Fe_2O_3} + 8\\mathrm{SO_2}$.',
    },
    {
      type: 'number',
      prompt:
        'Mai có ba lọ dung dịch acid nồng độ $10\\%$, $30\\%$, $50\\%$. Mai cần $50$ ml dung dịch nồng độ $32\\%$, trong đó lượng lấy từ lọ $30\\%$ gấp ba lượng lấy từ lọ $50\\%$. Mai lấy bao nhiêu mililít từ lọ $10\\%$?',
      answer: 6,
      unit: 'ml',
      hints: [
        'Lượng acid nguyên chất cần có: $32\\% \\cdot 50 = 16$ ml.',
        'Hệ: $x + y + z = 50$, $0{,}1x + 0{,}3y + 0{,}5z = 16$, $y = 3z$.',
      ],
      solution:
        'Thay $y = 3z$: $x + 4z = 50$ và $0{,}1x + 1{,}4z = 16$. Từ $x = 50 - 4z$: $5 - 0{,}4z + 1{,}4z = 16$, $z = 11$, $y = 33$, $x = 6$. Thử lại: $0{,}6 + 9{,}9 + 5{,}5 = 16$ ml acid.',
    },
    {
      type: 'number',
      prompt:
        'Hai điện trở $R_1 = 30\\ \\Omega$ và $R_2 = 60\\ \\Omega$ mắc song song; cường độ dòng điện trong mạch chính là $1{,}5$ A. Cường độ dòng điện $I_2$ qua $R_2$ là bao nhiêu ampe?',
      answer: 0.5,
      unit: 'A',
      hints: ['Hệ: $I_1 + I_2 = 1{,}5$, $30I_1 = U$, $60I_2 = U$.'],
      solution:
        'Từ $30I_1 = 60I_2$: $I_1 = 2I_2$. Thay vào: $3I_2 = 1{,}5$, $I_2 = 0{,}5$ A, $I_1 = 1$ A, $U = 30$ V.',
    },
    {
      type: 'choice',
      prompt: 'Hệ $\\begin{cases} x - y + 2z = 1 \\\\ 2x + y - z = 3 \\\\ 3x + z = 5 \\end{cases}$',
      options: ['vô nghiệm', 'có nghiệm duy nhất', 'có vô số nghiệm'],
      answer: 0,
      hints: ['Cộng hai phương trình đầu rồi so sánh với phương trình thứ ba.'],
      solution:
        'Cộng hai phương trình đầu: $3x + z = 4$. Kết hợp với $3x + z = 5$ được $0z = 1$, vô lí. Vậy hệ vô nghiệm.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Nam giải một hệ và được $(1; 2; 3)$. Thay vào hệ ban đầu thấy phương trình thứ nhất và thứ hai đúng, phương trình thứ ba sai. Kết luận nào đúng?',
      options: [
        '$(1; 2; 3)$ không phải nghiệm của hệ; Nam cần xem lại các bước giải.',
        '$(1; 2; 3)$ là nghiệm vì đúng với đa số phương trình.',
        'Hệ vô nghiệm.',
        'Hệ có vô số nghiệm.',
      ],
      answer: 0,
      hints: ['Nghiệm của hệ phải thoả mãn tất cả các phương trình.'],
      solution:
        'Một bộ số chỉ là nghiệm khi thoả mãn cả ba phương trình, nên $(1; 2; 3)$ không phải nghiệm. Không thể kết luận hệ vô nghiệm hay vô số nghiệm từ một bộ số sai: Nam phải giải lại.',
    },
  ],
  takeaways: [
    'Phương pháp Gauss giải được mọi hệ bậc nhất ba ẩn; máy tính cầm tay giúp kiểm tra nghiệm duy nhất.',
    'Tìm parabol $y = ax^2 + bx + c$ hay đường tròn $x^2 + y^2 - 2ax - 2by + c = 0$ đi qua ba điểm: mỗi điểm cho một phương trình bậc nhất với ẩn $a$, $b$, $c$.',
    'Đồng nhất hệ số hai đa thức cũng dẫn đến hệ phương trình bậc nhất.',
    'Bài toán thực tiễn: nhớ điều kiện của ẩn (số xe là số tự nhiên, khối lượng không âm) và thử lại với đề bài.',
    'Một bộ số là nghiệm chỉ khi đúng với cả ba phương trình ban đầu.',
  ],
};
