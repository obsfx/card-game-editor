import React, { useRef } from 'react';
import { css } from '@emotion/css';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
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
  useClickOutListener(cardRef, onClose, [`hud-parent-${card.id}`]);

  return (
    <div ref={cardRef} className={cardHud(position, card.frame.w, card.frame.h)}>
      <div className={cardHudRow}>
        <div className={cardHudLabel}>
          <span>Rotation</span>
        </div>
        <div className={cardHudInputWrapper}>
          <div className={cardHudInput}>
            <input
              type="range"
              min="-360"
              max="360"
              value={rotation}
              onChange={(e) => handleRotationChange(Number(e.target.value))}
            />
          </div>

          <div className={cardHudValue}>
            <input
              type="text"
              value={rotation}
              onChange={(e) => handleRotationChange(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className={cardHudRow}>
        <div className={cardHudLabel}>
          <span>Depth</span>
        </div>

        <div className={cardHudInputWrapper}>
          <div className={cardHudInput}>
            <button onClick={() => handleIndexChange(zIndex - 1)}>
              <BsArrowDown />
            </button>
            <button onClick={() => handleIndexChange(zIndex + 1)}>
              <BsArrowUp />
            </button>
          </div>

          <div className={cardHudValue}>
            <input
              type="text"
              value={zIndex}
              onChange={(e) => handleIndexChange(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className={cardHudRow}>
        <div className={cardHudLabel}>
          <span>Value</span>
        </div>
        <div className={cardHudInputWrapper}>
          <div className={cardHudInput}>
            <div className={cardHudValue}>
              <input type="number" readOnly={true} value={card.value} />
            </div>
          </div>
        </div>
      </div>

      <div className={cardHudRow}>
        <div className={cardHudLabel}>
          <span>Kind</span>
        </div>

        <div className={cardHudInputWrapper}>
          <div className={cardHudInput}>
            <div className={cardHudValue}>
              <input type="number" readOnly={true} value={card.kind} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const cardHud = (pos: [number, number], w: number, h: number) =>
  css({
    minWidth: 250,
    backgroundColor: '#fff',
    zIndex: 9999,
    padding: 8,
    marginLeft: w * 1.1,
    borderRadius: 8,
    position: 'absolute',
    left: pos[0] - w / 2,
    top: pos[1] - h / 2,
    boxShadow: '2px 2px 14px 0px rgba(0,0,0,0.25);',
  });

const cardHudRow = css({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 4,
});

const cardHudLabel = css({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  marginRight: 4,
  width: '24%',
  '& span': {
    marginRight: 4,
    fontSize: 12,
    fontFamily: 'monospace',
  },
});

const cardHudInputWrapper = css({
  display: 'flex',
  padding: '2px 4px',
  backgroundColor: '#f1f1f1',
  borderRadius: 4,
  flex: 1,
  justifyContent: 'space-between',
  height: 18,
  '& button': {
    border: 'none',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 0',
    marginRight: 2,
    flex: 1,
    background: '#c6c6c6',
    cursor: 'pointer',
  },
});

const cardHudInput = css({
  display: 'flex',
  flex: 1,
  marginRight: 4,
});

const cardHudValue = css({
  display: 'flex',

  '& input[type="number"], input[type="text"]': {
    flexShrink: 0,
    width: 30,
    backgroundColor: '#ffffff',
    fontSize: 12,
    border: 'none',
    padding: '1px 8px',
    borderRadius: 4,
    fontFamily: 'monospace',
  },
});

export default CardHud;
