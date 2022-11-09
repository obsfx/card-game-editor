import React, { useRef } from 'react';
import { css } from '@emotion/css';
import { Card } from '../types';
import { useClickOutListener } from '../hooks/useOutClickHandler';

const CardHud: React.FC<{
  card: Card;
  position: [number, number];
  rotation: number;
  zIndex: number;
  handleRotationChange: (value: number) => void;
  handleIndexChange: (value: number) => void;
  onClose: () => void;
}> = ({ card, position, rotation, zIndex, handleRotationChange, handleIndexChange, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useClickOutListener(cardRef, (target: HTMLElement) => {
    if (target.dataset.clickoutId) {
      return;
    }
    onClose();
  });

  return (
    <div ref={cardRef} className={cardHud(position, card.frame.w, card.frame.h)}>
      <div className={cardHudRow}>
        <span>rotation</span>
        <input
          type="range"
          min="-360"
          max="360"
          value={rotation}
          onChange={(e) => handleRotationChange(Number(e.target.value))}
        />
        <input type="text" disabled={true} value={rotation} />
      </div>
      <div className={cardHudRow}>
        <span>index</span>
        <button onClick={() => handleIndexChange(zIndex - 1)}>{'<'}</button>
        <button onClick={() => handleIndexChange(zIndex + 1)}>{'>'}</button>
        <input type="text" disabled={true} value={zIndex} />
      </div>

      <div className={cardHudRow}>
        <span>value</span>
        <input type="text" disabled={true} value={card.value} />
      </div>

      <div className={cardHudRow}>
        <span>kind</span>
        <input type="text" disabled={true} value={card.kind} />
      </div>
    </div>
  );
};

const cardHud = (pos: [number, number], w: number, h: number) =>
  css({
    width: 250,
    backgroundColor: '#fff',
    border: '1px solid #f5f5f5',
    cursor: 'pointer',
    zIndex: 999,
    marginTop: 4,
    padding: 5,
    marginLeft: 80,
    borderRadius: 4,
    position: 'absolute',
    left: pos[0] - w / 2,
    top: pos[1] - h / 2,
  });

const cardHudRow = css({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 2,
  '& span': {
    marginRight: 6,
    width: '25%',
  },

  '& button': {
    marginRight: 2,
    width: '25%',
  },

  '& input': {
    marginLeft: 6,
    width: '50%',
  },

  '& input[type="text"]': {
    flexShrink: 0,
    marginLeft: 6,
    width: '25%',
  },
});

export default CardHud;
