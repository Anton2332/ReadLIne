/* eslint-disable no-console */
// eslint-disable-next-line max-classes-per-file
import { HttpMethods, IHttpClient, IMockDB, IMockDbRawData } from '../types';

export class MockDB implements IMockDB {
  public static instance: MockDB | null = null;

  private db: Map<string, Map<HttpMethods, any>> = new Map();

  public static connection() {
    if (this.instance === null) {
      this.instance = new MockDB();
    }
    return this.instance;
  }

  getRecord(url: string, method: HttpMethods) {
    return this.db.get(url)?.get(method);
  }

  addRecord(url: string, methods: IMockDbRawData): void {
    console.log(`[Record Added] URL: ${url}`);
    // eslint-disable-next-line guard-for-in

    Object.entries(methods).forEach(([key, value]) => {
      console.log(`Method: ${key.toUpperCase()}`);
      console.log(`Data: ${JSON.stringify(value)}`);
    });

    this.db.set(url, new Map(Object.entries(methods) as any));
  }
}

export class MockHttpClient implements IHttpClient {
  FAKE_DELAY = 500;

  constructor(protected db: MockDB) {}

  public async get<R>(url: string): Promise<R> {
    console.log(url);
    return this.fakeDelayPromise(this.db.getRecord(url, HttpMethods.GET));
  }

  public post<R, D>(url: string, data: D): Promise<R> {
    console.log('Data that comes to body:', data);
    return this.fakeDelayPromise(this.db.getRecord(url, HttpMethods.POST));
  }

  public put<R, D>(url: string, data: D): Promise<R> {
    console.log('Data that comes to body:', data);
    return this.fakeDelayPromise(this.db.getRecord(url, HttpMethods.PUT));
  }

  public delete<R>(url: string): Promise<R> {
    return this.fakeDelayPromise(this.db.getRecord(url, HttpMethods.DELETE));
  }

  private fakeDelayPromise<T>(data: T): Promise<T> {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(data);
      }, this.FAKE_DELAY)
    );
  }
}
