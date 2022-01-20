import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MeetingResolver, UserResolver } from './meeting.resolver';
import { MeetingService, UserService } from './meeting.service';

@Module({
    imports: [HttpModule],
    providers: [MeetingResolver, MeetingService, UserResolver, UserService]
})
export class MeetingModule {}
