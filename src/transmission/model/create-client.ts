import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClient {
    @Field()
    idMeeting: string;
  
    @Field()
    idUser: number;
}
