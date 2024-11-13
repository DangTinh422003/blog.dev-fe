'use client';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mobileMenuItems = [
  {
    title: 'For you',
    href: '/',
  },
  {
    title: 'Discussions',
    href: '/discussions',
  },
  {
    title: 'Tags',
    href: '/tags',
  },
  {
    title: 'Sources',
    href: '/sources',
  },
  {
    title: 'Leaderboard',
    href: '/leaderboard',
  },
  {
    title: 'Bookmarks',
    href: '/bookmarks',
  },
  {
    title: 'History',
    href: '/history',
  },
];

const linkVariants = cva('shrink-0 border-b-2 p-4', {
  variants: {
    state: {
      active: 'text-primary border-b-primary',
      inactive: '',
    },
  },
  defaultVariants: {
    state: 'inactive',
  },
});
const MobileMenu = () => {
  const pathName = usePathname();
  return (
    <div
      className={`
        sticky left-0 top-16 z-10 h-14 w-full bg-background

        md:hidden
      `}
    >
      <div
        className={`
          flex flex-row gap-2 overflow-x-auto no-scrollbar

          [&::-webkit-scrollbar]:w-0
        `}
      >
        {mobileMenuItems.map((item) => {
          return (
            <Link
              key={item.title}
              href={item.href}
              className={linkVariants({
                state: pathName.includes(item.href) ? 'active' : 'inactive',
              })}
            >
              <p className="text-center font-bold">{item.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;
