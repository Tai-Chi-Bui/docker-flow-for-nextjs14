import { RequestInterceptor, ResponseInterceptor, ErrorInterceptor } from '@/app/_api/fetch-config';

const TIMEOUT_MS = 5000; // Timeout duration in milliseconds


export const authInterceptor: RequestInterceptor = async (config) => {
    // Create a new AbortController instance
    const controller = new AbortController();

    // Set a timeout to abort the request if it takes too long
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    // Clean up the timeout if the request completes
    config.signal = controller.signal;
    config.headers = {
        ...config.headers,
        credentials: 'include', // Ensure cookies are sent with the request
    };

    // Clear the timeout when request is done or error
    try {
        return config;
    } finally {
        clearTimeout(timeoutId);
    }
};

export const responseInterceptor: ResponseInterceptor = async (response) => {
    // Check if the response is not OK
    if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    // Parse and return JSON response
    return response.json();
};

export const errorInterceptor: ErrorInterceptor = async (error) => {
    // Check if the error is due to a timeout
    if (error.message === 'Request timed out') {
        console.error('Request timed out:', error);
    } else {
        console.error('An error occurred during the fetch request:', error);
    }
    throw error;
};

