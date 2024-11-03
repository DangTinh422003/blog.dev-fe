'use client';
import { KeyRound, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import {
  type FormState,
  registerAccountAction,
} from '@/app/(auth-layout)/auth/action';
import FormFieldError from '@/components/FormFieldError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const initialFormState: FormState = {
  status: undefined,
};

const Register = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [formState, formAction, pending] = useActionState(
    registerAccountAction,
    initialFormState,
  );

  const handleToastify = (msg: string) => {
    toast({
      title: 'Error',
      description: msg,
    });
  };

  useEffect(() => {
    if (formState?.status === 'error') {
      toast({
        title: 'Error',
        description: formState.message || 'Something went wrong!',
        variant: 'destructive',
      });
    } else if (formState?.status === 'success') {
      toast({
        title: 'Success',
        description: 'Account created successfully',
        variant: 'default',
      });
      router.push('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <div className="rounded-xl bg-background p-6">
      <h1 className="text-center text-2xl font-bold">Signup for Blog.dev</h1>
      <p className="text-center text-sm text-muted-foreground">
        Create your free account
      </p>

      <form action={formAction} className="mt-10 flex flex-col gap-3">
        <div>
          <div className="flex h-12 items-center rounded-full bg-secondary px-6">
            <Mail size={14} className="text-muted-foreground" />
            <Input
              placeholder="Email address"
              type="text"
              name="email"
              className="border-0 bg-transparent outline-none"
            />
          </div>
          {formState?.errors?.['email'] && (
            <FormFieldError errorMsg={formState.errors?.['email'][0]} />
          )}
        </div>
        <div>
          <div className="flex h-12 items-center rounded-full bg-secondary px-6">
            <KeyRound size={14} className="text-muted-foreground" />
            <Input
              name="password"
              placeholder="Enter your password"
              type="password"
              className="border-0 bg-transparent outline-none"
            />
          </div>
          {formState?.errors?.['password'] && (
            <FormFieldError errorMsg={formState.errors?.['password'][0]} />
          )}
        </div>
        <div>
          <div className="flex h-12 items-center rounded-full bg-secondary px-6">
            <KeyRound size={14} className="text-muted-foreground" />
            <Input
              name="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              className="border-0 bg-transparent outline-none"
            />
          </div>
          {formState?.errors?.['confirmPassword'] && (
            <FormFieldError
              errorMsg={formState.errors?.['confirmPassword'][0]}
            />
          )}
        </div>
        <Button
          type="submit"
          variant={pending ? 'loading' : 'default'}
          className="rounded-full"
          disabled={pending}
        >
          Signup
        </Button>

        <div
          className={`
            flex justify-center gap-1 px-6 text-xs text-muted-foreground
          `}
        >
          <p>If you already have an account log in</p>
          <Link href={'/auth/login'} className="text-primary underline">
            here
          </Link>
        </div>

        <div className="relative my-4 w-full border-t">
          <p
            className={`
              absolute left-1/2 top-0 max-w-fit -translate-x-1/2
              -translate-y-1/2 bg-background px-2 text-center text-sm semibold
              text-muted-foreground
            `}
          >
            Or Signup With
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant={'outline'}
            type="button"
            onClick={() =>
              handleToastify('Github login Feature in development!')
            }
            className="flex flex-1 items-center justify-center text-sm"
          >
            <div className="relative size-4">
              <Image
                src={'/logo/github_logo.png'}
                className="object-contain"
                sizes="auto"
                alt=""
                fill
              />
            </div>
            <p className="translate-y-px leading-none">Github</p>
          </Button>
          <Button
            variant={'outline'}
            type="button"
            onClick={() =>
              handleToastify('Google login Feature in development!')
            }
            className="flex flex-1 items-center justify-center text-sm"
          >
            <div className="relative size-4">
              <Image
                src={'/logo/gg_logo.png'}
                className="object-contain"
                sizes="auto"
                alt=""
                fill
              />
            </div>
            <p className="translate-y-px leading-none">Google</p>
          </Button>
          <Button
            variant={'outline'}
            type="button"
            onClick={() =>
              handleToastify('Facebook login Feature in development!')
            }
            className="flex flex-1 items-center justify-center text-sm"
          >
            <div className="relative size-4">
              <Image
                src={'/logo/fb_logo.png'}
                className="object-contain"
                sizes="auto"
                alt=""
                fill
              />
            </div>
            <p className="translate-y-px leading-none">Facebook</p>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
