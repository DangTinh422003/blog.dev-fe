'use client';
import { KeyRound, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const { toast } = useToast();

  const handleToastify = (msg: string) => {
    toast({
      title: 'Error',
      description: msg,
    });
  };

  return (
    <div className="rounded-xl bg-background p-6">
      <h1 className="text-center text-2xl font-bold">Signup for Blog.dev</h1>
      <p className="text-center text-sm text-muted-foreground">
        Create your free account
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
        <div className="flex h-12 items-center rounded-full bg-secondary px-6">
          <KeyRound size={14} className="text-muted-foreground" />
          <Input
            placeholder="Confirm your password"
            type="password"
            className="border-0 bg-transparent outline-none"
          />
        </div>
        <Button type="submit" className="rounded-full">
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

        <div className="flex items-center gap-2">
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
      </div>
    </div>
  );
};

export default Register;
