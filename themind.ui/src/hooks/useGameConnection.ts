import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useClientMethod, useHub, useHubMethod } from 'react-use-signalr';
import { ActionType, Game } from '../models';

export const connection = new HubConnectionBuilder()
  .withUrl('https://localhost:9001/gameHub')
  .withAutomaticReconnect()
  .configureLogging(LogLevel.Information)
  .build();

export const useGameConnection = () => useHub(connection);

export const useGameAction = (action: ActionType) =>
  useHubMethod(connection, action);

export const useGameStateChange = (onChange: (game: Game) => void) =>
  useClientMethod(connection, '', (user, game) => {
    console.log({ user, game });
    onChange(game);
  });
