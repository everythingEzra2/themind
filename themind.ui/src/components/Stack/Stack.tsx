import styled from '@emotion/styled';
import tw from 'twin.macro';

const StackElement = styled.div`
  ${tw`border-dashed border-4 rounded-lg border-gray-50 transition-transform transform hover:scale-105`} /* :hover {
    transform: scale(1.03);
  } */
  width: 8rem;
  height: 10rem;
`;

export function Stack() {
  return <StackElement />;
}

export default Stack;
