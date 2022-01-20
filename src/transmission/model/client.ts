/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'client ' })
export class Client {
    @Field()
    idMeeting: string;

    @Field()
    idUser: number;

    @Field()
    idSession: number;

    @Field()
    token: string;
}
