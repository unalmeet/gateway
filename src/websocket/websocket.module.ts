import { Module } from '@nestjs/common';
import { TransmissionModule, TransmissionService as TransmissionApi } from 'src/transmission';
import { TransmissionService } from './controller/transmission.service';
import { WsGateway } from './ws.gateway';

@Module({
  imports: [TransmissionModule],
  providers: [WsGateway, TransmissionApi, TransmissionService],
})
export class WebsocketModule { }
