import { useContext, useState } from 'react';
import { Card, PlayableCard } from '../../components';
import { GameContext } from '../../context';
import { useHandDown } from '../../hooks';

function Playground() {
  const [isHandDown, setIsHandDown] = useState(false);

  const { game, player } = useContext(GameContext);

  const bindHandDown = useHandDown(
    () => setIsHandDown(true),
    () => setIsHandDown(false)
  );

  if (!game || !player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App bg-gray-800 h-full transform" {...bindHandDown()}>
      <div className="text-8xl absolute transform rotate-180 -scale-x-1">
        {isHandDown ? '✋' : ''}
      </div>
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
  );
}

export default Playground;
