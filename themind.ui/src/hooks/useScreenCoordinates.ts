import { ScreenSize, useScreenSize } from './useScreenSize';

export interface Coordinates {
  x: number;
  y: number;
}

function useScreenOrigin(): Coordinates & { bounds: ScreenSize } {
  const bounds = useScreenSize();

  return { x: bounds.width / 2, y: bounds.height / 2, bounds };
}

export function useScreenCoordinates(
  worldX: number,
  worldY: number
): Coordinates {
  const origin = useScreenOrigin();

  return {
    x: origin.x + worldX * origin.bounds.width,
    y: origin.y + worldY * origin.bounds.height,
  };
}

export function useWorldCoordinates(
  screenX: number,
  screenY: number
): Coordinates {
  const origin = useScreenOrigin();

  return {
    x: (screenX - origin.x) / origin.bounds.width,
    y: (screenY - origin.y) / origin.bounds.height,
  };
}

export default useScreenCoordinates;
