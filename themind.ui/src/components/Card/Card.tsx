import { useContext, useRef, forwardRef } from 'react';
import { useDrag } from 'react-use-gesture';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import {
  toWorldPosition,
  useResizeObserver,
  useScreenOrigin,
  useScreenPosition,
} from '../../hooks';
import { GameContext } from '../../context';
import { ActionType, Position } from '../../models';

const CardElement = styled.div<{ position: Position }>`
  ${tw`bg-gray-100 rounded-lg flex justify-center items-center font-black text-8xl border-blue-700 border-8 cursor-move transition-transform transform active:scale-125`}

  transition: transform 0.1s ease-out;

  width: 8rem;
  height: 10rem;
  touch-action: none;
  user-select: none;

  left: ${({ position: [x] }) => x}px;
  top: ${({ position: [, y] }) => y}px;

  position: absolute;
`;

interface CardProps {
  value: number;
  position: Position;
}

export function PlayableCard({ value, ...props }: CardProps) {
  const { invoke } = useContext(GameContext);
  const playOrigin = useScreenOrigin();
  const cardRef = useRef<HTMLDivElement>(null);

  const bind = useDrag(({ xy: [x, y], down }) => {
    const { width, height } = cardRef.current!.getBoundingClientRect();
    invoke({
      action: down ? ActionType.MoveCard : ActionType.PlaceCard,
      payload: {
        value,
        position: toWorldPosition([x - width / 2, y - height / 2], playOrigin),
      },
    });
  });

  return <Card value={value} {...props} {...bind()} ref={cardRef} />;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ value, position: [_worldX, _worldY], ...rest }: CardProps, ref) => {
    const position = useScreenPosition(_worldX, _worldY);

    return (
      <CardElement position={position} {...rest} ref={ref}>
        {value}
      </CardElement>
    );
  }
);

export default Card;
