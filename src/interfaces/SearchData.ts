export interface SearchData {
    origin_destinations: {
        departure_city: string;
        destination_city: string;
        departure_date: string;
        return_date: string;
    }[];
    search_param: {
        no_of_adult: number;
        no_of_child: number;
        no_of_infant: number;
        preferred_airline_code: string;
        calendar: boolean;
        cabin: 'First' | 'Business' | 'Economy' | 'All';
    };
}