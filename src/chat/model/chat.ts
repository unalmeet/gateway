import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'chat ' })
export class Chat {

    
    @Field()
    name: string;
    
    @Field()
    ms: string;
    
    @Field()
    date: string;
}
