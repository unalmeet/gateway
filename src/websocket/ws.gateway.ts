import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage,
  WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Broadcast, TransmissionService } from '../transmission';

@WebSocketGateway({ namespace: '/ws', cors: { origin: '*' } })
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clientMap = new Map();
  constructor(private transmissionService: TransmissionService) { }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger(WsGateway.name);

  @SubscribeMessage('video')
  async handleVideo(client: Socket, payload: any): Promise<boolean> {
    const media = payload.split(',')[1];
    const { token, room } = this.clientMap.get(client.id);
    const broadcast: Broadcast = { token, media };
    //let response = await this.transmissionService.broadcastVideo(broadcast);
    return this.server.to(room).emit('video', payload);
  }

  @SubscribeMessage('audio')
  async handleAudio(client: Socket, payload: any): Promise<boolean> {
    const { token, room } = this.clientMap.get(client.id);
    return client.to(room).emit('video', token);
  }

  public broadcastToRoom(room: string | string[], event: string, ...data: any[]): boolean {
    return this.server.to(room).emit(event, data);
  }

  public broadcastToAll(event: string, ...data: any[]): boolean {
    return this.server.emit(event, data);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const { usr, token } = client.handshake.auth;
    const result = await this.transmissionService.findByToken(token) || [];
    const usrFound = result.find(usrData => usrData.idUser === usr);
    if (usrFound) {
      this.logger.warn(`Client connected: ${client.id}`);
      client.join(usrFound.idMeeting);
      this.logger.debug(`Client ${client.id} added to room ${usrFound.idMeeting}`)
      this.clientMap.set(client.id, { token, room: usrFound.idMeeting });
    } else {
      this.logger.error(`Client unauthorized: ${client.id}`);
      client.disconnect(true);
    }
  }

}
