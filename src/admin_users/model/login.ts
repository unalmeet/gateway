import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginMDL {
    @Field()
    email: string;
    
    @Field()
    password: string;
}
