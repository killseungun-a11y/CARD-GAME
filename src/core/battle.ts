import { Card, Character } from '../data/cards';
import { DeckManager } from './deck';

export interface BattleState {
  turn: number;
  ap: number;
  maxAp: number;
  party: Character[];
  enemies: Character[];
  deckManager: DeckManager;
  isGameOver: boolean;
  isVictory: boolean;
}

export class BattleEngine {
  private state: BattleState;

  constructor(party: Character[], enemies: Character[], initialDeck: Card[]) {
    this.state = {
      turn: 1,
      ap: 3,
      maxAp: 3,
      party,
      enemies,
      deckManager: new DeckManager(initialDeck),
      isGameOver: false,
      isVictory: false,
    };
    this.state.deckManager.shuffle();
  }

  public startTurn(): void {
    if (this.state.isGameOver || this.state.isVictory) return;
    this.state.ap = this.state.maxAp;
    this.state.deckManager.draw(4);
  }

  public playCard(cardId: string): boolean {
    const hand = this.state.deckManager.getHand();
    const cardIndex = hand.findIndex(c => c.id === cardId);
    if (cardIndex === -1) return false;

    const card = hand[cardIndex];
    if (this.state.ap < card.cost) return false;

    this.state.ap -= card.cost;
    this.state.deckManager.playCard(cardId);
    return true;
  }

  public endTurn(): void {
    if (this.state.isGameOver || this.state.isVictory) return;
    this.state.turn++;
    this.startTurn();
  }

  public getState(): BattleState {
    return this.state;
  }
}
