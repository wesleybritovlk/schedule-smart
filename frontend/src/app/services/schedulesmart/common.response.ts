export interface Response<T> {
    message: string;
    data: T;
}
export interface ResponsePage<T> {
    current_page: number;
    total_elements: number;
    page_size: number;
    empty: boolean;
    is_last: boolean;
    is_first: boolean;
    data: T;
    total_pages: number;
}
