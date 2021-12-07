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
    date_created: Date;
    
    @Field()
    date_start: Date;
    
    @Field()
    date_end: Date;
    
    @Field()
    host: number;
    
    @Field(() => [Number]) 
    attendants: number[];
}
