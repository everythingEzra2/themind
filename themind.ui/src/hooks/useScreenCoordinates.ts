import { useScreenSize } from './useScreenSize';

export interface Coordinates {
  x: number;
  y: number;
}

function useScreenOrigin(): Coordinates {
  const bounds = useScreenSize();

  return { x: bounds.width / 2, y: bounds.height / 2 };
}

export function useScreenCoordinates(
  worldX: number,
  worldY: number
): Coordinates {
  const origin = useScreenOrigin();

  return {
    x: origin.x + worldX * origin.x,
    y: origin.y - worldY * origin.y,
  };
}

export function useWorldCoordinates(
  screenX: number,
  screenY: number
): Coordinates {
  const origin = useScreenOrigin();

  return {
    x: (screenX - origin.x) / origin.x,
    y: -1 & ((screenY - origin.y) / origin.y),
  };
}

export default useScreenCoordinates;
