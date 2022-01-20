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


    @Query(returns => [MessageChat])
    async message(): Promise<MessageChat[]>  {
        const MessagesList = await this.chatService.get();
        if (!MessagesList) {
            throw new NotFoundException();
        }
        let messageReturn: MessageChat[] = [];
        MessagesList.forEach(Message => {
            let messagechat = new MessageChat();
            messagechat.name = Message.name;
            messagechat.ms = Message.ms;
            messagechat.date = Message.date;
           
            messageReturn.push(messagechat);
        });
        return messageReturn;
    }
}