import { Position } from './Position';

export enum ActionType {
  Idle = 'Idle',
  HandUp = 'HandUp',
  HandDown = 'HandDown',
  MoveCard = 'MoveCard',
  PlaceCard = 'PlaceCard',
}

export type Action<PayloadType> = {
  action?: ActionType;
  payload?: PayloadType & { position: Position };
};

export default Action;
