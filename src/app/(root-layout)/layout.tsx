'use client';
import { cva } from 'class-variance-authority';
import { ChevronUp } from 'lucide-react';
import { type PropsWithChildren } from 'react';

import DesktopMenu from '@/components/layouts/DesktopMenu';
import Header from '@/components/layouts/Header';
import { useToTopPage } from '@/hooks/useToTopPage';

const buttonToTopVariants = cva(
  `
    fixed bottom-3 right-3 size-8 rounded-xl flex-center cursor-pointer bg-white
    text-black

    hover:opacity-90

    md:size-16

    sm:size-12
  `,
  {
    variants: {
      state: {
        active: 'flex',
        inactive: 'hidden',
      },
    },
    defaultVariants: {
      state: 'inactive',
    },
  },
);

const RootLayout = ({ children }: PropsWithChildren) => {
  const { showTopPage, handleClickToTop } = useToTopPage();
  return (
    <div className="flex flex-col">
      <Header />
      <div className="relative flex flex-1">
        <DesktopMenu />
        <div
          className={`
            mt-3 flex-1 px-2 pb-14

            lg:ml-60 lg:mt-6 lg:px-6 lg:pb-0

            md:ml-16 md:px-4
          `}
        >
          {children}
        </div>
      </div>
      <div
        className={buttonToTopVariants({
          state: showTopPage ? 'active' : 'inactive',
        })}
        onClick={handleClickToTop}
      >
        <ChevronUp size={32} />
      </div>
    </div>
  );
};

export default RootLayout;
