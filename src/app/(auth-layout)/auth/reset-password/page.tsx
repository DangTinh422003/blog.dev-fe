import { Mail } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ResetPassword = () => {
  return (
    <div className="rounded-xl bg-background p-6">
      <h1 className="text-center text-2xl font-bold">
        Reset your password in Blog.dev
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        We&apos;ll email you a magic code for <br /> reset password
      </p>

      <div className="mt-10 flex flex-col gap-3">
        <div className="flex h-12 items-center rounded-full bg-secondary px-6">
          <Mail size={14} className="text-muted-foreground" />
          <Input
            placeholder="Email address"
            type="text"
            className="border-0 bg-transparent !outline-none"
          />
        </div>
        <Button type="submit" className="rounded-full">
          Continue
        </Button>
        <div
          className={`
            flex items-center justify-end px-6 text-xs text-muted-foreground
            underline
          `}
        >
          <Link href={'/auth/login'}>Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
