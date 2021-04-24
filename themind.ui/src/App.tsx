import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { Card, CardModel } from './components';

const cards = {
  1: { id: '1', value: 2, x: 30, y: 50 },
};

function App() {
  const [currentCard, setCurrentCard] = useState<CardModel>();

  useEffect(() => {
    if (!currentCard) {
      return;
    }

    const setPosition = (e: MouseEvent) =>
      setCurrentCard({ ...currentCard, x: e.screenX, y: e.screenY });

    document.addEventListener('mousemove', setPosition);

    return () => document.removeEventListener('mousemove', setPosition);
  }, [currentCard]);

  // Builds the SignalR connection, mapping it to /chat
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:5001/gameHub')
    .configureLogging(signalR.LogLevel.Information)
    .build();

  // Starts the SignalR connection
  hubConnection.start().then((a) => {
    console.log('connect');
    // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
    if (hubConnection.connectionId) {
      hubConnection.invoke('sendConnectionId', hubConnection.connectionId);
    }
  });

  const SignalRTime: React.FC = () => {
    // Sets the time from the server
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
      hubConnection.on('setTime', (message) => {
        setTime(message);
      });
    });

    return <p>The time is {time}</p>;
  };

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
      <SignalRTime />
      <SignalRClient />

      <div className="App bg-gray-800 h-full">
        {Object.values(cards).map((card) => (
          <Card
            {...card}
            x={card.id === currentCard?.id ? currentCard.x : card.x}
            y={card.id === currentCard?.id ? currentCard.y : card.y}
            onStartMove={(id, x, y) => setCurrentCard({ ...card, x, y })}
          />
        ))}
      </div>
    </>
  );
}

export default App;
