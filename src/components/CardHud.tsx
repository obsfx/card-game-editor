import React, { useRef } from 'react';
import { css } from '@emotion/css';
import { FaTrash } from 'react-icons/fa';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { Card } from '../types';
import { useClickOutListener } from '../hooks/useOutClickHandler';
import { minimalInput, minimalButton, redButtonWithIcon } from '../sharedStyles';

const CardHud: React.FC<{
  card: Card;
  position: [number, number];
  rotation: number;
  zIndex: number;
  handleRotationChange: (value: number) => void;
  handleIndexChange: (value: number) => void;
  onClose: () => void;
  onDelete: () => void;
}> = ({
  card,
  position,
  rotation,
  zIndex,
  handleRotationChange,
  handleIndexChange,
  onClose,
  onDelete,
}) => {
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
              className={minimalInput}
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
            <button className={minimalButton} onClick={() => handleIndexChange(zIndex - 1)}>
              <BsArrowDown />
            </button>
            <button className={minimalButton} onClick={() => handleIndexChange(zIndex + 1)}>
              <BsArrowUp />
            </button>
          </div>

          <div className={cardHudValue}>
            <input
              type="text"
              className={minimalInput}
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
              <input type="number" className={minimalInput} readOnly={true} value={card.value} />
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
              <input type="number" className={minimalInput} readOnly={true} value={card.kind} />
            </div>
          </div>
        </div>
      </div>

      <div className={cardHudRow}>
        <button className={redButtonWithIcon} onClick={onDelete}>
          <span>Delete</span>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

const cardHud = (pos: [number, number], w: number, h: number) =>
  css({
    width: 300,
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
});

const cardHudInput = css({
  display: 'flex',
  flex: 1,
  marginRight: 4,
});

const cardHudValue = css({
  display: 'flex',
});

export default CardHud;
