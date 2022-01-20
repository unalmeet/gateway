/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageChat } from './model/message';
import { Message as ApiMessage } from './dto/message';
import { CreateMessage } from './model/create.message';
import { ChatService } from './chat.service';
import { NotFoundException } from '@nestjs/common';

@Resolver(of => MessageChat)
export class ChatResolver {
    constructor(private readonly chatService: ChatService) { }

    @Query(returns => MessageChat)
    async message() {
        return this.chatService.get();
    }
}