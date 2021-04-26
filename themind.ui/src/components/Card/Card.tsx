import { useContext, useRef, forwardRef } from 'react';
import { useDrag } from 'react-use-gesture';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import {
  toWorldPosition,
  useScreenOrigin,
  useScreenPosition,
} from '../../hooks';
import { GameContext } from '../../context';
import { ActionType, Position } from '../../models';

const CardElement = styled.div<{ position: Position }>`
  ${tw`bg-gray-100 rounded-lg flex justify-center items-center font-black text-6xl border-yellow-500 border-8 cursor-move transition-transform transform active:scale-125`}

  transition: transform box-shadow 0.1s ease-out;

  :active {
    box-shadow: 0px 20px 18px 8px rgba(0, 0, 0, 0.51);
  }

  width: 8rem;
  height: 10rem;
  touch-action: none;
  user-select: none;

  left: ${({ position: [x] }) => x + 32}px;
  top: ${({ position: [, y] }) => y + 30}px;

  position: absolute;
`;

interface CardProps {
  value: number;
  position: Position;
  isVisible?: boolean;
}

export function PlayableCard({ value, isVisible = true, ...props }: CardProps) {
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

  return (
    <Card value={value} {...props} {...bind()} ref={cardRef} isVisible={true} />
  );
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { value, position: [_worldX, _worldY], isVisible, ...rest }: CardProps,
    ref
  ) => {
    const position = useScreenPosition(_worldX, _worldY);

    return (
      <CardElement position={position} {...rest} ref={ref}>
        {isVisible ? value : null}
      </CardElement>
    );
  }
);

export default Card;
