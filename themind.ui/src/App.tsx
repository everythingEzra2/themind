import Playground from './components/Playground/Playground';
import { Game } from './context';

function App() {
  return (
    <Game playerId="1">
      <Playground />
    </Game>
  );
}

export default App;
