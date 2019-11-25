import { BaseInterface } from './BaseInterface';

export interface User extends BaseInterface {
    email: string;
    api_token: string;
}