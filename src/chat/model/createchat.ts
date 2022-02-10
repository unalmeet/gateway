import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChat {
    
    @Field()
    name: string;
    
    @Field()
    ms: string;
    
    @Field()
    date: string;
}
