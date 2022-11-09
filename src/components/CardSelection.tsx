import React, { ChangeEvent, useState } from 'react';
import { css } from '@emotion/css';
import { CARD, CARD_SUIT } from '../contants';
import { useAppContext } from '../contexts/AppContext';

const CardSelection: React.FC = () => {
  const { json, imageB64, cards, selectedCard, setSelectedCard, setCards } = useAppContext();
  const [val, setVal] = useState('{}');

  if (!json || !imageB64) {
    return null;
  }

  const handleCardSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setVal(event.target.value);
    const data = JSON.parse(event.target.value);
    const frame = json.frames[data.imageKey].frame;
    console.log(data, {
      frame,
      angle: 0,
      value: data.value,
      kind: data.kind,
      x: 0,
      y: 0,
      zIndex: cards.length,
    });
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

  const handleCardAdd = (e: any) => {
    if (!selectedCard) {
      return;
    }

    setCards((prev) => [...prev, selectedCard]);
  };

  return (
    <div>
      <div>
        <select onChange={handleCardSelect} value={val}>
          {CARD.map((card, cardIdx) => {
            return CARD_SUIT.map((cardSuit, suitIdx) => {
              const imageKey = `${card}_${cardSuit}.png`;
              return (
                <option
                  key={imageKey}
                  value={JSON.stringify({
                    imageKey: imageKey,
                    value: cardIdx + 1,
                    kind: suitIdx,
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
