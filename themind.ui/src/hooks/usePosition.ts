import { useScreenSize } from './useScreenSize';

export type Position = [number, number];

export const useScreenOrigin = (): Position => {
  const { width, height } = useScreenSize();
  return [width / 2, height / 2];
};

export const toScreenPosition = (
  [worldX, worldY]: Position,
  [originX, originY]: Position
): Position => {
  return [originX + worldX * originX, originY - worldY * originY];
};

export const useScreenPosition = (worldX: number, worldY: number): Position => {
  return toScreenPosition([worldX, worldY], useScreenOrigin());
};

export const toWorldPosition = (
  [screenX, screenY]: Position,
  [originX, originY]: Position
): Position => {
  return [(screenX - originX) / originX, -1 * ((screenY - originY) / originY)];
};

export const useWorldPosition = (
  screenX: number,
  screenY: number
): Position => {
  return toWorldPosition([screenX, screenY], useScreenOrigin());
};

export default useScreenPosition;
