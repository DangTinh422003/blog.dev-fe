'use client';

import { cva } from 'class-variance-authority';
import {
  Atom,
  Bookmark,
  Eye,
  Flame,
  Hash,
  Link as LinkIcon,
  MessageCircleCode,
  Plus,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const desktopMenuItems = [
  {
    groupTitle: 'Squads',
    items: [
      {
        icon: Atom,
        label: 'Public Squads',
        href: '/public-squads',
      },
      {
        icon: Plus,
        label: 'New squads',
        href: '/new-squads',
      },
    ],
  },
  {
    groupTitle: 'Discover',
    items: [
      {
        icon: Flame,
        label: 'Explore',
        href: '/explore',
      },
      {
        icon: MessageCircleCode,
        label: 'Discussions',
        href: '/discussions',
      },
      {
        icon: Hash,
        label: 'Tags',
        href: '/tags',
      },
      {
        icon: Users,
        label: 'Leaderboard',
        href: '/leader-board',
      },
    ],
  },
  {
    groupTitle: 'Activity',
    items: [
      {
        icon: LinkIcon,
        label: 'Submit a link',
        href: '/submit-link',
      },
      {
        icon: Bookmark,
        label: 'Bookmarks',
        href: '/bookmarks',
      },
      {
        icon: Eye,
        label: 'History',
        href: '/history',
      },
    ],
  },
];

const linkVariants = cva(
  `
    flex items-center justify-center gap-3 py-3 transition-all

    hover:bg-secondary hover:text-white

    lg:justify-start lg:px-6 lg:py-2
  `,
  {
    variants: {
      state: {
        active: 'text-white bg-secondary',
        inactive: '',
      },
    },
    defaultVariants: {
      state: 'inactive',
    },
  },
);

const DesktopMenu = () => {
  const pathname = usePathname();

  return (
    <div
      className={`
        fixed left-0 top-16 hidden h-screen overflow-y-auto overflow-x-hidden
        border-r

        lg:w-60

        md:block md:w-16
      `}
    >
      {desktopMenuItems.map((i) => (
        <div key={i.groupTitle} className="my-4 text-muted-foreground">
          <p
            className={`
              hidden px-4 text-sm font-bold

              lg:block
            `}
          >
            {i.groupTitle}
          </p>
          <nav className="mt-2 flex flex-col gap-1 font-normal">
            {i.items.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className={linkVariants({
                  state: pathname.includes(item.href) ? 'active' : 'inactive',
                })}
              >
                <item.icon className={`size-5`} />
                <p
                  className={`
                    hidden text-sm

                    lg:block
                  `}
                >
                  {item.label}
                </p>
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </div>
  );
};

export default DesktopMenu;
