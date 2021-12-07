import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Meeting } from './model/meeting';
import { Meeting as ApiMeeting } from './dto/meeting';
import { CreateMeeting } from './model/createmeeting';
import { MeetingService } from './meeting.service';
import { NotFoundException } from '@nestjs/common';

@Resolver(of => Meeting)
export class MeetingResolver {
    constructor(private readonly meetingService: MeetingService) { }

    @Query(returns => [Meeting])
    async listMeetings(): Promise<Meeting[]> {
        const apiMeetingList = await this.meetingService.get();
        if (!apiMeetingList) {
            throw new NotFoundException();
        }
        let meetingList: Meeting[] = [];
        apiMeetingList.forEach(apiMeeting => {
            let meeting = new Meeting();
            meeting.link = apiMeeting.link;
            meeting.name = apiMeeting.name;
            meeting.description = apiMeeting.description;
            meeting.date_created = apiMeeting.date_created;
            meeting.date_start = apiMeeting.date_start;
            meeting.date_end = apiMeeting.date_end;
            meeting.host = apiMeeting.host;
            meeting.attendants = apiMeeting.attendants;
            meetingList.push(meeting);
        });
        return meetingList;
    }

    @Query(returns => [Meeting])
    async listMeetingsHosted(@Args('host') host:number): Promise<Meeting[]> {
        const apiMeetingList = await this.meetingService.getHostedMeetings(host);
        if (!apiMeetingList) {
            throw new NotFoundException();
        }
        let meetingList: Meeting[] = [];
        apiMeetingList.forEach(apiMeeting => {
            let meeting = new Meeting();
            meeting.link = apiMeeting.link;
            meeting.name = apiMeeting.name;
            meeting.description = apiMeeting.description;
            meeting.date_created = apiMeeting.date_created;
            meeting.date_start = apiMeeting.date_start;
            meeting.date_end = apiMeeting.date_end;
            meeting.host = apiMeeting.host;
            meeting.attendants = apiMeeting.attendants;
            meetingList.push(meeting);
        });
        return meetingList;
    }

    @Query(returns => [Meeting])
    async listMeetingsAttendant(@Args('attendant') attendant:number): Promise<Meeting[]> {
        const apiMeetingList = await this.meetingService.getAttendedMeetings(attendant);
        if (!apiMeetingList) {
            throw new NotFoundException();
        }
        let meetingList: Meeting[] = [];
        apiMeetingList.forEach(apiMeeting => {
            let meeting = new Meeting();
            meeting.link = apiMeeting.link;
            meeting.name = apiMeeting.name;
            meeting.description = apiMeeting.description;
            meeting.date_created = apiMeeting.date_created;
            meeting.date_start = apiMeeting.date_start;
            meeting.date_end = apiMeeting.date_end;
            meeting.host = apiMeeting.host;
            meeting.attendants = apiMeeting.attendants;
            meetingList.push(meeting);
        });
        return meetingList;
    }

    @Query(returns => Meeting)
    async findMeeting(@Args('link') link:string): Promise<Meeting> {
        const apiMeeting = await this.meetingService.findByLink(link);
        if (!apiMeeting) {
            throw new NotFoundException();
        }
        let meeting = new Meeting();
        meeting.link = apiMeeting.link;
        meeting.name = apiMeeting.name;
        meeting.description = apiMeeting.description;
        meeting.date_created = apiMeeting.date_created;
        meeting.date_start = apiMeeting.date_start;
        meeting.date_end = apiMeeting.date_end;
        meeting.host = apiMeeting.host;
        meeting.attendants = apiMeeting.attendants;
        return meeting;
    }

    @Mutation(returns => Meeting)
    async addMeeting(@Args('addMeeting') newMeeting: CreateMeeting): Promise<Meeting> {
        let apiMeeting = new ApiMeeting();
        apiMeeting.name = newMeeting.name;
        apiMeeting.description = newMeeting.description;
        apiMeeting.date_start = newMeeting.date_start;
        apiMeeting.date_end = newMeeting.date_end;
        apiMeeting.host = newMeeting.host;
        apiMeeting.attendants = newMeeting.attendants;
        apiMeeting = await this.meetingService.create(apiMeeting);
        let meeting = new Meeting();
        meeting.link = apiMeeting.link;
        meeting.name = apiMeeting.name;
        meeting.description = apiMeeting.description;
        meeting.date_created = apiMeeting.date_created;
        meeting.date_start = apiMeeting.date_start;
        meeting.date_end = apiMeeting.date_end;
        meeting.host = apiMeeting.host;
        meeting.attendants = apiMeeting.attendants;
        return meeting;
    }

    @Mutation(returns => Boolean)
    async removeMeeting(@Args('link') link: string): Promise<boolean> {
        return this.meetingService.remove(link);
    }
}
