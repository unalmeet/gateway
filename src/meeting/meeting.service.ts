import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Meeting } from './dto/meeting';
import { CreateMeeting } from './model/createmeeting';
import { User } from './model/unmeetuser';

@Injectable()
export class MeetingService {
    private API_URL = "";

    constructor(private httpService: HttpService) {
        let url = process.env.API_MEETING_URL || 'localhost';
        let port = process.env.API_MEETING_PORT || 4000;
        this.API_URL = `http://${url}:${port}`;
    }

    async create(data: Meeting): Promise<Meeting> {
        let {link, name, description, date_created, date_start, date_end, host, attendants} = data;
        let response: Observable<AxiosResponse<Meeting>> = this.httpService.post(`${this.API_URL}/meetings/`,{link, name, description, date_created, date_start, date_end, host, attendants})
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 201) {
                    rej(new Error('Ocurrio un error al crear la reunion'));
                } else {
                    res(list.data);
                }
            })
        })
    }

    async remove(link: string): Promise<boolean> {
        let response: Observable<AxiosResponse<boolean>> = this.httpService.delete(`${this.API_URL}/meetings/${link}`)
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 204) {
                    rej(new Error('Ocurrio un error al eliminar datos'));
                } else {
                    res(true);
                }
            })
        })
    }

    async get(): Promise<Meeting[]> {
        let response: Observable<AxiosResponse<Meeting[]>> = this.httpService.get(`${this.API_URL}/meetings/`)
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 200) {
                    rej(new Error('Ocurrio un error al retornar datos'));
                } else {
                    res(list.data);
                }
            })
        })
    }

    async getHostedMeetings(host:number): Promise<Meeting[]> {
        let response: Observable<AxiosResponse<Meeting[]>> = this.httpService.get(`${this.API_URL}/hostedmeetings/${host}`)
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 200) {
                    rej(new Error('Ocurrio un error al retornar datos'));
                } else {
                    res(list.data);
                }
            })
        })
    }

    async getAttendedMeetings(attendant:number): Promise<Meeting[]> {
        let response: Observable<AxiosResponse<Meeting[]>> = this.httpService.get(`${this.API_URL}/attendedmeetings/${attendant}`)
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 200) {
                    rej(new Error('Ocurrio un error al retornar datos'));
                } else {
                    res(list.data);
                }
            })
        })
    }

    async findByLink(link: string): Promise<Meeting> {
        let response: Observable<AxiosResponse<Meeting>> = this.httpService.get(`${this.API_URL}/meetings/${link}`)
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 200) {
                    rej(new Error('Ocurrio un error al retornar datos'));
                } else {
                    res(list.data);
                }
            })
        })
    }
}

@Injectable()
export class UserService{
    private API_URL = "";

    constructor(private httpService: HttpService) {
        let url = process.env.API_MEETING_URL || 'localhost';
        let port = process.env.API_MEETING_PORT || 4000;
        this.API_URL = `http://${url}:${port}`;
    }

    async create(data: User): Promise<User> {
        let {id} = data;
        let response: Observable<AxiosResponse<User>> = this.httpService.post(`${this.API_URL}/UNMeetUser/`,{id})
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 201) {
                    rej(new Error('Ocurrio un error al crear la reunion'));
                } else {
                    res(list.data);
                }
            })
        })
    }

    async remove(id: number): Promise<boolean> {
        let response: Observable<AxiosResponse<boolean>> = this.httpService.delete(`${this.API_URL}/UNMeetUser/${id}`)
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 301) {
                    rej(new Error('Ocurrio un error al eliminar datos'));
                } else {
                    res(true);
                }
            })
        })
    }

    async get(): Promise<User[]> {
        let response: Observable<AxiosResponse<User[]>> = this.httpService.get(`${this.API_URL}/UNMeetUser/`)
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 200) {
                    rej(new Error('Ocurrio un error al retornar datos'));
                } else {
                    res(list.data);
                }
            })
        })
    }
    async findByID(id: number): Promise<User> {
        let response: Observable<AxiosResponse<User>> = this.httpService.get(`${this.API_URL}/UNMeetUser/${id}`)
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 200) {
                    rej(new Error('Ocurrio un error al retornar datos'));
                } else {
                    res(list.data);
                }
            })
        })
    }
}
