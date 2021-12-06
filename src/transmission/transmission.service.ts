import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Broadcast } from './dto/broadcast';
import { Client } from './dto/client';

@Injectable()
export class TransmissionService {
    private API_URL = "";

    constructor(private httpService: HttpService) {
        let url = process.env.API_TRANSMISSION_URL || 'localhost';
        let port = process.env.API_TRANSMISSION_PORT || 8000;
        this.API_URL = `http://${url}:${port}/api/v1`;
    }

    async create(data: Client): Promise<Client> {
        let {idMeeting, idUser} = data;
        let response: Observable<AxiosResponse<Client>> = this.httpService.post(`${this.API_URL}/session`,{idMeeting, idUser})
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

    async remove(token: string): Promise<boolean> {
        let response: Observable<AxiosResponse<Client[]>> = this.httpService.delete(`${this.API_URL}/session/${token}`)
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

    async update(idSession: string): Promise<boolean> {
        return true;
    }

    async broadcastAudio(data: Broadcast): Promise<Broadcast> {
        return {} as any;
    }

    async broadcastVideo(data: Broadcast): Promise<Broadcast> {
        return {} as any;
    }

    async findByToken(token: string): Promise<Client[]> {
        let response: Observable<AxiosResponse<Client[]>> = this.httpService.get(`${this.API_URL}/session/${token}`)
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
