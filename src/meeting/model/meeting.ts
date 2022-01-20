import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'meeting ' })
export class Meeting {
    @Field()
    link: string;

    @Field()
    name: string;
    
    @Field()
    description: string;
    
    @Field()
    date_created: string;
    
    @Field()
    date_start: string;
    
    @Field()
    date_end: string;
    
    @Field()
    host: number;
    
    @Field(() => [Number]) 
    attendants: number[];
}
