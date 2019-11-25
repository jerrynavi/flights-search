import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { message } from 'antd';
import storageModule from 'store2';
import { STORE_NAME } from '../utils';

export class Http {
    httpClient: AxiosInstance = axios.create({
        baseURL: 'http://www.ije-api.tcore.xyz/v1/',
        responseType: 'json',
    });

    constructor() {
        this.httpClient.defaults.headers.post['Content-Type'] = 'application/json';

        this.httpClient.interceptors.request.use(async (config) => {
            const store = await storageModule.get(STORE_NAME);
            if (store) {
                const { auth } = store;
                if (auth) {
                    config.headers.common['Authorization'] = `Bearer ${auth.token}`;
                }
            }
            return config;
        });

        this.httpClient.interceptors.response.use(async (response: AxiosResponse): Promise<any> => {
            if (response.status === 200) {
                console.log(response);
                return response.data.body;
            }
        }, (error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    window.location.href = '/auth';
                }
                return message.error(error.response.body.message);
            } else if (error.request) {
                return message.error('No response from the server.');
            } else {
                console.log('Error', error.message);
            }
            return Promise.reject(error);
        });
    }

    /**
     * get
     */
    public get = (path: string, params?: any): Promise<any> => {
        return this.httpClient.get(path, {
            params
        });
    }

    /**
     * post
     */
    public post = (path: string, data: any, params?: any): Promise<any> => {
        return this.httpClient.post(path, data, {
            params
        });
    }

    /**
     * put
     */
    public put = (path: string, data: any, params?: any): Promise<any> => {
        return this.httpClient.put(path, data, {
            params
        });
    }
}