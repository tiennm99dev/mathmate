/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vectơ là đoạn thẳng có hướng: điểm đầu, điểm cuối, độ dài và giá. Hai vectơ cùng phương, cùng hướng, ngược hướng, bằng nhau và vectơ-không.',
  intro:
    'Hai chiếc thuyền cùng chạy với tốc độ $20$ km/h, một chiếc đi về hướng đông, một chiếc đi về hướng bắc. Chỉ nói "tốc độ $20$ km/h" thì chưa đủ để biết thuyền sẽ tới đâu: còn phải nói nó đi theo hướng nào. Vận tốc, lực, độ dịch chuyển là những đại lượng có cả độ lớn lẫn hướng. Để biểu diễn chúng, toán học dùng một đối tượng mới: vectơ.',
  objectives: [
    'Nhận biết vectơ, điểm đầu, điểm cuối, độ dài và giá của vectơ.',
    'Nhận biết hai vectơ cùng phương, cùng hướng, ngược hướng và hai vectơ bằng nhau.',
    'Hiểu vectơ-không và các quy ước về vectơ-không.',
    'Dùng vectơ biểu diễn các đại lượng có hướng như lực, vận tốc.',
  ],
  sections: [
    {
      heading: 'Định nghĩa vectơ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vectơ',
          text: 'Vectơ là một đoạn thẳng có hướng, nghĩa là trong hai điểm mút của đoạn thẳng, đã chỉ rõ điểm nào là điểm đầu, điểm nào là điểm cuối.',
        },
        {
          type: 'p',
          text: 'Vectơ có điểm đầu $A$ và điểm cuối $B$ được kí hiệu là $\\overrightarrow{AB}$, đọc là "vectơ $AB$". Khi vẽ, ta dùng mũi tên từ $A$ đến $B$. Vectơ còn được kí hiệu bằng một chữ cái in thường có mũi tên ở trên: $\\vec a$, $\\vec b$, $\\vec u$, $\\vec v$, … khi không cần chỉ rõ điểm đầu và điểm cuối.',
        },
        {
          type: 'p',
          text: 'Chú ý: $\\overrightarrow{AB}$ và $\\overrightarrow{BA}$ là hai vectơ khác nhau (đổi điểm đầu và điểm cuối thì hướng thay đổi), trong khi đoạn thẳng $AB$ và đoạn thẳng $BA$ là một.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Độ dài và giá',
          text: 'Độ dài của vectơ $\\overrightarrow{AB}$ là độ dài đoạn thẳng $AB$, kí hiệu $|\\overrightarrow{AB}| = AB$. Độ dài của $\\vec a$ kí hiệu là $|\\vec a|$. Đường thẳng đi qua điểm đầu và điểm cuối của một vectơ gọi là giá của vectơ đó.',
        },
        {
          type: 'p',
          text: 'Trong vật lí, lực, vận tốc, gia tốc, độ dịch chuyển được biểu diễn bằng vectơ: hướng của vectơ là hướng của đại lượng, độ dài vectơ tỉ lệ với độ lớn của đại lượng. Còn khối lượng, nhiệt độ, thời gian chỉ có độ lớn, không có hướng.',
        },
      ],
    },
    {
      heading: 'Hai vectơ cùng phương, cùng hướng, bằng nhau',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cùng phương',
          text: 'Hai vectơ được gọi là cùng phương nếu giá của chúng song song hoặc trùng nhau.',
        },
        {
          type: 'p',
          text: 'Nếu hai vectơ cùng phương thì chúng chỉ có thể cùng hướng hoặc ngược hướng. Hai vectơ không cùng phương thì không nói tới cùng hướng hay ngược hướng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Ba điểm phân biệt $A$, $B$, $C$ thẳng hàng khi và chỉ khi hai vectơ $\\overrightarrow{AB}$ và $\\overrightarrow{AC}$ cùng phương.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai vectơ bằng nhau',
          text: 'Hai vectơ $\\vec a$ và $\\vec b$ được gọi là bằng nhau nếu chúng cùng hướng và có cùng độ dài, kí hiệu $\\vec a = \\vec b$.',
        },
        {
          type: 'p',
          text: 'Cho vectơ $\\vec a$ và một điểm $O$, ta luôn tìm được một điểm $A$ duy nhất sao cho $\\overrightarrow{OA} = \\vec a$. Nói cách khác, có thể "dời" một vectơ tới bất kì điểm đầu nào mà vẫn được một vectơ bằng nó.',
        },
        {
          type: 'table',
          head: ['Quan hệ', 'Điều kiện'],
          rows: [
            ['Cùng phương', 'Giá song song hoặc trùng nhau'],
            ['Cùng hướng', 'Cùng phương và cùng chiều mũi tên'],
            ['Ngược hướng', 'Cùng phương và ngược chiều mũi tên'],
            ['Bằng nhau', 'Cùng hướng và cùng độ dài'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hai vectơ có cùng độ dài chưa chắc bằng nhau: chúng còn phải cùng hướng. Trong hình bình hành $ABCD$ ta có $\\overrightarrow{AB} = \\overrightarrow{DC}$ nhưng $\\overrightarrow{AB} \\ne \\overrightarrow{CD}$.',
        },
      ],
    },
    {
      heading: 'Vectơ-không',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vectơ-không',
          text: 'Vectơ có điểm đầu và điểm cuối trùng nhau gọi là vectơ-không, kí hiệu $\\vec 0$. Ta có $\\overrightarrow{AA} = \\overrightarrow{BB} = \\dots = \\vec 0$ với mọi điểm $A$, $B$, …',
        },
        {
          type: 'list',
          items: [
            'Độ dài của vectơ-không bằng $0$: $|\\vec 0| = 0$.',
            'Quy ước: vectơ-không cùng phương, cùng hướng với mọi vectơ.',
            'Hai điểm $A$, $B$ trùng nhau khi và chỉ khi $\\overrightarrow{AB} = \\vec 0$.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Ba vectơ trên lưới',
    instruction:
      'Kéo ô vuông (điểm đầu) để dời cả vectơ, kéo vòng tròn (điểm cuối) để đổi hướng và độ dài; có thể chọn một điểm rồi dùng phím mũi tên. Bảng cho biết từng cặp vectơ có cùng phương, cùng hướng, cùng độ dài, bằng nhau hay không. Hãy hoàn thành bốn thử thách.',
  },
  examples: [
    {
      problem:
        'Cho hình bình hành $ABCD$. Hãy chỉ ra các vectơ khác $\\vec 0$, có điểm đầu và điểm cuối là các đỉnh của hình bình hành, mà: a) cùng phương với $\\overrightarrow{AB}$; b) bằng $\\overrightarrow{AB}$.',
      steps: [
        'Giá của $\\overrightarrow{AB}$ là đường thẳng $AB$. Trong hình bình hành, $AB \\parallel DC$, nên các vectơ có giá $AB$ hoặc $DC$ đều cùng phương với $\\overrightarrow{AB}$.',
        'a) Các vectơ đó là $\\overrightarrow{BA}$, $\\overrightarrow{DC}$, $\\overrightarrow{CD}$.',
        'b) $\\overrightarrow{DC}$ cùng hướng với $\\overrightarrow{AB}$ và $DC = AB$, còn $\\overrightarrow{BA}$, $\\overrightarrow{CD}$ ngược hướng với $\\overrightarrow{AB}$.',
      ],
      answer:
        'a) $\\overrightarrow{BA}$, $\\overrightarrow{DC}$, $\\overrightarrow{CD}$; b) chỉ có $\\overrightarrow{DC} = \\overrightarrow{AB}$.',
    },
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$ có $AB = 3$ cm, $AC = 4$ cm. Tính $|\\overrightarrow{BC}|$ và $|\\overrightarrow{CB}|$.',
      steps: [
        'Độ dài của vectơ là độ dài đoạn thẳng nối điểm đầu với điểm cuối: $|\\overrightarrow{BC}| = BC$.',
        'Theo định lí Pythagore: $BC^2 = AB^2 + AC^2 = 9 + 16 = 25$, nên $BC = 5$ cm.',
        'Đoạn thẳng $CB$ cũng là đoạn $BC$, nên $|\\overrightarrow{CB}| = 5$ cm. Hai vectơ $\\overrightarrow{BC}$, $\\overrightarrow{CB}$ cùng độ dài nhưng ngược hướng, nên không bằng nhau.',
      ],
      answer: '$|\\overrightarrow{BC}| = |\\overrightarrow{CB}| = 5$ cm.',
    },
    {
      problem:
        'Cho ba điểm $A$, $B$, $C$ thẳng hàng, $B$ nằm giữa $A$ và $C$. Xét hướng của các cặp vectơ: a) $\\overrightarrow{AB}$ và $\\overrightarrow{AC}$; b) $\\overrightarrow{BA}$ và $\\overrightarrow{BC}$.',
      steps: [
        'Cả bốn vectơ có chung giá là đường thẳng $AC$, nên từng cặp đều cùng phương.',
        'a) Từ $A$, cả $B$ và $C$ nằm về cùng một phía, nên $\\overrightarrow{AB}$, $\\overrightarrow{AC}$ cùng hướng.',
        'b) Từ $B$, điểm $A$ và điểm $C$ nằm về hai phía, nên $\\overrightarrow{BA}$, $\\overrightarrow{BC}$ ngược hướng.',
      ],
      answer: 'a) Cùng hướng; b) ngược hướng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Vectơ có điểm đầu $M$ và điểm cuối $N$ được kí hiệu là',
      options: ['$\\overrightarrow{MN}$', '$\\overrightarrow{NM}$', '$MN$', '$|MN|$'],
      answer: 0,
      hints: ['Kí hiệu vectơ viết điểm đầu trước, điểm cuối sau, có mũi tên ở trên.'],
      solution:
        'Vectơ có điểm đầu $M$, điểm cuối $N$ là $\\overrightarrow{MN}$. Còn $\\overrightarrow{NM}$ có điểm đầu $N$; $MN$ chỉ là đoạn thẳng (hay độ dài của nó).',
    },
    {
      type: 'number',
      prompt:
        'Cho tam giác $ABC$. Có bao nhiêu vectơ khác vectơ-không có điểm đầu và điểm cuối là hai trong ba đỉnh $A$, $B$, $C$?',
      answer: 6,
      hints: [
        'Mỗi cạnh của tam giác cho mấy vectơ?',
        'Cạnh $AB$ cho $\\overrightarrow{AB}$ và $\\overrightarrow{BA}$.',
      ],
      solution:
        'Mỗi cạnh cho hai vectơ ngược hướng nhau: $\\overrightarrow{AB}$, $\\overrightarrow{BA}$, $\\overrightarrow{BC}$, $\\overrightarrow{CB}$, $\\overrightarrow{CA}$, $\\overrightarrow{AC}$. Có $3 \\cdot 2 = 6$ vectơ.',
    },
    {
      type: 'multi',
      prompt:
        'Cho hình bình hành $ABCD$ có tâm $O$. Chọn tất cả các vectơ cùng phương với $\\overrightarrow{AB}$.',
      options: [
        '$\\overrightarrow{BA}$',
        '$\\overrightarrow{DC}$',
        '$\\overrightarrow{CD}$',
        '$\\overrightarrow{AD}$',
        '$\\overrightarrow{AO}$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Hai vectơ cùng phương khi giá của chúng song song hoặc trùng nhau.',
        'Đường thẳng nào song song với $AB$ trong hình bình hành?',
      ],
      solution:
        '$\\overrightarrow{BA}$ có giá trùng với $AB$; $\\overrightarrow{DC}$, $\\overrightarrow{CD}$ có giá $DC \\parallel AB$. Còn $AD$ và $AO$ (nằm trên đường chéo $AC$) cắt $AB$ tại $A$, nên $\\overrightarrow{AD}$, $\\overrightarrow{AO}$ không cùng phương với $\\overrightarrow{AB}$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây là sai?',
      options: [
        'Hai vectơ cùng phương thì cùng hướng.',
        'Hai vectơ cùng hướng thì cùng phương.',
        'Vectơ-không cùng phương với mọi vectơ.',
        'Hai vectơ bằng nhau thì có cùng độ dài.',
      ],
      answer: 0,
      hints: ['Hai vectơ cùng phương có thể ở những vị trí hướng nào?'],
      solution:
        'Hai vectơ cùng phương có thể cùng hướng hoặc ngược hướng (như $\\overrightarrow{AB}$ và $\\overrightarrow{BA}$), nên khẳng định "Hai vectơ cùng phương thì cùng hướng" là sai. Ba khẳng định còn lại đúng theo định nghĩa và quy ước.',
    },
    {
      type: 'choice',
      prompt:
        'Ba điểm $A$, $B$, $C$ thẳng hàng và $B$ nằm giữa $A$ và $C$. Cặp vectơ nào ngược hướng?',
      options: [
        '$\\overrightarrow{BA}$ và $\\overrightarrow{BC}$',
        '$\\overrightarrow{AB}$ và $\\overrightarrow{AC}$',
        '$\\overrightarrow{AB}$ và $\\overrightarrow{BC}$',
        '$\\overrightarrow{CA}$ và $\\overrightarrow{CB}$',
      ],
      answer: 0,
      hints: [
        'Vẽ ba điểm $A$, $B$, $C$ theo thứ tự trên một đường thẳng, rồi vẽ từng cặp mũi tên.',
      ],
      solution:
        'Từ $B$, hai điểm $A$ và $C$ nằm ở hai phía nên $\\overrightarrow{BA}$, $\\overrightarrow{BC}$ ngược hướng. Các cặp còn lại đều hướng từ $A$ về phía $C$ (hoặc cùng hướng từ $C$ về phía $A$), nên cùng hướng.',
    },
    {
      type: 'choice',
      prompt: 'Cho hình bình hành $ABCD$ có tâm $O$. Vectơ nào bằng $\\overrightarrow{AO}$?',
      options: [
        '$\\overrightarrow{OC}$',
        '$\\overrightarrow{CO}$',
        '$\\overrightarrow{OA}$',
        '$\\overrightarrow{BO}$',
      ],
      answer: 0,
      hints: [
        'Hai đường chéo của hình bình hành cắt nhau tại trung điểm của mỗi đường.',
        'Vectơ cần tìm phải cùng hướng với $\\overrightarrow{AO}$ và có độ dài $AO$.',
      ],
      solution:
        '$O$ là trung điểm của $AC$ nên $AO = OC$, và $\\overrightarrow{AO}$, $\\overrightarrow{OC}$ cùng hướng (từ $A$ về phía $C$). Vậy $\\overrightarrow{AO} = \\overrightarrow{OC}$. Vectơ $\\overrightarrow{CO}$ ngược hướng, $\\overrightarrow{BO}$ không cùng phương.',
    },
    {
      type: 'number',
      prompt:
        'Cho hình vuông $ABCD$ cạnh $3$ cm. Tính $|\\overrightarrow{AC}|$ (theo cm, làm tròn đến hàng phần trăm).',
      answer: 4.24,
      tolerance: 0.01,
      unit: 'cm',
      hints: [
        '$|\\overrightarrow{AC}|$ là độ dài đường chéo $AC$.',
        'Dùng định lí Pythagore trong tam giác vuông $ABC$.',
      ],
      solution:
        '$|\\overrightarrow{AC}| = AC = \\sqrt{3^2 + 3^2} = 3\\sqrt{2} \\approx 4{,}24$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Cho tam giác đều $ABC$ cạnh $4$, $M$ là trung điểm của $BC$. Tính $|\\overrightarrow{AM}|$ (làm tròn đến hàng phần trăm).',
      answer: 3.46,
      tolerance: 0.01,
      hints: [
        'Trong tam giác đều, trung tuyến $AM$ cũng là đường cao.',
        'Tam giác $ABM$ vuông tại $M$ có $AB = 4$, $BM = 2$.',
      ],
      solution:
        '$AM \\perp BC$ nên $AM^2 = AB^2 - BM^2 = 16 - 4 = 12$, suy ra $|\\overrightarrow{AM}| = AM = 2\\sqrt{3} \\approx 3{,}46$.',
    },
    {
      type: 'text',
      prompt: 'Vectơ có điểm đầu và điểm cuối trùng nhau được gọi là gì?',
      accept: ['vectơ-không', 'vectơ không', 'vecto-khong', 'vecto khong', 'vector không'],
      hints: ['Nó được kí hiệu là $\\vec 0$.'],
      solution:
        'Đó là vectơ-không, kí hiệu $\\vec 0$, chẳng hạn $\\overrightarrow{AA} = \\vec 0$. Độ dài của nó bằng $0$.',
    },
  ],
  takeaways: [
    'Vectơ là đoạn thẳng có hướng; $|\\overrightarrow{AB}| = AB$; giá là đường thẳng qua điểm đầu và điểm cuối.',
    'Cùng phương: giá song song hoặc trùng nhau; hai vectơ cùng phương thì cùng hướng hoặc ngược hướng.',
    'Bằng nhau: cùng hướng và cùng độ dài.',
    '$A$, $B$, $C$ phân biệt thẳng hàng $\\Leftrightarrow$ $\\overrightarrow{AB}$, $\\overrightarrow{AC}$ cùng phương.',
    'Vectơ-không $\\vec 0$ có độ dài $0$, cùng phương và cùng hướng với mọi vectơ.',
  ],
};
