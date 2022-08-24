import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientGateway } from './client/client.gateway';
import { DashboardGateway } from './dashboard/dashboard.gateway';
import { PollCalculateService } from './poll-calculate/poll-calculate.service';
import { SocketShareService } from './socket-share/socket-share.service';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService, ClientGateway, DashboardGateway, PollCalculateService, SocketShareService],
})
export class AppModule { }
