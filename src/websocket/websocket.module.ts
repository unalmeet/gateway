import { Module } from '@nestjs/common';
import { TransmissionModule, TransmissionService } from 'src/transmission';
import { WsGateway } from './ws.gateway';

@Module({
  imports: [TransmissionModule],
  providers: [WsGateway, TransmissionService],
})
export class WebsocketModule { }
