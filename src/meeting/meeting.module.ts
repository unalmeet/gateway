import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MeetingResolver } from './meeting.resolver';
import { MeetingService } from './meeting.service';

@Module({
    imports: [HttpModule],
    providers: [MeetingResolver, MeetingService]
})
export class MeetingModule {}
