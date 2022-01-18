import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class RegisterMDL {
    @Field()
    name: string;

    @Field()
    email: string;
    
    @Field()
    password: string;
    
    @Field()
    password_confirmation: string;
}
