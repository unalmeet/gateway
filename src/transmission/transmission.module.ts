import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TransmissionResolver } from './transmission.resolver';
import { TransmissionService } from './transmission.service';

@Module({
    imports: [HttpModule],
    providers: [TransmissionResolver, TransmissionService],
    exports: [HttpModule]
})
export class TransmissionModule { }
