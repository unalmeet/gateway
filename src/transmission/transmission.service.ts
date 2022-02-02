import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { FormDataEncoder } from "form-data-encoder";
import { FormData } from "formdata-node";
import { StatusCodes } from 'http-status-codes';
import { catchError, of } from 'rxjs';
import { Readable } from 'stream';
import { HttpResponse } from '../utils/http-response';
import { Broadcast } from './dto/broadcast';
import { AddTransmission } from './model/add-transmission';
import { Transmission } from "./model/transmission";

@Injectable()
export class TransmissionService {
    private logger: Logger = new Logger(TransmissionService.name);
    private API_URL: string;

    constructor(private httpService: HttpService) {
        let url = process.env.API_TRANSMISSION_URL || 'localhost';
        let port = process.env.API_TRANSMISSION_PORT || 8000;
        this.API_URL = `http://${url}:${port}/api/v1`;
    }

    async create(data: AddTransmission): Promise<Transmission> {
        let { idMeeting, idUser } = data;
        let response: HttpResponse<Transmission> = this.httpService.post(`${this.API_URL}/session`, { idMeeting, idUser })
        return new Promise((resolve, _) => {
            response.pipe(
                catchError(err => {
                    this.logger.error("Ocurrio un error al consumir el endpoint", err)
                    return of({ data: null } as AxiosResponse<Transmission>)
                })
            ).subscribe(list => {
                resolve(list.data);
            })
        })
    }

    async remove(token: string): Promise<boolean> {
        let response: HttpResponse<Transmission[]> = this.httpService.delete(`${this.API_URL}/session/${token}`)
        return new Promise((resolve, _) => {
            response.pipe(
                catchError(err => {
                    this.logger.error("Ocurrio un error al consumir el endpoint", err)
                    return of({ status: StatusCodes.INTERNAL_SERVER_ERROR } as AxiosResponse)
                })
            ).subscribe(list => {
                resolve(list.status === StatusCodes.ACCEPTED);
            })
        })
    }

    async update(idSession: string): Promise<boolean> {
        return true;
    }

    async broadcastVideo(data: Broadcast): Promise<Broadcast> {
        const formData = new FormData();
        formData.append('data', data.media);
        formData.append('token', data.token);
        const encoder = new FormDataEncoder(formData);
        const headers = { headers: encoder.headers }
        let response: HttpResponse<Broadcast> = this.httpService.post(`${this.API_URL}/image`, Readable.from(encoder), headers)
        return new Promise((resolve, _) => {
            response.pipe(
                catchError(err => {
                    this.logger.error("Ocurrio un error al consumir el endpoint", err)
                    const empty = { data: null } as AxiosResponse<Broadcast>
                    return of(empty)
                })
            ).subscribe(list => {
                resolve(list.data);
            })
        })
    }

    async findByToken(token: string): Promise<Transmission[]> {
        let response: HttpResponse<Transmission[]> = this.httpService.get(`${this.API_URL}/session/${token}`)
        return new Promise((resolve, _) => {
            response.pipe(
                catchError(err => {
                    this.logger.error("Ocurrio un error al consumir el endpoint", err)
                    const empty = { data: null } as AxiosResponse<Transmission[]>
                    return of(empty)
                })
            ).subscribe(list => {
                resolve(list.data);
            })
        })
    }
}
