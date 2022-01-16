import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MeetingModule } from './meeting/';
import { TransmissionModule } from './transmission/';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    TransmissionModule,
    MeetingModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    WebsocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
