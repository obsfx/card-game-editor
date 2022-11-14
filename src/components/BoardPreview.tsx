import React from 'react';
import { css } from '@emotion/css';
import { useAppContext } from '../contexts/AppContext';
import Card from './Card';
import { BOARD_SCALE } from '../contants';

const BoardPreview: React.FC = () => {
  const { cards, selectedScreenSize } = useAppContext();

  const tableSizeW = selectedScreenSize.width * BOARD_SCALE.width;
  const tableSizeH = selectedScreenSize.height * BOARD_SCALE.height;

  return (
    <div className={boardPreview(selectedScreenSize.width, selectedScreenSize.height)}>
      <div className={table(tableSizeW, tableSizeH)}>
        {cards.map((card) => {
          return <Card key={card.id} card={card} frame={card.frame} />;
        })}

        <span className={sizeLabel}>
          table ({tableSizeW} x {tableSizeH})
        </span>
      </div>
      <span className={sizeLabel}>
        screen ({selectedScreenSize.width} x {selectedScreenSize.height})
      </span>
    </div>
  );
};

const boardPreview = (width: number, height: number) =>
  css({
    width: width,
    height: height,
    backgroundColor: '#efefef',
    border: '1px dashed #ababab',
    position: 'relative',
    boxSizing: 'border-box',
  });

const table = (boundWidth: number, boundHeight: number) =>
  css({
    width: boundWidth,
    height: boundHeight,
    backgroundColor: '#c2ffee',
    border: '1px solid #00c38d',
    boxSizing: 'border-box',
    position: 'relative',
  });

const sizeLabel = css({
  margin: 10,
  bottom: 0,
  position: 'absolute',
  opacity: 0.4,
});

export default BoardPreview;
