import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MeetingModule } from './meeting/';
import { TransmissionModule } from './transmission/';
import { WebsocketModule } from './websocket/websocket.module';
import { Admin_userModule } from './admin_users/';

@Module({
  imports: [
    TransmissionModule,
    MeetingModule,
    Admin_userModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    WebsocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
