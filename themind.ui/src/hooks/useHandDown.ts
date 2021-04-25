import { useGesture } from 'react-use-gesture';

export function useHandDown(
  onHandDownStart: () => void,
  onHandDownEnd: () => void
) {
  return useGesture({
    onTouchStart: onHandDownStart,
    onTouchEnd: onHandDownEnd,
    onMouseDown: onHandDownStart,
    onMouseUp: onHandDownEnd,
  });
}

export default useHandDown;
