import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginMDL } from './model/login';
import { LogoutMDL } from './model/logout';
import { Mesagge } from './model/mesagge';
import { RegisterMDL } from './model/register';
import { ResultMDL } from './model/result';

import { MesaggeDTO } from './dto/mesagge';
import { LoginDTO } from './dto/login';
import { LogoutDTO } from './dto/logout';
import { RegisterDTO } from './dto/register';
import { ResultDTO } from './dto/result';
import { Admin_userService } from './admin_users.service';
import { NotFoundException } from '@nestjs/common';

@Resolver()
export class Admin_userResolver {
    constructor(private readonly admin_userService: Admin_userService) { }

    @Query(returns => Mesagge)
    async show(@Args('Show') newLogout: LogoutMDL) {
        let aux = new LogoutDTO();
        aux.token=newLogout.token;

        let M = new MesaggeDTO();
        M = await this.admin_userService.show(aux);
        const data={
            data:{
                message:"has access"
            }
        }
        let R = new Mesagge();
        R=data.data;
        return R;  
        
    }  

    @Mutation(returns => ResultMDL)
    async login(@Args('loginUser') newClient: LoginMDL): Promise<ResultMDL> {
        let apiClient = new LoginMDL();
        apiClient.email = newClient.email;
        apiClient.password = newClient.password;

        let userDTO = new ResultDTO();
        userDTO = await this.admin_userService.login(apiClient);

        let user = new ResultMDL();
        user.id = userDTO.user.id;
        user.name = userDTO.user.name;
        user.email = userDTO.user.email;
        user.token = userDTO.token;
        
        return user;
    } 
    @Mutation(returns => ResultMDL)
    async register(@Args('registerUser') registerUser: RegisterMDL) {
        let usuario = new RegisterMDL();
        usuario.name = registerUser.name;
        usuario.email = registerUser.email; 
        usuario.password = registerUser.password;
        usuario.password_confirmation = registerUser.password_confirmation;

        let userDTO = new ResultDTO();
        userDTO = await this.admin_userService.register(usuario);

        let user = new ResultMDL();
        user.id = userDTO.user.id;
        user.name = userDTO.user.name;
        user.email = userDTO.user.email;
        user.token = userDTO.token;
        
        return user; 
    }

   @Mutation(returns => Mesagge)
    async logout(@Args('logoutUser') newLogout: LogoutMDL){
        let aux = new LogoutDTO();
        aux.token=newLogout.token;

        let M = new MesaggeDTO();
        M = await this.admin_userService.logout(aux);

        let R = new Mesagge();
        R=M;
        return R;         
    }  
}
