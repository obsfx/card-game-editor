import React, { ChangeEvent, useState } from 'react';
import { css } from '@emotion/css';
import { CARD, CARD_SUIT } from '../contants';
import { useAppContext } from '../contexts/AppContext';

const CardSelection: React.FC = () => {
  const { json, imageB64, createCard, selectedCard, setSelectedCard } = useAppContext();
  const [data, setData] = useState({ value: 1, kind: 0 });

  if (!json || !imageB64) {
    return null;
  }

  const handleCardSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const data = JSON.parse(event.target.value);
    setData(data);

    const { imageKey, ...rest } = data;
    const frame = json.frames[data.imageKey].frame;
    setSelectedCard({
      ...rest,
      frame,
    });
  };

  const handleCardAdd = () => {
    if (!selectedCard) {
      return;
    }
    createCard(data.value, data.kind);
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
                    imageKey,
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
