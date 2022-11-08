import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { AtlasData, Card, Frame } from '../types';

export interface IAppContext {
  json: AtlasData | null;
  setJson: Dispatch<SetStateAction<AtlasData | null>>;
  imageB64: string;
  setImageB64: Dispatch<SetStateAction<string>>;
  selectedCard: Card | null;
  setSelectedCard: Dispatch<SetStateAction<Card | null>>;
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
  output: Record<string, unknown[]>;
}

const AppContext = React.createContext<IAppContext | null>(null);

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [json, setJson] = useState<AtlasData | null>(null);
  const [imageB64, setImageB64] = useState('');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [output, setOutput] = useState<Record<string, unknown[]>>({ tableArray: [] });

  const calculateTablePos = (x: number, y: number) => {
    const BOUND_X = 540;
    const BOUND_Y = 600;
    const BOARD_W = 414;
    const BOARD_H = 896;

    return {
      x:
        x < BOARD_W / 2
          ? (-BOUND_X / (BOARD_W / 2)) * (BOARD_W / 2 - x)
          : (BOUND_X / (BOARD_W / 2)) * (x - BOARD_W / 2),
      y:
        y < BOARD_H / 2
          ? (-BOUND_Y / (BOARD_H / 2)) * (BOARD_H / 2 - y)
          : (BOUND_Y / (BOARD_H / 2)) * (y - BOARD_H / 2),
    };
  };

  useEffect(() => {
    const sortedCards = cards.sort((a, b) => a.zIndex - b.zIndex);
    const output: Record<string, unknown[]> = {
      tableArray: [],
    };
    for (let i = 0; i < sortedCards.length; i++) {
      const card = sortedCards[i];
      const tablePos = calculateTablePos(card.x, card.y);

      output.tableArray.push({
        Position: [tablePos.x, tablePos.y],
        Angle: card.angle,
        Value: card.value,
        Kind: card.kind,
      });
    }

    setOutput(output);
  }, [cards]);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
