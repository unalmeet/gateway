import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResultMDL{
    @Field()
    name:string;
    @Field()
    email:string;
    @Field()
    token: string;
}
