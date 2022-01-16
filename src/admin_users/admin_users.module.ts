import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import {Admin_userResolver } from './admin_users.resolver';
import {Admin_userService } from './admin_users.service';

@Module({
    imports: [HttpModule],
    providers: [Admin_userResolver, Admin_userService]
})
export class Admin_userModule {}
