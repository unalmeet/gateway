import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Meeting } from './model/meeting';
import { Meeting as ApiMeeting } from './dto/meeting';
import { CreateMeeting } from './model/createmeeting';
import { MeetingService } from './meeting.service';
import { User } from './model/unmeetuser';
import { User as ApiUser } from './dto/unmeetuser';
import { CreateUser } from './model/createuser';
import { UserService } from './meeting.service';
import { NotFoundException, Logger } from '@nestjs/common';

@Resolver(of => Meeting)
export class MeetingResolver {
    private readonly logger = new Logger(MeetingResolver.name);

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
        try {
            apiMeeting = await this.meetingService.create(apiMeeting);
        } catch (error) {
            this.logger.error(error);            
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

    @Mutation(returns => Boolean)
    async removeMeeting(@Args('link') link: string): Promise<boolean> {
        return this.meetingService.remove(link);
    }

    @Mutation(returns => Meeting)
    async addAttendant(@Args('link') link:string, @Args('idAttendant') idAttendant: number): Promise<Meeting> {
        let apiMeeting = this.findMeeting(link);
        let updatedMeeting = new Meeting();
        updatedMeeting.link = (await apiMeeting).link;
        updatedMeeting.name = (await apiMeeting).name;
        updatedMeeting.description = (await apiMeeting).description;
        updatedMeeting.date_created = (await apiMeeting).date_created;
        updatedMeeting.date_start = (await apiMeeting).date_created;
        updatedMeeting.date_end = (await apiMeeting).date_created;
        updatedMeeting.host = (await apiMeeting).host;
        updatedMeeting.attendants = (await apiMeeting).attendants;
        updatedMeeting.attendants.push(idAttendant)
        updatedMeeting = await this.meetingService.putAttendant(updatedMeeting);
        return updatedMeeting;
    }
}

@Resolver(of => User)
export class UserResolver{

    constructor(private readonly userService: UserService) { }

    @Query(returns => [User])
    async listUsers(): Promise<User[]> {
        const apiUserList = await this.userService.get();
        if (!apiUserList) {
            throw new NotFoundException();
        }
        let userList: User[] = [];
        apiUserList.forEach(apiUser => {
            let user = new User();
            user.id = apiUser.id;
            userList.push(user);
        });
        return userList;
    }

    @Query(returns => User)
    async findUser(@Args('id') id:number): Promise<User> {
        const apiUser = await this.userService.findByID(id);
        if (!apiUser) {
            throw new NotFoundException();
        }
        let user = new User();
        user.id = apiUser.id;
        return user;
    }

    @Mutation(returns => User)
    async addUser(@Args('addUser') newUser: CreateUser): Promise<User> {
        let apiUser = new ApiUser();
        apiUser.id = newUser.id;
        apiUser = await this.userService.create(apiUser);
        let user = new User();
        user.id = apiUser.id;
        return user;
    }

    @Mutation(returns => Boolean)
    async removeUser(@Args('id') id: number): Promise<boolean> {
        return this.userService.remove(id);
    }
}
