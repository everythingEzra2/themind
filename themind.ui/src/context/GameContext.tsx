import { HubConnectionState } from '@microsoft/signalr';
import { Context, createContext, ReactNode, useReducer } from 'react';
import { Loader } from '../components';
import { useGameConnection, useGameStateChange } from '../hooks';
import { Action, ActionType, Player, Game as State } from '../models';

export const ActionReducer = (playerId: string) => (
  state: State,
  { action, payload }: Action<any>
): State => {
  switch (action) {
    case ActionType.Idle: {
      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: {
            ...state.players[playerId],
            action,
            ...payload,
          },
        },
      };
    }
    case ActionType.HandUp: {
      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: {
            ...state.players[playerId],
            action,
            ...payload,
          },
        },
      };
    }
    case ActionType.HandDown: {
      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: {
            ...state.players[playerId],
            action,
            ...payload,
          },
        },
      };
    }
    case ActionType.MoveCard: {
      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: {
            ...state.players[playerId],
            action,
            ...payload,
            cards: {
              ...state.players[playerId].cards,
              [payload.value]: payload.position,
            },
          },
        },
      };
    }
    case ActionType.PlaceCard: {
      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: {
            ...state.players[playerId],
            action,
            ...payload,
            cards: {
              ...state.players[playerId].cards,
              [payload.value]: payload.position,
            },
          },
        },
      };
    }
    default: {
      return {
        ...state,
        ...payload,
      };
    }
  }
};

const gameState: State = {
  id: '1',
  active: false,
  level: 1,
  players: {
    '1': {
      id: '1',
      name: 'Jesse',
      action: ActionType.Idle,
      cards: {
        1: [-0.5, -0.5],
        15: [-0.25, -0.5],
        32: [0, -0.5],
        87: [0.25, -0.5],
      },
      position: [1, 1],
    },
    '2': {
      id: '2',
      name: 'Audrey',
      action: ActionType.Idle,
      cards: { 13: [0.9, -0.5], 19: [0.9, -0.2] },
      position: [1, 1],
    },
  },
  metadata: {
    lives: 4,
    ninjaStars: 4,
  },
  stack: [],
};

export const GameContext = (createContext({
  game: gameState,
}) as unknown) as Context<{
  game: State;
  player: Player;
  invoke: React.Dispatch<Action<any>>;
}>;

export const Game = ({
  playerId,
  children,
}: {
  playerId: string;
  children: ReactNode;
}) => {
  const { hubConnectionState, error } = useGameConnection();

  const [game, dispatch] = useReducer(ActionReducer(playerId), gameState);
  useGameStateChange((change) => dispatch({ payload: change }));

  if (hubConnectionState !== HubConnectionState.Connected) {
    return (
      <div className="flex justify-center items-center h-full w-full bg-green-200">
        <Loader>💫</Loader>
      </div>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  const { [playerId]: player, ...players } = game.players;

  return (
    <GameContext.Provider
      value={{
        game: { ...game, players },
        player,
        invoke: dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
