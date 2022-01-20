/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageChat {
    @Field()
    name: string;

    @Field()
    ms: string;

    @Field()
    date: string;
}
