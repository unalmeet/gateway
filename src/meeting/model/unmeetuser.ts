import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Unmeetuser ' })
export class User {
    @Field()
    id: number;
}
