import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { LoginDTO } from './dto/login';
import { LogoutDTO } from './dto/logout';
import { RegisterDTO } from './dto/register';
import { ResultDTO } from './dto/result';
import { MesaggeDTO } from './dto/mesagge';


@Injectable()
export class AdminUsersService {
    private API_URL = "";

    constructor(private httpService: HttpService) {
        let url = process.env.API_ADMINUSER_URL || 'localhost';
        let port = process.env.API_ADMINUSER_PORT || 4040;
        this.API_URL = `http://${url}:${port}/api`;
    }

    async login(data: LoginDTO): Promise<ResultDTO> {
        let {email, password} = data;
        let response: Observable<AxiosResponse<ResultDTO>> = this.httpService.post(`${this.API_URL}/login`,{email, password})
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 201) {
                    rej(new Error('Ocurrio un error al crear usuario'));
                } else {
                    console.log(list);
                    res(list.data);
                }
            },err=>{console.log(err)})
        })
    }

    async register(data: RegisterDTO): Promise<ResultDTO>{
        let {name, email, password, password_confirmation} = data;
        let response: Observable<AxiosResponse<ResultDTO>> = this.httpService.post(`${this.API_URL}/register`,{name, email, password, password_confirmation});
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status !== 201) {
                    rej(new Error('Ocurrio un error al intentar registrarse'));
                } else {
                    console.log(list);
                    res(list.data);
                }
            },err=>{console.log(err)})
        })
    }

     async logout(data: LogoutDTO): Promise<MesaggeDTO>{
        let {token} = data;
        const headersRequest ={
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
        let response: Observable<AxiosResponse<MesaggeDTO>> = this.httpService.post(`${this.API_URL}/logout`,"",{headers:headersRequest})
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status != 201) {
                    console.log(list);
                    rej(new Error('Ocurrio un error intentar cerrar sesion'));
                } else {
                    console.log(list);
                    res(list.data);
                }
            },err=>{ console.log(err);rej(err.data);})
        })
        
    }

     async show(data: LogoutDTO): Promise<MesaggeDTO>{
        let {token} = data;
        const headersRequest ={
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        }
        let response: Observable<AxiosResponse<MesaggeDTO>> = this.httpService.get(`${this.API_URL}/show`,{headers:headersRequest})
        
        return new Promise((res, rej) => {
            response.subscribe(list => {
                if (list.status != 200) {
                    console.log(list)
                    rej(new Error('Ocurrio un error'));
                } else {
                    const data={
                        message:"has access"
                    }
                    console.log(list);
                    res(data);
                }
            },err=>{ console.log(err);rej(err.data);})
        })
    } 



    }



    
    


