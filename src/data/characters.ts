import { CARDS_DATA } from './cards';

export interface CharacterPassive {
  id: string;
  name: string;
  description: string;
  trigger: 'on_turn_start' | 'on_attack' | 'on_damage_taken' | 'on_heal' | 'on_low_hp';
  effectType: string;
  value: number;
}

export interface CharacterData {
  id: string;
  name: string;
  role: '전위' | '공격' | '지원';
  description: string;
  passive: CharacterPassive;
  baseCards: string[];
  uniqueCards: string[];
}

export const CHARACTERS_DATA: Record<string, CharacterData> = {
  knight: {
    id: 'knight',
    name: '기사',
    role: '전위',
    description: '단단한 방어력과 아군 보호 능력을 가진 전위 캐릭터',
    passive: {
      id: 'knight_resolve',
      name: '기사의 결의',
      description: '턴 시작 시 방어도를 5 얻습니다.',
      trigger: 'on_turn_start',
      effectType: 'shield',
      value: 5
    },
    baseCards: ['knight_strike', 'knight_strike'],
    uniqueCards: ['knight_guard']
  },
  berserker: {
    id: 'berserker',
    name: '광전사',
    role: '전위',
    description: '저체력에서 강력한 위력을 내고 출혈을 다루는 광전사',
    passive: {
      id: 'berserker_bloodthirst',
      name: '피의 갈증',
      description: '체력이 50% 미만일 때 공격력이 증가하며 피격 시 출혈을 부여합니다.',
      trigger: 'on_low_hp',
      effectType: 'damage_boost',
      value: 50
    },
    baseCards: ['knight_strike'],
    uniqueCards: ['berserker_slash', 'berserker_blood_rage']
  },
  witch: {
    id: 'witch',
    name: '마녀',
    role: '공격',
    description: '마력 충전을 통해 강력한 광역 및 단일 마법 피해를 주는 마녀',
    passive: {
      id: 'witch_mana_flow',
      name: '마력 흐름',
      description: '카드를 사용할 때마다 충전 스택을 축적합니다.',
      trigger: 'on_attack',
      effectType: 'charge',
      value: 1
    },
    baseCards: ['knight_strike'],
    uniqueCards: ['witch_fireball', 'witch_charge']
  },
  hunter: {
    id: 'hunter',
    name: '사냥꾼',
    role: '공격',
    description: '표적을 지정하여 추가 치명타 피해를 입히는 사냥꾼',
    passive: {
      id: 'hunter_marksmanship',
      name: '명사수',
      description: '표적 대상에게 추가 치명타 피해를 입힙니다.',
      trigger: 'on_attack',
      effectType: 'critical_bonus',
      value: 25
    },
    baseCards: ['knight_strike'],
    uniqueCards: ['hunter_shot', 'hunter_swift']
  },
  priest: {
    id: 'priest',
    name: '사제',
    role: '지원',
    description: '아군의 체력을 회복시키고 디버프를 정화하는 사제',
    passive: {
      id: 'priest_blessing',
      name: '성스러운 은총',
      description: '치유 시 디버프를 정화합니다.',
      trigger: 'on_heal',
      effectType: 'cleanse',
      value: 1
    },
    baseCards: ['priest_shield'],
    uniqueCards: ['priest_heal']
  },
  alchemist: {
    id: 'alchemist',
    name: '연금술사',
    role: '지원',
    description: '물약을 생성하고 전투를 지원하는 연금술사',
    passive: {
      id: 'alchemist_mastery',
      name: '연금술의 대가',
      description: '턴 시작 시 무작위 물약 카드를 생성합니다.',
      trigger: 'on_turn_start',
      effectType: 'potion_gen',
      value: 1
    },
    baseCards: ['priest_shield'],
    uniqueCards: ['alchemist_potion', 'alchemist_brew']
  }
};

export function validateCharacterAndCardData(): boolean {
  for (const [charId, char] of Object.entries(CHARACTERS_DATA)) {
    if (charId !== char.id) {
      throw new Error(`Character ID mismatch: key '${charId}' vs property '${char.id}'`);
    }
    const allCardIds = [...char.baseCards, ...char.uniqueCards];
    for (const cardId of allCardIds) {
      if (!CARDS_DATA[cardId]) {
        throw new Error(`Character '${char.id}' references missing card ID '${cardId}'`);
      }
      if (CARDS_DATA[cardId].id !== cardId) {
        throw new Error(`Card ID mismatch: key '${cardId}' vs property '${CARDS_DATA[cardId].id}'`);
      }
    }
  }
  
  const cardIds = Object.keys(CARDS_DATA);
  const uniqueCardIds = new Set(cardIds);
  if (cardIds.length !== uniqueCardIds.size) {
    throw new Error('Duplicate card IDs detected in CARDS_DATA');
  }

  const charIds = Object.keys(CHARACTERS_DATA);
  const uniqueCharIds = new Set(charIds);
  if (charIds.length !== uniqueCharIds.size) {
    throw new Error('Duplicate character IDs detected in CHARACTERS_DATA');
  }

  return true;
}
