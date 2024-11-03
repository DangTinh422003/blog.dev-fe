'use client';
import { KeyRound, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const LoginPage = () => {
  const { toast } = useToast();

  const handleToastify = (msg: string) => {
    toast({
      title: 'Error',
      description: msg,
    });
  };

  return (
    <div className="rounded-xl bg-background p-6">
      <h1 className="text-center text-2xl font-bold">Login to Blog.dev</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        We&apos;ll email you a magic code for a <br /> password-free sign in
      </p>

      <div className="mt-10 flex flex-col gap-3">
        <div className="flex h-12 items-center rounded-full bg-secondary px-6">
          <Mail size={14} className="text-muted-foreground" />
          <Input
            placeholder="Email address"
            type="text"
            className="border-0 bg-transparent outline-none"
          />
        </div>
        <div className="flex h-12 items-center rounded-full bg-secondary px-6">
          <KeyRound size={14} className="text-muted-foreground" />
          <Input
            placeholder="Enter your password"
            type="password"
            className="border-0 bg-transparent outline-none"
          />
        </div>
        <Button type="submit" className="rounded-full">
          Login
        </Button>
        <div
          className={`
            flex justify-end px-6 text-xs text-muted-foreground underline
          `}
        >
          <Link href={'/auth/reset-password'}>Forget password</Link>
        </div>

        <div className="relative my-4 w-full border-t">
          <p
            className={`
              absolute left-1/2 top-0 max-w-fit -translate-x-1/2
              -translate-y-1/2 bg-background px-2 text-center text-sm
              font-semibold text-muted-foreground
            `}
          >
            Or Login With
          </p>
        </div>

        <div className="flex items-center gap-2 justify-center flex-wrap">
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
        <div
          className={`
            mt-6 flex justify-center gap-2 text-xs text-muted-foreground
          `}
        >
          <p>Don&apos;t have an account yet?</p>
          <Link href={'/auth/register'} className="text-primary underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
