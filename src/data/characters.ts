export interface Card {
  id: string;
  name: string;
  characterId: string;
  cost: number;
  type: 'attack' | 'skill' | 'support';
  description: string;
}

export interface Character {
  id: string;
  name: string;
  role: '전위' | '공격' | '지원';
  passiveName: string;
  passiveDescription: string;
  baseCards: Card[];
  uniqueCards: Card[];
}

pexport const CHARACTERS: Record<string, Character> = {
  knight: {
    id: 'knight',
    name: '기사',
    role: '전위',
    passiveName: '철벽의 방패',
    passiveDescription: '턴 시작 시 방어도를 5 얻습니다. 아군이 받는 피해의 20%를 대신 받습니다.',
    baseCards: [
      { id: 'k_base_1', name: '타격', characterId: 'knight', cost: 1, type: 'attack', description: '적 하나에게 피해를 6 줍니다.' },
      { id: 'k_base_2', name: '방어', characterId: 'knight', cost: 1, type: 'skill', description: '방어도를 6 얻습니다.' }
    ],
    uniqueCards: [
      { id: 'k_uniq_1', name: '도발', characterId: 'knight', cost: 1, type: 'skill', description: '방어도를 10 얻고 모든 적의 시선을 끕니다.' },
      { id: 'k_uniq_2', name: '반격 태세', characterId: 'knight', cost: 2, type: 'skill', description: '방어도를 8 얻고, 피격 시 반격 피해를 5 줍니다.' }
    ]
  },
  berserker: {
    id: 'berserker',
    name: '광전사',
    role: '전위',
    passiveName: '광기',
    passiveDescription: '체력이 낮을수록 공격력이 증가합니다. 피해를 입을 때마다 분노를 1 얻습니다.',
    baseCards: [
      { id: 'b_base_1', name: '난타', characterId: 'berserker', cost: 1, type: 'attack', description: '적 하나에게 피해를 8 줍니다. 자신도 피해를 2 입습니다.' },
      { id: 'b_base_2', name: '투지', characterId: 'berserker', cost: 1, type: 'skill', description: '분노를 2 얻습니다.' }
    ],
    uniqueCards: [
      { id: 'b_uniq_1', name: '피의 일격', characterId: 'berserker', cost: 2, type: 'attack', description: '현재 체력의 10%를 소모하여 적 하나에게 대량의 피해를 줍니다.' },
      { id: 'b_uniq_2', name: '광란', characterId: 'berserker', cost: 1, type: 'skill', description: '분노를 모두 소모하여 소모한 수만큼 카드를 뽑습니다.' }
    ]
  },
  witch: {
    id: 'witch',
    name: '마녀',
    role: '공격',
    passiveName: '마력 공명',
    passiveDescription: '카드를 사용할 때마다 마력 충전을 1 얻습니다. 5 충전 시 다음 공격 피해가 2배가 됩니다.',
    baseCards: [
      { id: 'w_base_1', name: '마력탄', characterId: 'witch', cost: 1, type: 'attack', description: '적 하나에게 마법 피해를 7 줍니다.' },
      { id: 'w_base_2', name: '집중', characterId: 'witch', cost: 1, type: 'skill', description: '마력 충전을 2 얻습니다.' }
    ],
    uniqueCards: [
      { id: 'w_uniq_1', name: '화염구', characterId: 'witch', cost: 2, type: 'attack', description: '적 하나에게 강력한 화염 피해를 15 주고 화상 중첩을 부여합니다.' },
      { id: 'w_uniq_2', name: '마력 보호막', characterId: 'witch', cost: 1, type: 'skill', description: '마력 충전을 모두 소모하여 충전당 4의 방어도를 얻습니다.' }
    ]
  },
  hunter: {
    id: 'hunter',
    name: '사냥꾼',
    role: '공격',
    passiveName: '약점 포착',
    passiveDescription: '적이 디버프에 걸려있을 때 추가 피해를 줍니다. 턴 시작 시 무작위 적에게 표식을 남깁니다.',
    baseCards: [
      { id: 'h_base_1', name: '정밀 사격', characterId: 'hunter', cost: 1, type: 'attack', description: '적 하나에게 피해를 6 줍니다. 표식이 있다면 치명타가 발생합니다.' },
      { id: 'h_base_2', name: '표적 지정', characterId: 'hunter', cost: 1, type: 'skill', description: '적 하나에게 표식을 부여합니다.' }
    ],
    uniqueCards: [
      { id: 'h_uniq_1', name: '급소 찌르기', characterId: 'hunter', cost: 2, type: 'attack', description: '적 하나에게 피해를 12 주고 출혈을 부여합니다.' },
      { id: 'h_uniq_2', name: '함정 설치', characterId: 'hunter', cost: 1, type: 'skill', description: '적의 다음 행동을 방해하는 함정을 설치합니다.' }
    ]
  },
  priest: {
    id: 'priest',
    name: '사제',
    role: '지원',
    passiveName: '신성한 은총',
    passiveDescription: '회복 카드 사용 시 대상에게 재생 효과를 1턴 부여합니다.',
    baseCards: [
      { id: 'p_base_1', name: '치유', characterId: 'priest', cost: 1, type: 'support', description: '아군 하나의 체력을 6 회복합니다.' },
      { id: 'p_base_2', name: '정화', characterId: 'priest', cost: 1, type: 'support', description: '아군 하나의 디버프를 1개 제거합니다.' }
    ],
    uniqueCards: [
      { id: 'p_uniq_1', name: '성역', characterId: 'priest', cost: 2, type: 'support', description: '모든 아군의 방어도를 5 올리고 체력을 4 회복합니다.' },
      { id: 'p_uniq_2', name: '천상의 축복', characterId: 'priest', cost: 1, type: 'support', description: '아군 하나의 공격력을 2턴 동안 증가시킵니다.' }
    ]
  },
  alchemist: {
    id: 'alchemist',
    name: '연금술사',
    role: '지원',
    passiveName: '원소 혼합',
    passiveDescription: '카드를 드로우할 때마다 무작위 포션 시약(불꽃/냉기/맹독)을 획득합니다.',
    baseCards: [
      { id: 'a_base_1', name: '산성 투척', characterId: 'alchemist', cost: 1, type: 'attack', description: '적 하나에게 산성 피해를 5 주고 방어도를 2 감소시킵니다.' },
      { id: 'a_base_2', name: '시약 정제', characterId: 'alchemist', cost: 1, type: 'skill', description: '카드를 1장 뽑고 시약을 1개 무작위로 얻습니다.' }
    ],
    uniqueCards: [
      { id: 'a_uniq_1', name: '폭발성 포션', characterId: 'alchemist', cost: 2, type: 'attack', description: '모든 적에게 광역 피해를 주고 화상 또는 중독을 겁니다.' },
      { id: 'a_uniq_2', name: '치유의 약초', characterId: 'alchemist', cost: 1, type: 'support', description: '아군 하나의 체력을 5 회복하고 디버프를 정화합니다.' }
    ]
  }
};
