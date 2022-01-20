import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMeeting {
    @Field()
    name: string;
    
    @Field()
    description: string;
    
    @Field()
    date_start: string;
    
    @Field()
    date_end: string;
    
    @Field()
    host: number;
    
    @Field(() => [Number]) 
    attendants: number[];
}
