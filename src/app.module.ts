import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TransmissionModule } from './transmission/';

@Module({
  imports: [
    TransmissionModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
