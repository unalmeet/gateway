import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Chat } from './dto/chat';

@Injectable()
export class ChatService {
    private API_URL = "";

    constructor(private httpService: HttpService) {
        let url =  'localhost';
        let port =  7000;
        this.API_URL = `http://${url}:${port}`;
    }

    async create(data: Chat): Promise<Chat> {
        let { name, ms, date} = data;
        let response: Observable<AxiosResponse<Chat>> = this.httpService.post(`${this.API_URL}/api/message`, {name, ms, date})
        return new Promise((res, rej) => {
            response.subscribe({
                next: (list) => {
                    if (list.status !== 201) {
                        rej(new Error('Ocurrio un error al crear el chat'));
                    } else {
                        res(list.data);
                    }
                },
                error: (err) => {
                    rej(new Error('ChatService.create - Ocurrio un error al consumir el endpoint: ' + err));
                }
            })
        })
    }

    async get(): Promise<Chat[]> {
        let response: Observable<AxiosResponse<Chat[]>> = this.httpService.get(`${this.API_URL}/api/message`)
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 200) {
                    rej(new Error('Ocurrio un error al retornar datos'));
                } else {
                    //console.log(list.data)
                    res(list.data);
                }
            })
        })
    }

    
}
