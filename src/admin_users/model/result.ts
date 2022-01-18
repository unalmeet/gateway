import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResultMDL{
    @Field()
    id:string;
    @Field()
    name:string;
    @Field()
    email:string;
    @Field()
    token: string;
}
