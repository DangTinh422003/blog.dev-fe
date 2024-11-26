import { AxiosError } from 'axios';
import { z } from 'zod';

import authApiService from '@/stores/features/auth/auth.service';

export interface FormState<T = any> {
  status: 'success' | 'error' | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
  data?: T;
}

const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(25, 'Username must be at most 20 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

export async function registerAccountAction(
  prevState: any,
  formData: FormData,
): Promise<FormState> {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const validateFields = registerFormSchema.safeParse({
    username,
    email,
    password,
    confirmPassword,
  });

  if (!validateFields.success) {
    const formState: FormState = {
      status: 'error',
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Oops! Something went wrong',
    };

    return formState;
  }

  try {
    await authApiService.register({
      username,
      email,
      password,
      confirmPassword,
    });

    return {
      status: 'success',
      message: 'Account created successfully',
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        status: 'error',
        message: error.response?.data?.message || 'Oops! Something went wrong',
      };
    }

    return {
      status: 'error',
      message: 'Oops! Something went wrong',
    };
  }
}

const loginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function login(
  prevState: any,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validateFields = loginFormSchema.safeParse({
    email,
    password,
  });

  if (!validateFields.success) {
    const formState: FormState = {
      status: 'error',
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Oops! Something went wrong',
    };

    return formState;
  }

  try {
    const res = await authApiService.login(email, password);
    return {
      status: 'success',
      data: res.data,
      message: res.message,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        status: 'error',
        message: error.response?.data?.message || 'Oops!! Something went wrong',
      };
    }

    return {
      status: 'error',
      message: 'Oops!!! Something went wrong',
    };
  }
}
