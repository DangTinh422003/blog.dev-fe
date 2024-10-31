'use client';

import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  Ellipsis,
  ExternalLink,
  Link,
  MessageSquareText,
} from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { toast } from 'sonner';

import { kFormatter } from '@/utils/formatNumber.util';

import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

const BlogItem = ({
  blog,
}: {
  blog: {
    name: string;
    readTime: string;
    createdAt: Date;
    title: string;
    category: string[];
    upVote: number;
    downVote: number;
    image: string;
    comment: number;
  };
}) => {
  const [hover, setHover] = React.useState(false);
  const [showUpVote, setShowUpVote] = React.useState(false);
  const [showDownVote, setShowDownVote] = React.useState(false);
  const [showBookmark, setShowBookmark] = React.useState(false);

  const handleUpVote = () => {
    if (showUpVote) {
      setShowUpVote(false);
    }
    if (showDownVote) {
      setShowDownVote(false);
    }
    if (!showUpVote) {
      setShowUpVote(true);
    }
  };
  const handleDownVote = () => {
    if (showDownVote) {
      setShowDownVote(false);
    }
    if (showUpVote) {
      setShowUpVote(false);
    }
    if (!showDownVote) {
      setShowDownVote(true);
    }
  };
  const handleBookmark = () => {
    if (showBookmark) {
      setShowBookmark(false);
      toast.success('Blog was removed from bookmark', {
        description: moment().format('MMMM Do YYYY, h:mm:ss a'),
        action: {
          label: 'Undo',
          onClick: () => {},
        },
      });
    }
    if (!showBookmark) {
      setShowBookmark(true);
      toast.success('Blog was added to bookmark', {
        description: moment().format('MMMM Do YYYY, h:mm:ss a'),
        action: {
          label: 'Undo',
          onClick: () => {},
        },
      });
    }
  };

  return (
    <article
      className={`
        rounded-lg border px-[16px] py-[24px] border-opacity/25 flex flex-col

        lg:bg-[#1c1f26]
      `}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div
        className={`
          relative flex justify-between

          lg:px-[10px]
        `}
      >
        <div
          className={`
            flex items-center gap-[10px]

            lg:flex-col lg:items-start
          `}
        >
          <Avatar className="size-10">
            <AvatarImage
              src="https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1655817725/logos/community"
              alt="avatar"
            />
          </Avatar>
          <div className="flex flex-col">
            <p className="author-name font-bold text-primary">{blog.name}</p>
            <div
              className={`
                flex gap-[5px] text-[13px] text-[#A8B3CF]

                lg:hidden
              `}
            >
              <span className="read-time">{blog.readTime}</span>
              <span>.</span>
              <span className="">
                {moment(blog.createdAt).format('MMM Do')}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`
            blog-action right-0 flex gap-[5px]

            lg:absolute
          `}
        >
          <Button
            className={`
              bg-transparent px-[12px] py-0 text-[15px]

              text-[#A8B3CF]

              hover:bg-[#1c1f26]

              hover:text-primary

              lg:${hover ? 'flex' : 'hidden'}

              lg:bg-white lg:text-[#1c1f26]
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
            <ExternalLink size={28} className="" />
          </Button>
          <Button
            className={`
              bg-transparent px-[12px] py-0 text-[15px]

              text-[#A8B3CF]

              hover:bg-[#1c1f26]

              hover:text-primary

              lg:${hover ? 'block' : 'hidden'}
            `}
          >
            <Ellipsis size={28} />
          </Button>
        </div>
      </div>
      <div
        className={`
          flex flex-1 flex-col justify-between gap-[5px]

          lg:flex-col

          sm:flex-row
        `}
      >
        <div
          className={`
            mt-[16px] flex flex-1 flex-col justify-between

            lg:px-[10px]
          `}
        >
          <h1 className="mb-[16px] text-[20px] font-bold">{blog.title}</h1>
          <div className="mt-auto flex flex-wrap gap-[5px] text-[#A8B3CF]">
            {blog.category.map((item, index) => {
              return (
                <div key={index} className="rounded-md border px-[8px]">
                  #{item}
                </div>
              );
            })}
          </div>
          <div
            className={`
              hidden gap-[5px] text-[13px] text-[#A8B3CF]

              lg:flex
            `}
          >
            <span className="read-time">{blog.readTime}</span>
            <span>.</span>
            <span className=""> {moment(blog.createdAt).format('MMM Do')}</span>
          </div>
        </div>
        <Image
          src={blog.image}
          alt=""
          width={240}
          height={160}
          className={`
            mt-[16px] h-[160px] w-full rounded-lg object-cover

            lg:w-full

            sm:w-[240px]
          `}
        />
      </div>
      <div
        className={`
          blog-footer mt-[16px] flex gap-[10px]

          lg:justify-between
        `}
      >
        <div className="flex items-center rounded-lg border border-opacity/25">
          <div
            className={`
              flex items-center rounded-lg bg-transparent p-1 px-[5px]
              text-[15px]

              ${showUpVote ? 'text-[#39e58c]' : 'text-[#A8B3CF]'}

              hover:bg-[#1ddc6f3d] hover:text-[#39e58c]
            `}
            onClick={handleUpVote}
          >
            <ArrowBigUp size={24} />
            <span>{kFormatter(blog.upVote)}</span>
          </div>
          <div className="h-[15px] w-px bg-white opacity-25"></div>
          <div
            className={`
              flex items-center rounded-lg bg-transparent p-1 px-[5px]
              text-[15px]

              ${showDownVote ? 'text-[#e04337]' : 'text-[#A8B3CF]'}

              hover:bg-[#d52b203d] hover:text-[#e04337]
            `}
            onClick={handleDownVote}
          >
            <ArrowBigDown size={24} />
            <span>{kFormatter(blog.downVote)}</span>
          </div>
        </div>
        <div
          className={`
            rounded-lg border border-opacity/25 flex items-center

            lg:border-0
          `}
        >
          <div
            className={`
              flex items-center rounded-lg bg-transparent p-1 text-[15px]
              text-[#A8B3CF]

              hover:bg-[#0dcfdc3d] hover:text-[#2cdce6]
            `}
          >
            <MessageSquareText size={24} className="hover:bg-[#0dcfdc3d]" />
            <span>{kFormatter(blog.comment)}</span>
          </div>
        </div>
        <div
          className={`
            rounded-lg border border-opacity/25 flex items-center

            lg:border-0
          `}
        >
          <div
            className={`
              flex items-center rounded-lg bg-transparent p-1 text-[15px]

              ${showBookmark ? 'text-[#ff8e3b]' : 'text-[#A8B3CF]'}

              hover:bg-[#ff7a2b3d] hover:text-[#ff8e3b]
            `}
            onClick={handleBookmark}
          >
            <Bookmark size={24} />
          </div>
        </div>
        <div
          className={`
            rounded-lg border border-opacity/25 flex items-center

            lg:border-0
          `}
        >
          <div
            className={`
              flex items-center rounded-lg bg-transparent p-1 text-[15px]
              text-[#A8B3CF]

              hover:bg-[#c029f03d] hover:text-[#ce3df3]
            `}
          >
            <Link size={24} className="" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogItem;
