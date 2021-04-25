import styled from '@emotion/styled';
import tw from 'twin.macro';
import {GameHub} from '../../hub/gamehub';

const CardElement = styled.div<{ x: number; y: number }>`
  ${tw`bg-gray-100 rounded-lg flex justify-center items-center font-black text-8xl border-red-800 border-8 cursor-move`}

  max-width: 8rem;
  min-height: 10rem;

  left: ${(p) => p.x}px;
  top: ${(p) => p.y}px;

  position: relative;
`;

export interface CardModel {
  id: string;
  value: number;
  x: number;
  y: number;
}

type CardProps = CardModel & {
  onStartMove?: (id: string, screenX: number, screenY: number) => void;
  onPlace?: (id: string, screenX: number, screenY: number) => void;
};

export function Card({ onStartMove, onPlace, ...card }: CardProps) {

	var gameHub = GameHub.getInstance();
gameHub.HubConnection.on("setClientMessage", (message:any) => {
  console.log("from card.tsx: ", message);
  gameHub.CardMovement("1", 3, 7);
});

  return (
    <CardElement
      {...card}
      onMouseDown={(e) => onStartMove?.(card.id, e.pageX, e.pageY)}
      onMouseUp={(e) => onPlace?.(card.id, e.screenX, e.screenY)}
    >
      {card.value}
    </CardElement>
  );
}

export default Card;
