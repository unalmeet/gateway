import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MeetingModule } from './meeting/';
import { TransmissionModule } from './transmission/';
import { WebsocketModule } from './websocket/websocket.module';
import { WebsocketChatModule } from './websocket-chat/websocket.module';
import { AdminUsersModule } from './admin_users/';

@Module({
  imports: [
    TransmissionModule,
    MeetingModule,
    AdminUsersModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      cors: {
        origin: '*',
        credentials: false,
      },
    }),
    WebsocketModule,
    WebsocketChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
