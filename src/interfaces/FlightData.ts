import { Trip } from './Trip';

export interface FlightData {
    cabin: {
        code: string;
        name: string;
    };
    combination_id: string;
    origin_destinations: {
        direction_id: string;
        elapsed_time: string;
        option_pricing_info: string;
        ref_number: string;
        segments: Trip[];
    }[];
    pricing: {
        portal_fare: any;
        provider: any;
        sequence_number: string;
        validating_airline_code: string;
    };
}