import { FetchOptions } from "./types";

export const fetchConfig = (options: FetchOptions = {}): FetchOptions => {
    const { baseUrl = process.env.BASE_URL ?? '', headers = {}, ...restOptions } = options;

    const isFormData = restOptions.body instanceof FormData;

    const defaultHeaders: HeadersInit = {
        ...(!isFormData && { 'Content-Type': 'application/json' }), // Set default Content-Type if not FormData
        ...headers,
    };

    return {
        baseUrl,
        headers: defaultHeaders,
        ...restOptions,
    };
};


