import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';

@Module({
    imports: [HttpModule],
    providers: [ChatResolver, ChatService],
    exports: [HttpModule]
})
export class ChatModule { }
