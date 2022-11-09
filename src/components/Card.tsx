import React, { useState, MouseEvent, useRef } from 'react';
import { css } from '@emotion/css';
import { useAppContext } from '../contexts/AppContext';
import { Card as ICard, Frame } from '../types';
import CardHud from './CardHud';

const Card: React.FC<{ index: number; card: ICard; frame: Frame }> = ({ index, card, frame }) => {
  const { imageB64, updateCard } = useAppContext();

  const [dragStartPos, setDragStartPos] = useState<[number, number]>([0, 0]);

  const [position, setPosition] = useState<[number, number]>([frame.w / 2, frame.h / 2]);
  const [rotation, setRotation] = useState(card.angle);
  const [zIndex, setZIndex] = useState(card.zIndex);

  const [showHud, setShowHud] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [onHold, setOnHold] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!onHover || !onHold) {
      return;
    }

    const [x, y] = dragStartPos;
    const [currentX, currentY] = position;

    const diffX = event.clientX - x;
    const diffY = event.clientY - y;
    const newX = currentX + diffX;
    const newY = currentY + diffY;

    setPosition([currentX + diffX, currentY + diffY]);
    setDragStartPos([event.clientX, event.clientY]);

    updateCard(index, {
      x: newX,
      y: newY,
    });
  };

  const handleIndexChange = (zIndex: number) => {
    setZIndex(zIndex);
    updateCard(index, {
      zIndex: zIndex,
    });
  };

  const handleRotationChange = (angle: number) => {
    setRotation(angle);
    updateCard(index, {
      ...card,
      angle,
    });
  };

  return (
    <>
      <div
        data-clickout-id={`hud-parent-${index}`}
        className={cardWrapper(
          imageB64,
          position,
          frame.x,
          frame.y,
          frame.w,
          frame.h,
          rotation,
          zIndex
        )}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => {
          setOnHover(false);
          //setOnHold(false);
        }}
        onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
          setDragStartPos([event.clientX, event.clientY]);
          setOnHold(true);
        }}
        onMouseUp={() => setOnHold(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setShowHud(true)}
      />

      {showHud && (
        <CardHud
          card={card}
          position={position}
          rotation={rotation}
          zIndex={zIndex}
          handleRotationChange={handleRotationChange}
          handleIndexChange={handleIndexChange}
          onClose={() => setShowHud(false)}
        />
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
    zIndex: 998,
    transform: `rotate(${rot}deg)`,
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
