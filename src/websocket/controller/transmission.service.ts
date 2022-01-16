import { Injectable } from '@nestjs/common';
import { Broadcast, TransmissionService as TransmissionApi } from 'src/transmission';

@Injectable()
export class TransmissionService {
    constructor(private transmissionApi: TransmissionApi) { }

    public processVideo(): Promise<Broadcast> {
        let data = { token: '', idSession: [0], media: {} as Int8Array } as Broadcast;
        return this.transmissionApi.broadcastVideo(data);
    }
}
