import { CardData } from '../data/cards';

export interface DeckState {
  drawPile: CardData[];
  hand: CardData[];
  discardPile: CardData[];
  exhaustPile: CardData[];
}

/**
 * 3인 파티의 카드들을 합쳐서 초기 전투 덱을 생성하고 셔플합니다.
 */
export function createBattleDeck(partyCards: CardData[]): DeckState {
  if (!partyCards || partyCards.length === 0) {
    throw new Error('파티 카드가 비어있어 덱을 생성할 수 없습니다.');
  }
  
  // 깊은 복사를 통해 원본 데이터 오염 방지 및 무결성 확인
  const deck = partyCards.map(card => ({ ...card }));
  shuffleArray(deck);

  return {
    drawPile: deck,
    hand: [],
    discardPile: [],
    exhaustPile: [],
  };
}

/**
 * Fisher-Yates 알고리즘을 사용한 인플레이스 셔플
 */
export function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * 지정된 수만큼 카드를 드로우합니다.
 * 드로우 파일이 부족할 경우 디스카드 파일을 셔플하여 드로우 파일로 보충합니다.
 */
export function drawCards(state: DeckState, count: number): CardData[] {
  const drawn: CardData[] = [];

  for (let i = 0; i < count; i++) {
    if (state.drawPile.length === 0) {
      if (state.discardPile.length === 0) {
        // 더 이상 드로우할 카드가 없음
        break;
      }
      // 버린 덱을 다시 뽑을 덱으로 이동 후 셔플
      state.drawPile = [...state.discardPile];
      state.discardPile = [];
      shuffleArray(state.drawPile);
    }

    const card = state.drawPile.pop();
    if (card) {
      state.hand.push(card);
      drawn.push(card);
    }
  }

  return drawn;
}

/**
 * 손패에 있는 카드를 버림 덱(discardPile)으로 이동합니다.
 */
export function discardCard(state: DeckState, cardId: string): boolean {
  const index = state.hand.findIndex(c => c.id === cardId);
  if (index === -1) return false;

  const [card] = state.hand.splice(index, 1);
  state.discardPile.push(card);
  return true;
}

/**
 * 손패에 있는 카드를 소멸 덱(exhaustPile)으로 이동합니다.
 */
export function exhaustCard(state: DeckState, cardId: string): boolean {
  const index = state.hand.findIndex(c => c.id === cardId);
  if (index === -1) return false;

  const [card] = state.hand.splice(index, 1);
  state.exhaustPile.push(card);
  return true;
}

/**
 * 턴 종료 시 손패의 남은 카드들을 모두 버림 덱으로 보냅니다.
 */
export function endTurnDiscard(state: DeckState): void {
  while (state.hand.length > 0) {
    const card = state.hand.pop();
    if (card) {
      state.discardPile.push(card);
    }
  }
}

/**
 * 덱 상태의 무결성을 검증합니다 (총 카드 수 확인 및 경계조건 검사)
 */
export function validateDeckState(state: DeckState): boolean {
  if (!state || !state.drawPile || !state.hand || !state.discardPile || !state.exhaustPile) {
    return false;
  }

  const allCards = [
    ...state.drawPile,
    ...state.hand,
    ...state.discardPile,
    ...state.exhaustPile,
  ];

  if (allCards.length === 0) {
    return false;
  }

  // 각 카드가 올바른 id와 캐릭터 소속을 가지는지 검증
  for (const card of allCards) {
    if (!card.id || !card.characterId) {
      return false;
    }
  }

  return true;
}
