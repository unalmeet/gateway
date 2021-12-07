import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TransmissionModule } from './transmission/';
import { MeetingModule } from './meeting/';

@Module({
  imports: [
    TransmissionModule,
    MeetingModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
