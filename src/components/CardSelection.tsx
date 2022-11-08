import React, { ChangeEvent } from 'react';
import { css } from '@emotion/css';
import { CARD, CARD_SUIT } from '../contants';
import { useAppContext } from '../contexts/AppContext';
import { Frame } from '../types';

const CardSelection: React.FC = () => {
  const { json, imageB64, cards, selectedCard, setSelectedCard, setCards } = useAppContext();

  if (!json || !imageB64) {
    return null;
  }

  const handleCardSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const data = JSON.parse(event.target.value);
    const frame = json.frames[data.imageKey].frame;
    setSelectedCard({
      frame,
      angle: 0,
      value: data.value,
      kind: data.kind,
      x: 0,
      y: 0,
      zIndex: cards.length,
    });
  };

  const handleCardAdd = () => {
    if (!selectedCard) {
      return;
    }

    setCards((prev) => [...prev, selectedCard]);
  };

  return (
    <div>
      <div>
        <select onChange={handleCardSelect}>
          {CARD.map((card, cardIdx) => {
            return CARD_SUIT.map((cardSuit, suitIdx) => {
              const imageKey = `${card}_${cardSuit}.png`;
              return (
                <option
                  key={imageKey}
                  value={JSON.stringify({
                    imageKey: imageKey,
                    value: cardIdx + 1,
                    kind: suitIdx + 1,
                  })}
                >
                  {imageKey}
                </option>
              );
            });
          })}
        </select>
      </div>

      {selectedCard && (
        <button className={addButton} onClick={handleCardAdd}>
          Add
        </button>
      )}
    </div>
  );
};

const addButton = css({
  marginTop: 5,
});

export default CardSelection;
