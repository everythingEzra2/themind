import * as signalR from '@microsoft/signalr';

export class GameHub {
  // ------------- GAMEHUB SETUP -------------
  private constructor() {
    this.Connect();
    this.RegisterMethods();
  }
  private static instance: GameHub;
  public static getInstance(): GameHub {
    if (!GameHub.instance) {
      GameHub.instance = new GameHub();
    }

    return GameHub.instance;
  }
  // -----------------------------------------

  public HubConnection: any;

  public Connect() {
    this.HubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/gameHub')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.HubConnection.start().then((a: any) => {
      console.log('connect');
      if (this.HubConnection.connectionId) {
        this.HubConnection.invoke(
          'sendConnectionId',
          this.HubConnection.connectionId
        );
      }
    });
  }

  public CardMovement(cardId: string, x: number, y: number) {
    if (!this.HubConnection.connectionId) {
      return;
    }

    console.log('trying to connect on: ', this.HubConnection.connectionId);

    console.log('about to move card');
    this.HubConnection.invoke('CardMovement', cardId, x, y);
  }

  public RegisterMethods() {
    this.HubConnection.on('pinged', (cardId: string, x: number, y: number) => {
      console.log('pinged: ', cardId, x, y);
    });
  }
}
