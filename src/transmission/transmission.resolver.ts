import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddTransmission } from './model/add-transmission';
import { Transmission } from './model/transmission';
import { TransmissionService } from './transmission.service';

@Resolver((_: Function) => Transmission)
export class TransmissionResolver {
    constructor(private readonly transmissionService: TransmissionService) { }

    @Query(_ => [Transmission])
    async listTransmissionsByToken(@Args('token') token: string): Promise<Transmission[]> {
        const transmissionList = await this.transmissionService.findByToken(token);
        if (!transmissionList) {
            throw new NotFoundException(token);
        }
        return transmissionList;
    }

    @Mutation(_ => Transmission)
    async addNewTransmission(@Args('meetingData') newTrx: AddTransmission): Promise<Transmission> {
        const result = await this.transmissionService.create(newTrx);
        if (!result) {
            throw new BadRequestException(newTrx);
        }
        return result;
    }

    @Mutation(_ => Boolean)
    async removeTransmission(@Args('token') token: string): Promise<boolean> {
        return this.transmissionService.remove(token);
    }
}
