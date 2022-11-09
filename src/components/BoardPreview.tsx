import React from 'react';
import { css } from '@emotion/css';
import { useAppContext } from '../contexts/AppContext';
import Card from './Card';

const BoardPreview: React.FC = () => {
  const { cards } = useAppContext();

  return (
    <div className={boardPreview}>
      {cards.map((card, idx) => {
        console.log(card);
        return <Card key={card.id} card={card} frame={card.frame} />;
      })}
    </div>
  );
};

const boardPreview = css({
  width: 414,
  height: 896,
  backgroundColor: '#43ffcc',
  border: '1px solid #222',
  position: 'relative',
});

export default BoardPreview;
