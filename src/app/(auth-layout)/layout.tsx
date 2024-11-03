import Link from 'next/link';
import { type PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`
        h-screen w-screen grid-cols-2 bg-secondary

        md:grid
      `}
    >
      <div
        className={`
          relative hidden bg-[url(/login_bg.webp)] bg-cover bg-center

          md:block
        `}
      >
        <Link
          href={'/'}
          className="ml-20 mt-20 block text-4xl font-bold text-white"
        >
          Blog.dev
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <div
          className={`
            flex size-full h-screen max-w-md items-center justify-center
            shadow-sm
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
