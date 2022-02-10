import { Module } from '@nestjs/common';
import { ChatModule, ChatService } from 'src/chat';
import { WsGatewayChat } from './ws.gateway';

@Module({
  imports: [ChatModule],
  providers: [WsGatewayChat, ChatService],
})
export class WebsocketChatModule { }
