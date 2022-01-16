import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TransmissionModule } from './transmission/';
import { Admin_userModule } from './admin_users/';

@Module({
  imports: [
    TransmissionModule,
    Admin_userModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
