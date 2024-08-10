import { fetchRequest, FetchOptions, authInterceptor, responseInterceptor, errorInterceptor } from '@/app/_api/fetch-config';
import { SignUpRequest } from './types';

export const signUp = async (props: SignUpRequest) => {
  const { username, email, password } = props;
  const options: FetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
    requestInterceptors: [authInterceptor],
    responseInterceptors: [responseInterceptor],
    errorInterceptors: [errorInterceptor],
  };

  try {
    const data = await fetchRequest('/sign-up', options);
    console.log('Sign-up successful:', data);
    return data; // Returning data for further use
  } catch (error) {
    console.error('Sign-up failed:', error);
    throw error; // Rethrowing error to handle it at the call site
  }
};