import { fetchConfig } from "./configs";
import { FetchOptions } from "./types";

export const fetchRequest = async <T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> => {
    let config = fetchConfig(options);
    const retryLimit = config.retryLimit ?? 3; // Default to 3 retries
    const retryDelay = config.retryDelay ?? 1000; // Default to 1 second

    // Apply request interceptors
    if (config.requestInterceptors) {
        for (const interceptor of config.requestInterceptors) {
            config = await interceptor(config);
        }
    }

    let attempt = 0;

    while (attempt < retryLimit) {
        try {
            const response = await fetch(`${config.baseUrl || ''}${endpoint}`, config);

            if (!response.ok) {
                // Apply error interceptors
                if (config.errorInterceptors) {
                    for (const interceptor of config.errorInterceptors) {
                        await interceptor(new Error(`HTTP error! status: ${response.status}`));
                    }
                }
                
                // Handle HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Apply response interceptors
            let responseData = await response.json();
            if (config.responseInterceptors) {
                for (const interceptor of config.responseInterceptors) {
                    responseData = await interceptor(responseData);
                }
            }

            return responseData;
        } catch (error) {
            attempt++;

            // Apply error interceptors
            if (config.errorInterceptors) {
                for (const interceptor of config.errorInterceptors) {
                    await interceptor(error);
                }
            }

            if (attempt >= retryLimit) {
                throw error;
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }

    throw new Error("Failed to fetch after several retries.");
};
