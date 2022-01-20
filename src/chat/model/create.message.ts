/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessage {
    @Field()
    name: string;

    @Field()
    ms: string;

    @Field()
    date: Date;
}
