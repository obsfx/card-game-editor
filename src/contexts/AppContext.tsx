import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CARD, CARD_SUIT, SCREEN_SIZES } from '../contants';
import { AtlasData, Card, ScreenSize, SelectedCard, TargetCard } from '../types';
import { calculateTargetPos, calculateCardTableBounds } from '../utils';

export interface IAppContext {
  json: AtlasData | null;
  setJson: Dispatch<SetStateAction<AtlasData | null>>;
  imageB64: string;
  setImageB64: Dispatch<SetStateAction<string>>;
  selectedCard: SelectedCard | null;
  setSelectedCard: Dispatch<SetStateAction<SelectedCard | null>>;
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
  output: TargetCard[];
  createCard: (cardValue: number, suitValue: number) => void;
  updateCard: (id: string, props: Record<string, unknown>) => void;
  removeCard: (id: string) => void;
  selectedScreenSize: ScreenSize;
  boundWidth: number;
  boundHeight: number;
}

const AppContext = React.createContext<IAppContext | null>(null);

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [json, setJson] = useState<AtlasData | null>(null);
  const [imageB64, setImageB64] = useState('');
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [output, setOutput] = useState<TargetCard[]>([]);

  const selectedScreenSize = SCREEN_SIZES[1];
  const {
    width: boundWidth,
    height: boundHeight,
    leftAbsoluteX,
    topAbsoluteY,
  } = calculateCardTableBounds(selectedScreenSize.width, selectedScreenSize.height);

  const createCard = (cardValue: number, suitValue: number) => {
    if (!json) {
      return;
    }

    const imageKey = `${CARD[cardValue - 1]}_${CARD_SUIT[suitValue]}.png`;
    const frame = json.frames[imageKey].frame;
    setCards((prev) => [
      ...prev,
      {
        id: uuidv4(),
        frame,
        angle: 0,
        value: cardValue || 1,
        kind: suitValue,
        x: 0,
        y: 0,
        zIndex: cards.length,
      },
    ]);
  };

  const updateCard = (id: string, props: Record<string, unknown>) => {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id !== id) {
          return card;
        }

        return {
          ...card,
          ...props,
        };
      })
    );
  };

  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  useEffect(() => {
    const sortedCards = cards.sort((a, b) => a.zIndex - b.zIndex);
    const output: TargetCard[] = [];

    for (let i = 0; i < sortedCards.length; i++) {
      const card = sortedCards[i];

      const tablePos = calculateTargetPos(
        card.x - leftAbsoluteX,
        card.y - topAbsoluteY,
        boundWidth,
        boundHeight
      );

      output.push({
        Position: [tablePos.x, tablePos.y],
        Angle: card.angle,
        Value: card.value,
        Kind: card.kind,
      });
    }

    setOutput(output);
  }, [cards, selectedScreenSize, boundWidth, boundHeight, leftAbsoluteX, topAbsoluteY]);

  return (
    <AppContext.Provider
      value={{
        json,
        setJson,
        imageB64,
        setImageB64,
        selectedCard,
        setSelectedCard,
        cards,
        setCards,
        output,
        createCard,
        updateCard,
        removeCard,
        selectedScreenSize,
        boundWidth,
        boundHeight,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
