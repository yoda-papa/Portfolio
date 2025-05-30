using Microsoft.AspNetCore.SignalR;

namespace Portfolio.Api.Hubs
{
    public class PortfolioHub : Hub
    {
        private static int _visitorCount = 0;

        public override async Task OnConnectedAsync()
        {
            _visitorCount++;
            await Clients.All.SendAsync("UpdateVisitorCount", _visitorCount);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _visitorCount--;
            await Clients.All.SendAsync("UpdateVisitorCount", _visitorCount);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
} 