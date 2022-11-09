import React, { useState, MouseEvent } from 'react';
import { css } from '@emotion/css';
import { useAppContext } from '../contexts/AppContext';
import { Card as ICard, Frame } from '../types';
import CardHud from './CardHud';
import { BOARD_H, BOARD_W } from '../contants';

const Card: React.FC<{ card: ICard; frame: Frame }> = ({ card, frame }) => {
  const { imageB64, updateCard, removeCard } = useAppContext();

  const [dragStartPos, setDragStartPos] = useState<[number, number]>([0, 0]);
  const [position, setPosition] = useState<[number, number]>([frame.w / 2, frame.h / 2]);

  const [showHud, setShowHud] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [onHold, setOnHold] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!onHover || !onHold) {
      return;
    }

    setDragStartPos([event.clientX, event.clientY]);

    const [x, y] = dragStartPos;
    const [currentX, currentY] = position;

    const diffX = event.clientX - x;
    const diffY = event.clientY - y;
    const newX = currentX + diffX;
    const newY = currentY + diffY;

    if (newX > BOARD_W || newX < 0) {
      return;
    }

    if (newY > BOARD_H || newY < 0) {
      return;
    }

    setPosition([newX, newY]);

    updateCard(card.id, {
      x: newX,
      y: newY,
    });
  };

  const handleIndexChange = (zIndex: number) => {
    if (isNaN(zIndex) || zIndex < 0) {
      return;
    }

    updateCard(card.id, {
      zIndex,
    });
  };

  const handleRotationChange = (angle: number) => {
    if (isNaN(angle)) {
      return;
    }

    updateCard(card.id, {
      ...card,
      angle,
    });
  };

  return (
    <>
      <div
        data-clickout-id={`hud-parent-${card.id}`}
        className={cardWrapper(
          imageB64,
          position,
          frame.x,
          frame.y,
          frame.w,
          frame.h,
          card.angle,
          card.zIndex,
          onHold || onHover
        )}
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
        onClick={() => setShowHud(true)}
      />

      {showHud && (
        <CardHud
          card={card}
          position={position}
          rotation={card.angle}
          zIndex={card.zIndex}
          handleRotationChange={handleRotationChange}
          handleIndexChange={handleIndexChange}
          onClose={() => setShowHud(false)}
          onDelete={() => removeCard(card.id)}
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
  zIndex: number,
  active: boolean
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
    border: `1px solid ${active ? '#222' : 'transparent'}`,
  });

export default Card;
