import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TransmissionService } from './controller/transmission.service';

@WebSocketGateway({ namespace: '/ws', cors: { origin: '*' } })
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private transmissionService: TransmissionService) { }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WsGateway');

  @SubscribeMessage('video')
  handleVideo(client: Socket, payload: { room: string, token: string, imageData: Int8Array }) {
    const roomId = payload.room;
    this.transmissionService.processVideo().then(broadcast => {
      let { media } = broadcast;
      return { event: 'video', data: { roomId, media } };
    });
    //return {event: 'video', data: {}};
  }

  @SubscribeMessage('audio')
  handleAudio(client: Socket, payload: { room: string, token: string, imageData: Int8Array }): string {
    //client.broadcast
    return 'Hello world!';
  }

  @SubscribeMessage('joinMeeting')
  joinMeeting(client: Socket, payload: { token: string }): WsResponse<String> {
    let room = payload.token;
    client.join(room);
    this.logger.debug('Cliente ' + client.id + ' agregado a la reunion ' + room);
    this.broadcastInRoom(room, 'joinMeeting', {data:1})
    return { event: 'joinMeeting', data: room };
  }

  @SubscribeMessage('leaveMeeting')
  leaveMeeting(client: Socket, payload: { token: string }): WsResponse<String> {
    let room = payload.token;
    //client.leave(room);
    client.join(room);
    this.logger.debug('Cliente ' + client.id + ' retirado de la reunion ' + room);
    this.broadcastToRoom(room, 'leaveMeeting', {data:2})
    return { event: 'leaveMeeting', data: room };
  }

  public broadcastToRoom(room: string | string[], event: string, ...data: any[]): boolean {
    return this.server.to(room).emit(event, data);
  }

  public broadcastInRoom(room: string | string[], event: string, ...data: any[]): boolean {
    return this.server.in(room).emit(event, data);
  }

  public broadcastToAll(event: string, ...data: any[]): boolean {
    return this.server.emit(event, data);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

}
