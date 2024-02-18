export interface DataStructYear {
    year: string;
    total: number;
    range: {
        start: string;
        end: string;
    };
}
export interface DataStructContribution {
    date: string;
    count: number;
    color: string;
    intensity: number;
}
export interface DataStruct {
    years: DataStructYear[];
    contributions: DataStructContribution[];
}

