export interface Frame {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface AtlasImage {
  frame: Frame;
}

export interface AtlasData {
  frames: Record<string, AtlasImage>;
}

export interface Card {
  frame: Frame;
  value: number;
  kind: number;
  angle: number;
  x: number;
  y: number;
  zIndex: number;
}
