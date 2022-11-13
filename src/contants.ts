import { ScreenSize } from './types';

export const CARD = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
export const CARD_SUIT = ['diamond', 'club', 'heart', 'spade'];

export const BOUND_X = 540;
export const BOUND_Y = 600;

export const SCREEN_SIZES: ScreenSize[] = [
  {
    label: 'iPhone SE',
    width: 375,
    height: 667,
  },
  {
    label: 'iPhone XR',
    width: 414,
    height: 896,
  },
  {
    label: 'iPhone 12 Pro',
    width: 390,
    height: 844,
  },
];

export const TABLE_BOUND_RATIO = {
  LANDSCAPE_ABS_WIDTH: 10 / 9,
  PORTRAIT_ABS_HEIGHT: 9 / 10,
};

export const BOARD_SCALE = {
  width: 1,
  height: 0.7,
};
