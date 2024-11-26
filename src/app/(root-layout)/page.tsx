import { Settings2, SlidersHorizontal } from 'lucide-react';

import BlogItem from '@/components/home/Blogs';
import { Button } from '@/components/ui/button';
import { BLOG_DATAS } from '@/constants';

export default function Home() {
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
