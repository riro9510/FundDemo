// GetRequest.ts
import { AxiosResponse } from 'axios';
import { api } from '../services/api';
import { Request } from './RequestClass';

export class GetRequest<T> extends Request<T> {
  async send(): Promise<AxiosResponse<T>> {
    return this.handleRequest(async () => {
      const response = await api.get<T>(this.endpoint);
      return response;
    });
  }
}
