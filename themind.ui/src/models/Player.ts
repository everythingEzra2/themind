import { ActionType, Position } from '../models';

export interface Player {
  id: string;
  name: string;
  action: ActionType;
  position: Position;
  cards: Record<number, Position>;
}

export default Player;
