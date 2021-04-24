using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace themind.api.Hubs
{
	public class GameHub : Hub
	{
		public async Task SendConnectionId(string connectionId)
		{
			await Clients.All.SendAsync("setClientMessage", "A connection with ID '" + connectionId + "' has just connected");
		}

		public async Task CreateGame(string user, string message)
		{
			throw new Exception();
			await Clients.All.SendAsync("XXXXX", user, message);
		}
		
		public async Task JoinGame(string user, string message)
		{
			throw new Exception();
			await Clients.All.SendAsync("XXXXX", user, message);
		}
		
		public async Task HandDown(string user, string message)
		{
			throw new Exception();
			await Clients.All.SendAsync("XXXXX", user, message);
		}
		
		public async Task HandDownEnd(string user, string message)
		{
			throw new Exception();
			await Clients.All.SendAsync("XXXXX", user, message);
		}
		
		public async Task HandUp(string user, string message)
		{
			throw new Exception();
			await Clients.All.SendAsync("XXXXX", user, message);
		}
		
		public async Task HandUpEnd(string user, string message)
		{
			throw new Exception();
			await Clients.All.SendAsync("XXXXX", user, message);
		}
		
		public async Task CardMovement(string user, string message)
		{
			throw new Exception();
			await Clients.All.SendAsync("XXXXX", user, message);
		}
	}
}