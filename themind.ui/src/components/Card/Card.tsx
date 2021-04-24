import styled from '@emotion/styled';
import tw from 'twin.macro';

const CardElement = styled.div<{ x: number; y: number }>`
  ${tw`bg-gray-100 rounded-lg flex justify-center items-center font-black text-5xl border-red-800 border-8`}

  max-width: 8rem;
  min-height: 10rem;

  left: ${(p) => p.x}px;
  top: ${(p) => p.y}px;

  position: relative;
`;

interface CardProps {
  id: string;
  value: number;
  x: number;
  y: number;
  onMove?: (id: string) => void;
}

export function Card({ value, x, y }: CardProps) {
  return (
    <CardElement x={x} y={y}>
      {value}
    </CardElement>
  );
}

export default Card;
