import { STORAGE_KEYS } from '../consts/app-keys.const';
import { IHttpClient, IHttpConfig, IMap } from '../types';
import { HttpService } from './http.service';

export class EnhancedWithAuthHttpService implements IHttpClient {
  constructor(private httpService: HttpService) {}

  public createQueryLink(base: string, parameters: IMap) {
    return this.httpService.createQueryLink(base, parameters);
  }

  public get<R>(url: string, config: IHttpConfig = {}): Promise<R | void> {
    return this.httpService.get<R>(url, this.attachAuthHeader(config));
  }

  public post<R, D>(url: string, data: D, config: IHttpConfig = {}): Promise<R | void> {
    return this.httpService.post<R, D>(url, data, this.attachAuthHeader(config));
  }

  public put<R, D>(url: string, data: D, config: IHttpConfig = {}): Promise<R | void> {
    return this.httpService.put<R, D>(url, data, this.attachAuthHeader(config));
  }

  public delete<R>(url: string, config: IHttpConfig = {}): Promise<R | void> {
    return this.httpService.delete<R>(url, this.attachAuthHeader(config));
  }

  private attachAuthHeader(config: IHttpConfig): IHttpConfig {
    return {
      ...config,
      headers: { ...config.headers, ...this.populateTokenToHeaderConfig() }
    };
  }

  private populateTokenToHeaderConfig(): object {
    return {
      Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`
    };
  }
}
