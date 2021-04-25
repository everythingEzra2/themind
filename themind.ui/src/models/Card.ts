import { Position } from './Position';

export interface Card {
  value: number;
  position: Position;
}

export type CardPlay = Card & {
  playedById: string;
};

export default Card;
