(function (root) {
  'use strict';
  var MG = root.MG = root.MG || {};
  // Korean is used only after an incorrect answer, never in the question.
  var labels = {
    'bowl-shape': ['낮고 넓은 접시', '네 칸으로 나뉜 식판', '둥근 그릇', '옆면이 높은 그릇', '얕은 네모 접시', '기울어진 그릇', '넓은 타원형 접시', '낮은 받침대 위의 그릇'],
    'bowl-material': ['흙으로 빚은 그릇', '금속 그릇', '유리 그릇', '대나무 그릇', '나무 그릇', '돌 그릇', '말랑한 고무 그릇', '도자기 그릇'],
    'water-place': ['창가에 놓인 물', '침대 옆에 놓인 물', '주방 매트 위에 놓인 물', '스크래치 기둥 옆에 놓인 물', '복도에 놓인 물', '현관 앞마당에 놓인 물', '소파 옆에 놓인 물', '욕실에 놓인 물'],
    'nap-texture': ['부드럽고 보송한 매트', '얇은 면 수건', '속을 채운 부드러운 방석', '실이 촘촘하게 짜인 담요', '털실로 짠 양모 담요', '매끄러운 비단 천', '벨벳 베개', '짚으로 만든 매트'],
    'nap-place': ['창가의 침대', '조용한 구석의 침대', '탁자 아래의 침대', '책장 옆의 침대', '소파 위의 침대', '난로 옆의 침대', '옷장 안의 침대', '현관문 옆의 침대'],
    'toy-motion': ['좌우로 천천히 움직이는 낚싯대', '작은 원을 그리며 구르는 공', '한 번 살짝 튀는 장난감', '멈췄다가 미끄러지는 장난감', '지그재그로 끄는 끈', '줄에 매달려 빙글 도는 장난감', '흔들다가 멈추는 장난감', '담요 밑에서 꿈틀거리는 장난감'],
    'toy-texture': ['부드럽고 보송한 쥐 인형', '바스락 소리가 나는 천 장난감', '매끈한 고무 장난감', '부드러운 돌기가 있는 장난감', '깃털 장난감', '털실 공', '코르크 장난감', '종이 공'],
    'treat-flavor': ['익힌 닭고기 간식', '익힌 연어 간식', '익힌 칠면조 고기 간식', '익힌 소고기 간식', '익힌 오리고기 간식', '익힌 대구 간식', '익힌 새우 간식', '익힌 양고기 간식'],
    'treat-texture': ['부드럽고 촉촉한 고기 조각', '가늘게 자른 고기', '조금 단단한 정육면체 모양의 고기', '잘게 풀어진 고기', '바삭한 고기 칩', '부드러운 고기 페이스트', '쫄깃한 고기 스틱', '동결건조 고기 조각'],
    'brush-type': ['부드러운 털 브러시', '손에 끼는 고무 빗 장갑', '빗살 간격이 넓은 빗', '부드러운 돌기가 있는 브러시', '빗살이 촘촘한 빗', '부드러운 천으로 닦아 주기', '작은 둥근 브러시', '손잡이가 긴 브러시'],
    'touch-place': ['볼을 부드럽게 만져 주는 행동', '턱 밑을 부드럽게 만져 주는 행동', '어깨를 부드럽게 만져 주는 행동', '등을 부드럽게 만져 주는 행동', '귀 뒤를 부드럽게 만져 주는 행동', '이마를 부드럽게 만져 주는 행동', '목을 부드럽게 만져 주는 행동', '옆구리를 부드럽게 만져 주는 행동'],
    'hideout': ['종이 상자', '천으로 된 터널', '덮개가 있는 바구니', '낮은 나무 은신처', '종이 봉투', '작은 텐트', '빨래 바구니', '선반 칸막이'],
    'perch-height': ['바닥에 놓인 방석', '낮은 의자', '중간 높이의 선반', '높은 캣타워의 자리', '창턱 자리', '의자 위 자리', '탁자 위 자리', '옷장 꼭대기 자리'],
    'greeting': ['멀리서 눈을 천천히 깜빡이는 인사', '옆에서 조용히 건네는 인사', '코 가까이 가만히 내민 손', '부드러운 목소리로 하는 인사', '가까이 앉아서 하는 인사', '천천히 손을 흔드는 인사', '간식을 들고 하는 인사', '이름을 불러 주는 인사'],
    'scratch-post': ['종이 스크래처', '밧줄을 감은 기둥', '카펫 스크래처', '나무 판', '사이잘 매트', '껍질이 있는 통나무', '높은 스크래치 타워', '벽걸이 스크래처'],
    'sound': ['부드러운 피아노 음악', '새소리', '빗소리', '조용한 방', '부드러운 기타 음악', '파도 소리', '똑딱거리는 시계 소리', '천천히 흥얼거리는 노래'],
    'play-time': ['아침 놀이 시간', '점심 놀이 시간', '저녁 놀이 시간', '잠자기 전 놀이 시간', '아침 식사 후 놀이 시간', '낮잠 후 놀이 시간', '저녁 식사 후 놀이 시간', '오후 놀이 시간'],
    'window-view': ['새가 보이는 창문', '정원이 보이는 창문', '거리가 보이는 창문', '하늘이 보이는 창문', '연못이 보이는 창문', '공원이 보이는 창문', '지붕들이 보이는 창문', '꽃 화분이 있는 창문'],
    'bed-shape': ['둥근 침대', '동굴 모양 침대', '평평한 매트', '해멕 침대', '도넛 모양 침대', '상자 모양 침대', '작은 소파 침대', '터널 모양 침대'],
    'game-type': ['추격 놀이', '숨바꿅질', '가져오기 놀이', '퍼즐 상자 놀이', '간식 찾기 놀이', '까꿍 놀이', '터널 달리기 놀이', '종이 구기기 놀이'],
    'plant-treat': ['캔그라스', '캔닙', '개다래', '귀리 새싹', '밀싹', '보리싹', '쥐오줌풀 장난감', '인동덩굴 장난감'],
    'water-bowl': ['작은 물 분수', '넓은 물그릇', '키가 큰 물컵', '얼음을 넣은 물', '얕은 물 접시', '유리 물병', '물그릇 두 개', '밥그릇 옆에 놓인 물']
  };
  function label(action) {
    var index = Number(action.id.slice(action.id.lastIndexOf('-') + 1)) - 1;
    var value = labels[action.group] && labels[action.group][index];
    if (!value) throw new Error('Missing feedback label: ' + action.id);
    return value;
  }
  function object(word) {
    var code = word.charCodeAt(word.length - 1) - 0xac00;
    return word + (code >= 0 && code <= 11171 && code % 28 ? '을' : '를');
  }
  function explain(round, selectedId) {
    var selected = round.options.find(function (option) { return option.id === selectedId; });
    var correct = round.options.find(function (option) { return option.id === round.correctId; });
    if (!selected || !correct || selected.id === correct.id) return null;
    var sentences = (round.bodyEn.join(' ').match(/[^.!?]+[.!?]/g) || []).map(function (text) { return text.trim(); });
    var level = round.level || 'basic';
    var bank = MG.LEVELS[level] || MG.LEVELS.basic;
    // Every taste template embeds the hint verbatim; facts never mention a hint.
    var isTemplate = function (sentence, templates, hint) {
      return templates.some(function (template) { return template.replace('{h}', hint) === sentence; });
    };
    var correctQuote = sentences.find(function (sentence) { return isTemplate(sentence, bank.liked, correct.hint); });
    var selectedQuote = sentences.find(function (sentence) { return isTemplate(sentence, bank.disliked, selected.hint); });
    if (!correctQuote || !selectedQuote) throw new Error('The explanation must cite this page’s actual text.');
    var reasoning = {
      basic: '“likes”는 좋아한다는 뜻이고, “does not like”는 좋아하지 않는다는 뜻이에요.',
      inference: '이 책은 “좋아한다”고 직접 말하지 않고 고양이의 행동을 보여 줘요. 골골거리며 달려가거나 꼬리를 세우고 곁에 머무는 모습은 좋아한다는 뜻이고, 귀를 내리거나 돌아서거나 숨는 모습은 싫어한다는 뜻이에요. 행동에서 마음을 한 번 더 추리해야 해요.',
      advanced: '이 글은 수능 영어처럼 긴 문장과 어려운 단어로 취향을 둘러 표현해요. “gravitates toward”, “eagerness”, “preference” 같은 표현은 좋아한다는 뜻이고, “no inclination”, “indifference”, “aversion”, “withdraw” 같은 표현은 싫어한다는 뜻이에요. 양보 절(although, despite, however)이 있으면 주절의 태도가 글쓴이의 진짜 뜻이에요.'
    };
    return {
      correct: correct,
      selected: selected,
      correctQuote: correctQuote,
      selectedQuote: selectedQuote,
      explanationKo: '본문에서 이 고양이는 ' + object(label(correct)) + ' 좋아한다고 했어요. 그래서 정답 행동은 “' + correct.en + '”예요. ' +
        '선택한 ' + object(label(selected)) + ' 좋아하지 않는다는 문장도 있어요. ' + reasoning[level] + ' 다른 고양이가 아니라, 이 책에 나온 고양이의 취향을 보고 골라야 해요.'
    };
  }
  MG.Feedback = { explain: explain };
})(globalThis);
