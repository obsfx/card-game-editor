import { BOUND_X, BOUND_Y, TABLE_BOUND_RATIO, BOARD_SCALE } from './contants';

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

export const calculateCardTableBounds = (BOARD_W: number, BOARD_H: number) => {
  const ABSOLUTE_WIDTH = BOARD_W * BOARD_SCALE.width;
  const ABSOLUTE_HEIGHT = BOARD_H * BOARD_SCALE.height;

  let width = ABSOLUTE_WIDTH;
  let height = ABSOLUTE_WIDTH * TABLE_BOUND_RATIO.LANDSCAPE_ABS_WIDTH;

  if (height > ABSOLUTE_HEIGHT) {
    height = ABSOLUTE_HEIGHT;
    width = ABSOLUTE_HEIGHT * TABLE_BOUND_RATIO.PORTRAIT_ABS_HEIGHT;
  }

  return { width, height };
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