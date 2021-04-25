import { useContext, useState } from 'react';
import { Card, PlayableCard } from '../../components';
import { GameContext } from '../../context';
import { useHandDown } from '../../hooks';
import { Button } from '../Button';
import { Stack } from '../Stack';

function Playground() {
  const { game, player } = useContext(GameContext);

  const [isHandDown, setIsHandDown] = useState(false);
  const bindHandDown = useHandDown(
    () => setIsHandDown(true),
    () => setIsHandDown(false)
  );

  return (
    <div
      className="bg-gray-800 h-full transform overflow-hidden relative flex"
      {...bindHandDown()}
    >
      <Button className="absolute m-3 fade-in">Use ✨</Button>
      <div className="text-8xl absolute transform rotate-180 -scale-x-1 bottom-0 m-10">
        {isHandDown ? '✋' : ''}
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <Stack />
        {Object.entries(player.cards).map(([value, position]) => (
          <PlayableCard
            key={`${player.id}-${value}`}
            value={Number(value)}
            position={position}
          />
        ))}
        {Object.values(game.stack).map((card) => (
          <Card key={`${card.playedById}-${card.value}`} {...card} />
        ))}
      </div>
    </div>
  );
}

export default Playground;
