import Link from 'next/link';
import { type PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid h-screen w-screen grid-cols-2 bg-secondary">
      <Link
        href={'/'}
        className="relative bg-[url(/login_bg.webp)] bg-cover bg-center"
      >
        <h2 className="ml-20 mt-20 text-4xl font-bold text-white">Blog.dev</h2>
      </Link>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md shadow-sm">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
