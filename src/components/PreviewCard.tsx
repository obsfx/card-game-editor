import React from 'react';
import { css } from '@emotion/css';
import { useAppContext } from '../contexts/AppContext';
import { Frame } from '../types';

const PreviewCard: React.FC<{ frame: Frame }> = ({ frame }) => {
  const { imageB64 } = useAppContext();
  return <div className={preview(imageB64, frame.x, frame.y, frame.w, frame.h)} />;
};

const preview = (b64: string, x: number, y: number, w: number, h: number) =>
  css({
    width: w,
    height: h,
    background: `url("${b64}") -${x}px -${y}px`,
  });

export default PreviewCard;
