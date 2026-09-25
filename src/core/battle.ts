export interface CardEffect {
  type: string;
  value: number;
  target?: string;
}

export interface Card {
  id: string;
  name: string;
  cost: number;
  type: 'attack' | 'skill' | 'heal';
  target: string;
  effects: CardEffect[];
}

export interface Combatant {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  shield: number;
}

export class BattleEngine {
  constructor(public party: Combatant[], public enemies: Combatant[], public ap: number) {}

  playCard(card: Card, target: Combatant): boolean {
    if (this.ap < card.cost) return false;
    this.ap -= card.cost;
    for (const effect of card.effects) {
      if (effect.type === 'damage') {
        target.hp = Math.max(0, target.hp - effect.value);
      } else if (effect.type === 'heal') {
        target.hp = Math.min(target.maxHp, target.hp + effect.value);
      }
    }
    return true;
  }
}
