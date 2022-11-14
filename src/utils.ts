import { BOUND_X, BOUND_Y, TABLE_BOUND_RATIO } from './contants';

export const getJSON = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => resolve(JSON.parse((event.target?.result || '').toString()));
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
};

export const getImage = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => resolve(event.target?.result);
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsDataURL(file);
  });
};

export const calculateCardTableBounds = (
  BOARD_W: number,
  BOARD_H: number,
  BOARD_SCALE: {
    width: number;
    height: number;
  }
) => {
  const ABSOLUTE_WIDTH = BOARD_W * BOARD_SCALE.width;
  const ABSOLUTE_HEIGHT = BOARD_H * BOARD_SCALE.height;

  let width = ABSOLUTE_WIDTH;
  let height = ABSOLUTE_WIDTH * TABLE_BOUND_RATIO.LANDSCAPE_ABS_WIDTH;
  let leftAbsoluteX = 0;
  let topAbsoluteY = (ABSOLUTE_HEIGHT - height) / 2;

  if (height > ABSOLUTE_HEIGHT) {
    height = ABSOLUTE_HEIGHT;
    width = ABSOLUTE_HEIGHT * TABLE_BOUND_RATIO.PORTRAIT_ABS_HEIGHT;
    leftAbsoluteX = (ABSOLUTE_WIDTH - width) / 2;
    topAbsoluteY = 0;
  }

  return { width, height, leftAbsoluteX, topAbsoluteY };
};

export const calculateTargetPos = (x: number, y: number, BOARD_W: number, BOARD_H: number) => {
  return {
    x:
      x < BOARD_W / 2
        ? -(BOUND_X / (BOARD_W / 2)) * (BOARD_W / 2 - x)
        : (BOUND_X / (BOARD_W / 2)) * (x - BOARD_W / 2),
    y:
      y < BOARD_H / 2
        ? (BOUND_Y / (BOARD_H / 2)) * (BOARD_H / 2 - y)
        : -(BOUND_Y / (BOARD_H / 2)) * (y - BOARD_H / 2),
  };
};

export const getCardScaleMultilier = (boundW: number, boundH: number, cardScale: number) => {
  const shortEdge = Math.min(boundW, boundH);
  return shortEdge * cardScale;
};
