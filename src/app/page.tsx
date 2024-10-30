import { Settings2 } from 'lucide-react';

import BlogItem from '@/components/home/blog';
import { Button } from '@/components/ui/button';

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
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
      </div>
    </div>
  );
}
