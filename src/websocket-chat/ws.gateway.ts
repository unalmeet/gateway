import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { response } from "express";
import { Server, Socket } from "socket.io";
import { ChatService } from "../chat";

@WebSocketGateway({ namespace: "/wschat", cors: { origin: "*" } })
export class WsGatewayChat implements OnGatewayConnection, OnGatewayDisconnect {
  private clientMap = new Map();
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger(WsGatewayChat.name);

  @SubscribeMessage("msgToServer")
  handleMessage(
    client: Socket,
    message: { name: string; room: string; text: string }
  ) {
    this.server.to(message.room).emit("msgToClient", message);
  }

  safeStringify = (obj, indent = 2) => {
    let cache = [];
    const retVal = JSON.stringify(
      obj,
      (key, value) =>
        typeof value === "object" && value !== null
          ? cache.includes(value)
            ? undefined // Duplicate reference found, discard key
            : cache.push(value) && value // Store value in our collection
          : value,
      indent
    );
    cache = null;
    return retVal;
  };

  @SubscribeMessage("joinRoom")
  handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    this.server.emit("joinedRoom", client.handshake.auth.id);
    this.logger.log(`Client ${client.id} joined the room ${room}`);
    this.server
      .fetchSockets()
      .then((data) =>
        this.server.emit("usersInRoom", this.safeStringify(data))
      );
  }
  @SubscribeMessage("leaveRoom")
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    this.server.emit("leftRoom", room);
    this.server
      .fetchSockets()
      .then((data) =>
        this.server.emit("usersInRoom", this.safeStringify(data))
      );
  }
  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.server.emit("leftRoom", client.handshake.auth.id);
    this.server
      .fetchSockets()
      .then((data) =>
        this.server.emit("usersInRoom", this.safeStringify(data))
      );
  }

  handleConnection(client: Socket, ...args: any[]) {
    const { id, token } = client.handshake.auth;
    this.logger.log(`Client connected: ${id}  ${token}`);
  }
}
