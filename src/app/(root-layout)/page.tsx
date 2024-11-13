'use client';

import { Settings2 } from 'lucide-react';
import { useState } from 'react';

import BlogItem from '@/components/home/Blogs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { BLOG_DATAS } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import authApiService from '@/stores/features/auth/auth.service';
import { selectUser } from '@/stores/features/auth/authSlice';
import { useAppSelector } from '@/stores/store';

export default function Home() {
  const [username, setUsername] = useState('');

  const { toast } = useToast();

  const user = useAppSelector(selectUser);

  const handleActiveUser = async () => {
    try {
      const test = await authApiService.activeUser(user?.email as string, {
        username,
      });
      console.log('🚀 ~ handleActiveUser ~ test:', test);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again!',
        variant: 'destructive',
      });
    }
  };

  return (
    <div
      className={`
        px-8

        lg:px-12

        sm:px-2

        xl:px-8
      `}
    >
      <div
        className={`
          mb-6 hidden justify-between

          sm:flex
        `}
      >
        {user?.isActivated && (
          <Dialog open={true}>
            <DialogContent
              className={`
                [&>button]:hidden

                sm:max-w-[425px]
              `}
            >
              <DialogHeader>
                <DialogTitle>Update your profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>

              <Input
                placeholder="Enter your name..."
                className="bg-primary/10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <DialogFooter>
                <Button type="button" onClick={handleActiveUser}>
                  Update
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        <Button
          className={`
            bg-secondary text-textGray

            hover:bg-buttonHover hover:text-primary

            lg:hidden
          `}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none -ml-2 mr-1 size-7 !h-6 !w-6 text-base"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm1.09-18.665l-.603-.77a.698.698 0 00-1.14.031c-1.12 1.635-.986 3.612-.206 5.09l.332.634.275.54.22.444.115.244.09.202.074.199c.192.6.134 1.221-.163 1.747-.449.78-1.178.963-1.864.845-1.123-.193-1.463-1.473-1.566-2.947l-.022-.388-.013-.394-.009-.593-.001-.585-.004-.136c-.037-.686-.377-.694-1.017-.025-1.796 1.875-2.099 4.749-.753 7.175 1.01 1.85 3.058 3.067 5.152 3.067.088 0 .178-.003.27-.007 2.166-.11 4.255-1.544 5.183-3.56a5.99 5.99 0 00.468-3.566c-.283-1.556-1.096-2.587-2.18-3.96a112.52 112.52 0 01-.392-.499l-.526-.663-.839-1.032-.88-1.093z"
              fill="#FC538D"
            ></path>
          </svg>
          2 reading days
        </Button>
        <Button
          variant={'outline'}
          className={`
            text-textGray

            hover:bg-buttonHover hover:text-primary

            lg:bg-secondary
          `}
        >
          Feed Settings
          <Settings2 size={24} />
        </Button>
      </div>
      <div
        className={`
          grid grid-cols-1 gap-8

          2xl:grid-cols-4

          lg:grid-cols-2

          sm:grid-cols-2

          xl:grid-cols-3
        `}
      >
        {BLOG_DATAS.map((item) => (
          <BlogItem key={item.id} blog={item} />
        ))}
      </div>
    </div>
  );
}
