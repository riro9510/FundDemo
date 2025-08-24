
import { AxiosResponse } from 'axios';
export abstract class Request<T> {
  constructor(protected endpoint: string, protected data?: unknown) {}

  abstract send(): Promise<AxiosResponse<T>>;

  protected async handleRequest(fetchFunction: () => Promise<AxiosResponse<T>>): Promise<AxiosResponse<T>> {
    try {
      return await fetchFunction();
    } catch (error) {
      console.error(`Error in request to ${this.endpoint}:`, error);
      throw error;
    }
  }
}