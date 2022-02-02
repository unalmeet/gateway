
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
export class HttpResponse<T> extends Observable<AxiosResponse<T>>{
  
}