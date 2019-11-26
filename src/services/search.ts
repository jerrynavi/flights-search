import { Http } from './http';
import { SearchData } from '../interfaces/SearchData';

export class SearchService {
    private http: Http;
    constructor() {
        this.http = new Http();
    }

    /**
     * searchForFlights
     */
    public searchForFlights = async (searchData: SearchData): Promise<any> => {
        const res = await this.http.post('flight/search-flight', {
            header: {
                cookie: ''
            },
            body: searchData
        });
        return res;
    }
}