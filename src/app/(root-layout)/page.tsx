'use client';

import { cva } from 'class-variance-authority';
import { ChevronUp, Settings2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import BlogItem from '@/components/home/Blogs';
import { Button } from '@/components/ui/button';

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
        <ChevronUp size={32} />
      </div>
    </div>
  );
}
