/**
 * 전투 엔진 코어 (Battle Engine Core)
 * 3인 파티 카드 RPG의 턴, AP, 카드 사용 및 효과 처리를 담당합니다.
 */

import { Card } from '../data/cards';

export interface BattleCharacterState {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  shield: number;
  isDead: boolean;
}

export interface BattleEnemyState {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  shield: number;
  intent: {
    type: 'attack' | 'defend' | 'buff' | 'debuff';
    value: number;
    targetId?: string;
  };
}

export interface BattleState {
  turn: number;
  isPlayerTurn: boolean;
  ap: number;
  maxAp: number;
  party: BattleCharacterState[];
  enemies: BattleEnemyState[];
  drawPile: Card[];
  hand: Card[];
  discardPile: Card[];
  exhaustPile: Card[];
}

export class BattleEngine {
  private state: BattleState;

  constructor(partyCharacters: { id: string; name: string; maxHp: number }[], enemies: { id: string; name: string; maxHp: number }[], initialDeck: Card[]) {
    this.state = {
      turn: 1,
      isPlayerTurn: true,
      ap: 3,
      maxAp: 3,
      party: partyCharacters.map(c => ({ id: c.id, name: c.name, hp: c.maxHp, maxHp: c.maxHp, shield: 0, isDead: false })),
      enemies: enemies.map(e => ({ id: e.id, name: e.name, hp: e.maxHp, maxHp: e.maxHp, shield: 0, intent: { type: 'attack', value: 6 } })),
      drawPile: [...initialDeck],
      hand: [],
      discardPile: [],
      exhaustPile: []
    };
    this.shuffleDrawPile();
    this.drawCards(4);
  }

  public getState(): BattleState {
    return this.state;
  }

  private shuffleDrawPile() {
    for (let i = this.state.drawPile.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.state.drawPile[i], this.state.drawPile[j]] = [this.state.drawPile[j], this.state.drawPile[i]];
    }
  }

  public drawCards(count: number) {
    for (let i = 0; i < count; i++) {
      if (this.state.drawPile.length === 0) {
        if (this.state.discardPile.length === 0) break;
        this.state.drawPile = [...this.state.discardPile];
        this.state.discardPile = [];
        this.shuffleDrawPile();
      }
      const card = this.state.drawPile.pop();
      if (card) {
        this.state.hand.push(card);
      }
    }
  }

  public playCard(cardIndex: number, targetEnemyIndex: number): boolean {
    if (!this.state.isPlayerTurn) return false;
    if (cardIndex < 0 || cardIndex >= this.state.hand.length) return false;

    const card = this.state.hand[cardIndex];
    if (this.state.ap < card.cost) return false;

    // AP 소모
    this.state.ap -= card.cost;

    // 카드 효과 처리
    const target = this.state.enemies[targetEnemyIndex];
    if (target) {
      card.effects.forEach(eff => {
        if (eff.type === 'damage') {
          const actualDamage = Math.max(0, eff.value - target.shield);
          target.shield = Math.max(0, target.shield - eff.value);
          target.hp = Math.max(0, target.hp - actualDamage);
        } else if (eff.type === 'shield') {
          const caster = this.state.party[0];
          if (caster) {
            caster.shield += eff.value;
          }
        }
      });
    }

    // 패에서 제거 및 버린 덱/소멸로 이동
    this.state.hand.splice(cardIndex, 1);
    if (card.tags && card.tags.includes('exhaust')) {
      this.state.exhaustPile.push(card);
    } else {
      this.state.discardPile.push(card);
    }

    return true;
  }

  public endTurn() {
    this.state.isPlayerTurn = false;
    // 적턴 처리 (간단 시뮬레이션)
    this.state.enemies.forEach(enemy => {
      if (enemy.hp > 0 && this.state.party.length > 0) {
        const target = this.state.party[0];
        const dmg = enemy.intent.value;
        const actualDmg = Math.max(0, dmg - target.shield);
        target.shield = Math.max(0, target.shield - dmg);
        target.hp = Math.max(0, target.hp - actualDmg);
      }
    });

    // 플레이어 턴 복귀
    this.state.turn++;
    this.state.ap = this.state.maxAp;
    this.state.party.forEach(p => p.shield = 0);
    this.drawCards(4);
    this.state.isPlayerTurn = true;
  }
}
