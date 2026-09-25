export type TargetType = 'self' | 'single_enemy' | 'all_enemies' | 'ally' | 'all_allies' | 'party';
export type EffectType = 
  | 'block' 
  | 'damage' 
  | 'heal' 
  | 'apply_status' 
  | 'draw' 
  | 'energy' 
  | 'charge' 
  | 'remove_debuff'
  | 'sacrifice_hp';

export interface PassiveEffect {
  trigger: 'on_turn_start' | 'on_attack' | 'on_heal' | 'on_damage_taken' | 'always';
  condition?: {
    type: 'hp_below_percent' | 'has_status' | 'has_charge';
    value: number;
    statusName?: string;
  };
  effectType: EffectType;
  value: number;
  statusName?: string;
  target: TargetType;
  description: string;
}

export interface CardEffect {
  effectType: EffectType;
  value: number;
  target: TargetType;
  statusName?: string;
}

export interface CardData {
  id: string;
  name: string;
  cost: number;
  type: 'attack' | 'skill' | 'defense';
  target: TargetType;
  effects: CardEffect[];
  description: string;
  tags: string[];
}

export interface CharacterData {
  id: string;
  name: string;
  role: '전위' | '공격' | '지원';
  description: string;
  passives: PassiveEffect[];
  baseCards: string[];
  uniqueCards: string[];
}

export const CARDS_DATA: Record<string, CardData> = {
  knight_strike: {
    id: 'knight_strike',
    name: '기습 타격',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    effects: [{ effectType: 'damage', value: 6, target: 'single_enemy' }],
    description: '적에게 6의 피해를 줍니다.',
    tags: ['attack', 'physical']
  },
  knight_guard: {
    id: 'knight_guard',
    name: '방패 밀기',
    cost: 1,
    type: 'defense',
    target: 'self',
    effects: [{ effectType: 'block', value: 8, target: 'self' }],
    description: '방어력 8을 얻습니다.',
    tags: ['defense', 'block']
  },
  knight_protect: {
    id: 'knight_protect',
    name: '엄호',
    cost: 2,
    type: 'skill',
    target: 'ally',
    effects: [{ effectType: 'block', value: 12, target: 'ally' }],
    description: '아군 한 명에게 방어력 12를 부여합니다.',
    tags: ['defense', 'support']
  },
  berserker_slash: {
    id: 'berserker_slash',
    name: '광기의 일격',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    effects: [{ effectType: 'damage', value: 9, target: 'single_enemy' }],
    description: '적에게 9의 피해를 줍니다.',
    tags: ['attack', 'physical']
  },
  berserker_blood_rage: {
    id: 'berserker_blood_rage',
    name: '피의 분노',
    cost: 1,
    type: 'skill',
    target: 'self',
    effects: [
      { effectType: 'sacrifice_hp', value: 4, target: 'self' },
      { effectType: 'damage', value: 14, target: 'single_enemy' }
    ],
    description: '체력 4를 소모하여 적에게 14의 피해를 줍니다.',
    tags: ['attack', 'sacrifice']
  },
  berserker_frenzy: {
    id: 'berserker_frenzy',
    name: '광란',
    cost: 2,
    type: 'attack',
    target: 'all_enemies',
    effects: [{ effectType: 'damage', value: 8, target: 'all_enemies' }],
    description: '모든 적에게 8의 피해를 줍니다.',
    tags: ['attack', 'aoe']
  },
  witch_spark: {
    id: 'witch_spark',
    name: '마력 불꽃',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    effects: [
      { effectType: 'damage', value: 7, target: 'single_enemy' },
      { effectType: 'charge', value: 1, target: 'self' }
    ],
    description: '적에게 7의 피해를 주고 충전 1을 얻습니다.',
    tags: ['attack', 'magic', 'charge']
  },
  witch_bolt: {
    id: 'witch_bolt',
    name: '번개 화살',
    cost: 2,
    type: 'attack',
    target: 'single_enemy',
    effects: [{ effectType: 'damage', value: 18, target: 'single_enemy' }],
    description: '적에게 강력한 18의 마법 피해를 줍니다.',
    tags: ['attack', 'magic']
  },
  witch_shield: {
    id: 'witch_shield',
    name: '마나 방벽',
    cost: 1,
    type: 'defense',
    target: 'self',
    effects: [
      { effectType: 'block', value: 5, target: 'self' },
      { effectType: 'charge', value: 1, target: 'self' }
    ],
    description: '방어력 5를 얻고 충전 1을 얻습니다.',
    tags: ['defense', 'charge']
  },
  hunter_shot: {
    id: 'hunter_shot',
    name: '정밀 사격',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    effects: [{ effectType: 'damage', value: 8, target: 'single_enemy' }],
    description: '적에게 8의 피해를 주고 표적을 남깁니다.',
    tags: ['attack', 'ranged', 'target']
  },
  hunter_rapid: {
    id: 'hunter_rapid',
    name: '속사',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    effects: [{ effectType: 'damage', value: 5, target: 'single_enemy' }],
    description: '적에게 5의 피해를 두 번 줍니다.',
    tags: ['attack', 'ranged', 'multi']
  },
  hunter_dagger: {
    id: 'hunter_dagger',
    name: '비수 투척',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    effects: [
      { effectType: 'damage', value: 6, target: 'single_enemy' },
      { effectType: 'apply_status', value: 2, target: 'single_enemy', statusName: 'bleed' }
    ],
    description: '적에게 6의 피해를 주고 출혈 2를 부여합니다.',
    tags: ['attack', 'bleed']
  },
  priest_heal: {
    id: 'priest_heal',
    name: '치유의 기도',
    cost: 1,
    type: 'skill',
    target: 'ally',
    effects: [{ effectType: 'heal', value: 8, target: 'ally' }],
    description: '아군 한 명의 체력을 8 회복시키고 디버프를 정화합니다.',
    tags: ['support', 'heal', 'cleanse']
  },
  priest_smite: {
    id: 'priest_smite',
    name: '신성한 일격',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    effects: [{ effectType: 'damage', value: 5, target: 'single_enemy' }],
    description: '적에게 신성한 피해 5를 줍니다.',
    tags: ['attack', 'holy']
  },
  priest_barrier: {
    id: 'priest_barrier',
    name: '성스러운 결계',
    cost: 2,
    type: 'defense',
    target: 'all_allies',
    effects: [{ effectType: 'block', value: 6, target: 'all_allies' }],
    description: '모든 아군에게 방어력 6을 부여합니다.',
    tags: ['defense', 'support']
  },
  alchemist_potion: {
    id: 'alchemist_potion',
    name: '독성 물약 투척',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    effects: [{ effectType: 'apply_status', value: 3, target: 'single_enemy', statusName: 'poison' }],
    description: '적에게 독 3을 부여합니다.',
    tags: ['skill', 'status', 'poison']
  },
  alchemist_heal_potion: {
    id: 'alchemist_heal_potion',
    name: '회복 물약',
    cost: 1,
    type: 'skill',
    target: 'ally',
    effects: [
      { effectType: 'heal', value: 6, target: 'ally' },
      { effectType: 'draw', value: 1, target: 'self' }
    ],
    description: '아군 체력을 6 회복하고 카드를 1장 뽑습니다.',
    tags: ['support', 'heal', 'draw']
  },
  alchemist_acid: {
    id: 'alchemist_acid',
    name: '부식성 산액',
    cost: 2,
    type: 'attack',
    target: 'single_enemy',
    effects: [
      { effectType: 'damage', value: 10, target: 'single_enemy' },
      { effectType: 'apply_status', value: 2, target: 'single_enemy', statusName: 'acid' }
    ],
    description: '적에게 10의 피해를 주고 부식 2를 부여합니다.',
    tags: ['attack', 'debuff']
  }
};

export const CHARACTERS_DATA: Record<string, CharacterData> = {
  knight: {
    id: 'knight',
    name: '기사',
    role: '전위',
    description: '아군을 보호하고 튼튼한 방어선 구축에 특화된 전위 캐릭터.',
    passives: [
      {
        trigger: 'always',
        effectType: 'block',
        value: 3,
        target: 'self',
        description: '전투 시작 시 및 턴 시작 시 추가 방어력 +3을 얻습니다.'
      }
    ],
    baseCards: ['knight_strike', 'knight_guard'],
    uniqueCards: ['knight_protect']
  },
  berserker: {
    id: 'berserker',
    name: '광전사',
    role: '전위',
    description: '체력이 낮아질수록 공격력이 급증하며 스스로 출혈을 감수하는 광전사.',
    passives: [
      {
        trigger: 'on_attack',
        condition: { type: 'hp_below_percent', value: 50 },
        effectType: 'damage',
        value: 5,
        target: 'single_enemy',
        description: '체력이 50% 미만일 때 공격 시 추가 피해 +5를 가합니다.'
      },
      {
        trigger: 'on_damage_taken',
        effectType: 'apply_status',
        value: 1,
        statusName: 'bleed',
        target: 'self',
        description: '피해를 입을 때마다 출혈 1이 중첩됩니다.'
      }
    ],
    baseCards: ['berserker_slash', 'knight_guard'],
    uniqueCards: ['berserker_blood_rage', 'berserker_frenzy']
  },
  witch: {
    id: 'witch',
    name: '마녀',
    role: '공격',
    description: '주문 사용 시 충전을 모아 파괴적인 마법을 구사하는 마법사.',
    passives: [
      {
        trigger: 'always',
        effectType: 'charge',
        value: 1,
        target: 'self',
        description: '마법 카드 사용 시 충전 스택을 모아 위력을 증폭합니다.'
      }
    ],
    baseCards: ['witch_spark', 'witch_shield'],
    uniqueCards: ['witch_bolt']
  },
  hunter: {
    id: 'hunter',
    name: '사냥꾼',
    role: '공격',
    description: '표적 대상에게 추가 치명타 피해를 입히고 원거리 공격을 퍼붓는 사냥꾼.',
    passives: [
      {
        trigger: 'on_attack',
        condition: { type: 'has_status', value: 1, statusName: 'target' },
        effectType: 'damage',
        value: 4,
        target: 'single_enemy',
        description: '표적 대상 공격 시 추가 피해 +4 및 치명타 확률이 증가합니다.'
      }
    ],
    baseCards: ['hunter_shot', 'hunter_rapid'],
    uniqueCards: ['hunter_dagger']
  },
  priest: {
    id: 'priest',
    name: '사제',
    role: '지원',
    description: '아군을 치유하고 해로운 디버프를 정화하여 파티를 유지하는 성직자.',
    passives: [
      {
        trigger: 'on_heal',
        effectType: 'remove_debuff',
        value: 1,
        target: 'ally',
        description: '아군 치유 시 대상의 디버프 1개를 정화합니다.'
      }
    ],
    baseCards: ['priest_smite', 'priest_barrier'],
    uniqueCards: ['priest_heal']
  },
  alchemist: {
    id: 'alchemist',
    name: '연금술사',
    role: '지원',
    description: '다양한 물약을 생성하고 상태 이상으로 적을 침식하는 연금술의 대가.',
    passives: [
      {
        trigger: 'on_turn_start',
        effectType: 'draw',
        value: 1,
        target: 'self',
        description: '매 턴 시작 시 연금술 물약 카드나 무작위 효과 카드를 보조 생성합니다.'
      }
    ],
    baseCards: ['alchemist_potion', 'priest_smite'],
    uniqueCards: ['alchemist_heal_potion', 'alchemist_acid']
  }
};

export function validateGameData(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const [key, char] of Object.entries(CHARACTERS_DATA)) {
    if (key !== char.id) {
      errors.push(`Character key mismatch: ${key} vs ${char.id}`);
    }
    const allCharacterCards = [...char.baseCards, ...char.uniqueCards];
    for (const cardId of allCharacterCards) {
      if (!CARDS_DATA[cardId]) {
        errors.push(`Character ${char.id} references missing card ID: ${cardId}`);
      }
    }
  }

  const cardIdSet = new Set<string>();
  for (const [key, card] of Object.entries(CARDS_DATA)) {
    if (key !== card.id) {
      errors.push(`Card key mismatch: ${key} vs ${card.id}`);
    }
    if (cardIdSet.has(card.id)) {
      errors.push(`Duplicate card ID detected: ${card.id}`);
    }
    cardIdSet.add(card.id);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
