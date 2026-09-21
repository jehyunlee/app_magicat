(function (root) {
  'use strict';
  var MG = root.MG = root.MG || {};
  // Korean is used only after an incorrect answer, never in the question.
  var labels = {
    'bowl-shape': ['낮고 넓은 접시', '네 칸으로 나뉜 식판', '둥근 그릇', '옆면이 높은 그릇'],
    'bowl-material': ['흙으로 빚은 그릇', '금속 그릇', '유리 그릇', '대나무 그릇'],
    'water-place': ['창가에 놓인 물', '침대 옆에 놓인 물', '주방 매트 위에 놓인 물', '스크래치 기둥 옆에 놓인 물'],
    'nap-texture': ['부드럽고 보송한 매트', '얇은 면 수건', '속을 채운 부드러운 방석', '실이 촘촘하게 짜인 담요'],
    'nap-place': ['창가의 침대', '조용한 구석의 침대', '탁자 아래의 침대', '책장 옆의 침대'],
    'toy-motion': ['좌우로 천천히 움직이는 낚싯대', '작은 원을 그리며 구르는 공', '한 번 살짝 튀는 장난감', '멈췄다가 미끄러지는 장난감'],
    'toy-texture': ['부드럽고 보송한 쥐 인형', '바스락 소리가 나는 천 장난감', '매끈한 고무 장난감', '부드러운 돌기가 있는 장난감'],
    'treat-flavor': ['익힌 닭고기 간식', '익힌 연어 간식', '익힌 칠면조 고기 간식', '익힌 소고기 간식'],
    'treat-texture': ['부드럽고 촉촉한 고기 조각', '가늘게 자른 고기', '조금 단단한 정육면체 모양의 고기', '잘게 풀어진 고기'],
    'brush-type': ['부드러운 털 브러시', '손에 끼는 고무 빗 장갑', '빗살 간격이 넓은 빗', '부드러운 돌기가 있는 브러시'],
    'touch-place': ['볼을 부드럽게 만져 주는 행동', '턱 밑을 부드럽게 만져 주는 행동', '어깨를 부드럽게 만져 주는 행동', '등을 부드럽게 만져 주는 행동'],
    'hideout': ['종이 상자', '천으로 된 터널', '덮개가 있는 바구니', '낮은 나무 은신처'],
    'perch-height': ['바닥에 놓인 방석', '낮은 의자', '중간 높이의 선반', '높은 캣타워의 자리'],
    'greeting': ['멀리서 눈을 천천히 깜빡이는 인사', '옆에서 조용히 건네는 인사', '코 가까이 가만히 내민 손', '부드러운 목소리로 하는 인사']
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
    var correctQuote = sentences.find(function (sentence) { return sentence === 'Your cat likes the ' + correct.hint + '.'; });
    var ending = 'does not like the ' + selected.hint + '.';
    var selectedQuote = sentences.find(function (sentence) { return sentence.endsWith(ending); });
    if (!correctQuote || !selectedQuote) throw new Error('The explanation must cite this page’s actual text.');
    return {
      correct: correct,
      selected: selected,
      correctQuote: correctQuote,
      selectedQuote: selectedQuote,
      explanationKo: '본문에서 이 고양이는 ' + object(label(correct)) + ' 좋아한다고 했어요. 그래서 정답 행동은 “' + correct.en + '”예요. ' +
        '선택한 ' + object(label(selected)) + ' 좋아하지 않는다는 문장도 있어요. “likes”는 좋아한다는 뜻이고, “does not like”는 좋아하지 않는다는 뜻이에요. 다른 고양이가 아니라, 이 책에 나온 고양이의 취향을 보고 골라야 해요.'
    };
  }
  MG.Feedback = { explain: explain };
})(globalThis);
