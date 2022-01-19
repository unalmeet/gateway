import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import {AdminUsersResolver } from './admin_users.resolver';
import {AdminUsersService } from './admin_users.service';

@Module({
    imports: [HttpModule],
    providers: [AdminUsersResolver, AdminUsersService]
})
export class Admin_userModule {}
