import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { Card } from './components';

import { useHandDown } from './hooks';

const cards = {
  1: { id: '1', value: 2, x: 0.3, y: 0.5 },
};

function App() {
  // Builds the SignalR connection, mapping it to /chat
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:5001/gameHub')
    .configureLogging(signalR.LogLevel.Information)
    .build();

  const [isHandDown, setIsHandDown] = useState(false);

  const bind = useHandDown(
    () => {
      console.log('e');
      setIsHandDown(true);
    },
    () => setIsHandDown(false)
  );

  // Starts the SignalR connection
  hubConnection.start().then((a) => {
    console.log('connect');
    // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
    if (hubConnection.connectionId) {
      hubConnection.invoke('sendConnectionId', hubConnection.connectionId);
    }
  });

  const SignalRClient: React.FC = () => {
    // Sets a client message, sent from the server
    const [clientMessage, setClientMessage] = useState<string | null>(null);

    useEffect(() => {
      hubConnection.on('setClientMessage', (message) => {
        setClientMessage(message);
      });
    });

    return <p>{clientMessage}</p>;
  };

  return (
    <>
      <SignalRClient />

      <div className="App bg-gray-800 h-full transform" {...bind()}>
        <div className="text-8xl absolute transform rotate-180 -scale-x-1">
          {isHandDown ? '✋' : ''}
        </div>
        {Object.values(cards).map((card) => (
          <Card
            key={card.id}
            {...card}
            onMove={() => console.log('move')}
            onPlace={() => console.log('place')}
          />
        ))}
      </div>
    </>
  );
}

export default App;
