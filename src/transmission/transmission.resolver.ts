import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Client } from './model/client';
import { Client as ApiClient } from './dto/client';
import { CreateClient } from './model/create-client';
import { TransmissionService } from './transmission.service';
import { NotFoundException } from '@nestjs/common';

@Resolver(of => Client)
export class TransmissionResolver {
    constructor(private readonly transmissionService: TransmissionService) { }

    @Query(returns => [Client])
    async listClients(@Args('token') token: string): Promise<Client[]> {
        const apiClientList = await this.transmissionService.findByToken(token);
        if (!apiClientList) {
            throw new NotFoundException(token);
        }
        let clientList: Client[] = [];
        apiClientList.forEach(apiClient => {
            let client = new Client();
            client.idMeeting = apiClient.idMeeting;
            client.idSession = apiClient.idSession;
            client.idUser = apiClient.idUser;
            client.token = apiClient.token;
            clientList.push(client);
        });
        return clientList;
    }

    @Mutation(returns => Client)
    async addClient(@Args('newClientData') newClient: CreateClient): Promise<Client> {
        let apiClient = new ApiClient();
        apiClient.idMeeting = newClient.idMeeting
        apiClient.idUser = newClient.idUser
        apiClient = await this.transmissionService.create(apiClient);
        let client = new Client();
        client.idMeeting = newClient.idMeeting;
        client.idUser = newClient.idUser;
        client.idSession = 0;
        client.token = apiClient.token;
        return client;
    }

    @Mutation(returns => Boolean)
    async removeClient(@Args('token') token: string): Promise<boolean> {
        return this.transmissionService.remove(token);
    }
}
