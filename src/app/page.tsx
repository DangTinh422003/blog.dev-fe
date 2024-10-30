import { Settings2 } from 'lucide-react';

import BlogItem from '@/components/home/blog';
import { Button } from '@/components/ui/button';

const data = [
  {
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
export default function Home() {
  return (
    <div className="lg:px-[30px]">
      <div className="mb-[24px] flex justify-between">
        <Button
          className={`
            bg-[#1c1f26] text-[#A8B3CF]

            hover:bg-[#a8b3cf1f] hover:text-primary

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
          className={`
            bg-transparent text-[#A8B3CF]

            hover:bg-transparent hover:text-primary

            lg:bg-[#1c1f26]
          `}
        >
          Feed Settings
          <Settings2 size={24} className="" />
        </Button>
      </div>
      <div
        className={`
          grid grid-cols-1 gap-8

          lg:grid-cols-2

          xl:grid-cols-3
        `}
      >
        {data.map((item, index) => (
          <BlogItem key={index} blog={item} />
        ))}
      </div>
    </div>
  );
}
