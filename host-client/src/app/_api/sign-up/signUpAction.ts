
'use server'
import { z } from 'zod'
import { signUp } from './signUp';

const schema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
})

export const signUpAction = async (_prevState: any, formData: FormData) => {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm-password') as string;

  // Validate email
  const validatedFields = schema.safeParse({
    email: email,
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Validate password
  if (password !== confirmPassword) {
    console.log('Passwords do not match!');
    return {
      message: 'Passwords do not match!',
    };
  }

  try {
    await signUp({ username, email, password });
    console.log('Sign-up successful!');
  } catch (error) {
    console.error('Sign-up error:', error);
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: 'Unknown Error' }
  }
};
