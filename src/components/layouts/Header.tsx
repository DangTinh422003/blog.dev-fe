'use client';

import dayjs from 'dayjs';
import {
  Bell,
  ChevronDown,
  LayoutList,
  LogOut,
  Pencil,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  UserCog,
  UserPlus,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
import { useToast } from '@/hooks/use-toast';
import authApiService from '@/stores/features/auth/auth.service';
import { selectUser, setUser } from '@/stores/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/stores/store';

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
  const { toast } = useToast();

  const userLogined = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await authApiService.logout();

      dispatch(setUser(null));
    } catch (error) {
      toast({
        title: 'Sign out failed',
        description: 'Something went wrong, please try again later',
      });
    }
  };

  return (
    <div
      className={`
        sticky left-0 top-0 z-30 flex h-16 w-full items-center justify-between
        border-b bg-background px-4
      `}
    >
      <Link href={'/'} className="flex-1 select-none text-2xl">
        <div className="relative h-10 w-36">
          <Image
            src={'/logo.png'}
            alt=""
            sizes="auto"
            fill
            className="object-contain"
          />
        </div>
      </Link>

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
        <Button className="flex items-center gap-1 px-6">
          <Plus size={10} />
          <p>New post</p>
        </Button>
        {/* <ModeToggle /> */}
        <Button variant="outline" className="flex-center size-10 rounded-lg">
          <LayoutList />
        </Button>
        <Button variant="outline" className="flex-center size-10 rounded-lg">
          <Bell />
        </Button>

        {!userLogined ? (
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
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={'ghost'}
                className="flex items-center gap-2 border"
              >
                <Avatar className="size-6 rounded-lg">
                  <AvatarImage
                    src={userLogined.avatar || 'https://github.com/shadcn.png'}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <p className="text-sm font-normal leading-none">
                  {userLogined.fullName}
                </p>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-64">
              <DropdownMenuLabel>
                <div className="relative size-20 overflow-hidden rounded-lg">
                  <Image
                    src={userLogined.avatar || 'https://github.com/shadcn.png'}
                    className=""
                    sizes="auto"
                    alt=""
                    fill
                  />
                </div>
                <div className="mt-2">
                  <p className="text-xl font-bold">{userLogined.fullName}</p>
                  <p
                    className={`
                      flex items-center gap-1 text-xs text-foreground/70
                    `}
                  >
                    <span className="text-[10px]">
                      Joined{' '}
                      {dayjs(userLogined.createdAt).format('MMMM DD - YYYY')}
                    </span>
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
                onClick={handleLogout}
              >
                <LogOut />
                <p>Sign out</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
