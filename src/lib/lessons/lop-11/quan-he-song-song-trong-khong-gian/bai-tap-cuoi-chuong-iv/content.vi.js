/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương IV: đường thẳng và mặt phẳng trong không gian, hai đường thẳng song song, đường thẳng song song với mặt phẳng, hai mặt phẳng song song, phép chiếu song song; cách tìm giao tuyến, giao điểm và dựng thiết diện của hình chóp.',
  intro:
    'Chương IV xây dựng các quan hệ song song trong không gian: giữa hai đường thẳng, giữa đường thẳng và mặt phẳng, giữa hai mặt phẳng, rồi dùng phép chiếu song song để vẽ hình không gian lên mặt giấy. Bài ôn tập này hệ thống lại các định lí, ba bài toán cơ bản (tìm giao tuyến, tìm giao điểm, dựng thiết diện) và luyện tập qua các bài tập cuối chương.',
  objectives: [
    'Hệ thống hoá các định nghĩa, điều kiện và tính chất của quan hệ song song trong không gian.',
    'Tìm giao tuyến của hai mặt phẳng, giao điểm của đường thẳng và mặt phẳng.',
    'Dựng thiết diện của hình chóp, hình lăng trụ cắt bởi một mặt phẳng và nhận dạng thiết diện.',
    'Vận dụng định lí Thalès và tỉ số đoạn thẳng để tính toán trong không gian.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Quan hệ', 'Điều kiện thường dùng', 'Tính chất về giao tuyến'],
          rows: [
            [
              '$a \\parallel b$',
              '$a$, $b$ đồng phẳng và không có điểm chung; hoặc $a$, $b$ phân biệt cùng song song với một đường thẳng $c$',
              'Ba mặt phẳng đôi một cắt nhau theo ba giao tuyến phân biệt thì ba giao tuyến đồng quy hoặc đôi một song song',
            ],
            [
              '$a \\parallel (P)$',
              '$a \\not\\subset (P)$ và $a$ song song với một đường thẳng $d \\subset (P)$',
              '$a \\parallel (P)$, $a \\subset (Q)$, $(Q)$ cắt $(P)$ theo $b$ thì $b \\parallel a$',
            ],
            [
              '$(P) \\parallel (Q)$',
              '$(P)$ chứa hai đường thẳng cắt nhau cùng song song với $(Q)$',
              '$(R)$ cắt $(P)$ thì cắt cả $(Q)$, hai giao tuyến song song',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Hai đường thẳng trong không gian có bốn vị trí tương đối: trùng nhau, cắt nhau, song song, chéo nhau (không đồng phẳng).',
            'Hai mặt phẳng phân biệt cùng đi qua hai đường thẳng song song $a$, $b$ và cắt nhau thì giao tuyến song song với $a$ và $b$ (hoặc trùng với một trong hai đường thẳng đó).',
            'Định lí Thalès: ba mặt phẳng đôi một song song chắn trên hai cát tuyến bất kì những đoạn thẳng tương ứng tỉ lệ.',
            'Phép chiếu song song (với các đường thẳng, đoạn thẳng không song song hoặc trùng với phương chiếu) biến đường thẳng thành đường thẳng, biến hai đường thẳng song song thành hai đường thẳng song song hoặc trùng nhau, và không làm thay đổi tỉ số độ dài của hai đoạn thẳng cùng nằm trên một đường thẳng hoặc trên hai đường thẳng song song.',
          ],
        },
      ],
    },
    {
      heading: 'Ba bài toán cơ bản',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Tìm giao tuyến của hai mặt phẳng',
          text: 'Cách 1: tìm hai điểm chung phân biệt, giao tuyến là đường thẳng qua hai điểm đó. Cách 2: tìm một điểm chung $M$ và một phương: nếu hai mặt phẳng lần lượt chứa hai đường thẳng song song $a$, $b$ (hoặc một mặt phẳng song song với đường thẳng $a$ nằm trong mặt kia) thì giao tuyến là đường thẳng qua $M$ song song với $a$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tìm giao điểm của đường thẳng $d$ và mặt phẳng $(P)$',
          text: 'Chọn một mặt phẳng phụ $(Q)$ chứa $d$, tìm giao tuyến $\\Delta$ của $(Q)$ và $(P)$. Giao điểm của $d$ và $\\Delta$ (trong $(Q)$) là giao điểm của $d$ và $(P)$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dựng thiết diện',
          text: 'Thiết diện (mặt cắt) của hình chóp bởi mặt phẳng $(\\alpha)$ là đa giác giới hạn bởi các đoạn giao tuyến của $(\\alpha)$ với các mặt của hình chóp. Lần lượt tìm giao tuyến của $(\\alpha)$ với từng mặt, bắt đầu từ mặt chứa hai điểm đã biết; mỗi giao tuyến cho thêm một đỉnh của thiết diện trên một cạnh. Thiết diện của hình chóp tứ giác có nhiều nhất $5$ cạnh, vì mỗi cạnh nằm trên một mặt.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Nối hai điểm không cùng nằm trên một mặt của hình chóp (đoạn đó đi xuyên qua bên trong, không phải cạnh của thiết diện); kết luận hai đường thẳng cắt nhau chỉ vì hình vẽ của chúng cắt nhau, trong khi chúng có thể chéo nhau; quên rằng giao tuyến với hai mặt song song phải song song với nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dựng thiết diện của hình chóp',
    instruction:
      'Chọn mặt phẳng $(\\alpha)$ và kéo các thanh trượt để dời điểm đã cho trên cạnh. Đánh dấu tất cả các cạnh của hình chóp mà $(\\alpha)$ cắt rồi bấm "Kiểm tra": khi đúng, thiết diện hiện ra cùng giao tuyến của $(\\alpha)$ với từng mặt. Xoay hình để thấy thiết diện nằm trong khối chóp, và thử đặt $M$, $N$, $P$ cùng một tỉ lệ để thiết diện thành hình bình hành.',
  },
  examples: [
    {
      problem:
        'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình thang, $AB \\parallel CD$ và $AB < CD$. Tìm giao tuyến của các cặp mặt phẳng: a) $(SAD)$ và $(SBC)$; b) $(SAB)$ và $(SCD)$; c) $(SAC)$ và $(SBD)$.',
      steps: [
        'a) Vì $AB < CD$ nên $AD$ và $BC$ cắt nhau tại $I$. $I \\in AD \\subset (SAD)$, $I \\in BC \\subset (SBC)$; $S$ cũng là điểm chung. Vậy $(SAD) \\cap (SBC) = SI$.',
        'b) Hai mặt phẳng có điểm chung $S$ và lần lượt chứa hai đường thẳng song song $AB$, $CD$, nên giao tuyến là đường thẳng $Sx$ đi qua $S$ và song song với $AB$, $CD$.',
        'c) Gọi $O = AC \\cap BD$. $O$ và $S$ là hai điểm chung, nên $(SAC) \\cap (SBD) = SO$.',
      ],
      answer:
        'a) $SI$ với $I = AD \\cap BC$; b) $Sx \\parallel AB$; c) $SO$ với $O = AC \\cap BD$.',
    },
    {
      problem:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành. Lấy $M$ trên $SC$ và $N$ trên $AB$ sao cho $CM = 2SM$, $BN = 2AN$. a) Tìm giao điểm $K$ của $(ABM)$ với $SD$ và tính $\\dfrac{SK}{SD}$. b) Chứng minh $MN \\parallel (SAD)$.',
      steps: [
        'a) $(ABM)$ và $(SCD)$ có điểm chung $M$ và lần lượt chứa $AB \\parallel CD$, nên giao tuyến là đường thẳng qua $M$ song song với $CD$, cắt $SD$ tại $K$. Vậy $K = (ABM) \\cap SD$.',
        'Trong tam giác $SCD$, $MK \\parallel CD$ nên $\\dfrac{SK}{SD} = \\dfrac{SM}{SC} = \\dfrac{1}{3}$ (vì $CM = 2SM$).',
        'b) $MK \\parallel CD$ và $MK = \\dfrac{1}{3}CD$; $AN \\parallel CD$ và $AN = \\dfrac{1}{3}AB = \\dfrac{1}{3}CD$. Do đó $\\overrightarrow{AN} = \\overrightarrow{KM}$ cùng hướng với $\\overrightarrow{DC}$, nên $ANMK$ là hình bình hành.',
        'Suy ra $MN \\parallel AK$ với $AK \\subset (SAD)$, mà $MN \\not\\subset (SAD)$, nên $MN \\parallel (SAD)$.',
      ],
      answer:
        'a) $\\dfrac{SK}{SD} = \\dfrac{1}{3}$; b) $MN \\parallel AK$ nên $MN \\parallel (SAD)$.',
    },
    {
      problem:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành, $M$ là một điểm trên cạnh $AB$ ($M \\ne A$, $M \\ne B$). Mặt phẳng $(\\alpha)$ qua $M$ song song với $SA$ và $BC$. Dựng thiết diện của hình chóp cắt bởi $(\\alpha)$. Thiết diện là hình gì?',
      steps: [
        '$(\\alpha) \\parallel BC$, $BC \\subset (ABCD)$ và $M$ là điểm chung, nên $(\\alpha) \\cap (ABCD)$ là đường thẳng qua $M$ song song với $BC$, cắt $CD$ tại $N$.',
        '$(\\alpha) \\parallel SA$, $SA \\subset (SAB)$, nên $(\\alpha) \\cap (SAB)$ là đường thẳng qua $M$ song song với $SA$, cắt $SB$ tại $Q$.',
        '$(\\alpha) \\parallel BC$, $BC \\subset (SBC)$, nên $(\\alpha) \\cap (SBC)$ là đường thẳng qua $Q$ song song với $BC$, cắt $SC$ tại $P$. Nối $NP$ được giao tuyến với $(SCD)$.',
        'Thiết diện là tứ giác $MNPQ$ có $MN \\parallel BC$ và $PQ \\parallel BC$ nên $MN \\parallel PQ$; $PQ < BC = MN$ nên đây là hình thang (không là hình bình hành).',
      ],
      answer: 'Thiết diện là hình thang $MNPQ$ với $MN \\parallel PQ$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Cho đường thẳng $a$ song song với mặt phẳng $(P)$. Mặt phẳng $(Q)$ chứa $a$ và cắt $(P)$ theo giao tuyến $b$. Vị trí tương đối của $a$ và $b$ là',
      options: ['song song', 'chéo nhau', 'cắt nhau', 'trùng nhau'],
      answer: 0,
      hints: ['$a$ và $b$ cùng nằm trong $(Q)$. Chúng có thể có điểm chung không?'],
      solution:
        '$a$ và $b$ cùng nằm trong $(Q)$ nên không chéo nhau; $b \\subset (P)$ mà $a$ không có điểm chung với $(P)$, nên $a$, $b$ không có điểm chung. Vậy $a \\parallel b$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành, $M$ là trung điểm của $SD$. Đường thẳng $SB$ song song với mặt phẳng nào?',
      options: ['$(ACM)$', '$(CDM)$', '$(ADM)$', '$(ACD)$'],
      answer: 0,
      hints: ['Gọi $O$ là tâm của hình bình hành. Xét tam giác $SBD$.'],
      solution:
        'Gọi $O = AC \\cap BD$ thì $O$ là trung điểm $BD$, nên $OM$ là đường trung bình của tam giác $SBD$: $OM \\parallel SB$. Vì $OM \\subset (ACM)$ và $SB \\not\\subset (ACM)$ nên $SB \\parallel (ACM)$. Các mặt $(CDM)$, $(ADM)$ chứa đường thẳng $SD$ nên chứa $S$, còn $(ACD)$ là mặt đáy chứa $B$: cả ba đều có điểm chung với $SB$.',
    },
    {
      type: 'choice',
      prompt:
        "Cho hình hộp $ABCD.A'B'C'D'$. Mặt phẳng $(AB'D')$ song song với mặt phẳng nào sau đây?",
      options: ["$(BDC')$", '$(ABCD)$', "$(BCC'B')$", "$(BDA')$"],
      answer: 0,
      hints: ["So sánh $B'D'$ với $BD$, và $AB'$ với $DC'$."],
      solution:
        "$BDD'B'$ là hình bình hành nên $B'D' \\parallel BD$; $AB'C'D$ là hình bình hành nên $AB' \\parallel DC'$. Mặt phẳng $(AB'D')$ chứa hai đường thẳng cắt nhau $B'D'$, $AB'$ cùng song song với $(BDC')$, nên $(AB'D') \\parallel (BDC')$.",
    },
    {
      type: 'fraction',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành. $M$, $N$ lần lượt là trung điểm của $SB$, $SD$; $K$ là giao điểm của mặt phẳng $(AMN)$ với $SC$. Tính tỉ số $\\dfrac{SK}{SC}$.',
      answer: [1, 3],
      simplest: true,
      hints: [
        'Gọi $O = AC \\cap BD$ và $I = MN \\cap SO$. Khi đó $K = AI \\cap SC$, và $I$ là trung điểm của $SO$.',
        'Kẻ $OH \\parallel AK$ với $H \\in SC$ rồi dùng đường trung bình trong các tam giác $ACK$ và $SOH$.',
      ],
      solution:
        '$MN$ là đường trung bình của tam giác $SBD$ nên cắt $SO$ tại trung điểm $I$ của $SO$, và $K = AI \\cap SC$. Kẻ $OH \\parallel AK$ ($H \\in SC$): trong tam giác $ACK$, $O$ là trung điểm $AC$ nên $H$ là trung điểm $CK$; trong tam giác $SOH$, $I$ là trung điểm $SO$ và $IK \\parallel OH$ nên $K$ là trung điểm $SH$. Vậy $SK = KH = HC$ và $\\dfrac{SK}{SC} = \\dfrac{1}{3}$.',
    },
    {
      type: 'choice',
      prompt:
        "Cho hình hộp $ABCD.A'B'C'D'$; $M$, $M'$ lần lượt là trung điểm của $BC$, $B'C'$. Hình chiếu của tam giác $B'DM$ qua phép chiếu song song trên mặt phẳng $(A'B'C'D')$ theo phương chiếu $AA'$ là",
      options: ["tam giác $B'D'M'$", "tam giác $B'A'M'$", "tam giác $C'D'M'$", "tam giác $DMM'$"],
      answer: 0,
      hints: [
        "Mỗi điểm được chiếu theo đường thẳng song song với $AA'$ xuống mặt phẳng $(A'B'C'D')$.",
      ],
      solution:
        "$B'$ thuộc $(A'B'C'D')$ nên là hình chiếu của chính nó; $DD' \\parallel AA'$ nên hình chiếu của $D$ là $D'$; $MM' \\parallel BB' \\parallel AA'$ nên hình chiếu của $M$ là $M'$. Vậy hình chiếu là tam giác $B'D'M'$.",
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình thang, $AB \\parallel CD$. Giao tuyến của hai mặt phẳng $(SAB)$ và $(SCD)$ là',
      options: [
        'đường thẳng qua $S$ và song song với $AB$',
        'đường thẳng $SO$ với $O = AC \\cap BD$',
        'đường thẳng $SI$ với $I = AD \\cap BC$',
        'đường thẳng qua $S$ và song song với $AD$',
      ],
      answer: 0,
      hints: ['Hai mặt phẳng có điểm chung $S$ và chứa hai đường thẳng song song nào?'],
      solution:
        '$S$ là điểm chung; $(SAB)$ chứa $AB$, $(SCD)$ chứa $CD$ và $AB \\parallel CD$, nên giao tuyến đi qua $S$ và song song với $AB$, $CD$.',
    },
    {
      type: 'number',
      prompt:
        "Cho hình lăng trụ tam giác $ABC.A'B'C'$. Gọi $M$, $N$, $P$ lần lượt là trung điểm của $AB$, $BC$, $AA'$; $K$ là giao điểm của mặt phẳng $(MNP)$ với đường thẳng $B'C$. Tính tỉ số $\\dfrac{KB'}{KC}$.",
      answer: 3,
      hints: [
        "$MN \\parallel AC$, nên $(MNP)$ cắt $(ACC'A')$ theo đường thẳng qua $P$ song song với $AC$: nó cắt $CC'$ tại trung điểm $Q$.",
        "Khi đó $(MNP) \\cap (BCC'B') = NQ$ và $K = NQ \\cap B'C$. Tính trong hình bình hành $BCC'B'$.",
      ],
      solution:
        "$MN$ là đường trung bình của tam giác $ABC$ nên $MN \\parallel AC$, do đó $(MNP)$ cắt $(ACC'A')$ theo $PQ \\parallel AC$ với $Q$ là trung điểm $CC'$. Vậy $K = NQ \\cap B'C$. Gọi $J$ là giao điểm của $NQ$ với đường thẳng $BB'$: $NQ$ nối trung điểm của $BC$ và $CC'$ nên $NQ \\parallel BC'$, và từ $\\triangle NBJ = \\triangle NCQ$ có $BJ = CQ = \\dfrac{1}{2}CC'$, nên $B'J = \\dfrac{3}{2}CC'$. Tam giác $KB'J$ và $KCQ$ đồng dạng ($B'J \\parallel CQ$), nên $\\dfrac{KB'}{KC} = \\dfrac{B'J}{CQ} = 3$.",
    },
    {
      type: 'fraction',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành, $M$ trên $SC$ với $SM = 2MC$. Mặt phẳng $(ABM)$ cắt $SD$ tại $K$. Tính $\\dfrac{SK}{SD}$.',
      answer: [2, 3],
      simplest: true,
      hints: [
        '$(ABM)$ chứa $AB \\parallel CD$, nên cắt $(SCD)$ theo đường thẳng qua $M$ song song với $CD$.',
      ],
      solution:
        '$(ABM) \\cap (SCD) = MK$ với $MK \\parallel CD$, $K \\in SD$. Vì $SM = 2MC$ nên $\\dfrac{SM}{SC} = \\dfrac{2}{3}$. Theo định lí Thalès trong tam giác $SCD$: $\\dfrac{SK}{SD} = \\dfrac{SM}{SC} = \\dfrac{2}{3}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Cho tứ diện $ABCD$, $M$ là điểm trên cạnh $AB$ sao cho $BM = 3AM$. Mặt phẳng $(P)$ qua $M$ song song với $AD$ và $BC$ cắt $CD$ tại $K$. Tính $\\dfrac{KC}{CD}$.',
      answer: [3, 4],
      simplest: true,
      hints: [
        '$(P) \\parallel AD$ nên cắt $(ABD)$ theo $MQ \\parallel AD$ với $Q \\in BD$.',
        'Sau đó $(P) \\parallel BC$ nên cắt $(BCD)$ theo $QK \\parallel BC$ với $K \\in CD$.',
      ],
      solution:
        'Trong $(ABD)$: $MQ \\parallel AD$, nên $\\dfrac{BQ}{BD} = \\dfrac{BM}{BA} = \\dfrac{3}{4}$, tức $\\dfrac{DQ}{DB} = \\dfrac{1}{4}$. Trong $(BCD)$: $QK \\parallel BC$, nên $\\dfrac{DK}{DC} = \\dfrac{DQ}{DB} = \\dfrac{1}{4}$. Vậy $\\dfrac{KC}{CD} = \\dfrac{3}{4}$.',
    },
    {
      type: 'multi',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành; $G$, $K$ lần lượt là trọng tâm các tam giác $SAD$, $SCD$. Mặt phẳng qua $GK$ song song với $(ABCD)$ cắt $SA$, $SB$, $SC$, $SD$ lần lượt tại $M$, $N$, $E$, $F$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$GK \\parallel AC$',
        '$\\dfrac{SM}{SA} = \\dfrac{2}{3}$',
        '$MNEF$ là hình bình hành',
        '$GK = \\dfrac{1}{2}AC$',
        '$MN = \\dfrac{1}{3}AB$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Gọi $I$, $J$ là trung điểm $AD$, $CD$. Khi đó $\\dfrac{SG}{SI} = \\dfrac{SK}{SJ} = \\dfrac{2}{3}$.',
      ],
      solution:
        'Với $I$, $J$ là trung điểm $AD$, $CD$: $\\dfrac{SG}{SI} = \\dfrac{SK}{SJ} = \\dfrac{2}{3}$ nên $GK \\parallel IJ$ và $GK = \\dfrac{2}{3}IJ$; $IJ$ là đường trung bình của tam giác $ACD$ nên $IJ \\parallel AC$, $IJ = \\dfrac{1}{2}AC$. Vậy $GK \\parallel AC$ và $GK = \\dfrac{1}{3}AC$. Mặt phẳng qua $G$ song song với đáy cắt các cạnh bên theo tỉ số $\\dfrac{2}{3}$, nên $MN = \\dfrac{2}{3}AB$, $FE = \\dfrac{2}{3}DC$ và $MN \\parallel AB \\parallel DC \\parallel FE$, $MN = FE$: $MNEF$ là hình bình hành.',
    },
    {
      type: 'number',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành, $AB = 9$ cm; $G$ là trọng tâm tam giác $SAD$. Mặt phẳng qua $G$ song song với $(ABCD)$ cắt $SA$, $SB$ lần lượt tại $M$, $N$. Tính độ dài $MN$.',
      answer: 6,
      unit: 'cm',
      hints: [
        'Gọi $I$ là trung điểm $AD$. Mặt phẳng song song với đáy cắt $SA$, $SI$ theo cùng một tỉ số, và $\\dfrac{SG}{SI} = \\dfrac{2}{3}$.',
        '$MN \\parallel AB$ nên dùng định lí Thalès trong tam giác $SAB$.',
      ],
      solution:
        'Gọi $I$ là trung điểm $AD$; mặt phẳng qua $G$ song song với đáy cắt $(SAD)$ theo đường thẳng qua $G$ song song với $AD$, cắt $SA$ tại $M$. Trong tam giác $SAI$, đường thẳng đó song song với $AI$ nên $\\dfrac{SM}{SA} = \\dfrac{SG}{SI} = \\dfrac{2}{3}$. Trong tam giác $SAB$, $MN \\parallel AB$ nên $\\dfrac{MN}{AB} = \\dfrac{SM}{SA} = \\dfrac{2}{3}$, do đó $MN = \\dfrac{2}{3} \\cdot 9 = 6$ (cm).',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình chóp $S.ABCD$ có đáy là hình bình hành, $M$ là trung điểm của $SA$. Thiết diện của hình chóp cắt bởi mặt phẳng qua $M$ song song với $(ABCD)$ là',
      options: [
        'hình bình hành có các cạnh bằng nửa các cạnh tương ứng của đáy',
        'hình thang không là hình bình hành',
        'tam giác',
        'ngũ giác',
      ],
      answer: 0,
      hints: [
        'Mặt phẳng song song với đáy cắt mỗi mặt bên theo giao tuyến song song với cạnh đáy tương ứng.',
      ],
      solution:
        'Mặt phẳng cắt $SB$, $SC$, $SD$ tại trung điểm $N$, $P$, $Q$. Các cạnh $MN$, $NP$, $PQ$, $QM$ là đường trung bình của các mặt bên, song song và bằng nửa $AB$, $BC$, $CD$, $DA$. Do đó $MNPQ$ là hình bình hành có cạnh bằng nửa cạnh đáy.',
    },
  ],
  takeaways: [
    'Tìm giao tuyến: hai điểm chung, hoặc một điểm chung và phương của hai đường thẳng song song nằm trong hai mặt phẳng.',
    'Tìm giao điểm của $d$ với $(P)$: chọn mặt phẳng phụ chứa $d$, lấy giao tuyến với $(P)$, rồi cắt với $d$.',
    'Dựng thiết diện: lần lượt tìm giao tuyến của mặt phẳng cắt với từng mặt; mỗi cạnh của thiết diện nằm trên một mặt.',
    'Mặt phẳng song song với một đường thẳng (hoặc một mặt phẳng) cắt các mặt chứa đường thẳng đó theo giao tuyến song song với nó; định lí Thalès cho các tỉ số độ dài.',
  ],
};
