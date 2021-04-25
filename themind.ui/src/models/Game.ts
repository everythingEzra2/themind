import { CardPlay } from './Card';
import { Player } from './Player';

export interface Game {
  id: string;
  active: boolean;
  level: number;
  players: Record<string, Player>;
  metadata: {
    lives: number;
    ninjaStars: number;
  };
  stack: CardPlay[];
}

export default Game;
