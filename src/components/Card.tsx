import React, { useState, MouseEvent, useRef } from 'react';
import { css } from '@emotion/css';
import { useAppContext } from '../contexts/AppContext';
import { Card as ICard, Frame } from '../types';
import { useClickOutListener } from '../hooks/useOutClickHandler';

const Card: React.FC<{ index: number; card: ICard; frame: Frame }> = ({ index, card, frame }) => {
  const { imageB64, setCards } = useAppContext();

  const cardRef = useRef<HTMLDivElement>(null);
  useClickOutListener(cardRef, () => setActive(false));

  const [pos, setPos] = useState<[number, number]>([frame.w / 2, frame.h / 2]);
  const [dragStartPos, setDragStartPos] = useState<[number, number]>([0, 0]);

  const [active, setActive] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [onHold, setOnHold] = useState(false);

  const [rot, setRot] = useState(card.angle);
  const [zIndex, setZIndex] = useState(card.zIndex);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (onHover && onHold) {
      const [x, y] = dragStartPos;
      const diffX = event.clientX - x;
      const diffY = event.clientY - y;

      const [currentX, currentY] = pos;

      const newX = currentX + diffX;
      const newY = currentY + diffY;
      setPos([currentX + diffX, currentY + diffY]);

      setDragStartPos([event.clientX, event.clientY]);

      setCards((prev) =>
        prev.map((card, idx) => {
          if (idx !== index) {
            return card;
          }

          return {
            ...card,
            x: newX,
            y: newY,
          };
        })
      );
    }
  };

  const handleIndexChange = (zIndex: number) => {
    setZIndex(zIndex);
    setCards((prev) =>
      prev.map((card, idx) => {
        if (idx !== index) {
          return card;
        }

        return {
          ...card,
          zIndex: zIndex,
        };
      })
    );
  };

  const handleRotChange = (angle: number) => {
    setRot(angle);
    setCards((prev) =>
      prev.map((card, idx) => {
        if (idx !== index) {
          return card;
        }

        return {
          ...card,
          angle,
        };
      })
    );
  };

  return (
    <>
      <div
        ref={cardRef}
        className={cardWrapper(imageB64, pos, frame.x, frame.y, frame.w, frame.h, rot, zIndex)}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => {
          setOnHover(false);
          setOnHold(false);
        }}
        onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
          setDragStartPos([event.clientX, event.clientY]);
          setOnHold(true);
        }}
        onMouseUp={() => setOnHold(false)}
        onMouseMove={handleMouseMove}
        onClick={() => {
          setActive(true);
        }}
      />
      {active && (
        <>
          <div className={highlighter(pos, frame.w, frame.h, rot)} />
          <div className={cardHud(pos, frame.w, frame.h)}>
            <div className={cardHudRow}>
              <span>rotation</span>
              <input
                type="range"
                min="-360"
                max="360"
                value={rot}
                onChange={(e) => handleRotChange(Number(e.target.value))}
              />
              <input type="text" disabled={true} value={rot} />
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
        </>
      )}
    </>
  );
};

const cardWrapper = (
  b64: string,
  pos: [number, number],
  x: number,
  y: number,
  w: number,
  h: number,
  rot: number,
  zIndex: number
) =>
  css({
    width: w,
    height: h,
    background: `url("${b64}") -${x}px -${y}px`,
    position: 'absolute',
    left: pos[0] - w / 2,
    top: pos[1] - h / 2,
    zIndex: zIndex + 2,
    transform: `rotate(${rot}deg)`,
  });

const highlighter = (pos: [number, number], w: number, h: number, rot: number) =>
  css({
    width: w * 1.1,
    height: h * 1.1,
    marginLeft: -(w * 1.1 - w) / 1.1,
    marginTop: -(h * 1.1 - h) / 1.1,
    border: '1px dashed #222',
    position: 'absolute',
    left: pos[0] - w / 2,
    top: pos[1] - h / 2,
    zIndex: 1,
    transform: `rotate(${rot}deg)`,
  });

const cardHud = (pos: [number, number], w: number, h: number) =>
  css({
    width: 250,
    backgroundColor: '#fff',
    border: '1px solid #f5f5f5',
    cursor: 'pointer',
    zIndex: 99,
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

export default Card;
