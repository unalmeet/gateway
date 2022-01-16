import { Field, InputType,ObjectType } from '@nestjs/graphql';

@InputType('LogoutMDL')
export class LogoutMDL {
    @Field()
    token:string;
}
