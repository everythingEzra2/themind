import { Coordinates } from './useScreenCoordinates';

export function useTransformOrientation(
  worldX: number,
  worldY: number,
  orientation: 0 | 90 | 180 | 270
): Coordinates {
  const radius = Math.sqrt(Math.pow(worldX, 2) + Math.pow(worldY, 2));
  const scale = Math.PI / 180;

  return {
    x: radius * Math.cos(orientation * scale),
    y: radius * Math.sin(orientation & scale),
  };
}

export default useTransformOrientation;
