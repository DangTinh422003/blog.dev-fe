'use client';

import { cva } from 'class-variance-authority';
import { ChevronUp, Settings2, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

import BlogItem from '@/components/home/Blogs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const data: {
  id: string;
  name: string;
  title: string;
  avatar: string;
  category: string[];
  readTime: string;
  createdAt: Date;
  image: string;
  upVote: number;
  downVote: number;
  comment: number;
}[] = [
  {
    id: '1',
    name: 'Nguyen Khanh Huan',
    title: 'Understand and Using Javascript Console Api',
    avatar:
      'https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1655817725/logos/community',
    category: ['Understand', 'and', 'Using', 'Javascript', 'Console', 'Api'],
    readTime: '2 min read',
    createdAt: new Date(),
    image:
      'https://i.pinimg.com/736x/b1/0c/fb/b10cfb56a87e574d9f2cec10c90d2fc8.jpg',
    upVote: 100,
    downVote: 10,
    comment: 20,
  },
  {
    id: '2',
    name: 'Cao Dang Tinh',
    title:
      'Understand and Using Javascript Console Api Understand and Using Javascript Console Api Understand and Using Javascript Console Api Understand and Using Javascript Console Api',
    avatar:
      'https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1655817725/logos/community',
    category: ['Understand', 'and', 'Using'],
    readTime: '2 min read',
    createdAt: new Date(),
    image:
      'https://i.pinimg.com/564x/19/25/6d/19256daeaca8505c5f782746c6ed2375.jpg',
    upVote: 3000,
    downVote: 40000,
    comment: 15000,
  },
  {
    id: '3',
    name: 'Truong Thai Dan Huy',
    title: 'Understand and Using Javascript Console Api Understand',
    avatar:
      'https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1655817725/logos/community',
    category: ['Understand', 'and', 'Using'],
    readTime: '2 min read',
    createdAt: new Date(),
    image:
      'https://i.pinimg.com/564x/87/5b/6b/875b6baa127ca5dbf1e2aa025a8b892b.jpg',
    upVote: 3000,
    downVote: 5,
    comment: 2000,
  },
  {
    id: '4',
    name: 'Truong Dinh Van',
    title:
      'Understand and Using Javascript Console Api Understand and Using Javascript Console Api ',
    avatar:
      'https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1655817725/logos/community',
    category: ['Understand', 'and', 'Using', 'Javascript', 'Console', 'Api'],
    readTime: '2 min read',
    createdAt: new Date(),
    image:
      'https://i.pinimg.com/564x/19/25/6d/19256daeaca8505c5f782746c6ed2375.jpg',
    upVote: 3000,
    downVote: 5,
    comment: 20000,
  },
  {
    id: '5',
    name: 'Cao Dang Tinh',
    title:
      'Understand and Using Javascript Console Api Understand and Using Javascript Console Api ',
    avatar:
      'https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1655817725/logos/community',
    category: ['Understand', 'and', 'Using'],
    readTime: '2 min read',
    createdAt: new Date(),
    image:
      'https://i.pinimg.com/564x/19/25/6d/19256daeaca8505c5f782746c6ed2375.jpg',
    upVote: 3000,
    downVote: 40000,
    comment: 15000,
  },
  {
    id: '6',
    name: 'Truong Thai Dan Huy',
    title: 'Understand and Using Javascript Console Api Understand',
    avatar:
      'https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1655817725/logos/community',
    category: ['Understand', 'and', 'Using'],
    readTime: '2 min read',
    createdAt: new Date(),
    image:
      'https://i.pinimg.com/564x/87/5b/6b/875b6baa127ca5dbf1e2aa025a8b892b.jpg',
    upVote: 3000,
    downVote: 5,
    comment: 2000,
  },
  {
    id: '7',
    name: 'Truong Dinh Van',
    title:
      'Understand and Using Javascript Console Api Understand and Using Javascript Console Api ',
    avatar:
      'https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1655817725/logos/community',
    category: ['Understand', 'and', 'Using', 'Javascript', 'Console', 'Api'],
    readTime: '2 min read',
    createdAt: new Date(),
    image:
      'https://i.pinimg.com/564x/19/25/6d/19256daeaca8505c5f782746c6ed2375.jpg',
    upVote: 3000,
    downVote: 5,
    comment: 20000,
  },
];

const buttonToTopVariants = cva(
  `
    fixed bottom-3 right-3 size-8 rounded-lg flex-center cursor-pointer bg-white
    text-black

    hover:opacity-90

    md:size-10
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

export default function Home() {
  const [showTopPage, setShowTopPage] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        setShowTopPage(true);
      } else {
        setShowTopPage(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  const handleClickToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`
        lg:px-12

        xl:px-8
      `}
    >
      <div
        className={`
          mb-6 hidden justify-between

          sm:flex
        `}
      >
        <Button
          className={`
            bg-secondary text-textGray

            hover:bg-buttonHover hover:text-primary

            lg:hidden
          `}
        >
          <SlidersHorizontal />
          <span>2 reading days</span>
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

          xl:grid-cols-3
        `}
      >
        {data.map((item) => (
          <BlogItem key={item.id} blog={item} />
        ))}
      </div>
      <div
        className={buttonToTopVariants({
          state: showTopPage ? 'active' : 'inactive',
        })}
        onClick={handleClickToTop}
      >
        <ChevronUp size={20} />
      </div>
    </div>
  );
}
