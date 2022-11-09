import React from 'react';
import { css } from '@emotion/css';
import { useAppContext } from '../contexts/AppContext';
import Card from './Card';
import { BOARD_H, BOARD_W } from '../contants';

const BoardPreview: React.FC = () => {
  const { cards } = useAppContext();

  return (
    <div className={boardPreview}>
      {cards.map((card) => {
        return <Card key={card.id} card={card} frame={card.frame} />;
      })}
    </div>
  );
};

const boardPreview = css({
  width: BOARD_W,
  height: BOARD_H,
  backgroundColor: '#43ffcc',
  border: '1px solid #222',
  position: 'relative',
});

export default BoardPreview;
