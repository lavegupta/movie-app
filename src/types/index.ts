
export interface Movie {
    Title: string;
    Year: number;
    imdbID: string;
    favourite?: boolean;
}

export interface Pagination {
    page: number,
    total_pages: number,
}