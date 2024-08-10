export interface FetchOptions extends RequestInit {
    baseUrl?: string;
    endPoint?: string;
    retryLimit?: number;
    retryDelay?: number;
    headers?: HeadersInit;
    requestInterceptors?: RequestInterceptor[];
    responseInterceptors?: ResponseInterceptor[];
    errorInterceptors?: ErrorInterceptor[];
}

export type RequestInterceptor = (
    config: FetchOptions
) => FetchOptions | Promise<FetchOptions>;

export type ResponseInterceptor<T = any> = (
    response: Response
) => T | Promise<T>;

export type ErrorInterceptor = (
    error: any
) => any | Promise<any>;

