import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MeetingModule } from './meeting/';
import { TransmissionModule } from './transmission/';
import { WebsocketModule } from './websocket/websocket.module';
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
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: "Content-Type,Accept,Authorization,Access-Control-Allow-Origin",
        credentials: true,
      },
    }),
    WebsocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
