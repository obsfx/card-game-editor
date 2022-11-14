import React, { ChangeEvent, useState } from 'react';
import { css } from '@emotion/css';
import { useAppContext } from '../contexts/AppContext';
import { minimalInput, minimalButton } from '../sharedStyles';

const CardScale: React.FC = () => {
  const { setCards, cardScale, setCardScale } = useAppContext();
  const [newScaleValue, setNewScaleValue] = useState(cardScale);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewScaleValue(Number(event.target.value));
    return;
  };

  const handleApply = () => {
    if (!window.confirm('This will reset the table state. Are sure to apply new scale ?')) {
      return;
    }
    setCards([]);
    setCardScale(newScaleValue);
  };

  return (
    <div className={wrapper}>
      <span>Card Scale: </span>
      <div className={scaleWrapper}>
        <span>scale: </span>
        <input
          type="number"
          name="height"
          className={minimalInput}
          value={newScaleValue}
          onChange={handleChange}
          step="0.01"
        />
        <span>
          <button className={`${minimalButton} ${applyButton}`} onClick={handleApply}>
            Apply
          </button>
        </span>
      </div>
    </div>
  );
};

const wrapper = css({
  display: 'flex',
  alignItems: 'center',
  margin: '4px 0',
});

const scaleWrapper = css({
  marginLeft: 4,
  padding: '4px 6px',
  backgroundColor: '#f5f4f4',
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',

  '& span': {
    margin: '0 4px',
    fontFamily: 'monospace',
  },

  "& input[type='number']:disabled": {
    backgroundColor: '#ddd',
  },
});

const applyButton = css({
  flexShrink: 0,
  marginLeft: 4,
  padding: '2px 10px',
});

export default CardScale;
