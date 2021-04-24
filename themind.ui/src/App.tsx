import React from 'react';
import './App.css';
import { Card } from './components';
import {} from './hooks';

function App() {
  return (
    <div className="App bg-gray-800 h-full">
      <Card id="GUID" value={5} x={10} y={30} />
    </div>
  );
}

export default App;
