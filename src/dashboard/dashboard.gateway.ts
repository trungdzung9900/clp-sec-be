import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PollCalculateService } from 'src/poll-calculate/poll-calculate.service';
import { SocketShareService } from 'src/socket-share/socket-share.service';

@WebSocketGateway({
	namespace: 'dashboard',
	cors: true
})
export class DashboardGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	// in event initialize the dashboard socket
	afterInit(server: any) {
		console.log('Initialize DashboardGateway!');
	}

	// when having a incomming connect to dashboard
	handleConnection(client: Socket, ...args: any[]) {
		console.log(`Dashboard connected: ${client.id}`);

		// copy the current socket set to a global variable
		SocketShareService.dashboard = this.server
	}

	// when having a disconnect from server
	handleDisconnect(client: Socket) {
		console.log(`Dashboard disconnected: ${client.id}`);
	}

	// this use for test only if websocket still usable
	@SubscribeMessage('dashboard')
	handleMessage(client: any, payload: any) {
		client.emit("dashboard", { message: "Hello world" });
	}

	// dashboard user actively get current vote (for actively synchronize)
	@SubscribeMessage('get-current-votes')
	handleGetCurrentVotes(client: any, payload: any) {
		console.log(client)
		client.emit("votes-result", { orange: PollCalculateService.orange, blue: PollCalculateService.blue });
	}

	// refresh game 
	@SubscribeMessage('refresh-game')
	handleRefreshGame(client: any, payload: any) {
		// reset the vote
		PollCalculateService.orange = 0;
		PollCalculateService.blue = 0;

		// broadcast the result for users too
		SocketShareService.client.emit("votes-result", { orange: PollCalculateService.orange, blue: PollCalculateService.blue });
		SocketShareService.dashboard.emit("votes-result", { orange: PollCalculateService.orange, blue: PollCalculateService.blue });
	}
}
