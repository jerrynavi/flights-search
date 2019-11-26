import { Http } from './http';

export class TypeaheadService {
    private http: Http;
    constructor() {
        this.http = new Http();
    }

    /**
     * getCities
     */
    public getCities = async (input: string): Promise<any> => {
        const res = await this.http.get(`plugins/cities-type-ahead/${input}`);
        return res;
    }
}