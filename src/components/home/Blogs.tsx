'use client';

import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  Ellipsis,
  ExternalLink,
  Link as LinkIcon,
  MessageSquareText,
} from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/hooks/use-toast';
import { kFormatter } from '@/utils/formatNumber.util';

enum Vote {
  notVote = 0,
  upVote = 1,
  downVote = -1,
}

interface BlogItemProps {
  blog: {
    id: string;
    name: string;
    title: string;
    category: string[];
    readTime: string;
    createdAt: Date;
    image: string;
    upVote: number;
    downVote: number;
    comment: number;
  };
}
const BlogItem = ({ blog }: BlogItemProps) => {
  const { toast } = useToast();
  const [showBookmark, setShowBookmark] = React.useState(false);
  const [vote, setVote] = React.useState<Vote>(Vote.notVote);
  const handleVote = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const changeVote: Vote = Number(e.currentTarget.dataset.vote);
      if (vote !== changeVote) {
        setVote(changeVote);
      } else {
        setVote(Vote.notVote);
      }
    },
    [vote],
  );

  const handleBookmark = React.useCallback(() => {
    if (showBookmark) {
      setShowBookmark(false);
      toast({
        title: 'Blog was removed from bookmark',
        description: moment().format('MMMM Do YYYY, h:mm:ss a'),
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
    }
    if (!showBookmark) {
      setShowBookmark(true);
      toast({
        title: 'Blog was add to bookmark',
        description: moment().format('MMMM Do YYYY, h:mm:ss a'),
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
    }
  }, [toast, showBookmark]);

  return (
    <article
      className={`
        group rounded-lg border px-4 py-6 border-opacity/25 flex flex-col

        hover:bg-secondary

        lg:bg-secondary
      `}
    >
      <div
        className={`
          flex justify-between

          lg:px-2
        `}
      >
        <div
          className={`
            flex items-center gap-2

            lg:flex-col lg:items-start
          `}
        >
          <Avatar className="size-10">
            <AvatarImage
              src="https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1655817725/logos/community"
              alt="avatar"
            />
            <AvatarFallback>
              {blog.name.split(' ')[0].split('')[0]};
            </AvatarFallback>
          </Avatar>
          <div
            className={`
              flex flex-col

              lg:hidden
            `}
          >
            <p className="font-bold text-primary">{blog.name}</p>
            <div
              className={`
                flex gap-1 text-sm text-textGray

                lg:hidden
              `}
            >
              <span>
                {blog.readTime} . {moment(blog.createdAt).format('MMM Do')}
              </span>
            </div>
          </div>
        </div>
        <div className={`flex gap-1`}>
          <Button
            variant={'link'}
            className={`
              px-3 py-0 text-textGray

              hover:bg-buttonHover hover:text-primary

              lg:hidden lg:bg-primary lg:text-background lg:group-hover:flex
            `}
          >
            <span
              className={`
                hidden

                sm:flex
              `}
            >
              Read post
            </span>
            <span
              className={`
                flex

                sm:hidden
              `}
            >
              Read
            </span>
            <ExternalLink size={28} />
          </Button>
          <Button
            variant={'ghost'}
            className={`
              px-3 py-0 text-textGray

              hover:bg-buttonHover hover:text-primary

              lg:hidden lg:group-hover:block
            `}
          >
            <Ellipsis size={28} />
          </Button>
        </div>
      </div>
      <div
        className={`
          flex flex-1 flex-col justify-between gap-1

          lg:flex-col

          sm:flex-row
        `}
      >
        <div
          className={`
            mt-4 flex flex-1 flex-col justify-between

            lg:px-2
          `}
        >
          <Link href={'#'}>
            <h1 className="mb-4 line-clamp-3 text-xl font-bold">
              {blog.title}
            </h1>
          </Link>
          <div className="mt-auto flex flex-wrap gap-1 text-sm text-textGray">
            {blog.category.map((item: string, index: number) => {
              if (index > 2) return null;
              return (
                <div key={item} className="rounded-md border px-2">
                  #{item}
                </div>
              );
            })}
            {blog.category.length > 3 && (
              <div className="rounded-md border px-2">
                +{blog.category.length - 3}
              </div>
            )}
          </div>
          <div
            className={`
              hidden gap-1 text-sm text-textGray

              lg:flex
            `}
          >
            <span>{blog.readTime}</span>
            <span>.</span>
            <span> {moment(blog.createdAt).format('MMM Do')}</span>
          </div>
        </div>
        <Image
          src={blog.image}
          alt=""
          width={240}
          height={160}
          className={`
            mx-auto mt-4 h-48 w-11/12 rounded-lg object-cover

            lg:w-full

            sm:w-60
          `}
        />
      </div>
      <div
        className={`
          mt-4 flex gap-1

          lg:justify-between
        `}
      >
        <div className="flex items-center rounded-lg border-opacity/25">
          <Toggle
            className={`
              group flex items-center rounded-lg bg-transparent p-2 text-sm
              text-textGray

              data-[state=on]:bg-transparent data-[state=on]:text-emerald-600

              hover:bg-like hover:text-actionTxt
            `}
            data-vote="1"
            data-state={vote === Vote.upVote ? 'on' : 'off'}
            onClick={handleVote}
          >
            <ArrowBigUp size={24} />
            <span>{kFormatter(blog.upVote)}</span>
          </Toggle>
          <div className="h-4 w-px bg-white opacity-25"></div>
          <Toggle
            className={`
              flex items-center rounded-lg bg-transparent p-2 text-sm
              text-textGray

              data-[state=on]:bg-transparent data-[state=on]:text-red-600

              hover:bg-unlike hover:text-actionTxt
            `}
            data-vote="-1"
            data-state={vote === Vote.downVote ? 'on' : 'off'}
            onClick={handleVote}
          >
            <ArrowBigDown size={24} />
            <span>{kFormatter(blog.downVote)}</span>
          </Toggle>
        </div>
        <div className={`flex cursor-pointer items-center rounded-lg`}>
          <div
            className={`
              flex items-center gap-1 rounded-lg bg-transparent p-2 text-sm
              font-medium text-textGray

              hover:bg-comment hover:text-actionTxt
            `}
          >
            <MessageSquareText size={24} />
            <span>{kFormatter(blog.comment)}</span>
          </div>
        </div>
        <div className={`flex items-center rounded-lg text-sm`}>
          <Toggle
            className={`
              flex items-center rounded-lg bg-transparent p-2 text-textGray

              data-[state=on]:bg-transparent data-[state=on]:text-orange-600

              hover:bg-bookmark hover:text-actionTxt
            `}
            onClick={handleBookmark}
          >
            <Bookmark size={24} />
          </Toggle>
        </div>
        <div className={`flex items-center rounded-lg`}>
          <div
            className={`
              flex cursor-pointer items-center rounded-lg bg-transparent p-2
              text-sm text-textGray

              hover:bg-linkCopy hover:text-actionTxt
            `}
          >
            <LinkIcon size={24} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogItem;
