import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AdminUsersService } from './admin_users.service';
import { LogoutDTO } from './dto/logout';
import { MesaggeDTO } from './dto/mesagge';
import { ResultDTO } from './dto/result';
import { LoginMDL } from './model/login';
import { LogoutMDL } from './model/logout';
import { Mesagge } from './model/mesagge';
import { RegisterMDL } from './model/register';
import { ResultMDL } from './model/result';


@Resolver(of => ResultMDL)
export class AdminUsersResolver {
    constructor(private readonly adminUsersService: AdminUsersService) { }

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
        userDTO = await this.adminUsersService.login(apiClient);

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
        userDTO = await this.adminUsersService.register(usuario);

        let user = new ResultMDL();
        user.id = userDTO.user.id;
        user.name = userDTO.user.name;
        user.email = userDTO.user.email;
        user.token = userDTO.token;

        return user;
    }

    @Mutation(returns => Mesagge)
    async logout(@Args('logoutUser') newLogout: LogoutMDL) {
        let aux = new LogoutDTO();
        aux.token = newLogout.token;

        let M = new MesaggeDTO();
        M = await this.adminUsersService.logout(aux);

        let R = new Mesagge();
        R = M;
        return R;
    }
}
