/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
//import { Broadcast } from './dto/broadcast';
import { Message } from './dto/message';

@Injectable()
export class ChatService {
    private API_URL = "";

    constructor(private httpService: HttpService) {
        const url = process.env.API_CHAT_URL || 'localhost';
        const port = process.env.API_CHAT_PORT || 3001;
        this.API_URL = `http://${url}:${port}/api`;
    }

    async create(data: Message): Promise<Message> {
        const { name, ms } = data;
        const response: Observable<AxiosResponse<Message>> = this.httpService.post(`${this.API_URL}/message`, { name, ms })
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 201) {
                    rej(new Error('Ocurrio un error al crear cliente'));
                } else {
                    res(list.data);
                }
            })
        })
    }

    async get(): Promise<Message[]> {
        // eslint-disable-next-line prefer-const
        let response: Observable<AxiosResponse<Message[]>> = this.httpService.get(`${this.API_URL}/message/`)
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

    async remove(ms: string): Promise<boolean> {
        const response: Observable<AxiosResponse<Message[]>> = this.httpService.delete(`${this.API_URL}/message/${ms}`)
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 202) {
                    rej(new Error('Ocurrio un error al eliminar datos'));
                } else {
                    res(true);
                }
            })
        })
    }

    async update(ms: string): Promise<boolean> {
        return true;
    }


    async findByToken(name: string): Promise<Message[]> {
        const response: Observable<AxiosResponse<Message[]>> = this.httpService.get(`${this.API_URL}/message/${name}`)
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
