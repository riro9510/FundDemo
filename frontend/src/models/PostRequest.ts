// PostRequest.ts
import { AxiosResponse } from 'axios';
import { api } from '../services/api';
import { Request } from './RequestClass';

export class PostRequest<T> extends Request<T> {
  async send(): Promise<AxiosResponse<T>>{
    return this.handleRequest(async () => {
      const response = await api.post<T>(this.endpoint, this.data);
      return response;
    });
  }
}
