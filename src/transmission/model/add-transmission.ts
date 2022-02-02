import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddTransmission {
    @Field()
    idMeeting: string;
  
    @Field()
    idUser: number;
}
