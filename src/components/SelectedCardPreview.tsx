import React, { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { CARD, CARD_SUIT } from '../contants';
import PreviewCard from './PreviewCard';

const SelectedCardPreview: React.FC = () => {
  const { json, imageB64, selectedCard, setSelectedCard } = useAppContext();

  useEffect(() => {
    if (!json || !imageB64) {
      return;
    }

    if (selectedCard) {
      return;
    }

    const imageKey = `${CARD[0]}_${CARD_SUIT[0]}.png`;
    const frame = json.frames[imageKey].frame;
    setSelectedCard({
      frame,
      angle: 0,
      value: 1,
      kind: 1,
      x: 0,
      y: 0,
      zIndex: 1,
    });
  }, [json, imageB64, selectedCard, setSelectedCard]);

  if (!imageB64 || !selectedCard) {
    return null;
  }

  return <PreviewCard frame={selectedCard.frame} />;
};

export default SelectedCardPreview;
