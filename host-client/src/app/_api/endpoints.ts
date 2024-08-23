
const apiBase = process.env.NEXT_PUBLIC_BASE_URL;

export const endpoints = {
    auth: {
      signUp: `${apiBase}/users/signup`,
      login: `${apiBase}/users/login`,
    },
  };
  
