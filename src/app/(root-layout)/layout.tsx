import { type PropsWithChildren } from 'react';

import GoToTop from '@/components/GoToTopPage';
import DesktopMenu from '@/components/layouts/DesktopMenu';
import Header from '@/components/layouts/Header';

const RootLayout = ({ children }: PropsWithChildren) => {
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
      <GoToTop />
    </div>
  );
};

export default RootLayout;
