export interface Card {
  id: string;
  name: string;
  cost: number;
  type: 'attack' | 'skill' | 'defense';
  target: 'enemy' | 'self' | 'all';
  effects: Array<{ type: string; value: number }>;
}

export interface Character {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  ap: number;
}

export class BattleEngine {
  public party: Character[];
  public ap: number;
  public maxAp: number;

  constructor(party: Character[]) {
    this.party = party;
    this.maxAp = 3;
    this.ap = this.maxAp;
  }

  public startTurn(): void {
    this.ap = this.maxAp;
  }

  public useCard(card: Card): boolean {
    if (this.ap >= card.cost) {
      this.ap -= card.cost;
      return true;
    }
    return false;
  }

  public endTurn(): void {
    // Turn end logic
  }
}
