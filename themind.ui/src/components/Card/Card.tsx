import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { GameHub } from '../../hub/gamehub';
import { useScreenCoordinates } from '../../hooks';

const CardElement = styled(animated.div)`
  ${tw`bg-gray-100 rounded-lg flex justify-center items-center font-black text-8xl border-red-800 border-8 cursor-move`}

  max-width: 8rem;
  min-height: 10rem;
  touch-action: none;
  user-select: none;

  position: relative;
`;

export interface CardModel {
  id: string;
  value: number;
  x: number;
  y: number;
}

type CardProps = CardModel & {
  onMove?: (id: string, screenX: number, screenY: number) => void;
  onPlace?: (id: string, screenX: number, screenY: number) => void;
};

export function Card({
  onMove,
  onPlace,
  id,
  value,
  x: _worldX,
  y: _worldY,
}: CardProps) {
  const { x: _x, y: _y } = useScreenCoordinates(_worldX, _worldY);

  const gameHub = GameHub.getInstance();
  gameHub.HubConnection.on('setClientMessage', (message: any) => {
    console.log('from card.tsx: ', message);
    gameHub.CardMovement('1', 3, 7);
  });

  const [{ x, y }, set] = useSpring(() => ({ x: _x, y: _y }));
  const bind = useDrag(({ xy: [x, y], down }) => {
    if (!down) {
      onPlace?.(id, x, y);
    } else {
      onMove?.(id, x, y);
      gameHub.CardMovement(id, x, y);
    }

    set({ x, y });
  });

  return (
    <CardElement {...bind()} style={{ x, y }}>
      {value}
    </CardElement>
  );
}

export default Card;
