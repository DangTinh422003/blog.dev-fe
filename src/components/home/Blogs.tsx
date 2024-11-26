import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface BlogItemProps {
  blog: {
    id: string;
    name: string;
    title: string;
    createdAt: Date;
    image: string;
    desc: string;
  };
}

const BlogItem = ({ blog }: BlogItemProps) => {
  return (
    <article
      className={`
        group rounded-xl border p-4 border-opacity/25 flex flex-col

        hover:bg-secondary

        lg:bg-secondary
      `}
    >
      <div
        className={`
          flex flex-col justify-between gap-1

          lg:flex-col

          sm:flex-row
        `}
      >
        <Image
          src={blog.image}
          alt="img"
          width={240}
          height={160}
          className={`
            mx-auto h-48 w-11/12 rounded-xl object-cover

            lg:w-full

            sm:w-60
          `}
        />
      </div>
      <div className={`mt-4 flex justify-between`}>
        <div className={`flex items-center gap-2`}>
          <Avatar className="size-7">
            <AvatarImage
              src="https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1655817725/logos/community"
              alt="avatar"
            />
            <AvatarFallback>
              {blog.name.split(' ')[0].split('')[0]};
            </AvatarFallback>
          </Avatar>
          <p className="mt-2 line-clamp-1 text-sm font-bold text-primary">
            {blog.name}
          </p>
        </div>
      </div>
      <div className={`my-4 h-14`}>
        <Link href={'#'}>
          <h1 className="line-clamp-2 text-lg font-bold">{blog.title}</h1>
        </Link>
      </div>
      <div className={`flex flex-1 flex-col`}>
        <p
          className={`
            mb-4 line-clamp-4 flex-1 text-base font-semibold text-textGray
          `}
        >
          {blog.desc}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p
            className={`
              text-sm text-textGray

              sm:text-base
            `}
          >
            {moment(blog.createdAt).format('Do MMM, YYYY')}
          </p>
          <Button>
            <Link href="!#">Read More</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default BlogItem;
