export interface Trip {
    departure: {
        date: string;
        time: string;
        airport: {
            code: string;
            name: string;
            city_code: string;
            city_name: string;
            country_code: string;
            country_name: string;
            terminal: string;
        };
    };
    arrival: {
        date: string;
        time: string;
        airport: {
            code: string;
            name: string;
            city_code: string;
            city_name: string;
            country_code: string;
            country_name: string;
            terminal: string;
        };
    };
    flight_number: string;
    res_book_desig_code: string;
    flight_duration: string;
    operating_airline: {
        code: string;
        name: string;
    };
    equipment: {
        code: string;
        name: string;
    };
    marketing_airline: {
        code: string;
        name: string;
    };
    baggage: [];
    cabins: {
        rph: string;
        res_book_desig_cabin_code: string;
        res_book_desig_cabin_name: string;
    }[];
}