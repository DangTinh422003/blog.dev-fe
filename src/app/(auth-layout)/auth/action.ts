import { AxiosError } from 'axios';
import { z } from 'zod';

import { axiosInstance } from '@/services/http.service';

export interface FormState {
  status: 'success' | 'error' | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
}

const registerFormSchema = z
  .object({
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
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const validateFields = registerFormSchema.safeParse({
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
    await axiosInstance.post('/access/sign-up', {
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
