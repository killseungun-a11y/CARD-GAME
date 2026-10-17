export interface CardEffect {
  type: 'damage' | 'heal' | 'shield' | 'apply_status' | 'draw' | 'ap' | 'heal_cleanse' | 'charge';
  value: number;
  status?: string;
  target?: 'self' | 'enemy' | 'all_enemies' | 'ally' | 'all_allies';
}

export interface CardData {
  id: string;
  name: string;
  cost: number;
  type: 'attack' | 'skill' | 'power';
  target: 'single_enemy' | 'all_enemies' | 'self' | 'single_ally' | 'all_allies';
  description: string;
  effects: CardEffect[];
  tags: string[];
}

export const CARDS_DATA: Record<string, CardData> = {
  knight_strike: {
    id: 'knight_strike',
    name: '기본참격',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    description: '적에게 6의 피해를 주고 방어도를 3 얻습니다.',
    effects: [
      { type: 'damage', value: 6, target: 'enemy' },
      { type: 'shield', value: 3, target: 'self' }
    ],
    tags: ['attack', 'knight']
  },
  knight_guard: {
    id: 'knight_guard',
    name: '철벽 방어',
    cost: 1,
    type: 'skill',
    target: 'self',
    description: '방어도를 8 얻고 아군 한 명의 피해를 대신 받습니다.',
    effects: [
      { type: 'shield', value: 8, target: 'self' },
      { type: 'apply_status', value: 1, status: 'taunt', target: 'self' }
    ],
    tags: ['skill', 'knight', 'defense']
  },
  berserker_slash: {
    id: 'berserker_slash',
    name: '광기의 일격',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    description: '자신의 체력을 2 소모하고 적에게 10의 피해를 줍니다.',
    effects: [
      { type: 'damage', value: 10, target: 'enemy' },
      { type: 'apply_status', value: 2, status: 'self_damage', target: 'self' }
    ],
    tags: ['attack', 'berserker', 'bleed']
  },
  berserker_blood_rage: {
    id: 'berserker_blood_rage',
    name: '피의 폭주',
    cost: 1,
    type: 'power',
    target: 'self',
    description: '체력을 3 소모하고 공격력을 증가시키며 피격 시 출혈을 부여합니다.',
    effects: [
      { type: 'apply_status', value: 3, status: 'self_damage', target: 'self' },
      { type: 'apply_status', value: 2, status: 'blood_rage_buff', target: 'self' }
    ],
    tags: ['power', 'berserker', 'bleed']
  },
  witch_fireball: {
    id: 'witch_fireball',
    name: '화염구',
    cost: 2,
    type: 'attack',
    target: 'single_enemy',
    description: '적에게 14의 화염 피해를 줍니다. 충전 스택을 1 소모합니다.',
    effects: [
      { type: 'damage', value: 14, target: 'enemy' },
      { type: 'apply_status', value: 1, status: 'consume_charge', target: 'self' }
    ],
    tags: ['attack', 'witch', 'fire']
  },
  witch_charge: {
    id: 'witch_charge',
    name: '마력 충전',
    cost: 1,
    type: 'skill',
    target: 'self',
    description: '마력 충전 스택을 2 얻고 카드를 1장 뽑습니다.',
    effects: [
      { type: 'charge', value: 2, target: 'self' },
      { type: 'draw', value: 1, target: 'self' }
    ],
    tags: ['skill', 'witch', 'charge']
  },
  hunter_shot: {
    id: 'hunter_shot',
    name: '정밀 사격',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    description: '적에게 7의 피해를 주고 표적을 부여합니다.',
    effects: [
      { type: 'damage', value: 7, target: 'enemy' },
      { type: 'apply_status', value: 1, status: 'marked', target: 'enemy' }
    ],
    tags: ['attack', 'hunter', 'mark']
  },
  hunter_swift: {
    id: 'hunter_swift',
    name: '비수 투척',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    description: '표적 대상에게 추가 치명타 피해를 입히는 비수를 투척합니다.',
    effects: [
      { type: 'damage', value: 9, target: 'enemy' }
    ],
    tags: ['attack', 'hunter', 'mark']
  },
  priest_heal: {
    id: 'priest_heal',
    name: '치유의 기도',
    cost: 2,
    type: 'skill',
    target: 'single_ally',
    description: '아군 한 명의 체력을 8 회복시키고 디버프를 정화합니다.',
    effects: [
      { type: 'heal_cleanse', value: 8, target: 'ally' }
    ],
    tags: ['skill', 'priest', 'heal']
  },
  priest_shield: {
    id: 'priest_shield',
    name: '성스러운 가호',
    cost: 1,
    type: 'skill',
    target: 'single_ally',
    description: '아군 한 명에게 방어도를 5 부여하고 카드를 1장 뽑습니다.',
    effects: [
      { type: 'shield', value: 5, target: 'ally' },
      { type: 'draw', value: 1, target: 'self' }
    ],
    tags: ['skill', 'priest', 'defense']
  },
  alchemist_potion: {
    id: 'alchemist_potion',
    name: '부식성 물약',
    cost: 1,
    type: 'attack',
    target: 'single_enemy',
    description: '적에게 부식성 물약을 던져 5의 피해를 주고 취약 상태를 부여합니다.',
    effects: [
      { type: 'damage', value: 5, target: 'enemy' },
      { type: 'apply_status', value: 2, status: 'vulnerable', target: 'enemy' }
    ],
    tags: ['attack', 'alchemist', 'potion']
  },
  alchemist_brew: {
    id: 'alchemist_brew',
    name: '연금술의 대가',
    cost: 1,
    type: 'skill',
    target: 'self',
    description: '랜덤 물약 카드를 생성하고 AP를 1 회복합니다.',
    effects: [
      { type: 'ap', value: 1, target: 'self' },
      { type: 'draw', value: 1, target: 'self' }
    ],
    tags: ['skill', 'alchemist', 'potion']
  }
};
