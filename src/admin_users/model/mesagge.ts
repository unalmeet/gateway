import { Field,ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Mesagge {
    @Field()
    message:string;
}
