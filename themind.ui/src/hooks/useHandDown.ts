import { useContext } from 'react';
import { useGesture } from 'react-use-gesture';
import { GameContext } from '../context';
import { ActionType } from '../models';

export function useHandDown(
  onHandDownStart: () => void,
  onHandDownEnd: () => void
) {
  const { player, invoke } = useContext(GameContext);

  const onStart = () => {
    if (player.action !== ActionType.Idle) {
      return;
    }

    invoke({ action: ActionType.HandDown });
    onHandDownStart();
  };

  const onEnd = () => {
    invoke({ action: ActionType.Idle });
    onHandDownEnd();
  };

  return useGesture({
    onTouchStart: onStart,
    onTouchEnd: onEnd,
    onMouseDown: onStart,
    onMouseUp: onEnd,
  });
}

export default useHandDown;
