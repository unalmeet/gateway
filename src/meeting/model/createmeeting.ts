import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMeeting {
    @Field()
    name: string;
    
    @Field()
    description: string;
    
    @Field()
    date_start: Date;
    
    @Field()
    date_end: Date;
    
    @Field()
    host: number;
    
    @Field(() => [Number]) 
    attendants: number[];
}
