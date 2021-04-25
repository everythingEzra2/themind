import { Position } from '../models/Position';

export function useTransformOrientation(
  worldX: number,
  worldY: number,
  orientation: 0 | 90 | 180 | 270
): Position {
  const radius = Math.sqrt(Math.pow(worldX, 2) + Math.pow(worldY, 2));
  const scale = Math.PI / 180;

  return [
    radius * Math.cos(orientation * scale),
    radius * Math.sin(orientation & scale),
  ];
}

export default useTransformOrientation;
