'use client';

import {
  Bell,
  ChevronDown,
  LayoutList,
  LogOut,
  Pencil,
  Search,
  Settings,
  SlidersHorizontal,
  UserCog,
  UserPlus,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ModeToggle } from '@/components/ToggleTheme';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { increment } from '@/features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';

const menuItems = [
  {
    icon: UserCog,
    label: 'Profile',
    href: '/profile',
  },
  {
    icon: Pencil,
    label: 'Account details',
    href: '/account-details',
  },
  {
    icon: Zap,
    label: 'Reputation',
    href: '/reputation',
  },
  {
    icon: UserPlus,
    label: 'Invite friends',
    href: '/invite-friends',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/settings',
  },
];

const Header = () => {
  const dispatch = useAppDispatch();

  const couter = useAppSelector((state) => state.counter.value);

  return (
    <div
      className={`
        sticky left-0 top-0 z-30 flex h-16 w-full items-center justify-between
        border-b bg-background px-4
      `}
    >
      <Link href={'/'} className="flex-1 select-none text-2xl">
        <p className="font-bold">
          Blog<span className="text-primary">.dev</span>
        </p>
      </Link>

      <Button
        onClick={() => {
          dispatch(increment());
        }}
      >
        Test {couter}
      </Button>

      <div
        className={`
          hidden w-96 flex-1 items-center gap-0 rounded-lg bg-secondary px-2

          lg:flex
        `}
      >
        <Search />
        <Input className="bg-transparent" placeholder="Search" />
      </div>
      <div
        className={`
          hidden flex-1 items-center justify-end gap-3

          lg:flex
        `}
      >
        <Button className="px-6">New post</Button>
        <ModeToggle />
        <Button variant="outline" className="flex-center size-10 rounded-lg">
          <LayoutList />
        </Button>
        <Button variant="outline" className="flex-center size-10 rounded-lg">
          <Bell />
        </Button>

        <div className="flex items-center gap-2">
          <Link href={'/auth/login'}>
            <Button className="rounded-lg">Sign in</Button>
          </Link>
          <Link href={'/auth/register'}>
            <Button className="rounded-lg" variant={'outline'}>
              Sign up
            </Button>
          </Link>
        </div>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              className="flex items-center gap-2 border"
            >
              <Avatar className="size-6 rounded-lg">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm font-normal leading-none">Cao Dang Tinh</p>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-64">
            <DropdownMenuLabel>
              <div className="relative size-20 overflow-hidden rounded-lg">
                <Image
                  src={'https://github.com/shadcn.png'}
                  className=""
                  sizes="auto"
                  alt=""
                  fill
                />
              </div>
              <div className="mt-2">
                <p className="text-xl font-bold">Cao Dang Tinh</p>
                <p
                  className={`flex items-center gap-1 text-xs text-foreground/70`}
                >
                  <span>@caodangtinh</span>
                  <span>•</span>
                  <span className="text-[10px]">Joined September 2024</span>
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {menuItems.map((item) => (
              <DropdownMenuItem
                className={`flex cursor-pointer items-center gap-2`}
                key={item.label}
                asChild
              >
                <Link href={item.href}>
                  <item.icon />
                  <p>{item.label}</p>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className={`flex cursor-pointer items-center gap-2`}
            >
              <LogOut />
              <p>Sign out</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <div
        className={`
          flex items-center gap-4

          lg:hidden
        `}
      >
        <SlidersHorizontal className="size-6" />
        <Avatar className="size-8 rounded-lg">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
