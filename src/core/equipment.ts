/**
 * 장비, 특성 및 파티 시너지 시스템 모듈
 * - 캐릭터별 장비 장착 및 해제 (무기, 방어구, 액세서리 슬롯)
 * - 장비 및 특성에 따른 패시브 스탯 보정
 * - 특성 선택 및 파티 시너지 태그 집계
 */

export type EquipmentSlot = 'weapon' | 'armor' | 'accessory';

export interface Equipment {
  id: string;
  name: string;
  slot: EquipmentSlot;
  stats: {
    attack?: number;
    defense?: number;
    maxHp?: number;
    critRate?: number;
    apRegen?: number;
  };
  effects?: Array<{
    type: string;
    value: number;
  }>;
  tags: string[];
}

export interface Trait {
  id: string;
  name: string;
  description: string;
  characterId?: string; // 특정 캐릭터 전용일 경우
  statModifiers?: {
    attack?: number;
    defense?: number;
    maxHp?: number;
    critRate?: number;
  };
  synergyTags?: string[];
}

export interface CharacterEquipmentState {
  characterId: string;
  equipped: {
    weapon?: Equipment;
    armor?: Equipment;
    accessory?: Equipment;
  };
  selectedTraits: Trait[];
}

export class CharacterEquipmentManager {
  private states: Map<string, CharacterEquipmentState> = new Map();

  constructor(characterIds: string[]) {
    for (const id of characterIds) {
      this.states.set(id, {
        characterId: id,
        equipped: {},
        selectedTraits: []
      });
    }
  }

  public equipItem(characterId: string, equipment: Equipment): boolean {
    const state = this.states.get(characterId);
    if (!state) return false;

    state.equipped[equipment.slot] = equipment;
    return true;
  }

  public unequipItem(characterId: string, slot: EquipmentSlot): Equipment | null {
    const state = this.states.get(characterId);
    if (!state) return null;

    const item = state.equipped[slot];
    delete state.equipped[slot];
    return item || null;
  }

  public addTrait(characterId: string, trait: Trait): boolean {
    const state = this.states.get(characterId);
    if (!state) return false;

    // 중복 특성 방지
    if (state.selectedTraits.some(t => t.id === trait.id)) {
      return false;
    }

    state.selectedTraits.push(trait);
    return true;
  }

  public getCharacterStats(characterId: string, baseStats: { attack: number; defense: number; maxHp: number; critRate: number }): { attack: number; defense: number; maxHp: number; critRate: number } {
    const state = this.states.get(characterId);
    if (!state) return { ...baseStats };

    let attack = baseStats.attack;
    let defense = baseStats.defense;
    let maxHp = baseStats.maxHp;
    let critRate = baseStats.critRate;

    // 장비 보정 계산
    for (const slot of ['weapon', 'armor', 'accessory'] as EquipmentSlot[]) {
      const eq = state.equipped[slot];
      if (eq && eq.stats) {
        if (eq.stats.attack) attack += eq.stats.attack;
        if (eq.stats.defense) defense += eq.stats.defense;
        if (eq.stats.maxHp) maxHp += eq.stats.maxHp;
        if (eq.stats.critRate) critRate += eq.stats.critRate;
      }
    }

    // 특성 보정 계산
    for (const trait of state.selectedTraits) {
      if (trait.statModifiers) {
        if (trait.statModifiers.attack) attack += trait.statModifiers.attack;
        if (trait.statModifiers.defense) defense += trait.statModifiers.defense;
        if (trait.statModifiers.maxHp) maxHp += trait.statModifiers.maxHp;
        if (trait.statModifiers.critRate) critRate += trait.statModifiers.critRate;
      }
    }

    return { attack, defense, maxHp, critRate };
  }

  public getPartySynergyTags(): Record<string, number> {
    const tagCounts: Record<string, number> = {};

    for (const state of this.states.values()) {
      // 장비 태그 집계
      for (const slot of ['weapon', 'armor', 'accessory'] as EquipmentSlot[]) {
        const eq = state.equipped[slot];
        if (eq && eq.tags) {
          for (const tag of eq.tags) {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          }
        }
      }

      // 특성 시너지 태그 집계
      for (const trait of state.selectedTraits) {
        if (trait.synergyTags) {
          for (const tag of trait.synergyTags) {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          }
        }
      }
    }

    return tagCounts;
  }
}
