import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PollCalculateService } from 'src/poll-calculate/poll-calculate.service';
import { SocketShareService } from 'src/socket-share/socket-share.service';

@WebSocketGateway({
	namespace: 'client',
	cors: true
})
export class ClientGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	// client websocket set
	@WebSocketServer() clients: Server;

	// in event initialize the dashboard socket
	afterInit(clients: any) {
		console.log('Initialize ClientGateway!');
	}

	// in case there is a connect to this session
	handleConnection(client: Socket, ...args: any[]) {
		console.log(`Client connected: ${client.id}`);

		// synchronize with a global variable for broadcast
		SocketShareService.client = this.clients
	}

	// in case of there is a client disconnect from socket server
	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
	}

	// using for test if client domain working
	@SubscribeMessage('client')
	handleMessage(client: Socket, payload: any) {
		client.emit("client", { message: "Hello world" })
	}

	// using for client actively synchronize the voting pool
	@SubscribeMessage('get-current-votes')
	handleGetCurrentVotes(client: any, payload: any) {
		client.emit("votes-result", { orange: PollCalculateService.orange, blue: PollCalculateService.blue })
	}

	// when user vote
	@SubscribeMessage('votes')
	handleVotes(client: Socket, payload: any) {
		if (payload.votes == "blue") {
			PollCalculateService.blue++;

			// broadcast the current result even if there is ok
			SocketShareService.client.emit("votes-result", { orange: PollCalculateService.orange, blue: PollCalculateService.blue })
			SocketShareService.dashboard.emit("votes-result", { orange: PollCalculateService.orange, blue: PollCalculateService.blue })
		}
		if (payload.votes == "orange") {
			PollCalculateService.orange++;

			// broadcast the current result even if there is ok
			SocketShareService.client.emit("votes-result", { orange: PollCalculateService.orange, blue: PollCalculateService.blue })
			SocketShareService.dashboard.emit("votes-result", { orange: PollCalculateService.orange, blue: PollCalculateService.blue })
		}

		
	}

}
