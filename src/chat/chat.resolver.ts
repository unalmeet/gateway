import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Chat } from './model/chat';
import { Chat as ApiChat } from './dto/chat';
import { CreateChat } from './model/createchat';
import { ChatService } from './chat.service';
import { NotFoundException, Logger } from '@nestjs/common';

@Resolver(of => Chat)
export class ChatResolver {
    private readonly logger = new Logger(ChatResolver.name);

    constructor(private readonly chatService: ChatService) { }

    @Query(returns => [Chat])
    async listChat(): Promise<Chat[]> {
        const apiChatList = await this.chatService.get();
        if (!apiChatList) {
            throw new NotFoundException();
        }
        let chatList: Chat[] = [];
        apiChatList.forEach(apiChat => {
            let chat = new Chat();
            chat.name = apiChat.name;
            chat.ms = apiChat.ms;
            chat.date = apiChat.date;
            chatList.push(chat);
        });
        return chatList;
    }

    @Mutation(returns => Chat)
    async addChat(@Args('addChat') newChat: CreateChat): Promise<Chat> {
        let apiChat = new ApiChat();
        apiChat.name = newChat.name;
        apiChat.ms = newChat.ms;
        apiChat.date = newChat.date;
        try {
            apiChat = await this.chatService.create(apiChat);
        } catch (error) {
            this.logger.error(error);            
        }
        let chat = new Chat();
        chat.name = apiChat.name;
        chat.ms = apiChat.ms;
        chat.date = apiChat.date;
        return chat;
    }
}