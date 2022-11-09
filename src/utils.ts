import { BOUND_X, BOUND_Y, BOARD_W, BOARD_H } from './contants';

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

export const calculateTargetPos = (x: number, y: number) => {
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
