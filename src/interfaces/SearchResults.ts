import { FlightData } from './FlightData';

export interface SearchResults {
    header: {
        cookie: string;
    };
    body: {
        message: string;
        data: {
            has_more_result: string;
            itineraries: FlightData[];
            one_way_combinable_fares: any[];
        };
    };
}